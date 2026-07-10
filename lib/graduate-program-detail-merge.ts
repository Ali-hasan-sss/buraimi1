import { deepMergeGraduateDetails } from "@/lib/graduate-program-detail-deep-merge";
import { graduateStudiesDeatil } from "@/staticData/GraduateStudies";
import type { GraduateProgramDoc } from "@/types/graduate-program";

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function firstNonEmpty(...cands: (string | undefined | null)[]): string | undefined {
  for (const c of cands) {
    if (typeof c === "string" && c.trim()) return c;
  }
  return undefined;
}

function hasSavedObjectives(patch: unknown): boolean {
  if (!isRecord(patch)) return false;
  const o = patch.objectives;
  if (!isRecord(o)) return false;
  const ar = o.ar;
  return Array.isArray(ar) && ar.length > 0;
}

/**
 * Full detail payload for `/main/graduate-studies/[slug]`:
 * - Start from static template, merge saved `doc.details`.
 * - Overlay `programInfo` fields: **root document (dashboard listing) wins** over
 *   `details.programInfo`, then template — so dashboard edits always show on the detail page.
 */
export function buildGraduateProgramDetailPayload(
  doc: GraduateProgramDoc,
): typeof graduateStudiesDeatil {
  const template = structuredClone(graduateStudiesDeatil) as typeof graduateStudiesDeatil;
  const patch = doc.details;

  const merged = deepMergeGraduateDetails(
    template as unknown as Record<string, unknown>,
    isRecord(patch) ? patch : {},
  ) as unknown as typeof graduateStudiesDeatil;

  const savedPi =
    isRecord(patch) && isRecord(patch.programInfo)
      ? (patch.programInfo as Record<string, unknown>)
      : {};

  const pi = { ...(merged.programInfo as Record<string, unknown>) };

  const set = (key: string, ...cands: (string | undefined | null)[]) => {
    const v = firstNonEmpty(...cands);
    if (v !== undefined) pi[key] = v;
  };

  set("titleAr", doc.titleAr, savedPi.titleAr as string, pi.titleAr as string);
  set("titleEn", doc.titleEn, savedPi.titleEn as string, pi.titleEn as string);
  set(
    "affiliationAr",
    doc.affiliationAr,
    savedPi.affiliationAr as string,
    pi.affiliationAr as string,
  );
  set(
    "affiliationEn",
    doc.affiliationEn,
    savedPi.affiliationEn as string,
    pi.affiliationEn as string,
  );
  set("aboutTextAr", doc.descriptionAr, savedPi.aboutTextAr as string, pi.aboutTextAr as string);
  set("aboutTextEn", doc.descriptionEn, savedPi.aboutTextEn as string, pi.aboutTextEn as string);
  set(
    "totalCreditsAr",
    doc.creditsAr,
    savedPi.totalCreditsAr as string,
    pi.totalCreditsAr as string,
  );
  set(
    "totalCreditsEn",
    doc.creditsEn,
    savedPi.totalCreditsEn as string,
    pi.totalCreditsEn as string,
  );
  set("creditsTextAr", doc.feesAr, savedPi.creditsTextAr as string, pi.creditsTextAr as string);
  set("creditsTextEn", doc.feesEn, savedPi.creditsTextEn as string, pi.creditsTextEn as string);
  set(
    "programDimensionsTextAr",
    doc.specializationsAr,
    savedPi.programDimensionsTextAr as string,
    pi.programDimensionsTextAr as string,
  );
  set(
    "programDimensionsTextEn",
    doc.specializationsEn,
    savedPi.programDimensionsTextEn as string,
    pi.programDimensionsTextEn as string,
  );

  merged.programInfo = pi as typeof merged.programInfo;

  if (
    !hasSavedObjectives(patch) &&
    Array.isArray(doc.featuresAr) &&
    doc.featuresAr.length > 0
  ) {
    merged.objectives = {
      ar: doc.featuresAr,
      en:
        doc.featuresEn && doc.featuresEn.length > 0
          ? doc.featuresEn
          : doc.featuresAr,
    };
  }

  return merged;
}
