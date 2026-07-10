import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PlansReportsModel } from "@/models/PlansReports";
import { plansReportsItems } from "@/staticData/plans-reports";

async function ensureDoc() {
  let doc = await PlansReportsModel.findOne({}).lean();
  if (!doc) {
    await PlansReportsModel.create({
      items: plansReportsItems.map((item, idx) => ({ ...item, file: item.file || "", order: idx })),
    });
    doc = await PlansReportsModel.findOne({}).lean();
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
    const body = (await req.json()) as { items?: Array<Record<string, unknown>> };
    const items = Array.isArray(body.items) ? body.items : [];
    const payload = items.map((item, idx) => ({
      id: String(item.id || `doc-${idx + 1}`).trim(),
      year: String(item.year || "").trim(),
      titleAr: String(item.titleAr || "").trim(),
      titleEn: String(item.titleEn || "").trim(),
      summaryAr: String(item.summaryAr || "").trim(),
      summaryEn: String(item.summaryEn || "").trim(),
      file: String(item.file || "").trim(),
      order: idx,
    }));
    const doc = await PlansReportsModel.findOneAndUpdate(
      {},
      { $set: { items: payload } },
      { new: true, upsert: true },
    ).lean();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
