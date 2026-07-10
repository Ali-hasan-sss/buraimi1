import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown, GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function MessagesPage() {
    const t = await getTranslations("dashboardMessages");

    const roles = [
        {
            title: t("roles.chairman.title"),
            subtitle: t("roles.chairman.subtitle"),
            description: t("roles.chairman.description"),
            href: "/dashboard/messages/chairman",
            icon: Crown,
        },
        {
            title: t("roles.dean.title"),
            subtitle: t("roles.dean.subtitle"),
            description: t("roles.dean.description"),
            href: "/dashboard/messages/dean",
            icon: GraduationCap,
        }
    ] as const;

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("listTitle")}</h1>
                <p className="text-sm text-muted-foreground">
                    {t("listSubtitle")}
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                        <div key={role.href} className="rounded-xl border bg-background p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-4 text-muted-foreground" />
                                        <div className="font-semibold">{role.title}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{role.subtitle}</div>
                                    <div className="text-xs text-muted-foreground">{role.description}</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button asChild className="w-full">
                                    <Link href={role.href}>{t("viewMessages")}</Link>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}