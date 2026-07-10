"use client";

import {
    Award,
    Briefcase,
    Building2,
    CheckCircle,
    FileText,
    Lightbulb,
    TrendingUp
} from "lucide-react";
import type { ElementType } from "react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type MarketingItem = {
    title: string;
    subtitle: string;
    icon: ElementType<{ className?: string }>;
};

export default function CuonDefinitionSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "consultancyTitle": "الاستشارات البحثية",
            "consultancySubtitle": "Research Consultancy",
            "consultancyBody": "تعني عندما يقدم أحد أعضاء هيئة التدريس استشارات أكاديمية أو بحثية تتعلق بمهاراته وخبراته لمؤسسة خارجية مقابل أجر مالي أو كخدمة مجانية طوعية.",
            "consultancyBold1": "استشارات أكاديمية أو بحثية",
            "consultancyBold2": "مقابل أجر مالي",
            "areasTitle": "مجالات الاستشارات:",
            "areas": [
                "القطاع الصناعي",
                "المؤسسات الأكاديمية",
                "الناشرين",
                "المدارس والجامعات",
                "الوزارات",
                "القطاع الخاص"
            ],
            "noteLabel": "ملاحظة:",
            "noteBody": "غالباً ما تخضع الاستشارات لعقود/اتفاقات قصيرة الأجل تحدد المسائل المالية ومسؤوليات كل طرف.",

            "marketingTitle": "تسويق البحث العلمي",
            "marketingSubtitle": "Research Marketing",
            "marketingBody1": "يعني التسويق التجاري للاكتشافات والاختراعات وبراءات الاختراع الناتجة عن المشاريع البحثية التطبيقية الممولة من كلية البريمي الجامعية.",
            "marketingBold1": "التسويق التجاري",
            "marketingBody2": "كما يغطي نشر العمل البحثي الذي من شأنه أن يوفر للمؤلف/عضو هيئة التدريس عائدات مالية.",
            "marketingBold2": "نشر العمل البحثي",
            "marketingItems": [
                {
                    "title": "الاكتشافات والاختراعات",
                    "subtitle": "نتائج المشاريع البحثية التطبيقية",
                    "icon": Lightbulb
                },
                {
                    "title": "براءات الاختراع",
                    "subtitle": "حماية الملكية الفكرية والابتكارات",
                    "icon": Award
                },
                {
                    "title": "النشر العلمي",
                    "subtitle": "تحقيق عائدات مالية من الأبحاث",
                    "icon": FileText
                }
            ]
        },
        "en": {
            "consultancyTitle": "Research Consultancy",
            "consultancySubtitle": "الاستشارات البحثية",
            "consultancyBody": "This refers to when a faculty member provides academic or research consultancy related to their skills and expertise to an external organization for a financial fee or as a voluntary free service.",
            "consultancyBold1": "academic or research consultancy",
            "consultancyBold2": "for a financial fee",
            "areasTitle": "Consultancy Areas:",
            "areas": [
                "Industrial sector",
                "Academic institutions",
                "Publishers",
                "Schools and universities",
                "Ministries",
                "Private sector"
            ],
            "noteLabel": "Note:",
            "noteBody": "Consultancies are often governed by short-term contracts/agreements defining financial matters and each party’s responsibilities.",

            "marketingTitle": "Research Marketing",
            "marketingSubtitle": "تسويق البحث العلمي",
            "marketingBody1": "It refers to the commercial marketing of discoveries, inventions, and patents resulting from applied research projects funded by Buraimi University College.",
            "marketingBold1": "commercial marketing",
            "marketingBody2": "It also covers publishing research work that can generate financial returns for the author/faculty member.",
            "marketingBold2": "publishing research work",
            "marketingItems": [
                {
                    "title": "Discoveries and Inventions",
                    "subtitle": "Outcomes of applied research projects",
                    "icon": Lightbulb
                },
                {
                    "title": "Patents",
                    "subtitle": "Protecting intellectual property and innovations",
                    "icon": Award
                },
                {
                    "title": "Scientific Publishing",
                    "subtitle": "Generating financial returns from research",
                    "icon": FileText
                }
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 lg:grid-cols-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 p-5 shadow-2xl sm:p-8">
                        <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
                            <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white sm:size-16">
                                <Briefcase className="size-6 sm:size-8" />
                            </div>
                            <div>
                                <h2 className="mb-1 text-2xl font-bold text-[#254151] sm:mb-2 sm:text-3xl">{content.consultancyTitle}</h2>
                                <p className="text-sm font-semibold text-blue-700 sm:text-lg">{content.consultancySubtitle}</p>
                            </div>
                        </div>

                        <div className="mb-5 rounded-lg border-2 border-blue-200 bg-white p-4 sm:mb-6 sm:p-6">
                            <p className="text-sm leading-relaxed text-gray-700 sm:text-lg">
                                {content.consultancyBody.split(content.consultancyBold1)[0]}
                                <strong className="text-blue-700">{content.consultancyBold1}</strong>
                                {content.consultancyBody
                                    .split(content.consultancyBold1)[1]
                                    ?.split(content.consultancyBold2)[0]}
                                <strong className="text-blue-700">{content.consultancyBold2}</strong>
                                {content.consultancyBody.split(content.consultancyBold2)[1]}
                            </p>
                        </div>

                        <div className="mb-5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white sm:mb-6 sm:p-6">
                            <h3 className="mb-3 flex items-center gap-2 text-base font-bold sm:mb-4 sm:text-xl">
                                <Building2 className="size-5 sm:size-6" />
                                <span>{content.areasTitle}</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                {content.areas.map((area: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:p-3"
                                    >
                                        <CheckCircle className="size-4 flex-shrink-0 sm:size-5" />
                                        <span className="text-xs font-semibold sm:text-sm">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border-2 border-blue-300 bg-blue-100 p-4">
                            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                                <strong className="text-blue-700">{content.noteLabel}</strong> {content.noteBody}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200 p-5 shadow-2xl sm:p-8">
                        <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
                            <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white sm:size-16">
                                <TrendingUp className="size-6 sm:size-8" />
                            </div>
                            <div>
                                <h2 className="mb-1 text-2xl font-bold text-[#254151] sm:mb-2 sm:text-3xl">{content.marketingTitle}</h2>
                                <p className="text-sm font-semibold text-green-700 sm:text-lg">{content.marketingSubtitle}</p>
                            </div>
                        </div>

                        <div className="mb-5 rounded-lg border-2 border-green-200 bg-white p-4 sm:mb-6 sm:p-6">
                            <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-lg">
                                {content.marketingBody1.split(content.marketingBold1)[0]}
                                <strong className="text-green-700">{content.marketingBold1}</strong>
                                {content.marketingBody1.split(content.marketingBold1)[1]}
                            </p>
                            <div className="rounded-lg border-r-4 border-green-500 bg-gradient-to-r from-green-50 to-white p-4">
                                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                                    {content.marketingBody2.split(content.marketingBold2)[0]}
                                    <strong className="text-green-700">{content.marketingBold2}</strong>
                                    {content.marketingBody2.split(content.marketingBold2)[1]}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {content.marketingItems.map((item: MarketingItem, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 rounded-lg border-2 border-green-200 bg-white p-4">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white sm:size-12">
                                        <item.icon className="size-5 sm:size-6" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-sm font-bold text-green-700 sm:text-base">{item.title}</h4>
                                        <p className="text-xs text-gray-600 sm:text-sm">{item.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
