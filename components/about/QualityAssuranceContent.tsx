"use client"
import { Award, CheckCircle2, Eye, Mail, Pencil, Plus, Save, Settings, Sparkles, Target, Trash2, UserCheck, X } from "lucide-react";

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type QualityObjective = {
    id: string;
    textAr: string;
    textEn: string;
    order: number;
};

type QualityAssuranceData = {
    sectionTitleAr: string;
    sectionTitleEn: string;
    visionTitleAr: string;
    visionTitleEn: string;
    visionTextAr: string;
    visionTextEn: string;
    missionTitleAr: string;
    missionTitleEn: string;
    missionTextAr: string;
    missionTextEn: string;
    objectivesTitleAr: string;
    objectivesTitleEn: string;
    objectives: QualityObjective[];
    qmsTitleAr: string;
    qmsTitleEn: string;
    qmsParagraph1Ar: string;
    qmsParagraph1En: string;
    qmsParagraph2Ar: string;
    qmsParagraph2En: string;
    qmsGoalTitleAr: string;
    qmsGoalTitleEn: string;
    qmsGoalTextAr: string;
    qmsGoalTextEn: string;
    directorNameAr: string;
    directorNameEn: string;
    directorRoleAr: string;
    directorRoleEn: string;
    directorEmail: string;
};

export default function QualityAssuranceContent() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<QualityAssuranceData | null>(null);
    const [draft, setDraft] = useState<QualityAssuranceData | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/quality-assurance", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok: boolean; data?: QualityAssuranceData };
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };
                if (json.ok && json.data) {
                    setData({
                        ...json.data,
                        objectives: [...json.data.objectives].sort((a, b) => a.order - b.order),
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
            objectives: data.objectives.map((x) => ({ ...x })),
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };

    const updateDraft = (patch: Partial<QualityAssuranceData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const updateObjective = (id: string, patch: Partial<QualityObjective>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                objectives: prev.objectives.map((x) => (x.id === id ? { ...x, ...patch } : x)),
            };
        });
    };

    const addObjective = () => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                objectives: [
                    ...prev.objectives,
                    {
                        id: `obj-${Date.now()}`,
                        textAr: "هدف جديد",
                        textEn: "New objective",
                        order: prev.objectives.length,
                    },
                ],
            };
        });
    };

    const removeObjective = (id: string) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                objectives: prev.objectives
                    .filter((x) => x.id !== id)
                    .map((x, idx) => ({ ...x, order: idx })),
            };
        });
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const payload: QualityAssuranceData = {
                ...draft,
                sectionTitleAr: draft.sectionTitleAr.trim(),
                sectionTitleEn: draft.sectionTitleEn.trim(),
                visionTitleAr: draft.visionTitleAr.trim(),
                visionTitleEn: draft.visionTitleEn.trim(),
                visionTextAr: draft.visionTextAr.trim(),
                visionTextEn: draft.visionTextEn.trim(),
                missionTitleAr: draft.missionTitleAr.trim(),
                missionTitleEn: draft.missionTitleEn.trim(),
                missionTextAr: draft.missionTextAr.trim(),
                missionTextEn: draft.missionTextEn.trim(),
                objectivesTitleAr: draft.objectivesTitleAr.trim(),
                objectivesTitleEn: draft.objectivesTitleEn.trim(),
                qmsTitleAr: draft.qmsTitleAr.trim(),
                qmsTitleEn: draft.qmsTitleEn.trim(),
                qmsParagraph1Ar: draft.qmsParagraph1Ar.trim(),
                qmsParagraph1En: draft.qmsParagraph1En.trim(),
                qmsParagraph2Ar: draft.qmsParagraph2Ar.trim(),
                qmsParagraph2En: draft.qmsParagraph2En.trim(),
                qmsGoalTitleAr: draft.qmsGoalTitleAr.trim(),
                qmsGoalTitleEn: draft.qmsGoalTitleEn.trim(),
                qmsGoalTextAr: draft.qmsGoalTextAr.trim(),
                qmsGoalTextEn: draft.qmsGoalTextEn.trim(),
                directorNameAr: draft.directorNameAr.trim(),
                directorNameEn: draft.directorNameEn.trim(),
                directorRoleAr: draft.directorRoleAr.trim(),
                directorRoleEn: draft.directorRoleEn.trim(),
                directorEmail: draft.directorEmail.trim(),
                objectives: draft.objectives.map((x, idx) => ({
                    ...x,
                    textAr: x.textAr.trim(),
                    textEn: x.textEn.trim(),
                    order: idx,
                })),
            };
            const res = await fetch("/api/quality-assurance", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json()) as { ok: boolean; data?: QualityAssuranceData };
            if (res.ok && json.ok && json.data) {
                setData({
                    ...json.data,
                    objectives: [...json.data.objectives].sort((a, b) => a.order - b.order),
                });
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!view) return <div className="text-[#254151] font-bold">Loading...</div>;

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Award className="size-8 text-white" />
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

            {/* Vision and Mission Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Vision */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group"
                >
                    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                        <div className="flex items-start gap-5">
                            <div className="relative shrink-0">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                    <Eye className="size-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-bold text-[#254151]">{isAr ? view.visionTitleAr : view.visionTitleEn}</h3>
                                {isEditing ? (
                                    <div className="grid gap-2">
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.visionTextAr || ""} onChange={(e) => updateDraft({ visionTextAr: e.target.value })} dir="rtl" />
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.visionTextEn || ""} onChange={(e) => updateDraft({ visionTextEn: e.target.value })} dir="ltr" />
                                    </div>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed">{isAr ? view.visionTextAr : view.visionTextEn}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group"
                >
                    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/30 p-8 rounded-2xl border border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                        <div className="flex items-start gap-5">
                            <div className="relative shrink-0">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a772] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative w-20 h-20 bg-gradient-to-br from-[#c2a772] to-[#6096b4] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                    <Target className="size-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-bold text-[#254151]">{isAr ? view.missionTitleAr : view.missionTitleEn}</h3>
                                {isEditing ? (
                                    <div className="grid gap-2">
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.missionTextAr || ""} onChange={(e) => updateDraft({ missionTextAr: e.target.value })} dir="rtl" />
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.missionTextEn || ""} onChange={(e) => updateDraft({ missionTextEn: e.target.value })} dir="ltr" />
                                    </div>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed">{isAr ? view.missionTextAr : view.missionTextEn}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Objectives Section */}
            <div className="space-y-6">
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-1 w-16 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                        <h3 className="text-3xl font-bold text-[#254151]">{isAr ? view.objectivesTitleAr : view.objectivesTitleEn}</h3>
                        <div className="h-1 w-16 bg-gradient-to-l from-[#6096b4] to-[#c2a772] rounded-full"></div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                    <div className="divide-y divide-gray-100">
                        {view.objectives.map((objective, idx) => (
                            <motion.div
                                key={objective.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                                className="p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-amber-50/30 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <CheckCircle2 className="size-5 text-white" />
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <div className="flex-1 grid gap-2">
                                            <div className="flex justify-end">
                                                <button type="button" onClick={() => removeObjective(objective.id)} className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                                                    <Trash2 className="size-3.5" />
                                                    {isAr ? "حذف" : "Delete"}
                                                </button>
                                            </div>
                                            <textarea className="min-h-[70px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={objective.textAr} onChange={(e) => updateObjective(objective.id, { textAr: e.target.value })} dir="rtl" />
                                            <textarea className="min-h-[70px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={objective.textEn} onChange={(e) => updateObjective(objective.id, { textEn: e.target.value })} dir="ltr" />
                                        </div>
                                    ) : (
                                        <p className="flex-1 text-gray-700 leading-relaxed pt-1">{isAr ? objective.textAr : objective.textEn}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                {isEditing && (
                    <button type="button" onClick={addObjective} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        <Plus className="size-4" />
                        {isAr ? "إضافة هدف" : "Add Objective"}
                    </button>
                )}
            </div>

            {/* Quality Management System */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#6096b4] to-[#7aa5be] rounded-xl">
                        <Settings className="size-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-[#254151]">{isAr ? view.qmsTitleAr : view.qmsTitleEn}</h3>
                </div>

                <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5">
                        <p>
                            {isEditing ? (
                                <span className="inline-grid w-full gap-2">
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsParagraph1Ar || ""} onChange={(e) => updateDraft({ qmsParagraph1Ar: e.target.value })} dir="rtl" />
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsParagraph1En || ""} onChange={(e) => updateDraft({ qmsParagraph1En: e.target.value })} dir="ltr" />
                                </span>
                            ) : (
                                isAr ? view.qmsParagraph1Ar : view.qmsParagraph1En
                            )}
                        </p>
                        <p>
                            {isEditing ? (
                                <span className="inline-grid w-full gap-2">
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsParagraph2Ar || ""} onChange={(e) => updateDraft({ qmsParagraph2Ar: e.target.value })} dir="rtl" />
                                    <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsParagraph2En || ""} onChange={(e) => updateDraft({ qmsParagraph2En: e.target.value })} dir="ltr" />
                                </span>
                            ) : (
                                isAr ? view.qmsParagraph2Ar : view.qmsParagraph2En
                            )}
                        </p>
                        <div className="bg-gradient-to-r from-[#254151]/5 to-[#6096b4]/5 p-6 rounded-xl border-r-4 border-[#6096b4]">
                            <p className="font-bold text-[#254151] mb-3 flex items-center gap-2">
                                <Sparkles className="size-5" />
                                {isAr ? view.qmsGoalTitleAr : view.qmsGoalTitleEn}
                            </p>
                            <p>
                                {isEditing ? (
                                    <span className="inline-grid w-full gap-2">
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsGoalTextAr || ""} onChange={(e) => updateDraft({ qmsGoalTextAr: e.target.value })} dir="rtl" />
                                        <textarea className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={draft?.qmsGoalTextEn || ""} onChange={(e) => updateDraft({ qmsGoalTextEn: e.target.value })} dir="ltr" />
                                    </span>
                                ) : (
                                    isAr ? view.qmsGoalTextAr : view.qmsGoalTextEn
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Director Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-[#254151] via-[#2d4a5c] to-[#6096b4] p-8 rounded-2xl shadow-xl"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                            <UserCheck className="size-10 text-white" />
                        </div>
                        <div className="text-center md:text-right">
                            {isEditing ? (
                                <div className="grid gap-2">
                                    <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.directorNameAr || ""} onChange={(e) => updateDraft({ directorNameAr: e.target.value })} dir="rtl" />
                                    <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.directorNameEn || ""} onChange={(e) => updateDraft({ directorNameEn: e.target.value })} dir="ltr" />
                                    <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.directorRoleAr || ""} onChange={(e) => updateDraft({ directorRoleAr: e.target.value })} dir="rtl" />
                                    <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.directorRoleEn || ""} onChange={(e) => updateDraft({ directorRoleEn: e.target.value })} dir="ltr" />
                                    <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white" value={draft?.directorEmail || ""} onChange={(e) => updateDraft({ directorEmail: e.target.value })} dir="ltr" />
                                </div>
                            ) : (
                                <>
                                    <h4 className="text-2xl font-bold text-white mb-1">{isAr ? view.directorNameAr : view.directorNameEn}</h4>
                                    <p className="text-white/80 mb-3">{isAr ? view.directorRoleAr : view.directorRoleEn}</p>
                                </>
                            )}
                            <a
                                href={`mailto:${view.directorEmail}`}
                                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
                            >
                                <Mail className="size-4" />
                                <span>{view.directorEmail}</span>
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:block w-64 h-24 bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden" />
                </div>
            </motion.div>
        </div>
    );
}