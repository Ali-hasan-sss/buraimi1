"use client"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { FileText } from "lucide-react"
import { useLocale } from "next-intl"
import Link from "next/link"

export default function AdmCTA() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            heading: "انضم إلى عائلة كلية البريمي الجامعية",
            description: "ابدأ رحلتك الأكاديمية معنا اليوم واستفد من الخصومات والمساعدات المالية المتاحة",
            cta: "تقديم الطلب الآن",
        },
        en: {
            heading: "Join the University of Buraimi Family",
            description: "Start your academic journey today and benefit from available discounts and financial aid.",
            cta: "Apply Now",
        },
    }

    const t = isAr ? content.ar : content.en

    return (
        <div className="py-16 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl mb-4">{t.heading}</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {t.description}
                    </p>
                    <Button asChild size="lg" className="bg-white text-[#254151] hover:bg-gray-100 px-12 py-6 text-xl rounded-full shadow-xl">
                        <Link href="/main/admission">
                            <FileText className="size-6 ml-2" />
                            {t.cta}
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}