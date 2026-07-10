import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();

        const careers = await CareersModel.find({}).sort({ createdAt: -1 }).lean();

        const data = careers.map((c) => ({
            id: String(c._id),
            titleAr: c.titleAr,
            titleEn: c.titleEn,
            descriptionAr: c.descriptionAr,
            descriptionEn: c.descriptionEn,
            requirementsAr: c.requirementsAr || "",
            requirementsEn: c.requirementsEn || "",
            startDate: c.startDate,
            edDate: c.edDate,
        }));

        return NextResponse.json({ ok: true, data });
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
