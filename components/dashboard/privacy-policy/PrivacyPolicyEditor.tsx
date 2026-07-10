"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Trash2, GripVertical, Save, Shield, GraduationCap, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Section = {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    order: number;
};

type PolicyData = {
    studentTitleAr: string;
    studentTitleEn: string;
    studentIntroAr: string;
    studentIntroEn: string;
    studentSections: Section[];
    staffTitleAr: string;
    staffTitleEn: string;
    staffIntroAr: string;
    staffIntroEn: string;
    staffSections: Section[];
    lastUpdated: string;
};

function newSection(order: number): Section {
    return {
        id: `sec-${Date.now()}-${order}`,
        titleAr: "",
        titleEn: "",
        contentAr: "",
        contentEn: "",
        order,
    };
}

function SectionEditor({
    section,
    index,
    onChange,
    onDelete,
    isRtl,
}: {
    section: Section;
    index: number;
    onChange: (s: Section) => void;
    onDelete: () => void;
    isRtl: boolean;
}) {
    const set = (key: keyof Section, val: string) => onChange({ ...section, [key]: val });

    return (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <GripVertical className="size-4 text-gray-300" />
                    <span className="text-sm font-semibold text-gray-600">
                        {isRtl ? `القسم ${index + 1}` : `Section ${index + 1}`}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-lg hover:bg-red-50"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-500">العنوان (عربي)</label>
                    <Input dir="rtl" value={section.titleAr} onChange={(e) => set("titleAr", e.target.value)} placeholder="عنوان القسم" />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-500">Title (English)</label>
                    <Input dir="ltr" value={section.titleEn} onChange={(e) => set("titleEn", e.target.value)} placeholder="Section title" />
                </div>
                <div className="space-y-1.5 md:col-span-2 grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">المحتوى (عربي)</label>
                        <textarea
                            dir="rtl"
                            rows={4}
                            value={section.contentAr}
                            onChange={(e) => set("contentAr", e.target.value)}
                            placeholder="محتوى القسم بالعربية..."
                            className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] resize-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">Content (English)</label>
                        <textarea
                            dir="ltr"
                            rows={4}
                            value={section.contentEn}
                            onChange={(e) => set("contentEn", e.target.value)}
                            placeholder="Section content in English..."
                            className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabPanel({
    tab,
    data,
    onChange,
    isRtl,
}: {
    tab: "student" | "staff";
    data: PolicyData;
    onChange: (patch: Partial<PolicyData>) => void;
    isRtl: boolean;
}) {
    const isStudent = tab === "student";
    const titleArKey = isStudent ? "studentTitleAr" : "staffTitleAr";
    const titleEnKey = isStudent ? "studentTitleEn" : "staffTitleEn";
    const introArKey = isStudent ? "studentIntroAr" : "staffIntroAr";
    const introEnKey = isStudent ? "studentIntroEn" : "staffIntroEn";
    const sectionsKey = isStudent ? "studentSections" : "staffSections";

    const sections: Section[] = (data[sectionsKey] as Section[]) ?? [];

    const updateSection = (idx: number, s: Section) => {
        const updated = [...sections];
        updated[idx] = s;
        onChange({ [sectionsKey]: updated });
    };

    const deleteSection = (idx: number) => {
        const updated = sections.filter((_, i) => i !== idx);
        onChange({ [sectionsKey]: updated.map((s, i) => ({ ...s, order: i })) });
    };

    const addSection = () => {
        onChange({ [sectionsKey]: [...sections, newSection(sections.length)] });
    };

    return (
        <div className="space-y-6">
            {/* Title + Intro */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Shield className="size-4 text-[#6096b4]" />
                    {isRtl ? "العنوان الرئيسي والمقدمة" : "Main Title & Introduction"}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">العنوان (عربي)</label>
                        <Input dir="rtl" value={data[titleArKey] as string} onChange={(e) => onChange({ [titleArKey]: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">Title (English)</label>
                        <Input dir="ltr" value={data[titleEnKey] as string} onChange={(e) => onChange({ [titleEnKey]: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">المقدمة (عربي)</label>
                        <textarea
                            dir="rtl"
                            rows={3}
                            value={data[introArKey] as string}
                            onChange={(e) => onChange({ [introArKey]: e.target.value })}
                            placeholder="مقدمة سياسة الخصوصية..."
                            className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] resize-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-gray-500">Introduction (English)</label>
                        <textarea
                            dir="ltr"
                            rows={3}
                            value={data[introEnKey] as string}
                            onChange={(e) => onChange({ [introEnKey]: e.target.value })}
                            placeholder="Privacy policy introduction..."
                            className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
                {sections.map((s, i) => (
                    <SectionEditor
                        key={s.id}
                        section={s}
                        index={i}
                        onChange={(updated) => updateSection(i, updated)}
                        onDelete={() => deleteSection(i)}
                        isRtl={isRtl}
                    />
                ))}

                <button
                    type="button"
                    onClick={addSection}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-500 hover:border-[#6096b4] hover:text-[#6096b4] transition-colors"
                >
                    <Plus className="size-4" />
                    {isRtl ? "إضافة قسم جديد" : "Add new section"}
                </button>
            </div>
        </div>
    );
}

export function PrivacyPolicyEditor() {
    const locale = useLocale();
    const isRtl = locale === "ar";

    const [data, setData] = useState<PolicyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<"student" | "staff">("student");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/privacy-policy");
            const json = await res.json() as { ok: boolean; data: PolicyData };
            if (json.ok) setData(json.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { void fetchData(); }, [fetchData]);

    const patch = (partial: Partial<PolicyData>) => {
        setData((prev) => prev ? { ...prev, ...partial } : prev);
        setSaved(false);
    };

    const save = async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch("/api/privacy-policy", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json() as { ok: boolean };
            if (json.ok) setSaved(true);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="size-8 rounded-full border-2 border-[#6096b4] border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!data) return null;

    const lastUpdated = data.lastUpdated
        ? new Date(data.lastUpdated).toLocaleDateString(isRtl ? "ar-OM" : "en-GB", { year: "numeric", month: "long", day: "numeric" })
        : "";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#254151] flex items-center gap-2">
                        <Shield className="size-5" />
                        {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {isRtl ? "إدارة محتوى سياسة الخصوصية للطلاب والموظفين" : "Manage privacy policy content for students and staff"}
                    </p>
                    {lastUpdated && (
                        <p className="text-xs text-gray-400 mt-1">
                            {isRtl ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="/main/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <ExternalLink className="size-4" />
                        {isRtl ? "معاينة" : "Preview"}
                    </a>
                    <Button onClick={() => void save()} disabled={saving} className="gap-2">
                        <Save className="size-4" />
                        {saving
                            ? (isRtl ? "جاري الحفظ..." : "Saving...")
                            : saved
                                ? (isRtl ? "تم الحفظ ✓" : "Saved ✓")
                                : (isRtl ? "حفظ التغييرات" : "Save Changes")}
                    </Button>
                </div>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                <button
                    type="button"
                    onClick={() => setActiveTab("student")}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "student"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <GraduationCap className="size-4" />
                    {isRtl ? "سياسة الطلاب" : "Students Policy"}
                    <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${activeTab === "student" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"}`}>
                        {data.studentSections.length}
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("staff")}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "staff"
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Briefcase className="size-4" />
                    {isRtl ? "سياسة الموظفين" : "Staff Policy"}
                    <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${activeTab === "staff" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-500"}`}>
                        {data.staffSections.length}
                    </span>
                </button>
            </div>

            {/* Tab content */}
            <TabPanel tab={activeTab} data={data} onChange={patch} isRtl={isRtl} />
        </div>
    );
}
