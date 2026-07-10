
"use client"
import {
    Award,
    CheckCircle2,
    FileText,
    Pencil,
    Plus,
    Save,
    Shield,
    Target,
    Trash2,
    UserCheck,
    Users,
    X,
    type LucideIcon
} from "lucide-react";

import { motion, type Variants } from "framer-motion"
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type IconKey = "shield" | "award" | "target" | "users" | "check-circle" | "file-text" | "user-check";
type ValueItem = {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    iconKey: IconKey;
    order: number;
};
type VisionMissionData = {
    visionAr: string;
    visionEn: string;
    missionAr: string;
    missionEn: string;
    values: ValueItem[];
};

const ICONS: { key: IconKey; Icon: LucideIcon }[] = [
    { key: "shield", Icon: Shield },
    { key: "award", Icon: Award },
    { key: "target", Icon: Target },
    { key: "users", Icon: Users },
    { key: "check-circle", Icon: CheckCircle2 },
    { key: "file-text", Icon: FileText },
    { key: "user-check", Icon: UserCheck },
];

function iconByKey(key: IconKey): LucideIcon {
    return ICONS.find((x) => x.key === key)?.Icon || Shield;
}

export default function VisionMissionContent() {
    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false
    const t = useTranslations("about")
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<VisionMissionData | null>(null);
    const [draft, setDraft] = useState<VisionMissionData | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [visionRes, meRes] = await Promise.all([
                    fetch("/api/vision-mission", { method: "GET", cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const visionJson = (await visionRes.json()) as { ok: boolean; data?: VisionMissionData };
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean };
                if (visionJson.ok && visionJson.data) {
                    setData({
                        ...visionJson.data,
                        values: [...visionJson.data.values].sort((a, b) => a.order - b.order),
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
            values: data.values.map((v) => ({ ...v })),
        });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setDraft(null);
        setIsEditing(false);
    };

    const updateDraft = (patch: Partial<VisionMissionData>) => {
        setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    };

    const updateDraftValue = (id: string, patch: Partial<ValueItem>) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                values: prev.values.map((v) => (v.id === id ? { ...v, ...patch } : v)),
            };
        });
    };

    const addValue = () => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                values: [
                    ...prev.values,
                    {
                        id: `value-${Date.now()}`,
                        titleAr: "قيمة جديدة",
                        titleEn: "New Value",
                        contentAr: "",
                        contentEn: "",
                        iconKey: "shield",
                        order: prev.values.length,
                    },
                ],
            };
        });
    };

    const removeValue = (id: string) => {
        setDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                values: prev.values
                    .filter((v) => v.id !== id)
                    .map((v, idx) => ({ ...v, order: idx })),
            };
        });
    };

    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const payload: VisionMissionData = {
                visionAr: draft.visionAr.trim(),
                visionEn: draft.visionEn.trim(),
                missionAr: draft.missionAr.trim(),
                missionEn: draft.missionEn.trim(),
                values: draft.values.map((v, index) => ({
                    ...v,
                    titleAr: v.titleAr.trim(),
                    titleEn: v.titleEn.trim(),
                    contentAr: v.contentAr.trim(),
                    contentEn: v.contentEn.trim(),
                    order: index,
                })),
            };
            const res = await fetch("/api/vision-mission", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json()) as { ok: boolean; data?: VisionMissionData };
            if (res.ok && json.ok && json.data) {
                setData({
                    ...json.data,
                    values: [...json.data.values].sort((a, b) => a.order - b.order),
                });
                setDraft(null);
                setIsEditing(false);
            }
        } finally {
            setSaving(false);
        }
    };

    const palette = useMemo(
        () => [
            { border: "border-[#254151]", bg: "from-[#254151] to-[#2d4a5c]" },
            { border: "border-[#6096b4]", bg: "from-[#6096b4] to-[#7aa5be]" },
            { border: "border-[#c2a772]", bg: "from-[#c2a772] to-[#d4b883]" },
        ],
        [],
    );

    if (!view) {
        return <div className="text-[#254151] font-bold">Loading...</div>;
    }

    return (
        <div className="space-y-8 max-w-full overflow-x-hidden">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200 min-w-0">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Target className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        الرؤية والرسالة والأهداف
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

            {/* الرؤية */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#254151] to-[#2d4a5c] md:p-8 p-3 rounded-2xl shadow-xl"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Target className="size-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {t("vision")}
                    </h3>
                </div>
                <div className="h-1 w-20 bg-[#c2a772] rounded-full mb-6"></div>
                <p className="text-white/90 text-lg leading-relaxed">
                    {isEditing ? (
                        <div className="grid gap-2">
                            <textarea
                                className="min-h-[110px] rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.visionAr || ""}
                                onChange={(e) => updateDraft({ visionAr: e.target.value })}
                                dir="rtl"
                            />
                            <textarea
                                className="min-h-[110px] rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.visionEn || ""}
                                onChange={(e) => updateDraft({ visionEn: e.target.value })}
                                dir="ltr"
                            />
                        </div>
                    ) : (
                        isRtl ? view.visionAr : view.visionEn
                    )}
                </p>
            </motion.div>

            {/* الرسالة */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#6096b4] to-[#7aa5be] md:p-8 p-3 rounded-2xl shadow-xl"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FileText className="size-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {t("mission")}
                    </h3>
                </div>
                <div className="h-1 w-20 bg-[#c2a772] rounded-full mb-6"></div>
                <p className="text-white/90 text-lg leading-relaxed">
                    {isEditing ? (
                        <div className="grid gap-2">
                            <textarea
                                className="min-h-[110px] rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.missionAr || ""}
                                onChange={(e) => updateDraft({ missionAr: e.target.value })}
                                dir="rtl"
                            />
                            <textarea
                                className="min-h-[110px] rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
                                value={draft?.missionEn || ""}
                                onChange={(e) => updateDraft({ missionEn: e.target.value })}
                                dir="ltr"
                            />
                        </div>
                    ) : (
                        isRtl ? view.missionAr : view.missionEn
                    )}
                </p>
            </motion.div>

            {/* القيم */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-amber-50/30 md:p-8 p-3 rounded-2xl border border-blue-100/50 shadow-sm"
            >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="p-2 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-lg">
                        <Award className="size-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-[#254151]">
                        {t("values")}
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 min-w-0">
                    {(view.values || []).map((value, index) => {
                        const Icon = iconByKey(value.iconKey);
                        const p = palette[index % palette.length];
                        return (
                            <motion.div
                                key={value.id}
                                whileHover={{ y: -5 }}
                                className={`bg-white md:p-6 p-3 rounded-xl border-r-4 ${p.border} shadow-md hover:shadow-xl transition-all duration-300 ${index === (view.values.length - 1) && view.values.length % 2 === 1 ? "md:col-span-2" : ""}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 bg-gradient-to-br ${p.bg} rounded-lg shrink-0 mt-1`}>
                                        <Icon className="size-5 text-white" />
                                    </div>
                                    <div className="w-full">
                                        {isEditing ? (
                                            <div className="grid gap-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <Select
                                                        value={value.iconKey}
                                                        onValueChange={(v) => updateDraftValue(value.id, { iconKey: v as IconKey })}
                                                    >
                                                        <SelectTrigger className="w-[90px]">
                                                            <SelectValue placeholder="icon" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ICONS.map(({ key, Icon: OptionIcon }) => (
                                                                <SelectItem key={key} value={key}>
                                                                    <div className="flex items-center justify-center w-6">
                                                                        <OptionIcon className="size-4" />
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeValue(value.id)}
                                                        className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        {isRtl ? "حذف" : "Delete"}
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={value.titleAr}
                                                    onChange={(e) => updateDraftValue(value.id, { titleAr: e.target.value })}
                                                    dir="rtl"
                                                    placeholder="عنوان القيمة بالعربي"
                                                />
                                                <input
                                                    type="text"
                                                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={value.titleEn}
                                                    onChange={(e) => updateDraftValue(value.id, { titleEn: e.target.value })}
                                                    dir="ltr"
                                                    placeholder="Value title in English"
                                                />
                                                <textarea
                                                    className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={value.contentAr}
                                                    onChange={(e) => updateDraftValue(value.id, { contentAr: e.target.value })}
                                                    dir="rtl"
                                                    placeholder="الوصف بالعربي"
                                                />
                                                <textarea
                                                    className="min-h-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                                    value={value.contentEn}
                                                    onChange={(e) => updateDraftValue(value.id, { contentEn: e.target.value })}
                                                    dir="ltr"
                                                    placeholder="Description in English"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <h4 className="text-xl font-bold text-[#254151] mb-2">
                                                    {isRtl ? value.titleAr : value.titleEn}
                                                </h4>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {isRtl ? value.contentAr : value.contentEn}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                {isEditing && (
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={addValue}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                        >
                            <Plus className="size-4" />
                            {isRtl ? "إضافة قيمة" : "Add Value"}
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}