"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function AdmissionDetailCTA() {
    return (
        <div className="py-16 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl mb-4">انضم إلى عائلة كلية البريمي الجامعية</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        ابدأ رحلتك الأكاديمية معنا اليوم واستفد من الخصومات والمساعدات المالية المتاحة
                    </p>
                    <Button size="lg" className="bg-white text-[#254151] hover:bg-gray-100 px-12 py-6 text-xl rounded-full shadow-xl">
                        <FileText className="size-6 ml-2" />
                        تقديم الطلب الآن
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}