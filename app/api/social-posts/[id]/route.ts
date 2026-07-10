import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { SocialPostModel } from "@/models/SocialPost";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const updated = await SocialPostModel.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!updated) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, data: updated });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await SocialPostModel.findByIdAndDelete(id).lean();
    if (!deleted) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, data: deleted });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
