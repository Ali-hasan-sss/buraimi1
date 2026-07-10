import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Publication from "@/models/Publication";

export async function GET() {
  try {
    await dbConnect();
    const publications = await Publication.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ ok: true, data: publications });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const publication = await Publication.create(body);
    return NextResponse.json({ ok: true, data: publication });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
