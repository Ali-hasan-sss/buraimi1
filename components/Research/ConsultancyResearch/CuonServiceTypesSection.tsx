"use client";

import { Building2, CheckCircle, UserCheck } from "lucide-react";
import type { ElementType } from "react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type ServiceTypeItem = {
    "title": string;
    "titleEn": string;
    "icon": ElementType<{ className?: string }>;
    "description": string;
    "features": readonly string[];
    "color": string;
};

export default function CuonServiceTypesSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "أنواع الخدمات الاستشارية",
            "subtitle": "Types of Consultancy Services",
            "featuresTitle": "المميزات الرئيسية:",
            "types": [
                {
                    "title": "استشارات الكلية",
                    "titleEn": "College Consultations",
                    "icon": Building2,
                    "description": "يتم إنشاء هذا النوع من الاستشارات من خلال مفاوضات بين الكلية والعميل، حيث يتعامل عضو هيئة التدريس مباشرة مع العميل أثناء عمله كممثل رسمي للكلية.",
                    "features": [
                        "مفاوضات بين الكلية والعميل",
                        "عضو هيئة التدريس كممثل رسمي للكلية",
                        "الاستفادة من الدعم الشامل للكلية",
                        "عقود واتفاقات رسمية",
                        "دعم إداري ومالي كامل"
                    ],
                    "color": "blue"
                },
                {
                    "title": "الاستشارات الفردية",
                    "titleEn": "Individual Consultations",
                    "icon": UserCheck,
                    "description": "في هذا النوع من الاستشارات، يقوم عضو هيئة التدريس بتقديم الخدمات الاستشارية بشكل مستقل نتيجة لارتباطه المباشر أو تفاوضه مع العميل.",
                    "features": [
                        "خدمات استشارية مستقلة",
                        "ارتباط مباشر مع العميل",
                        "عضو هيئة التدريس يتولى المبادرة",
                        "جميع التفاعلات والترتيبات مباشرة",
                        "مسؤولية فردية كاملة"
                    ],
                    "color": "green"
                }
            ]
        },
        "en": {
            "title": "Types of Consultancy Services",
            "subtitle": "أنواع الخدمات الاستشارية",
            "featuresTitle": "Key Features:",
            "types": [
                {
                    "title": "College Consultations",
                    "titleEn": "استشارات الكلية",
                    "icon": Building2,
                    "description": "This type of consultancy is established through negotiations between the college and the client, where the faculty member deals directly with the client as an official representative of the college.",
                    "features": [
                        "Negotiations between the college and the client",
                        "Faculty member as an official representative",
                        "Benefit from full college support",
                        "Official contracts and agreements",
                        "Full administrative and financial support"
                    ],
                    "color": "blue"
                },
                {
                    "title": "Individual Consultations",
                    "titleEn": "الاستشارات الفردية",
                    "icon": UserCheck,
                    "description": "In this type, the faculty member provides consultancy services independently due to direct association or negotiation with the client.",
                    "features": [
                        "Independent consultancy services",
                        "Direct relationship with the client",
                        "Faculty member takes the initiative",
                        "All interactions and arrangements are direct",
                        "Full individual responsibility"
                    ],
                    "color": "green"
                }
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="bg-white py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:mb-4 sm:text-5xl">{content.title}</h2>
                    <p className="text-sm text-gray-600 sm:text-xl">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
                    {content.types.map((type: ServiceTypeItem, index: number) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg shadow-xl border-2 border-${type.color}-200 overflow-hidden hover:shadow-2xl transition-all`}
                        >
                            <div className={`bg-gradient-to-r from-${type.color}-600 to-${type.color}-700 text-white p-5 sm:p-8`}>
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="bg-white/20 backdrop-blur-sm size-12 sm:size-16 rounded-full flex items-center justify-center">
                                        <type.icon className="size-6 sm:size-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-3xl font-bold">{type.title}</h3>
                                        <p className="text-sm sm:text-lg opacity-90">{type.titleEn}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 sm:p-8">
                                <div
                                    className={`bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 rounded-lg p-4 sm:p-6 border-2 border-${type.color}-200 mb-5 sm:mb-6`}
                                >
                                    <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">{type.description}</p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-[#254151] sm:text-xl">
                                        <CheckCircle className={`size-5 sm:size-6 text-${type.color}-600`} />
                                        <span>{content.featuresTitle}</span>
                                    </h4>

                                    {type.features.map((feature: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`bg-gradient-to-r from-${type.color}-50 to-white rounded-lg p-4 border-r-4 border-${type.color}-500 shadow-sm hover:shadow-md transition-all`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`bg-${type.color}-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm`}
                                                >
                                                    {idx + 1}
                                                </div>
                                                <p className="text-gray-700 font-semibold">{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
