import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { sendWelcomeMail } from '@/lib/mailer';

export async function GET() {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    const data = users.map((u) => ({
        id: String(u._id),
        name: u.name,
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        email: u.email || '',
        role: (u as { role?: string }).role || 'admin',
        accessCode: (u as { accessCode?: string }).accessCode || '',
    }));
    return NextResponse.json({ ok: true, data });
}

export async function POST(request: Request) {
    await dbConnect();

    const body = (await request.json()) as {
        name?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        role?: string;
        accessCode?: string;
    };

    const role = body.role || 'admin';
    const name = (body.name || '').trim();
    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();

    if (!name) {
        return NextResponse.json({ ok: false, message: 'Name is required' }, { status: 400 });
    }

    if (role === 'admin') {
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        if (!email || !password) {
            return NextResponse.json({ ok: false, message: 'Email and password are required for admin' }, { status: 400 });
        }
        const existing = await User.findOne({ email }).lean();
        if (existing) {
            return NextResponse.json({ ok: false, message: 'Email already in use' }, { status: 409 });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const created = await User.create({ name, firstName, lastName, email, password: passwordHash, role });
        return NextResponse.json({ ok: true, id: created._id.toString() }, { status: 201 });
    } else {
        const accessCode = (body.accessCode || '').trim();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        if (!accessCode || !email || !password) {
            return NextResponse.json({ ok: false, message: 'Access code, email and password are required for student/staff' }, { status: 400 });
        }
        const existingCode = await User.findOne({ accessCode }).lean();
        if (existingCode) {
            return NextResponse.json({ ok: false, message: 'Access code already in use' }, { status: 409 });
        }
        const existingEmail = await User.findOne({ email }).lean();
        if (existingEmail) {
            return NextResponse.json({ ok: false, message: 'Email already in use' }, { status: 409 });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const created = await User.create({ name, firstName, lastName, email, accessCode, password: passwordHash, role });
        void sendWelcomeMail({ to: email, name, role: role as 'student' | 'staff', accessCode, password });
        return NextResponse.json({ ok: true, id: created._id.toString() }, { status: 201 });
    }
}
