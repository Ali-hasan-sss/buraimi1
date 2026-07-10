export type GraduateProgramDoc = {
  _id: unknown;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  affiliationAr?: string;
  affiliationEn?: string;
  color: string;
  accentColor?: string;
  carouselImage?: string;
  specializationsAr?: string;
  specializationsEn?: string;
  feesAr?: string;
  feesEn?: string;
  creditsAr?: string;
  creditsEn?: string;
  totalFeesAr?: string;
  totalFeesEn?: string;
  featuresAr?: string[];
  featuresEn?: string[];
  order?: number;
  details?: unknown;
};

/** شكل عرض GradProgram.tsx (عميل) */
export type GradProgramCard = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  affiliation?: string;
  affiliationEn?: string;
  color: string;
  specializations?: string;
  specializationsEn?: string;
  fees?: string;
  feesEn?: string;
  credits?: string;
  creditsEn?: string;
  totalFees?: string;
  totalFeesEn?: string;
  features: string[];
  featuresEn: string[];
};

export type GraduateCarouselCard = {
  id: string;
  titleAr: string;
  titleEn: string;
  image: string;
  color: string;
  gradient: string;
  href: string;
};
