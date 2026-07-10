import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import EditorialMemberModel from "@/models/EditorialMember";

export async function GET() {
  try {
    await dbConnect();
    const members = await EditorialMemberModel.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ ok: true, data: members });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const member = await EditorialMemberModel.create(body);
    return NextResponse.json({ ok: true, data: member });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
