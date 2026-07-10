"use client";

import { Briefcase, Building2, Globe, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function FundType() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "أنواع التمويل والمنح",
            "sectionSubtitle": "Types of Funding and Grants",
        },
        "en": {
            "sectionTitle": "Types of Funding and Grants",
            "sectionSubtitle": "أنواع التمويل والمنح",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    const fundingTypes = [
        {
            icon: Building2,
            title: 'التمويل الداخلي',
            titleEn: 'Internal Funding',
            itemsAr: [
                'منح الأبحاث المؤسسية',
                'دعم المشاريع الابتكارية',
                'تمويل الحضانة البحثية',
                'مكافآت النشر العلمي'
            ],
            itemsEn: [
                'Institutional research grants',
                'Innovation project support',
                'Incubator funding',
                'Publication rewards'
            ],
            color: 'blue'
        },
        {
            icon: Globe,
            title: 'التمويل الخارجي',
            titleEn: 'External Funding',
            itemsAr: [
                'منح مجلس البحث العلمي (TRC)',
                'منح الشراكات الدولية',
                'التمويل الصناعي والتجاري',
                'المنح البحثية الدولية'
            ],
            itemsEn: [
                'The Research Council (TRC) grants',
                'International partnership grants',
                'Industrial and commercial funding',
                'International research grants'
            ],
            color: 'green'
        },
        {
            icon: Briefcase,
            title: 'المنح التنافسية',
            titleEn: 'Competitive Grants',
            itemsAr: [
                'منح التميز البحثي',
                'جوائز الابتكار والإبداع',
                'منح المشاريع متعددة التخصصات',
                'تمويل المؤتمرات العلمية'
            ],
            itemsEn: [
                'Research excellence grants',
                'Innovation and creativity awards',
                'Interdisciplinary project grants',
                'Scientific conference funding'
            ],
            color: 'purple'
        },
        {
            icon: Users,
            title: 'منح الطلبة',
            titleEn: 'Student Grants',
            itemsAr: [
                'دعم أبحاث طلبة الدراسات العليا',
                'منح المشاركة في المؤتمرات',
                'جوائز مشاريع التخرج',
                'دعم النشر العلمي للطلبة'
            ],
            itemsEn: [
                'Support for postgraduate student research',
                'Conference participation grants',
                'Graduation project awards',
                'Support for student scientific publications'
            ],
            color: 'amber'
        }
    ];
    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:mb-4 sm:text-5xl">{content.sectionTitle}</h2>
                    <p className="text-sm text-gray-600 sm:text-xl">{content.sectionSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                    {fundingTypes.map((type, index) => {
                        const title = locale === "ar" ? type.title : type.titleEn;
                        const titleSub = locale === "ar" ? type.titleEn : type.title;
                        const items = locale === "ar" ? type.itemsAr : type.itemsEn;

                        return (
                            <div key={index} className={`bg-white rounded-lg shadow-xl border-2 border-${type.color}-200 overflow-hidden hover:shadow-2xl transition-all`}>
                                {/* Header */}
                                <div className={`bg-gradient-to-r from-${type.color}-600 to-${type.color}-700 text-white p-4 sm:p-6`}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/20 backdrop-blur-sm size-12 sm:size-16 rounded-full flex items-center justify-center">
                                            <type.icon className="size-6 sm:size-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
                                            <p className="text-sm sm:text-lg opacity-90">{titleSub}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-3">
                                        {items.map((item, idx) => (
                                            <div key={idx} className={`bg-gradient-to-r from-${type.color}-50 to-white rounded-lg p-4 border-r-4 border-${type.color}-500 shadow-sm hover:shadow-md transition-all`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`bg-${type.color}-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-gray-700 font-semibold">{item}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>

    )
}