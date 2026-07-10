import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { CampusMapModel } from "@/models/CampusMap";

async function ensureDoc() {
  let doc = await CampusMapModel.findOne({}).lean();
  if (!doc) {
    await CampusMapModel.create({
      sectionTitleAr: "خارطة الحرم الجامعي",
      sectionTitleEn: "Campus Map",
      sectionSubtitleAr: "خارطة الحرم الجامعي",
      sectionSubtitleEn: "Campus Map",
      introAr: "",
      introEn: "",
      mapImage: "/assets/campusMapImg.webp",
      mapAltAr: "خارطة الحرم الجامعي - كلية البريمي الجامعية",
      mapAltEn: "Campus Map - Al Buraimi University College",
      legendTitleAr: "مفتاح الخريطة",
      legendTitleEn: "Map Legend",
      legendItems: [],
      safetyTitleAr: "تعليمات السلامة",
      safetyTitleEn: "Safety Instructions",
      safetyItems: [],
      contacts: [],
    });
    doc = await CampusMapModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const data = await ensureDoc();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = (await req.json()) as Record<string, unknown>;
    const data = await CampusMapModel.findOneAndUpdate({}, { $set: body }, { new: true, upsert: true }).lean();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
