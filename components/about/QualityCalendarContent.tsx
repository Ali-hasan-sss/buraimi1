"use client"

import { Calendar, ExternalLink, Lock } from "lucide-react";

import { motion, type Variants } from "framer-motion"

export default function QualityCalendarContent() {
    const calendars = [
        {
            year: '2024-2025',
            link: '#', // سيتم استبداله برابط Google Drive
            color: 'from-blue-500 to-cyan-600',
            bgGradient: 'from-blue-50 via-white to-cyan-50/30',
            borderColor: 'border-blue-200'
        },
        {
            year: '2025-2026',
            link: '#', // سيتم استبداله برابط Google Drive
            color: 'from-[#254151] to-[#6096b4]',
            bgGradient: 'from-slate-50 via-white to-blue-50/30',
            borderColor: 'border-slate-200'
        }
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Calendar className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        جدول ضمان الجودة
                    </h2>
                    <p className="text-gray-600 mt-1">QUALITY ASSURANCE CALENDAR</p>
                </div>
            </div>

            {/* Calendar Cards */}
            <div className="grid md:grid-cols-2 gap-8">
                {calendars.map((calendar, idx) => (
                    <motion.div
                        key={calendar.year}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.15 }}
                        className="group"
                    >
                        <div className={`bg-gradient-to-br ${calendar.bgGradient} p-8 rounded-2xl border ${calendar.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                            {/* Icon */}
                            <div className="relative mb-6">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${calendar.color} rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300`}></div>
                                <div className={`relative w-20 h-20 bg-gradient-to-br ${calendar.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                                    <Calendar className="size-10 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-bold text-[#254151]">
                                    جدول ضمان الجودة {calendar.year}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    الجدول الزمني لأنشطة وفعاليات دائرة ضمان الجودة للعام الأكاديمي {calendar.year}
                                </p>
                            </div>

                            {/* Button */}
                            <a
                                href={calendar.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-6 group/btn bg-gradient-to-r ${calendar.color} text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105`}
                            >
                                <span className="font-bold">اختر هنا للقراءة</span>
                                <ExternalLink className="size-5 group-hover/btn:translate-x-[-4px] transition-transform duration-300" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Access Notice */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg"
            >
                <div className="flex items-center gap-4">
                    <div className="shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <Lock className="size-6 text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-amber-800 font-semibold">
                            الدخول مقصور على موظفي البريمي الجامعية فقط
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
