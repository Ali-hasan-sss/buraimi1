"use client";

import { Globe, Rocket, Trophy, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function ProjStatsSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "items": [
                { "icon": Rocket, "label": "مشاريع نشطة", "value": "26+", "color": "blue" },
                { "icon": Users, "label": "باحثين مشاركين", "value": "50+", "color": "green" },
                { "icon": Trophy, "label": "جوائز ومسابقات", "value": "15+", "color": "amber" },
                { "icon": Globe, "label": "شراكات دولية", "value": "10+", "color": "purple" }
            ]
        },
        "en": {
            "items": [
                { "icon": Rocket, "label": "Active Projects", "value": "26+", "color": "blue" },
                { "icon": Users, "label": "Participating Researchers", "value": "50+", "color": "green" },
                { "icon": Trophy, "label": "Awards & Competitions", "value": "15+", "color": "amber" },
                { "icon": Globe, "label": "International Partnerships", "value": "10+", "color": "purple" }
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {content.items.map((stat, index: number) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-lg shadow-xl p-5 sm:p-8 border-2 border-${stat.color}-200 text-center hover:shadow-2xl transition-all`}
                        >
                            <div className={`bg-${stat.color}-600 text-white size-12 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                <stat.icon className="size-6 sm:size-8" />
                            </div>
                            <h3 className="text-2xl sm:text-4xl font-bold text-[#254151] mb-2">{stat.value}</h3>
                            <p className={`text-sm sm:text-lg font-semibold text-${stat.color}-700`}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
