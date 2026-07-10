import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import { EmailOtp } from '@/models/EmailOtp';
import { User } from '@/models/User';
import { encrypt } from '@/lib/auth';

function hashOtp(code: string) {
    const secret = process.env.OTP_SECRET || 'dev-otp-secret';
    return crypto.createHmac('sha256', secret).update(code).digest('hex');
}

function getAdminEmails() {
    const raw = process.env.ADMIN_EMAILS || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

function shouldUseSecureCookies(request: Request) {
    if (process.env.AUTH_COOKIE_SECURE === 'false') return false;
    if (process.env.AUTH_COOKIE_SECURE === 'true') return true;
    if (process.env.NODE_ENV !== 'production') return false;
    return request.headers.get('x-forwarded-proto') === 'https';
}

export async function POST(request: Request) {
    await dbConnect();

    const body = (await request.json()) as {
        email?: string;
        purpose?: 'login' | 'register';
        code?: string;
    };

    const email = (body.email || '').trim().toLowerCase();
    const purpose = body.purpose;
    const code = (body.code || '').trim();

    if (!email || !purpose || !code) {
        return NextResponse.json({ ok: false, message: 'Missing email, purpose, or code' }, { status: 400 });
    }

    const otp = await EmailOtp.findOne({ email, purpose });
    if (!otp) {
        return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
    }

    if (otp.expiresAt.getTime() < Date.now()) {
        await EmailOtp.deleteOne({ _id: otp._id });
        return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
    }

    if (otp.attempts >= 5) {
        await EmailOtp.deleteOne({ _id: otp._id });
        return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
    }

    const codeHash = hashOtp(code);
    if (codeHash !== otp.codeHash) {
        otp.attempts += 1;
        await otp.save();
        return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
    }

    let user = await User.findOne({ email });

    if (purpose === 'register') {
        if (user) {
            return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
        }

        const firstName = otp.payload?.firstName;
        const lastName = otp.payload?.lastName;
        const age = otp.payload?.age;

        if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof age !== 'number') {
            return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
        }

        user = await User.create({
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            age,
            email,
        });
    }

    if (!user) {
        return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 });
    }

    const adminEmails = getAdminEmails();
    const adminAllowed = adminEmails.length === 0 || adminEmails.includes(email);
    if (!adminAllowed) {
        await EmailOtp.deleteOne({ _id: otp._id });
        return NextResponse.json({ ok: false, message: 'Unauthorized admin login' }, { status: 403 });
    }

    await EmailOtp.deleteOne({ _id: otp._id });

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ userId: user._id.toString(), email: user.email, expires });

    const res = NextResponse.json({ ok: true });
    res.cookies.set('session', session, {
        expires,
        httpOnly: true,
        secure: shouldUseSecureCookies(request),
        sameSite: 'lax',
    });

    return res;
}
