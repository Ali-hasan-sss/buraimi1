"use client";
import { Heart, Info, Loader2, MapPin, Pencil, Save, Shield, Upload, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type LegendItem = { id: string; icon: string; labelAr: string; labelEn: string; color: string; order: number };
type SafetyItem = { id: string; textAr: string; textEn: string; order: number };
type ContactCard = { id: string; titleAr: string; titleEn: string; textAr: string; textEn: string; color: string; iconKey: string; order: number };
type CampusMapData = {
    sectionTitleAr: string; sectionTitleEn: string; sectionSubtitleAr: string; sectionSubtitleEn: string;
    introAr: string; introEn: string;
    mapImage: string; mapAltAr: string; mapAltEn: string;
    legendTitleAr: string; legendTitleEn: string; legendItems: LegendItem[];
    safetyTitleAr: string; safetyTitleEn: string; safetyItems: SafetyItem[];
    contacts: ContactCard[];
};

function ContactIcon({ iconKey }: { iconKey: string }) {
    if (iconKey === "heart") return <Heart className="size-7 text-white" />;
    if (iconKey === "info") return <Info className="size-7 text-white" />;
    return <Shield className="size-7 text-white" />;
}

export default function CampusMapContent() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState<CampusMapData | null>(null);
    const [draft, setDraft] = useState<CampusMapData | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/campus-map", { cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok?: boolean; data?: CampusMapData };
                const meJson = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
                if (json.ok && json.data) setData(json.data);
                setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        })();
    }, []);

    const view = isEditing ? draft : data;
    const updateDraft = (patch: Partial<CampusMapData>) => setDraft((prev) => (prev ? { ...prev, ...patch } : prev));

    const startEdit = () => {
        if (!data) return;
        setDraft(JSON.parse(JSON.stringify(data)) as CampusMapData);
        setIsEditing(true);
    };
    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };
    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const res = await fetch("/api/campus-map", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            const json = (await res.json()) as { ok?: boolean; data?: CampusMapData };
            if (res.ok && json.ok && json.data) {
                setData(json.data);
                setIsEditing(false);
                setDraft(null);
            }
        } finally {
            setSaving(false);
        }
    };
    const uploadMap = async (file: File) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/uploads", { method: "POST", body: formData });
            if (!res.ok) return;
            const json = (await res.json()) as { relativePath?: string; path?: string; filePath?: string; url?: string };
            const uploadedPath = json.relativePath || json.path || json.filePath || json.url || "";
            if (!uploadedPath) return;
            updateDraft({ mapImage: uploadedPath });
        } finally {
            setUploading(false);
        }
    };

    if (!view) {
        return <div className="py-16 flex items-center justify-center text-[#254151]"><Loader2 className="size-6 animate-spin" /></div>;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <MapPin className="size-8 text-white" />
                </div>
                <div>
                    {isEditing ? (
                        <div className="grid gap-2 w-full min-w-[320px] md:min-w-[560px]">
                            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.sectionTitleAr || ""} onChange={(e) => updateDraft({ sectionTitleAr: e.target.value })} dir="rtl" />
                            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.sectionTitleEn || ""} onChange={(e) => updateDraft({ sectionTitleEn: e.target.value })} dir="ltr" />
                            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.sectionSubtitleAr || ""} onChange={(e) => updateDraft({ sectionSubtitleAr: e.target.value })} dir="rtl" />
                            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.sectionSubtitleEn || ""} onChange={(e) => updateDraft({ sectionSubtitleEn: e.target.value })} dir="ltr" />
                        </div>
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                                {isAr ? view.sectionTitleAr : view.sectionTitleEn}
                            </h2>
                            <p className="text-gray-600 mt-1">{isAr ? view.sectionSubtitleAr : view.sectionSubtitleEn}</p>
                        </>
                    )}
                </div>
                </div>
                {isAdmin && (!isEditing ? (
                    <button onClick={startEdit} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                        <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700">
                            <X className="size-4" />{isAr ? "إلغاء" : "Cancel"}
                        </button>
                        <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100"
            >
                {isEditing ? (
                    <div className="grid gap-2">
                        <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introAr || ""} onChange={(e) => updateDraft({ introAr: e.target.value })} dir="rtl" />
                        <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introEn || ""} onChange={(e) => updateDraft({ introEn: e.target.value })} dir="ltr" />
                    </div>
                ) : (
                    <p className="text-gray-700 text-center leading-relaxed">{isAr ? view.introAr : view.introEn}</p>
                )}
            </motion.div>

            {/* Campus Map Image */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            >
                {isEditing && (
                    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-3 py-2 text-sm font-semibold text-white cursor-pointer">
                            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                            {isAr ? "رفع صورة الخارطة" : "Upload map image"}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) void uploadMap(file);
                                    e.currentTarget.value = "";
                                }}
                            />
                        </label>
                        <input className="flex-1 min-w-[250px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.mapAltAr || ""} onChange={(e) => updateDraft({ mapAltAr: e.target.value })} dir="rtl" />
                        <input className="flex-1 min-w-[250px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.mapAltEn || ""} onChange={(e) => updateDraft({ mapAltEn: e.target.value })} dir="ltr" />
                    </div>
                )}
                <div className="relative w-full h-[520px]">
                    <Image
                        fill
                        src={resolveUploadImageSrc(view.mapImage)}
                        alt={isAr ? view.mapAltAr : view.mapAltEn}
                        sizes="100vw"
                        className="object-contain"
                        unoptimized
                    />
                </div>
            </motion.div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Info className="size-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{isAr ? view.legendTitleAr : view.legendTitleEn}</h3>
                        <span className="text-blue-100 text-sm mr-auto">{isAr ? view.legendTitleEn : view.legendTitleAr}</span>
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {view.legendItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:shadow-md transition-all group"
                            >
                                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                {isEditing ? (
                                    <div className="flex-1 grid gap-1">
                                        <input
                                            className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs"
                                            value={item.icon}
                                            onChange={(e) =>
                                                updateDraft({
                                                    legendItems: draft!.legendItems.map((x) =>
                                                        x.id === item.id ? { ...x, icon: e.target.value } : x,
                                                    ),
                                                })
                                            }
                                            placeholder={isAr ? "إيموجي المفتاح (مثال: 🚰)" : "Legend emoji (e.g. 🚰)"}
                                            dir="ltr"
                                        />
                                        <input className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs" value={item.labelAr} onChange={(e) => updateDraft({ legendItems: draft!.legendItems.map((x) => x.id === item.id ? { ...x, labelAr: e.target.value } : x) })} dir="rtl" />
                                        <input className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs" value={item.labelEn} onChange={(e) => updateDraft({ legendItems: draft!.legendItems.map((x) => x.id === item.id ? { ...x, labelEn: e.target.value } : x) })} dir="ltr" />
                                    </div>
                                ) : <span className="text-gray-700 font-semibold text-sm">{isAr ? item.labelAr : item.labelEn}</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Safety Notice */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200"
            >
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <Shield className="size-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-bold text-orange-900 mb-2">{isAr ? view.safetyTitleAr : view.safetyTitleEn}</h4>
                        <ul className="space-y-2 text-gray-700">
                            {view.safetyItems.map((item) => (
                                <li key={item.id} className="flex items-start gap-2">
                                    <span className="text-orange-600 mt-1">•</span>
                                    {isEditing ? (
                                        <div className="flex-1 grid gap-1">
                                            <input className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs" value={item.textAr} onChange={(e) => updateDraft({ safetyItems: draft!.safetyItems.map((x) => x.id === item.id ? { ...x, textAr: e.target.value } : x) })} dir="rtl" />
                                            <input className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs" value={item.textEn} onChange={(e) => updateDraft({ safetyItems: draft!.safetyItems.map((x) => x.id === item.id ? { ...x, textEn: e.target.value } : x) })} dir="ltr" />
                                        </div>
                                    ) : <span>{isAr ? item.textAr : item.textEn}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {view.contacts.map((card) => (
                <div key={card.id} className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl text-center`}>
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ContactIcon iconKey={card.iconKey} />
                    </div>
                    {isEditing ? (
                        <div className="grid gap-1">
                            <input className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-xs text-white" value={card.titleAr} onChange={(e) => updateDraft({ contacts: draft!.contacts.map((x) => x.id === card.id ? { ...x, titleAr: e.target.value } : x) })} dir="rtl" />
                            <input className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-xs text-white" value={card.titleEn} onChange={(e) => updateDraft({ contacts: draft!.contacts.map((x) => x.id === card.id ? { ...x, titleEn: e.target.value } : x) })} dir="ltr" />
                            <input className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-xs text-white" value={card.textAr} onChange={(e) => updateDraft({ contacts: draft!.contacts.map((x) => x.id === card.id ? { ...x, textAr: e.target.value } : x) })} dir="rtl" />
                            <input className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-xs text-white" value={card.textEn} onChange={(e) => updateDraft({ contacts: draft!.contacts.map((x) => x.id === card.id ? { ...x, textEn: e.target.value } : x) })} dir="ltr" />
                        </div>
                    ) : (
                        <>
                            <h5 className="text-white font-bold mb-2">{isAr ? card.titleAr : card.titleEn}</h5>
                            <p className="text-blue-100 text-sm">{isAr ? card.textAr : card.textEn}</p>
                        </>
                    )}
                </div>
                ))}
            </motion.div>
        </div>
    );
}