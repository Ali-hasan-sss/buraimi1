import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { getSession } from '@/lib/auth';
import { User } from '@/models/User';

export async function POST(request: Request) {
    const session = await getSession();
    if (!session?.userId || session.role !== 'admin') {
        return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json() as { currentPassword?: string; newPassword?: string };
    const { currentPassword = '', newPassword = '' } = body;

    if (!currentPassword || !newPassword) {
        return NextResponse.json({ ok: false, message: 'Missing fields' }, { status: 400 });
    }
    if (newPassword.length < 6) {
        return NextResponse.json({ ok: false, message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(session.userId);
    if (!user?.password) {
        return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }

    const match = await bcrypt.compare(currentPassword, user.password as string);
    if (!match) {
        return NextResponse.json({ ok: false, message: 'Current password is incorrect' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(session.userId, { password: hashed });

    return NextResponse.json({ ok: true });
}
