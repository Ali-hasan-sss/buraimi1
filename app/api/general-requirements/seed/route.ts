import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GeneralRequirements from "@/models/GeneralRequirements";
import { generalRequirementsSeed } from "@/staticData/general-requirements";

export const dynamic = "force-dynamic";

// POST - Seed general requirements data
export async function POST() {
  try {
    await dbConnect();

    // Delete existing data to ensure fresh seed with all nested arrays
    await GeneralRequirements.deleteMany({});
    
    // Create new document with fresh data
    const doc = await GeneralRequirements.create(generalRequirementsSeed);
    
    return NextResponse.json({
      ok: true,
      message: "General requirements data seeded successfully (fresh)",
      data: doc,
    });
  } catch (error) {
    console.error("Error seeding general requirements:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to seed general requirements" },
      { status: 500 }
    );
  }
}

// GET - Also allow seeding via GET for compatibility
export async function GET() {
  return POST();
}
