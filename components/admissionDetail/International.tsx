"use client"
import { motion } from "framer-motion"
import { FileText, Globe, CheckCircle } from "lucide-react"

export default function International() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <Globe className="size-8 text-[#6096b4]" />
                        قبول الطلبة الدوليين
                    </h2>

                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            تساعد كلية البريمي الجامعية الطلاب الدوليين الذين حصلوا على القبول الأولي في الحصول على تأشيرة الدراسة. يجب على هؤلاء الطلاب تقديم المستندات المطلوبة إلى إدارة شؤون الموظفين.
                        </p>
                    </div>

                    <h3 className="text-2xl text-[#254151] mb-4">الوثائق المطلوبة للقبول الأولي:</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {[
                            'شهادة فحص طبي معتمدة (إذا كانت مطلوبة لبعض الجنسيات)',
                            'نسخة من جواز السفر',
                            'صورتان شخصيتان بحجم جواز السفر',
                            'دليل على الطالب بعد إتمام عملية التسجيل بالكلية',
                            'إيصال دفع رسوم التسجيل'
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border-2 border-[#6096b4]/30">
                                <CheckCircle className="size-6 text-[#6096b4] flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-l from-[#c2a772]/10 to-[#254151]/10 rounded-xl p-6 border-2 border-[#c2a772]/30">
                        <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                            <FileText className="size-7" />
                            تأشيرة الدراسة - مستندات التجديد
                        </h3>
                        <p className="text-gray-700 mb-4">من أجل تجديد تأشيرة الطالب، يجب على الطلاب تقديم المستندات المطلوبة إلى قسم الطلاب:</p>
                        <div className="grid md:grid-cols-2 gap-3">
                            {[
                                'أصل جواز السفر',
                                'نسخة من تأشيرة الدراسة',
                                'أصل بطاقة الإقامة',
                                'صورتان شخصيتان بحجم جواز السفر',
                                'خطاب قيد الطالب ومدة الدراسة المتبقية من القبول والتسجيل'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                    <CheckCircle className="size-5 text-[#c2a772] flex-shrink-0 mt-1" />
                                    <p className="text-gray-700 text-sm">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
