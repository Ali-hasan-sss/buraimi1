"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";

export async function deleteCareerAction(formData: FormData) {
    const id = String(formData.get("id") || "").trim();

    if (!id) {
        throw new Error("Missing career id");
    }

    await dbConnect();
    await CareersModel.findByIdAndDelete(id);

    revalidatePath("/dashboard/careers");
    redirect("/dashboard/careers");
}
