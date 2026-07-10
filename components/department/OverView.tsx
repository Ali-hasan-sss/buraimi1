"use client";

import type { DepartmentOverviewRow } from "@/lib/department-public";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function OverView({ departments }: { departments: DepartmentOverviewRow[] }) {
    const locale = useLocale();
    const t = useTranslations("departmentPage");
    const isRtl = locale === "ar";

    if (departments.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#254151] mb-4">البرامج المطروحة</h2>
                    <div className="w-24 h-1 bg-[#c2a772] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {departments.map((dept) => {
                        const title = locale === "ar" ? dept.titleAr : dept.titleEn;
                        return (
                            <div
                                key={dept.domain}
                                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#6096b4] transition-all hover:shadow-2xl group"
                            >
                                <div className={`bg-gradient-to-r ${dept.color} text-white p-6`}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold">{title}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h4 className="font-bold text-[#254151] mb-4 text-lg">{t("programsAvailable")}</h4>
                                    <ul className="space-y-3 mb-6">
                                        {dept.programs.map((program, idx) => {
                                            const label = locale === "ar" ? program.titleAr : program.titleEn;
                                            if (!label.trim()) return null;
                                            return (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-[#6096b4] mt-1">▪</span>
                                                    <span className="text-gray-700">{label}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <Link
                                        href={`/main/department/${dept.domain}`}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6096b4] to-[#254151] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all group-hover:gap-3"
                                    >
                                        <span>{t("readMore")}</span>
                                        {isRtl ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
