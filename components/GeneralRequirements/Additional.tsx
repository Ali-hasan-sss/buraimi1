"use client";

import { CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function Additional() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "ما يميز وحدة المتطلبات العامة",
            "items": [
                {
                    "title": "تأسيس قوي منذ 2008",
                    "desc": "خبرة تزيد عن 15 عاماً في تزويد الطلبة بالمهارات الأساسية",
                },
                {
                    "title": "مناهج متكاملة",
                    "desc": "تغطي اللغة العربية والحضارة الإسلامية والمجتمع العماني",
                },
                {
                    "title": "هيئة تدريسية متميزة",
                    "desc": "أساتذة متخصصون ذوو خبرة في مجالاتهم",
                },
                {
                    "title": "بناء شخصية متوازنة",
                    "desc": "صقل المواهب والشخصيات بأنواع المعرفة الإنسانية",
                },
            ],
        },
        "en": {
            "title": "What Makes the General Requirements Unit Distinct",
            "items": [
                {
                    "title": "Strong foundation since 2008",
                    "desc": "Over 15 years of experience providing students with essential skills",
                },
                {
                    "title": "Integrated curricula",
                    "desc": "Covering Arabic language, Islamic civilization, and Omani society",
                },
                {
                    "title": "Distinguished faculty",
                    "desc": "Specialized instructors with strong experience in their fields",
                },
                {
                    "title": "Building well-rounded personalities",
                    "desc": "Developing talents and character through diverse human knowledge",
                },
            ],
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl p-5 sm:p-10 border-2 border-blue-200">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="bg-blue-600 text-white size-12 sm:size-16 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="size-6 sm:size-8" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-[#254151] text-xl sm:text-2xl mb-4">{content.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.items.map((item, idx) => (
                            <div key={`${idx}-${item.title}`} className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-blue-200">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="size-5 sm:size-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-[#254151] mb-2">{item.title}</h4>
                                        <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}