"use client";

import { BadgeCheck, FileSignature, Globe, Target } from "lucide-react";
import type { ComponentType } from "react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type ObjectiveItem = {
    "icon": ComponentType<{ className?: string }>;
    "title": string;
    "description": string;
    "color": string;
};

export default function CuonObjectivesSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "الهدف من الاستشارات وتسويق الخدمة",
            "subtitle": "Consultancy and Service Marketing Objectives",
            "items": [
                {
                    "icon": BadgeCheck,
                    "title": "الشفافية والكفاءة المهنية",
                    "description": "ضمان الشفافية والكفاءة المهنية والسلوك الأخلاقي في جميع الأنشطة الاستشارية التي تقوم بها المنظمة وموظفوها",
                    "color": "blue"
                },
                {
                    "icon": Globe,
                    "title": "نشر الخبرات",
                    "description": "نشر خبرات ومعارف أعضاء هيئة التدريس بكلية البريمي الجامعية بين الشركات المحلية والخارجية والمؤسسات الصناعية والأكاديمية",
                    "color": "green"
                },
                {
                    "icon": Target,
                    "title": "الأهداف الاستراتيجية",
                    "description": "صياغة الأهداف الاستراتيجية للكلية على النحو المبين في رؤيتها: ترسيخ مكانة أعضاء هيئة التدريس والخريجين والطلاب كأصوات رائدة في المنطقة",
                    "color": "purple"
                },
                {
                    "icon": FileSignature,
                    "title": "تنظيم الإجراءات",
                    "description": "تنظيم إجراءات تأسيس مشاركة الموظفين في الخدمات الاستشارية وإدارة الأنشطة التجارية من حيث المسائل التعاقدية والالتزامات المالية والقانونية",
                    "color": "amber"
                }
            ]
        },
        "en": {
            "title": "Consultancy and Service Marketing Objectives",
            "subtitle": "الهدف من الاستشارات وتسويق الخدمة",
            "items": [
                {
                    "icon": BadgeCheck,
                    "title": "Transparency and Professional Competence",
                    "description": "Ensuring transparency, professional competence, and ethical conduct in all consultancy activities carried out by the organization and its staff.",
                    "color": "blue"
                },
                {
                    "icon": Globe,
                    "title": "Sharing Expertise",
                    "description": "Sharing the expertise and knowledge of BUC faculty members with local and international companies and industrial and academic institutions.",
                    "color": "green"
                },
                {
                    "icon": Target,
                    "title": "Strategic Objectives",
                    "description": "Formulating the college’s strategic objectives as stated in its vision: establishing faculty, graduates, and students as leading voices in the region.",
                    "color": "purple"
                },
                {
                    "icon": FileSignature,
                    "title": "Procedures and Governance",
                    "description": "Organizing procedures for staff participation in consultancy services and managing business activities in terms of contractual, financial, and legal obligations.",
                    "color": "amber"
                }
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:mb-4 sm:text-5xl">{content.title}</h2>
                    <p className="text-sm text-gray-600 sm:text-xl">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                    {content.items.map((objective: ObjectiveItem, index: number) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg shadow-xl p-5 sm:p-8 border-2 border-${objective.color}-200 hover:shadow-2xl transition-all`}
                        >
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div
                                    className={`bg-${objective.color}-600 text-white size-12 sm:size-16 rounded-full flex items-center justify-center flex-shrink-0`}
                                >
                                    <objective.icon className="size-6 sm:size-8" />
                                </div>
                                <div className="flex-1">
                                    <h3
                                        className={`text-lg sm:text-2xl font-bold text-${objective.color}-700 mb-2 sm:mb-3`}
                                    >
                                        {objective.title}
                                    </h3>
                                    <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">{objective.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
