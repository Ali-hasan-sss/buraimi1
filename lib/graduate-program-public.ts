import dbConnect from "@/lib/dbConnect";
import {
  DEFAULT_CAROUSEL_BY_SLUG,
  getFallbackGraduateCarousel,
  staticDataToGradCard,
} from "@/lib/graduate-program-fallback";
import { GraduateProgramModel } from "@/models/GraduateProgram";
import type { GradProgramCard, GraduateCarouselCard, GraduateProgramDoc } from "@/types/graduate-program";

export { DEFAULT_CAROUSEL_BY_SLUG, getFallbackGraduateCarousel, staticDataToGradCard } from "@/lib/graduate-program-fallback";

function docToGradCard(doc: GraduateProgramDoc): GradProgramCard {
  return {
    id: doc.slug,
    title: doc.titleAr,
    titleEn: doc.titleEn,
    description: doc.descriptionAr,
    descriptionEn: doc.descriptionEn,
    affiliation: doc.affiliationAr?.trim() || undefined,
    affiliationEn: doc.affiliationEn?.trim() || undefined,
    color: doc.color?.trim() || "from-[#254151] to-[#6096b4]",
    specializations: doc.specializationsAr?.trim() || undefined,
    specializationsEn: doc.specializationsEn?.trim() || undefined,
    fees: doc.feesAr?.trim() || undefined,
    feesEn: doc.feesEn?.trim() || undefined,
    credits: doc.creditsAr?.trim() || undefined,
    creditsEn: doc.creditsEn?.trim() || undefined,
    totalFees: doc.totalFeesAr?.trim() || undefined,
    totalFeesEn: doc.totalFeesEn?.trim() || undefined,
    features: Array.isArray(doc.featuresAr) ? doc.featuresAr : [],
    featuresEn: Array.isArray(doc.featuresEn) ? doc.featuresEn : [],
  };
}

export async function listGradProgramsForPage(): Promise<GradProgramCard[]> {
  await dbConnect();
  const docs = (await GraduateProgramModel.find({})
    .sort({ order: 1, slug: 1 })
    .lean()) as GraduateProgramDoc[];
  if (!docs.length) return staticDataToGradCard();
  return docs.map(docToGradCard);
}

function docToCarousel(doc: GraduateProgramDoc): GraduateCarouselCard {
  const slug = doc.slug;
  const image =
    (doc.carouselImage && doc.carouselImage.trim()) ||
    DEFAULT_CAROUSEL_BY_SLUG[slug] ||
    DEFAULT_CAROUSEL_BY_SLUG["phd-law"];
  const accent = doc.accentColor?.trim() || "#254151";
  const gradient =
    doc.color?.trim() && /^from-\[#([0-9a-fA-F]{6})\]\s+to-\[#([0-9a-fA-F]{6})\]$/.test(doc.color.trim())
      ? doc.color.trim()
      : "from-[#254151] to-[#6096b4]";
  return {
    id: slug,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    image,
    color: accent,
    gradient,
    href: `/main/graduate-studies/${slug}`,
  };
}

export async function listGradProgramsForCarousel(): Promise<GraduateCarouselCard[]> {
  await dbConnect();
  const docs = (await GraduateProgramModel.find({})
    .sort({ order: 1, slug: 1 })
    .lean()) as GraduateProgramDoc[];
  if (!docs.length) return getFallbackGraduateCarousel();
  return docs.map(docToCarousel);
}
