import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";

const SEED_CAREERS = [
  {
    titleAr: "محاضر - علوم الحاسب",
    titleEn: "Lecturer - Computer Science",
    descriptionAr:
      "<p>تعلن كلية البريمي الجامعية عن توفر شاغر وظيفي لمحاضر في تخصص علوم الحاسب للمساهمة في التدريس وتطوير المقررات والإشراف الأكاديمي.</p>",
    descriptionEn:
      "<p>Al Buraimi University College announces a vacancy for a Lecturer in Computer Science to contribute to teaching, course development, and academic advising.</p>",
    requirementsAr:
      "<ul><li>درجة ماجستير أو دكتوراه في علوم الحاسب أو تخصص ذي صلة.</li><li>خبرة تدريس جامعي لا تقل عن سنتين.</li><li>إجادة اللغة الإنجليزية واستخدام أنظمة التعلم الإلكتروني.</li></ul>",
    requirementsEn:
      "<ul><li>Master's or PhD in Computer Science or related discipline.</li><li>At least 2 years of university teaching experience.</li><li>Strong English communication and LMS proficiency.</li></ul>",
    startDate: "2026-06-01",
    edDate: "2026-07-15",
  },
  {
    titleAr: "مسؤول قبول وتسجيل",
    titleEn: "Admissions and Registration Officer",
    descriptionAr:
      "<p>تبحث الكلية عن مسؤول قبول وتسجيل لإدارة طلبات الالتحاق وسجلات الطلبة والتواصل مع المتقدمين.</p>",
    descriptionEn:
      "<p>The college is seeking an Admissions and Registration Officer to manage applications, student records, and applicant communication.</p>",
    requirementsAr:
      "<ul><li>بكالوريوس في إدارة الأعمال أو تخصص مناسب.</li><li>خبرة في أنظمة القبول والتسجيل وخدمة المتعاملين.</li><li>مهارات تنظيم واتصال ممتازة.</li></ul>",
    requirementsEn:
      "<ul><li>Bachelor's degree in Business Administration or relevant field.</li><li>Experience with admissions/registration systems and customer service.</li><li>Excellent organization and communication skills.</li></ul>",
    startDate: "2026-06-10",
    edDate: "2026-07-31",
  },
];

async function seed() {
  try {
    await dbConnect();
    for (const item of SEED_CAREERS) {
      await CareersModel.updateOne(
        { titleEn: item.titleEn },
        { $set: item },
        { upsert: true },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}
