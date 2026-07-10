import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { DEFAULT_CAROUSEL_BY_SLUG } from "@/lib/graduate-program-fallback";
import { GraduateProgramModel } from "@/models/GraduateProgram";
import { GradProgramsData } from "@/staticData/GraduateStudies";
import { getGraduateProgramDetailsForSlug } from "@/staticData/graduate-program-details";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCENT_BY_INDEX = ["#254151", "#6096b4", "#c2a772", "#6096b4"];

async function seed() {
  try {
    await dbConnect();

    const operations = GradProgramsData.map((p, i) => ({
      updateOne: {
        filter: { slug: p.id },
        update: {
          $set: {
            slug: p.id,
            titleAr: p.title,
            titleEn: p.titleEn,
            descriptionAr: p.description,
            descriptionEn: p.descriptionEn,
            affiliationAr: p.affiliation ?? "",
            affiliationEn: p.affiliationEn ?? "",
            color: p.color,
            accentColor: ACCENT_BY_INDEX[i] ?? "#254151",
            carouselImage: DEFAULT_CAROUSEL_BY_SLUG[p.id] ?? "",
            specializationsAr: p.specializations ?? "",
            specializationsEn: p.specializationsEn ?? "",
            feesAr: p.fees ?? "",
            feesEn: p.feesEn ?? "",
            creditsAr: p.credits ?? "",
            creditsEn: p.creditsEn ?? "",
            totalFeesAr: p.totalFees ?? "",
            totalFeesEn: p.totalFeesEn ?? "",
            featuresAr: p.features ?? [],
            featuresEn: p.featuresEn ?? [],
            order: i,
            details: getGraduateProgramDetailsForSlug(p.id),
          },
        },
        upsert: true,
      },
    }));

    const result = await GraduateProgramModel.bulkWrite(operations);
    const preview = await GraduateProgramModel.find({})
      .sort({ order: 1, slug: 1 })
      .select({ slug: 1, titleAr: 1, titleEn: 1, order: 1 })
      .lean();

    return NextResponse.json({ ok: true, result, preview });
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
