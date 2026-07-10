"use client"

import Image from "next/image";

import heroBackgroundImg from '@/public/assets/about/foundation_landing.webp';
import { motion } from "framer-motion"
import { useLocale } from "next-intl";

export default function AdmHero() {
    const data = {
        ar: {
            title: "معلومات القبول الكاملة",
            description: "كل ما تحتاج معرفته عن القبول والرسوم والمساعدات المالية"
        },
        en: {
            title: "Complete Admissions Information",
            description: "Everything you need to know about admissions, fees, and financial aid"
        }
    }

    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"

    const current = data[locVal]
    return (
        <div className="h-[80dvh] relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-16 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={heroBackgroundImg}
                    alt="كلية البريمي الجامعية"
                    className="w-full h-full object-cover"
                    fill
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#254151]/90 via-[#254151]/80 to-[#2d4a5c]/90"></div>
            </div>

            <div className="relative container mx-auto px-4 z-10 w-full h-full flex items-center  justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl mb-4">{current.title}</h1>
                    <p className="text-xl text-white/90">
                        {current.description}
                    </p>
                </motion.div>
            </div>
        </div>

    )
}