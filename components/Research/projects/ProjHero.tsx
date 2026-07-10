"use client";

import { Lightbulb } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function ProjHero() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "المشاريع البحثية",
            "subtitle": "Research Projects",
            "description": "مشاريعنا البحثية والابتكارية التي تخدم المجتمع وتسهم في التنمية"
        },
        "en": {
            "title": "Research Projects",
            "subtitle": "المشاريع البحثية",
            "description": "Our research and innovation projects serving the community and contributing to development"
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] py-14 text-white sm:py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container relative z-10 mx-auto px-3 sm:px-4">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="mb-5 flex justify-center sm:mb-6">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm sm:p-6">
                            <Lightbulb className="size-12 sm:size-20" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold sm:mb-4 sm:text-6xl">{content.title}</h1>
                    <h2 className="mb-4 text-base font-bold opacity-90 sm:mb-6 sm:text-3xl">{content.subtitle}</h2>
                    <p className="text-sm leading-relaxed opacity-95 sm:text-2xl">{content.description}</p>
                </div>
            </div>
        </section>
    );
}
