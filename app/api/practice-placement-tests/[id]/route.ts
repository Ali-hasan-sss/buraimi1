import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import PracticePlacementTest from "@/models/PracticePlacementTest";

// GET - Get a specific practice placement test
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const test = await PracticePlacementTest.findById(id).populate(
      "examTypeId",
      "nameAr nameEn icon color"
    );

    if (!test) {
      return NextResponse.json({ ok: false, error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: test });
  } catch (error) {
    console.error("Error fetching practice placement test:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch practice placement test" },
      { status: 500 }
    );
  }
}

// PUT - Update a practice placement test
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await request.json();

    const test = await PracticePlacementTest.findByIdAndUpdate(id, body, {
      new: true,
    }).populate("examTypeId", "nameAr nameEn icon color");

    if (!test) {
      return NextResponse.json({ ok: false, error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: test });
  } catch (error) {
    console.error("Error updating practice placement test:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update practice placement test" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a practice placement test
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const test = await PracticePlacementTest.findByIdAndDelete(id);

    if (!test) {
      return NextResponse.json({ ok: false, error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting practice placement test:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete practice placement test" },
      { status: 500 }
    );
  }
}
