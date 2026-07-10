import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { EventModel } from "@/models/Event";
import { slugify } from "@/lib/slug";
import type { EventTypeKey } from "@/types/event";

export const runtime = "nodejs";

type SeedEvent = {
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  locationAr: string;
  locationEn: string;
  image: string;
  type: EventTypeKey;
};

const SEED_EVENTS: SeedEvent[] = [
  {
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
];

async function seed() {
  try {
    await dbConnect();

    for (const item of SEED_EVENTS) {
      const slug = slugify(item.titleEn || item.titleAr);
      await EventModel.updateOne(
        { slug },
        { $set: { ...item, slug } },
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
