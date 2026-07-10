"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";

export async function deleteSeminarAction(formData: FormData): Promise<void> {
    try {
        const id = formData.get("id") as string;
        
        await dbConnect();
        await Seminar.findByIdAndDelete(id);
        
        revalidatePath("/dashboard/seminars");
        revalidatePath("/main/career-guidance");
    } catch (error) {
        console.error("Error deleting seminar:", error);
    }
}
