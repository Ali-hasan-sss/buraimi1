"use client";

import React, { useEffect, useState } from "react";
import {
  Calculator,
  FileText,
  Target,
  Clock,
  Award,
  TrendingUp,
  CircleCheckBig,
  BookOpen,
  CircleAlert,
  Users,
  Download,
  ChevronLeft,
  Pencil,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { MathCompletionExamData } from "@/staticData/math-completion-exam";

type EditingSection = "hero" | "about" | "basicInfo" | "eligibility" | "structure" | "topics" | "retakePolicy" | "benefits" | "tips" | null;

export default function MathCompletionExamPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<MathCompletionExamData | null>(null);
  const [draft, setDraft] = useState<MathCompletionExamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true);
        const [res, meRes] = await Promise.all([
          fetch("/api/math-completion-exam", { cache: "no-store" }),
          fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
        ]);
        const json = (await res.json()) as { ok?: boolean; data?: MathCompletionExamData };
        const me = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
        if (json.ok && json.data) setData(json.data);
        setIsAdmin(Boolean(me.ok && me.isAdmin));
      } catch {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const view = draft ?? data;
  const updateDraft = (patch: Partial<MathCompletionExamData>) =>
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));

  const startEdit = (section: NonNullable<EditingSection>) => {
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
      const res = await fetch("/api/math-completion-exam", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = (await res.json()) as { ok?: boolean; data?: MathCompletionExamData };
      if (res.ok && json.ok && json.data) {
        setData(json.data);
        setDraft({ ...json.data });
        setEditingSection(null);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !view) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#254151] text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 " dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {isAdmin && editingSection !== "hero" && (
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => startEdit("hero")}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <Pencil className="size-4" />
                  {isAr ? "تعديل" : "Edit"}
                </button>
              </div>
            )}
            {isAdmin && editingSection === "hero" && (
              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Check className="size-4" />
                  {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <X className="size-4" />
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
              </div>
            )}
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                <Calculator className="size-16" />
              </div>
            </div>
            {editingSection === "hero" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={draft?.heroTitleAr ?? ""}
                  onChange={(e) => updateDraft({ heroTitleAr: e.target.value })}
                  className="w-full text-5xl font-bold mb-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded px-4 py-2 text-center"
                  placeholder="العنوان بالعربية"
                />
                <input
                  type="text"
                  value={draft?.heroTitleEn ?? ""}
                  onChange={(e) => updateDraft({ heroTitleEn: e.target.value })}
                  className="w-full text-2xl font-bold mb-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded px-4 py-2 text-center"
                  placeholder="Title in English"
                />
                <input
                  type="text"
                  value={draft?.heroSubtitleAr ?? ""}
                  onChange={(e) => updateDraft({ heroSubtitleAr: e.target.value })}
                  className="w-full text-xl bg-white/20 text-white placeholder-white/70 border border-white/30 rounded px-4 py-2 text-center"
                  placeholder="العنوان الفرعي بالعربية"
                />
                <input
                  type="text"
                  value={draft?.heroSubtitleEn ?? ""}
                  onChange={(e) => updateDraft({ heroSubtitleEn: e.target.value })}
                  className="w-full text-lg bg-white/20 text-white placeholder-white/70 border border-white/30 rounded px-4 py-2 text-center"
                  placeholder="Subtitle in English"
                />
              </div>
            ) : (
              <>
                <h1 className="text-5xl font-bold mb-4">{isAr ? view.heroTitleAr : view.heroTitleEn}</h1>
                <h2 className="text-2xl font-bold mb-6 opacity-90">{isAr ? view.heroSubtitleAr : view.heroSubtitleEn}</h2>
                <p className="text-xl opacity-95">{isAr ? "امتحان الخروج من البرنامج التأسيسي للرياضيات" : "Foundation Program Mathematics Exit Exam"}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* About Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200 relative">
              {isAdmin && editingSection !== "about" && (
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => startEdit("about")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "about" && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 text-white p-4 rounded-full">
                  <FileText className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.aboutTitleAr : view.aboutTitleEn}</h2>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 border-2 border-purple-200">
                {editingSection === "about" ? (
                  <div className="space-y-4">
                    <textarea
                      value={draft?.aboutDescriptionAr ?? ""}
                      onChange={(e) => updateDraft({ aboutDescriptionAr: e.target.value })}
                      className="w-full text-lg bg-white text-gray-700 border border-purple-300 rounded px-4 py-2"
                      rows={3}
                      placeholder="الوصف بالعربية"
                    />
                    <textarea
                      value={draft?.aboutDescriptionEn ?? ""}
                      onChange={(e) => updateDraft({ aboutDescriptionEn: e.target.value })}
                      className="w-full text-lg bg-white text-gray-700 border border-purple-300 rounded px-4 py-2"
                      rows={3}
                      placeholder="Description in English"
                    />
                    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-300 mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Target className="size-8 text-purple-600" />
                        <input
                          type="text"
                          value={draft?.aboutGoalTitleAr ?? ""}
                          onChange={(e) => updateDraft({ aboutGoalTitleAr: e.target.value })}
                          className="flex-1 text-lg font-bold bg-white text-[#254151] border border-purple-300 rounded px-3 py-2"
                          placeholder="عنوان الهدف بالعربية"
                        />
                      </div>
                      <textarea
                        value={draft?.aboutGoalTextAr ?? ""}
                        onChange={(e) => updateDraft({ aboutGoalTextAr: e.target.value })}
                        className="w-full text-base bg-white text-gray-700 border border-purple-300 rounded px-3 py-2"
                        rows={2}
                        placeholder="نص الهدف بالعربية"
                      />
                      <input
                        type="text"
                        value={draft?.aboutGoalTitleEn ?? ""}
                        onChange={(e) => updateDraft({ aboutGoalTitleEn: e.target.value })}
                        className="w-full text-lg font-bold bg-white text-[#254151] border border-purple-300 rounded px-3 py-2 mt-4"
                        placeholder="Goal Title in English"
                      />
                      <textarea
                        value={draft?.aboutGoalTextEn ?? ""}
                        onChange={(e) => updateDraft({ aboutGoalTextEn: e.target.value })}
                        className="w-full text-base bg-white text-gray-700 border border-purple-300 rounded px-3 py-2 mt-2"
                        rows={2}
                        placeholder="Goal text in English"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 text-xl leading-relaxed mb-4">{isAr ? view.aboutDescriptionAr : view.aboutDescriptionEn}</p>
                    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-300">
                      <div className="flex items-center gap-3">
                        <Target className="size-8 text-purple-600" />
                        <div>
                          <h3 className="font-bold text-[#254151] text-xl mb-1">{isAr ? view.aboutGoalTitleAr : view.aboutGoalTitleEn}</h3>
                          <p className="text-gray-700">{isAr ? view.aboutGoalTextAr : view.aboutGoalTextEn}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info Cards */}
          <div className="mb-12 relative">
            {isAdmin && editingSection !== "basicInfo" && (
              <div className="absolute top-0 left-0 z-10">
                <button
                  onClick={() => startEdit("basicInfo")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <Pencil className="size-4" />
                  {isAr ? "تعديل" : "Edit"}
                </button>
              </div>
            )}
            {isAdmin && editingSection === "basicInfo" && (
              <div className="absolute top-0 left-0 z-10 flex gap-2">
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Check className="size-4" />
                  {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <X className="size-4" />
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
              </div>
            )}
            <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">{isAr ? "معلومات الامتحان الأساسية" : "Basic Exam Information"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Duration Card */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-200 hover:shadow-2xl transition-all">
                <div className="bg-blue-600 text-white size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="size-10" />
                </div>
                {editingSection === "basicInfo" ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={draft?.durationLabelAr ?? ""}
                      onChange={(e) => updateDraft({ durationLabelAr: e.target.value })}
                      className="w-full text-lg font-bold text-[#254151] text-center border border-blue-300 rounded px-2 py-1"
                      placeholder="Label AR"
                    />
                    <input
                      type="text"
                      value={draft?.durationLabelEn ?? ""}
                      onChange={(e) => updateDraft({ durationLabelEn: e.target.value })}
                      className="w-full text-sm text-[#254151] text-center border border-blue-300 rounded px-2 py-1"
                      placeholder="Label EN"
                    />
                    <input
                      type="text"
                      value={draft?.durationValueAr ?? ""}
                      onChange={(e) => updateDraft({ durationValueAr: e.target.value })}
                      className="w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold text-2xl border border-blue-600"
                      placeholder="Value AR"
                    />
                    <input
                      type="text"
                      value={draft?.durationValueEn ?? ""}
                      onChange={(e) => updateDraft({ durationValueEn: e.target.value })}
                      className="w-full bg-blue-600 text-white text-center py-1 rounded-lg font-bold text-sm border border-blue-600"
                      placeholder="Value EN"
                    />
                    <input
                      type="text"
                      value={draft?.durationNoteAr ?? ""}
                      onChange={(e) => updateDraft({ durationNoteAr: e.target.value })}
                      className="w-full text-sm text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note AR"
                    />
                    <input
                      type="text"
                      value={draft?.durationNoteEn ?? ""}
                      onChange={(e) => updateDraft({ durationNoteEn: e.target.value })}
                      className="w-full text-xs text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note EN"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[#254151] text-xl text-center mb-2">{isAr ? view.durationLabelAr : view.durationLabelEn}</h3>
                    <div className="bg-blue-600 text-white text-center py-4 rounded-lg font-bold text-3xl mb-3">{isAr ? view.durationValueAr : view.durationValueEn}</div>
                    <p className="text-gray-700 text-center">{isAr ? view.durationNoteAr : view.durationNoteEn}</p>
                  </>
                )}
              </div>

              {/* Pass Mark Card */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-green-200 hover:shadow-2xl transition-all">
                <div className="bg-green-600 text-white size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="size-10" />
                </div>
                {editingSection === "basicInfo" ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={draft?.passMarkLabelAr ?? ""}
                      onChange={(e) => updateDraft({ passMarkLabelAr: e.target.value })}
                      className="w-full text-lg font-bold text-[#254151] text-center border border-green-300 rounded px-2 py-1"
                      placeholder="Label AR"
                    />
                    <input
                      type="text"
                      value={draft?.passMarkLabelEn ?? ""}
                      onChange={(e) => updateDraft({ passMarkLabelEn: e.target.value })}
                      className="w-full text-sm text-[#254151] text-center border border-green-300 rounded px-2 py-1"
                      placeholder="Label EN"
                    />
                    <input
                      type="text"
                      value={draft?.passMarkValueAr ?? ""}
                      onChange={(e) => updateDraft({ passMarkValueAr: e.target.value })}
                      className="w-full bg-green-600 text-white text-center py-3 rounded-lg font-bold text-2xl border border-green-600"
                      placeholder="Value AR"
                    />
                    <input
                      type="text"
                      value={draft?.passMarkValueEn ?? ""}
                      onChange={(e) => updateDraft({ passMarkValueEn: e.target.value })}
                      className="w-full bg-green-600 text-white text-center py-1 rounded-lg font-bold text-sm border border-green-600"
                      placeholder="Value EN"
                    />
                    <input
                      type="text"
                      value={draft?.passMarkNoteAr ?? ""}
                      onChange={(e) => updateDraft({ passMarkNoteAr: e.target.value })}
                      className="w-full text-sm text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note AR"
                    />
                    <input
                      type="text"
                      value={draft?.passMarkNoteEn ?? ""}
                      onChange={(e) => updateDraft({ passMarkNoteEn: e.target.value })}
                      className="w-full text-xs text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note EN"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[#254151] text-xl text-center mb-2">{isAr ? view.passMarkLabelAr : view.passMarkLabelEn}</h3>
                    <div className="bg-green-600 text-white text-center py-4 rounded-lg font-bold text-3xl mb-3">{isAr ? view.passMarkValueAr : view.passMarkValueEn}</div>
                    <p className="text-gray-700 text-center">{isAr ? view.passMarkNoteAr : view.passMarkNoteEn}</p>
                  </>
                )}
              </div>

              {/* Retake Card */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-amber-200 hover:shadow-2xl transition-all">
                <div className="bg-amber-600 text-white size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="size-10" />
                </div>
                {editingSection === "basicInfo" ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={draft?.retakeLabelAr ?? ""}
                      onChange={(e) => updateDraft({ retakeLabelAr: e.target.value })}
                      className="w-full text-lg font-bold text-[#254151] text-center border border-amber-300 rounded px-2 py-1"
                      placeholder="Label AR"
                    />
                    <input
                      type="text"
                      value={draft?.retakeLabelEn ?? ""}
                      onChange={(e) => updateDraft({ retakeLabelEn: e.target.value })}
                      className="w-full text-sm text-[#254151] text-center border border-amber-300 rounded px-2 py-1"
                      placeholder="Label EN"
                    />
                    <input
                      type="text"
                      value={draft?.retakeValueAr ?? ""}
                      onChange={(e) => updateDraft({ retakeValueAr: e.target.value })}
                      className="w-full bg-amber-600 text-white text-center py-3 rounded-lg font-bold text-2xl border border-amber-600"
                      placeholder="Value AR"
                    />
                    <input
                      type="text"
                      value={draft?.retakeValueEn ?? ""}
                      onChange={(e) => updateDraft({ retakeValueEn: e.target.value })}
                      className="w-full bg-amber-600 text-white text-center py-1 rounded-lg font-bold text-sm border border-amber-600"
                      placeholder="Value EN"
                    />
                    <input
                      type="text"
                      value={draft?.retakeNoteAr ?? ""}
                      onChange={(e) => updateDraft({ retakeNoteAr: e.target.value })}
                      className="w-full text-sm text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note AR"
                    />
                    <input
                      type="text"
                      value={draft?.retakeNoteEn ?? ""}
                      onChange={(e) => updateDraft({ retakeNoteEn: e.target.value })}
                      className="w-full text-xs text-gray-700 text-center border border-gray-300 rounded px-2 py-1"
                      placeholder="Note EN"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[#254151] text-xl text-center mb-2">{isAr ? view.retakeLabelAr : view.retakeLabelEn}</h3>
                    <div className="bg-amber-600 text-white text-center py-4 rounded-lg font-bold text-3xl mb-3">{isAr ? view.retakeValueAr : view.retakeValueEn}</div>
                    <p className="text-gray-700 text-center">{isAr ? view.retakeNoteAr : view.retakeNoteEn}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Eligibility Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-green-200 relative">
              {isAdmin && editingSection !== "eligibility" && (
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => startEdit("eligibility")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "eligibility" && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-600 text-white p-4 rounded-full">
                  <CircleCheckBig className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.eligibilityTitleAr : view.eligibilityTitleEn}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Applied Math Card */}
                <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
                  <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="size-8" />
                  </div>
                  {editingSection === "eligibility" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={draft?.eligibilityAppliedMathTitleAr ?? ""}
                        onChange={(e) => updateDraft({ eligibilityAppliedMathTitleAr: e.target.value })}
                        className="w-full font-bold text-[#254151] text-xl border border-blue-300 rounded px-2 py-1"
                        placeholder="Title AR"
                      />
                      <input
                        type="text"
                        value={draft?.eligibilityAppliedMathTitleEn ?? ""}
                        onChange={(e) => updateDraft({ eligibilityAppliedMathTitleEn: e.target.value })}
                        className="w-full font-bold text-[#254151] text-sm border border-blue-300 rounded px-2 py-1"
                        placeholder="Title EN"
                      />
                      <textarea
                        value={draft?.eligibilityAppliedMathDescAr ?? ""}
                        onChange={(e) => updateDraft({ eligibilityAppliedMathDescAr: e.target.value })}
                        className="w-full text-gray-700 border border-blue-300 rounded px-2 py-1"
                        rows={3}
                        placeholder="Description AR"
                      />
                      <textarea
                        value={draft?.eligibilityAppliedMathDescEn ?? ""}
                        onChange={(e) => updateDraft({ eligibilityAppliedMathDescEn: e.target.value })}
                        className="w-full text-gray-700 text-sm border border-blue-300 rounded px-2 py-1"
                        rows={2}
                        placeholder="Description EN"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-[#254151] text-xl mb-3">{isAr ? view.eligibilityAppliedMathTitleAr : view.eligibilityAppliedMathTitleEn}</h3>
                      <p className="text-gray-700 leading-relaxed">{isAr ? view.eligibilityAppliedMathDescAr : view.eligibilityAppliedMathDescEn}</p>
                    </>
                  )}
                </div>

                {/* Pure Math Card */}
                <div className="bg-purple-50 rounded-lg p-8 border-2 border-purple-200">
                  <div className="bg-purple-600 text-white size-16 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="size-8" />
                  </div>
                  {editingSection === "eligibility" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={draft?.eligibilityPureMathTitleAr ?? ""}
                        onChange={(e) => updateDraft({ eligibilityPureMathTitleAr: e.target.value })}
                        className="w-full font-bold text-[#254151] text-xl border border-purple-300 rounded px-2 py-1"
                        placeholder="Title AR"
                      />
                      <input
                        type="text"
                        value={draft?.eligibilityPureMathTitleEn ?? ""}
                        onChange={(e) => updateDraft({ eligibilityPureMathTitleEn: e.target.value })}
                        className="w-full font-bold text-[#254151] text-sm border border-purple-300 rounded px-2 py-1"
                        placeholder="Title EN"
                      />
                      <textarea
                        value={draft?.eligibilityPureMathDescAr ?? ""}
                        onChange={(e) => updateDraft({ eligibilityPureMathDescAr: e.target.value })}
                        className="w-full text-gray-700 border border-purple-300 rounded px-2 py-1"
                        rows={3}
                        placeholder="Description AR"
                      />
                      <textarea
                        value={draft?.eligibilityPureMathDescEn ?? ""}
                        onChange={(e) => updateDraft({ eligibilityPureMathDescEn: e.target.value })}
                        className="w-full text-gray-700 text-sm border border-purple-300 rounded px-2 py-1"
                        rows={2}
                        placeholder="Description EN"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-[#254151] text-xl mb-3">{isAr ? view.eligibilityPureMathTitleAr : view.eligibilityPureMathTitleEn}</h3>
                      <p className="text-gray-700 leading-relaxed">{isAr ? view.eligibilityPureMathDescAr : view.eligibilityPureMathDescEn}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <CircleAlert className="size-8 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    {editingSection === "eligibility" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={draft?.eligibilityNoteTitleAr ?? ""}
                          onChange={(e) => updateDraft({ eligibilityNoteTitleAr: e.target.value })}
                          className="w-full font-bold text-[#254151] text-xl border border-green-300 rounded px-2 py-1"
                          placeholder="Note Title AR"
                        />
                        <input
                          type="text"
                          value={draft?.eligibilityNoteTitleEn ?? ""}
                          onChange={(e) => updateDraft({ eligibilityNoteTitleEn: e.target.value })}
                          className="w-full font-bold text-[#254151] text-sm border border-green-300 rounded px-2 py-1"
                          placeholder="Note Title EN"
                        />
                        <textarea
                          value={draft?.eligibilityNoteTextAr ?? ""}
                          onChange={(e) => updateDraft({ eligibilityNoteTextAr: e.target.value })}
                          className="w-full text-gray-700 border border-green-300 rounded px-2 py-1"
                          rows={3}
                          placeholder="Note Text AR"
                        />
                        <textarea
                          value={draft?.eligibilityNoteTextEn ?? ""}
                          onChange={(e) => updateDraft({ eligibilityNoteTextEn: e.target.value })}
                          className="w-full text-gray-700 text-sm border border-green-300 rounded px-2 py-1"
                          rows={2}
                          placeholder="Note Text EN"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? view.eligibilityNoteTitleAr : view.eligibilityNoteTitleEn}</h3>
                        <p className="text-gray-700 leading-relaxed">{isAr ? view.eligibilityNoteTextAr : view.eligibilityNoteTextEn}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Structure */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200 relative">
              {isAdmin && editingSection !== "structure" && (
                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => startEdit("structure")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "structure" && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <BookOpen className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.structureTitleAr : view.structureTitleEn}</h2>
              </div>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="p-4 text-right border-2 border-white">{isAr ? view.structureHeaderSectionAr : view.structureHeaderSectionEn}</th>
                      <th className="p-4 text-right border-2 border-white">{isAr ? view.structureHeaderTypeAr : view.structureHeaderTypeEn}</th>
                      <th className="p-4 text-center border-2 border-white">{isAr ? view.structureHeaderCountAr : view.structureHeaderCountEn}</th>
                      <th className="p-4 text-center border-2 border-white">{isAr ? view.structureHeaderMarksAr : view.structureHeaderMarksEn}</th>
                      <th className="p-4 text-center border-2 border-white">{isAr ? view.structureHeaderPercentAr : view.structureHeaderPercentEn}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b hover:bg-blue-50 transition-colors bg-gray-50">
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow1SectionAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow1SectionAr: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow1SectionEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow1SectionEn: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-[#254151]">{isAr ? view.structureRow1SectionAr : view.structureRow1SectionEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow1TypeAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow1TypeAr: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow1TypeEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow1TypeEn: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          isAr ? view.structureRow1TypeAr : view.structureRow1TypeEn
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow1CountAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow1CountAr: e.target.value })}
                              className="w-full text-center font-semibold border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow1CountEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow1CountEn: e.target.value })}
                              className="w-full text-center border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold">{isAr ? view.structureRow1CountAr : view.structureRow1CountEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow1MarksAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow1MarksAr: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow1MarksEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow1MarksEn: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold inline-block">{isAr ? view.structureRow1MarksAr : view.structureRow1MarksEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow1PercentAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow1PercentAr: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow1PercentEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow1PercentEn: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-blue-700">{isAr ? view.structureRow1PercentAr : view.structureRow1PercentEn}</span>
                        )}
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="border-b hover:bg-blue-50 transition-colors bg-white">
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow2SectionAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow2SectionAr: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow2SectionEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow2SectionEn: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-[#254151]">{isAr ? view.structureRow2SectionAr : view.structureRow2SectionEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow2TypeAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow2TypeAr: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow2TypeEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow2TypeEn: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          isAr ? view.structureRow2TypeAr : view.structureRow2TypeEn
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow2CountAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow2CountAr: e.target.value })}
                              className="w-full text-center font-semibold border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow2CountEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow2CountEn: e.target.value })}
                              className="w-full text-center border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold">{isAr ? view.structureRow2CountAr : view.structureRow2CountEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow2MarksAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow2MarksAr: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow2MarksEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow2MarksEn: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold inline-block">{isAr ? view.structureRow2MarksAr : view.structureRow2MarksEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow2PercentAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow2PercentAr: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow2PercentEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow2PercentEn: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-blue-700">{isAr ? view.structureRow2PercentAr : view.structureRow2PercentEn}</span>
                        )}
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="border-b hover:bg-blue-50 transition-colors bg-gray-50">
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow3SectionAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow3SectionAr: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow3SectionEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow3SectionEn: e.target.value })}
                              className="w-full font-bold text-[#254151] border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-[#254151]">{isAr ? view.structureRow3SectionAr : view.structureRow3SectionEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow3TypeAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow3TypeAr: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow3TypeEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow3TypeEn: e.target.value })}
                              className="w-full border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          isAr ? view.structureRow3TypeAr : view.structureRow3TypeEn
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow3CountAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow3CountAr: e.target.value })}
                              className="w-full text-center font-semibold border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow3CountEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow3CountEn: e.target.value })}
                              className="w-full text-center border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold">{isAr ? view.structureRow3CountAr : view.structureRow3CountEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow3MarksAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow3MarksAr: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow3MarksEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow3MarksEn: e.target.value })}
                              className="w-full text-center bg-blue-600 text-white font-bold border border-blue-600 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold inline-block">{isAr ? view.structureRow3MarksAr : view.structureRow3MarksEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-200 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureRow3PercentAr ?? ""}
                              onChange={(e) => updateDraft({ structureRow3PercentAr: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureRow3PercentEn ?? ""}
                              onChange={(e) => updateDraft({ structureRow3PercentEn: e.target.value })}
                              className="w-full text-center font-bold text-blue-700 border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-blue-700">{isAr ? view.structureRow3PercentAr : view.structureRow3PercentEn}</span>
                        )}
                      </td>
                    </tr>
                    {/* Total Row */}
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-200 font-bold">
                      <td colSpan={3} className="p-2 border-2 border-gray-300 text-right">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureTotalLabelAr ?? ""}
                              onChange={(e) => updateDraft({ structureTotalLabelAr: e.target.value })}
                              className="w-full text-right text-xl font-bold text-[#254151] border border-blue-300 rounded px-2 py-1"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureTotalLabelEn ?? ""}
                              onChange={(e) => updateDraft({ structureTotalLabelEn: e.target.value })}
                              className="w-full text-right text-sm font-bold text-[#254151] border border-blue-300 rounded px-2 py-1"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="text-xl">{isAr ? view.structureTotalLabelAr : view.structureTotalLabelEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-300 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureTotalMarksAr ?? ""}
                              onChange={(e) => updateDraft({ structureTotalMarksAr: e.target.value })}
                              className="w-full text-center bg-blue-700 text-white font-bold border border-blue-700 rounded px-2 py-1 text-xl"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureTotalMarksEn ?? ""}
                              onChange={(e) => updateDraft({ structureTotalMarksEn: e.target.value })}
                              className="w-full text-center bg-blue-700 text-white font-bold border border-blue-700 rounded px-2 py-1 text-sm"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-xl inline-block">{isAr ? view.structureTotalMarksAr : view.structureTotalMarksEn}</span>
                        )}
                      </td>
                      <td className="p-2 border-2 border-gray-300 text-center">
                        {editingSection === "structure" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={draft?.structureTotalPercentAr ?? ""}
                              onChange={(e) => updateDraft({ structureTotalPercentAr: e.target.value })}
                              className="w-full text-center text-xl font-bold text-blue-700 border border-blue-300 rounded px-2 py-1"
                              placeholder="AR"
                            />
                            <input
                              type="text"
                              value={draft?.structureTotalPercentEn ?? ""}
                              onChange={(e) => updateDraft({ structureTotalPercentEn: e.target.value })}
                              className="w-full text-center text-sm font-bold text-blue-700 border border-blue-300 rounded px-2 py-1"
                              placeholder="EN"
                            />
                          </div>
                        ) : (
                          <span className="text-xl text-blue-700">{isAr ? view.structureTotalPercentAr : view.structureTotalPercentEn}</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Note */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                {editingSection === "structure" ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={draft?.structureNoteLabelAr ?? ""}
                        onChange={(e) => updateDraft({ structureNoteLabelAr: e.target.value })}
                        className="font-bold text-lg bg-white text-gray-700 border border-blue-300 rounded px-2 py-1"
                        placeholder="ملاحظة AR"
                      />
                      <input
                        type="text"
                        value={draft?.structureNoteLabelEn ?? ""}
                        onChange={(e) => updateDraft({ structureNoteLabelEn: e.target.value })}
                        className="font-bold text-sm bg-white text-gray-700 border border-blue-300 rounded px-2 py-1"
                        placeholder="Note EN"
                      />
                    </div>
                    <textarea
                      value={draft?.structureNoteTextAr ?? ""}
                      onChange={(e) => updateDraft({ structureNoteTextAr: e.target.value })}
                      className="w-full text-base bg-white text-gray-700 border border-blue-300 rounded px-3 py-2"
                      rows={2}
                      placeholder="نص الملاحظة AR"
                    />
                    <textarea
                      value={draft?.structureNoteTextEn ?? ""}
                      onChange={(e) => updateDraft({ structureNoteTextEn: e.target.value })}
                      className="w-full text-sm bg-white text-gray-700 border border-blue-300 rounded px-3 py-2"
                      rows={2}
                      placeholder="Note text EN"
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 text-lg">
                    <strong>{isAr ? view.structureNoteLabelAr : view.structureNoteLabelEn}:</strong> {isAr ? view.structureNoteTextAr : view.structureNoteTextEn}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Topics Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200 relative">
              {isAdmin && editingSection !== "topics" && (
                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => startEdit("topics")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "topics" && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-indigo-600 text-white p-4 rounded-full">
                  <Target className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.topicsTitleAr : view.topicsTitleEn}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 - Algebra (blue) */}
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  {editingSection === "topics" ? (
                    <div className="space-y-2 mb-4 pb-3 border-b-2 border-blue-300">
                      <input
                        type="text"
                        value={draft?.topicsCard1TitleAr ?? ""}
                        onChange={(e) => updateDraft({ topicsCard1TitleAr: e.target.value })}
                        className="w-full text-2xl font-bold text-[#254151] bg-white border border-blue-300 rounded px-3 py-2"
                        placeholder="عنوان البطاقة AR"
                      />
                      <input
                        type="text"
                        value={draft?.topicsCard1TitleEn ?? ""}
                        onChange={(e) => updateDraft({ topicsCard1TitleEn: e.target.value })}
                        className="w-full text-lg font-bold text-[#254151] bg-white border border-blue-300 rounded px-3 py-1"
                        placeholder="Card Title EN"
                      />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 pb-3 border-b-2 border-blue-300">{isAr ? view.topicsCard1TitleAr : view.topicsCard1TitleEn}</h3>
                  )}
                  <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleCheckBig className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        {editingSection === "topics" ? (
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={draft?.[`topicsCard1Item${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard1Item${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-blue-300 rounded px-2 py-1 text-sm"
                              placeholder={`العنصر ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`topicsCard1Item${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard1Item${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-blue-300 rounded px-2 py-1 text-xs"
                              placeholder={`Item ${i} EN`}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-700">{isAr ? view[`topicsCard1Item${i}Ar` as keyof MathCompletionExamData] : view[`topicsCard1Item${i}En` as keyof MathCompletionExamData]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Card 2 - Geometry (green) */}
                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                  {editingSection === "topics" ? (
                    <div className="space-y-2 mb-4 pb-3 border-b-2 border-green-300">
                      <input
                        type="text"
                        value={draft?.topicsCard2TitleAr ?? ""}
                        onChange={(e) => updateDraft({ topicsCard2TitleAr: e.target.value })}
                        className="w-full text-2xl font-bold text-[#254151] bg-white border border-green-300 rounded px-3 py-2"
                        placeholder="عنوان البطاقة AR"
                      />
                      <input
                        type="text"
                        value={draft?.topicsCard2TitleEn ?? ""}
                        onChange={(e) => updateDraft({ topicsCard2TitleEn: e.target.value })}
                        className="w-full text-lg font-bold text-[#254151] bg-white border border-green-300 rounded px-3 py-1"
                        placeholder="Card Title EN"
                      />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 pb-3 border-b-2 border-green-300">{isAr ? view.topicsCard2TitleAr : view.topicsCard2TitleEn}</h3>
                  )}
                  <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleCheckBig className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                        {editingSection === "topics" ? (
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={draft?.[`topicsCard2Item${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard2Item${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-green-300 rounded px-2 py-1 text-sm"
                              placeholder={`العنصر ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`topicsCard2Item${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard2Item${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-green-300 rounded px-2 py-1 text-xs"
                              placeholder={`Item ${i} EN`}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-700">{isAr ? view[`topicsCard2Item${i}Ar` as keyof MathCompletionExamData] : view[`topicsCard2Item${i}En` as keyof MathCompletionExamData]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Card 3 - Statistics (purple) */}
                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                  {editingSection === "topics" ? (
                    <div className="space-y-2 mb-4 pb-3 border-b-2 border-purple-300">
                      <input
                        type="text"
                        value={draft?.topicsCard3TitleAr ?? ""}
                        onChange={(e) => updateDraft({ topicsCard3TitleAr: e.target.value })}
                        className="w-full text-2xl font-bold text-[#254151] bg-white border border-purple-300 rounded px-3 py-2"
                        placeholder="عنوان البطاقة AR"
                      />
                      <input
                        type="text"
                        value={draft?.topicsCard3TitleEn ?? ""}
                        onChange={(e) => updateDraft({ topicsCard3TitleEn: e.target.value })}
                        className="w-full text-lg font-bold text-[#254151] bg-white border border-purple-300 rounded px-3 py-1"
                        placeholder="Card Title EN"
                      />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 pb-3 border-b-2 border-purple-300">{isAr ? view.topicsCard3TitleAr : view.topicsCard3TitleEn}</h3>
                  )}
                  <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleCheckBig className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        {editingSection === "topics" ? (
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={draft?.[`topicsCard3Item${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard3Item${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-purple-300 rounded px-2 py-1 text-sm"
                              placeholder={`العنصر ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`topicsCard3Item${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard3Item${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-purple-300 rounded px-2 py-1 text-xs"
                              placeholder={`Item ${i} EN`}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-700">{isAr ? view[`topicsCard3Item${i}Ar` as keyof MathCompletionExamData] : view[`topicsCard3Item${i}En` as keyof MathCompletionExamData]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Card 4 - Calculus (amber) */}
                <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200">
                  {editingSection === "topics" ? (
                    <div className="space-y-2 mb-4 pb-3 border-b-2 border-amber-300">
                      <input
                        type="text"
                        value={draft?.topicsCard4TitleAr ?? ""}
                        onChange={(e) => updateDraft({ topicsCard4TitleAr: e.target.value })}
                        className="w-full text-2xl font-bold text-[#254151] bg-white border border-amber-300 rounded px-3 py-2"
                        placeholder="عنوان البطاقة AR"
                      />
                      <input
                        type="text"
                        value={draft?.topicsCard4TitleEn ?? ""}
                        onChange={(e) => updateDraft({ topicsCard4TitleEn: e.target.value })}
                        className="w-full text-lg font-bold text-[#254151] bg-white border border-amber-300 rounded px-3 py-1"
                        placeholder="Card Title EN"
                      />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 pb-3 border-b-2 border-amber-300">{isAr ? view.topicsCard4TitleAr : view.topicsCard4TitleEn}</h3>
                  )}
                  <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleCheckBig className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        {editingSection === "topics" ? (
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={draft?.[`topicsCard4Item${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard4Item${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-amber-300 rounded px-2 py-1 text-sm"
                              placeholder={`العنصر ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`topicsCard4Item${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`topicsCard4Item${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-amber-300 rounded px-2 py-1 text-xs"
                              placeholder={`Item ${i} EN`}
                            />
                          </div>
                        ) : (
                          <span className="text-gray-700">{isAr ? view[`topicsCard4Item${i}Ar` as keyof MathCompletionExamData] : view[`topicsCard4Item${i}En` as keyof MathCompletionExamData]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Retake Policy */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-orange-200 relative">
              {isAdmin && editingSection !== "retakePolicy" && (
                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => startEdit("retakePolicy")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "retakePolicy" && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-600 text-white p-4 rounded-full">
                  <TrendingUp className="size-8" />
                </div>
                {editingSection === "retakePolicy" ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={draft?.retakePolicyTitleAr ?? ""}
                      onChange={(e) => updateDraft({ retakePolicyTitleAr: e.target.value })}
                      className="w-full text-3xl font-bold text-[#254151] bg-white border border-orange-300 rounded px-3 py-2"
                      placeholder="عنوان القسم AR"
                    />
                    <input
                      type="text"
                      value={draft?.retakePolicyTitleEn ?? ""}
                      onChange={(e) => updateDraft({ retakePolicyTitleEn: e.target.value })}
                      className="w-full text-xl font-bold text-[#254151] bg-white border border-orange-300 rounded px-3 py-1"
                      placeholder="Section Title EN"
                    />
                  </div>
                ) : (
                  <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.retakePolicyTitleAr : view.retakePolicyTitleEn}</h2>
                )}
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 border-2 border-orange-200">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md border-r-4 border-orange-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-600 text-white size-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">{i}</div>
                        {editingSection === "retakePolicy" ? (
                          <div className="flex-1 space-y-2">
                            <textarea
                              value={draft?.[`retakePolicyItem${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`retakePolicyItem${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-orange-300 rounded px-3 py-2 text-lg leading-relaxed resize-y min-h-[80px]"
                              placeholder={`العنصر ${i} AR`}
                            />
                            <textarea
                              value={draft?.[`retakePolicyItem${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`retakePolicyItem${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 border border-orange-300 rounded px-3 py-2 text-base leading-relaxed resize-y min-h-[60px]"
                              placeholder={`Item ${i} EN`}
                            />
                          </div>
                        ) : (
                          <p className="text-gray-700 text-lg leading-relaxed pt-1">{isAr ? view[`retakePolicyItem${i}Ar` as keyof MathCompletionExamData] : view[`retakePolicyItem${i}En` as keyof MathCompletionExamData]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <div className="flex items-start gap-3">
                  <CircleAlert className="size-8 text-orange-600 flex-shrink-0" />
                  <div className="flex-1">
                    {editingSection === "retakePolicy" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={draft?.retakePolicyNoteTitleAr ?? ""}
                          onChange={(e) => updateDraft({ retakePolicyNoteTitleAr: e.target.value })}
                          className="w-full font-bold text-[#254151] text-xl bg-white border border-orange-300 rounded px-3 py-2"
                          placeholder="عنوان التنبيه AR"
                        />
                        <input
                          type="text"
                          value={draft?.retakePolicyNoteTitleEn ?? ""}
                          onChange={(e) => updateDraft({ retakePolicyNoteTitleEn: e.target.value })}
                          className="w-full font-bold text-[#254151] text-lg bg-white border border-orange-300 rounded px-3 py-1"
                          placeholder="Note Title EN"
                        />
                        <textarea
                          value={draft?.retakePolicyNoteTextAr ?? ""}
                          onChange={(e) => updateDraft({ retakePolicyNoteTextAr: e.target.value })}
                          className="w-full bg-white text-gray-700 leading-relaxed border border-orange-300 rounded px-3 py-2 resize-y min-h-[80px]"
                          placeholder="نص التنبيه AR"
                        />
                        <textarea
                          value={draft?.retakePolicyNoteTextEn ?? ""}
                          onChange={(e) => updateDraft({ retakePolicyNoteTextEn: e.target.value })}
                          className="w-full bg-white text-gray-700 leading-relaxed border border-orange-300 rounded px-3 py-2 text-sm resize-y min-h-[60px]"
                          placeholder="Note Text EN"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? view.retakePolicyNoteTitleAr : view.retakePolicyNoteTitleEn}</h3>
                        <p className="text-gray-700 leading-relaxed">{isAr ? view.retakePolicyNoteTextAr : view.retakePolicyNoteTextEn}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-teal-200 relative">
              {isAdmin && editingSection !== "benefits" && (
                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => startEdit("benefits")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "benefits" && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-teal-600 text-white p-4 rounded-full">
                  <Award className="size-8" />
                </div>
                {editingSection === "benefits" ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={draft?.benefitsTitleAr ?? ""}
                      onChange={(e) => updateDraft({ benefitsTitleAr: e.target.value })}
                      className="w-full text-3xl font-bold text-[#254151] bg-white border border-teal-300 rounded px-3 py-2"
                      placeholder="عنوان القسم AR"
                    />
                    <input
                      type="text"
                      value={draft?.benefitsTitleEn ?? ""}
                      onChange={(e) => updateDraft({ benefitsTitleEn: e.target.value })}
                      className="w-full text-xl font-bold text-[#254151] bg-white border border-teal-300 rounded px-3 py-1"
                      placeholder="Section Title EN"
                    />
                  </div>
                ) : (
                  <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.benefitsTitleAr : view.benefitsTitleEn}</h2>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-teal-50 p-6 rounded-lg border-2 border-teal-200">
                    <div className="flex items-start gap-3">
                      <CircleCheckBig className="size-6 text-teal-600 flex-shrink-0 mt-0.5" />
                      {editingSection === "benefits" ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={draft?.[`benefitsItem${i}Ar` as keyof MathCompletionExamData] ?? ""}
                            onChange={(e) => updateDraft({ [`benefitsItem${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                            className="w-full bg-white text-gray-700 border border-teal-300 rounded px-2 py-1 text-sm font-semibold"
                            placeholder={`العنصر ${i} AR`}
                          />
                          <input
                            type="text"
                            value={draft?.[`benefitsItem${i}En` as keyof MathCompletionExamData] ?? ""}
                            onChange={(e) => updateDraft({ [`benefitsItem${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                            className="w-full bg-white text-gray-700 border border-teal-300 rounded px-2 py-1 text-xs"
                            placeholder={`Item ${i} EN`}
                          />
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed font-semibold">{isAr ? view[`benefitsItem${i}Ar` as keyof MathCompletionExamData] : view[`benefitsItem${i}En` as keyof MathCompletionExamData]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-lg border-2 border-teal-200">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="size-8" />
                  </div>
                  <div className="flex-1">
                    {editingSection === "benefits" ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={draft?.benefitsFooterTitleAr ?? ""}
                          onChange={(e) => updateDraft({ benefitsFooterTitleAr: e.target.value })}
                          className="w-full font-bold text-[#254151] text-xl bg-white border border-teal-300 rounded px-3 py-2"
                          placeholder="عنوان الفوتر AR"
                        />
                        <input
                          type="text"
                          value={draft?.benefitsFooterTitleEn ?? ""}
                          onChange={(e) => updateDraft({ benefitsFooterTitleEn: e.target.value })}
                          className="w-full font-bold text-[#254151] text-lg bg-white border border-teal-300 rounded px-3 py-1"
                          placeholder="Footer Title EN"
                        />
                        <textarea
                          value={draft?.benefitsFooterTextAr ?? ""}
                          onChange={(e) => updateDraft({ benefitsFooterTextAr: e.target.value })}
                          className="w-full bg-white text-gray-700 text-lg leading-relaxed border border-teal-300 rounded px-3 py-2 resize-y min-h-[80px]"
                          placeholder="نص الفوتر AR"
                        />
                        <textarea
                          value={draft?.benefitsFooterTextEn ?? ""}
                          onChange={(e) => updateDraft({ benefitsFooterTextEn: e.target.value })}
                          className="w-full bg-white text-gray-700 leading-relaxed border border-teal-300 rounded px-3 py-2 text-sm resize-y min-h-[60px]"
                          placeholder="Footer Text EN"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? view.benefitsFooterTitleAr : view.benefitsFooterTitleEn}</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">{isAr ? view.benefitsFooterTextAr : view.benefitsFooterTextEn}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200 relative">
              {isAdmin && editingSection !== "tips" && (
                <div className="absolute top-4 left-4 z-10">
                  <button
                    onClick={() => startEdit("tips")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                </div>
              )}
              {isAdmin && editingSection === "tips" && (
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={saveEdit}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Check className="size-4" />
                    {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <X className="size-4" />
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 text-white p-4 rounded-full">
                  <Target className="size-8" />
                </div>
                {editingSection === "tips" ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={draft?.tipsTitleAr ?? ""}
                      onChange={(e) => updateDraft({ tipsTitleAr: e.target.value })}
                      className="w-full text-3xl font-bold text-[#254151] bg-white border border-purple-300 rounded px-3 py-2"
                      placeholder="عنوان القسم AR"
                    />
                    <input
                      type="text"
                      value={draft?.tipsTitleEn ?? ""}
                      onChange={(e) => updateDraft({ tipsTitleEn: e.target.value })}
                      className="w-full text-xl font-bold text-[#254151] bg-white border border-purple-300 rounded px-3 py-1"
                      placeholder="Section Title EN"
                    />
                  </div>
                ) : (
                  <h2 className="text-3xl font-bold text-[#254151]">{isAr ? view.tipsTitleAr : view.tipsTitleEn}</h2>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-purple-50 rounded-lg p-8 border-2 border-purple-200 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                        {i === 1 && <BookOpen className="size-8" />}
                        {i === 2 && <Calculator className="size-8" />}
                        {i === 3 && <Clock className="size-8" />}
                        {i === 4 && <Users className="size-8" />}
                      </div>
                      <div className="flex-1">
                        {editingSection === "tips" ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={draft?.[`tipsItem${i}TitleAr` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsItem${i}TitleAr`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full font-bold text-[#254151] text-xl bg-white border border-purple-300 rounded px-2 py-1"
                              placeholder={`عنوان النصيحة ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`tipsItem${i}TitleEn` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsItem${i}TitleEn`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full font-bold text-[#254151] text-lg bg-white border border-purple-300 rounded px-2 py-1"
                              placeholder={`Tip ${i} Title EN`}
                            />
                            <textarea
                              value={draft?.[`tipsItem${i}DescAr` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsItem${i}DescAr`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 leading-relaxed border border-purple-300 rounded px-2 py-1 resize-y min-h-[60px]"
                              placeholder={`وصف النصيحة ${i} AR`}
                            />
                            <textarea
                              value={draft?.[`tipsItem${i}DescEn` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsItem${i}DescEn`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-gray-700 leading-relaxed border border-purple-300 rounded px-2 py-1 text-sm resize-y min-h-[50px]"
                              placeholder={`Tip ${i} Description EN`}
                            />
                          </div>
                        ) : (
                          <>
                            <h3 className="font-bold text-[#254151] text-xl mb-2">{isAr ? view[`tipsItem${i}TitleAr` as keyof MathCompletionExamData] : view[`tipsItem${i}TitleEn` as keyof MathCompletionExamData]}</h3>
                            <p className="text-gray-700 leading-relaxed">{isAr ? view[`tipsItem${i}DescAr` as keyof MathCompletionExamData] : view[`tipsItem${i}DescEn` as keyof MathCompletionExamData]}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border-2 border-purple-200">
                {editingSection === "tips" ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={draft?.tipsFooterTitleAr ?? ""}
                      onChange={(e) => updateDraft({ tipsFooterTitleAr: e.target.value })}
                      className="w-full font-bold text-[#254151] text-xl bg-white border border-purple-300 rounded px-3 py-2"
                      placeholder="عنوان الموارد AR"
                    />
                    <input
                      type="text"
                      value={draft?.tipsFooterTitleEn ?? ""}
                      onChange={(e) => updateDraft({ tipsFooterTitleEn: e.target.value })}
                      className="w-full font-bold text-[#254151] text-lg bg-white border border-purple-300 rounded px-3 py-1"
                      placeholder="Resources Title EN"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-lg border-2 border-purple-200 flex items-center gap-3">
                          {i === 1 && <Download className="size-6 text-purple-600 flex-shrink-0" />}
                          {i === 2 && <BookOpen className="size-6 text-purple-600 flex-shrink-0" />}
                          {i === 3 && <FileText className="size-6 text-purple-600 flex-shrink-0" />}
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={draft?.[`tipsResource${i}Ar` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsResource${i}Ar`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-[#254151] font-semibold border border-purple-300 rounded px-2 py-1 text-sm"
                              placeholder={`المورد ${i} AR`}
                            />
                            <input
                              type="text"
                              value={draft?.[`tipsResource${i}En` as keyof MathCompletionExamData] ?? ""}
                              onChange={(e) => updateDraft({ [`tipsResource${i}En`]: e.target.value } as Partial<MathCompletionExamData>)}
                              className="w-full bg-white text-[#254151] border border-purple-300 rounded px-2 py-1 text-xs"
                              placeholder={`Resource ${i} EN`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[#254151] text-xl mb-4">{isAr ? view.tipsFooterTitleAr : view.tipsFooterTitleEn}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-3">
                        <Download className="size-6 text-purple-600" />
                        <span className="font-semibold text-[#254151]">{isAr ? view.tipsResource1Ar : view.tipsResource1En}</span>
                      </button>
                      <button className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-3">
                        <BookOpen className="size-6 text-purple-600" />
                        <span className="font-semibold text-[#254151]">{isAr ? view.tipsResource2Ar : view.tipsResource2En}</span>
                      </button>
                      <button className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-3">
                        <FileText className="size-6 text-purple-600" />
                        <span className="font-semibold text-[#254151]">{isAr ? view.tipsResource3Ar : view.tipsResource3En}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl p-10 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Calculator className="size-8" />
              </div>
              <div>
                <h3 className="font-bold text-[#254151] text-2xl mb-3">معلومات إضافية</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  للحصول على مزيد من المعلومات حول امتحان إنهاء متطلب الرياضيات، يرجى التواصل مع مكتب البرنامج التأسيسي أو زيارة مركز الإرشاد الأكاديمي.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Users className="size-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">ساعات المكتب</p>
                        <p className="font-bold text-[#254151]">الأحد - الخميس: 8:00 ص - 4:00 م</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="size-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">مواعيد الامتحان</p>
                        <p className="font-bold text-[#254151]">تُعلن في بداية كل فصل دراسي</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#6096b4] to-[#254151] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد لإنهاء متطلب الرياضيات؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">ابدأ التحضير الآن واجتز الامتحان بنجاح لإكمال متطلبات البرنامج التأسيسي</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/foundation-completion-exam"
              className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
            >
              <FileText className="size-6" />
              <span>امتحان إكمال البرنامج التأسيسي</span>
            </Link>
            <Link
              href="/main/foundation-program"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"
            >
              <ChevronLeft className="size-6" />
              <span>العودة للبرنامج التأسيسي</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
