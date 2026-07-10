import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    const body = (await request.json()) as {
        name?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        role?: string;
        accessCode?: string;
    };

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = body.name.trim();
    if (body.firstName !== undefined) update.firstName = body.firstName.trim();
    if (body.lastName !== undefined) update.lastName = body.lastName.trim();
    if (body.role !== undefined) update.role = body.role;

    if (body.email !== undefined) {
        const email = body.email.trim().toLowerCase();
        if (email) {
            const conflict = await User.findOne({ email, _id: { $ne: id } }).lean();
            if (conflict) {
                return NextResponse.json({ ok: false, message: 'Email already in use' }, { status: 409 });
            }
            update.email = email;
        }
    }

    if (body.accessCode !== undefined && body.accessCode.trim()) {
        const ac = body.accessCode.trim();
        const conflict = await User.findOne({ accessCode: ac, _id: { $ne: id } }).lean();
        if (conflict) {
            return NextResponse.json({ ok: false, message: 'Access code already in use' }, { status: 409 });
        }
        update.accessCode = ac;
    }

    if (body.password && body.password.trim()) {
        update.password = await bcrypt.hash(body.password, 10);
    }

    const updated = await User.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
    if (!updated) {
        return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    const deleted = await User.findByIdAndDelete(id).lean();
    if (!deleted) {
        return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
}
