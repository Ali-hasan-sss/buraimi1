"use client";

import { Target } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function GenReqObjectives() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "الأهداف",
            "items": [
                "صقل مهارات اللغة العربية الأربع: القراءة/التحدث/الاستماع/الكتابة",
                "تعريف الطالب بخصائص المهارات الأربع للغة العربية",
                "تحليل النصوص المقروءة باستخدام مهارات التفكير النقدي - الاستنتاج / التمييز / التقييم",
                "تعريف الطالب بمراحل الحضارة الإسلامية وصمودها وخصائصها",
                "يميز الطالب بين خصائص الحضارة الإسلامية ونظامها",
                "وضح التحولات التي طرأت على الحضارة الإسلامية في مراحلها المختلفة",
                "تعريف الطالب بخصائص المجتمع العماني",
                "يقوم الطالب بمقارنة البيئة العمانية مع البيئات الخليجية الأخرى",
                "العمل الجماعي في خدمة المجتمع - محلياً/عالمياً",
            ],
        },
        "en": {
            "title": "Objectives",
            "items": [
                "Develop the four Arabic language skills: reading, speaking, listening, and writing",
                "Introduce students to the characteristics of the four Arabic language skills",
                "Analyze reading texts using critical thinking skills: inference, discrimination, and evaluation",
                "Introduce students to the stages and characteristics of Islamic civilization and its resilience",
                "Differentiate between the characteristics and system of Islamic civilization",
                "Explain the transformations that occurred in Islamic civilization across its different stages",
                "Introduce students to the characteristics of Omani society",
                "Compare the Omani environment with other Gulf environments",
                "Teamwork in serving the community locally and globally",
            ],
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="rounded-lg border-2 border-amber-200 bg-white p-5 shadow-xl sm:p-10">
                <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
                    <div className="rounded-full bg-amber-600 p-3 text-white sm:p-4">
                        <Target className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#254151] sm:text-3xl">{content.title}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                    {content.items.map((objective, index) => (
                        <div
                            key={`${index}-${objective}`}
                            className="rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4 shadow-md sm:p-6"
                        >
                            <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-4">
                                <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white sm:size-12 sm:text-lg">
                                    {index + 1}
                                </div>
                                <p className="pt-1 text-sm leading-relaxed text-gray-700 sm:pt-2 sm:text-base">{objective}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
