import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { Partnership } from '@/models/Partnership';

export const runtime = 'nodejs';

export async function GET() {
    try {
        await dbConnect();
        const docs = await Partnership.find({}).sort({ order: 1 }).lean();

        return NextResponse.json({ ok: true, data: docs });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = (await request.json()) as {
            order?: number;
            name?: string;
            nameEn?: string;
            logo?: string;
            type?: string;
            description?: string;
            date?: string;
            link?: string;
            international?: boolean;
        };

        const order = typeof body.order === 'number' ? body.order : undefined;
        const name = (body.name || '').trim();

        if (!order || !name) {
            return NextResponse.json({ ok: false, message: 'Missing order or name' }, { status: 400 });
        }

        const created = await Partnership.create({
            order,
            name,
            nameEn: (body.nameEn || '').trim(),
            logo: (body.logo || '').trim(),
            type: (body.type || '').trim(),
            description: (body.description || '').trim(),
            date: (body.date || '').trim(),
            link: (body.link || '').trim(),
            international: Boolean(body.international),
        });

        return NextResponse.json({ ok: true, data: created }, { status: 201 });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
