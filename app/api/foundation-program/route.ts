import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { FoundationProgramModel } from "@/models/FoundationProgram";
import {
  foundationCompletionExamDetailsSeed,
  foundationFacultyPageSeed,
  foundationLevelOneDetailsSeed,
  foundationLevelTwoDetailsSeed,
  foundationProgramSeed,
} from "@/staticData/foundation-program";

async function ensureDoc() {
  let doc = await FoundationProgramModel.findOne({}).lean();
  if (!doc) {
    await FoundationProgramModel.create(foundationProgramSeed);
    doc = await FoundationProgramModel.findOne({}).lean();
    return doc;
  }

  const currentLevel1 = (doc as { level1Courses?: unknown[] }).level1Courses;
  const currentLevel2 = (doc as { level2Courses?: unknown[] }).level2Courses;
  const currentStudyTitleAr = (doc as { studyTitleAr?: unknown }).studyTitleAr;
  const currentStudyTitleEn = (doc as { studyTitleEn?: unknown }).studyTitleEn;
  const currentLevel1Details = (doc as { level1Details?: unknown }).level1Details;
  const currentLevel2Details = (doc as { level2Details?: unknown }).level2Details;
  const currentCompletionExamDetails = (doc as { completionExamDetails?: unknown }).completionExamDetails;
  const currentFacultyPageDetails = (doc as { facultyPageDetails?: unknown }).facultyPageDetails;
  const currentCompletionRequirementsAr = (doc as { completionRequirementsAr?: unknown }).completionRequirementsAr;
  const currentCompletionRequirementsEn = (doc as { completionRequirementsEn?: unknown }).completionRequirementsEn;

  const hasValidLevel1 = Array.isArray(currentLevel1) && currentLevel1.length > 0;
  const hasValidLevel2 = Array.isArray(currentLevel2) && currentLevel2.length > 0;
  const hasValidStudyTitleAr =
    typeof currentStudyTitleAr === "string" && currentStudyTitleAr.trim().length > 0;
  const hasValidStudyTitleEn =
    typeof currentStudyTitleEn === "string" && currentStudyTitleEn.trim().length > 0;
  const hasValidLevel1Details =
    typeof currentLevel1Details === "object" &&
    currentLevel1Details !== null &&
    Object.keys(currentLevel1Details as Record<string, unknown>).length > 0;
  const hasValidLevel2Details =
    typeof currentLevel2Details === "object" &&
    currentLevel2Details !== null &&
    Object.keys(currentLevel2Details as Record<string, unknown>).length > 0;
  const hasValidCompletionExamDetails =
    typeof currentCompletionExamDetails === "object" &&
    currentCompletionExamDetails !== null &&
    Object.keys(currentCompletionExamDetails as Record<string, unknown>).length > 0;
  const hasValidFacultyPageDetails =
    typeof currentFacultyPageDetails === "object" &&
    currentFacultyPageDetails !== null &&
    Object.keys(currentFacultyPageDetails as Record<string, unknown>).length > 0;
  const hasValidCompletionRequirementsAr =
    Array.isArray(currentCompletionRequirementsAr) && currentCompletionRequirementsAr.length > 0;
  const hasValidCompletionRequirementsEn =
    Array.isArray(currentCompletionRequirementsEn) && currentCompletionRequirementsEn.length > 0;

  const currentMathExamTitleAr = (doc as { mathExamTitleAr?: unknown }).mathExamTitleAr;
  const currentMathExamConditionsAr = (doc as { mathExamConditionsAr?: unknown }).mathExamConditionsAr;
  const hasValidMathExamTitleAr =
    typeof currentMathExamTitleAr === "string" && currentMathExamTitleAr.trim().length > 0;
  const hasValidMathExamConditionsAr =
    Array.isArray(currentMathExamConditionsAr) && currentMathExamConditionsAr.length > 0;

  const needsBackfill =
    !hasValidLevel1 ||
    !hasValidLevel2 ||
    !hasValidStudyTitleAr ||
    !hasValidStudyTitleEn ||
    !hasValidLevel1Details ||
    !hasValidLevel2Details ||
    !hasValidCompletionExamDetails ||
    !hasValidFacultyPageDetails ||
    !hasValidCompletionRequirementsAr ||
    !hasValidCompletionRequirementsEn ||
    !hasValidMathExamTitleAr ||
    !hasValidMathExamConditionsAr;

  if (needsBackfill) {
    await FoundationProgramModel.findOneAndUpdate(
      {},
      {
        $set: {
          level1Courses: Array.isArray((doc as { level1Courses?: unknown[] }).level1Courses)
            && (doc as { level1Courses: unknown[] }).level1Courses.length > 0
            ? (doc as { level1Courses: unknown[] }).level1Courses
            : foundationProgramSeed.level1Courses,
          level2Courses: Array.isArray((doc as { level2Courses?: unknown[] }).level2Courses)
            && (doc as { level2Courses: unknown[] }).level2Courses.length > 0
            ? (doc as { level2Courses: unknown[] }).level2Courses
            : foundationProgramSeed.level2Courses,
          studyTitleAr:
            typeof (doc as { studyTitleAr?: unknown }).studyTitleAr === "string" &&
            (doc as { studyTitleAr: string }).studyTitleAr.trim().length > 0
              ? (doc as { studyTitleAr: string }).studyTitleAr
              : foundationProgramSeed.studyTitleAr,
          studyTitleEn:
            typeof (doc as { studyTitleEn?: unknown }).studyTitleEn === "string" &&
            (doc as { studyTitleEn: string }).studyTitleEn.trim().length > 0
              ? (doc as { studyTitleEn: string }).studyTitleEn
              : foundationProgramSeed.studyTitleEn,
          level1Details: hasValidLevel1Details
            ? (doc as { level1Details: unknown }).level1Details
            : foundationLevelOneDetailsSeed,
          level2Details: hasValidLevel2Details
            ? (doc as { level2Details: unknown }).level2Details
            : foundationLevelTwoDetailsSeed,
          completionExamDetails: hasValidCompletionExamDetails
            ? (doc as { completionExamDetails: unknown }).completionExamDetails
            : foundationCompletionExamDetailsSeed,
          facultyPageDetails: hasValidFacultyPageDetails
            ? (doc as { facultyPageDetails: unknown }).facultyPageDetails
            : foundationFacultyPageSeed,
          completionTitleAr:
            typeof (doc as { completionTitleAr?: unknown }).completionTitleAr === "string" &&
            (doc as { completionTitleAr: string }).completionTitleAr.trim().length > 0
              ? (doc as { completionTitleAr: string }).completionTitleAr
              : foundationProgramSeed.completionTitleAr,
          completionTitleEn:
            typeof (doc as { completionTitleEn?: unknown }).completionTitleEn === "string" &&
            (doc as { completionTitleEn: string }).completionTitleEn.trim().length > 0
              ? (doc as { completionTitleEn: string }).completionTitleEn
              : foundationProgramSeed.completionTitleEn,
          completionDescriptionAr:
            typeof (doc as { completionDescriptionAr?: unknown }).completionDescriptionAr === "string" &&
            (doc as { completionDescriptionAr: string }).completionDescriptionAr.trim().length > 0
              ? (doc as { completionDescriptionAr: string }).completionDescriptionAr
              : foundationProgramSeed.completionDescriptionAr,
          completionDescriptionEn:
            typeof (doc as { completionDescriptionEn?: unknown }).completionDescriptionEn === "string" &&
            (doc as { completionDescriptionEn: string }).completionDescriptionEn.trim().length > 0
              ? (doc as { completionDescriptionEn: string }).completionDescriptionEn
              : foundationProgramSeed.completionDescriptionEn,
          completionRequirementsTitleAr:
            typeof (doc as { completionRequirementsTitleAr?: unknown }).completionRequirementsTitleAr === "string" &&
            (doc as { completionRequirementsTitleAr: string }).completionRequirementsTitleAr.trim().length > 0
              ? (doc as { completionRequirementsTitleAr: string }).completionRequirementsTitleAr
              : foundationProgramSeed.completionRequirementsTitleAr,
          completionRequirementsTitleEn:
            typeof (doc as { completionRequirementsTitleEn?: unknown }).completionRequirementsTitleEn === "string" &&
            (doc as { completionRequirementsTitleEn: string }).completionRequirementsTitleEn.trim().length > 0
              ? (doc as { completionRequirementsTitleEn: string }).completionRequirementsTitleEn
              : foundationProgramSeed.completionRequirementsTitleEn,
          completionRequirementsAr: hasValidCompletionRequirementsAr
            ? (doc as { completionRequirementsAr: unknown[] }).completionRequirementsAr
            : foundationProgramSeed.completionRequirementsAr,
          completionRequirementsEn: hasValidCompletionRequirementsEn
            ? (doc as { completionRequirementsEn: unknown[] }).completionRequirementsEn
            : foundationProgramSeed.completionRequirementsEn,
          completionScheduleTitleAr:
            typeof (doc as { completionScheduleTitleAr?: unknown }).completionScheduleTitleAr === "string" &&
            (doc as { completionScheduleTitleAr: string }).completionScheduleTitleAr.trim().length > 0
              ? (doc as { completionScheduleTitleAr: string }).completionScheduleTitleAr
              : foundationProgramSeed.completionScheduleTitleAr,
          completionScheduleTitleEn:
            typeof (doc as { completionScheduleTitleEn?: unknown }).completionScheduleTitleEn === "string" &&
            (doc as { completionScheduleTitleEn: string }).completionScheduleTitleEn.trim().length > 0
              ? (doc as { completionScheduleTitleEn: string }).completionScheduleTitleEn
              : foundationProgramSeed.completionScheduleTitleEn,
          completionScheduleTextAr:
            typeof (doc as { completionScheduleTextAr?: unknown }).completionScheduleTextAr === "string" &&
            (doc as { completionScheduleTextAr: string }).completionScheduleTextAr.trim().length > 0
              ? (doc as { completionScheduleTextAr: string }).completionScheduleTextAr
              : foundationProgramSeed.completionScheduleTextAr,
          completionScheduleTextEn:
            typeof (doc as { completionScheduleTextEn?: unknown }).completionScheduleTextEn === "string" &&
            (doc as { completionScheduleTextEn: string }).completionScheduleTextEn.trim().length > 0
              ? (doc as { completionScheduleTextEn: string }).completionScheduleTextEn
              : foundationProgramSeed.completionScheduleTextEn,
          completionButtonLabelAr:
            typeof (doc as { completionButtonLabelAr?: unknown }).completionButtonLabelAr === "string" &&
            (doc as { completionButtonLabelAr: string }).completionButtonLabelAr.trim().length > 0
              ? (doc as { completionButtonLabelAr: string }).completionButtonLabelAr
              : foundationProgramSeed.completionButtonLabelAr,
          completionButtonLabelEn:
            typeof (doc as { completionButtonLabelEn?: unknown }).completionButtonLabelEn === "string" &&
            (doc as { completionButtonLabelEn: string }).completionButtonLabelEn.trim().length > 0
              ? (doc as { completionButtonLabelEn: string }).completionButtonLabelEn
              : foundationProgramSeed.completionButtonLabelEn,
          mathExamTitleAr:
            typeof (doc as { mathExamTitleAr?: unknown }).mathExamTitleAr === "string" &&
            (doc as { mathExamTitleAr: string }).mathExamTitleAr.trim().length > 0
              ? (doc as { mathExamTitleAr: string }).mathExamTitleAr
              : foundationProgramSeed.mathExamTitleAr,
          mathExamTitleEn:
            typeof (doc as { mathExamTitleEn?: unknown }).mathExamTitleEn === "string" &&
            (doc as { mathExamTitleEn: string }).mathExamTitleEn.trim().length > 0
              ? (doc as { mathExamTitleEn: string }).mathExamTitleEn
              : foundationProgramSeed.mathExamTitleEn,
          mathExamDescriptionAr:
            typeof (doc as { mathExamDescriptionAr?: unknown }).mathExamDescriptionAr === "string" &&
            (doc as { mathExamDescriptionAr: string }).mathExamDescriptionAr.trim().length > 0
              ? (doc as { mathExamDescriptionAr: string }).mathExamDescriptionAr
              : foundationProgramSeed.mathExamDescriptionAr,
          mathExamDescriptionEn:
            typeof (doc as { mathExamDescriptionEn?: unknown }).mathExamDescriptionEn === "string" &&
            (doc as { mathExamDescriptionEn: string }).mathExamDescriptionEn.trim().length > 0
              ? (doc as { mathExamDescriptionEn: string }).mathExamDescriptionEn
              : foundationProgramSeed.mathExamDescriptionEn,
          mathExamDurationAr:
            typeof (doc as { mathExamDurationAr?: unknown }).mathExamDurationAr === "string" &&
            (doc as { mathExamDurationAr: string }).mathExamDurationAr.trim().length > 0
              ? (doc as { mathExamDurationAr: string }).mathExamDurationAr
              : foundationProgramSeed.mathExamDurationAr,
          mathExamDurationEn:
            typeof (doc as { mathExamDurationEn?: unknown }).mathExamDurationEn === "string" &&
            (doc as { mathExamDurationEn: string }).mathExamDurationEn.trim().length > 0
              ? (doc as { mathExamDurationEn: string }).mathExamDurationEn
              : foundationProgramSeed.mathExamDurationEn,
          mathExamDurationValueAr:
            typeof (doc as { mathExamDurationValueAr?: unknown }).mathExamDurationValueAr === "string" &&
            (doc as { mathExamDurationValueAr: string }).mathExamDurationValueAr.trim().length > 0
              ? (doc as { mathExamDurationValueAr: string }).mathExamDurationValueAr
              : foundationProgramSeed.mathExamDurationValueAr,
          mathExamDurationValueEn:
            typeof (doc as { mathExamDurationValueEn?: unknown }).mathExamDurationValueEn === "string" &&
            (doc as { mathExamDurationValueEn: string }).mathExamDurationValueEn.trim().length > 0
              ? (doc as { mathExamDurationValueEn: string }).mathExamDurationValueEn
              : foundationProgramSeed.mathExamDurationValueEn,
          mathExamPassMarkAr:
            typeof (doc as { mathExamPassMarkAr?: unknown }).mathExamPassMarkAr === "string" &&
            (doc as { mathExamPassMarkAr: string }).mathExamPassMarkAr.trim().length > 0
              ? (doc as { mathExamPassMarkAr: string }).mathExamPassMarkAr
              : foundationProgramSeed.mathExamPassMarkAr,
          mathExamPassMarkEn:
            typeof (doc as { mathExamPassMarkEn?: unknown }).mathExamPassMarkEn === "string" &&
            (doc as { mathExamPassMarkEn: string }).mathExamPassMarkEn.trim().length > 0
              ? (doc as { mathExamPassMarkEn: string }).mathExamPassMarkEn
              : foundationProgramSeed.mathExamPassMarkEn,
          mathExamPassMarkValueAr:
            typeof (doc as { mathExamPassMarkValueAr?: unknown }).mathExamPassMarkValueAr === "string" &&
            (doc as { mathExamPassMarkValueAr: string }).mathExamPassMarkValueAr.trim().length > 0
              ? (doc as { mathExamPassMarkValueAr: string }).mathExamPassMarkValueAr
              : foundationProgramSeed.mathExamPassMarkValueAr,
          mathExamPassMarkValueEn:
            typeof (doc as { mathExamPassMarkValueEn?: unknown }).mathExamPassMarkValueEn === "string" &&
            (doc as { mathExamPassMarkValueEn: string }).mathExamPassMarkValueEn.trim().length > 0
              ? (doc as { mathExamPassMarkValueEn: string }).mathExamPassMarkValueEn
              : foundationProgramSeed.mathExamPassMarkValueEn,
          mathExamRetakeAr:
            typeof (doc as { mathExamRetakeAr?: unknown }).mathExamRetakeAr === "string" &&
            (doc as { mathExamRetakeAr: string }).mathExamRetakeAr.trim().length > 0
              ? (doc as { mathExamRetakeAr: string }).mathExamRetakeAr
              : foundationProgramSeed.mathExamRetakeAr,
          mathExamRetakeEn:
            typeof (doc as { mathExamRetakeEn?: unknown }).mathExamRetakeEn === "string" &&
            (doc as { mathExamRetakeEn: string }).mathExamRetakeEn.trim().length > 0
              ? (doc as { mathExamRetakeEn: string }).mathExamRetakeEn
              : foundationProgramSeed.mathExamRetakeEn,
          mathExamRetakeValueAr:
            typeof (doc as { mathExamRetakeValueAr?: unknown }).mathExamRetakeValueAr === "string" &&
            (doc as { mathExamRetakeValueAr: string }).mathExamRetakeValueAr.trim().length > 0
              ? (doc as { mathExamRetakeValueAr: string }).mathExamRetakeValueAr
              : foundationProgramSeed.mathExamRetakeValueAr,
          mathExamRetakeValueEn:
            typeof (doc as { mathExamRetakeValueEn?: unknown }).mathExamRetakeValueEn === "string" &&
            (doc as { mathExamRetakeValueEn: string }).mathExamRetakeValueEn.trim().length > 0
              ? (doc as { mathExamRetakeValueEn: string }).mathExamRetakeValueEn
              : foundationProgramSeed.mathExamRetakeValueEn,
          mathExamConditionsTitleAr:
            typeof (doc as { mathExamConditionsTitleAr?: unknown }).mathExamConditionsTitleAr === "string" &&
            (doc as { mathExamConditionsTitleAr: string }).mathExamConditionsTitleAr.trim().length > 0
              ? (doc as { mathExamConditionsTitleAr: string }).mathExamConditionsTitleAr
              : foundationProgramSeed.mathExamConditionsTitleAr,
          mathExamConditionsTitleEn:
            typeof (doc as { mathExamConditionsTitleEn?: unknown }).mathExamConditionsTitleEn === "string" &&
            (doc as { mathExamConditionsTitleEn: string }).mathExamConditionsTitleEn.trim().length > 0
              ? (doc as { mathExamConditionsTitleEn: string }).mathExamConditionsTitleEn
              : foundationProgramSeed.mathExamConditionsTitleEn,
          mathExamConditionsAr: hasValidMathExamConditionsAr
            ? (doc as { mathExamConditionsAr: unknown[] }).mathExamConditionsAr
            : foundationProgramSeed.mathExamConditionsAr,
          mathExamConditionsEn: hasValidMathExamConditionsAr
            ? (doc as { mathExamConditionsEn: unknown[] }).mathExamConditionsEn
            : foundationProgramSeed.mathExamConditionsEn,
          mathExamButtonLabelAr:
            typeof (doc as { mathExamButtonLabelAr?: unknown }).mathExamButtonLabelAr === "string" &&
            (doc as { mathExamButtonLabelAr: string }).mathExamButtonLabelAr.trim().length > 0
              ? (doc as { mathExamButtonLabelAr: string }).mathExamButtonLabelAr
              : foundationProgramSeed.mathExamButtonLabelAr,
          mathExamButtonLabelEn:
            typeof (doc as { mathExamButtonLabelEn?: unknown }).mathExamButtonLabelEn === "string" &&
            (doc as { mathExamButtonLabelEn: string }).mathExamButtonLabelEn.trim().length > 0
              ? (doc as { mathExamButtonLabelEn: string }).mathExamButtonLabelEn
              : foundationProgramSeed.mathExamButtonLabelEn,
        },
      },
      { new: true },
    );
    doc = await FoundationProgramModel.findOne({}).lean();
  }

  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const data = await ensureDoc();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = (await req.json()) as Record<string, unknown>;
    const data = await FoundationProgramModel.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true },
    ).lean();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
