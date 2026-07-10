import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { contactModel } from '@/models/contact';

export const runtime = 'nodejs';

export async function GET() {
    try {
        await dbConnect();
        const docs = await contactModel.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ ok: true, data: docs });
    } catch (e) {
        console.error(e);
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
