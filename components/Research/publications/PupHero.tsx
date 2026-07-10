"use client";

import { BookOpen } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function PupHero() {
    const data = {
        "ar": {
            "title": "المنشورات البحثية",
            "subtitle": "Research Publications",
            "description": "إنتاجنا العلمي من الكتب والمجلات والمؤتمرات البحثية"
        },
        "en": {
            "title": "Research Publications",
            "subtitle": "المنشورات البحثية",
            "description": "Our scholarly output from books, journals, and research conferences"
        }
    } as const;

    const locale = useLocale() as LocaleKey;
    const locVal: LocaleKey = locale === "ar" ? "ar" : "en";
    const currentData = data[locVal] ?? data["en"];
    return (
        <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] py-14 text-white sm:py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container relative z-10 mx-auto px-3 sm:px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="mb-5 flex justify-center sm:mb-6">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm sm:p-6">
                            <BookOpen className="size-12 sm:size-20" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold sm:mb-4 sm:text-6xl">
                        {currentData.title}
                    </h1>
                    <h2 className="mb-4 text-base font-bold opacity-90 sm:mb-6 sm:text-3xl">
                        {currentData.subtitle}
                    </h2>
                    <p className="text-sm leading-relaxed opacity-95 sm:text-2xl">
                        {currentData.description}
                    </p>
                </div>
            </div>
        </section>

    );
}