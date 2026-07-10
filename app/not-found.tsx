"use client"

import { Home, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from "framer-motion"
import Link from 'next/link';
export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <AlertCircle className="size-24 text-[#c2a772] mx-auto mb-6" />
                    <h1 className="text-8xl font-bold text-[#254151] mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-[#254151] mb-4">الصفحة غير موجودة</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر
                    </p>
                    <Link
                        href="/main"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-[#254151] to-[#2d5263] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <Home className="size-5" />
                        العودة للصفحة الرئيسية
                        <ArrowRight className="size-5" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
