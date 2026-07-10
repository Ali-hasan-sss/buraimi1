import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PoliciesByDepartmentModel } from "@/models/PoliciesByDepartment";

async function ensureDoc() {
  let doc = await PoliciesByDepartmentModel.findOne({}).lean();
  if (!doc) {
    await PoliciesByDepartmentModel.create({
      sectionTitleAr: "السياسات حسب الدوائر",
      sectionTitleEn: "Policies by Departments",
      sectionSubtitleAr: "سياسات الدوائر المختلفة",
      sectionSubtitleEn: "Policies by Departments",
      departments: [],
    });
    doc = await PoliciesByDepartmentModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await ensureDoc();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const payload = {
      sectionTitleAr: String(body?.sectionTitleAr || "").trim(),
      sectionTitleEn: String(body?.sectionTitleEn || "").trim(),
      sectionSubtitleAr: String(body?.sectionSubtitleAr || "").trim(),
      sectionSubtitleEn: String(body?.sectionSubtitleEn || "").trim(),
      departments: Array.isArray(body?.departments)
        ? body.departments.map((dept: unknown, deptIndex: number) => {
            const d = dept as Record<string, unknown>;
            const policies = Array.isArray(d.policies) ? d.policies : [];
            return {
              id: String(d.id || `dept-${deptIndex + 1}`).trim(),
              titleAr: String(d.titleAr || "").trim(),
              titleEn: String(d.titleEn || "").trim(),
              order: Number.isFinite(Number(d.order))
                ? Number(d.order)
                : deptIndex,
              policies: policies.map((policy: unknown, policyIndex: number) => {
                const p = policy as Record<string, unknown>;
                return {
                  id: String(p.id || `policy-${policyIndex + 1}`).trim(),
                  titleAr: String(p.titleAr || "").trim(),
                  titleEn: String(p.titleEn || "").trim(),
                  file: String(p.file || "#").trim(),
                  order: Number.isFinite(Number(p.order))
                    ? Number(p.order)
                    : policyIndex,
                };
              }),
            };
          })
        : [],
    };

    const updated = await PoliciesByDepartmentModel.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true },
    ).lean();
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
