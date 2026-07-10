import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QualityAssuranceModel } from "@/models/QualityAssurance";

const SEED_DATA = {
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
  objectives: [
    {
      id: "obj-1",
      textAr:
        "نشر وتعزيز مفاهيم ومعايير ثقافة الجودة وعمليات ضمان الجودة والاعتماد بين أعضاء مجتمع الكلية",
      textEn:
        "Promote concepts and standards of quality culture, quality assurance, and accreditation among college community members.",
      order: 0,
    },
    {
      id: "obj-2",
      textAr: "دعم سعي الكلية لتحقيق رسالتها وأهدافها الإستراتيجية",
      textEn: "Support the college in achieving its mission and strategic goals.",
      order: 1,
    },
    {
      id: "obj-3",
      textAr: "اقتراح السياسات والآليات التي تلبي معايير ومتطلبات الجودة",
      textEn: "Propose policies and mechanisms that satisfy quality standards and requirements.",
      order: 2,
    },
    {
      id: "obj-4",
      textAr: "متابعة تنفيذ السياسات والآليات ومراجعتها بشكل دوري",
      textEn: "Follow up policy implementation and review mechanisms periodically.",
      order: 3,
    },
  ],
  qmsTitleAr: "نظام إدارة الجودة",
  qmsTitleEn: "Quality Management System",
  qmsParagraph1Ar:
    "تعتمد كلية البريمي الجامعية نظام فعال لإدارة الجودة والذي يدعم حسن سير مهام العمل بطريقة عالية الجودة مع مراعاة الاحتياجات المختلفة لجميع أصحاب القرار.",
  qmsParagraph1En:
    "Al Buraimi University College adopts an effective quality management system that supports high-quality operations while considering stakeholder needs.",
  qmsParagraph2Ar:
    "من خلال نظام إدارة الجودة الذي يعتمد على التنمية المستدامة، تسعى كلية البريمي الجامعية إلى ضمان معايير الجودة في برامجها التعليمية وأنشطتها البحثية وخدمات المجتمع المحلي.",
  qmsParagraph2En:
    "Through a quality management system based on sustainable development, the college ensures quality standards in educational programs, research activities, and community services.",
  qmsGoalTitleAr: "الهدف الأساسي",
  qmsGoalTitleEn: "Main Goal",
  qmsGoalTextAr:
    "الهدف الأساسي لنظام إدارة الجودة في كلية البريمي الجامعية هو المساعدة في إنشاء إجراءات قياسية وممارسات مشتركة لدعم التحسين المستمر للتعلم والبحث والمشاركة المجتمعية.",
  qmsGoalTextEn:
    "The main goal of the quality management system is to establish standard procedures and shared practices that support continuous improvement in learning, research, and community engagement.",
  directorNameAr: "أ. يامن دريدي",
  directorNameEn: "Mr. Yamen Duraidi",
  directorRoleAr: "مدير دائرة ضمان الجودة",
  directorRoleEn: "Director of Quality Assurance Unit",
  directorEmail: "yamen@buc.edu.om",
};

async function seed() {
  try {
    await dbConnect();
    await QualityAssuranceModel.findOneAndUpdate(
      {},
      { $set: SEED_DATA },
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
