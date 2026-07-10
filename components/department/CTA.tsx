"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ClipboardList, Mail } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"

interface DepartmentCTAProps {
    applyLink?: string
}

export default function DepartmentCTA({ applyLink }: DepartmentCTAProps) {
    const t = useTranslations("departmentCTA")
    const locale = useLocale()
    const isAr = locale === "ar"

    return (
        <div className="py-20 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl mb-6">{t("title")}</h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href={`/main/contact-directory`}>
                            <Button size="lg" className="bg-white text-[#254151] hover:bg-gray-100 px-10 py-6 text-lg">
                                <Mail className="size-6 ml-2" />
                                {t("contactUs")}
                            </Button>
                        </Link>
                        {applyLink && (
                            <Link href={applyLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-[#c2a772] hover:bg-[#b09060] text-white border-0 px-10 py-6 text-lg">
                                    <ClipboardList className="size-6 ml-2" />
                                    {isAr ? "طلب رسالة التدريب" : "Request Training Letter"}
                                </Button>
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}