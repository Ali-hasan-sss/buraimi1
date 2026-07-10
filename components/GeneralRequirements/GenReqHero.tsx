"use client";

import { BookMarked } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function GenReqHero() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "وحدة المتطلبات العامة",
            "subtitle": "General Requirements Unit",
            "description": "تزويد الطلبة بالمهارات اللغوية والمعارف الثقافية والاجتماعية",
        },
        "en": {
            "title": "General Requirements Unit",
            "subtitle": "وحدة المتطلبات العامة",
            "description": "Providing students with language skills and cultural and social knowledge",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] py-10 text-white sm:py-16">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container relative z-10 mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-5 flex justify-center sm:mb-6">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm sm:p-5">
                            <BookMarked className="size-8 sm:size-16" />
                        </div>
                    </div>
                    <h1 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-5xl">{content.title}</h1>
                    <h2 className="mb-4 text-lg font-bold opacity-90 sm:mb-6 sm:text-2xl">{content.subtitle}</h2>
                    <p className="text-base leading-relaxed opacity-95 sm:text-xl">{content.description}</p>
                </div>
            </div>
        </section>
    );
}
