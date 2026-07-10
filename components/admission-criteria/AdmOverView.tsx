"use client"
import { motion } from "framer-motion"
import { Award, BookOpen, GraduationCap, Users } from "lucide-react"
import { useLocale } from "next-intl"

export default function AdmOverview() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            heading: "نظرة عامة",
            intro: "مرحباً بكم في صفحة القبول التفصيلية لكلية البريمي الجامعية. نحن ملتزمون بتوفير تعليم عالي الجودة يمكن الجميع من الوصول إليه.",
            stat1: "طالب جديد سنوياً",
            stat2: "برنامج أكاديمي",
            stat3: "فئة خصم متاحة",
            outro: "تقدم كلية البريمي الجامعية مجموعة واسعة من البرامج الأكاديمية في المرحلة الجامعية والدراسات العليا، مع توفير مساعدات مالية وخصومات متنوعة لجعل التعليم في متناول الجميع.",
        },
        en: {
            heading: "Overview",
            intro: "Welcome to the detailed admissions page for the University of Buraimi. We are committed to providing high-quality higher education that is accessible to everyone.",
            stat1: "New students each year",
            stat2: "Academic programs",
            stat3: "Discount categories available",
            outro: "The University of Buraimi offers a wide range of undergraduate and postgraduate programs, along with financial aid and various discounts to make education accessible.",
        },
    }

    const t = isAr ? content.ar : content.en

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-white rounded-2xl shadow-xl  p-2 md:p-6 xl:p-8 mb-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <BookOpen className="size-8 text-[#6096b4]" />
                        {t.heading}
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="text-lg md:text-xl mb-6">
                            {t.intro}
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] text-white rounded-xl p-6 text-center">
                                <Users className="size-7 md:size-10 xl:size-12 mx-auto mb-4" />
                                <h3 className="text-2xl mb-2">400+</h3>
                                <p>{t.stat1}</p>
                            </div>
                            <div className="bg-gradient-to-br from-[#6096b4] to-[#254151] text-white rounded-xl p-6 text-center">
                                <GraduationCap className="size-7 md:size-10 xl:size-12 mx-auto mb-4" />
                                <h3 className="text-2xl mb-2">15+</h3>
                                <p>{t.stat2}</p>
                            </div>
                            <div className="bg-gradient-to-br from-[#c2a772] to-[#254151] text-white rounded-xl p-6 text-center">
                                <Award className="size-7 md:size-10 xl:size-12 mx-auto mb-4" />
                                <h3 className="text-2xl mb-2">32</h3>
                                <p>{t.stat3}</p>
                            </div>
                        </div>
                        <p className="text-lg">
                            {t.outro}
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}