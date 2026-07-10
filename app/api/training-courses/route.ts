import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TrainingCourseModel from "@/models/TrainingCourse";

export async function GET() {
  try {
    await dbConnect();
    const courses = await TrainingCourseModel.find({ isActive: true })
      .sort({ fieldId: 1, order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ ok: true, data: courses });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const course = await TrainingCourseModel.create(body);
    return NextResponse.json({ ok: true, data: course });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
