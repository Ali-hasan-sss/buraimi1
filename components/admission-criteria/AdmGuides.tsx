"use client";

import { Download, FileText, Users } from "lucide-react";
import { Button } from "../ui/button";
import { studentGuides } from "@/staticData/admission-criteria";

import { motion } from "framer-motion"
import { useLocale } from "next-intl";
import Link from "next/link";

export default function AdmGuides() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const t = {
        heading: isAr ? "دليل الطالب" : "Student Handbook",
        download: isAr ? "عرض الدليل" : "View Handbook",
        helpTitle: isAr ? "هل تحتاج إلى مساعدة؟" : "Need help?",
        helpText: isAr
            ? "فريق القبول والتسجيل متاح لمساعدتك"
            : "Our admissions team is here to assist you",
        contact: isAr ? "تواصل مع فريق القبول" : "Contact Admissions",
        faq: isAr ? "الأسئلة الشائعة" : "FAQ",
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-8 flex items-center gap-3">
                        <FileText className="size-8 text-[#6096b4]" />
                        {t.heading}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {studentGuides.map((guide, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-[#c2a772]/30 hover:border-[#6096b4] transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <guide.icon className="size-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl text-[#254151] mb-4">{isAr ? guide.titleAr : guide.titleEn}</h3>
                                        <Button
                                            asChild
                                            className="w-full bg-gradient-to-l from-[#c2a772] to-[#254151] text-white hover:opacity-90 rounded-full"
                                        >
                                            <a
                                                href={guide.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Download className="size-5 ml-2" />
                                                {t.download}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-[#6096b4]/30">
                        <p className="text-lg text-gray-700 text-center mb-4">
                            <strong>{t.helpTitle}</strong> {t.helpText}
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button asChild size="lg" className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-8 py-4 rounded-full">
                                <Link href="/main/admission">
                                    <Users className="size-5 ml-2" />
                                    {t.contact}
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-4 rounded-full">
                                <Link href="/main/admission-criteria">
                                    <FileText className="size-5 ml-2" />
                                    {t.faq}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

        </>
    )
}
