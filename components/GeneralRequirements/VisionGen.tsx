"use client";

import { Star, Target } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function VisionGen() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "الرؤية",
            "body": "تزويد المجتمع بجيل قادر على التفاعل الإيجابي مع متطلبات الحياة المعاصرة في المجتمعات المحلية والعالمية.",
        },
        "en": {
            "title": "Vision",
            "body": "Providing society with a generation capable of positive interaction with the requirements of contemporary life in local and global communities.",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-5 sm:p-10 border-2 border-green-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="bg-green-600 text-white p-3 sm:p-4 rounded-full  ">
                        <Target className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#254151]">{content.title}</h2>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 sm:p-8 border-2 border-green-200">

                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="hidden sm:flex
                        bg-green-600 text-white size-12 sm:size-16 rounded-full  items-center justify-center flex-shrink-0">
                            <Star className="size-6 sm:size-8" />
                        </div>
                        <p className="text-gray-700 text-base sm:text-xl leading-relaxed pt-1 sm:pt-3">
                            {content.body}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}