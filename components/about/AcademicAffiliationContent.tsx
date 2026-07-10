"use client"

import { motion } from "framer-motion"
import { Award, CheckCircle2, ExternalLink, ImageUp, Link2, Loader2, MapPin, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

type Partner = {
    id: string;
    nameAr: string;
    nameEn: string;
    countryAr: string;
    countryEn: string;
    image: string;
    link?: string;
    order: number;
};

type AcademicAffiliationData = {
    sectionTitleAr: string;
    sectionTitleEn: string;
    introAr: string;
    introEn: string;
    highlightedAr: string;
    highlightedEn: string;
    qualityTitleAr: string;
    qualityTitleEn: string;
    qualityTextAr: string;
    qualityTextEn: string;
    partnersTitleAr: string;
    partnersTitleEn: string;
    cardFeaturesAr: string[];
    cardFeaturesEn: string[];
    badgeTitleAr: string;
    badgeTitleEn: string;
    badgeTextAr: string;
    badgeTextEn: string;
    partners: Partner[];
};

export default function AcademicAffiliationContent() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingPartnerId, setUploadingPartnerId] = useState<string | null>(null);
    const [data, setData] = useState<AcademicAffiliationData | null>(null);
    const [draft, setDraft] = useState<AcademicAffiliationData | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/academic-affiliation", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok: boolean; data?: AcademicAffiliationData };
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };

                if (json.ok && json.data) {
                    setData({
                        ...json.data,
                        partners: [...json.data.partners].sort((a, b) => a.order - b.order),
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

    const partnerColors = useMemo(
        () => [
            "from-[#254151] to-[#2d4a5c]",
            "from-[#6096b4] to-[#7aa5be]",
            "from-[#c2a772] to-[#d4b883]",
        ],
        [],
    );

    const startEdit = () => {
        if (!data) return;
        setDraft({
            ...data,
            cardFeaturesAr: [...data.cardFeaturesAr],
            cardFeaturesEn: [...data.cardFeaturesEn],
            partners: data.partners.map((p) => ({ ...p })),
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };

    const updateDraft = (patch: Partial<AcademicAffiliationData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const updatePartner = (id: string, patch: Partial<Partner>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                partners: prev.partners.map((p) => (p.id === id ? { ...p, ...patch } : p)),
            };
        });
    };

    const addPartner = () => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                partners: [
                    ...prev.partners,
                    {
                        id: `partner-${Date.now()}`,
                        nameAr: "جامعة جديدة",
                        nameEn: "New University",
                        countryAr: "الدولة",
                        countryEn: "Country",
                        image: "",
                        link: "",
                        order: prev.partners.length,
                    },
                ],
            };
        });
    };

    const removePartner = (id: string) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                partners: prev.partners
                    .filter((p) => p.id !== id)
                    .map((p, idx) => ({ ...p, order: idx })),
            };
        });
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const payload: AcademicAffiliationData = {
                ...draft,
                sectionTitleAr: draft.sectionTitleAr.trim(),
                sectionTitleEn: draft.sectionTitleEn.trim(),
                introAr: draft.introAr.trim(),
                introEn: draft.introEn.trim(),
                highlightedAr: draft.highlightedAr.trim(),
                highlightedEn: draft.highlightedEn.trim(),
                qualityTitleAr: draft.qualityTitleAr.trim(),
                qualityTitleEn: draft.qualityTitleEn.trim(),
                qualityTextAr: draft.qualityTextAr.trim(),
                qualityTextEn: draft.qualityTextEn.trim(),
                partnersTitleAr: draft.partnersTitleAr.trim(),
                partnersTitleEn: draft.partnersTitleEn.trim(),
                badgeTitleAr: draft.badgeTitleAr.trim(),
                badgeTitleEn: draft.badgeTitleEn.trim(),
                badgeTextAr: draft.badgeTextAr.trim(),
                badgeTextEn: draft.badgeTextEn.trim(),
                cardFeaturesAr: draft.cardFeaturesAr.map((x) => x.trim()).filter(Boolean),
                cardFeaturesEn: draft.cardFeaturesEn.map((x) => x.trim()).filter(Boolean),
                partners: draft.partners.map((p, index) => ({
                    ...p,
                    nameAr: p.nameAr.trim(),
                    nameEn: p.nameEn.trim(),
                    countryAr: p.countryAr.trim(),
                    countryEn: p.countryEn.trim(),
                    image: p.image.trim(),
                    link: p.link?.trim() || "",
                    order: index,
                })),
            };
            const res = await fetch("/api/academic-affiliation", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json()) as { ok: boolean; data?: AcademicAffiliationData };
            if (res.ok && json.ok && json.data) {
                setData({
                    ...json.data,
                    partners: [...json.data.partners].sort((a, b) => a.order - b.order),
                });
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    const uploadPartnerImage = async (partnerId: string, file: File) => {
        setUploadingPartnerId(partnerId);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/uploads", {
                method: "POST",
                credentials: "include",
                body: fd,
            });
            const json = (await res.json()) as {
                ok: boolean;
                relativePath?: string;
            };
            if (res.ok && json.ok && json.relativePath) {
                updatePartner(partnerId, { image: json.relativePath.trim() });
            }
        } finally {
            setUploadingPartnerId(null);
        }
    };

    if (!view) return <div className="text-[#254151] font-bold">Loading...</div>;

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Link2 className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        {isAr ? view.sectionTitleAr : view.sectionTitleEn}
                    </h2>
                </div>
                {isAdmin && (
                    !isEditing ? (
                        <button type="button" onClick={startEdit} className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                            <Pencil className="size-4" />
                            {isAr ? "تعديل القسم" : "Edit Section"}
                        </button>
                    ) : (
                        <div className="ms-auto flex items-center gap-2">
                            <button type="button" onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60">
                                <Save className="size-4" />
                                {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ" : "Save")}
                            </button>
                            <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                                <X className="size-4" />
                                {isAr ? "إلغاء" : "Cancel"}
                            </button>
                        </div>
                    )
                )}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-blue-50 via-white to-amber-50/30 p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5">
                    {isEditing ? (
                        <div className="grid gap-2">
                            <textarea className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.introAr || ""} onChange={(e) => updateDraft({ introAr: e.target.value })} dir="rtl" />
                            <textarea className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.introEn || ""} onChange={(e) => updateDraft({ introEn: e.target.value })} dir="ltr" />
                            <textarea className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.highlightedAr || ""} onChange={(e) => updateDraft({ highlightedAr: e.target.value })} dir="rtl" />
                            <textarea className="min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.highlightedEn || ""} onChange={(e) => updateDraft({ highlightedEn: e.target.value })} dir="ltr" />
                        </div>
                    ) : (
                        <>
                            <p>{isAr ? view.introAr : view.introEn}</p>
                            <p>{isAr ? view.highlightedAr : view.highlightedEn}</p>
                        </>
                    )}
                    <div className="bg-gradient-to-r from-[#6096b4]/10 to-[#c2a772]/10 p-6 rounded-xl border-r-4 border-[#254151]">
                        <p className="font-bold text-[#254151] mb-2">{isAr ? view.qualityTitleAr : view.qualityTitleEn}</p>
                        <p className="text-gray-700">
                            {isEditing ? (
                                <span className="inline-grid w-full gap-2">
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qualityTextAr || ""} onChange={(e) => updateDraft({ qualityTextAr: e.target.value })} dir="rtl" />
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qualityTextEn || ""} onChange={(e) => updateDraft({ qualityTextEn: e.target.value })} dir="ltr" />
                                </span>
                            ) : (
                                isAr ? view.qualityTextAr : view.qualityTextEn
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">{isAr ? view.partnersTitleAr : view.partnersTitleEn}</h3>
                    <div className="h-1 w-16 bg-gradient-to-l from-[#6096b4] to-[#c2a772] rounded-full"></div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {view.partners.map((university, idx) => {
                    const hasLink = !isEditing && university.link?.trim();
                    const CardContent = (
                        <div className={`relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${hasLink ? 'cursor-pointer' : ''}`}>
                            {isEditing && (
                                <button type="button" onClick={() => removePartner(university.id)} className="absolute z-30 m-3 inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                                    <Trash2 className="size-3.5" />
                                    {isAr ? "حذف" : "Delete"}
                                </button>
                            )}
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                <Image fill src={university.image || "/assets/landing/partners/partner-1.webp"} alt={isAr ? university.nameAr : university.nameEn} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 z-20">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${partnerColors[idx % partnerColors.length]} rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm bg-opacity-90`}>
                                        <Link2 className="size-7 text-white" />
                                    </div>
                                </div>
                                {hasLink && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <ExternalLink className="size-5 text-[#254151]" />
                                        </div>
                                    </div>
                                )}
                                {isEditing && (
                                    <label className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/45 opacity-0 transition-opacity hover:opacity-100">
                                        {uploadingPartnerId === university.id ? (
                                            <Loader2 className="size-7 animate-spin text-white" />
                                        ) : (
                                            <div className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-[#254151]">
                                                <ImageUp className="size-4" />
                                                {isAr ? "رفع الصورة" : "Upload image"}
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp,image/gif"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) void uploadPartnerImage(university.id, file);
                                                e.currentTarget.value = "";
                                            }}
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="text-center space-y-3">
                                    {isEditing ? (
                                        <div className="grid gap-2">
                                            <input className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={university.nameAr} onChange={(e) => updatePartner(university.id, { nameAr: e.target.value })} dir="rtl" placeholder="اسم الجامعة بالعربي" />
                                            <input className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={university.nameEn} onChange={(e) => updatePartner(university.id, { nameEn: e.target.value })} dir="ltr" placeholder="University name in English" />
                                            <input className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={university.countryAr} onChange={(e) => updatePartner(university.id, { countryAr: e.target.value })} dir="rtl" placeholder="الدولة بالعربي" />
                                            <input className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={university.countryEn} onChange={(e) => updatePartner(university.id, { countryEn: e.target.value })} dir="ltr" placeholder="Country in English" />
                                            <input className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={university.link || ""} onChange={(e) => updatePartner(university.id, { link: e.target.value })} dir="ltr" placeholder={isAr ? "رابط الجامعة (URL)" : "University Link (URL)"} />
                                        </div>
                                    ) : (
                                        <h4 className="text-xl font-bold text-[#254151] leading-tight min-h-[56px] flex items-center justify-center">{isAr ? university.nameAr : university.nameEn}</h4>
                                    )}
                                    <div className={`inline-block px-5 py-2 bg-gradient-to-r ${partnerColors[idx % partnerColors.length]} rounded-full`}>
                                        <div className="flex items-center gap-2 text-white">
                                            <MapPin className="size-4" />
                                            <p className="text-sm font-medium">{isAr ? university.countryAr : university.countryEn}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 space-y-2">
                                    {(isAr ? view.cardFeaturesAr : view.cardFeaturesEn).map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-gray-600 text-sm">
                                            <CheckCircle2 className="size-4 text-[#6096b4]" />
                                            <p>{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                    return (
                        <motion.div key={university.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.15 }} className="group">
                            {hasLink && university.link ? (
                                <Link href={university.link.trim()} target="_blank" rel="noopener noreferrer" className="block">
                                    {CardContent}
                                </Link>
                            ) : (
                                CardContent
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {isEditing && (
                <>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={addPartner} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                            <Plus className="size-4" />
                            {isAr ? "إضافة جامعة شريكة" : "Add Partner University"}
                        </button>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
                        <p className="text-sm font-semibold text-[#254151]">{isAr ? "نصوص مزايا بطاقة الجامعة" : "University card feature texts"}</p>
                        <div className="grid gap-2">
                            {(draft?.cardFeaturesAr || []).map((feature, idx) => (
                                <input key={`ar-${idx}`} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={feature} onChange={(e) => updateDraft({ cardFeaturesAr: (draft?.cardFeaturesAr || []).map((x, i) => (i === idx ? e.target.value : x)) })} dir="rtl" />
                            ))}
                            {(draft?.cardFeaturesEn || []).map((feature, idx) => (
                                <input key={`en-${idx}`} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={feature} onChange={(e) => updateDraft({ cardFeaturesEn: (draft?.cardFeaturesEn || []).map((x, i) => (i === idx ? e.target.value : x)) })} dir="ltr" />
                            ))}
                        </div>
                    </div>
                </>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-r from-[#254151] via-[#2d4a5c] to-[#6096b4] p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-right">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                        <Award className="size-12 text-white" />
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="grid gap-2">
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.badgeTitleAr || ""} onChange={(e) => updateDraft({ badgeTitleAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.badgeTitleEn || ""} onChange={(e) => updateDraft({ badgeTitleEn: e.target.value })} dir="ltr" />
                                <textarea className="min-h-[90px] rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.badgeTextAr || ""} onChange={(e) => updateDraft({ badgeTextAr: e.target.value })} dir="rtl" />
                                <textarea className="min-h-[90px] rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.badgeTextEn || ""} onChange={(e) => updateDraft({ badgeTextEn: e.target.value })} dir="ltr" />
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-2">{isAr ? view.badgeTitleAr : view.badgeTitleEn}</h3>
                                <p className="text-white/90 leading-relaxed">{isAr ? view.badgeTextAr : view.badgeTextEn}</p>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
