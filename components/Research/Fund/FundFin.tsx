"use client";

import { Award, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function FundFin() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "المساعدات المالية والمنح",
            "body": "تتمتع وحدة البحث العلمي والابتكار بهياكل مالية وبشرية محددة بالإضافة إلى الموارد اللازمة لدعم تنفيذ استراتيجية البحث والابتكار في الجامعة وتحقيق الأهداف المرتبطة بها.",
            "committeeStrong": "لجنة البحث العلمي والابتكار",
            "committeeBody": "، التي تتألف من المدير وممثلين عن الأقسام الأكاديمية ومنسقي الابتكار، مسؤولية توجيه خدمات الاستشارات وأنشطة الحضانة وتقييم المنح البحثية ومبادرات التطوير المهني.",
            "functionsTitle": "وظائف اللجنة",
            "functionsSubtitle": "Committee Functions",
            "committeeFunctions": [
                "توجيه خدمات الاستشارات البحثية",
                "إدارة أنشطة الحضانة والابتكار",
                "تقييم المنح البحثية ومعايير الأهلية",
                "دعم مبادرات التطوير المهني",
                "توفير الموارد المالية والبشرية",
                "متابعة تنفيذ استراتيجية البحث والابتكار",
            ],
        },
        "en": {
            "sectionTitle": "Financial Aid and Grants",
            "body": "The Scientific Research and Innovation Unit has defined financial and human structures, as well as the resources needed to support the implementation of the university’s research and innovation strategy and achieve its related objectives.",
            "committeeStrong": "Research and Innovation Committee",
            "committeeBody": ", composed of the director, representatives from academic departments, and innovation coordinators, is responsible for guiding consultancy services, incubation and innovation activities, evaluating research grants and eligibility criteria, and supporting professional development initiatives.",
            "functionsTitle": "Committee Functions",
            "functionsSubtitle": "وظائف اللجنة",
            "committeeFunctions": [
                "Guiding research consultancy services",
                "Managing incubation and innovation activities",
                "Evaluating research grants and eligibility criteria",
                "Supporting professional development initiatives",
                "Providing financial and human resources",
                "Following up on the implementation of the research and innovation strategy",
            ],
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-10 rounded-lg border-2 border-purple-200 bg-white p-5 shadow-2xl sm:mb-12 sm:p-10">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                        <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-white sm:size-20">
                            <Award className="size-6 sm:size-10" />
                        </div>
                        <div className="flex-1">
                            <h2 className="mb-4 text-2xl font-bold text-[#254151] sm:mb-6 sm:text-4xl">{content.sectionTitle}</h2>
                            <p className="mb-4 text-base leading-relaxed text-gray-700 sm:mb-6 sm:text-xl">{content.body}</p>
                            <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <Users className="mt-1 size-6 flex-shrink-0 text-purple-600 sm:size-8" />
                                    <p className="text-sm leading-relaxed text-gray-700 sm:text-lg">
                                        {locale === "ar" ? "وتتولى " : "The "}
                                        <strong className="text-purple-700">{content.committeeStrong}</strong>
                                        {content.committeeBody}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Committee Functions */}
                <div className="mb-10 sm:mb-12">
                    <div className="mb-6 text-center sm:mb-8">
                        <h3 className="mb-2 text-2xl font-bold text-[#254151] sm:text-4xl">{content.functionsTitle}</h3>
                        <p className="text-sm text-gray-600 sm:text-xl">{content.functionsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {content.committeeFunctions.map((func, index) => (
                            <div key={`${index}-${func}`} className="rounded-lg border-2 border-purple-200 bg-white p-4 shadow-xl transition-all hover:shadow-2xl sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-base font-bold text-white sm:size-12 sm:text-lg">
                                        {index + 1}
                                    </div>
                                    <p className="pt-1 text-sm leading-relaxed text-gray-700 sm:pt-2 sm:text-lg">{func}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}