import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";
import { seminarsSeed } from "@/staticData/seminars";

export const dynamic = "force-dynamic";

// POST - Seed seminars data
export async function POST() {
  try {
    await dbConnect();

    // Delete existing data
    await Seminar.deleteMany({});
    
    // Create new data
    const docs = await Seminar.insertMany(seminarsSeed);
    
    return NextResponse.json({
      ok: true,
      message: "Seminars seeded successfully",
      data: docs,
    });
  } catch (error) {
    console.error("Error seeding seminars:", error);
    return NextResponse.json({
      ok: false,
      message: "Failed to seed seminars",
    }, { status: 500 });
  }
}

// GET - Also allow seeding via GET for compatibility
export async function GET() {
  return POST();
}
