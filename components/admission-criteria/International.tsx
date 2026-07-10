"use client"
import { motion } from "framer-motion"
import { CheckCircle, FileText, Globe } from "lucide-react"
import { useLocale } from "next-intl"

export default function AdmInternational() {

    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            heading: "قبول الطلبة الدوليين",
            description: "تساعد كلية البريمي الجامعية الطلاب الدوليين الذين حصلوا على القبول الأولي في الحصول على تأشيرة الدراسة. يجب على هؤلاء الطلاب تقديم المستندات المطلوبة إلى إدارة شؤون الموظفين.",
            initialDocsTitle: "الوثائق المطلوبة للقبول الأولي:",
            initialDocs: [
                "شهادة فحص طبي معتمدة (إذا كانت مطلوبة لبعض الجنسيات)",
                "نسخة من جواز السفر",
                "صورتان شخصيتان بحجم جواز السفر",
                "دليل على الطالب بعد إتمام عملية التسجيل بالكلية",
                "إيصال دفع رسوم التسجيل",
            ],
            visaTitle: "تأشيرة الدراسة - مستندات التجديد",
            visaDesc: "من أجل تجديد تأشيرة الطالب، يجب على الطلاب تقديم المستندات المطلوبة إلى قسم الطلاب:",
            visaDocs: [
                "أصل جواز السفر",
                "نسخة من تأشيرة الدراسة",
                "أصل بطاقة الإقامة",
                "صورتان شخصيتان بحجم جواز السفر",
                "خطاب قيد الطالب ومدة الدراسة المتبقية من القبول والتسجيل",
            ],
        },
        en: {
            heading: "International Students Admission",
            description: "The University of Buraimi supports international students who have received preliminary admission in obtaining a study visa. Students must submit the required documents to the HR/Administration office.",
            initialDocsTitle: "Documents required for preliminary admission:",
            initialDocs: [
                "Approved medical check certificate (if required for certain nationalities)",
                "Copy of passport",
                "Two passport-size photos",
                "Proof of student status after completing university registration",
                "Registration fee payment receipt",
            ],
            visaTitle: "Study Visa — Renewal Documents",
            visaDesc: "To renew the study visa, students must submit the following documents to the student office:",
            visaDocs: [
                "Original passport",
                "Copy of study visa",
                "Original residence card",
                "Two passport-size photos",
                "Enrollment letter and remaining study duration from Admissions & Registration",
            ],
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
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <Globe className="size-6 sm:size-8 text-[#6096b4]" />
                                {t.heading}
                            </h2>

                            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 mb-8">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {t.description}
                                </p>
                            </div>

                            <h3 className="text-2xl text-[#254151] mb-4">{t.initialDocsTitle}</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {t.initialDocs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border-2 border-[#6096b4]/30">
                                        <CheckCircle className=" hidden sm:flex size-6 text-[#6096b4] flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-l from-[#c2a772]/10 to-[#254151]/10 rounded-xl p-3 md:p-6 border-2 border-[#c2a772]/30">
                                <h3 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-4 flex items-center gap-2">
                                    <FileText className=" size-6 sm:size-7" />
                                    {t.visaTitle}
                                </h3>
                                <p className="text-gray-700 mb-4">{t.visaDesc}</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {t.visaDocs.map((item, index) => (
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
            )}
        </>
    )
}