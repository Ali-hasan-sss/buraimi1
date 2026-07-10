"use client";

import { DollarSign } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function FundHero() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "المساعدات المالية و المنح",
            "subtitle": "Research Funding & Financial Aid",
            "description": "دعم البحث العلمي والابتكار من خلال خطط تمويل مستدامة",
        },
        "en": {
            "title": "Research Funding & Financial Aid",
            "subtitle": "المساعدات المالية  و المنح",
            "description": "Supporting scientific research and innovation through sustainable funding plans",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] text-white py-20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                            <DollarSign className="size-20" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold mb-4">
                        {content.title}
                    </h1>
                    <h2 className="text-3xl font-bold mb-6 opacity-90">
                        {content.subtitle}
                    </h2>
                    <p className="text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                        {content.description}
                    </p>
                </div>
            </div>
        </section>
    );
}