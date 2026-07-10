"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function GenReqMission() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "الرسالة",
            "body": "تزويد الطالب بقاعدة علمية متينة من المهارات اللغوية والحياتية، التي لها دور في صقل وتشكيل سمعته بحيث يكون قادراً على التواصل مع المجتمعات المحلية والعالمية في ظل الثروة المعلوماتية والتقدم التكنولوجي، في تحقيق متطلبات الحياة اليومية سواء على مستوى الحياة العلمية أو العملية.",
        },
        "en": {
            "title": "Mission",
            "body": "Providing students with a solid knowledge base of language and life skills that help shape their abilities to communicate with local and global communities amid the information boom and technological progress, supporting daily life needs in both academic and professional contexts.",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="rounded-lg border-2 border-purple-200 bg-white p-5 shadow-xl sm:p-10">
                <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                    <div className="rounded-full bg-purple-600 p-3 text-white sm:p-4">
                        <Heart className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#254151] sm:text-3xl">{content.title}</h2>
                </div>
                <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5 sm:p-8">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="hidden size-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white sm:flex sm:size-16">
                            <MessageCircle className="size-6 sm:size-8" />
                        </div>
                        <p className="pt-1 text-base leading-relaxed text-gray-700 sm:pt-3 sm:text-xl">{content.body}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
