import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PoliciesByDepartmentModel } from "@/models/PoliciesByDepartment";

const SEED_DATA = {
  sectionTitleAr: "السياسات حسب الدوائر",
  sectionTitleEn: "Policies by Departments",
  sectionSubtitleAr: "سياسات الدوائر المختلفة",
  sectionSubtitleEn: "Policies by Departments",
  departments: [
    {
      id: "quality-dept",
      titleAr: "دائرة ضمان الجودة",
      titleEn: "Quality Assurance Department",
      order: 0,
      policies: [
        { id: "pms", titleAr: "نظام إدارة السياسات", titleEn: "Policies Management System", file: "#", order: 0 },
        { id: "risk", titleAr: "سياسة إدارة المخاطر", titleEn: "Risk Management Policy", file: "#", order: 1 },
        { id: "comm", titleAr: "سياسة التواصل", titleEn: "Communication Policy", file: "#", order: 2 },
      ],
    },
    {
      id: "academic",
      titleAr: "الشؤون الأكاديمية",
      titleEn: "Academic Affairs",
      order: 1,
      policies: [
        { id: "ac01", titleAr: "عبء التدريس للهيئة الأكاديمية (AC01)", titleEn: "Academic Staff Teaching Workload (AC01)", file: "#", order: 0 },
        { id: "ac02", titleAr: "سياسة تطوير ومراجعة البرامج (AC02)", titleEn: "Program Development and Review Policy (AC02)", file: "#", order: 1 },
      ],
    },
    {
      id: "research",
      titleAr: "البحث العلمي",
      titleEn: "Scientific Research",
      order: 2,
      policies: [
        { id: "sr01", titleAr: "سياسة المشاركة في المؤتمرات (SR01)", titleEn: "Conference Participation Policy (SR01)", file: "#", order: 0 },
        { id: "sr02", titleAr: "سياسة أخلاقيات البحث (SR02)", titleEn: "Research Ethics Policy (SR02)", file: "#", order: 1 },
      ],
    },
  ],
};

async function seed() {
  try {
    await dbConnect();
    await PoliciesByDepartmentModel.findOneAndUpdate(
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
