"use server";

import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";

export type CreateCareerInput = {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    requirementsAr: string;
    requirementsEn: string;
    startDate: string;
    edDate: string;
};

export async function createCareerAction(input: CreateCareerInput): Promise<{ ok: true; id: string } | { ok: false; message: string }> {
    try {
        await dbConnect();

        const start = new Date(input.startDate);
        const end = new Date(input.edDate);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return { ok: false, message: "Invalid start or end date" };
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        if (startDateOnly.getTime() < today.getTime()) {
            return { ok: false, message: "Start date can't be before today" };
        }

        if (end.getTime() <= start.getTime()) {
            return { ok: false, message: "End date must be after start date" };
        }

        const created = await CareersModel.create({
            titleAr: input.titleAr,
            titleEn: input.titleEn,
            descriptionAr: input.descriptionAr,
            descriptionEn: input.descriptionEn,
            requirementsAr: input.requirementsAr,
            requirementsEn: input.requirementsEn,
            startDate: start,
            edDate: end,
        });

        return { ok: true, id: String(created._id) };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return { ok: false, message };
    }
}
