"use client";

import Link from "next/link";
import { ChevronLeft, GraduationCap, Phone } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function GenReqCta() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "هل لديك استفسارات؟",
            "subtitle": "تواصل معنا للحصول على مزيد من المعلومات حول وحدة المتطلبات العامة",
            "contactDir": "دليل التواصل",
            "academic": "الشؤون الأكاديمية",
            "back": "العودة للرئيسية",
        },
        "en": {
            "title": "Have questions?",
            "subtitle": "Contact us to learn more about the General Requirements Unit",
            "contactDir": "Contact Directory",
            "academic": "Academic Affairs",
            "back": "Back to Home",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-gradient-to-r from-[#254151] to-[#6096b4] py-10 text-white sm:py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-4xl">{content.title}</h2>
                <p className="mx-auto mb-6 max-w-2xl text-base sm:mb-8 sm:text-xl">{content.subtitle}</p>
                <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                        href="/main/contact-directory"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-bold text-[#254151] transition-all hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg"
                    >
                        <Phone className="size-5 sm:size-6" />
                        <span>{content.contactDir}</span>
                    </Link>
                    <Link
                        href="/main/academic-affairs"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c2a772] px-5 py-3 text-base font-bold text-white transition-all hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg"
                    >
                        <GraduationCap className="size-5 sm:size-6" />
                        <span>{content.academic}</span>
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-5 py-3 text-base font-bold text-white transition-all hover:bg-white hover:text-[#254151] sm:px-8 sm:py-4 sm:text-lg"
                    >
                        <ChevronLeft className="size-5 sm:size-6" />
                        <span>{content.back}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
