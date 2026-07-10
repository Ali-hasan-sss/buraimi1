import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { BoardTrustee } from '@/models/BoardTrustees';

export const runtime = 'nodejs';

const SEED_TRUSTEES = [
    { name: 'الدكتور سالم بن سعيد البحري', role: 'رئيس مجلس الأمناء' },
    { name: 'الدكتور عبدالله العبري', role: 'نائب رئيس مجلس الأمناء' },
    { name: 'الأستاذ الدكتور ياسر فؤاد', role: 'عميد كلية البريمي الجامعية' },
    { name: 'الشيخ أحمد بن ناصر النعيمي', role: 'عضو' },
    { name: 'الدكتور احمد بن جمعة الريامي', role: 'عضو' },
    { name: 'الدكتور عبدالله بن أحمد الظاهري', role: 'عضو' },
    { name: 'الدكتور سالم بن راشد الشامسي', role: 'عضو' },
    { name: 'الدكتور خليل الرقيشي', role: 'عضو' },
    { name: 'الشيخ بطي النيادي', role: 'عضو' },
] as const;

async function seed() {
    try {
        await dbConnect();

        const operations = SEED_TRUSTEES.map((t) => ({
            updateOne: {
                filter: { name: t.name },
                update: { $set: { name: t.name, role: t.role } },
                upsert: true,
            },
        }));

        const result = await BoardTrustee.bulkWrite(operations);

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
