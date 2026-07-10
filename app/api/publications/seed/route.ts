import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Publication from "@/models/Publication";
import { publicationsSeedData } from "@/staticData/publications";

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await Publication.deleteMany({});
    await Publication.insertMany(publicationsSeedData);
    return NextResponse.json({ ok: true, count: publicationsSeedData.length });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await Publication.deleteMany({});
    await Publication.insertMany(publicationsSeedData);
    return NextResponse.json({ ok: true, count: publicationsSeedData.length });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
