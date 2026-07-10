import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose, { Schema, Document } from "mongoose";

interface IPublicationsFile extends Document {
  fileUrl: string;
  fileName: string;
  updatedAt: Date;
}

const PublicationsFileSchema = new Schema<IPublicationsFile>(
  {
    fileUrl: { type: String, required: true },
    fileName: { type: String, default: "publications-list.pdf" },
  },
  { timestamps: true }
);

const PublicationsFile =
  mongoose.models.PublicationsFile ||
  mongoose.model<IPublicationsFile>("PublicationsFile", PublicationsFileSchema);

export async function GET() {
  try {
    await dbConnect();
    const doc = await PublicationsFile.findOne({}).lean();
    return NextResponse.json({ ok: true, data: doc || null });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { fileUrl, fileName } = await request.json();
    if (!fileUrl) {
      return NextResponse.json({ ok: false, error: "fileUrl is required" }, { status: 400 });
    }
    // upsert — keep only one document
    const doc = await PublicationsFile.findOneAndUpdate(
      {},
      { fileUrl, fileName: fileName || "publications-list.pdf" },
      { upsert: true, new: true }
    );
    return NextResponse.json({ ok: true, data: doc });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 });
  }
}
