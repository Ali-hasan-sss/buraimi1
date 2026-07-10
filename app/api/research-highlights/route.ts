import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ResearchHighlightModel } from "@/models/ResearchHighlight";

export const dynamic = "force-dynamic";

const DEFAULT_ITEMS = [
  {
    slug: "administrative-sciences-research-team",
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
    slug: "technology-innovation-research-team",
    type: "research",
    titleAr: "الفريق البحثي للتكنولوجيا والابتكار بكلية البريمي",
    titleEn: "Technology and Innovation Research Team at Al Buraimi College",
    summaryAr: "أنشطة وورش ضمن محور التكنولوجيا والابتكار.",
    summaryEn: "Activities and workshops within technology and innovation.",
    contentAr: "يمكن تعديل تفاصيل هذا المحتوى من لوحة التحكم.",
    contentEn: "You can edit this content details from dashboard.",
    date: "2024-07-19",
    image: "/assets/5288ce83fe1555261b7e0329387b641e04ab1832.png",
    order: 1,
  },
  {
    slug: "al-sharafa-islamic-bank-award",
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
] as const;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const filter: Record<string, unknown> = {};
    if (type && ["research", "award"].includes(type)) {
      filter.type = type;
    }

    let docs = await ResearchHighlightModel.find(filter).sort({ order: 1, date: -1 }).lean();
    if (!docs.length) {
      await ResearchHighlightModel.insertMany(DEFAULT_ITEMS);
      docs = await ResearchHighlightModel.find(filter).sort({ order: 1, date: -1 }).lean();
    }

    return NextResponse.json({ ok: true, data: docs });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
