"use client";

import Link from "next/link";
import { Loader2, Pencil, Save, X } from "lucide-react";
import { useMemo, useState } from "react";

type FoundStudyProps = {
    isAr: boolean;
    isAdmin: boolean;
    isEditing: boolean;
    saving: boolean;
    titleAr: string;
    titleEn: string;
    noteAr: string;
    noteEn: string;
    onStartEdit: () => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
    onChangeTitleAr: (value: string) => void;
    onChangeTitleEn: (value: string) => void;
    onChangeNoteAr: (value: string) => void;
    onChangeNoteEn: (value: string) => void;
    level1Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
    level2Courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>;
    onChangeLevel1Courses: (courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>) => void;
    onChangeLevel2Courses: (courses: Array<{ code: string; titleAr: string; titleEn: string; credits: number }>) => void;
};

export default function FoundStudy({
    isAr, isAdmin, isEditing, saving, titleAr, titleEn, noteAr, noteEn,
    onStartEdit, onCancelEdit, onSaveEdit, onChangeTitleAr, onChangeTitleEn, onChangeNoteAr, onChangeNoteEn,
    level1Courses, level2Courses, onChangeLevel1Courses, onChangeLevel2Courses,
}: FoundStudyProps) {
    const [activeLevel, setActiveLevel] = useState<"level1" | "level2">("level1");
    const currentCourses = useMemo(() => (activeLevel === "level1" ? level1Courses : level2Courses), [activeLevel, level1Courses, level2Courses]);
    const totalCredits = useMemo(() => currentCourses.reduce((sum, course) => sum + course.credits, 0), [currentCourses]);

    const updateCourse = (idx: number, patch: Partial<{ code: string; titleAr: string; titleEn: string; credits: number }>) => {
        const source = activeLevel === "level1" ? level1Courses : level2Courses;
        const updated = source.map((c, i) => (i === idx ? { ...c, ...patch } : c));
        if (activeLevel === "level1") onChangeLevel1Courses(updated);
        else onChangeLevel2Courses(updated);
    };

    return (
        <div id="level1" className="mb-16">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-amber-200">
                <div className="mb-8 flex items-center justify-between gap-3">
                    {!isEditing ? (
                        <h2 className="text-3xl font-bold text-[#254151] text-center">{isAr ? titleAr : titleEn}</h2>
                    ) : (
                        <div className="flex-1 grid gap-2">
                            <input className="w-full rounded-md border px-3 py-2" value={titleAr} onChange={(e) => onChangeTitleAr(e.target.value)} dir="rtl" />
                            <input className="w-full rounded-md border px-3 py-2" value={titleEn} onChange={(e) => onChangeTitleEn(e.target.value)} dir="ltr" />
                        </div>
                    )}
                    {isAdmin && !isEditing && (
                        <button onClick={onStartEdit} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
                            <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
                        </button>
                    )}
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button type="button" onClick={() => setActiveLevel("level1")} aria-pressed={activeLevel === "level1"} className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${activeLevel === "level1" ? "bg-gradient-to-r from-[#254151] to-[#6096b4] text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>المستوى الأول</button>
                    <button type="button" id="level2" onClick={() => setActiveLevel("level2")} aria-pressed={activeLevel === "level2"} className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${activeLevel === "level2" ? "bg-gradient-to-r from-[#254151] to-[#6096b4] text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>المستوى الثاني</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                                <th scope="col" className="p-4 text-right border-2 border-white">رمز المساق</th>
                                <th scope="col" className="p-4 text-right border-2 border-white">عنوان الدورة (عربي)</th>
                                <th scope="col" className="p-4 text-right border-2 border-white">عنوان الدورة (English)</th>
                                <th scope="col" className="p-4 text-center border-2 border-white">الساعات المعتمدة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => (
                                <tr key={course.code} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors`}>
                                    <td className="p-4 border-2 border-gray-200 font-mono text-blue-600 font-semibold">
                                        {!isEditing ? course.code : <input className="w-full rounded border px-2 py-1 text-sm" value={course.code} onChange={(e) => updateCourse(index, { code: e.target.value })} />}
                                    </td>
                                    <td className="p-4 border-2 border-gray-200 font-bold">
                                        {!isEditing ? course.titleAr : <input className="w-full rounded border px-2 py-1 text-sm" value={course.titleAr} onChange={(e) => updateCourse(index, { titleAr: e.target.value })} dir="rtl" />}
                                    </td>
                                    <td className="p-4 border-2 border-gray-200">
                                        {!isEditing ? course.titleEn : <input className="w-full rounded border px-2 py-1 text-sm" value={course.titleEn} onChange={(e) => updateCourse(index, { titleEn: e.target.value })} dir="ltr" />}
                                    </td>
                                    <td className="p-4 border-2 border-gray-200 text-center font-bold text-lg">
                                        {!isEditing ? course.credits : <input type="number" min={0} className="w-20 rounded border px-2 py-1 text-sm text-center" value={course.credits} onChange={(e) => updateCourse(index, { credits: Number(e.target.value || 0) })} />}
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gradient-to-r from-amber-100 to-amber-200 font-bold">
                                <td colSpan={3} className="p-4 border-2 border-gray-300 text-right text-xl">إجمالي الساعات المعتمدة</td>
                                <td className="p-4 border-2 border-gray-300 text-center text-2xl text-amber-700">{totalCredits}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold text-[#254151] mb-3 text-xl">ملاحظة:</h3>
                    {!isEditing ? (
                        <p className="text-gray-700 leading-relaxed">{isAr ? noteAr : noteEn}</p>
                    ) : (
                        <div className="grid gap-2">
                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={noteAr} onChange={(e) => onChangeNoteAr(e.target.value)} dir="rtl" />
                            <textarea className="w-full min-h-[90px] rounded-md border px-3 py-2" value={noteEn} onChange={(e) => onChangeNoteEn(e.target.value)} dir="ltr" />
                            <div className="flex justify-end gap-2 pt-2">
                                <button onClick={onCancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
                                <button onClick={onSaveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
                            </div>
                        </div>
                    )}
                </div>

                {!isEditing && activeLevel === "level1" && (
                    <div className="mt-6">
                        <Link
                            href="/main/foundation-program/level-1"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                        >
                            <span>{isAr ? "عرض التفاصيل الكاملة للمستوى الأول" : "View full details for level 1"}</span>
                        </Link>
                    </div>
                )}
                {!isEditing && activeLevel === "level2" && (
                    <div className="mt-6">
                        <Link
                            href="/main/foundation-program/level-2"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                        >
                            <span>{isAr ? "عرض التفاصيل الكاملة للمستوى الثاني" : "View full details for Level 2"}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}