import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { FactStat } from "@/models/FactStat";

export const runtime = "nodejs";

const DEFAULT_FACT_STATS = [
  {
    titleAr: "دراسات عليا",
    titleEn: "Graduate Studies",
    value: 16000,
    suffixAr: "الطلاب",
    suffixEn: "Students",
    order: 0,
  },
  {
    titleAr: "خريج",
    titleEn: "Graduates",
    value: 2500,
    suffixAr: "الطلاب",
    suffixEn: "Students",
    order: 1,
  },
  {
    titleAr: "خبرتنا",
    titleEn: "Our Experience",
    value: 20,
    suffixAr: "سنة",
    suffixEn: "Years",
    order: 2,
  },
] as const;

type FactStatPayload = {
  titleAr?: string;
  titleEn?: string;
  value?: number;
  suffixAr?: string;
  suffixEn?: string;
  order?: number;
};

export async function GET() {
  try {
    await dbConnect();
    let docs = await FactStat.find({}).sort({ order: 1, createdAt: 1 }).lean();

    if (!docs.length) {
      await FactStat.insertMany(DEFAULT_FACT_STATS);
      docs = await FactStat.find({}).sort({ order: 1, createdAt: 1 }).lean();
    }

    return NextResponse.json({ ok: true, data: docs });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = (await request.json()) as FactStatPayload;

    const titleAr = String(body.titleAr || "").trim();
    const titleEn = String(body.titleEn || "").trim();
    const suffixAr = String(body.suffixAr || "").trim();
    const suffixEn = String(body.suffixEn || "").trim();
    const value = Number(body.value);
    const order = Number(body.order);

    if (!titleAr || !titleEn || Number.isNaN(value) || value < 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid title or value" },
        { status: 400 },
      );
    }

    const doc = await FactStat.create({
      titleAr,
      titleEn,
      suffixAr,
      suffixEn,
      value,
      order: Number.isNaN(order) || order < 0 ? 0 : order,
    });

    return NextResponse.json({ ok: true, data: doc }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
