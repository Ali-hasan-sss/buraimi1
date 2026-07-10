import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { BoardDirector } from '@/models/BoardDirector';

export const runtime = 'nodejs';

const SEED_DIRECTORS = [
    { name: 'الشيخ أحمد بن ناصر النعيمي', role: 'رئيس مجلس الإدارة' },
    { name: 'الشيخ بطي النيادي', role: 'عضو' },
    { name: 'الشيخ ناصر بن أحمد النعيمي', role: 'عضو' },
] as const;

async function seed() {
    try {
        await dbConnect();

        const operations = SEED_DIRECTORS.map((d) => ({
            updateOne: {
                filter: { name: d.name },
                update: { $set: { name: d.name, role: d.role } },
                upsert: true,
            },
        }));

        const result = await BoardDirector.bulkWrite(operations);

        return NextResponse.json({ ok: true, result });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function GET(_request: Request) {
    void _request;
    return seed();
}

export async function POST(_request: Request) {
    void _request;
    return seed();
}
