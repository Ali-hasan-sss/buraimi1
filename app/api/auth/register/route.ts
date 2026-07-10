import { NextResponse } from 'next/server';
 

export async function POST(request: Request) {
    void request;
    return NextResponse.json(
        { ok: false, message: 'Admin creation is disabled. Use /api/auth/seed-admin.' },
        { status: 403 }
    );
}
