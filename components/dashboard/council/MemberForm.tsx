"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CouncilMemberAvatarUpload } from "@/components/dashboard/council/CouncilMemberAvatarUpload";

type RoleChoice = "member" | "industry" | "head";

export default function MemberForm({
    action,
    editingMemberId,
    defaultName,
    defaultRole,
    defaultDescription,
    defaultImage,
    submitLabel,
}: {
    action: (formData: FormData) => void;
    /** When set, sent as hidden `memberId` (avoids `.bind(id)` + file upload FormData key mangling in Next). */
    editingMemberId?: string;
    defaultName?: string;
    defaultRole?: string;
    defaultDescription?: string;
    defaultImage?: string;
    submitLabel?: string;
}) {
    const normalizedDefaultRole = (defaultRole || "").trim();
    const initialRoleChoice: RoleChoice = useMemo(() => {
        if (normalizedDefaultRole === "member" || normalizedDefaultRole === "عضو") return "member";
        if (normalizedDefaultRole === "industry") return "industry";
        return "head";
    }, [normalizedDefaultRole]);
    const [roleChoice, setRoleChoice] = useState<RoleChoice>(initialRoleChoice);
    const [headRole, setHeadRole] = useState<string>(
        initialRoleChoice === "head" ? normalizedDefaultRole : "",
    );
    const t = useTranslations("dashboardCouncil");

    const effectiveRole = useMemo(() => {
        if (roleChoice === "member") return "member";
        if (roleChoice === "industry") return "industry";
        return headRole.trim();
    }, [roleChoice, headRole]);

    const showDescription = roleChoice !== "member";

    return (
        <form action={action} className="space-y-4 rounded-xl border bg-background p-4">
            {editingMemberId ? (
                <input type="hidden" name="memberId" value={editingMemberId} />
            ) : null}
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">{t("nameLabel")}</label>
                <Input id="name" name="name" placeholder={t("namePlaceholder")} defaultValue={defaultName} required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="roleChoice">{t("roleChoiceLabel")}</label>
                <select
                    id="roleChoice"
                    name="roleChoice"
                    value={roleChoice}
                    onChange={(e) => setRoleChoice(e.target.value as RoleChoice)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <option value="member">{t("roleMember")}</option>
                    <option value="industry">{t("roleIndustry")}</option>
                    <option value="head">{t("roleHead")}</option>
                </select>
            </div>

            {roleChoice === "head" ? (
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="roleText">{t("headTitleLabel")}</label>
                    <Input
                        id="roleText"
                        value={headRole}
                        onChange={(e) => setHeadRole(e.target.value)}
                        placeholder={t("headTitlePlaceholder")}
                        required
                    />
                </div>
            ) : null}

            <input type="hidden" name="role" value={effectiveRole} />

            <CouncilMemberAvatarUpload
                key={editingMemberId ?? "create"}
                defaultPath={defaultImage}
            />

            {showDescription ? (
                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="description">{t("descriptionLabel")}</label>
                    <Input id="description" name="description" placeholder={t("descriptionPlaceholder")} defaultValue={defaultDescription} />
                </div>
            ) : (
                <input type="hidden" name="description" value="" />
            )}

            <div className="flex items-center justify-end gap-2">
                <Button type="submit" className="w-full sm:w-auto">{submitLabel ?? t("create")}</Button>
            </div>
        </form>
    );
}
