import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GalleryImageModel from "@/models/GalleryImage";

export async function GET() {
  try {
    await dbConnect();
    const images = await GalleryImageModel.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ ok: true, data: images });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const image = await GalleryImageModel.create(body);
    return NextResponse.json({ ok: true, data: image });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
