import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { PrivacyPolicyModel } from '@/models/PrivacyPolicy';
import { getSession } from '@/lib/auth';

export async function GET() {
    const session = await getSession();
    if (!session?.userId) {
        return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    let doc = await PrivacyPolicyModel.findOne().lean();
    if (!doc) {
        doc = await PrivacyPolicyModel.create({});
    }

    return NextResponse.json({ ok: true, data: doc });
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session?.userId || session.role !== 'admin') {
        return NextResponse.json({ ok: false, message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const body = await request.json() as Record<string, unknown>;

    const allowed = [
        'studentTitleAr', 'studentTitleEn',
        'studentIntroAr', 'studentIntroEn',
        'studentSections',
        'staffTitleAr', 'staffTitleEn',
        'staffIntroAr', 'staffIntroEn',
        'staffSections',
    ];

    const update: Record<string, unknown> = { lastUpdated: new Date() };
    for (const key of allowed) {
        if (key in body) update[key] = body[key];
    }

    const doc = await PrivacyPolicyModel.findOneAndUpdate(
        {},
        { $set: update },
        { upsert: true, new: true },
    ).lean();

    return NextResponse.json({ ok: true, data: doc });
}
