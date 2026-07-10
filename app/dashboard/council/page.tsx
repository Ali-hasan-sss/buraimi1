import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

import { Briefcase, GraduationCap, Landmark, Users } from "lucide-react";

export default async function CouncilPage() {
    const t = await getTranslations("dashboardCouncil");

    const sections = [
        {
            title: t("trusteesTitle"),
            description: t("trusteesDesc"),
            href: "/dashboard/council/board-trustees",
            icon: Landmark,
        },
        {
            title: t("directorsTitle"),
            description: t("directorsDesc"),
            href: "/dashboard/council/board-directors",
            icon: Users,
        },
        {
            title: t("advisoryTitle"),
            description: t("advisoryDesc"),
            href: "/dashboard/council/advisory-council",
            icon: Briefcase,
        },
        {
            title: t("collegeTitle"),
            description: t("collegeDesc"),
            href: "/dashboard/council/college-council",
            icon: GraduationCap,
        },
    ] as const;

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("hubTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("hubSubtitle")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {sections.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.href} className="rounded-xl border bg-background p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-4 text-muted-foreground" />
                                        <div className="font-semibold">{s.title}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{s.description}</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button asChild className="w-full">
                                    <Link href={s.href}>{t("open")}</Link>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
