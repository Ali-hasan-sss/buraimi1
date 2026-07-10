"use client"
import { BookOpen, ChevronLeft, FileText, Globe, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

import { gradCardHeaderBackgroundStyleFromField } from "@/lib/graduate-program-gradient";
import type { GradProgramCard } from "@/types/graduate-program";

export default function GradProgram({ programs }: { programs: GradProgramCard[] }) {
    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false

    return (
        <section className="py-10 sm:py-12 lg:py-16 bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">برامج الدراسات العليا</h2>
                    <div className="w-16 sm:w-24 h-1 bg-[#c2a772] mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        نقدم مجموعة متنوعة من برامج الدراسات العليا المعتمدة بالشراكة مع جامعات عالمية مرموقة
                    </p>
                </div>

                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                    {programs.map((program) => {
                        const features = isRtl ? program.features : program.featuresEn
                        return (
                            <div
                                key={program.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#6096b4] transition-all hover:shadow-2xl group"
                            >
                                {/* Program Header */}
                                <div
                                    className="text-white p-5 sm:p-6 lg:p-8"
                                    style={gradCardHeaderBackgroundStyleFromField(program.color)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-snug">
                                                {program.title}
                                            </h3>
                                            <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed lg:leading-relaxed">
                                                {program.titleEn}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Program Content */}
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed sm:leading-relaxed mb-4 sm:mb-6">

                                        {isRtl ? program.description : program.descriptionEn}

                                    </p>

                                    {/* Affiliation Info */}
                                    {program.affiliation && (
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-blue-500 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                                            <div className="flex items-start gap-3">
                                                <Globe className="size-4 sm:size-5 lg:size-6 text-blue-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h4 className="font-bold text-[#254151] mb-2 text-base sm:text-lg">الارتباط الأكاديمي</h4>
                                                    <p className="text-gray-700 font-semibold text-sm sm:text-base leading-relaxed">

                                                        {isRtl ? program.affiliation : program.affiliationEn}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Detailed Info for English Masters */}

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                        {program.specializations &&
                                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-lg border-2 border-purple-200">
                                                <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                    <BookOpen className="size-4 sm:size-5 text-purple-600" />
                                                    الخطة الدراسية للتخصصات
                                                </h4>
                                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                                    {isRtl ? program.specializations : program.specializationsEn}
                                                </p>
                                            </div>}

                                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-lg border-2 border-green-200">
                                            <h4 className="font-bold text-[#254151] mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                <FileText className="size-4 sm:size-5 text-green-600" />
                                                الرسوم الدراسية
                                            </h4>
                                            {program.fees &&
                                                <p className="text-gray-700 mb-2 text-sm sm:text-base">{isRtl ? program.fees : program.feesEn}</p>
                                            }
                                            {program.credits &&
                                                <p className="text-xs sm:text-sm text-gray-600">{isRtl ? program.credits : program.creditsEn}</p>
                                            }
                                            {program.totalFees &&
                                                <p className="text-green-700 font-bold mt-2 text-sm sm:text-base">{isRtl ? program.totalFees : program.totalFeesEn}</p>
                                            }
                                        </div>
                                    </div>


                                    {/* Features */}
                                    <div className="mb-4 sm:mb-6">
                                        <h4 className="font-bold text-[#254151] mb-3 sm:mb-4 text-base sm:text-lg">مميزات البرنامج:</h4>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                                            {features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                                                    <div className="bg-[#6096b4] text-white size-5 sm:size-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[10px] sm:text-xs">✓</span>
                                                    </div>
                                                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-relaxed">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 pt-4 border-t-2 border-gray-100">
                                        <Link
                                            href={`/main/graduate-studies/${program.id}`}
                                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6096b4] to-[#254151] text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all group-hover:gap-3 text-base sm:text-lg"
                                        >
                                            <span>اقرأ المزيد</span>
                                            <ChevronLeft className="size-5 sm:size-6" />
                                        </Link>

                                        <Link
                                            href="/main/contact-directory"
                                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#6096b4] text-[#6096b4] w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-[#6096b4] hover:text-white transition-all text-base sm:text-lg"
                                        >
                                            <Phone className="size-5 sm:size-6" />
                                            <span>اتصل بنا</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

    )
}