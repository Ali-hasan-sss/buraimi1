"use client";

import React, { useEffect, useRef, useState } from "react";
import motifPattern from "@/public/assets/f0d44e951856d5acf36cd6bce8a291e7e6cd0b62.png";
import { useLocale } from "next-intl";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";

interface FactStat {
    _id?: string;
    titleAr: string;
    titleEn: string;
    value: number;
    suffixAr: string;
    suffixEn: string;
    order: number;
}

export function FactsAndStats() {
    const locale = useLocale();
    const isAr = locale === "ar";

    const sectionRef = useRef<HTMLDivElement>(null);
    const rafIdRef = useRef<number | null>(null);
    const hasAnimatedRef = useRef(false);

    const [stats, setStats] = useState<FactStat[]>([]);
    const [draftStats, setDraftStats] = useState<FactStat[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [counters, setCounters] = useState<number[]>([]);

    const viewStats = isEditing ? draftStats : stats;

    const loadData = React.useCallback(async () => {
        try {
            const [statsRes, meRes] = await Promise.all([
                fetch("/api/fact-stats", { method: "GET", cache: "no-store" }),
                fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
            ]);

            const statsJson = (await statsRes.json()) as { ok: boolean; data?: FactStat[] };
            const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };

            if (statsJson.ok && Array.isArray(statsJson.data)) {
                const ordered = [...statsJson.data].sort((a, b) => a.order - b.order);
                setStats(ordered);
                setCounters(ordered.map(() => 0));
                hasAnimatedRef.current = false;
            }

            setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
        } catch {
            setIsAdmin(false);
            setStats([]);
        }
    }, []);

    const animateCounters = React.useCallback(() => {
        if (!stats.length) return;

        const durationMs = 1600;
        const start = performance.now();
        const targets = stats.map((s) => s.value);

        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
        }

        setCounters(stats.map(() => 0));

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);

            if (t >= 1) {
                setCounters(targets);
                rafIdRef.current = null;
                return;
            }

            setCounters(targets.map((target) => Math.round(target * eased)));
            rafIdRef.current = requestAnimationFrame(tick);
        };

        rafIdRef.current = requestAnimationFrame(tick);
    }, [stats]);

    useEffect(() => {
        void loadData();
    }, [loadData]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el || !stats.length || isEditing) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                if (entry.isIntersecting && !hasAnimatedRef.current) {
                    hasAnimatedRef.current = true;
                    animateCounters();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, [animateCounters, isEditing, stats.length]);

    const formatNumber = (num: number) => num.toLocaleString("en-US");

    const onEditStart = () => {
        setDraftStats(stats.map((item) => ({ ...item })));
        setIsEditing(true);
    };

    const onEditCancel = () => {
        setDraftStats([]);
        setIsEditing(false);
    };

    const updateDraftAt = (index: number, patch: Partial<FactStat>) => {
        setDraftStats((prev) =>
            prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
        );
    };

    const addNewStat = () => {
        setDraftStats((prev) => [
            ...prev,
            {
                titleAr: "احصائية جديدة",
                titleEn: "New Statistic",
                value: 0,
                suffixAr: "",
                suffixEn: "",
                order: prev.length,
            },
        ]);
    };

    const removeStat = (index: number) => {
        setDraftStats((prev) =>
            prev
                .filter((_, i) => i !== index)
                .map((item, i) => ({ ...item, order: i })),
        );
    };

    const saveChanges = async () => {
        const cleaned = draftStats.map((item, i) => ({
            ...item,
            titleAr: item.titleAr.trim(),
            titleEn: item.titleEn.trim(),
            suffixAr: item.suffixAr.trim(),
            suffixEn: item.suffixEn.trim(),
            value: Number(item.value) || 0,
            order: i,
        }));

        if (cleaned.some((item) => !item.titleAr || !item.titleEn || item.value < 0)) {
            return;
        }

        setSaving(true);
        try {
            const existingIds = new Set(stats.filter((s) => s._id).map((s) => String(s._id)));
            const draftIds = new Set(cleaned.filter((s) => s._id).map((s) => String(s._id)));

            const removedIds = [...existingIds].filter((id) => !draftIds.has(id));
            for (const id of removedIds) {
                await fetch(`/api/fact-stats/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
            }

            for (const item of cleaned) {
                if (item._id) {
                    await fetch(`/api/fact-stats/${item._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(item),
                    });
                } else {
                    await fetch("/api/fact-stats", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(item),
                    });
                }
            }

            await loadData();
            setIsEditing(false);
            setDraftStats([]);
        } finally {
            setSaving(false);
        }
    };

    const titleText = isAr ? "الحقائق و الأرقام" : "Facts & Numbers";

    return (
        <>
            <div className="bg-gradient-to-b from-gray-50 to-white relative py-6">
                <div className="px-4 md:px-8 lg:px-16 relative z-10">
                    <div
                        className={`flex items-center gap-3 ${isAr ? "justify-between flex-row-reverse" : "justify-between"}`}
                    >
                        <h2
                            className={`text-3xl font-black text-[#254151] ${isAr ? "text-right" : "text-left"} mb-0`}
                            style={{ fontFamily: "Cairo", fontWeight: 900, letterSpacing: "-0.02em" }}
                        >
                            {titleText}
                        </h2>
                        {isAdmin &&
                            (!isEditing ? (
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                                    onClick={onEditStart}
                                >
                                    <Pencil className="size-4" />
                                    {isAr ? "تعديل القسم" : "Edit Section"}
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
                                        onClick={saveChanges}
                                        disabled={saving}
                                    >
                                        <Save className="size-4" />
                                        {saving
                                            ? isAr
                                                ? "جاري الحفظ..."
                                                : "Saving..."
                                            : isAr
                                              ? "حفظ"
                                              : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                                        onClick={onEditCancel}
                                    >
                                        <X className="size-4" />
                                        {isAr ? "إلغاء" : "Cancel"}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <section
                ref={sectionRef}
                className="relative py-8 bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] shadow-lg overflow-hidden"
            >
                <div
                    className="absolute inset-0 pointer-events-none motif-scroll-bg opacity-35"
                    style={{
                        backgroundImage: `url(${motifPattern.src})`,
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "auto 100%",
                        backgroundPosition: "right center",
                        zIndex: 1,
                        mixBlendMode: "soft-light",
                    }}
                />

                <div
                    className="container mx-auto px-4"
                    style={{ position: "relative", zIndex: 3 }}
                >
                    {isAdmin && isEditing && (
                        <div className="mb-6 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
                                onClick={addNewStat}
                            >
                                <Plus className="size-4" />
                                {isAr ? "إضافة إحصائية" : "Add Statistic"}
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {viewStats.map((stat, index) => (
                            <div
                                key={stat._id || `new-${index}`}
                                className="relative flex items-center gap-4 justify-center"
                            >
                                {isAdmin && isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => removeStat(index)}
                                        className="absolute -top-3 -right-3 z-10 flex size-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                                        aria-label={isAr ? "حذف الإحصائية" : "Delete statistic"}
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                )}

                                <div className="flex flex-col">
                                    {isAdmin && isEditing ? (
                                        <div className="grid gap-2">
                                            <input
                                                type="text"
                                                value={stat.titleAr}
                                                onChange={(e) => updateDraftAt(index, { titleAr: e.target.value })}
                                                className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
                                                placeholder="العنوان بالعربي"
                                                dir="rtl"
                                            />
                                            <input
                                                type="text"
                                                value={stat.titleEn}
                                                onChange={(e) => updateDraftAt(index, { titleEn: e.target.value })}
                                                className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
                                                placeholder="Title in English"
                                                dir="ltr"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-white/90 font-semibold text-sm md:text-base">
                                            {isAr ? stat.titleAr : stat.titleEn}
                                        </div>
                                    )}

                                    <div className="flex gap-2 items-center">
                                        {isAdmin && isEditing ? (
                                            <div className="grid w-full gap-2">
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={stat.value}
                                                    onChange={(e) =>
                                                        updateDraftAt(index, { value: Number(e.target.value) })
                                                    }
                                                    className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
                                                    placeholder={isAr ? "الرقم" : "Number"}
                                                />
                                                <input
                                                    type="text"
                                                    value={stat.suffixAr}
                                                    onChange={(e) => updateDraftAt(index, { suffixAr: e.target.value })}
                                                    className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
                                                    placeholder="لاحقة الرقم بالعربي"
                                                    dir="rtl"
                                                />
                                                <input
                                                    type="text"
                                                    value={stat.suffixEn}
                                                    onChange={(e) => updateDraftAt(index, { suffixEn: e.target.value })}
                                                    className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60"
                                                    placeholder="Number suffix in English"
                                                    dir="ltr"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-3xl md:text-4xl font-bold text-white transition-all duration-300">
                                                    {formatNumber(counters[index] ?? 0)}
                                                </div>
                                                {(isAr ? stat.suffixAr : stat.suffixEn) && (
                                                    <div className="text-white/70 text-xs md:text-sm">
                                                        {isAr ? stat.suffixAr : stat.suffixEn}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {index < viewStats.length - 1 && (
                                    <div className="hidden md:block w-px h-16 bg-white/20 absolute left-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}