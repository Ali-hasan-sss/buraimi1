import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HealthSafetyModel } from "@/models/HealthSafety";

const DEFAULT_DATA = {
  sectionTitleAr: "الأمن والسلامة",
  sectionTitleEn: "Health and Safety",
  sectionSubtitleAr: "الصحة والسلامة",
  sectionSubtitleEn: "Health and Safety",
  introTitleAr: "الصحة والسلامة",
  introTitleEn: "Health and Safety",
  introParagraph1Ar:
    "تلتزم كلية البريمي الجامعية بالحفاظ على بيئة صحية وآمنة لجميع الطلاب والموظفين والزوار.",
  introParagraph1En:
    "Buraimi University College is committed to maintaining a healthy and safe environment for all students, staff, and visitors.",
  introParagraph2Ar:
    "يهدف نظام إدارة الصحة والسلامة إلى إنشاء إطار لثقافة وممارسات الصحة والسلامة داخل مباني المؤسسة.",
  introParagraph2En:
    "The health and safety management system aims to establish a framework for health and safety culture and practices across the institution facilities.",
  objectivesTitleAr: "الأهداف",
  objectivesTitleEn: "Objectives",
  objectives: [],
  responsibilitiesTitleAr: "المسؤوليات",
  responsibilitiesTitleEn: "Responsibilities",
  committeeTitleAr: "مسؤوليات لجنة الصحة والسلامة في كلية البريمي الجامعية",
  committeeTitleEn: "Responsibilities of BUC Health and Safety Committee",
  committeeTextAr: "",
  committeeTextEn: "",
  supervisorsTitleAr: "مسؤوليات المشرفين",
  supervisorsTitleEn: "Supervisors Responsibilities",
  supervisorsText1Ar: "",
  supervisorsText1En: "",
  supervisorsText2Ar: "",
  supervisorsText2En: "",
  staffStudentsTitleAr: "مسؤوليات الموظفين والطلاب",
  staffStudentsTitleEn: "Staff and Students Responsibilities",
  staffStudentsTextAr: "",
  staffStudentsTextEn: "",
  badge1Ar: "حماية شاملة",
  badge1En: "Comprehensive Protection",
  badge2Ar: "بيئة صحية",
  badge2En: "Healthy Environment",
  badge3Ar: "الامتثال الكامل",
  badge3En: "Full Compliance",
  badge4Ar: "مسؤولية مشتركة",
  badge4En: "Shared Responsibility",
};

async function ensureDoc() {
  let doc = await HealthSafetyModel.findOne({}).lean();
  if (!doc) {
    await HealthSafetyModel.create(DEFAULT_DATA);
    doc = await HealthSafetyModel.findOne({}).lean();
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
    const objectives = Array.isArray(body.objectives) ? body.objectives : [];
    const payload = {
      ...DEFAULT_DATA,
      sectionTitleAr: String(body.sectionTitleAr || "").trim(),
      sectionTitleEn: String(body.sectionTitleEn || "").trim(),
      sectionSubtitleAr: String(body.sectionSubtitleAr || "").trim(),
      sectionSubtitleEn: String(body.sectionSubtitleEn || "").trim(),
      introTitleAr: String(body.introTitleAr || "").trim(),
      introTitleEn: String(body.introTitleEn || "").trim(),
      introParagraph1Ar: String(body.introParagraph1Ar || "").trim(),
      introParagraph1En: String(body.introParagraph1En || "").trim(),
      introParagraph2Ar: String(body.introParagraph2Ar || "").trim(),
      introParagraph2En: String(body.introParagraph2En || "").trim(),
      objectivesTitleAr: String(body.objectivesTitleAr || "").trim(),
      objectivesTitleEn: String(body.objectivesTitleEn || "").trim(),
      responsibilitiesTitleAr: String(body.responsibilitiesTitleAr || "").trim(),
      responsibilitiesTitleEn: String(body.responsibilitiesTitleEn || "").trim(),
      committeeTitleAr: String(body.committeeTitleAr || "").trim(),
      committeeTitleEn: String(body.committeeTitleEn || "").trim(),
      committeeTextAr: String(body.committeeTextAr || "").trim(),
      committeeTextEn: String(body.committeeTextEn || "").trim(),
      supervisorsTitleAr: String(body.supervisorsTitleAr || "").trim(),
      supervisorsTitleEn: String(body.supervisorsTitleEn || "").trim(),
      supervisorsText1Ar: String(body.supervisorsText1Ar || "").trim(),
      supervisorsText1En: String(body.supervisorsText1En || "").trim(),
      supervisorsText2Ar: String(body.supervisorsText2Ar || "").trim(),
      supervisorsText2En: String(body.supervisorsText2En || "").trim(),
      staffStudentsTitleAr: String(body.staffStudentsTitleAr || "").trim(),
      staffStudentsTitleEn: String(body.staffStudentsTitleEn || "").trim(),
      staffStudentsTextAr: String(body.staffStudentsTextAr || "").trim(),
      staffStudentsTextEn: String(body.staffStudentsTextEn || "").trim(),
      badge1Ar: String(body.badge1Ar || "").trim(),
      badge1En: String(body.badge1En || "").trim(),
      badge2Ar: String(body.badge2Ar || "").trim(),
      badge2En: String(body.badge2En || "").trim(),
      badge3Ar: String(body.badge3Ar || "").trim(),
      badge3En: String(body.badge3En || "").trim(),
      badge4Ar: String(body.badge4Ar || "").trim(),
      badge4En: String(body.badge4En || "").trim(),
      objectives: objectives.map((item, index) => {
        const x = item as Record<string, unknown>;
        return {
          id: String(x.id || `obj-${index + 1}`).trim(),
          textAr: String(x.textAr || "").trim(),
          textEn: String(x.textEn || "").trim(),
          order: index,
        };
      }),
    };
    const data = await HealthSafetyModel.findOneAndUpdate({}, { $set: payload }, { new: true, upsert: true }).lean();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
