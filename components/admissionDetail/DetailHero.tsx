"use client"
import { motion } from "framer-motion"
import Image from "next/image";


import heroBackgroundImg from '@/public/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png';

export default function AdmissionDetailHeroComp() {
    return (
        <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-16 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    fill
                    src={heroBackgroundImg}
                    alt="كلية البريمي الجامعية"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#254151]/90 via-[#254151]/80 to-[#2d4a5c]/90"></div>
            </div>

            <div className="relative container mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl mb-4">معلومات القبول الكاملة</h1>
                    <p className="text-xl text-white/90">كل ما تحتاج معرفته عن القبول والرسوم والمساعدات المالية</p>
                </motion.div>
            </div>
        </div>

    )
}