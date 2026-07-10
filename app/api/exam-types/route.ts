import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ExamType from "@/models/ExamType";

// GET - Get all exam types
export async function GET() {
  try {
    await dbConnect();
    const examTypes = await ExamType.find({}).sort({ order: 1 });
    return NextResponse.json({ ok: true, data: examTypes });
  } catch (error) {
    console.error("Error fetching exam types:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch exam types" }, { status: 500 });
  }
}

// POST - Create a new exam type
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const examType = new ExamType(body);
    await examType.save();
    
    return NextResponse.json({ ok: true, data: examType });
  } catch (error) {
    console.error("Error creating exam type:", error);
    return NextResponse.json({ ok: false, error: "Failed to create exam type" }, { status: 500 });
  }
}
