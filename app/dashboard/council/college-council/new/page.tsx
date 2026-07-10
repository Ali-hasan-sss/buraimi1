import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";

import MemberForm from "@/components/dashboard/council/MemberForm";
import { CollegeCouncilMember } from "@/models/CollegeCouncil";
import {
    getCouncilMemberImagePath,
    getFormString,
} from "@/lib/server-action-form-data";

async function createMember(formData: FormData) {
    "use server";

    const name = getFormString(formData, "name");
    const role = getFormString(formData, "role");
    const description = getFormString(formData, "description");
    const image = getCouncilMemberImagePath(formData);

    if (!name || !role) {
        return;
    }

    await dbConnect();

    const safeDescription = role === "member" || role === "industry" ? "" : description;
    const passedRole = role == "member" ? "عضو" : role;

    await CollegeCouncilMember.create({ name, role: passedRole, description: safeDescription, image });

    revalidatePath("/dashboard/council/college-council");
    redirect("/dashboard/council/college-council");
}

export default async function NewCollegeCouncilMemberPage() {
    const t = await getTranslations("dashboardCouncil");

    return (
        <div className="max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("newMemberTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("collegeTitle")}</p>
            </div>

            <MemberForm action={createMember} />
        </div>
    );
}
