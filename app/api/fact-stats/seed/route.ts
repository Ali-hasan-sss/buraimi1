import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { FactStat } from "@/models/FactStat";

export const runtime = "nodejs";

const SEED_FACT_STATS = [
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

async function seed() {
  try {
    await dbConnect();

    const operations = SEED_FACT_STATS.map((item) => ({
      updateOne: {
        filter: { order: item.order },
        update: { $set: item },
        upsert: true,
      },
    }));

    const result = await FactStat.bulkWrite(operations);
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
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
