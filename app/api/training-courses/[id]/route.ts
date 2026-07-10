import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TrainingCourseModel from "@/models/TrainingCourse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;
    const updated = await TrainingCourseModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ ok: true, data: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    await TrainingCourseModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to delete" }, { status: 500 });
  }
}
