import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HealthSafetyModel } from "@/models/HealthSafety";

const SEED_DATA = {
  sectionTitleAr: "الأمن والسلامة",
  sectionTitleEn: "Health and Safety",
  sectionSubtitleAr: "الصحة والسلامة",
  sectionSubtitleEn: "Health and Safety",
  introTitleAr: "الصحة والسلامة",
  introTitleEn: "Health and Safety",
  introParagraph1Ar:
    "تلتزم كلية البريمي الجامعية بالحفاظ على بيئة صحية وآمنة لجميع الطلاب والموظفين والزوار. يجب على الموظفين والطلاب والزوار الالتزام بمسؤولية حماية وتعزيز سلامة وصحة أنفسهم والآخرين، وممارسة أنشطتهم بطريقة مصممة لمنع الحوادث وتقليل مخاطر الإصابة والأذى.",
  introParagraph1En:
    "Buraimi University College is committed to maintaining a healthy and safe environment for all students, staff, and visitors. Staff, students, and visitors should protect and promote their own health and safety and that of others by practicing activities in a way that prevents accidents and reduces risks of injury and harm.",
  introParagraph2Ar:
    "يهدف نظام إدارة الصحة والسلامة إلى إنشاء إطار لثقافة وممارسات الصحة والسلامة داخل مباني المؤسسة. إن لجنة الصحة والسلامة في كلية البريمي الجامعية هي اللجنة المسؤولة عن إصدار إجراءات وبروتوكولات السلامة والصحة. يجب توفير قياس متسق لحوادث السلامة، لتحسين الأداء.",
  introParagraph2En:
    "The health and safety management system aims to establish a framework for health and safety culture and practices across the institution facilities. The Health and Safety Committee at BUC is responsible for issuing procedures and protocols. Consistent measurement of safety incidents must be maintained to improve performance.",
  objectivesTitleAr: "الأهداف",
  objectivesTitleEn: "Objectives",
  objectives: [
    { id: "obj-1", textAr: "تعزيز ثقافة الصحة والسلامة في كلية البريمي الجامعية", textEn: "Promote a health and safety culture at BUC.", order: 0 },
    { id: "obj-2", textAr: "ضمان أن جميع الموظفين والطلاب على دراية بإجراءات وبروتوكولات الصحة والسلامة", textEn: "Ensure all staff and students are aware of health and safety procedures and protocols.", order: 1 },
    { id: "obj-3", textAr: "منع الحوادث وتقليل الإصابات والأمراض عبر تحديد المخاطر والتخفيف منها", textEn: "Prevent accidents and reduce injuries and illnesses by identifying and mitigating hazards.", order: 2 },
  ],
  responsibilitiesTitleAr: "المسؤوليات",
  responsibilitiesTitleEn: "Responsibilities",
  committeeTitleAr: "مسؤوليات لجنة الصحة والسلامة في كلية البريمي الجامعية",
  committeeTitleEn: "Responsibilities of BUC Health and Safety Committee",
  committeeTextAr:
    "تتحمل اللجنة المسؤولية الأساسية عن الحفاظ على بيئة عمل صحية وآمنة داخل منطقة مسؤوليتها، وتطوير وتنفيذ إجراءات الصحة والسلامة والتدريب، وتوجيه انتباه القيادة إلى أي مخاطر تتطلب التقييم والاستجابة على مستوى الكلية.",
  committeeTextEn:
    "The committee holds primary responsibility for maintaining a healthy and safe working environment, developing and implementing health and safety procedures and training, and escalating hazards that require college-level assessment and response.",
  supervisorsTitleAr: "مسؤوليات المشرفين",
  supervisorsTitleEn: "Supervisors Responsibilities",
  supervisorsText1Ar:
    "يتحمل المشرفون مسؤولية محددة لتوفير الصحة والسلامة لمن هم تحت إشرافهم، وأن يظلوا على دراية كاملة بالقواعد وكيفية تطبيقها في مجالات مسؤوليتهم.",
  supervisorsText1En:
    "Supervisors are specifically responsible for providing health and safety for those under their supervision and must remain fully aware of the rules and their application in their areas.",
  supervisorsText2Ar:
    "يتحمل المشرفون أيضاً مسؤولية مباشرة لضمان توفير معدات السلامة والصحة المطلوبة وصيانتها واستخدامها بشكل صحيح.",
  supervisorsText2En:
    "Supervisors also have direct responsibility to ensure required safety equipment is provided, maintained, and properly used.",
  staffStudentsTitleAr: "مسؤوليات الموظفين والطلاب",
  staffStudentsTitleEn: "Staff and Students Responsibilities",
  staffStudentsTextAr:
    "يتحمل الموظفون والطلاب مسؤولية الامتثال للمعايير والإجراءات المعمول بها، والتعرف على المخاطر المحتملة، واستخدام معدات الحماية والإبلاغ عن الظروف غير الآمنة.",
  staffStudentsTextEn:
    "Staff and students are responsible for complying with applicable standards and procedures, identifying potential hazards, properly using protective equipment, and reporting unsafe conditions.",
  badge1Ar: "حماية شاملة",
  badge1En: "Comprehensive Protection",
  badge2Ar: "بيئة صحية",
  badge2En: "Healthy Environment",
  badge3Ar: "الامتثال الكامل",
  badge3En: "Full Compliance",
  badge4Ar: "مسؤولية مشتركة",
  badge4En: "Shared Responsibility",
};

async function seed() {
  try {
    await dbConnect();
    await HealthSafetyModel.findOneAndUpdate({}, { $set: SEED_DATA }, { new: true, upsert: true });
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
