"use client";

import { Award, CircleDollarSign, FileCheck, Globe, Handshake, TrendingUp } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function FundIntro() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "headingEn": "Research Funding",
            "headingAr": "تمويل البحوث",
            "intro": "تعمل وحدة البحث العلمي والابتكار على تطوير خطة مستدامة تعالج التمويل الداخلي والخارجي لتعزيز ملف البحث العالمي من خلال ما يلي:",
            "objectives": [
                {
                    "icon": Globe,
                    "title": "الشراكات الوطنية والدولية",
                    "subtitle": "National and International Partnerships",
                    "description": "البناء على الشراكات الوطنية والدولية وتعزيزها لمعالجة أبرز التحديات المجتمعية والصناعية",
                    "color": "blue",
                },
                {
                    "icon": TrendingUp,
                    "title": "زيادة التمويل",
                    "subtitle": "Increasing Funding",
                    "description": "زيادة التمويل من المصادر الداخلية والخارجية ضمن الخطط المستقبلية للكلية",
                    "color": "green",
                },
                {
                    "icon": Handshake,
                    "title": "التعاون البحثي الممول",
                    "subtitle": "Funded Research Collaboration",
                    "description": "تعزيز التعاون البحثي الممول مع الشركاء التجاريين الاستراتيجيين على مستوى العالم",
                    "color": "purple",
                },
            ],
            "stats": [
                { "number": "4", "label": "أنواع التمويل", "icon": CircleDollarSign, "color": "blue" },
                { "number": "6", "label": "وظائف اللجنة", "icon": FileCheck, "color": "green" },
                { "number": "∞", "label": "فرص الشراكات", "icon": Handshake, "color": "purple" },
                { "number": "100%", "label": "الالتزام بالدعم", "icon": Award, "color": "amber" },
            ],
        },
        "en": {
            "headingEn": "Research Funding",
            "headingAr": "تمويل البحوث",
            "intro": "The Scientific Research and Innovation Unit is developing a sustainable plan that addresses internal and external funding to strengthen the global research profile through the following:",
            "objectives": [
                {
                    "icon": Globe,
                    "title": "National and International Partnerships",
                    "subtitle": "الشراكات الوطنية والدولية",
                    "description": "Building on and strengthening national and international partnerships to address key societal and industrial challenges.",
                    "color": "blue",
                },
                {
                    "icon": TrendingUp,
                    "title": "Increasing Funding",
                    "subtitle": "زيادة التمويل",
                    "description": "Increasing funding from internal and external sources within the college’s future plans.",
                    "color": "green",
                },
                {
                    "icon": Handshake,
                    "title": "Funded Research Collaboration",
                    "subtitle": "التعاون البحثي الممول",
                    "description": "Enhancing funded research collaboration with strategic commercial partners worldwide.",
                    "color": "purple",
                },
            ],
            "stats": [
                { "number": "4", "label": "Funding Types", "icon": CircleDollarSign, "color": "blue" },
                { "number": "6", "label": "Committee Functions", "icon": FileCheck, "color": "green" },
                { "number": "∞", "label": "Partnership Opportunities", "icon": Handshake, "color": "purple" },
                { "number": "100%", "label": "Commitment to Support", "icon": Award, "color": "amber" },
            ],
        },
    } as const;

    const content = t[locale] ?? t["en"];

    const fundingObjectives = content.objectives;
    const stats = content.stats;

    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-10 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-2xl sm:mb-12 sm:p-10">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                        <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white sm:size-20">
                            <TrendingUp className="size-6 sm:size-10" />
                        </div>
                        <div className="flex-1">
                            <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:mb-3 sm:text-4xl">{content.headingEn}</h2>
                            <h3 className="mb-4 text-xl font-bold text-blue-700 sm:mb-6 sm:text-3xl">{content.headingAr}</h3>
                            <p className="text-base leading-relaxed text-gray-700 sm:text-xl">{content.intro}</p>
                        </div>
                    </div>
                </div>

                {/* Funding Objectives */}
                <div className="mb-10 grid grid-cols-1 gap-5 sm:mb-12 sm:gap-8 md:grid-cols-3">
                    {fundingObjectives.map((objective, index) => (
                        <div key={index} className={`bg-white rounded-lg shadow-xl p-8 border-2 border-${objective.color}-200 hover:shadow-2xl transition-all`}>
                            <div className={`bg-${objective.color}-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6`}>
                                <objective.icon className="size-7 sm:size-8" />
                            </div>
                            <h3 className={`text-2xl font-bold text-${objective.color}-700 text-center mb-2`}>{objective.title}</h3>
                            <p className="text-center text-gray-600 mb-4 text-sm">{objective.subtitle}</p>
                            <div className={`bg-${objective.color}-50 rounded-lg p-4 border-2 border-${objective.color}-200`}>
                                <p className="text-gray-700 leading-relaxed">{objective.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className={`bg-white rounded-lg shadow-xl p-8 border-2 border-${stat.color}-200 text-center hover:shadow-2xl transition-all`}>
                            <div className={`bg-${stat.color}-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className="size-7 sm:size-8" />
                            </div>
                            <h3 className={`text-4xl font-bold text-${stat.color}-700 mb-2`}>{stat.number}</h3>
                            <p className="text-gray-700 font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}