import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GalleryImageModel from "@/models/GalleryImage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    await GalleryImageModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to delete" }, { status: 500 });
  }
}
