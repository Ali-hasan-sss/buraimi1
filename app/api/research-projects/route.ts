import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ResearchProject from "@/models/ResearchProject";

export async function GET() {
  try {
    await dbConnect();
    const projects = await ResearchProject.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ ok: true, data: projects });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const project = await ResearchProject.create(body);
    return NextResponse.json({ ok: true, data: project });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
