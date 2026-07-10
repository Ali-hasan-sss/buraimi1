import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { GraduateAttributesModel } from "@/models/GraduateAttributes";
import { Graduate_Attributes } from "@/staticData/about";

const SEED_DATA = {
  titleAr: Graduate_Attributes.titleAr,
  titleEn: Graduate_Attributes.titleEn,
  descriptionAr: Graduate_Attributes.descriptionAr,
  descriptionEn: Graduate_Attributes.descriptionEn,
  listTitleAr: "يمكن تحديد سمات خريجي BUC على النحو التالي",
  listTitleEn: "BUC graduate attributes can be summarized as follows",
  footerTitleAr: "رؤية عمان 2040",
  footerTitleEn: "Oman Vision 2040",
  footerTextAr: "كفاءات وطنية ذات مهارات ديناميكية قادرة على المنافسة محليًا وعالميًا",
  footerTextEn:
    "National competencies with dynamic skills capable of competing locally and globally",
  attributes: Graduate_Attributes.attributes.map((item, index) => ({
    id: `attr-${index + 1}`,
    titleAr: item.titleAr,
    titleEn: item.titleEn,
    descriptionAr: item.descriptionAr,
    descriptionEn: item.descriptionEn,
    order: index,
  })),
};

async function seed() {
  try {
    await dbConnect();
    await GraduateAttributesModel.findOneAndUpdate(
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
