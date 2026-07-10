import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { AdvisoryCouncilMember } from '@/models/AdvisoryCouncil';

export const runtime = 'nodejs';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    void _request;

    try {
        await dbConnect();

        const { id } = await params;

        const doc = await AdvisoryCouncilMember.findById(id).lean();

        if (!doc) {
            return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, data: doc });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();

        const { id } = await params;

        const body = (await request.json()) as {
            name?: string;
            role?: string;
            description?: string;
            image?: string;
        };

        const update: { name?: string; role?: string; description?: string; image?: string } = {};

        if (typeof body.name === 'string') update.name = body.name.trim();
        if (typeof body.role === 'string') update.role = body.role.trim();
        if (typeof body.description === 'string') update.description = body.description.trim();
        if (typeof body.image === 'string') update.image = body.image.trim();

        if (!update.name && !update.role && typeof update.description !== 'string' && typeof update.image !== 'string') {
            return NextResponse.json({ ok: false, message: 'No fields to update' }, { status: 400 });
        }

        if (update.name === '') {
            return NextResponse.json({ ok: false, message: 'Invalid name' }, { status: 400 });
        }

        if (update.role === '') {
            return NextResponse.json({ ok: false, message: 'Invalid role' }, { status: 400 });
        }

        const updated = await AdvisoryCouncilMember.findByIdAndUpdate(id, update, { new: true }).lean();

        if (!updated) {
            return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, data: updated });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    void _request;

    try {
        await dbConnect();

        const { id } = await params;

        const deleted = await AdvisoryCouncilMember.findByIdAndDelete(id).lean();

        if (!deleted) {
            return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, data: deleted });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
