import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { FoundationProgramModel } from "@/models/FoundationProgram";
import {
  foundationCompletionExamDetailsSeed,
  foundationLevelOneDetailsSeed,
  foundationLevelTwoDetailsSeed,
  foundationProgramSeed,
} from "@/staticData/foundation-program";

async function seed() {
  try {
    await dbConnect();
    await FoundationProgramModel.findOneAndUpdate(
      {},
      {
        $set: {
          ...foundationProgramSeed,
          level1Details: foundationLevelOneDetailsSeed,
          level2Details: foundationLevelTwoDetailsSeed,
          completionExamDetails: foundationCompletionExamDetailsSeed,
        },
      },
      { new: true, upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}
