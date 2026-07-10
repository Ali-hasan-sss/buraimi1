import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { mapDepartmentsToOverview } from '@/lib/department-public';
import { DepartmentModel } from '@/models/Department';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const docs = await DepartmentModel.find({}).sort({ domain: 1 }).lean();

        const data = mapDepartmentsToOverview(
            docs.map((doc) => ({
                domain: String(doc.domain),
                titleAr: String(doc.titleAr),
                titleEn: String(doc.titleEn),
                programs: doc.programs,
                showcaseImage: doc.showcaseImage,
            }))
        );

        return NextResponse.json({ ok: true, data });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
