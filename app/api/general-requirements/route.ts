import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GeneralRequirements from "@/models/GeneralRequirements";

export const dynamic = "force-dynamic";

// GET - Fetch all general requirements data
export async function GET() {
  try {
    await dbConnect();

    let data = await GeneralRequirements.findOne().lean();

    if (!data) {
      return NextResponse.json(
        { ok: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Error fetching general requirements:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch general requirements" },
      { status: 500 }
    );
  }
}

// PUT - Update general requirements data
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Find existing document or create new one
    let doc = await GeneralRequirements.findOne();

    if (doc) {
      // Update existing
      doc.hero = body.hero || doc.hero;
      doc.sections = body.sections || doc.sections;
      doc.cta = body.cta || doc.cta;
      doc.updatedAt = new Date();
      await doc.save();
    } else {
      // Create new
      doc = await GeneralRequirements.create(body);
    }

    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    console.error("Error updating general requirements:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to update general requirements" },
      { status: 500 }
    );
  }
}
