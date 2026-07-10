import { NextRequest, NextResponse } from "next/server";
import ExamType from "@/models/ExamType";
import dbConnect from "@/lib/dbConnect";
// GET - Get a specific exam type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const examType = await ExamType.findById(id);
    
    if (!examType) {
      return NextResponse.json({ ok: false, error: "Exam type not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ok: true, data: examType });
  } catch (error) {
    console.error("Error fetching exam type:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch exam type" }, { status: 500 });
  }
}

// PUT - Update an exam type
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const body = await request.json();
    
    const examType = await ExamType.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    
    if (!examType) {
      return NextResponse.json({ ok: false, error: "Exam type not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ok: true, data: examType });
  } catch (error) {
    console.error("Error updating exam type:", error);
    return NextResponse.json({ ok: false, error: "Failed to update exam type" }, { status: 500 });
  }
}

// DELETE - Delete an exam type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await dbConnect();
    const examType = await ExamType.findByIdAndDelete(id);
    
    if (!examType) {
      return NextResponse.json({ ok: false, error: "Exam type not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting exam type:", error);
    return NextResponse.json({ ok: false, error: "Failed to delete exam type" }, { status: 500 });
  }
}
