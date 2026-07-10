"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Loader2,
  Pencil,
  Save,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { foundationLevelOneDetailsSeed } from "@/staticData/foundation-program";

type Bilingual = { ar: string; en: string };
type Level1Details = typeof foundationLevelOneDetailsSeed;
type EditSection =
  | "hero"
  | "courseDescription"
  | "courseGoals"
  | "programGoals"
  | "learningOutcomes"
  | "integratedResults"
  | "importantNote"
  | "cta";

export default function LevelOneFoundationProgramPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingSection, setEditingSection] = useState<EditSection | null>(
    null,
  );
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<Level1Details>(
    foundationLevelOneDetailsSeed,
  );
  const [draft, setDraft] = useState<Level1Details>(
    foundationLevelOneDetailsSeed,
  );

  useEffect(() => {
    void (async () => {
      try {
        const [authRes, dataRes] = await Promise.all([
          fetch("/api/auth/me", { credentials: "include", cache: "no-store" }),
          fetch("/api/foundation-program", { cache: "no-store" }),
        ]);
        if (authRes.ok) {
          const me = (await authRes.json()) as {
            ok?: boolean;
            isAdmin?: boolean;
          };
          setIsAdmin(Boolean(me?.ok && me?.isAdmin));
        }
        if (dataRes.ok) {
          const json = (await dataRes.json()) as {
            ok?: boolean;
            data?: { level1Details?: Level1Details };
          };
          if (json?.ok && json?.data?.level1Details) {
            const merged = {
              ...foundationLevelOneDetailsSeed,
              ...(json.data.level1Details as Level1Details),
            };
            setData(merged);
            setDraft(merged);
          }
        }
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  const t = draft;
  const tr = (v: Bilingual) => (isAr ? v.ar : v.en);

  useEffect(() => {
    if (!editingSection) return;
    const el = document.getElementById(`edit-form-${editingSection}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [editingSection]);

  const updateBi = (
    key: keyof Level1Details,
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as Bilingual), [lang]: value },
    }));
  };
  const updateList = (
    key: keyof Level1Details,
    idx: number,
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => {
      const arr = [...(prev[key] as Bilingual[])] as Bilingual[];
      arr[idx] = { ...arr[idx], [lang]: value };
      return { ...prev, [key]: arr };
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/foundation-program", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level1Details: draft }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        data?: { level1Details?: Level1Details };
      };
      if (res.ok && json?.ok) {
        const next = json?.data?.level1Details || draft;
        setData(next);
        setDraft(next);
        setEditingSection(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setDraft(data);
    setEditingSection(null);
  };

  const renderSectionActions = (section: EditSection) => {
    if (!isAdmin) return null;
    if (editingSection !== section) {
      return (
        <button
          onClick={() => setEditingSection(section)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white"
        >
          <Pencil className="size-4" />
          {isAr ? "تعديل القسم" : "Edit Section"}
        </button>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={cancelEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
        >
          <X className="size-4" />
          {isAr ? "إلغاء" : "Cancel"}
        </button>
        <button
          onClick={saveEdit}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {isAr ? "حفظ" : "Save"}
        </button>
      </div>
    );
  };

  const renderEditBi = (key: keyof Level1Details, title: string) => (
    <div className="grid gap-2 rounded-lg border bg-white p-4">
      <p className="text-sm font-semibold text-[#254151]">{title}</p>
      <textarea
        className="w-full min-h-[70px] rounded border px-3 py-2"
        value={(draft[key] as Bilingual).ar}
        onChange={(e) => updateBi(key, "ar", e.target.value)}
        dir="rtl"
      />
      <textarea
        className="w-full min-h-[70px] rounded border px-3 py-2"
        value={(draft[key] as Bilingual).en}
        onChange={(e) => updateBi(key, "en", e.target.value)}
        dir="ltr"
      />
    </div>
  );

  const renderEditList = (key: keyof Level1Details, title: string) => (
    <div className="grid gap-2 rounded-lg border bg-white p-4">
      <p className="text-sm font-semibold text-[#254151]">{title}</p>
      {(draft[key] as Bilingual[]).map((item, idx) => (
        <div
          key={`${String(key)}-${idx}`}
          className="grid gap-1 rounded border p-2"
        >
          <textarea
            className="w-full min-h-[60px] rounded border px-2 py-1 text-sm"
            value={item.ar}
            onChange={(e) => updateList(key, idx, "ar", e.target.value)}
            dir="rtl"
          />
          <textarea
            className="w-full min-h-[60px] rounded border px-2 py-1 text-sm"
            value={item.en}
            onChange={(e) => updateList(key, idx, "en", e.target.value)}
            dir="ltr"
          />
        </div>
      ))}
    </div>
  );

  const renderChecklist = (items: Bilingual[], color: string) => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <CheckCircle2 className={`size-5 flex-shrink-0 mt-0.5 ${color}`} />
          <p className="text-gray-700">{tr(item)}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isAr ? "" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <section className="relative bg-gradient-to-r from-[#254151] to-[#6096b4] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <GraduationCap className="size-12" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{tr(t.heroTitle)}</h1>
                  <h2 className="text-xl opacity-90">{tr(t.heroSubtitle)}</h2>
                </div>
              </div>
              {renderSectionActions("hero")}
            </div>
            {editingSection !== "hero" ? (
              <p className="text-xl opacity-95">{tr(t.heroDescription)}</p>
            ) : (
              <div
                id="edit-form-hero"
                className="mt-6 grid gap-3 rounded-xl border-2 border-white/30 bg-white/10 p-4 backdrop-blur"
              >
                {renderEditBi("heroTitle", "Hero Title")}
                {renderEditBi("heroSubtitle", "Hero Subtitle")}
                {renderEditBi("heroDescription", "Hero Description")}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white p-4 rounded-full">
                  <BookOpen className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">
                  {tr(t.courseDescriptionTitle)}
                </h2>
              </div>
              {renderSectionActions("courseDescription")}
            </div>
            {editingSection !== "courseDescription" ? (
              <p className="text-gray-700 text-lg leading-relaxed">
                {tr(t.courseDescriptionText)}
              </p>
            ) : (
              <div id="edit-form-courseDescription" className="mt-6 grid gap-3">
                {renderEditBi(
                  "courseDescriptionTitle",
                  "Course Description Title",
                )}
                {renderEditBi(
                  "courseDescriptionText",
                  "Course Description Text",
                )}
              </div>
            )}
          </div>
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white p-4 rounded-full">
                  <Target className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">
                  {tr(t.courseGoalsTitle)}
                </h2>
              </div>
              {renderSectionActions("courseGoals")}
            </div>
            {editingSection !== "courseGoals" ? (
              <div className="space-y-4">
                {t.courseGoalsItems.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-6 rounded-lg border-s-4 border-blue-500"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="size-6 text-blue-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {tr(goal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-courseGoals" className="mt-6 grid gap-3">
                {renderEditBi("courseGoalsTitle", "Course Goals Title")}
                {renderEditList("courseGoalsItems", "Course Goals Items")}
              </div>
            )}
          </div>
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-green-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-600 text-white p-4 rounded-full">
                  <Award className="size-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#254151]">
                  {tr(t.programGoalsTitle)}
                </h2>
              </div>
              {renderSectionActions("programGoals")}
            </div>
            {editingSection !== "programGoals" ? (
              <>
                <p className="text-gray-700 text-lg mb-6">
                  {tr(t.programGoalsIntro)}
                </p>
                <div className="space-y-3">
                  {t.programGoalsItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-50 p-4 rounded-lg border-s-4 border-green-500"
                    >
                      <div className="flex gap-3">
                        <div className="bg-green-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {tr(item)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div id="edit-form-programGoals" className="mt-6 grid gap-3">
                {renderEditBi("programGoalsTitle", "Program Goals Title")}
                {renderEditBi("programGoalsIntro", "Program Goals Intro")}
                {renderEditList("programGoalsItems", "Program Goals Items")}
              </div>
            )}
          </div>
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-purple-200">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-[#254151]">
                {tr(t.learningOutcomesTitle)}
              </h2>
              {renderSectionActions("learningOutcomes")}
            </div>
            {editingSection !== "learningOutcomes" ? (
              <>
                <p className="text-gray-700 text-lg mb-8">
                  {tr(t.learningOutcomesIntro)}
                </p>
                <div className="mb-8 bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.grammarTitle)}
                  </h3>
                  {renderChecklist(t.grammarItems, "text-purple-600")}
                </div>
                <div className="mb-8 bg-amber-50 rounded-lg p-6 border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.terminologyTitle)}
                  </h3>
                  {renderChecklist(t.terminologyItems, "text-amber-600")}
                </div>
                <div className="mb-8 bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.speakingTitle)}
                  </h3>
                  {renderChecklist(t.speakingItems, "text-blue-600")}
                </div>
                <div className="mb-8 bg-green-50 rounded-lg p-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.listeningTitle)}
                  </h3>
                  {renderChecklist(t.listeningItems, "text-green-600")}
                </div>
                <div className="mb-8 bg-indigo-50 rounded-lg p-6 border-2 border-indigo-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.readingTitle)}
                  </h3>
                  {renderChecklist(t.readingItems, "text-indigo-600")}
                </div>
                <div className="mb-8 bg-red-50 rounded-lg p-6 border-2 border-red-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.writingTitle)}
                  </h3>
                  {renderChecklist(t.writingItems, "text-red-600")}
                </div>
              </>
            ) : (
              <div id="edit-form-learningOutcomes" className="mt-6 grid gap-3">
                {renderEditBi(
                  "learningOutcomesTitle",
                  "Learning Outcomes Title",
                )}
                {renderEditBi(
                  "learningOutcomesIntro",
                  "Learning Outcomes Intro",
                )}
                {renderEditBi("grammarTitle", "Grammar Title")}
                {renderEditList("grammarItems", "Grammar Items")}
                {renderEditBi("terminologyTitle", "Terminology Title")}
                {renderEditList("terminologyItems", "Terminology Items")}
                {renderEditBi("speakingTitle", "Speaking Title")}
                {renderEditList("speakingItems", "Speaking Items")}
                {renderEditBi("listeningTitle", "Listening Title")}
                {renderEditList("listeningItems", "Listening Items")}
                {renderEditBi("readingTitle", "Reading Title")}
                {renderEditList("readingItems", "Reading Items")}
                {renderEditBi("writingTitle", "Writing Title")}
                {renderEditList("writingItems", "Writing Items")}
              </div>
            )}
          </div>
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-cyan-200">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-[#254151]">
                {tr(t.integratedResultsTitle)}
              </h2>
              {renderSectionActions("integratedResults")}
            </div>
            {editingSection !== "integratedResults" ? (
              <>
                <div className="mb-8 bg-cyan-50 rounded-lg p-6 border-2 border-cyan-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.timeManagementTitle)}
                  </h3>
                  {renderChecklist(t.timeManagementItems, "text-cyan-600")}
                </div>
                <div className="mb-8 bg-teal-50 rounded-lg p-6 border-2 border-teal-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.researchSkillsTitle)}
                  </h3>
                  {renderChecklist(t.researchSkillsItems, "text-teal-600")}
                </div>
                <div className="mb-8 bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.noteTakingTitle)}
                  </h3>
                  {renderChecklist(t.noteTakingItems, "text-orange-600")}
                </div>
                <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
                  <h3 className="text-2xl font-bold text-[#254151] mb-4">
                    {tr(t.presentationsTitle)}
                  </h3>
                  {renderChecklist(t.presentationsItems, "text-pink-600")}
                </div>
              </>
            ) : (
              <div id="edit-form-integratedResults" className="mt-6 grid gap-3">
                {renderEditBi(
                  "integratedResultsTitle",
                  "Integrated Results Title",
                )}
                {renderEditBi("timeManagementTitle", "Time Management Title")}
                {renderEditList("timeManagementItems", "Time Management Items")}
                {renderEditBi("researchSkillsTitle", "Research Skills Title")}
                {renderEditList("researchSkillsItems", "Research Skills Items")}
                {renderEditBi("noteTakingTitle", "Note Taking Title")}
                {renderEditList("noteTakingItems", "Note Taking Items")}
                {renderEditBi("presentationsTitle", "Presentations Title")}
                {renderEditList("presentationsItems", "Presentations Items")}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 border-2 border-amber-200 shadow-lg">
            <div className="mb-4 flex items-center justify-end">
              {renderSectionActions("importantNote")}
            </div>
            {editingSection !== "importantNote" ? (
              <div className="flex items-start gap-4">
                <Award className="size-10 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-[#254151] mb-3">
                    {tr(t.importantNoteTitle)}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {tr(t.importantNoteText)}
                  </p>
                </div>
              </div>
            ) : (
              <div id="edit-form-importantNote" className="mt-6 grid gap-3">
                {renderEditBi("importantNoteTitle", "Important Note Title")}
                {renderEditBi("importantNoteText", "Important Note Text")}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            {renderSectionActions("cta")}
          </div>
          {editingSection !== "cta" ? (
            <>
              <h2 className="text-4xl font-bold mb-6">{tr(t.ctaTitle)}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">{tr(t.ctaText)}</p>
              <Link
                href="/main/foundation-program"
                className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
              >
                <ChevronLeft className="size-6" />
                <span>{tr(t.ctaBackLabel)}</span>
              </Link>
            </>
          ) : (
            <div
              id="edit-form-cta"
              className="mt-6 grid gap-3 rounded-xl border-2 border-white/30 bg-white/10 p-4 text-start backdrop-blur"
            >
              {renderEditBi("ctaTitle", "CTA Title")}
              {renderEditBi("ctaText", "CTA Text")}
              {renderEditBi("ctaBackLabel", "CTA Back Label")}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
