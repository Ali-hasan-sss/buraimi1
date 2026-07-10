import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ResearchProject from "@/models/ResearchProject";
import { researchProjectsSeedData } from "@/staticData/research-projects";

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await ResearchProject.deleteMany({});
    await ResearchProject.insertMany(researchProjectsSeedData);
    return NextResponse.json({ ok: true, count: researchProjectsSeedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await ResearchProject.deleteMany({});
    await ResearchProject.insertMany(researchProjectsSeedData);
    return NextResponse.json({ ok: true, count: researchProjectsSeedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
