import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { MathCompletionExamModel } from "@/models/MathCompletionExam";
import { mathCompletionExamSeed } from "@/staticData/math-completion-exam";
import type { MathCompletionExamData } from "@/staticData/math-completion-exam";
import { getSession } from "@/lib/auth";

async function ensureDoc() {
  let doc = await MathCompletionExamModel.findOne({}).lean();
  if (!doc) {
    await MathCompletionExamModel.create(mathCompletionExamSeed);
    doc = await MathCompletionExamModel.findOne({}).lean();
    return doc;
  }

  // Check if any required field is missing and backfill from seed
  const needsBackfill =
    !doc.heroTitleAr ||
    !doc.heroTitleEn ||
    !doc.heroSubtitleAr ||
    !doc.heroSubtitleEn ||
    !doc.aboutTitleAr ||
    !doc.aboutTitleEn ||
    !doc.aboutDescriptionAr ||
    !doc.aboutDescriptionEn ||
    !doc.aboutGoalTitleAr ||
    !doc.aboutGoalTitleEn ||
    !doc.aboutGoalTextAr ||
    !doc.aboutGoalTextEn ||
    !doc.durationLabelAr ||
    !doc.durationLabelEn ||
    !doc.durationValueAr ||
    !doc.durationValueEn ||
    !doc.durationNoteAr ||
    !doc.durationNoteEn ||
    !doc.passMarkLabelAr ||
    !doc.passMarkLabelEn ||
    !doc.passMarkValueAr ||
    !doc.passMarkValueEn ||
    !doc.passMarkNoteAr ||
    !doc.passMarkNoteEn ||
    !doc.retakeLabelAr ||
    !doc.retakeLabelEn ||
    !doc.retakeValueAr ||
    !doc.retakeValueEn ||
    !doc.retakeNoteAr ||
    !doc.retakeNoteEn ||
    !doc.eligibilityTitleAr ||
    !doc.eligibilityTitleEn ||
    !doc.eligibilityAppliedMathTitleAr ||
    !doc.eligibilityAppliedMathTitleEn ||
    !doc.eligibilityAppliedMathDescAr ||
    !doc.eligibilityAppliedMathDescEn ||
    !doc.eligibilityPureMathTitleAr ||
    !doc.eligibilityPureMathTitleEn ||
    !doc.eligibilityPureMathDescAr ||
    !doc.eligibilityPureMathDescEn ||
    !doc.eligibilityNoteTitleAr ||
    !doc.eligibilityNoteTitleEn ||
    !doc.eligibilityNoteTextAr ||
    !doc.eligibilityNoteTextEn;

  if (needsBackfill) {
    const updateData: Record<string, unknown> = {};

    for (const key of Object.keys(mathCompletionExamSeed) as Array<keyof MathCompletionExamData>) {
      const docValue = doc[key as keyof typeof doc];
      if (docValue === undefined || docValue === null || docValue === "") {
        updateData[key] = mathCompletionExamSeed[key];
      }
    }

    if (Object.keys(updateData).length > 0) {
      await MathCompletionExamModel.findOneAndUpdate({}, { $set: updateData }, { new: true });
      doc = await MathCompletionExamModel.findOne({}).lean();
    }
  }

  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await ensureDoc();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    console.error("MathCompletionExam GET error:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session?.email) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const allowedAdmins = getAdminEmails();
    const isAllowedAdmin =
      allowedAdmins.length === 0 || allowedAdmins.includes(session.email.toLowerCase());

    if (!isAllowedAdmin) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    const body = (await request.json()) as Partial<MathCompletionExamData>;

    // Remove _id and timestamps from body if present
    delete (body as { _id?: string })._id;
    delete (body as { createdAt?: string }).createdAt;
    delete (body as { updatedAt?: string }).updatedAt;

    const updated = await MathCompletionExamModel.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    console.error("MathCompletionExam PUT error:", error);
    return NextResponse.json({ ok: false, error: "Failed to update data" }, { status: 500 });
  }
}
