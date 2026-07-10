import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import { EmailOtp } from '@/models/EmailOtp';
import { User } from '@/models/User';

const OTP_EXPIRES_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const OTP_MAX_REQUESTS_PER_WINDOW = 5;
const OTP_REQUEST_WINDOW_MINUTES = 10;

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

export async function POST(request: Request) {
    await dbConnect();

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    const body = (await request.json()) as {
        email?: string;
        purpose?: 'login' | 'register';
        firstName?: string;
        lastName?: string;
        age?: number;
    };

    const email = (body.email || '').trim().toLowerCase();
    const purpose = body.purpose;

    if (!email || !purpose) {
        return NextResponse.json({ ok: false, message: 'Missing email or purpose' }, { status: 400 });
    }

    const throttleCookieName = 'otp_throttle';
    const throttleRaw = request.headers
        .get('cookie')
        ?.split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${throttleCookieName}=`))
        ?.split('=')[1];
    const throttle = throttleRaw ? Number(decodeURIComponent(throttleRaw)) : 0;
    if (Number.isFinite(throttle) && throttle > Date.now()) {
        return NextResponse.json({ ok: true });
    }

    const windowStart = new Date(Date.now() - OTP_REQUEST_WINDOW_MINUTES * 60 * 1000);
    const recentCount = await EmailOtp.countDocuments({
        email,
        purpose,
        createdAt: { $gte: windowStart },
    });
    if (recentCount >= OTP_MAX_REQUESTS_PER_WINDOW) {
        const res = NextResponse.json({ ok: true });
        res.cookies.set(throttleCookieName, String(Date.now() + OTP_RESEND_COOLDOWN_SECONDS * 1000), {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: OTP_RESEND_COOLDOWN_SECONDS,
        });
        return res;
    }

    const existingOtp = await EmailOtp.findOne({ email, purpose }).sort({ createdAt: -1 });
    if (existingOtp) {
        const secondsSince = (Date.now() - existingOtp.createdAt.getTime()) / 1000;
        if (secondsSince < OTP_RESEND_COOLDOWN_SECONDS) {
            return NextResponse.json({ ok: true });
        }
    }

    const existingUser = await User.findOne({ email });
    const adminEmails = getAdminEmails();
    const adminAllowed = adminEmails.length === 0 || adminEmails.includes(email);

    if (purpose === 'login' && (!existingUser || !adminAllowed)) {
        return NextResponse.json({ ok: true });
    }

    if (purpose === 'register' && existingUser) {
        return NextResponse.json({ ok: true });
    }

    if (purpose === 'register') {
        const firstName = (body.firstName || '').trim();
        const lastName = (body.lastName || '').trim();
        const age = body.age;

        if (!firstName || !lastName || typeof age !== 'number' || !Number.isFinite(age) || age <= 0) {
            return NextResponse.json({ ok: true });
        }
    }

    const code = String(crypto.randomInt(100000, 1000000));
    const codeHash = hashOtp(code);
    const expiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);

    await EmailOtp.deleteMany({ email, purpose });
    await EmailOtp.create({
        email,
        purpose,
        codeHash,
        expiresAt,
        attempts: 0,
        payload:
            purpose === 'register'
                ? {
                      firstName: body.firstName,
                      lastName: body.lastName,
                      age: body.age,
                  }
                : undefined,
    });

    console.log(`[DEV OTP] ${purpose.toUpperCase()} OTP for ${email} (ip=${ip}): ${code}`);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(throttleCookieName, String(Date.now() + OTP_RESEND_COOLDOWN_SECONDS * 1000), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: OTP_RESEND_COOLDOWN_SECONDS,
    });
    return res;
}
