import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

function getAdminEmails() {
    const raw = process.env.ADMIN_EMAILS || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export async function GET() {
    const session = await getSession();
    if (!session?.email) {
        return NextResponse.json({ ok: true, authenticated: false, isAdmin: false });
    }

    const allowedAdmins = getAdminEmails();
    const isAllowedAdmin =
        allowedAdmins.length === 0 || allowedAdmins.includes(session.email.toLowerCase());

    return NextResponse.json({
        ok: true,
        authenticated: true,
        isAdmin: isAllowedAdmin,
        email: session.email,
        role: session.role ?? (isAllowedAdmin ? 'admin' : 'student'),
    });
}
