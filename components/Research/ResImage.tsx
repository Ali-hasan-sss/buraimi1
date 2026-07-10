"use client";

import collaborationImage from "@/public/assets/research/InCollage.jpg";
import conferenceImage from "@/public/assets/research/Call.jpg";
import Image from "next/image";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function ResImages() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "الفعاليات والشراكات",
            "sectionSubtitle": "Events and Partnerships",
            "card1Alt": "التعاون والشراكات",
            "card1Title": "الاتفاقيات والشراكات",
            "card1Desc": "توقيع اتفاقيات التعاون مع المؤسسات الأكاديمية والبحثية",
            "card2Alt": "مؤتمر البحث العلمي",
            "card2Title": "المؤتمر البحثي السنوي",
            "card2ConfLine": "BUC 4th Student Research Conference 2024",
            "topicLabel": "الموضوع:",
            "topicValue": "\"Beyond Boundaries: Shaping the Future Through Research\"",
            "dateLabel": "التاريخ:",
            "dateValue": "10 ديسمبر 2024",
        },
        "en": {
            "sectionTitle": "Events and Partnerships",
            "sectionSubtitle": "الفعاليات والشراكات",
            "card1Alt": "Collaboration and Partnerships",
            "card1Title": "Agreements and Partnerships",
            "card1Desc": "Signing collaboration agreements with academic and research institutions",
            "card2Alt": "Student Research Conference",
            "card2Title": "Annual Research Conference",
            "card2ConfLine": "BUC 4th Student Research Conference 2024",
            "topicLabel": "Topic:",
            "topicValue": "\"Beyond Boundaries: Shaping the Future Through Research\"",
            "dateLabel": "Date:",
            "dateValue": "10 December 2024",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:mb-4 sm:text-5xl">
                        {content.sectionTitle}
                    </h2>
                    <p className="text-sm text-gray-600 sm:text-xl">{content.sectionSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border-2 border-blue-200 bg-white shadow-lg transition-all hover:shadow-xl">
                        <Image
                            src={collaborationImage}
                            alt={content.card1Alt}
                            className="h-auto w-full object-cover"
                            priority={false}
                        />
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6">
                            <h3 className="mb-1 text-lg font-bold text-[#254151] sm:mb-2 sm:text-2xl">
                                {content.card1Title}
                            </h3>
                            <p className="text-sm text-gray-700 sm:text-base">{content.card1Desc}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border-2 border-green-200 bg-white shadow-lg transition-all hover:shadow-xl">
                        <Image
                            src={conferenceImage}
                            alt={content.card2Alt}
                            className="h-auto w-full object-cover"
                            priority={false}
                        />
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
                            <h3 className="mb-1 text-lg font-bold text-[#254151] sm:mb-2 sm:text-2xl">
                                {content.card2Title}
                            </h3>
                            <p className="mb-3 text-sm text-gray-700 sm:text-base">{content.card2ConfLine}</p>
                            <div className="rounded-lg border-2 border-green-200 bg-white p-3 sm:p-4">
                                <p className="mb-2 text-xs text-gray-700 sm:text-sm">
                                    <strong>{content.topicLabel}</strong> {content.topicValue}
                                </p>
                                <p className="text-xs text-gray-700 sm:text-sm">
                                    <strong>{content.dateLabel}</strong> {content.dateValue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}