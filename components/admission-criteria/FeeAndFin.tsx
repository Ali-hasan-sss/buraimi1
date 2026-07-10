"use client"

import { graduateFees, scholarships, undergraduateFees } from "@/staticData/admission-criteria"
import { motion } from "framer-motion"
import { Award, DollarSign, GraduationCap } from "lucide-react"
import { useLocale } from "next-intl"

export default function AdmFeeAndFin() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            ugHeading: "الرسوم الدراسية للمرحلة الجامعية الأولى",
            applyFeeLabel: "رسوم التقديم:",
            applyFeeText: "(150) ريال عماني تدفع عند تقديم الطلب (رسوم غير قابلة للاسترداد)",
            colProgram: "التخصص",
            colAdmission: "رسوم القبول",
            colPerCredit: "رسم الساعة المعتمدة",
            gradHeading: "الرسوم الدراسية للدراسات العليا",
            scholarshipsHeading: "المنح الطلابية والمساعدات المالية",
            colIndex: "التسلسل",
            colTitle: "عنوان",
            colDiscount: "نسبة الخصم",
        },
        en: {
            ugHeading: "Undergraduate Tuition Fees",
            applyFeeLabel: "Application fee:",
            applyFeeText: "150 OMR paid upon application submission (non-refundable)",
            colProgram: "Program",
            colAdmission: "Admission fee",
            colPerCredit: "Per credit hour",
            gradHeading: "Graduate Studies Tuition Fees",
            scholarshipsHeading: "Scholarships & Financial Aid",
            colIndex: "No.",
            colTitle: "Title",
            colDiscount: "Discount",
        },
    }

    const t = isAr ? content.ar : content.en
    return (
        <>
            {(
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-8">
                        {/* Undergraduate Fees */}
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <DollarSign className="size-6 md:size-8 text-[#6096b4]" />
                                {t.ugHeading}
                            </h2>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border-2 border-amber-200">
                                <p className="text-lg text-gray-700">
                                    <strong>{t.applyFeeLabel}</strong> {t.applyFeeText}
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-sm sm:text-base bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
                                            <th className="p-2 sm:p-4 text-start border border-gray-300">{t.colProgram}</th>
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colAdmission}</th>
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colPerCredit}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {undergraduateFees.map((fee, index) => (
                                            <tr key={index} className={`
                                             text-sm sm:text-base
                                            ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                                <td className="p-2 sm:p-4 border border-gray-300 text-gray-800">{isAr ? fee.programAr : fee.programEn}</td>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300 text-[#254151] font-semibold">{fee.admission}</td>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300 text-[#6096b4] font-semibold">{fee.perCredit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Graduate Fees */}
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <GraduationCap className="size-6 sm:size-8 text-[#c2a772]" />
                                {t.gradHeading}
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm sm:text-base">
                                    <thead>
                                        <tr className="bg-gradient-to-l from-[#c2a772] to-[#254151] text-white ">
                                            <th className="p-2 sm:p-4 text-start border border-gray-300">{t.colProgram}</th>
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colAdmission}</th>
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colPerCredit}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {graduateFees.map((fee, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="p-2 sm:p-4 border border-gray-300 text-gray-800">{isAr ? fee.programAr : fee.programEn}</td>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300 text-[#254151] font-semibold">{fee.admission}</td>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300 text-[#c2a772] font-semibold">{fee.perCredit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Scholarships Table */}
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <Award className="size-6 sm:size-8 text-[#254151]" />
                                {t.scholarshipsHeading}
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm sm:text-base">
                                    <thead>
                                        <tr className="bg-gradient-to-l from-[#254151] to-[#c2a772] text-white">
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colIndex}</th>
                                            <th className="p-2 sm:p-4 text-start border border-gray-300">{t.colTitle}</th>
                                            <th className="p-2 sm:p-4 text-center border border-gray-300">{t.colDiscount}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {scholarships.map((scholarship) => (
                                            <tr key={scholarship.id} className={scholarship.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300 text-[#254151] font-semibold">{scholarship.id}</td>
                                                <td className="p-2 sm:p-4 border border-gray-300 text-gray-800">{isAr ? scholarship.titleAr : scholarship.titleEn}</td>
                                                <td className="p-2 sm:p-4 text-center border border-gray-300">
                                                    <span className={`inline-block px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white font-bold ${scholarship.percentage === '30%' ? 'bg-gradient-to-r from-[#254151] to-[#6096b4]' :
                                                        scholarship.percentage === '25%' ? 'bg-gradient-to-r from-[#6096b4] to-[#254151]' :
                                                            scholarship.percentage === '20%' ? 'bg-gradient-to-r from-[#c2a772] to-[#254151]' :
                                                                scholarship.percentage === '15%' ? 'bg-gradient-to-r from-[#254151] to-[#c2a772]' :
                                                                    'bg-gradient-to-r from-[#6096b4] to-[#c2a772]'
                                                        }`}>
                                                        {scholarship.percentage}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

        </>
    )
}