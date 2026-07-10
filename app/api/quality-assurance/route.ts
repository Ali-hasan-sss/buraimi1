import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QualityAssuranceModel } from "@/models/QualityAssurance";

async function ensureDoc() {
  let doc = await QualityAssuranceModel.findOne({}).lean();
  if (!doc) {
    await QualityAssuranceModel.create({
      sectionTitleAr: "دائرة ضمان الجودة",
      sectionTitleEn: "Quality Assurance Unit",
      visionTitleAr: "رؤية دائرة ضمان الجودة",
      visionTitleEn: "Vision of Quality Assurance Unit",
      visionTextAr:
        "أن نكون من بين مؤسسات التعليم العالي الرائدة في سلطنة عمان في تطبيق معايير الجودة",
      visionTextEn:
        "To be among the leading higher education institutions in Oman in applying quality standards.",
      missionTitleAr: "رسالة دائرة ضمان الجودة",
      missionTitleEn: "Mission of Quality Assurance Unit",
      missionTextAr:
        "تطبيق نظام فعال لإدارة الجودة يهدف إلى نشر وتعزيز ثقافة الجودة في جميع مراحل التدريس والتعلم والأنشطة اللامنهجية والبحث والخدمات المجتمعية",
      missionTextEn:
        "Implementing an effective quality management system to promote quality culture across teaching, learning, extracurricular activities, research, and community services.",
      objectivesTitleAr: "أهداف دائرة ضمان الجودة",
      objectivesTitleEn: "Quality Assurance Objectives",
      objectives: [],
      qmsTitleAr: "نظام إدارة الجودة",
      qmsTitleEn: "Quality Management System",
      qmsParagraph1Ar: "",
      qmsParagraph1En: "",
      qmsParagraph2Ar: "",
      qmsParagraph2En: "",
      qmsGoalTitleAr: "الهدف الأساسي",
      qmsGoalTitleEn: "Main Goal",
      qmsGoalTextAr: "",
      qmsGoalTextEn: "",
      directorNameAr: "أ. يامن دريدي",
      directorNameEn: "Mr. Yamen Duraidi",
      directorRoleAr: "مدير دائرة ضمان الجودة",
      directorRoleEn: "Director of Quality Assurance Unit",
      directorEmail: "yamen@buc.edu.om",
    });
    doc = await QualityAssuranceModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await ensureDoc();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const payload = {
      sectionTitleAr: String(body?.sectionTitleAr || "").trim(),
      sectionTitleEn: String(body?.sectionTitleEn || "").trim(),
      visionTitleAr: String(body?.visionTitleAr || "").trim(),
      visionTitleEn: String(body?.visionTitleEn || "").trim(),
      visionTextAr: String(body?.visionTextAr || "").trim(),
      visionTextEn: String(body?.visionTextEn || "").trim(),
      missionTitleAr: String(body?.missionTitleAr || "").trim(),
      missionTitleEn: String(body?.missionTitleEn || "").trim(),
      missionTextAr: String(body?.missionTextAr || "").trim(),
      missionTextEn: String(body?.missionTextEn || "").trim(),
      objectivesTitleAr: String(body?.objectivesTitleAr || "").trim(),
      objectivesTitleEn: String(body?.objectivesTitleEn || "").trim(),
      objectives: Array.isArray(body?.objectives)
        ? body.objectives.map((obj: unknown, index: number) => {
            const x = obj as Record<string, unknown>;
            return {
              id: String(x.id || `obj-${index + 1}`).trim(),
              textAr: String(x.textAr || "").trim(),
              textEn: String(x.textEn || "").trim(),
              order: Number.isFinite(Number(x.order)) ? Number(x.order) : index,
            };
          })
        : [],
      qmsTitleAr: String(body?.qmsTitleAr || "").trim(),
      qmsTitleEn: String(body?.qmsTitleEn || "").trim(),
      qmsParagraph1Ar: String(body?.qmsParagraph1Ar || "").trim(),
      qmsParagraph1En: String(body?.qmsParagraph1En || "").trim(),
      qmsParagraph2Ar: String(body?.qmsParagraph2Ar || "").trim(),
      qmsParagraph2En: String(body?.qmsParagraph2En || "").trim(),
      qmsGoalTitleAr: String(body?.qmsGoalTitleAr || "").trim(),
      qmsGoalTitleEn: String(body?.qmsGoalTitleEn || "").trim(),
      qmsGoalTextAr: String(body?.qmsGoalTextAr || "").trim(),
      qmsGoalTextEn: String(body?.qmsGoalTextEn || "").trim(),
      directorNameAr: String(body?.directorNameAr || "").trim(),
      directorNameEn: String(body?.directorNameEn || "").trim(),
      directorRoleAr: String(body?.directorRoleAr || "").trim(),
      directorRoleEn: String(body?.directorRoleEn || "").trim(),
      directorEmail: String(body?.directorEmail || "").trim(),
    };

    const updated = await QualityAssuranceModel.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true },
    ).lean();

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
