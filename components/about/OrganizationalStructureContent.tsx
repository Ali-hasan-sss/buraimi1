"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Loader2, Network, Pencil, Save, X } from "lucide-react";
import { useLocale } from "next-intl";
import type { OrgChartNode, OrgChartConnection, OrganizationalStructureData } from "@/types/orgChart";
import { DEFAULT_ORG_CHART_NODES, DEFAULT_ORG_CHART_CONNECTIONS } from "@/types/orgChart";
import OrganizationalChartEditor from "./OrganizationalChartEditor";
import OrganizationalChartViewer from "./OrganizationalChartViewer";

export default function OrganizationalStructureContent() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<OrganizationalStructureData | null>(null);
    const [draft, setDraft] = useState<OrganizationalStructureData | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/organizational-structure", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok?: boolean; data?: OrganizationalStructureData };
                const meJson = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
                if (json.ok && json.data) setData(json.data);
                setIsAdmin(Boolean(meJson.ok && meJson.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        })();
    }, []);

    const view = isEditing ? draft : data;

    const startEdit = () => {
        if (!data) return;
        setDraft({ ...data });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setDraft(null);
    };

    const updateDraft = (patch: Partial<OrganizationalStructureData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const res = await fetch("/api/organizational-structure", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            const json = (await res.json()) as { ok?: boolean; data?: OrganizationalStructureData };
            if (res.ok && json.ok && json.data) {
                setData(json.data);
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!view) {
        return (
            <div className="py-16 flex items-center justify-center text-[#254151]">
                <Loader2 className="size-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Network className="size-8 text-white" />
                </div>
                <div className={isEditing ? "flex-1 w-full" : ""}>
                    {isEditing ? (
                        <div className="grid gap-2 w-full max-w-5xl">
                            <input
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.sectionTitleAr || ""}
                                onChange={(e) => updateDraft({ sectionTitleAr: e.target.value })}
                                dir="rtl"
                            />
                            <input
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.sectionTitleEn || ""}
                                onChange={(e) => updateDraft({ sectionTitleEn: e.target.value })}
                                dir="ltr"
                            />
                            <input
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.sectionSubtitleAr || ""}
                                onChange={(e) => updateDraft({ sectionSubtitleAr: e.target.value })}
                                dir="rtl"
                            />
                            <input
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={draft?.sectionSubtitleEn || ""}
                                onChange={(e) => updateDraft({ sectionSubtitleEn: e.target.value })}
                                dir="ltr"
                            />
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
                {isAdmin && (
                    !isEditing ? (
                        <button type="button" onClick={startEdit} className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                            <Pencil className="size-4" />
                            {isAr ? "تعديل القسم" : "Edit Section"}
                        </button>
                    ) : (
                        <div className="ms-auto flex items-center gap-2">
                            <button type="button" onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                                {isAr ? "حفظ" : "Save"}
                            </button>
                            <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white">
                                <X className="size-4" />
                                {isAr ? "إلغاء" : "Cancel"}
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* Organizational Chart Image - Full Width */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="-mx-8 md:-mx-12 lg:-mx-16"
            >
                <div className="bg-white shadow-2xl overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-[#254151] to-[#6096b4]">
                        {isEditing ? (
                            <div className="grid md:grid-cols-2 gap-2">
                                <input
                                    className="rounded-md border border-white/50 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70"
                                    value={draft?.chartTitleAr || ""}
                                    onChange={(e) => updateDraft({ chartTitleAr: e.target.value })}
                                    dir="rtl"
                                />
                                <input
                                    className="rounded-md border border-white/50 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70"
                                    value={draft?.chartTitleEn || ""}
                                    onChange={(e) => updateDraft({ chartTitleEn: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                        ) : (
                            <h3 className="text-2xl font-bold text-white text-center">
                                {isAr ? view.chartTitleAr : view.chartTitleEn}
                            </h3>
                        )}
                    </div>
                    <div className="bg-white md:p-4 p-2 w-full mx-auto md:p-8 lg:p-12">
                        {/* Organizational Chart - Node Based */}
                        {isEditing ? (
                            <OrganizationalChartEditor
                                nodes={draft?.chartNodes || DEFAULT_ORG_CHART_NODES}
                                connections={draft?.chartConnections || DEFAULT_ORG_CHART_CONNECTIONS}
                                onChange={(nodes, connections) => {
                                    updateDraft({ chartNodes: nodes, chartConnections: connections });
                                }}
                                isAr={isAr}
                            />
                        ) : (
                            <OrganizationalChartViewer
                                nodes={data?.chartNodes || DEFAULT_ORG_CHART_NODES}
                                connections={data?.chartConnections || DEFAULT_ORG_CHART_CONNECTIONS}
                                isAr={isAr}
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-slate-50 md:p-8 p-2 rounded-2xl border border-blue-100"
            >
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                        <div className="md:flex hidden w-12 h-12 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-xl  items-center justify-center">
                            <Building2 className="size-6 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <h4 className="text-xl font-bold text-[#254151] mb-3 w-full flex gap-3 text-start">
                            <span className=' md:hidden flex  bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-xl  items-center justify-center w-fit p-3'>
                                <Building2 className="size-6 text-white" />
                            </span>
                            <span>
                                {isAr ? view.aboutTitleAr : view.aboutTitleEn}
                            </span>
                        </h4>
                        {isEditing ? (
                            <div className="grid gap-2 w-full">
                                <textarea
                                    className="w-full min-h-[70px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.aboutTitleAr || ""}
                                    onChange={(e) => updateDraft({ aboutTitleAr: e.target.value })}
                                    dir="rtl"
                                />
                                <textarea
                                    className="w-full min-h-[70px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.aboutTitleEn || ""}
                                    onChange={(e) => updateDraft({ aboutTitleEn: e.target.value })}
                                    dir="ltr"
                                />
                                <textarea
                                    className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.aboutTextAr || ""}
                                    onChange={(e) => updateDraft({ aboutTextAr: e.target.value })}
                                    dir="rtl"
                                />
                                <textarea
                                    className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    value={draft?.aboutTextEn || ""}
                                    onChange={(e) => updateDraft({ aboutTextEn: e.target.value })}
                                    dir="ltr"
                                />
                            </div>
                        ) : (
                            <p className="text-gray-700 leading-relaxed">
                                {isAr ? view.aboutTextAr : view.aboutTextEn}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
