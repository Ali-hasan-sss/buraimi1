"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight, Home } from "lucide-react";

type Crumb = {
    label: string;
    href: string;
    active: boolean;
};

function titleCase(input: string) {
    return input
        .split("-")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

const SEG_TRANSLATION_KEY: Record<string, string> = {
    dashboard: "crumbDashboard",
    council: "crumbCouncil",
    "board-trustees": "crumbBoardTrustees",
    "board-directors": "crumbBoardDirectors",
    "advisory-council": "crumbAdvisoryCouncil",
    "college-council": "crumbCollegeCouncil",
    messages: "crumbMessages",
    partners: "crumbPartners",
    departments: "crumbDepartments",
    "graduate-programs": "crumbGraduatePrograms",
    news: "crumbNews",
    events: "crumbEvents",
    "research-highlights": "crumbResearchHighlights",
    careers: "crumbCareers",
    contact: "crumbContact",
    create: "crumbCreate",
    new: "crumbNew",
    edit: "crumbEdit",
    programs: "crumbPrograms",
    "study-plan": "crumbStudyPlan",
    objective: "crumbObjective",
    users: "crumbUsers",
    "privacy-policy": "crumbPrivacyPolicy",
};

export default function Breadcrumbs() {
    const pathname = usePathname() || "/";
    const t = useTranslations("dashboardNav");

    const crumbs = useMemo<Crumb[]>(() => {
        const cleanPath = pathname.split("?")[0].split("#")[0];
        const segments = cleanPath.split("/").filter(Boolean);

        const dashboardIndex = segments.indexOf("dashboard");
        if (dashboardIndex === -1) return [];

        const dashSegments = segments.slice(dashboardIndex);

        const items: Crumb[] = [];
        let acc = "";
        dashSegments.forEach((seg, idx) => {
            acc += `/${seg}`;
            const isLast = idx === dashSegments.length - 1;

            const msgKey = SEG_TRANSLATION_KEY[seg];
            const label = msgKey
                ? t(msgKey as Parameters<typeof t>[0])
                : seg.length >= 20
                  ? "…"
                  : titleCase(seg);

            items.push({
                label,
                href: acc,
                active: isLast,
            });
        });

        return items;
    }, [pathname, t]);

    if (crumbs.length === 0) return null;

    return (
        <nav aria-label={t("breadcrumbAria")} className="hidden lg:block mb-4">
            <ol className="inline-flex items-center gap-1 rounded-full border bg-background/60 px-2 py-1 text-sm text-foreground/90 shadow-sm backdrop-blur">
                {crumbs.map((c, idx) => (
                    <li key={c.href} className="inline-flex items-center">
                        {idx > 0 ? <ChevronRight className="mx-1 size-4 text-foreground/40" aria-hidden="true" /> : null}

                        {c.active ? (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                {idx === 0 ? <Home className="me-2 size-4" aria-hidden="true" /> : null}
                                {c.label}
                            </span>
                        ) : (
                            <Link
                                href={c.href}
                                className="inline-flex items-center rounded-full px-3 py-1 transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {idx === 0 ? <Home className="me-2 size-4" aria-hidden="true" /> : null}
                                {c.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
