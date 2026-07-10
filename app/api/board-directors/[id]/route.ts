import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { BoardDirector } from '@/models/BoardDirector';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    void _request;
    await dbConnect();

    const { id } = await params;

    const doc = await BoardDirector.findById(id).lean();

    if (!doc) {
        return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: doc });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();

    const { id } = await params;

    const body = (await request.json()) as {
        name?: string;
        role?: string;
        image?: string;
    };

    const update: { name?: string; role?: string; image?: string } = {};

    if (typeof body.name === 'string') update.name = body.name.trim();
    if (typeof body.role === 'string') update.role = body.role.trim();
    if (typeof body.image === 'string') update.image = body.image.trim();

    if (!update.name && !update.role && typeof update.image !== 'string') {
        return NextResponse.json({ ok: false, message: 'No fields to update' }, { status: 400 });
    }

    if (update.name === '') {
        return NextResponse.json({ ok: false, message: 'Invalid name' }, { status: 400 });
    }

    if (update.role === '') {
        return NextResponse.json({ ok: false, message: 'Invalid role' }, { status: 400 });
    }

    const updated = await BoardDirector.findByIdAndUpdate(id, update, { new: true }).lean();

    if (!updated) {
        return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: updated });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    void _request;
    await dbConnect();

    const { id } = await params;

    const deleted = await BoardDirector.findByIdAndDelete(id).lean();

    if (!deleted) {
        return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: deleted });
}
