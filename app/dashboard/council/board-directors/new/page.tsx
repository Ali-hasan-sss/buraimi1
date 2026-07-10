import { redirect } from "next/navigation";
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

async function createMember(formData: FormData) {
    "use server";

    const name = getFormString(formData, "name");
    const role = getFormString(formData, "role");
    const image = getCouncilMemberImagePath(formData);

    if (!name || !role) {
        return;
    }

    await dbConnect();

    await BoardDirector.create({ name, role, image });

    revalidatePath("/dashboard/council/board-directors");
    redirect("/dashboard/council/board-directors");
}

export default async function NewDirectorPage() {
    const t = await getTranslations("dashboardCouncil");

    return (
        <div className="max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("newMemberTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("directorsTitle")}</p>
            </div>

            <form action={createMember} className="space-y-4 rounded-xl border bg-background p-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">{t("nameLabel")}</label>
                    <Input id="name" name="name" placeholder={t("namePlaceholder")} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="role">{t("roleLabel")}</label>
                    <Input id="role" name="role" placeholder={t("rolePlaceholder")} required />
                </div>

                <CouncilMemberAvatarUpload />

                <div className="flex items-center justify-end gap-2">
                    <Button type="submit" className="w-full sm:w-auto">{t("create")}</Button>
                </div>
            </form>
        </div>
    );
}
