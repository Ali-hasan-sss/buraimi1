import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { slugify } from "@/lib/slug";
import { ResearchHighlightModel } from "@/models/ResearchHighlight";
import type { ResearchHighlightType } from "@/types/research-highlight";

type SeedItem = {
  type: ResearchHighlightType;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  image: string;
  order: number;
};

const SEED_ITEMS: SeedItem[] = [
  {
    type: "research",
    titleAr: "الفريق البحثي للعلوم الإدارية بكلية البريمي الجامعية",
    titleEn: "Administrative Sciences Research Team at Al Buraimi University College",
    summaryAr: "لمحة سريعة عن نشاطات الفريق البحثي.",
    summaryEn: "A quick overview of the research team's activities.",
    contentAr: "يمكن تعديل تفاصيل هذا المحتوى من لوحة التحكم.",
    contentEn: "You can edit this content details from dashboard.",
    date: "2024-07-19",
    image: "/assets/5288ce83fe1555261b7e0329387b641e04ab1832.png",
    order: 0,
  },
  {
    type: "award",
    titleAr: "جائزة مصرف الشرافة الإسلامي للبحث العلمي",
    titleEn: "Al Sharafa Islamic Bank Award for Scientific Research",
    summaryAr: "تكريم لإنجازات بحثية متميزة.",
    summaryEn: "Recognition for outstanding research achievements.",
    contentAr: "يمكن تعديل تفاصيل هذا المحتوى من لوحة التحكم.",
    contentEn: "You can edit this content details from dashboard.",
    date: "2024-07-19",
    image: "/assets/5288ce83fe1555261b7e0329387b641e04ab1832.png",
    order: 0,
  },
];

async function seed() {
  try {
    await dbConnect();
    for (const item of SEED_ITEMS) {
      const slug = slugify(item.titleEn || item.titleAr);
      await ResearchHighlightModel.updateOne(
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
