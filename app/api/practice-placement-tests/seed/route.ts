import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import PracticePlacementTest from "@/models/PracticePlacementTest";
import ExamType from "@/models/ExamType";
import { examTypesSeed, practiceExamsSeed } from "@/staticData/practice-exams";

export async function POST() {
  try {
    await connectDB();

    // Seed exam types
    const examTypesResult = await Promise.all(
      examTypesSeed.map(async (type) => {
        const existing = await ExamType.findOne({ nameEn: type.nameEn });
        if (existing) {
          return await ExamType.findByIdAndUpdate(existing._id, type, { new: true });
        }
        return await ExamType.create(type);
      })
    );

    // Get exam type IDs for mapping
    const mathType = await ExamType.findOne({ nameEn: "Mathematics" });
    const computerType = await ExamType.findOne({ nameEn: "Computer" });

    // Seed practice exams with correct examTypeId
    const testsResult = await Promise.all(
      practiceExamsSeed.map(async (exam, index) => {
        const examTypeId = index < 5 ? mathType?._id : computerType?._id;
        
        const existing = await PracticePlacementTest.findOne({ code: exam.code });
        if (existing) {
          return await PracticePlacementTest.findByIdAndUpdate(
            existing._id,
            { ...exam, examTypeId },
            { new: true }
          );
        }
        return await PracticePlacementTest.create({ ...exam, examTypeId });
      })
    );

    return NextResponse.json({
      ok: true,
      examTypes: examTypesResult.length,
      tests: testsResult.length,
    });
  } catch (error) {
    console.error("Error seeding practice placement tests:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to seed practice placement tests" },
      { status: 500 }
    );
  }
}
