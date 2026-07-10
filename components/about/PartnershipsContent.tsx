"use client"

import { motion, type Variants } from "framer-motion"
import { Calendar, ExternalLink, Pencil, UserCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LoadingCard from "@/components/global/LoadingCard";
import { fetchPartnerships } from "@/store/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type PartnersType = {
    _id: string
    order: number,
    name: string,
    nameEn: string,
    type: string,
    description: string,
    date: string,
    international: boolean,
    link?: string,
}
export default function PartnershipsContent() {
    const dispatch = useAppDispatch();
    const [isAdmin, setIsAdmin] = useState(false);
    const partners = useAppSelector((state) => state.content.partnerships.items as PartnersType[]);
    const loading = useAppSelector((state) => state.content.partnerships.loading);
    const error = useAppSelector((state) => state.content.partnerships.error);

    const stats = useMemo(() => {
        const total = partners.length;
        let internationalCount = 0;

        let latestYear: number | null = null;
        for (const p of partners) {
            if (p.international) internationalCount += 1;

            const dateStr = (p.date || '').trim();
            if (!dateStr) continue;

            const years = dateStr.match(/\b(19|20)\d{2}\b/g);
            if (!years) continue;

            for (const y of years) {
                const yearNum = Number(y);
                if (!Number.isNaN(yearNum) && (latestYear === null || yearNum > latestYear)) {
                    latestYear = yearNum;
                }
            }
        }

        return {
            total,
            internationalCount,
            localCount: total - internationalCount,
            latestYear: latestYear ?? '-',
        };
    }, [partners]);

    useEffect(() => {
        if (!partners.length && !loading) {
            void dispatch(fetchPartnerships());
        }
    }, [dispatch, loading, partners.length]);

    useEffect(() => {
        void (async () => {
            try {
                const res = await fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" });
                const json = (await res.json()) as { ok?: boolean; isAdmin?: boolean };
                setIsAdmin(Boolean(json?.ok && json?.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        })();
    }, []);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <UserCheck className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        الجهات الشريكة
                    </h2>
                    <p className="text-gray-600 mt-1">Our Strategic Partners</p>
                </div>
                </div>
                {isAdmin && (
                    <Link
                        href="/dashboard/partners"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                    >
                        <Pencil className="size-4" />
                        تعديل الشركاء
                    </Link>
                )}
            </div>

            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl border border-blue-100"
            >
                <p className="text-gray-700 leading-relaxed text-center text-lg">
                    تفخر كلية البريمي الجامعية بشراكاتها الاستراتيجية مع العديد من المؤسسات الأكاديمية والحكومية والخاصة
                    محلياً ودولياً، بهدف تعزيز التميز الأكاديمي وتوفير فرص تدريب وتطوير مهارات الطلبة والخريجين.
                </p>
            </motion.div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))
                ) : error ? (
                    <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                        <p className="text-red-700 font-semibold">Failed to load partnerships</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                ) : partners.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-6 text-center">
                        <p className="text-gray-700 font-semibold">No partnerships found</p>
                    </div>
                ) : (
                    partners.map((partner, index) => (
                        <motion.div
                            key={`${partner._id}  ${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold">{partner.order}</span>
                                            </div>
                                            <h3 className="text-white font-bold text-lg">{partner.name}</h3>
                                        </div>
                                        <p className="text-blue-100 text-sm">{partner.nameEn}</p>
                                    </div>
                                    {partner.link && (
                                        <a
                                            href={partner.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                        >
                                            <ExternalLink className="size-5 text-white" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                {/* Type Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c2a772]/10 to-[#c2a772]/5 rounded-full border border-[#c2a772]/20">
                                    <div className="w-2 h-2 bg-[#c2a772] rounded-full"></div>
                                    <span className="text-[#254151] font-semibold text-sm">{partner.type}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed text-sm">{partner.description}</p>

                                {/* Date */}
                                {partner.date && (
                                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                                        <Calendar className="size-4 text-[#6096b4]" />
                                        <span className="text-gray-600 text-sm">{partner.date}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Statistics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
                <div className="bg-gradient-to-br from-[#254151] to-[#2d4a5c] p-6 rounded-2xl text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stats.total}</div>
                    <div className="text-blue-200 text-sm">إجمالي الشراكات</div>
                </div>
                <div className="bg-gradient-to-br from-[#6096b4] to-[#5085a3] p-6 rounded-2xl text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stats.internationalCount}</div>
                    <div className="text-blue-100 text-sm">شراكات دولية</div>
                </div>
                <div className="bg-gradient-to-br from-[#c2a772] to-[#b39662] p-6 rounded-2xl text-center">
                    <div className="text-4xl font-bold text-white mb-2">{stats.localCount}</div>
                    <div className="text-amber-100 text-sm">شراكات محلية</div>
                </div>
                <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] p-6 rounded-2xl text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-white mb-2 truncate" title={String(stats.latestYear)}>
                        {stats.latestYear}
                    </div>
                    <div className="text-blue-200 text-sm">أحدث الاتفاقيات</div>
                </div>
            </motion.div>
        </div>
    );
}