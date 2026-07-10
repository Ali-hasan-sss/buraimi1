"use client";

import { Award, Database, FileText, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function AboutTRC() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "نظام إدارة المعلومات البحثية",
            "description":
                "نظام شامل لإدارة وتنظيم المعلومات البحثية في سلطنة عمان، يوفر منصة متكاملة للباحثين والمؤسسات البحثية للتواصل والتعاون وتبادل المعرفة العلمية.",
            "features": [
                {
                    "icon": Database,
                    "title": "قاعدة بيانات بحثية شاملة",
                    "description": "الوصول إلى قاعدة بيانات متكاملة للأبحاث والمشاريع البحثية في سلطنة عمان"
                },
                {
                    "icon": Users,
                    "title": "شبكة الباحثين العمانيين",
                    "description": "التواصل والتعاون مع الباحثين والمؤسسات البحثية على مستوى السلطنة"
                },
                {
                    "icon": Award,
                    "title": "منصة المنح البحثية",
                    "description": "التقديم على المنح والتمويلات البحثية المتاحة من مجلس البحث العلمي"
                },
                {
                    "icon": FileText,
                    "title": "نشر وتوثيق الأبحاث",
                    "description": "نشر الأبحاث والمخرجات العلمية وإتاحتها للمجتمع الأكاديمي والعلمي"
                }
            ]
        },
        "en": {
            "title": "Research Information Management System",
            "description":
                "A comprehensive system for managing and organizing research information in Oman, providing an integrated platform for researchers and institutions to connect, collaborate, and exchange knowledge.",
            "features": [
                {
                    "icon": Database,
                    "title": "Comprehensive Research Database",
                    "description": "Access a complete database of research and research projects in Oman."
                },
                {
                    "icon": Users,
                    "title": "Omani Researchers Network",
                    "description": "Connect and collaborate with researchers and institutions nationwide."
                },
                {
                    "icon": Award,
                    "title": "Research Grants Platform",
                    "description": "Apply for available research grants and funding opportunities."
                },
                {
                    "icon": FileText,
                    "title": "Publish & Document Research",
                    "description": "Publish and document research outputs for the academic and scientific community."
                }
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-2xl p-10 border-2 border-blue-200">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="bg-[#254151] text-white size-20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Database className="size-10" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-[#254151] mb-4">{content.title}</h2>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                {content.description}
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {content.features.map((feature, index: number) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#6096b4] text-white size-14 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="size-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#254151] mb-2">{feature.title}</h3>
                                        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}