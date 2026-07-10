"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Eye, GraduationCap, Heart, Loader2, Pencil, Plus, Save, Shield, Target, Trash2, Users, UsersRound, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type Objective = { id: string; textAr: string; textEn: string; order: number };
type HealthSafetyData = {
    sectionTitleAr: string; sectionTitleEn: string; sectionSubtitleAr: string; sectionSubtitleEn: string;
    introTitleAr: string; introTitleEn: string; introParagraph1Ar: string; introParagraph1En: string; introParagraph2Ar: string; introParagraph2En: string;
    objectivesTitleAr: string; objectivesTitleEn: string; objectives: Objective[];
    responsibilitiesTitleAr: string; responsibilitiesTitleEn: string;
    committeeTitleAr: string; committeeTitleEn: string; committeeTextAr: string; committeeTextEn: string;
    supervisorsTitleAr: string; supervisorsTitleEn: string; supervisorsText1Ar: string; supervisorsText1En: string; supervisorsText2Ar: string; supervisorsText2En: string;
    staffStudentsTitleAr: string; staffStudentsTitleEn: string; staffStudentsTextAr: string; staffStudentsTextEn: string;
    badge1Ar: string; badge1En: string; badge2Ar: string; badge2En: string; badge3Ar: string; badge3En: string; badge4Ar: string; badge4En: string;
};

export default function SafetySecurityContent() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<HealthSafetyData | null>(null);
    const [draft, setDraft] = useState<HealthSafetyData | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/health-safety", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok?: boolean; data?: HealthSafetyData };
                const me = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
                if (json.ok && json.data) {
                    setData({ ...json.data, objectives: [...json.data.objectives].sort((a, b) => a.order - b.order) });
                }
                setIsAdmin(Boolean(me.ok && me.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        })();
    }, []);

    const view = isEditing ? draft : data;

    const updateDraft = (patch: Partial<HealthSafetyData>) =>
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    const startEdit = () => {
        if (!data) return;
        setDraft({ ...data, objectives: data.objectives.map((x) => ({ ...x })) });
        setIsEditing(true);
    };
    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };
    const updateObjective = (id: string, patch: Partial<Objective>) => {
        setDraft((prev) => prev ? ({ ...prev, objectives: prev.objectives.map((x) => x.id === id ? { ...x, ...patch } : x) }) : prev);
    };
    const addObjective = () => {
        setDraft((prev) => prev ? ({
            ...prev,
            objectives: [...prev.objectives, { id: `obj-${Date.now()}`, textAr: "", textEn: "", order: prev.objectives.length }],
        }) : prev);
    };
    const removeObjective = (id: string) => {
        setDraft((prev) => prev ? ({
            ...prev,
            objectives: prev.objectives.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })),
        }) : prev);
    };
    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const res = await fetch("/api/health-safety", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            const json = (await res.json()) as { ok?: boolean; data?: HealthSafetyData };
            if (res.ok && json.ok && json.data) {
                setData({ ...json.data, objectives: [...json.data.objectives].sort((a, b) => a.order - b.order) });
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!view) {
        return <div className="py-16 flex items-center justify-center text-[#254151]"><Loader2 className="size-6 animate-spin" /></div>;
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Shield className="size-8 text-white" />
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
                {isAdmin && (!isEditing ? (
                    <button type="button" onClick={startEdit} className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                        <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                    </button>
                ) : (
                    <div className="ms-auto flex items-center gap-2">
                        <button type="button" onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}
                        </button>
                        <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white">
                            <X className="size-4" />{isAr ? "إلغاء" : "Cancel"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-2xl border border-blue-100"
            >
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-xl flex items-center justify-center">
                        <Heart className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="grid gap-2">
                                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introTitleAr || ""} onChange={(e) => updateDraft({ introTitleAr: e.target.value })} dir="rtl" />
                                <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introTitleEn || ""} onChange={(e) => updateDraft({ introTitleEn: e.target.value })} dir="ltr" />
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introParagraph1Ar || ""} onChange={(e) => updateDraft({ introParagraph1Ar: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introParagraph1En || ""} onChange={(e) => updateDraft({ introParagraph1En: e.target.value })} dir="ltr" />
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introParagraph2Ar || ""} onChange={(e) => updateDraft({ introParagraph2Ar: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.introParagraph2En || ""} onChange={(e) => updateDraft({ introParagraph2En: e.target.value })} dir="ltr" />
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-[#254151] mb-4">{isAr ? view.introTitleAr : view.introTitleEn}</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">{isAr ? view.introParagraph1Ar : view.introParagraph1En}</p>
                                <p className="text-gray-700 leading-relaxed mb-4">{isAr ? view.introParagraph2Ar : view.introParagraph2En}</p>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Objectives */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Target className="size-6 text-white" />
                        </div>
                        {isEditing ? (
                            <div className="grid md:grid-cols-2 gap-2 w-full">
                                <input className="rounded-md border border-white/50 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.objectivesTitleAr || ""} onChange={(e) => updateDraft({ objectivesTitleAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/50 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.objectivesTitleEn || ""} onChange={(e) => updateDraft({ objectivesTitleEn: e.target.value })} dir="ltr" />
                            </div>
                        ) : (
                            <h3 className="text-2xl font-bold text-white">{isAr ? view.objectivesTitleAr : view.objectivesTitleEn}</h3>
                        )}
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid gap-4">
                        {view.objectives.map((objective, index) => (
                            <motion.div
                                key={objective.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                                className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                            >
                                <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-[#c2a772] to-[#b39662] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                {isEditing ? (
                                    <div className="flex-1 grid gap-2">
                                        <div className="flex justify-end">
                                            <button type="button" onClick={() => removeObjective(objective.id)} className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                                                <Trash2 className="size-3.5" />{isAr ? "حذف" : "Delete"}
                                            </button>
                                        </div>
                                        <textarea className="w-full min-h-[70px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={objective.textAr} onChange={(e) => updateObjective(objective.id, { textAr: e.target.value })} dir="rtl" />
                                        <textarea className="w-full min-h-[70px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={objective.textEn} onChange={(e) => updateObjective(objective.id, { textEn: e.target.value })} dir="ltr" />
                                    </div>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed flex-1 pt-1">{isAr ? objective.textAr : objective.textEn}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                    {isEditing && (
                        <button type="button" onClick={addObjective} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                            <Plus className="size-4" />{isAr ? "إضافة هدف" : "Add Objective"}
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-3 pb-4 border-b-2 border-[#6096b4]">
                    <UsersRound className="size-7 text-[#254151]" />
                    <h3 className="text-3xl font-bold text-[#254151]">{isAr ? view.responsibilitiesTitleAr : view.responsibilitiesTitleEn}</h3>
                </div>

                {/* Committee Responsibilities */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#6096b4] to-[#5085a3] p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <Users className="size-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">{isAr ? view.committeeTitleAr : view.committeeTitleEn}</h4>
                        </div>
                    </div>
                    <div className="p-8">
                        {isEditing ? (
                            <div className="grid gap-2">
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.committeeTextAr || ""} onChange={(e) => updateDraft({ committeeTextAr: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.committeeTextEn || ""} onChange={(e) => updateDraft({ committeeTextEn: e.target.value })} dir="ltr" />
                            </div>
                        ) : <p className="text-gray-700 leading-relaxed">{isAr ? view.committeeTextAr : view.committeeTextEn}</p>}
                    </div>
                </div>

                {/* Supervisors Responsibilities */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#c2a772] to-[#b39662] p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <Eye className="size-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">{isAr ? view.supervisorsTitleAr : view.supervisorsTitleEn}</h4>
                        </div>
                    </div>
                    <div className="p-8">
                        {isEditing ? (
                            <div className="grid gap-2">
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.supervisorsText1Ar || ""} onChange={(e) => updateDraft({ supervisorsText1Ar: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.supervisorsText1En || ""} onChange={(e) => updateDraft({ supervisorsText1En: e.target.value })} dir="ltr" />
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.supervisorsText2Ar || ""} onChange={(e) => updateDraft({ supervisorsText2Ar: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.supervisorsText2En || ""} onChange={(e) => updateDraft({ supervisorsText2En: e.target.value })} dir="ltr" />
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-700 leading-relaxed mb-4">{isAr ? view.supervisorsText1Ar : view.supervisorsText1En}</p>
                                <p className="text-gray-700 leading-relaxed">{isAr ? view.supervisorsText2Ar : view.supervisorsText2En}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Staff & Students Responsibilities */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#254151] to-[#2d4a5c] p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <GraduationCap className="size-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">{isAr ? view.staffStudentsTitleAr : view.staffStudentsTitleEn}</h4>
                        </div>
                    </div>
                    <div className="p-8">
                        {isEditing ? (
                            <div className="grid gap-2">
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.staffStudentsTextAr || ""} onChange={(e) => updateDraft({ staffStudentsTextAr: e.target.value })} dir="rtl" />
                                <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2 text-sm" value={draft?.staffStudentsTextEn || ""} onChange={(e) => updateDraft({ staffStudentsTextEn: e.target.value })} dir="ltr" />
                            </div>
                        ) : <p className="text-gray-700 leading-relaxed">{isAr ? view.staffStudentsTextAr : view.staffStudentsTextEn}</p>}
                    </div>
                </div>
            </motion.div>

            {/* Safety Icons Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                <div className="bg-gradient-to-br from-[#254151] to-[#2d4a5c] p-6 rounded-2xl text-center group hover:scale-105 transition-transform">
                    <Shield className="size-12 text-white mx-auto mb-3" />
                    {isEditing ? (
                        <div className="grid gap-2">
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge1Ar || ""} onChange={(e) => updateDraft({ badge1Ar: e.target.value })} dir="rtl" />
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge1En || ""} onChange={(e) => updateDraft({ badge1En: e.target.value })} dir="ltr" />
                        </div>
                    ) : <div className="text-white font-bold">{isAr ? view.badge1Ar : view.badge1En}</div>}
                </div>
                <div className="bg-gradient-to-br from-[#6096b4] to-[#5085a3] p-6 rounded-2xl text-center group hover:scale-105 transition-transform">
                    <Heart className="size-12 text-white mx-auto mb-3" />
                    {isEditing ? (
                        <div className="grid gap-2">
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge2Ar || ""} onChange={(e) => updateDraft({ badge2Ar: e.target.value })} dir="rtl" />
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge2En || ""} onChange={(e) => updateDraft({ badge2En: e.target.value })} dir="ltr" />
                        </div>
                    ) : <div className="text-white font-bold">{isAr ? view.badge2Ar : view.badge2En}</div>}
                </div>
                <div className="bg-gradient-to-br from-[#c2a772] to-[#b39662] p-6 rounded-2xl text-center group hover:scale-105 transition-transform">
                    <CheckCircle2 className="size-12 text-white mx-auto mb-3" />
                    {isEditing ? (
                        <div className="grid gap-2">
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge3Ar || ""} onChange={(e) => updateDraft({ badge3Ar: e.target.value })} dir="rtl" />
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge3En || ""} onChange={(e) => updateDraft({ badge3En: e.target.value })} dir="ltr" />
                        </div>
                    ) : <div className="text-white font-bold">{isAr ? view.badge3Ar : view.badge3En}</div>}
                </div>
                <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] p-6 rounded-2xl text-center group hover:scale-105 transition-transform">
                    <Users className="size-12 text-white mx-auto mb-3" />
                    {isEditing ? (
                        <div className="grid gap-2">
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge4Ar || ""} onChange={(e) => updateDraft({ badge4Ar: e.target.value })} dir="rtl" />
                            <input className="rounded-md border border-white/50 bg-white/10 px-2 py-1 text-xs text-white" value={draft?.badge4En || ""} onChange={(e) => updateDraft({ badge4En: e.target.value })} dir="ltr" />
                        </div>
                    ) : <div className="text-white font-bold">{isAr ? view.badge4Ar : view.badge4En}</div>}
                </div>
            </motion.div>
        </div>
    );
}
