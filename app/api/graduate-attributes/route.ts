import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { GraduateAttributesModel } from "@/models/GraduateAttributes";
import { Graduate_Attributes } from "@/staticData/about";

async function ensureDoc() {
  let doc = await GraduateAttributesModel.findOne({}).lean();
  if (!doc) {
    await GraduateAttributesModel.create({
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
    });
    doc = await GraduateAttributesModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await ensureDoc();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const payload = {
      titleAr: String(body?.titleAr || "").trim(),
      titleEn: String(body?.titleEn || "").trim(),
      descriptionAr: String(body?.descriptionAr || "").trim(),
      descriptionEn: String(body?.descriptionEn || "").trim(),
      listTitleAr: String(body?.listTitleAr || "").trim(),
      listTitleEn: String(body?.listTitleEn || "").trim(),
      footerTitleAr: String(body?.footerTitleAr || "").trim(),
      footerTitleEn: String(body?.footerTitleEn || "").trim(),
      footerTextAr: String(body?.footerTextAr || "").trim(),
      footerTextEn: String(body?.footerTextEn || "").trim(),
      attributes: Array.isArray(body?.attributes)
        ? body.attributes.map((item: unknown, index: number) => {
            const x = item as Record<string, unknown>;
            return {
              id: String(x.id || `attr-${index + 1}`).trim(),
              titleAr: String(x.titleAr || "").trim(),
              titleEn: String(x.titleEn || "").trim(),
              descriptionAr: String(x.descriptionAr || "").trim(),
              descriptionEn: String(x.descriptionEn || "").trim(),
              order: Number.isFinite(Number(x.order)) ? Number(x.order) : index,
            };
          })
        : [],
    };

    const updated = await GraduateAttributesModel.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true },
    ).lean();
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
