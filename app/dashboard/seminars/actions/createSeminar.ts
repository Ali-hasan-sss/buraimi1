"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";

export async function createSeminarAction(formData: FormData) {
    try {
        await dbConnect();

        const academicYearAr = formData.get("academicYearAr") as string;
        const academicYearEn = formData.get("academicYearEn") as string;
        const departmentAr = formData.get("departmentAr") as string;
        const departmentEn = formData.get("departmentEn") as string;
        const presenterAr = formData.get("presenterAr") as string;
        const presenterEn = formData.get("presenterEn") as string;
        const titleAr = formData.get("titleAr") as string;
        const titleEn = formData.get("titleEn") as string;
        const date = formData.get("date") as string;

        const seminar = new Seminar({
            academicYearAr,
            academicYearEn,
            departmentAr,
            departmentEn,
            presenterAr,
            presenterEn,
            titleAr,
            titleEn,
            date,
            isActive: true,
        });

        await seminar.save();

        revalidatePath("/dashboard/seminars");
        revalidatePath("/main/career-guidance");

        return { ok: true };
    } catch (error) {
        console.error("Error creating seminar:", error);
        return { ok: false, error: "Failed to create seminar" };
    }
}
