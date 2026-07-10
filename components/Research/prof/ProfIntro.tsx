"use client";

import { Building2, Calendar, BookOpen, Target, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type ProfIntroContent = {
    "heading": string;
    "description": string;
    "objectivesTitle": string;
    "objectivesSubtitle": string;
    "objectives": string[];
    "stats": {
        "seminars": string;
        "years": string;
        "departments": string;
        "objectives": string;
    };
};

const t: Record<LocaleKey, ProfIntroContent> = {
    ar: {
        "heading": "نبذة عن التطوير الوظيفي",
        "description": "تهدف وحدة البحث العلمي والابتكار إلى تنظيم الندوات والمنتديات وورش العمل على مستوى الأقسام والكليات، لتحقيق الأهداف التالية:",
        "objectivesTitle": "الأهداف الرئيسية",
        "objectivesSubtitle": "Main Objectives",
        "objectives": [
            "تعزيز ثقافة التعلم المستمر لدى أعضاء الهيئة الأكاديمية بما يدعم التطوير المهني المستدام",
            "تيسير التواصل مع أحدث المستجدات في المجالات متعددة التخصصات لتبادل الخبرات واستثمار الفرص المتاحة",
            "وضع أهداف واضحة لبرامج وورش التطوير المهني بما يضمن تحقيق أثر فعّال وقابل للقياس",
            "تشجيع تبادل المعرفة والخبرات لدعم نمو الزملاء وتعزيز بيئة العمل التعاونية",
            "تعزيز الاهتمام بالرفاه الوظيفي بما يسهم في استدامة الإنتاجية وتحقيق النجاح المهني على المدى الطويل",
        ],
        "stats": {
            "seminars": "ندوة وورشة عمل",
            "years": "سنة أكاديمية",
            "departments": "قسم أكاديمي",
            "objectives": "أهداف رئيسية",
        },
    },
    en: {
        "heading": "Professional Development Overview",
        "description": "The Scientific Research and Innovation Unit organizes seminars, forums, and workshops across departments and colleges to achieve the following objectives:",
        "objectivesTitle": "Main Objectives",
        "objectivesSubtitle": "الأهداف الرئيسية",
        "objectives": [
            "Promote a culture of continuous learning among academic staff to support sustainable professional development",
            "Facilitate access to the latest updates across interdisciplinary fields to exchange expertise and leverage available opportunities",
            "Set clear goals for professional development programs and workshops to ensure measurable and effective impact",
            "Encourage knowledge and experience sharing to support colleagues’ growth and strengthen a collaborative work environment",
            "Enhance attention to well-being to sustain productivity and achieve long-term professional success",
        ],
        "stats": {
            "seminars": "Seminars & Workshops",
            "years": "Academic Years",
            "departments": "Academic Departments",
            "objectives": "Key Objectives",
        },
    },
};

type ProfIntroProps = {
    "seminarsCount"?: number;
    "yearsCount"?: number;
    "departmentsCount"?: number;
};

export default function ProfIntro({ seminarsCount = 0, yearsCount = 0, departmentsCount = 0 }: ProfIntroProps) {
    const locale = useLocale();
    const localeVal: LocaleKey = locale === "ar" ? "ar" : "en";
    const content = t[localeVal];

    const stats = [
        { "number": String(seminarsCount), "label": content.stats.seminars, "icon": BookOpen, "color": "blue" },
        { "number": String(yearsCount), "label": content.stats.years, "icon": Calendar, "color": "green" },
        { "number": String(departmentsCount), "label": content.stats.departments, "icon": Building2, "color": "purple" },
        { "number": String(content.objectives.length), "label": content.stats.objectives, "icon": Target, "color": "amber" },
    ] as const;

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-2xl p-5 sm:p-10 border-2 border-blue-200 mb-10 sm:mb-12">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="bg-blue-600 text-white size-14 sm:size-20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="size-7 sm:size-10" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#254151] mb-4 sm:mb-6">{content.heading}</h2>
                            <p className="text-gray-700 text-base sm:text-xl leading-relaxed">
                                {content.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Objectives */}
                <div className="mb-10 sm:mb-12">
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-2xl sm:text-4xl font-bold text-[#254151] mb-2">{content.objectivesTitle}</h3>
                        <p className="text-base sm:text-xl text-gray-600">{content.objectivesSubtitle}</p>
                    </div>

                    <div className="space-y-4">
                        {content.objectives.map((objective, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-xl p-4 sm:p-6 border-2 border-blue-200 hover:shadow-2xl transition-all">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-blue-600 text-white size-10 sm:size-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-base sm:text-lg">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed pt-1 sm:pt-2">{objective}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className={`bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 border-${stat.color}-200 text-center hover:shadow-2xl transition-all`}>
                            <div className={`bg-${stat.color}-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                <stat.icon className="size-7 sm:size-8" />
                            </div>
                            <h3 className={`text-3xl sm:text-4xl font-bold text-${stat.color}-700 mb-1 sm:mb-2`}>{stat.number}</h3>
                            <p className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}