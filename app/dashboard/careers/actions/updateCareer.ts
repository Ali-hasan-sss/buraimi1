"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";

export async function updateCareerAction(formData: FormData) {
    const id = String(formData.get("id") || "").trim();

    const titleAr = String(formData.get("titleAr") || "");
    const titleEn = String(formData.get("titleEn") || "");
    const descriptionAr = String(formData.get("descriptionAr") || "");
    const descriptionEn = String(formData.get("descriptionEn") || "");
    const requirementsAr = String(formData.get("requirementsAr") || "");
    const requirementsEn = String(formData.get("requirementsEn") || "");
    const startDateStr = String(formData.get("startDate") || "");
    const edDateStr = String(formData.get("edDate") || "");

    if (!id) {
        throw new Error("Missing career id");
    }

    if (!titleAr.trim() || !titleEn.trim() || !descriptionAr.trim() || !descriptionEn.trim() || !requirementsAr.trim() || !requirementsEn.trim() || !startDateStr || !edDateStr) {
        throw new Error("Missing required fields");
    }

    const start = new Date(startDateStr);
    const end = new Date(edDateStr);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        throw new Error("Invalid start or end date");
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    if (startDateOnly.getTime() < today.getTime()) {
        throw new Error("Start date can't be before today");
    }

    if (end.getTime() <= start.getTime()) {
        throw new Error("End date must be after start date");
    }

    await dbConnect();

    await CareersModel.findByIdAndUpdate(
        id,
        {
            titleAr,
            titleEn,
            descriptionAr,
            descriptionEn,
            requirementsAr,
            requirementsEn,
            startDate: start,
            edDate: end,
        },
        { runValidators: true }
    );

    revalidatePath("/dashboard/careers");
    redirect("/dashboard/careers");
}
