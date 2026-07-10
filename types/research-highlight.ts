export type ResearchHighlightType = "research" | "award";

export interface ResearchHighlightItem {
  _id: string;
  slug: string;
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
}
