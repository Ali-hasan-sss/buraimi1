import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { mergeDepartmentStudyPlans } from '@/lib/merge-department-study-plans';
import { Department } from '@/staticData/department';
import { DepartmentModel } from '@/models/Department';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function seed() {
    try {
        await dbConnect();

        const departmentsWithStudyPlans = mergeDepartmentStudyPlans(
            Department as Parameters<typeof mergeDepartmentStudyPlans>[0],
        ) as typeof Department;

        const operations = departmentsWithStudyPlans.map((d) => ({
            updateOne: {
                filter: { domain: d.domain },
                update: {
                    $set: {
                        domain: d.domain,
                        titleAr: d.titleAr,
                        titleEn: d.titleEn,
                        subTitleAr: d.subTitleAr,
                        subTitleEn: d.subTitleEn,
                        headMessage: d.headMessage,
                        programs: d.programs,
                        facultyMembers: d.facultyMembers,
                        applyLink: (d as { applyLink?: string }).applyLink || "",
                    },
                    $unset: {
                        title: "",
                        subTitle: "",
                    },
                },
                upsert: true,
            },
        }));

        const result = await DepartmentModel.bulkWrite(operations);

        const preview = await DepartmentModel.find({}, { domain: 1, titleAr: 1, titleEn: 1, subTitleAr: 1, subTitleEn: 1 })
            .sort({ domain: 1 })
            .lean();

        return NextResponse.json({ ok: true, result, preview });
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
