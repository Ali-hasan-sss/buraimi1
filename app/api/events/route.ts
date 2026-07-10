import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { EventModel } from "@/models/Event";

export const dynamic = "force-dynamic";

const DEFAULT_EVENTS = [
  {
    slug: "14th-international-dental-conference",
    titleAr: "المؤتمر الدولي الرابع عشر لطب الأسنان",
    titleEn: "14th International Dental Conference",
    summaryAr: "فعالية أكاديمية تجمع المختصين في مجال طب الأسنان.",
    summaryEn: "An academic event bringing dental specialists together.",
    contentAr: "تفاصيل الحدث ستتم إضافتها لاحقاً من لوحة التحكم.",
    contentEn: "Event details can be updated later from dashboard.",
    date: "2026-02-01",
    locationAr: "كلية البريمي الجامعية",
    locationEn: "Al Buraimi University College",
    image: "/assets/landing/news/news-1.webp",
    type: "conferences",
  },
  {
    slug: "college-of-computing-week",
    titleAr: "أسبوع كلية الحوسبة والمعلوماتية",
    titleEn: "College of Computing Week",
    summaryAr: "أنشطة وورش عمل في الذكاء الاصطناعي.",
    summaryEn: "Activities and workshops in artificial intelligence.",
    contentAr: "تفاصيل الحدث ستتم إضافتها لاحقاً من لوحة التحكم.",
    contentEn: "Event details can be updated later from dashboard.",
    date: "2026-04-15",
    locationAr: "الحرم الجامعي",
    locationEn: "Main Campus",
    image: "/assets/landing/news/news-2.webp",
    type: "events",
  },
  {
    slug: "student-activities-festival",
    titleAr: "مهرجان الأنشطة الطلابية",
    titleEn: "Student Activities Festival",
    summaryAr: "فعاليات طلابية ومسابقات متنوعة.",
    summaryEn: "Student events and diverse competitions.",
    contentAr: "تفاصيل الحدث ستتم إضافتها لاحقاً من لوحة التحكم.",
    contentEn: "Event details can be updated later from dashboard.",
    date: "2025-12-30",
    locationAr: "ساحة الطلاب",
    locationEn: "Student Plaza",
    image: "/assets/landing/news/news-3.webp",
    type: "student",
  },
] as const;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const filter: Record<string, unknown> = {};
    if (type && ["events", "conferences", "student"].includes(type)) {
      filter.type = type;
    }

    let docs = await EventModel.find(filter).sort({ date: 1, createdAt: -1 }).lean();
    if (!docs.length) {
      await EventModel.insertMany(DEFAULT_EVENTS);
      docs = await EventModel.find(filter).sort({ date: 1, createdAt: -1 }).lean();
    }
    return NextResponse.json({ ok: true, data: docs });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
