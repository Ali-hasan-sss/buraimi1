"use client";

import { Award, BookMarked, BookOpen, GraduationCap, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function AboutGen() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "نبذة عنا",
            "unitTitle": "وحدة المتطلبات العامة",
            "body": "تم إنشاء وحدة المتطلبات العامة كوحدة قائمة بذاتها، وتعمل هذه الوحدة على تزويد الطلبة بالمهارات اللغوية التي يحتاجونها، والمعارف الثقافية والاجتماعية، مما يساعدهم على التواصل مع المجتمع ومع مختلف مصادر المعلومات المحلية والعالمية، بالإضافة إلى صقل مواهبهم وشخصياتهم بأنواع المعرفة الإنسانية مما يساهم في بناء الشخصية المتوازنة.",
            "foundedLabel": "تأسست عام",
            "coursesLabel": "المواد المطروحة",
            "facultyLabel": "أعضاء الهيئة التدريسية",
        },
        "en": {
            "sectionTitle": "About Us",
            "unitTitle": "General Requirements Unit",
            "body": "In 2008, the General Requirements Unit was established as an independent unit. It provides students with essential language skills and cultural and social knowledge, helping them communicate with the community and access local and global sources of information. It also contributes to developing talents and well-rounded personalities through diverse areas of human knowledge.",
            "foundedLabel": "Established",
            "coursesLabel": "Courses Offered",
            "facultyLabel": "Faculty Members",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-5 sm:p-10 border-2 border-blue-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-full">
                        <BookMarked className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#254151]">{content.sectionTitle}</h2>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 sm:p-8 border-2 border-blue-200">
                    <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                        <div className="bg-blue-600 text-white size-12 sm:size-16 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                            <Award className="size-6 sm:size-8 " />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#254151] mb-2 sm:mb-3">{content.unitTitle}</h3>
                            <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
                                {locale === "ar" ? (
                                    <>
                                        في عام <strong className="text-blue-700">2008</strong> {content.body}
                                    </>
                                ) : (
                                    content.body
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-blue-200 text-center">
                            <div className="bg-blue-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="size-7 sm:size-8" />
                            </div>
                            <h4 className="font-bold text-[#254151] mb-2">{content.foundedLabel}</h4>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-700">2008</p>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-blue-200 text-center">
                            <div className="bg-blue-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <GraduationCap className="size-7 sm:size-8" />
                            </div>
                            <h4 className="font-bold text-[#254151] mb-2">{content.coursesLabel}</h4>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-700">3</p>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-2 border-blue-200 text-center">
                            <div className="bg-blue-600 text-white size-14 sm:size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Users className="size-7 sm:size-8" />
                            </div>
                            <h4 className="font-bold text-[#254151] mb-2">{content.facultyLabel}</h4>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-700">4</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}