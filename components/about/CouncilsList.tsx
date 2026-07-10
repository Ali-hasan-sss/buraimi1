"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
    Briefcase,
    GraduationCap,
    Shield,
    Users,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

const councils = [
    {
        id: "board-directors",
        titleAr: "مجلس الإدارة",
        titleEn: "Board of Directors",
        descriptionAr: "المجلس المسؤول عن الإشراف العام على إدارة الكلية واتخاذ القرارات الاستراتيجية",
        descriptionEn: "The council responsible for overall supervision of college management and strategic decision-making",
        icon: Briefcase,
        color: "from-[#254151] to-[#2d4a5c]",
    },
    {
        id: "board-trustees",
        titleAr: "مجلس الأمناء",
        titleEn: "Board of Trustees",
        descriptionAr: "المجلس المكلف بحماية مصالح الكلية والتأكد من تحقيق أهدافها",
        descriptionEn: "The council entrusted with protecting the interests of the college and ensuring its objectives are met",
        icon: Shield,
        color: "from-[#6096b4] to-[#7aa5be]",
    },
    {
        id: "advisory-council",
        titleAr: "المجلس الاستشاري من القطاع الصناعي",
        titleEn: "Industrial Advisory Council",
        descriptionAr: "المجلس الذي يقدم المشورة والدعم للكلية في تطوير البرامج الأكاديمية بما يتوافق مع احتياجات سوق العمل",
        descriptionEn: "The council that provides advice and support to the college in developing academic programs aligned with labor market needs",
        icon: Users,
        color: "from-[#c2a772] to-[#d4b883]",
    },
    {
        id: "college-council",
        titleAr: "مجلس الكلية",
        titleEn: "College Council",
        descriptionAr: "المجلس الأكاديمي المسؤول عن الشؤون الأكاديمية والتعليمية في الكلية",
        descriptionEn: "The academic council responsible for academic and educational affairs in the college",
        icon: GraduationCap,
        color: "from-[#254151] to-[#6096b4]",
    },
];

export default function CouncilsList() {
    const locale = useLocale();
    const isAr = locale === "ar";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        {isAr ? "المجالس" : "Councils"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 max-w-2xl mx-auto"
                    >
                        {isAr
                            ? "تعرف على مجالس كلية البريمي الجامعية ودورها في تحقيق رسالة الكلية"
                            : "Learn about Al Buraimi University College councils and their role in achieving the college's mission"}
                    </motion.p>
                </div>
            </div>

            {/* Councils Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {councils.map((council, index) => {
                        const Icon = council.icon;
                        return (
                            <motion.div
                                key={council.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/main/about/councils/${council.id}`}
                                    className="block group"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        {/* Header with Icon */}
                                        <div
                                            className={`bg-gradient-to-r ${council.color} p-6`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-bold text-white">
                                                    {isAr
                                                        ? council.titleAr
                                                        : council.titleEn}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-gray-600 mb-6 leading-relaxed">
                                                {isAr
                                                    ? council.descriptionAr
                                                    : council.descriptionEn}
                                            </p>

                                            {/* Arrow */}
                                            <div className="flex items-center text-[#6096b4] font-semibold group-hover:text-[#254151] transition-colors">
                                                <span>
                                                    {isAr
                                                        ? "عرض التفاصيل"
                                                        : "View Details"}
                                                </span>
                                                {isAr ? (
                                                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                                ) : (
                                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
