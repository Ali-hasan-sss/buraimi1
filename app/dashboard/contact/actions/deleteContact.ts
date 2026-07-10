"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import { contactModel } from "@/models/contact";

export async function deleteContactAction(formData: FormData) {
    const id = String(formData.get("id") || "").trim();
    if (!id) return;

    await dbConnect();
    await contactModel.findByIdAndDelete(id);

    revalidatePath("/dashboard/contact");
    redirect("/dashboard/contact");
}
