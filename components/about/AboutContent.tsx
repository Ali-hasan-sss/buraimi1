"use client"
import { Eye, MapPin, Target, Users } from "lucide-react";

import { motion } from "framer-motion"
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Save, X } from "lucide-react";

type AboutAccordionItem = {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    order: number;
};

type AboutInstitutionData = {
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    items: AboutAccordionItem[];
};

const ICONS_BY_ID: Record<string, typeof Target> = {
    "why-buc": Target,
    leadership: Users,
    "vision-values": Eye,
    "campus-visit": MapPin,
};

export default function AboutContent() {
    const locale = useLocale()
    const t = useTranslations("general")
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<AboutInstitutionData | null>(null);
    const [draft, setDraft] = useState<AboutInstitutionData | null>(null);
    const [activeItemId, setActiveItemId] = useState<string>("");

    useEffect(() => {
        async function load() {
            try {
                const [aboutRes, meRes] = await Promise.all([
                    fetch("/api/about-institution", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);

                const aboutJson = (await aboutRes.json()) as { ok: boolean; data?: AboutInstitutionData };
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };

                if (aboutJson.ok && aboutJson.data) {
                    const orderedItems = [...aboutJson.data.items].sort((a, b) => a.order - b.order);
                    const normalized = { ...aboutJson.data, items: orderedItems };
                    setData(normalized);
                    setActiveItemId(orderedItems[0]?.id || "");
                }

                setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        }
        void load();
    }, []);

    const view = isEditing ? draft : data;

    const quickLinks = useMemo(() => {
        return (view?.items || []).map((item) => ({
            ...item,
            icon: ICONS_BY_ID[item.id] || Target,
            color: "#6096b4",
        }));
    }, [view?.items]);

    const startEdit = () => {
        if (!data) return;
        setDraft({
            ...data,
            items: data.items.map((item) => ({ ...item })),
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };

    const updateDraft = (patch: Partial<AboutInstitutionData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const updateDraftItem = (id: string, patch: Partial<AboutAccordionItem>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
            };
        });
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const payload: AboutInstitutionData = {
                ...draft,
                titleAr: draft.titleAr.trim(),
                titleEn: draft.titleEn.trim(),
                contentAr: draft.contentAr.trim(),
                contentEn: draft.contentEn.trim(),
                items: draft.items.map((item, index) => ({
                    ...item,
                    titleAr: item.titleAr.trim(),
                    titleEn: item.titleEn.trim(),
                    contentAr: item.contentAr.trim(),
                    contentEn: item.contentEn.trim(),
                    order: index,
                })),
            };

            const res = await fetch("/api/about-institution", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json()) as { ok: boolean; data?: AboutInstitutionData };
            if (res.ok && json.ok && json.data) {
                const normalized = {
                    ...json.data,
                    items: [...json.data.items].sort((a, b) => a.order - b.order),
                };
                setData(normalized);
                setIsEditing(false);
                setDraft(null);
            }
        } finally {
            setSaving(false);
        }
    };

    const mainTitle = isAr
        ? (view?.titleAr || t("head_title_about"))
        : (view?.titleEn || "Discover Al-Buraimi University College");
    const mainContent = isAr ? (view?.contentAr || "") : (view?.contentEn || "");
    const contentParagraphs = mainContent
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <div className="space-y-0 max-w-full overflow-x-hidden">
            {/* Main Content Section */}
            <div className="grid lg:grid-cols-[1fr,380px] gap-12 max-w-full">
                {/* Right Side - Main Content */}
                <div className="space-y-8 order-2 lg:order-1 min-w-0">
                    {/* Page Title */}
                    <div>
                        <div className={`mb-3 flex items-center gap-3 ${isAr ? "justify-between" : "justify-between"}`}>
                            <h1 className="text-5xl md:text-6xl font-bold text-[#254151] leading-tight">
                                {mainTitle}
                            </h1>
                            {isAdmin && (
                                !isEditing ? (
                                    <button
                                        type="button"
                                        onClick={startEdit}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                                    >
                                        <Pencil className="size-4" />
                                        {isAr ? "تعديل القسم" : "Edit section"}
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={saveEdit}
                                            disabled={saving}
                                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
                                        >
                                            <Save className="size-4" />
                                            {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ" : "Save")}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                                        >
                                            <X className="size-4" />
                                            {isAr ? "إلغاء" : "Cancel"}
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        {/* White Underline */}
                        <div className="h-1 w-32 bg-white rounded-full mb-8"></div>

                        {/* Main Description */}
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            {isEditing && draft ? (
                                <div className="grid gap-3">
                                    <input
                                        type="text"
                                        value={draft.titleAr}
                                        onChange={(e) => updateDraft({ titleAr: e.target.value })}
                                        placeholder="العنوان بالعربي"
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        dir="rtl"
                                    />
                                    <input
                                        type="text"
                                        value={draft.titleEn}
                                        onChange={(e) => updateDraft({ titleEn: e.target.value })}
                                        placeholder="Title in English"
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        dir="ltr"
                                    />
                                    <textarea
                                        value={draft.contentAr}
                                        onChange={(e) => updateDraft({ contentAr: e.target.value })}
                                        placeholder="محتوى عن الكلية بالعربي"
                                        className="min-h-[150px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        dir="rtl"
                                    />
                                    <textarea
                                        value={draft.contentEn}
                                        onChange={(e) => updateDraft({ contentEn: e.target.value })}
                                        placeholder="About content in English"
                                        className="min-h-[150px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                        dir="ltr"
                                    />
                                </div>
                            ) : (
                                contentParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
                            )}
                        </div>
                    </div>

                </div>

                {/* Left Side - Quick Links */}
                <div className="order-1 lg:order-2 max-w-full min-w-0">
                    <div className="lg:sticky lg:top-24 space-y-4 max-w-full">
                        {quickLinks.map((link, index) => (
                            <motion.div
                                key={link.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <button
                                    type="button"
                                    onClick={() => setActiveItemId((prev) => (prev === link.id ? "" : link.id))}
                                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#6096b4] rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-center gap-4 w-full">
                                        {/* Icon Circle */}
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                            style={{ backgroundColor: link.color }}
                                        >
                                            <link.icon className="size-6 text-white" />
                                        </div>

                                        {/* Text */}
                                        <span className="text-right font-bold text-gray-800 group-hover:text-[#254151] transition-colors text-base">
                                            {isAr ? link.titleAr : link.titleEn}
                                        </span>
                                    </div>
                                </button>
                                {activeItemId === link.id && (
                                    <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                                        {isEditing ? (
                                            <div className="grid gap-2">
                                                <input
                                                    type="text"
                                                    value={link.titleAr}
                                                    onChange={(e) => updateDraftItem(link.id, { titleAr: e.target.value })}
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    placeholder="عنوان الزر بالعربي"
                                                    dir="rtl"
                                                />
                                                <input
                                                    type="text"
                                                    value={link.titleEn}
                                                    onChange={(e) => updateDraftItem(link.id, { titleEn: e.target.value })}
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    placeholder="Button title in English"
                                                    dir="ltr"
                                                />
                                                <textarea
                                                    value={link.contentAr}
                                                    onChange={(e) => updateDraftItem(link.id, { contentAr: e.target.value })}
                                                    className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    placeholder="محتوى العنصر بالعربي"
                                                    dir="rtl"
                                                />
                                                <textarea
                                                    value={link.contentEn}
                                                    onChange={(e) => updateDraftItem(link.id, { contentEn: e.target.value })}
                                                    className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    placeholder="Item content in English"
                                                    dir="ltr"
                                                />
                                            </div>
                                        ) : (
                                            <p className="leading-relaxed">{isAr ? link.contentAr : link.contentEn}</p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}