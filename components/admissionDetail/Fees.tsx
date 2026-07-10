"use client"
import { motion } from "framer-motion"
import { Award, DollarSign, GraduationCap } from "lucide-react"
import type { AdmissionFeeRow, AdmissionScholarship } from "@/types/admissionDetails"

export default function Fees({
    undergraduateFees,
    graduateFees,
    scholarships,
}: {
    undergraduateFees: AdmissionFeeRow[]
    graduateFees: AdmissionFeeRow[]
    scholarships: AdmissionScholarship[]
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <DollarSign className="size-8 text-[#6096b4]" />
                        الرسوم الدراسية للمرحلة الجامعية الأولى
                    </h2>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border-2 border-amber-200">
                        <p className="text-lg text-gray-700">
                            <strong>رسوم التقديم:</strong> (150) ريال عماني تدفع عند تقديم الطلب (رسوم غير قابلة للاسترداد)
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
                                    <th className="p-4 text-right border border-gray-300">التخصص</th>
                                    <th className="p-4 text-center border border-gray-300">رسوم القبول</th>
                                    <th className="p-4 text-center border border-gray-300">رسم الساعة المعتمدة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {undergraduateFees.map((fee, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-4 border border-gray-300 text-gray-800">{fee.program}</td>
                                        <td className="p-4 text-center border border-gray-300 text-[#254151] font-semibold">{fee.admission}</td>
                                        <td className="p-4 text-center border border-gray-300 text-[#6096b4] font-semibold">{fee.perCredit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <GraduationCap className="size-8 text-[#c2a772]" />
                        الرسوم الدراسية للدراسات العليا
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-l from-[#c2a772] to-[#254151] text-white">
                                    <th className="p-4 text-right border border-gray-300">التخصص</th>
                                    <th className="p-4 text-center border border-gray-300">رسوم القبول</th>
                                    <th className="p-4 text-center border border-gray-300">رسم الساعة المعتمدة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {graduateFees.map((fee, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-4 border border-gray-300 text-gray-800">{fee.program}</td>
                                        <td className="p-4 text-center border border-gray-300 text-[#254151] font-semibold">{fee.admission}</td>
                                        <td className="p-4 text-center border border-gray-300 text-[#c2a772] font-semibold">{fee.perCredit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <Award className="size-8 text-[#254151]" />
                        المنح الطلابية والمساعدات المالية
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-l from-[#254151] to-[#c2a772] text-white">
                                    <th className="p-4 text-center border border-gray-300">التسلسل</th>
                                    <th className="p-4 text-right border border-gray-300">عنوان</th>
                                    <th className="p-4 text-center border border-gray-300">نسبة الخصم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholarships.map((scholarship) => (
                                    <tr key={scholarship.id} className={scholarship.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-4 text-center border border-gray-300 text-[#254151] font-semibold">{scholarship.id}</td>
                                        <td className="p-4 border border-gray-300 text-gray-800">{scholarship.title}</td>
                                        <td className="p-4 text-center border border-gray-300">
                                            <span
                                                className={`inline-block px-4 py-2 rounded-full text-white font-bold ${scholarship.percentage === '30%' ? 'bg-gradient-to-r from-[#254151] to-[#6096b4]' :
                                                    scholarship.percentage === '25%' ? 'bg-gradient-to-r from-[#6096b4] to-[#254151]' :
                                                        scholarship.percentage === '20%' ? 'bg-gradient-to-r from-[#c2a772] to-[#254151]' :
                                                            scholarship.percentage === '15%' ? 'bg-gradient-to-r from-[#254151] to-[#c2a772]' :
                                                                'bg-gradient-to-r from-[#6096b4] to-[#c2a772]'
                                                    }`}
                                            >
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
    )
}
