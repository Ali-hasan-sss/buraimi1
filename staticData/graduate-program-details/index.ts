import { graduateStudiesDeatil } from "@/staticData/GraduateStudies";
import { englishMastersDetails } from "./english-masters";
import { mbaDetails } from "./mba";

export { englishMastersDetails, mbaDetails };

/** تفاصيل كل برنامج دراسات عليا حسب المعرّف (slug) */
export const GRADUATE_PROGRAM_DETAILS_BY_SLUG: Record<string, unknown> = {
  "phd-law": graduateStudiesDeatil,
  "masters-law": graduateStudiesDeatil,
  "masters-english": englishMastersDetails,
  "english-masters": englishMastersDetails,
  mba: mbaDetails,
};

export function getGraduateProgramDetailsForSlug(slug: string): unknown {
  return GRADUATE_PROGRAM_DETAILS_BY_SLUG[slug] ?? graduateStudiesDeatil;
}
