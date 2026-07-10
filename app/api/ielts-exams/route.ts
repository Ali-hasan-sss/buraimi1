import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import IeltsExamModel from "@/models/IeltsExam";

export async function GET() {
  try {
    await dbConnect();
    const exams = await IeltsExamModel.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ ok: true, data: exams });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const exam = await IeltsExamModel.create(body);
    return NextResponse.json({ ok: true, data: exam });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
