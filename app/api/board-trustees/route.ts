import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { BoardTrustee } from '@/models/BoardTrustees';

export const runtime = 'nodejs';

export async function GET() {
    try {
        await dbConnect();
        const docs = await BoardTrustee.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ ok: true, data: docs });
    } catch (e) {
        // console.error(e);
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = (await request.json()) as {
            name?: string;
            role?: string;
            image?: string;
        };

        const name = (body.name || '').trim();
        const role = (body.role || '').trim();
        const image = typeof body.image === 'string' ? body.image.trim() : '';

        if (!name || !role) {
            return NextResponse.json({ ok: false, message: 'Missing name or role' }, { status: 400 });
        }

        const created = await BoardTrustee.create({ name, role, image });

        return NextResponse.json({ ok: true, data: created }, { status: 201 });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
