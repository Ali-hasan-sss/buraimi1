import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";

import MemberForm from "@/components/dashboard/council/MemberForm";
import { CollegeCouncilMember } from "@/models/CollegeCouncil";
import {
    getCouncilMemberImagePath,
    getFormString,
} from "@/lib/server-action-form-data";

type CollegeDoc = {
    _id: unknown;
    name: string;
    role: string;
    description?: string;
    image?: string;
};

async function updateMember(formData: FormData) {
    "use server";

    const id = getFormString(formData, "memberId");
    const name = getFormString(formData, "name");
    const role = getFormString(formData, "role");
    const description = getFormString(formData, "description");
    const image = getCouncilMemberImagePath(formData);

    if (!id || !name || !role) {
        return;
    }

    await dbConnect();
    const safeDescription = role === "member" || role === "industry" ? "" : description;

    const passedRole = role == "member" ? "عضو" : role;

    await CollegeCouncilMember.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                role: passedRole,
                description: safeDescription,
                image,
            },
        },
        { new: true },
    );



    revalidatePath("/dashboard/council/college-council");
    redirect("/dashboard/council/college-council");
}

export default async function UpdateCollegeCouncilMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations("dashboardCouncil");

    await dbConnect();
    const member = (await CollegeCouncilMember.findById(id).lean()) as CollegeDoc | null;

    if (!member) {
        notFound();
    }

    return (
        <div className="max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("updateMemberTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("collegeTitle")}</p>
            </div>

            <MemberForm
                action={updateMember}
                editingMemberId={id}
                defaultName={member.name}
                defaultRole={member.role}
                defaultDescription={member.description || ""}
                defaultImage={member.image}
                submitLabel={t("save")}
            />
        </div>
    );
}
