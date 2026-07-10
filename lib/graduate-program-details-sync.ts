import { getFormDataString } from "@/lib/get-form-data-field";

/** Mirrors dashboard listing fields into `details.programInfo` (same document). */
export function graduateProgramDetailsDotSetFromForm(
  formData: FormData,
): Record<string, string> {
  const titleAr = getFormDataString(formData, "titleAr");
  const titleEn = getFormDataString(formData, "titleEn");
  const descriptionAr = getFormDataString(formData, "descriptionAr");
  const descriptionEn = getFormDataString(formData, "descriptionEn");

  const entries: [string, string][] = [
    ["details.programInfo.titleAr", titleAr],
    ["details.programInfo.titleEn", titleEn],
    ["details.programInfo.affiliationAr", getFormDataString(formData, "affiliationAr")],
    ["details.programInfo.affiliationEn", getFormDataString(formData, "affiliationEn")],
    ["details.programInfo.aboutTextAr", descriptionAr],
    ["details.programInfo.aboutTextEn", descriptionEn],
    ["details.programInfo.totalCreditsAr", getFormDataString(formData, "creditsAr")],
    ["details.programInfo.totalCreditsEn", getFormDataString(formData, "creditsEn")],
    ["details.programInfo.creditsTextAr", getFormDataString(formData, "feesAr")],
    ["details.programInfo.creditsTextEn", getFormDataString(formData, "feesEn")],
    [
      "details.programInfo.programDimensionsTextAr",
      getFormDataString(formData, "specializationsAr"),
    ],
    [
      "details.programInfo.programDimensionsTextEn",
      getFormDataString(formData, "specializationsEn"),
    ],
  ];

  const out: Record<string, string> = {};
  for (const [key, value] of entries) {
    out[key] = value;
  }
  return out;
}

export function graduateProgramInitialDetailsFromForm(formData: FormData): {
  programInfo: Record<string, string>;
} {
  const d = graduateProgramDetailsDotSetFromForm(formData);
  const programInfo: Record<string, string> = {};
  const prefix = "details.programInfo.";
  for (const [k, v] of Object.entries(d)) {
    if (k.startsWith(prefix)) {
      programInfo[k.slice(prefix.length)] = v;
    }
  }
  return { programInfo };
}
