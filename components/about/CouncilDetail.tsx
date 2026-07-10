"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    GraduationCap,
    Shield,
    Users,
} from "lucide-react";
import BoardDirectorsContent from "./BoardDirectorsContent";
import AccreditationCouncilContent from "./AccreditationCouncilContent";
import AdvisoryCouncilContent from "./AdvisoryCouncilContent";
import CollegeCouncilContent from "./CollegeCouncilContent";

const councilInfo: Record<
    string,
    {
        titleAr: string;
        titleEn: string;
        icon: typeof Briefcase;
        color: string;
    }
> = {
    "board-directors": {
        titleAr: "مجلس الإدارة",
        titleEn: "Board of Directors",
        icon: Briefcase,
        color: "from-[#254151] to-[#2d4a5c]",
    },
    "board-trustees": {
        titleAr: "مجلس الأمناء",
        titleEn: "Board of Trustees",
        icon: Shield,
        color: "from-[#6096b4] to-[#7aa5be]",
    },
    "advisory-council": {
        titleAr: "المجلس الاستشاري من القطاع الصناعي",
        titleEn: "Industrial Advisory Council",
        icon: Users,
        color: "from-[#c2a772] to-[#d4b883]",
    },
    "college-council": {
        titleAr: "مجلس الكلية",
        titleEn: "College Council",
        icon: GraduationCap,
        color: "from-[#254151] to-[#6096b4]",
    },
};

export default function CouncilDetail({
    councilId,
}: {
    councilId: string;
}) {
    const locale = useLocale();
    const isAr = locale === "ar";
    const info = councilInfo[councilId];

    if (!info) {
        return null;
    }

    const Icon = info.icon;

    const renderContent = () => {
        switch (councilId) {
            case "board-directors":
                return <BoardDirectorsContent />;
            case "board-trustees":
                return <AccreditationCouncilContent />;
            case "advisory-council":
                return <AdvisoryCouncilContent />;
            case "college-council":
                return <CollegeCouncilContent />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${info.color} py-16`}>
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {isAr ? info.titleAr : info.titleEn}
                        </h1>
                    </motion.div>

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link
                            href={`/main/about/councils`}
                            className="inline-flex items-center text-white/90 hover:text-white transition-colors"
                        >
                            {isAr ? (
                                <>
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                    العودة إلى المجالس
                                </>
                            ) : (
                                <>
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Councils
                                </>
                            )}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
}
