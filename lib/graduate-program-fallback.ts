import { GradProgramsData } from "@/staticData/GraduateStudies";
import type { GradProgramCard, GraduateCarouselCard } from "@/types/graduate-program";

export const DEFAULT_CAROUSEL_BY_SLUG: Record<string, string> = {
  "phd-law":
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1080&q=80",
  "masters-law":
    "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=1080&q=80",
  mba: "https://images.unsplash.com/photo-1679508056887-5c76269dad54?w=1080&q=80",
  "masters-english":
    "https://images.unsplash.com/photo-1557878074-d712c4680b76?w=1080&q=80",
};

const DEFAULT_GRADIENT = "from-[#254151] to-[#1a2f3a]";

export function staticDataToGradCard(): GradProgramCard[] {
  return GradProgramsData.map((p) => ({
    id: p.id,
    title: p.title,
    titleEn: p.titleEn,
    description: p.description,
    descriptionEn: p.descriptionEn,
    affiliation: p.affiliation,
    affiliationEn: p.affiliationEn,
    color: p.color,
    specializations: p.specializations,
    specializationsEn: p.specializationsEn,
    fees: p.fees,
    feesEn: p.feesEn,
    credits: p.credits,
    creditsEn: p.creditsEn,
    totalFees: p.totalFees,
    totalFeesEn: p.totalFeesEn,
    features: p.features,
    featuresEn: p.featuresEn,
  }));
}

export function getFallbackGraduateCarousel(): GraduateCarouselCard[] {
  return GradProgramsData.map((p, i) => {
    const accent = ["#254151", "#6096b4", "#c2a772", "#6096b4"][i] ?? "#254151";
    return {
      id: p.id,
      titleAr: p.title,
      titleEn: p.titleEn,
      image: DEFAULT_CAROUSEL_BY_SLUG[p.id] || DEFAULT_CAROUSEL_BY_SLUG["phd-law"],
      color: accent,
      gradient: DEFAULT_GRADIENT,
      href: `/main/graduate-studies/${p.id}`,
    };
  });
}
