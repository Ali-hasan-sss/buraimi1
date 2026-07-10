"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Download, Loader2, Target, Users } from "lucide-react";
import { toast } from "sonner";

type Issue = {
    _id: string;
    titleAr: string;
    titleEn: string;
    issueNumberAr: string;
    issueNumberEn: string;
    coverImage: string;
    fileUrl?: string;
    fileName?: string;
};

export default function MagazineOverView({ isAr }: { isAr: boolean }) {
    const data = {
        ar: {
            card1Title: 'مجلة إخبارية',
            card1Text: 'تصدر مرتين في السنة لتوثيق الأنشطة الأكاديمية والثقافية',
            card2Title: 'تعزيز الانتماء',
            card2Text: 'دعم التميز الأكاديمي والثقافي وتوثيق إنجازات الكلية',
            card3Title: 'منصة أكاديمية',
            card3Text: 'تسليط الضوء على أفكار ومساهمات مجتمع الكلية',
            latestIssues: 'أحدث الأعداد',
            downloadIssue: 'تحميل العدد',
            noFile: 'لا يوجد ملف',
            loading: 'جار التحميل...',
        },
        en: {
            card1Title: 'News Magazine',
            card1Text: 'Published twice a year to document academic and cultural activities.',
            card2Title: 'Strengthen Belonging',
            card2Text: 'Support academic and cultural excellence and document college achievements.',
            card3Title: 'Academic Platform',
            card3Text: 'Highlight ideas and contributions from the college community.',
            latestIssues: 'Latest Issues',
            downloadIssue: 'Download Issue',
            noFile: 'No file',
            loading: 'Loading...',
        },
    };

    const t = data[isAr ? "ar" : "en"];

    const [latestIssues, setLatestIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/magazine-issues")
            .then((r) => r.json())
            .then((d) => setLatestIssues((d.data || []).slice(0, 3)))
            .catch(() => toast.error(isAr ? "فشل تحميل الأعداد" : "Failed to load issues"))
            .finally(() => setLoading(false));
    }, [isAr]);

    function handleDownload(issue: Issue) {
        if (!issue.fileUrl) {
            toast.error(isAr ? "لا يوجد ملف لهذا العدد" : "No file for this issue");
            return;
        }
        const a = document.createElement("a");
        a.href = issue.fileUrl;
        a.download = issue.fileName || `${issue.issueNumberEn}.pdf`;
        a.click();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#6096b4]/10 rounded-full flex items-center justify-center">
                            <BookOpen className="size-8 text-[#6096b4]" />
                        </div>
                    </div>
                    <h3 className="text-xl text-[#254151] mb-4 text-center">{t.card1Title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{t.card1Text}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#c2a772]/10 rounded-full flex items-center justify-center">
                            <Target className="size-8 text-[#c2a772]" />
                        </div>
                    </div>
                    <h3 className="text-xl text-[#254151] mb-4 text-center">{t.card2Title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{t.card2Text}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#6096b4]/10 rounded-full flex items-center justify-center">
                            <Users className="size-8 text-[#6096b4]" />
                        </div>
                    </div>
                    <h3 className="text-xl text-[#254151] mb-4 text-center">{t.card3Title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{t.card3Text}</p>
                </div>
            </div>

            {/* Latest Issues Preview */}
            <div className="mt-16">
                <h2 className="text-3xl text-[#254151] mb-8 text-center">{t.latestIssues}</h2>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
                        <Loader2 className="size-5 animate-spin" />
                        {t.loading}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {latestIssues.map((issue) => (
                            <div
                                key={issue._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        fill
                                        src={issue.coverImage}
                                        alt={`${isAr ? issue.titleAr : issue.titleEn} - ${isAr ? issue.issueNumberAr : issue.issueNumberEn}`}
                                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        unoptimized
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl text-[#254151] mb-2">{isAr ? issue.titleAr : issue.titleEn}</h3>
                                    <p className="text-[#6096b4] mb-4">{isAr ? issue.issueNumberAr : issue.issueNumberEn}</p>
                                    <button
                                        onClick={() => handleDownload(issue)}
                                        disabled={!issue.fileUrl}
                                        className="flex items-center gap-2 text-[#c2a772] hover:text-[#254151] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Download className="size-4" />
                                        <span>{issue.fileUrl ? t.downloadIssue : t.noFile}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}