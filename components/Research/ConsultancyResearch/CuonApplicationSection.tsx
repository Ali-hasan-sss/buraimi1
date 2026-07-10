"use client";

import { BookOpen, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type ApplicationStep = {
    "number": string;
    "title": string;
    "description": string;
};

export default function CuonApplicationSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "تقديم طلب للحصول على خدمة استشارية",
            "subtitle": "Apply for Consultancy Service",
            "ctaTitle": "ابدأ بتقديم طلبك الآن",
            "ctaBody": "املأ نموذج الطلب للحصول على خدمة استشارية أو تسويق بحثك العلمي",
            "contact": "تواصل معنا",
            "researchUnit": "وحدة البحث العلمي",
            "steps": [
                {
                    "number": "1",
                    "title": "تحديد نوع الخدمة",
                    "description": "اختر بين استشارات الكلية أو الاستشارات الفردية حسب احتياجاتك"
                },
                {
                    "number": "2",
                    "title": "تعبئة الطلب",
                    "description": "املأ نموذج الطلب بجميع البيانات والمعلومات المطلوبة"
                },
                {
                    "number": "3",
                    "title": "المراجعة والموافقة",
                    "description": "يتم مراجعة الطلب من قبل الجهات المختصة للموافقة عليه"
                },
                {
                    "number": "4",
                    "title": "التنفيذ والمتابعة",
                    "description": "البدء في تنفيذ الخدمة الاستشارية ومتابعة سير العمل"
                }
            ]
        },
        "en": {
            "title": "Apply for Consultancy Service",
            "subtitle": "تقديم طلب للحصول على خدمة استشارية",
            "ctaTitle": "Start Your Application Now",
            "ctaBody": "Fill out the form to request a consultancy service or market your research work.",
            "contact": "Contact Us",
            "researchUnit": "Scientific Research Unit",
            "steps": [
                {
                    "number": "1",
                    "title": "Choose Service Type",
                    "description": "Choose between college consultations or individual consultations based on your needs."
                },
                {
                    "number": "2",
                    "title": "Fill the Application",
                    "description": "Complete the application form with all required information."
                },
                {
                    "number": "3",
                    "title": "Review and Approval",
                    "description": "The application is reviewed by the relevant parties for approval."
                },
                {
                    "number": "4",
                    "title": "Implementation and Follow-up",
                    "description": "Start delivering the consultancy service and follow up on progress."
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

                <div className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {content.steps.map((step: ApplicationStep, index: number) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-xl p-5 sm:p-6 border-2 border-blue-200 text-center hover:shadow-2xl transition-all"
                        >
                            <div className="bg-[#254151] text-white size-12 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl sm:text-3xl">
                                {step.number}
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-[#254151] mb-2 sm:mb-3">{step.title}</h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-5 sm:p-10 border-2 border-amber-200">
                    <div className="text-center">
                        <div className="flex justify-center mb-5 sm:mb-6">
                            <div className="bg-amber-600 text-white size-14 sm:size-20 rounded-full flex items-center justify-center">
                                <Send className="size-7 sm:size-10" />
                            </div>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">{content.ctaTitle}</h3>
                        <p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
                            {content.ctaBody}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/main/contact-directory"
                                className="inline-flex items-center gap-2 bg-[#254151] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-base sm:text-lg"
                            >
                                <Phone className="size-5 sm:size-6" />
                                <span>{content.contact}</span>
                            </Link>
                            <Link
                                href="/main/scientific-research"
                                className="inline-flex items-center gap-2 bg-[#6096b4] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-base sm:text-lg"
                            >
                                <BookOpen className="size-5 sm:size-6" />
                                <span>{content.researchUnit}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
