import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";

export const dynamic = "force-dynamic";

// GET - Get all seminars
export async function GET() {
  try {
    await dbConnect();
    const seminars = await Seminar.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ ok: true, data: seminars });
  } catch (error) {
    console.error("Error fetching seminars:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch seminars" }, { status: 500 });
  }
}

// POST - Create a new seminar
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const seminar = new Seminar(body);
    await seminar.save();
    
    return NextResponse.json({ ok: true, data: seminar });
  } catch (error) {
    console.error("Error creating seminar:", error);
    return NextResponse.json({ ok: false, error: "Failed to create seminar" }, { status: 500 });
  }
}
