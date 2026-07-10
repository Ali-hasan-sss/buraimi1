"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import { getFormDataString } from "@/lib/get-form-data-field";
import { graduateProgramInitialDetailsFromForm } from "@/lib/graduate-program-details-sync";
import { GraduateProgramModel } from "@/models/GraduateProgram";

function linesToFeatures(s: string): string[] {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export async function createGraduateProgram(formData: FormData) {
  const slugRaw = getFormDataString(formData, "slug");
  const slug = slugRaw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const titleAr = getFormDataString(formData, "titleAr");
  const titleEn = getFormDataString(formData, "titleEn");
  const descriptionAr = getFormDataString(formData, "descriptionAr");
  const descriptionEn = getFormDataString(formData, "descriptionEn");

  if (!slug || !titleAr || !titleEn || !descriptionAr || !descriptionEn) {
    return;
  }

  const orderRaw = getFormDataString(formData, "order");
  const order = orderRaw ? Number.parseInt(orderRaw, 10) : 0;
  const orderSafe = Number.isFinite(order) ? order : 0;

  await dbConnect();
  await GraduateProgramModel.create({
    slug,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    affiliationAr: getFormDataString(formData, "affiliationAr"),
    affiliationEn: getFormDataString(formData, "affiliationEn"),
    color: getFormDataString(formData, "color") || "from-[#254151] to-[#6096b4]",
    accentColor: getFormDataString(formData, "accentColor") || "#254151",
    carouselImage: getFormDataString(formData, "carouselImage"),
    specializationsAr: getFormDataString(formData, "specializationsAr"),
    specializationsEn: getFormDataString(formData, "specializationsEn"),
    feesAr: getFormDataString(formData, "feesAr"),
    feesEn: getFormDataString(formData, "feesEn"),
    creditsAr: getFormDataString(formData, "creditsAr"),
    creditsEn: getFormDataString(formData, "creditsEn"),
    totalFeesAr: getFormDataString(formData, "totalFeesAr"),
    totalFeesEn: getFormDataString(formData, "totalFeesEn"),
    featuresAr: linesToFeatures(getFormDataString(formData, "featuresAr")),
    featuresEn: linesToFeatures(getFormDataString(formData, "featuresEn")),
    order: orderSafe,
    details: graduateProgramInitialDetailsFromForm(formData),
  });

  revalidatePath("/dashboard/graduate-programs");
  revalidatePath("/main");
  revalidatePath("/main/graduate-studies");
  revalidatePath(`/main/graduate-studies/${slug}`);
  revalidatePath("/main/department");
  redirect("/dashboard/graduate-programs");
}

export async function deleteGraduateProgram(formData: FormData) {
  const id = getFormDataString(formData, "id");
  if (!id) return;

  await dbConnect();
  await GraduateProgramModel.findByIdAndDelete(id);

  revalidatePath("/dashboard/graduate-programs");
  revalidatePath("/main");
  revalidatePath("/main/graduate-studies");
  revalidatePath("/main/department");
}
