import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { MathCompletionExamModel } from "@/models/MathCompletionExam";
import { mathCompletionExamSeed } from "@/staticData/math-completion-exam";

async function seed() {
  try {
    await dbConnect();
    await MathCompletionExamModel.findOneAndUpdate(
      {},
      { $set: mathCompletionExamSeed },
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
