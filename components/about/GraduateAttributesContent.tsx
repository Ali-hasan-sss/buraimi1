"use client"

import { Award, Pencil, Plus, Save, Target, Trash2, X } from "lucide-react";

import { motion } from "framer-motion"
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

type GraduateAttributeItem = {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    order: number;
};

type GraduateAttributesData = {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    listTitleAr: string;
    listTitleEn: string;
    footerTitleAr: string;
    footerTitleEn: string;
    footerTextAr: string;
    footerTextEn: string;
    attributes: GraduateAttributeItem[];
};

export default function GraduateAttributesContent() {
    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<GraduateAttributesData | null>(null);
    const [draft, setDraft] = useState<GraduateAttributesData | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/graduate-attributes", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok: boolean; data?: GraduateAttributesData };
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };
                if (json.ok && json.data) {
                    setData({
                        ...json.data,
                        attributes: [...json.data.attributes].sort((a, b) => a.order - b.order),
                    });
                }
                setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        }
        void load();
    }, []);

    const view = isEditing ? draft : data;

    const startEdit = () => {
        if (!data) return;
        setDraft({
            ...data,
            attributes: data.attributes.map((item) => ({ ...item })),
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };

    const updateDraft = (patch: Partial<GraduateAttributesData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const updateDraftAttr = (id: string, patch: Partial<GraduateAttributeItem>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                attributes: prev.attributes.map((item) => (item.id === id ? { ...item, ...patch } : item)),
            };
        });
    };

    const addAttribute = () => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                attributes: [
                    ...prev.attributes,
                    {
                        id: `attr-${Date.now()}`,
                        titleAr: "سمة جديدة",
                        titleEn: "New attribute",
                        descriptionAr: "",
                        descriptionEn: "",
                        order: prev.attributes.length,
                    },
                ],
            };
        });
    };

    const removeAttribute = (id: string) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                attributes: prev.attributes
                    .filter((item) => item.id !== id)
                    .map((item, index) => ({ ...item, order: index })),
            };
        });
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const payload: GraduateAttributesData = {
                titleAr: draft.titleAr.trim(),
                titleEn: draft.titleEn.trim(),
                descriptionAr: draft.descriptionAr.trim(),
                descriptionEn: draft.descriptionEn.trim(),
                listTitleAr: draft.listTitleAr.trim(),
                listTitleEn: draft.listTitleEn.trim(),
                footerTitleAr: draft.footerTitleAr.trim(),
                footerTitleEn: draft.footerTitleEn.trim(),
                footerTextAr: draft.footerTextAr.trim(),
                footerTextEn: draft.footerTextEn.trim(),
                attributes: draft.attributes.map((item, index) => ({
                    ...item,
                    titleAr: item.titleAr.trim(),
                    titleEn: item.titleEn.trim(),
                    descriptionAr: item.descriptionAr.trim(),
                    descriptionEn: item.descriptionEn.trim(),
                    order: index,
                })),
            };
            const res = await fetch("/api/graduate-attributes", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json()) as { ok: boolean; data?: GraduateAttributesData };
            if (res.ok && json.ok && json.data) {
                setData({
                    ...json.data,
                    attributes: [...json.data.attributes].sort((a, b) => a.order - b.order),
                });
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!view) {
        return <div className="text-[#254151] font-bold">Loading...</div>;
    }

    return (
        <div className="space-y-10 max-w-full overflow-x-hidden">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200 min-w-0">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Award className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        {isRtl ? view.titleAr : view.titleEn}
                    </h2>
                </div>
                {isAdmin && (
                    !isEditing ? (
                        <button
                            type="button"
                            onClick={startEdit}
                            className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                        >
                            <Pencil className="size-4" />
                            {isRtl ? "تعديل القسم" : "Edit Section"}
                        </button>
                    ) : (
                        <div className="ms-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={saveEdit}
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
                            >
                                <Save className="size-4" />
                                {saving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ" : "Save")}
                            </button>
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                            >
                                <X className="size-4" />
                                {isRtl ? "إلغاء" : "Cancel"}
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* Introduction Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 via-white to-amber-50/30 md:p-8 p-3 rounded-2xl border border-gray-200 shadow-lg"
            >
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    {isEditing ? (
                        <div className="grid gap-2">
                            <textarea
                                className="min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.descriptionAr || ""}
                                onChange={(e) => updateDraft({ descriptionAr: e.target.value })}
                                dir="rtl"
                            />
                            <textarea
                                className="min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.descriptionEn || ""}
                                onChange={(e) => updateDraft({ descriptionEn: e.target.value })}
                                dir="ltr"
                            />
                        </div>
                    ) : (
                        isRtl ? view.descriptionAr : view.descriptionEn
                    )}
                </div>
            </motion.div>

            {/* Attributes Title */}
            <div className="text-center space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-3 min-w-0">
                    <div className="h-1 w-20 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">
                        {isEditing ? (
                            <span className="inline-grid gap-2">
                                <input
                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.listTitleAr || ""}
                                    onChange={(e) => updateDraft({ listTitleAr: e.target.value })}
                                    dir="rtl"
                                />
                                <input
                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.listTitleEn || ""}
                                    onChange={(e) => updateDraft({ listTitleEn: e.target.value })}
                                    dir="ltr"
                                />
                            </span>
                        ) : (
                            isRtl ? view.listTitleAr : view.listTitleEn
                        )}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-l from-[#6096b4] to-[#c2a772] rounded-full"></div>
                </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid md:grid-cols-2 gap-6 min-w-0">
                {view.attributes.map((attr, idx) => {
                    const title = isRtl ? attr.titleAr : attr.titleEn
                    const description = isRtl ? attr.descriptionAr : attr.descriptionEn
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="group"
                        >
                            <div className={`bg-gradient-to-br  md:p-6 p-3 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 h-full`}>
                                <div className="flex items-start gap-5 min-w-0">
                                    {/* Icon */}
                                    <div className="relative shrink-0">

                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3 min-w-0">
                                        {isEditing ? (
                                            <div className="grid gap-2">
                                                <div className="flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAttribute(attr.id)}
                                                        className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        {isRtl ? "حذف" : "Delete"}
                                                    </button>
                                                </div>
                                                <input
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={attr.titleAr}
                                                    onChange={(e) => updateDraftAttr(attr.id, { titleAr: e.target.value })}
                                                    dir="rtl"
                                                    placeholder="عنوان السمة بالعربي"
                                                />
                                                <input
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={attr.titleEn}
                                                    onChange={(e) => updateDraftAttr(attr.id, { titleEn: e.target.value })}
                                                    dir="ltr"
                                                    placeholder="Attribute title in English"
                                                />
                                                <textarea
                                                    className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={attr.descriptionAr}
                                                    onChange={(e) => updateDraftAttr(attr.id, { descriptionAr: e.target.value })}
                                                    dir="rtl"
                                                    placeholder="الوصف بالعربي"
                                                />
                                                <textarea
                                                    className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={attr.descriptionEn}
                                                    onChange={(e) => updateDraftAttr(attr.id, { descriptionEn: e.target.value })}
                                                    dir="ltr"
                                                    placeholder="Description in English"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <h4 className="text-xl font-bold text-[#254151] leading-tight">{title}</h4>
                                                <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            {isEditing && (
                <div>
                    <button
                        type="button"
                        onClick={addAttribute}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                        <Plus className="size-4" />
                        {isRtl ? "إضافة سمة" : "Add Attribute"}
                    </button>
                </div>
            )}

            {/* Vision 2040 Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-[#254151] via-[#2d4a5c] to-[#6096b4] md:p-8 p-3 rounded-2xl shadow-xl text-center"
            >
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Target className="size-8 text-white" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    {isEditing ? (
                        <span className="inline-grid gap-2">
                            <input
                                className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.footerTitleAr || ""}
                                onChange={(e) => updateDraft({ footerTitleAr: e.target.value })}
                                dir="rtl"
                            />
                            <input
                                className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.footerTitleEn || ""}
                                onChange={(e) => updateDraft({ footerTitleEn: e.target.value })}
                                dir="ltr"
                            />
                        </span>
                    ) : (
                        isRtl ? view.footerTitleAr : view.footerTitleEn
                    )}
                </h3>
                <p className="text-white/90 max-w-3xl mx-auto leading-relaxed">
                    {isEditing ? (
                        <span className="inline-grid w-full gap-2">
                            <textarea
                                className="min-h-[90px] rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.footerTextAr || ""}
                                onChange={(e) => updateDraft({ footerTextAr: e.target.value })}
                                dir="rtl"
                            />
                            <textarea
                                className="min-h-[90px] rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.footerTextEn || ""}
                                onChange={(e) => updateDraft({ footerTextEn: e.target.value })}
                                dir="ltr"
                            />
                        </span>
                    ) : (
                        isRtl ? view.footerTextAr : view.footerTextEn
                    )}
                </p>
            </motion.div>
        </div>
    );
}