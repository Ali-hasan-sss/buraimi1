"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import { contactModel } from "@/models/contact";

export async function updateContactAction(formData: FormData) {
    const id = String(formData.get("id") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const department = String(formData.get("department") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!id || !title || !name || !department || !position || !phone || !email) {
        return;
    }

    await dbConnect();
    await contactModel.findByIdAndUpdate(id, { title, name, department, position, phone, email });

    revalidatePath("/dashboard/contact");
    redirect("/dashboard/contact");
}
