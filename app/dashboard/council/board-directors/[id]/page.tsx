import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";
import { BoardDirector } from "@/models/BoardDirector";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CouncilMemberAvatarUpload } from "@/components/dashboard/council/CouncilMemberAvatarUpload";
import {
    getCouncilMemberImagePath,
    getFormString,
} from "@/lib/server-action-form-data";

type DirectorDoc = {
    _id: unknown;
    name: string;
    role: string;
    image?: string;
};

async function updateMember(formData: FormData) {
    "use server";

    const id = getFormString(formData, "memberId");
    const name = getFormString(formData, "name");
    const role = getFormString(formData, "role");
    const image = getCouncilMemberImagePath(formData);

    if (!id || !name || !role) {
        return;
    }

    await dbConnect();

    await BoardDirector.findByIdAndUpdate(
        id,
        { $set: { name, role, image } },
        { new: true },
    );

    revalidatePath("/dashboard/council/board-directors");
    redirect("/dashboard/council/board-directors");
}

export default async function UpdateDirectorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations("dashboardCouncil");

    await dbConnect();
    const member = (await BoardDirector.findById(id).lean()) as DirectorDoc | null;

    if (!member) {
        notFound();
    }

    return (
        <div className="max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("updateMemberTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("directorsTitle")}</p>
            </div>

            <form action={updateMember} className="space-y-4 rounded-xl border bg-background p-4">
                <input type="hidden" name="memberId" value={id} />
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">{t("nameLabel")}</label>
                    <Input id="name" name="name" defaultValue={member.name} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="role">{t("roleLabel")}</label>
                    <Input id="role" name="role" defaultValue={member.role} required />
                </div>

                <CouncilMemberAvatarUpload defaultPath={member.image} />

                <div className="flex items-center justify-end gap-2">
                    <Button type="submit" className="w-full sm:w-auto">{t("save")}</Button>
                </div>
            </form>
        </div>
    );
}
