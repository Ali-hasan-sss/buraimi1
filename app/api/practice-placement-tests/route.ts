import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PracticePlacementTest from "@/models/PracticePlacementTest";
import ExamType from "@/models/ExamType";

// GET - Get all practice placement tests (with optional filter by exam type)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const examTypeId = searchParams.get("examTypeId");
    
    const query: { isActive?: boolean; examTypeId?: string } = { isActive: true };
    
    if (examTypeId) {
      query.examTypeId = examTypeId;
    }
    
    const tests = await PracticePlacementTest.find(query)
      .populate("examTypeId", "nameAr nameEn icon color")
      .sort({ order: 1 });
    
    return NextResponse.json({ ok: true, data: tests });
  } catch (error) {
    console.error("Error fetching practice placement tests:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch practice placement tests" },
      { status: 500 }
    );
  }
}

// POST - Create a new practice placement test
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const test = new PracticePlacementTest(body);
    await test.save();
    
    const populatedTest = await PracticePlacementTest.findById(test._id).populate(
      "examTypeId",
      "nameAr nameEn icon color"
    );
    
    return NextResponse.json({ ok: true, data: populatedTest });
  } catch (error) {
    console.error("Error creating practice placement test:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create practice placement test" },
      { status: 500 }
    );
  }
}
