import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";

// PUT - Update a seminar
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = await params;

    const seminar = await Seminar.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!seminar) {
      return NextResponse.json({ ok: false, error: "Seminar not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: seminar });
  } catch (error) {
    console.error("Error updating seminar:", error);
    return NextResponse.json({ ok: false, error: "Failed to update seminar" }, { status: 500 });
  }
}

// DELETE - Delete a seminar
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const seminar = await Seminar.findByIdAndDelete(id);

    if (!seminar) {
      return NextResponse.json({ ok: false, error: "Seminar not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Seminar deleted successfully" });
  } catch (error) {
    console.error("Error deleting seminar:", error);
    return NextResponse.json({ ok: false, error: "Failed to delete seminar" }, { status: 500 });
  }
}
