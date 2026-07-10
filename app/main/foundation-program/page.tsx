"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Target, Users, Award, ChevronLeft, CheckCircle, TrendingUp, Globe, Lightbulb, Calculator, Monitor, FileText, ClipboardCheck, Clock, Pencil, Save, X, Loader2 } from 'lucide-react';

import FoundSideBar from '@/components/FoundationProgramPage/SideBar';
import FoundStudy from '@/components/FoundationProgramPage/Study';
import Image from "next/image";
import { useLocale } from 'next-intl';

type FoundationProgramData = {
    level1Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
    level2Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
    heroTitleAr: string; heroTitleEn: string; heroSubtitleAr: string; heroSubtitleEn: string;
    overviewTitleAr: string; overviewTitleEn: string; overviewText1Ar: string; overviewText1En: string; overviewText2Ar: string; overviewText2En: string;
    admissionTitleAr: string; admissionTitleEn: string; admissionTextAr: string; admissionTextEn: string;
    studyTitleAr: string; studyTitleEn: string; studyNoteAr: string; studyNoteEn: string;
    visionSectionTitleAr: string; visionSectionTitleEn: string; visionTitleAr: string; visionTitleEn: string; visionTextAr: string; visionTextEn: string;
    missionTitleAr: string; missionTitleEn: string; missionTextAr: string; missionTextEn: string;
    completionTitleAr: string; completionTitleEn: string;
    completionDescriptionAr: string; completionDescriptionEn: string;
    completionRequirementsTitleAr: string; completionRequirementsTitleEn: string;
    completionRequirementsAr: string[]; completionRequirementsEn: string[];
    completionScheduleTitleAr: string; completionScheduleTitleEn: string;
    completionScheduleTextAr: string; completionScheduleTextEn: string;
    completionButtonLabelAr: string; completionButtonLabelEn: string;
    mathExamTitleAr: string; mathExamTitleEn: string;
    mathExamDescriptionAr: string; mathExamDescriptionEn: string;
    mathExamDurationAr: string; mathExamDurationEn: string;
    mathExamDurationValueAr: string; mathExamDurationValueEn: string;
    mathExamPassMarkAr: string; mathExamPassMarkEn: string;
    mathExamPassMarkValueAr: string; mathExamPassMarkValueEn: string;
    mathExamRetakeAr: string; mathExamRetakeEn: string;
    mathExamRetakeValueAr: string; mathExamRetakeValueEn: string;
    mathExamConditionsTitleAr: string; mathExamConditionsTitleEn: string;
    mathExamConditionsAr: string[]; mathExamConditionsEn: string[];
    mathExamButtonLabelAr: string; mathExamButtonLabelEn: string;
    // Oxford Test Section
    oxfordTitleAr: string; oxfordTitleEn: string;
    oxfordDescriptionAr: string; oxfordDescriptionEn: string;
    oxfordCard1TitleAr: string; oxfordCard1TitleEn: string;
    oxfordCard1DescAr: string; oxfordCard1DescEn: string;
    oxfordCard2TitleAr: string; oxfordCard2TitleEn: string;
    oxfordCard2DescAr: string; oxfordCard2DescEn: string;
    oxfordCard3TitleAr: string; oxfordCard3TitleEn: string;
    oxfordCard3DescAr: string; oxfordCard3DescEn: string;
    oxfordFeaturesTitleAr: string; oxfordFeaturesTitleEn: string;
    oxfordFeature1Ar: string; oxfordFeature1En: string;
    oxfordFeature2Ar: string; oxfordFeature2En: string;
    oxfordFeature3Ar: string; oxfordFeature3En: string;
    oxfordFeature4Ar: string; oxfordFeature4En: string;
    oxfordButtonLabelAr: string; oxfordButtonLabelEn: string;
    // Practice Test Section
    practiceTestTitleAr: string; practiceTestTitleEn: string;
    practiceTestDescriptionAr: string; practiceTestDescriptionEn: string;
    practiceTestCard1TitleAr: string; practiceTestCard1TitleEn: string;
    practiceTestCard1DescAr: string; practiceTestCard1DescEn: string;
    practiceTestCard2TitleAr: string; practiceTestCard2TitleEn: string;
    practiceTestCard2DescAr: string; practiceTestCard2DescEn: string;
    practiceTestCard3TitleAr: string; practiceTestCard3TitleEn: string;
    practiceTestCard3DescAr: string; practiceTestCard3DescEn: string;
    practiceTestFeaturesTitleAr: string; practiceTestFeaturesTitleEn: string;
    practiceTestFeature1Ar: string; practiceTestFeature1En: string;
    practiceTestFeature2Ar: string; practiceTestFeature2En: string;
    practiceTestFeature3Ar: string; practiceTestFeature3En: string;
    practiceTestFeature4Ar: string; practiceTestFeature4En: string;
    practiceTestButtonLabelAr: string; practiceTestButtonLabelEn: string;
    // Faculty Section
    facultyTitleAr: string; facultyTitleEn: string;
    facultyDescriptionAr: string; facultyDescriptionEn: string;
    facultyCard1TitleAr: string; facultyCard1TitleEn: string;
    facultyCard1ValueAr: string; facultyCard1ValueEn: string;
    facultyCard2TitleAr: string; facultyCard2TitleEn: string;
    facultyCard2DescAr: string; facultyCard2DescEn: string;
    facultyCard3TitleAr: string; facultyCard3TitleEn: string;
    facultyCard3DescAr: string; facultyCard3DescEn: string;
    facultyCard1Icon: FacultyIconKey;
    facultyCard2Icon: FacultyIconKey;
    facultyCard3Icon: FacultyIconKey;
    facultyButtonLabelAr: string; facultyButtonLabelEn: string;
    // CTA Section
    ctaTitleAr: string; ctaTitleEn: string;
    ctaDescriptionAr: string; ctaDescriptionEn: string;
    ctaButton1LabelAr: string; ctaButton1LabelEn: string;
    ctaButton2LabelAr: string; ctaButton2LabelEn: string;
};

type FacultyIconKey = "users" | "book-open" | "monitor" | "award" | "graduation-cap" | "target" | "globe" | "lightbulb" | "file-text";

const FACULTY_ICON_OPTIONS: Array<{ value: FacultyIconKey; labelAr: string; labelEn: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { value: "users", labelAr: "مستخدمون", labelEn: "Users", Icon: Users },
    { value: "book-open", labelAr: "كتاب مفتوح", labelEn: "Book", Icon: BookOpen },
    { value: "monitor", labelAr: "شاشة", labelEn: "Monitor", Icon: Monitor },
    { value: "award", labelAr: "جائزة", labelEn: "Award", Icon: Award },
    { value: "graduation-cap", labelAr: "قبعة تخرج", labelEn: "Graduation Cap", Icon: GraduationCap },
    { value: "target", labelAr: "هدف", labelEn: "Target", Icon: Target },
    { value: "globe", labelAr: "كرة أرضية", labelEn: "Globe", Icon: Globe },
    { value: "lightbulb", labelAr: "مصباح", labelEn: "Lightbulb", Icon: Lightbulb },
    { value: "file-text", labelAr: "ملف نصي", labelEn: "File Text", Icon: FileText },
];

function FacultyCardIcon({ iconKey, className }: { iconKey: string | undefined; className?: string }) {
    const icon = FACULTY_ICON_OPTIONS.find((item) => item.value === iconKey)?.Icon ?? Users;
    const Icon = icon;
    return <Icon className={className} />;
}

export default function FoundationProgramPage() {
    const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
    const locale = useLocale();
    const isAr = locale === "ar";
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingSection, setEditingSection] = useState<"hero" | "overview" | "admission" | "study" | "vision" | "completion" | "math" | "oxford" | "practice" | "faculty" | "cta" | null>(null);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<FoundationProgramData | null>(null);
    const [draft, setDraft] = useState<FoundationProgramData | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const [res, meRes] = await Promise.all([
                    fetch("/api/foundation-program", { cache: "no-store" }),
                    fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
                ]);
                const json = (await res.json()) as { ok?: boolean; data?: FoundationProgramData };
                const me = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
                if (json.ok && json.data) setData(json.data);
                setIsAdmin(Boolean(me.ok && me.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        })();
    }, []);

    const view = draft ?? data;
    const updateDraft = (patch: Partial<FoundationProgramData>) => setDraft((prev) => (prev ? ({ ...prev, ...patch }) : prev));

    const startEdit = (section: "hero" | "overview" | "admission" | "study" | "vision" | "completion" | "math" | "oxford" | "practice" | "faculty" | "cta") => {
        if (!data) return;
        if (!draft) setDraft({ ...data });
        setEditingSection(section);
    };
    const cancelEdit = () => {
        setEditingSection(null);
        setDraft(data ? { ...data } : null);
    };
    const saveEdit = async () => {
        if (!draft) return;
        setSaving(true);
        try {
            const res = await fetch("/api/foundation-program", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            const json = (await res.json()) as { ok?: boolean; data?: FoundationProgramData };
            if (res.ok && json.ok && json.data) {
                setData(json.data);
                setDraft({ ...json.data });
                setEditingSection(null);
            }
        } finally {
            setSaving(false);
        }
    };

    if (!view) return <div className="py-16 flex items-center justify-center"><Loader2 className="size-6 animate-spin text-[#254151]" /></div>;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc3MzE2MTY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Students Studying"
                    className="absolute inset-0 w-full h-full object-cover"
                    fill
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div className="max-w-5xl">
                        {isAdmin && (
                            <div className="mb-4 flex justify-center gap-2">
                                {editingSection !== "hero" ? (
                                    <button onClick={() => startEdit("hero")} className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2">
                                        <Pencil className="size-4" />{isAr ? "تعديل الصفحة" : "Edit page"}
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2">
                                            <X className="size-4" />{isAr ? "إلغاء" : "Cancel"}
                                        </button>
                                        <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-white disabled:opacity-60">
                                            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                                <GraduationCap className="size-16 text-white" />
                            </div>
                        </div>
                        {editingSection !== "hero" ? (
                            <>
                                <h1 className="text-5xl font-bold mb-4">{isAr ? view.heroTitleAr : view.heroTitleEn}</h1>
                                <h2 className="text-2xl font-bold mb-6">{isAr ? view.heroTitleEn : view.heroTitleAr}</h2>
                                <p className="text-xl opacity-95">{isAr ? view.heroSubtitleAr : view.heroSubtitleEn}</p>
                            </>
                        ) : (
                            <div className="grid gap-2 max-w-3xl mx-auto">
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.heroTitleAr || ""} onChange={(e) => updateDraft({ heroTitleAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.heroTitleEn || ""} onChange={(e) => updateDraft({ heroTitleEn: e.target.value })} dir="ltr" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.heroSubtitleAr || ""} onChange={(e) => updateDraft({ heroSubtitleAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.heroSubtitleEn || ""} onChange={(e) => updateDraft({ heroSubtitleEn: e.target.value })} dir="ltr" />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* Main Content with Sidebar */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex gap-8 max-w-7xl mx-auto">
                        {/* Sidebar */}
                        <FoundSideBar setActiveSidebarItem={setActiveSidebarItem} activeSidebarItem={activeSidebarItem} />

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Overview Section */}
                            <div id="overview" className="mb-16">
                                <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                        <div className="bg-blue-600 text-white p-4 rounded-full">
                                            <BookOpen className="size-8" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.overviewTitleAr : view.overviewTitleEn}</h2>
                                        </div>
                                        {isAdmin && editingSection !== "overview" && (
                                            <button onClick={() => startEdit("overview")} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                                                <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                            </button>
                                        )}
                                    </div>
                                    {editingSection !== "overview" ? (
                                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                            <p className="text-xl mb-4">{isAr ? view.overviewText1Ar : view.overviewText1En}</p>
                                            <p className="text-lg">{isAr ? view.overviewText2Ar : view.overviewText2En}</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-blue-200 [&_input]:bg-blue-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-blue-200 [&_textarea]:bg-blue-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                            <input className="w-full rounded-md border px-3 py-2" value={draft?.overviewTitleAr || ""} onChange={(e) => updateDraft({ overviewTitleAr: e.target.value })} dir="rtl" />
                                            <input className="w-full rounded-md border px-3 py-2" value={draft?.overviewTitleEn || ""} onChange={(e) => updateDraft({ overviewTitleEn: e.target.value })} dir="ltr" />
                                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.overviewText1Ar || ""} onChange={(e) => updateDraft({ overviewText1Ar: e.target.value })} dir="rtl" />
                                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.overviewText1En || ""} onChange={(e) => updateDraft({ overviewText1En: e.target.value })} dir="ltr" />
                                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.overviewText2Ar || ""} onChange={(e) => updateDraft({ overviewText2Ar: e.target.value })} dir="rtl" />
                                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.overviewText2En || ""} onChange={(e) => updateDraft({ overviewText2En: e.target.value })} dir="ltr" />
                                            <div className="flex justify-end gap-2 pt-2">
                                                <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Admission Requirements */}
                            <div id="admission" className="mb-16">
                                <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-green-200">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-green-600 text-white p-4 rounded-full">
                                                <ClipboardCheck className="size-8" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.admissionTitleAr : view.admissionTitleEn}</h2>
                                        </div>
                                        {isAdmin && editingSection !== "admission" && (
                                            <button onClick={() => startEdit("admission")} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                                                <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-200">
                                        {editingSection !== "admission" ? (
                                            <p className="text-gray-700 text-lg leading-relaxed">{isAr ? view.admissionTextAr : view.admissionTextEn}</p>
                                        ) : (
                                            <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-green-200 [&_input]:bg-green-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-green-200 [&_textarea]:bg-green-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.admissionTitleAr || ""} onChange={(e) => updateDraft({ admissionTitleAr: e.target.value })} dir="rtl" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.admissionTitleEn || ""} onChange={(e) => updateDraft({ admissionTitleEn: e.target.value })} dir="ltr" />
                                                <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.admissionTextAr || ""} onChange={(e) => updateDraft({ admissionTextAr: e.target.value })} dir="rtl" />
                                                <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.admissionTextEn || ""} onChange={(e) => updateDraft({ admissionTextEn: e.target.value })} dir="ltr" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Vision, Mission, Goals */}
                            <div id="vision" className="mb-16">
                                <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                        <div className="bg-purple-600 text-white p-4 rounded-full">
                                            <Target className="size-8" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.visionSectionTitleAr : view.visionSectionTitleEn}</h2>
                                        </div>
                                        {isAdmin && editingSection !== "vision" && (
                                            <button onClick={() => startEdit("vision")} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                                                <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                            </button>
                                        )}
                                    </div>

                                    {/* Vision */}
                                    <div className="mb-8">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="bg-blue-600 text-white size-12 rounded-full flex items-center justify-center">
                                                    <Lightbulb className="size-7" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#254151]">{isAr ? view.visionTitleAr : view.visionTitleEn}</h3>
                                            </div>
                                            {editingSection !== "vision" ? <p className="text-gray-700 text-lg leading-relaxed">{isAr ? view.visionTextAr : view.visionTextEn}</p> : (
                                                <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-blue-200 [&_input]:bg-blue-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-blue-200 [&_textarea]:bg-blue-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                    <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.visionTitleAr || ""} onChange={(e) => updateDraft({ visionTitleAr: e.target.value })} dir="rtl" />
                                                    <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.visionTitleEn || ""} onChange={(e) => updateDraft({ visionTitleEn: e.target.value })} dir="ltr" />
                                                    <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.visionTextAr || ""} onChange={(e) => updateDraft({ visionTextAr: e.target.value })} dir="rtl" />
                                                    <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.visionTextEn || ""} onChange={(e) => updateDraft({ visionTextEn: e.target.value })} dir="ltr" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mission */}
                                    <div className="mb-8">
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border-2 border-green-200">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="bg-green-600 text-white size-12 rounded-full flex items-center justify-center">
                                                    <Target className="size-7" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#254151]">{isAr ? view.missionTitleAr : view.missionTitleEn}</h3>
                                            </div>
                                            {editingSection !== "vision" ? <p className="text-gray-700 text-lg leading-relaxed">{isAr ? view.missionTextAr : view.missionTextEn}</p> : (
                                                <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-green-200 [&_input]:bg-green-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-green-200 [&_textarea]:bg-green-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                    <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.missionTitleAr || ""} onChange={(e) => updateDraft({ missionTitleAr: e.target.value })} dir="rtl" />
                                                    <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.missionTitleEn || ""} onChange={(e) => updateDraft({ missionTitleEn: e.target.value })} dir="ltr" />
                                                    <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.missionTextAr || ""} onChange={(e) => updateDraft({ missionTextAr: e.target.value })} dir="rtl" />
                                                    <textarea className="w-full min-h-[120px] rounded-md border px-3 py-2" value={draft?.missionTextEn || ""} onChange={(e) => updateDraft({ missionTextEn: e.target.value })} dir="ltr" />
                                                    <div className="flex justify-end gap-2 pt-2">
                                                        <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                        <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Continue with rest of the section... */}
                                </div>
                            </div>

                            {/* Study Plan */}
                            <FoundStudy
                                isAr={isAr}
                                isAdmin={isAdmin}
                                isEditing={editingSection === "study"}
                                saving={saving}
                                titleAr={view.studyTitleAr}
                                titleEn={view.studyTitleEn}
                                noteAr={view.studyNoteAr}
                                noteEn={view.studyNoteEn}
                                onStartEdit={() => startEdit("study")}
                                onCancelEdit={cancelEdit}
                                onSaveEdit={saveEdit}
                                onChangeTitleAr={(value) => updateDraft({ studyTitleAr: value })}
                                onChangeTitleEn={(value) => updateDraft({ studyTitleEn: value })}
                                onChangeNoteAr={(value) => updateDraft({ studyNoteAr: value })}
                                onChangeNoteEn={(value) => updateDraft({ studyNoteEn: value })}
                                level1Courses={view.level1Courses || []}
                                level2Courses={view.level2Courses || []}
                                onChangeLevel1Courses={(courses) => updateDraft({ level1Courses: courses })}
                                onChangeLevel2Courses={(courses) => updateDraft({ level2Courses: courses })}
                            />
                            {/* Completion Exam */}
                            <div id="completion" className="mb-16">
                                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-xl p-10 border-2 border-red-200">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-red-600 text-white p-4 rounded-full">
                                                <FileText className="size-8" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.completionTitleAr : view.completionTitleEn}</h2>
                                        </div>
                                        {isAdmin && editingSection !== "completion" && (
                                            <button onClick={() => startEdit("completion")} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                                                <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-white rounded-lg p-8 shadow-md border-2 border-red-200">
                                        {editingSection !== "completion" ? (
                                            <>
                                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                                    {isAr ? view.completionDescriptionAr : view.completionDescriptionEn}
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                                                        <h3 className="font-bold text-[#254151] mb-2 flex items-center gap-2">
                                                            <Award className="size-5 text-red-600" />
                                                            {isAr ? view.completionRequirementsTitleAr : view.completionRequirementsTitleEn}
                                                        </h3>
                                                        <ul className="space-y-2 text-gray-700">
                                                            {((isAr ? view.completionRequirementsAr : view.completionRequirementsEn) || []).map((item, idx) => (
                                                                <li key={idx}>• {item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                                                        <h3 className="font-bold text-[#254151] mb-2 flex items-center gap-2">
                                                            <CheckCircle className="size-5 text-red-600" />
                                                            {isAr ? view.completionScheduleTitleAr : view.completionScheduleTitleEn}
                                                        </h3>
                                                        <p className="text-gray-700">
                                                            {isAr ? view.completionScheduleTextAr : view.completionScheduleTextEn}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/foundation-completion-exam"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                                                    >
                                                        <FileText className="size-6" />
                                                        <span>{isAr ? view.completionButtonLabelAr : view.completionButtonLabelEn}</span>
                                                        <ChevronLeft className="size-5" />
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-red-200 [&_input]:bg-red-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-red-200 [&_textarea]:bg-red-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionTitleAr || ""} onChange={(e) => updateDraft({ completionTitleAr: e.target.value })} dir="rtl" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionTitleEn || ""} onChange={(e) => updateDraft({ completionTitleEn: e.target.value })} dir="ltr" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.completionDescriptionAr || ""} onChange={(e) => updateDraft({ completionDescriptionAr: e.target.value })} dir="rtl" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.completionDescriptionEn || ""} onChange={(e) => updateDraft({ completionDescriptionEn: e.target.value })} dir="ltr" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionRequirementsTitleAr || ""} onChange={(e) => updateDraft({ completionRequirementsTitleAr: e.target.value })} dir="rtl" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionRequirementsTitleEn || ""} onChange={(e) => updateDraft({ completionRequirementsTitleEn: e.target.value })} dir="ltr" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={(draft?.completionRequirementsAr || []).join("\n")} onChange={(e) => updateDraft({ completionRequirementsAr: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} dir="rtl" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={(draft?.completionRequirementsEn || []).join("\n")} onChange={(e) => updateDraft({ completionRequirementsEn: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} dir="ltr" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionScheduleTitleAr || ""} onChange={(e) => updateDraft({ completionScheduleTitleAr: e.target.value })} dir="rtl" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionScheduleTitleEn || ""} onChange={(e) => updateDraft({ completionScheduleTitleEn: e.target.value })} dir="ltr" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.completionScheduleTextAr || ""} onChange={(e) => updateDraft({ completionScheduleTextAr: e.target.value })} dir="rtl" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.completionScheduleTextEn || ""} onChange={(e) => updateDraft({ completionScheduleTextEn: e.target.value })} dir="ltr" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionButtonLabelAr || ""} onChange={(e) => updateDraft({ completionButtonLabelAr: e.target.value })} dir="rtl" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.completionButtonLabelEn || ""} onChange={(e) => updateDraft({ completionButtonLabelEn: e.target.value })} dir="ltr" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Math Exam */}
                            <div id="math-exam" className="mb-16">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-xl p-10 border-2 border-green-200">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-green-600 text-white p-4 rounded-full">
                                                <Calculator className="size-8" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.mathExamTitleAr : view.mathExamTitleEn}</h2>
                                        </div>
                                        {isAdmin && editingSection !== "math" && (
                                            <button onClick={() => startEdit("math")} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                                                <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-white rounded-lg p-8 shadow-md border-2 border-green-200">
                                        {editingSection !== "math" ? (
                                            <>
                                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                                    {isAr ? view.mathExamDescriptionAr : view.mathExamDescriptionEn}
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Clock className="size-6 text-green-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.mathExamDurationAr : view.mathExamDurationEn}</h3>
                                                        </div>
                                                        <p className="text-2xl font-bold text-green-700">{isAr ? view.mathExamDurationValueAr : view.mathExamDurationValueEn}</p>
                                                    </div>
                                                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Award className="size-6 text-green-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.mathExamPassMarkAr : view.mathExamPassMarkEn}</h3>
                                                        </div>
                                                        <p className="text-2xl font-bold text-green-700">{isAr ? view.mathExamPassMarkValueAr : view.mathExamPassMarkValueEn}</p>
                                                    </div>
                                                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <TrendingUp className="size-6 text-green-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.mathExamRetakeAr : view.mathExamRetakeEn}</h3>
                                                        </div>
                                                        <p className="text-lg font-bold text-green-700">{isAr ? view.mathExamRetakeValueAr : view.mathExamRetakeValueEn}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-4">
                                                    <h3 className="font-bold text-[#254151] mb-3">{isAr ? view.mathExamConditionsTitleAr : view.mathExamConditionsTitleEn}:</h3>
                                                    <ul className="space-y-2 text-gray-700">
                                                        {((isAr ? view.mathExamConditionsAr : view.mathExamConditionsEn) || []).map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/math-completion-exam"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                                                    >
                                                        <Calculator className="size-6" />
                                                        <span>{isAr ? view.mathExamButtonLabelAr : view.mathExamButtonLabelEn}</span>
                                                        <ChevronLeft className="size-5" />
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="grid gap-2 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-green-200 [&_input]:bg-green-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-green-200 [&_textarea]:bg-green-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamTitleAr || ""} onChange={(e) => updateDraft({ mathExamTitleAr: e.target.value })} dir="rtl" placeholder="عنوان الامتحان (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamTitleEn || ""} onChange={(e) => updateDraft({ mathExamTitleEn: e.target.value })} dir="ltr" placeholder="Exam Title (English)" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.mathExamDescriptionAr || ""} onChange={(e) => updateDraft({ mathExamDescriptionAr: e.target.value })} dir="rtl" placeholder="وصف الامتحان (عربي)" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={draft?.mathExamDescriptionEn || ""} onChange={(e) => updateDraft({ mathExamDescriptionEn: e.target.value })} dir="ltr" placeholder="Exam Description (English)" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamDurationAr || ""} onChange={(e) => updateDraft({ mathExamDurationAr: e.target.value })} dir="rtl" placeholder="عنوان المدة (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamDurationEn || ""} onChange={(e) => updateDraft({ mathExamDurationEn: e.target.value })} dir="ltr" placeholder="Duration Title (English)" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamDurationValueAr || ""} onChange={(e) => updateDraft({ mathExamDurationValueAr: e.target.value })} dir="rtl" placeholder="قيمة المدة (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamDurationValueEn || ""} onChange={(e) => updateDraft({ mathExamDurationValueEn: e.target.value })} dir="ltr" placeholder="Duration Value (English)" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamPassMarkAr || ""} onChange={(e) => updateDraft({ mathExamPassMarkAr: e.target.value })} dir="rtl" placeholder="عنوان علامة النجاح (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamPassMarkEn || ""} onChange={(e) => updateDraft({ mathExamPassMarkEn: e.target.value })} dir="ltr" placeholder="Pass Mark Title (English)" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamPassMarkValueAr || ""} onChange={(e) => updateDraft({ mathExamPassMarkValueAr: e.target.value })} dir="rtl" placeholder="قيمة علامة النجاح (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamPassMarkValueEn || ""} onChange={(e) => updateDraft({ mathExamPassMarkValueEn: e.target.value })} dir="ltr" placeholder="Pass Mark Value (English)" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamRetakeAr || ""} onChange={(e) => updateDraft({ mathExamRetakeAr: e.target.value })} dir="rtl" placeholder="عنوان فرص الإعادة (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamRetakeEn || ""} onChange={(e) => updateDraft({ mathExamRetakeEn: e.target.value })} dir="ltr" placeholder="Retake Title (English)" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamRetakeValueAr || ""} onChange={(e) => updateDraft({ mathExamRetakeValueAr: e.target.value })} dir="rtl" placeholder="قيمة فرص الإعادة (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamRetakeValueEn || ""} onChange={(e) => updateDraft({ mathExamRetakeValueEn: e.target.value })} dir="ltr" placeholder="Retake Value (English)" />
                                                </div>
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamConditionsTitleAr || ""} onChange={(e) => updateDraft({ mathExamConditionsTitleAr: e.target.value })} dir="rtl" placeholder="عنوان الشروط (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamConditionsTitleEn || ""} onChange={(e) => updateDraft({ mathExamConditionsTitleEn: e.target.value })} dir="ltr" placeholder="Conditions Title (English)" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={(draft?.mathExamConditionsAr || []).join("\n")} onChange={(e) => updateDraft({ mathExamConditionsAr: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} dir="rtl" placeholder="الشروط (عربي - كل سطر شرط)" />
                                                <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={(draft?.mathExamConditionsEn || []).join("\n")} onChange={(e) => updateDraft({ mathExamConditionsEn: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} dir="ltr" placeholder="Conditions (English - one per line)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamButtonLabelAr || ""} onChange={(e) => updateDraft({ mathExamButtonLabelAr: e.target.value })} dir="rtl" placeholder="نص الزر (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.mathExamButtonLabelEn || ""} onChange={(e) => updateDraft({ mathExamButtonLabelEn: e.target.value })} dir="ltr" placeholder="Button Label (English)" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Oxford Test */}
                            <div id="oxford-test" className="mb-16">
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-xl p-10 border-2 border-indigo-200">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-indigo-600 text-white p-4 rounded-full">
                                            <Award className="size-8" />
                                        </div>
                                        {editingSection === "oxford" ? (
                                            <div className="flex-1 space-y-2">
                                                <input className="w-full rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-2xl font-bold text-[#254151]" value={draft?.oxfordTitleAr || ""} onChange={(e) => updateDraft({ oxfordTitleAr: e.target.value })} dir="rtl" placeholder="العنوان (عربي)" />
                                                <input className="w-full rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-xl font-bold text-[#254151]" value={draft?.oxfordTitleEn || ""} onChange={(e) => updateDraft({ oxfordTitleEn: e.target.value })} dir="ltr" placeholder="Title (English)" />
                                            </div>
                                        ) : (
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.oxfordTitleAr : view.oxfordTitleEn}</h2>
                                        )}
                                        {isAdmin && editingSection !== "oxford" && (
                                            <button onClick={() => startEdit("oxford")} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                                                <Pencil className="size-4" />{isAr ? "تعديل" : "Edit"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-white rounded-lg p-8 shadow-md border-2 border-indigo-200">
                                        {editingSection === "oxford" ? (
                                            <div className="space-y-3 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-indigo-200 [&_input]:bg-indigo-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-indigo-200 [&_textarea]:bg-indigo-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2" value={draft?.oxfordDescriptionAr || ""} onChange={(e) => updateDraft({ oxfordDescriptionAr: e.target.value })} dir="rtl" placeholder="الوصف (عربي)" />
                                                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2" value={draft?.oxfordDescriptionEn || ""} onChange={(e) => updateDraft({ oxfordDescriptionEn: e.target.value })} dir="ltr" placeholder="Description (English)" />
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.oxfordCard1TitleAr || ""} onChange={(e) => updateDraft({ oxfordCard1TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 1 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard1TitleEn || ""} onChange={(e) => updateDraft({ oxfordCard1TitleEn: e.target.value })} dir="ltr" placeholder="Card 1 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard1DescAr || ""} onChange={(e) => updateDraft({ oxfordCard1DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 1 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard1DescEn || ""} onChange={(e) => updateDraft({ oxfordCard1DescEn: e.target.value })} dir="ltr" placeholder="Card 1 - Desc (EN)" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.oxfordCard2TitleAr || ""} onChange={(e) => updateDraft({ oxfordCard2TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard2TitleEn || ""} onChange={(e) => updateDraft({ oxfordCard2TitleEn: e.target.value })} dir="ltr" placeholder="Card 2 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard2DescAr || ""} onChange={(e) => updateDraft({ oxfordCard2DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard2DescEn || ""} onChange={(e) => updateDraft({ oxfordCard2DescEn: e.target.value })} dir="ltr" placeholder="Card 2 - Desc (EN)" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.oxfordCard3TitleAr || ""} onChange={(e) => updateDraft({ oxfordCard3TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard3TitleEn || ""} onChange={(e) => updateDraft({ oxfordCard3TitleEn: e.target.value })} dir="ltr" placeholder="Card 3 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard3DescAr || ""} onChange={(e) => updateDraft({ oxfordCard3DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordCard3DescEn || ""} onChange={(e) => updateDraft({ oxfordCard3DescEn: e.target.value })} dir="ltr" placeholder="Card 3 - Desc (EN)" />
                                                    </div>
                                                </div>
                                                <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.oxfordFeaturesTitleAr || ""} onChange={(e) => updateDraft({ oxfordFeaturesTitleAr: e.target.value })} dir="rtl" placeholder="عنوان المميزات (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeaturesTitleEn || ""} onChange={(e) => updateDraft({ oxfordFeaturesTitleEn: e.target.value })} dir="ltr" placeholder="Features Title (EN)" />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature1Ar || ""} onChange={(e) => updateDraft({ oxfordFeature1Ar: e.target.value })} dir="rtl" placeholder="الميزة 1 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature1En || ""} onChange={(e) => updateDraft({ oxfordFeature1En: e.target.value })} dir="ltr" placeholder="Feature 1 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature2Ar || ""} onChange={(e) => updateDraft({ oxfordFeature2Ar: e.target.value })} dir="rtl" placeholder="الميزة 2 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature2En || ""} onChange={(e) => updateDraft({ oxfordFeature2En: e.target.value })} dir="ltr" placeholder="Feature 2 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature3Ar || ""} onChange={(e) => updateDraft({ oxfordFeature3Ar: e.target.value })} dir="rtl" placeholder="الميزة 3 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature3En || ""} onChange={(e) => updateDraft({ oxfordFeature3En: e.target.value })} dir="ltr" placeholder="Feature 3 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature4Ar || ""} onChange={(e) => updateDraft({ oxfordFeature4Ar: e.target.value })} dir="rtl" placeholder="الميزة 4 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordFeature4En || ""} onChange={(e) => updateDraft({ oxfordFeature4En: e.target.value })} dir="ltr" placeholder="Feature 4 (EN)" />
                                                </div>
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordButtonLabelAr || ""} onChange={(e) => updateDraft({ oxfordButtonLabelAr: e.target.value })} dir="rtl" placeholder="نص الزر (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.oxfordButtonLabelEn || ""} onChange={(e) => updateDraft({ oxfordButtonLabelEn: e.target.value })} dir="ltr" placeholder="Button Label (EN)" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-gray-700 text-lg leading-relaxed mb-4">{isAr ? view.oxfordDescriptionAr : view.oxfordDescriptionEn}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Globe className="size-6 text-indigo-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.oxfordCard1TitleAr : view.oxfordCard1TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.oxfordCard1DescAr : view.oxfordCard1DescEn}</p>
                                                    </div>
                                                    <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Clock className="size-6 text-indigo-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.oxfordCard2TitleAr : view.oxfordCard2TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.oxfordCard2DescAr : view.oxfordCard2DescEn}</p>
                                                    </div>
                                                    <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Award className="size-6 text-indigo-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.oxfordCard3TitleAr : view.oxfordCard3TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.oxfordCard3DescAr : view.oxfordCard3DescEn}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200 mb-4">
                                                    <h3 className="font-bold text-[#254151] mb-3">{isAr ? view.oxfordFeaturesTitleAr : view.oxfordFeaturesTitleEn}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.oxfordFeature1Ar : view.oxfordFeature1En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.oxfordFeature2Ar : view.oxfordFeature2En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.oxfordFeature3Ar : view.oxfordFeature3En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.oxfordFeature4Ar : view.oxfordFeature4En}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/oxford-placement-test"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                                                    >
                                                        <Award className="size-6" />
                                                        <span>{isAr ? view.oxfordButtonLabelAr : view.oxfordButtonLabelEn}</span>
                                                        <ChevronLeft className="size-5" />
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Practice Test */}
                            <div id="practice-test" className="mb-16">
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-xl p-10 border-2 border-purple-200">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-purple-600 text-white p-4 rounded-full">
                                            <ClipboardCheck className="size-8" />
                                        </div>
                                        {editingSection === "practice" ? (
                                            <div className="flex-1 space-y-2">
                                                <input className="w-full rounded-lg border-2 border-purple-200 bg-purple-50 px-3 py-2 text-2xl font-bold text-[#254151]" value={draft?.practiceTestTitleAr || ""} onChange={(e) => updateDraft({ practiceTestTitleAr: e.target.value })} dir="rtl" placeholder="العنوان (عربي)" />
                                                <input className="w-full rounded-lg border-2 border-purple-200 bg-purple-50 px-3 py-2 text-xl font-bold text-[#254151]" value={draft?.practiceTestTitleEn || ""} onChange={(e) => updateDraft({ practiceTestTitleEn: e.target.value })} dir="ltr" placeholder="Title (English)" />
                                            </div>
                                        ) : (
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.practiceTestTitleAr : view.practiceTestTitleEn}</h2>
                                        )}
                                        {isAdmin && editingSection !== "practice" && (
                                            <button onClick={() => startEdit("practice")} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700">
                                                <Pencil className="size-4" />{isAr ? "تعديل" : "Edit"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-white rounded-lg p-8 shadow-md border-2 border-purple-200">
                                        {editingSection === "practice" ? (
                                            <div className="space-y-3 [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-purple-200 [&_input]:bg-purple-50 [&_input]:px-3 [&_input]:py-2 [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-purple-200 [&_textarea]:bg-purple-50 [&_textarea]:px-3 [&_textarea]:py-2">
                                                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2" value={draft?.practiceTestDescriptionAr || ""} onChange={(e) => updateDraft({ practiceTestDescriptionAr: e.target.value })} dir="rtl" placeholder="الوصف (عربي)" />
                                                <textarea className="w-full min-h-[80px] rounded-md border px-3 py-2" value={draft?.practiceTestDescriptionEn || ""} onChange={(e) => updateDraft({ practiceTestDescriptionEn: e.target.value })} dir="ltr" placeholder="Description (English)" />
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.practiceTestCard1TitleAr || ""} onChange={(e) => updateDraft({ practiceTestCard1TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 1 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard1TitleEn || ""} onChange={(e) => updateDraft({ practiceTestCard1TitleEn: e.target.value })} dir="ltr" placeholder="Card 1 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard1DescAr || ""} onChange={(e) => updateDraft({ practiceTestCard1DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 1 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard1DescEn || ""} onChange={(e) => updateDraft({ practiceTestCard1DescEn: e.target.value })} dir="ltr" placeholder="Card 1 - Desc (EN)" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.practiceTestCard2TitleAr || ""} onChange={(e) => updateDraft({ practiceTestCard2TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard2TitleEn || ""} onChange={(e) => updateDraft({ practiceTestCard2TitleEn: e.target.value })} dir="ltr" placeholder="Card 2 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard2DescAr || ""} onChange={(e) => updateDraft({ practiceTestCard2DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard2DescEn || ""} onChange={(e) => updateDraft({ practiceTestCard2DescEn: e.target.value })} dir="ltr" placeholder="Card 2 - Desc (EN)" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.practiceTestCard3TitleAr || ""} onChange={(e) => updateDraft({ practiceTestCard3TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - العنوان (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard3TitleEn || ""} onChange={(e) => updateDraft({ practiceTestCard3TitleEn: e.target.value })} dir="ltr" placeholder="Card 3 - Title (EN)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard3DescAr || ""} onChange={(e) => updateDraft({ practiceTestCard3DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - الوصف (عربي)" />
                                                        <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestCard3DescEn || ""} onChange={(e) => updateDraft({ practiceTestCard3DescEn: e.target.value })} dir="ltr" placeholder="Card 3 - Desc (EN)" />
                                                    </div>
                                                </div>
                                                <input className="w-full rounded-md border px-3 py-2 font-bold" value={draft?.practiceTestFeaturesTitleAr || ""} onChange={(e) => updateDraft({ practiceTestFeaturesTitleAr: e.target.value })} dir="rtl" placeholder="عنوان المميزات (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeaturesTitleEn || ""} onChange={(e) => updateDraft({ practiceTestFeaturesTitleEn: e.target.value })} dir="ltr" placeholder="Features Title (EN)" />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature1Ar || ""} onChange={(e) => updateDraft({ practiceTestFeature1Ar: e.target.value })} dir="rtl" placeholder="الميزة 1 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature1En || ""} onChange={(e) => updateDraft({ practiceTestFeature1En: e.target.value })} dir="ltr" placeholder="Feature 1 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature2Ar || ""} onChange={(e) => updateDraft({ practiceTestFeature2Ar: e.target.value })} dir="rtl" placeholder="الميزة 2 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature2En || ""} onChange={(e) => updateDraft({ practiceTestFeature2En: e.target.value })} dir="ltr" placeholder="Feature 2 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature3Ar || ""} onChange={(e) => updateDraft({ practiceTestFeature3Ar: e.target.value })} dir="rtl" placeholder="الميزة 3 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature3En || ""} onChange={(e) => updateDraft({ practiceTestFeature3En: e.target.value })} dir="ltr" placeholder="Feature 3 (EN)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature4Ar || ""} onChange={(e) => updateDraft({ practiceTestFeature4Ar: e.target.value })} dir="rtl" placeholder="الميزة 4 (عربي)" />
                                                    <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestFeature4En || ""} onChange={(e) => updateDraft({ practiceTestFeature4En: e.target.value })} dir="ltr" placeholder="Feature 4 (EN)" />
                                                </div>
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestButtonLabelAr || ""} onChange={(e) => updateDraft({ practiceTestButtonLabelAr: e.target.value })} dir="rtl" placeholder="نص الزر (عربي)" />
                                                <input className="w-full rounded-md border px-3 py-2" value={draft?.practiceTestButtonLabelEn || ""} onChange={(e) => updateDraft({ practiceTestButtonLabelEn: e.target.value })} dir="ltr" placeholder="Button Label (EN)" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-gray-700 text-lg leading-relaxed mb-4">{isAr ? view.practiceTestDescriptionAr : view.practiceTestDescriptionEn}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Calculator className="size-6 text-purple-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.practiceTestCard1TitleAr : view.practiceTestCard1TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.practiceTestCard1DescAr : view.practiceTestCard1DescEn}</p>
                                                    </div>
                                                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Monitor className="size-6 text-purple-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.practiceTestCard2TitleAr : view.practiceTestCard2TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.practiceTestCard2DescAr : view.practiceTestCard2DescEn}</p>
                                                    </div>
                                                    <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Clock className="size-6 text-purple-600" />
                                                            <h3 className="font-bold text-[#254151]">{isAr ? view.practiceTestCard3TitleAr : view.practiceTestCard3TitleEn}</h3>
                                                        </div>
                                                        <p className="text-gray-700">{isAr ? view.practiceTestCard3DescAr : view.practiceTestCard3DescEn}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200 mb-4">
                                                    <h3 className="font-bold text-[#254151] mb-3">{isAr ? view.practiceTestFeaturesTitleAr : view.practiceTestFeaturesTitleEn}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.practiceTestFeature1Ar : view.practiceTestFeature1En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.practiceTestFeature2Ar : view.practiceTestFeature2En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.practiceTestFeature3Ar : view.practiceTestFeature3En}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <CheckCircle className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-700">{isAr ? view.practiceTestFeature4Ar : view.practiceTestFeature4En}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/practice-placement-test"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                                                    >
                                                        <ClipboardCheck className="size-6" />
                                                        <span>{isAr ? view.practiceTestButtonLabelAr : view.practiceTestButtonLabelEn}</span>
                                                        <ChevronLeft className="size-5" />
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Faculty */}
                            <div id="faculty" className="mb-16">
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-xl p-10 border-2 border-amber-200">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-amber-600 text-white p-4 rounded-full">
                                            <Users className="size-8" />
                                        </div>
                                        {editingSection === "faculty" ? (
                                            <div className="flex-1 space-y-2">
                                                <input className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 px-3 py-2 text-2xl font-bold text-[#254151]" value={draft?.facultyTitleAr || ""} onChange={(e) => updateDraft({ facultyTitleAr: e.target.value })} dir="rtl" placeholder="العنوان (عربي)" />
                                                <input className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 px-3 py-2 text-xl font-bold text-[#254151]" value={draft?.facultyTitleEn || ""} onChange={(e) => updateDraft({ facultyTitleEn: e.target.value })} dir="ltr" placeholder="Title (English)" />
                                            </div>
                                        ) : (
                                            <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.facultyTitleAr : view.facultyTitleEn}</h2>
                                        )}
                                        {isAdmin && editingSection !== "faculty" && (
                                            <button onClick={() => startEdit("faculty")} className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                                                <Pencil className="size-4" />{isAr ? "تعديل" : "Edit"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-white rounded-lg p-8 shadow-md border-2 border-amber-200">
                                        {editingSection === "faculty" ? (
                                            <div className="space-y-4">
                                                <textarea className="w-full min-h-[90px] rounded-lg border-2 border-amber-200 bg-amber-50 px-4 py-3 text-gray-800 focus:border-amber-400 focus:outline-none" value={draft?.facultyDescriptionAr || ""} onChange={(e) => updateDraft({ facultyDescriptionAr: e.target.value })} dir="rtl" placeholder="الوصف (عربي)" />
                                                <textarea className="w-full min-h-[90px] rounded-lg border-2 border-amber-200 bg-amber-50 px-4 py-3 text-gray-800 focus:border-amber-400 focus:outline-none" value={draft?.facultyDescriptionEn || ""} onChange={(e) => updateDraft({ facultyDescriptionEn: e.target.value })} dir="ltr" placeholder="Description (English)" />
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2 rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                                                        <div className="bg-amber-600 text-white size-14 rounded-full flex items-center justify-center mx-auto mb-1">
                                                            <FacultyCardIcon iconKey={draft?.facultyCard1Icon} className="size-7" />
                                                        </div>
                                                        <select
                                                            className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 text-sm"
                                                            value={draft?.facultyCard1Icon || "users"}
                                                            onChange={(e) => updateDraft({ facultyCard1Icon: e.target.value as FacultyIconKey })}
                                                        >
                                                            {FACULTY_ICON_OPTIONS.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {isAr ? opt.labelAr : opt.labelEn}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 font-bold" value={draft?.facultyCard1TitleAr || ""} onChange={(e) => updateDraft({ facultyCard1TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 1 - العنوان (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard1TitleEn || ""} onChange={(e) => updateDraft({ facultyCard1TitleEn: e.target.value })} dir="ltr" placeholder="Card 1 - Title (EN)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard1ValueAr || ""} onChange={(e) => updateDraft({ facultyCard1ValueAr: e.target.value })} dir="rtl" placeholder="القيمة (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard1ValueEn || ""} onChange={(e) => updateDraft({ facultyCard1ValueEn: e.target.value })} dir="ltr" placeholder="Value (EN)" />
                                                    </div>
                                                    <div className="space-y-2 rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                                                        <div className="bg-amber-600 text-white size-14 rounded-full flex items-center justify-center mx-auto mb-1">
                                                            <FacultyCardIcon iconKey={draft?.facultyCard2Icon} className="size-7" />
                                                        </div>
                                                        <select
                                                            className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 text-sm"
                                                            value={draft?.facultyCard2Icon || "book-open"}
                                                            onChange={(e) => updateDraft({ facultyCard2Icon: e.target.value as FacultyIconKey })}
                                                        >
                                                            {FACULTY_ICON_OPTIONS.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {isAr ? opt.labelAr : opt.labelEn}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 font-bold" value={draft?.facultyCard2TitleAr || ""} onChange={(e) => updateDraft({ facultyCard2TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - العنوان (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard2TitleEn || ""} onChange={(e) => updateDraft({ facultyCard2TitleEn: e.target.value })} dir="ltr" placeholder="Card 2 - Title (EN)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard2DescAr || ""} onChange={(e) => updateDraft({ facultyCard2DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 2 - الوصف (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard2DescEn || ""} onChange={(e) => updateDraft({ facultyCard2DescEn: e.target.value })} dir="ltr" placeholder="Card 2 - Desc (EN)" />
                                                    </div>
                                                    <div className="space-y-2 rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                                                        <div className="bg-amber-600 text-white size-14 rounded-full flex items-center justify-center mx-auto mb-1">
                                                            <FacultyCardIcon iconKey={draft?.facultyCard3Icon} className="size-7" />
                                                        </div>
                                                        <select
                                                            className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 text-sm"
                                                            value={draft?.facultyCard3Icon || "monitor"}
                                                            onChange={(e) => updateDraft({ facultyCard3Icon: e.target.value as FacultyIconKey })}
                                                        >
                                                            {FACULTY_ICON_OPTIONS.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {isAr ? opt.labelAr : opt.labelEn}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2 font-bold" value={draft?.facultyCard3TitleAr || ""} onChange={(e) => updateDraft({ facultyCard3TitleAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - العنوان (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard3TitleEn || ""} onChange={(e) => updateDraft({ facultyCard3TitleEn: e.target.value })} dir="ltr" placeholder="Card 3 - Title (EN)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard3DescAr || ""} onChange={(e) => updateDraft({ facultyCard3DescAr: e.target.value })} dir="rtl" placeholder="البطاقة 3 - الوصف (عربي)" />
                                                        <input className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 py-2" value={draft?.facultyCard3DescEn || ""} onChange={(e) => updateDraft({ facultyCard3DescEn: e.target.value })} dir="ltr" placeholder="Card 3 - Desc (EN)" />
                                                    </div>
                                                </div>
                                                <input className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 px-3 py-2" value={draft?.facultyButtonLabelAr || ""} onChange={(e) => updateDraft({ facultyButtonLabelAr: e.target.value })} dir="rtl" placeholder="نص الزر (عربي)" />
                                                <input className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 px-3 py-2" value={draft?.facultyButtonLabelEn || ""} onChange={(e) => updateDraft({ facultyButtonLabelEn: e.target.value })} dir="ltr" placeholder="Button Label (EN)" />
                                                <div className="flex justify-end gap-2 pt-2">
                                                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                                    <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-gray-700 text-lg leading-relaxed mb-6">{isAr ? view.facultyDescriptionAr : view.facultyDescriptionEn}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 text-center">
                                                        <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                            <FacultyCardIcon iconKey={view.facultyCard1Icon} className="size-8" />
                                                        </div>
                                                        <h3 className="font-bold text-[#254151] mb-2">{isAr ? view.facultyCard1TitleAr : view.facultyCard1TitleEn}</h3>
                                                        <p className="text-3xl font-bold text-amber-700">{isAr ? view.facultyCard1ValueAr : view.facultyCard1ValueEn}</p>
                                                    </div>
                                                    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 text-center">
                                                        <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                            <FacultyCardIcon iconKey={view.facultyCard2Icon} className="size-8" />
                                                        </div>
                                                        <h3 className="font-bold text-[#254151] mb-2">{isAr ? view.facultyCard2TitleAr : view.facultyCard2TitleEn}</h3>
                                                        <p className="text-gray-600">{isAr ? view.facultyCard2DescAr : view.facultyCard2DescEn}</p>
                                                    </div>
                                                    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 text-center">
                                                        <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                            <FacultyCardIcon iconKey={view.facultyCard3Icon} className="size-8" />
                                                        </div>
                                                        <h3 className="font-bold text-[#254151] mb-2">{isAr ? view.facultyCard3TitleAr : view.facultyCard3TitleEn}</h3>
                                                        <p className="text-gray-600">{isAr ? view.facultyCard3DescAr : view.facultyCard3DescEn}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/foundation-faculty"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                                                    >
                                                        <Users className="size-6" />
                                                        <span>{isAr ? view.facultyButtonLabelAr : view.facultyButtonLabelEn}</span>
                                                        <ChevronLeft className="size-5" />
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {isAdmin && (
                            <div className="mb-4 flex justify-center gap-2">
                                {editingSection !== "cta" ? (
                                    <button onClick={() => startEdit("cta")} className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white">
                                        <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white">
                                            <X className="size-4" />{isAr ? "إلغاء" : "Cancel"}
                                        </button>
                                        <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-white disabled:opacity-60">
                                            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        {editingSection !== "cta" ? (
                            <>
                                <h2 className="text-3xl font-bold mb-4">{isAr ? view.ctaTitleAr : view.ctaTitleEn}</h2>
                                <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">{isAr ? view.ctaDescriptionAr : view.ctaDescriptionEn}</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/register" className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">
                                        {isAr ? view.ctaButton1LabelAr : view.ctaButton1LabelEn}
                                    </Link>
                                    <Link href="/contact" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all">
                                        {isAr ? view.ctaButton2LabelAr : view.ctaButton2LabelEn}
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="grid gap-2 max-w-2xl mx-auto">
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaTitleAr || ""} onChange={(e) => updateDraft({ ctaTitleAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaTitleEn || ""} onChange={(e) => updateDraft({ ctaTitleEn: e.target.value })} dir="ltr" />
                                <textarea className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white min-h-[80px]" value={draft?.ctaDescriptionAr || ""} onChange={(e) => updateDraft({ ctaDescriptionAr: e.target.value })} dir="rtl" />
                                <textarea className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white min-h-[80px]" value={draft?.ctaDescriptionEn || ""} onChange={(e) => updateDraft({ ctaDescriptionEn: e.target.value })} dir="ltr" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaButton1LabelAr || ""} onChange={(e) => updateDraft({ ctaButton1LabelAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaButton1LabelEn || ""} onChange={(e) => updateDraft({ ctaButton1LabelEn: e.target.value })} dir="ltr" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaButton2LabelAr || ""} onChange={(e) => updateDraft({ ctaButton2LabelAr: e.target.value })} dir="rtl" />
                                <input className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-white" value={draft?.ctaButton2LabelEn || ""} onChange={(e) => updateDraft({ ctaButton2LabelEn: e.target.value })} dir="ltr" />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}