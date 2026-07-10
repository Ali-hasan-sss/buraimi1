import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { VisionMissionModel } from "@/models/VisionMission";

async function getOrSeed() {
  let doc = await VisionMissionModel.findOne({}).lean();
  if (!doc) {
    await VisionMissionModel.create({
      visionEn:
        "To be a leading educational institution in knowledge production and innovation, achieving sustainable development and actively contributing to building a knowledge-based economy and a prosperous society.",
      visionAr:
        "أن تكون مؤسسة تعليمية رائدة في إنتاج المعرفة والابتكار، وتحقيق التنمية المستدامة والمساهمة بفعالية في بناء اقتصاد قائم على المعرفة ومجتمع مزدهر.",
      missionEn:
        "Provide distinguished education and produce innovative scientific research that serves the national economy and achieves sustainable development, and prepare competent graduates capable of effective participation in society and contributing to the development and dissemination of knowledge locally and globally.",
      missionAr:
        "تقديم تعليم متميز وإنتاج بحث علمي مبتكر يخدم الاقتصاد الوطني ويحقق التنمية المستدامة، وإعداد خريجين أكفاء قادرين على المشاركة الفاعلة في المجتمع والإسهام في إنتاج المعرفة ونشرها محلياً وعالمياً.",
      values: [],
    });
    doc = await VisionMissionModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await getOrSeed();
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
      visionAr: String(body?.visionAr || "").trim(),
      visionEn: String(body?.visionEn || "").trim(),
      missionAr: String(body?.missionAr || "").trim(),
      missionEn: String(body?.missionEn || "").trim(),
      values: Array.isArray(body?.values)
        ? body.values.map((value: unknown, index: number) => {
            const item = value as Record<string, unknown>;
            return {
              id: String(item.id || `value-${index + 1}`).trim(),
              titleAr: String(item.titleAr || "").trim(),
              titleEn: String(item.titleEn || "").trim(),
              contentAr: String(item.contentAr || "").trim(),
              contentEn: String(item.contentEn || "").trim(),
              iconKey: String(item.iconKey || "shield").trim(),
              order: Number.isFinite(Number(item.order))
                ? Number(item.order)
                : index,
            };
          })
        : [],
    };

    const updated = await VisionMissionModel.findOneAndUpdate(
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
