"use client"
import { TrendingUp } from "lucide-react";

import { motion } from "framer-motion"
import { useLocale } from "next-intl";
export default function NewsHero() {

    const data = {
        ar: {
            title: "الأخبار والفعاليات",
            description: "آخر أخبار وفعاليات كلية البريمي الجامعية"
        },
        en: {
            title: "News & Events",
            description: "Latest news and events of Buraimi University College"
        }
    }

    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"
    const current = data[locVal]
    return (
        <div className="relative bg-gradient-to-l from-[#254151] via-[#2d5263] to-[#254151] text-white py-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560600472-87ae521e6bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbmV3cyUyMGFubm91bmNlbWVudHxlbnwxfHx8fDE3NzMxMjY3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#c2a772] rounded-full"></div>
                        <TrendingUp className="size-10 text-[#c2a772]" />
                        <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#c2a772] rounded-full"></div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{current.title}</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        {current.description}
                    </p>
                </motion.div>
            </div>
        </div>

    )
}