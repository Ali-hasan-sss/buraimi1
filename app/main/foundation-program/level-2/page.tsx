"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
  BookOpen,
  BookOpenCheck,
  Brain,
  ChevronLeft,
  CircleCheckBig,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Headphones,
  Languages,
  Loader2,
  MessageCircle,
  Mic,
  PenTool,
  Pencil,
  Presentation,
  Save,
  Search,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import {
  foundationLevelTwoDetailsSeed,
  mergeFoundationLevelTwoDetails,
  type Bi,
  type FoundationLevelTwoDetailsData,
} from "@/staticData/foundation-level-two-details";

type Level2 = FoundationLevelTwoDetailsData;

type EditSection =
  | "hero"
  | "courseDescription"
  | "courseGoals"
  | "programGoals"
  | "learningOutcomes"
  | "grammar"
  | "vocabulary"
  | "speaking"
  | "listening"
  | "reading"
  | "writing"
  | "integratedResults"
  | "cta";

const learningTileIcons = [
  Languages,
  BookOpen,
  Mic,
  Headphones,
  Eye,
  PenTool,
] as const;

const toneTile = {
  blue: {
    iconWrap: "bg-blue-600",
    border: "border-blue-200",
    title: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    iconWrap: "bg-green-600",
    border: "border-green-200",
    title: "text-green-700",
    badge: "bg-green-100 text-green-700",
  },
  purple: {
    iconWrap: "bg-purple-600",
    border: "border-purple-200",
    title: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
  },
  amber: {
    iconWrap: "bg-amber-600",
    border: "border-amber-200",
    title: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
  red: {
    iconWrap: "bg-red-600",
    border: "border-red-200",
    title: "text-red-700",
    badge: "bg-red-100 text-red-700",
  },
  teal: {
    iconWrap: "bg-teal-600",
    border: "border-teal-200",
    title: "text-teal-700",
    badge: "bg-teal-100 text-teal-700",
  },
} as const;

function StudyBlockIcon({ kind }: { kind: "clock" | "search" | "fileText" | "presentation" }) {
  const cls = "size-7";
  if (kind === "clock") return <Clock className={cls} />;
  if (kind === "search") return <Search className={cls} />;
  if (kind === "fileText") return <FileText className={cls} />;
  return <Presentation className={cls} />;
}

export default function LevelTwoFoundationProgramPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const tr = (v: Bi) => (isAr ? v.ar : v.en);

  const [isAdmin, setIsAdmin] = useState(false);
  const [editingSection, setEditingSection] = useState<EditSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<Level2>(() =>
    mergeFoundationLevelTwoDetails(undefined),
  );
  const [draft, setDraft] = useState<Level2>(() =>
    mergeFoundationLevelTwoDetails(undefined),
  );

  const t = draft;

  useEffect(() => {
    void (async () => {
      try {
        const [authRes, dataRes] = await Promise.all([
          fetch("/api/auth/me", { credentials: "include", cache: "no-store" }),
          fetch("/api/foundation-program", { cache: "no-store" }),
        ]);
        if (authRes.ok) {
          const me = (await authRes.json()) as { ok?: boolean; isAdmin?: boolean };
          setIsAdmin(Boolean(me?.ok && me?.isAdmin));
        }
        if (dataRes.ok) {
          const json = (await dataRes.json()) as {
            ok?: boolean;
            data?: { level2Details?: unknown };
          };
          if (json?.ok && json.data?.level2Details) {
            const merged = mergeFoundationLevelTwoDetails(json.data.level2Details);
            setData(merged);
            setDraft(merged);
          }
        }
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!editingSection) return;
    const el = document.getElementById(`edit-form-level2-${editingSection}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [editingSection]);

  const updateBi = (key: keyof Level2, lang: "ar" | "en", value: string) => {
    setDraft((prev) => {
      const cur = prev[key];
      if (!cur || typeof cur !== "object" || !("ar" in cur)) return prev;
      return { ...prev, [key]: { ...(cur as Bi), [lang]: value } };
    });
  };

  const updateList = (key: keyof Level2, idx: number, lang: "ar" | "en", value: string) => {
    setDraft((prev) => {
      const arr = [...(prev[key] as Bi[])];
      if (!arr[idx]) return prev;
      arr[idx] = { ...arr[idx], [lang]: value };
      return { ...prev, [key]: arr };
    });
  };

  const updateCourseGoalCard = (
    idx: number,
    field: "title" | "text",
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => {
      const cards = [...prev.courseGoalsCards];
      const c = { ...cards[idx], [field]: { ...cards[idx][field], [lang]: value } };
      cards[idx] = c;
      return { ...prev, courseGoalsCards: cards };
    });
  };

  const updateProgramGoal = (
    idx: number,
    field: "title" | "text",
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => {
      const items = [...prev.programGoalsItems];
      const row = { ...items[idx], [field]: { ...items[idx][field], [lang]: value } };
      items[idx] = row;
      return { ...prev, programGoalsItems: items };
    });
  };

  const updateLearningTile = (
    idx: number,
    field: "title" | "badge",
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => {
      const tiles = [...prev.learningOutcomeTiles];
      const row = { ...tiles[idx], [field]: { ...tiles[idx][field], [lang]: value } };
      tiles[idx] = row;
      return { ...prev, learningOutcomeTiles: tiles };
    });
  };

  const updateStudyBlockTitle = (blockIdx: number, lang: "ar" | "en", value: string) => {
    setDraft((prev) => {
      const blocks = [...prev.studySkillBlocks];
      blocks[blockIdx] = {
        ...blocks[blockIdx],
        title: { ...blocks[blockIdx].title, [lang]: value },
      };
      return { ...prev, studySkillBlocks: blocks };
    });
  };

  const updateStudyBlockItem = (
    blockIdx: number,
    itemIdx: number,
    lang: "ar" | "en",
    value: string,
  ) => {
    setDraft((prev) => {
      const blocks = [...prev.studySkillBlocks];
      const items = [...blocks[blockIdx].items];
      items[itemIdx] = { ...items[itemIdx], [lang]: value };
      blocks[blockIdx] = { ...blocks[blockIdx], items };
      return { ...prev, studySkillBlocks: blocks };
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/foundation-program", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level2Details: draft }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        data?: { level2Details?: unknown };
      };
      if (res.ok && json?.ok) {
        const next = mergeFoundationLevelTwoDetails(json?.data?.level2Details ?? draft);
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
          type="button"
          onClick={() => setEditingSection(section)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          <Pencil className="size-4" />
          {isAr ? "تعديل القسم" : "Edit section"}
        </button>
      );
    }
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={cancelEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
        >
          <X className="size-4" />
          {isAr ? "إلغاء" : "Cancel"}
        </button>
        <button
          type="button"
          onClick={saveEdit}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isAr ? "حفظ" : "Save"}
        </button>
      </div>
    );
  };

  const editBi = (label: string, key: keyof Level2) => (
    <div className="grid gap-2 rounded-lg border bg-white/95 p-3 shadow-sm">
      <p className="text-sm font-semibold text-[#254151]">{label}</p>
      <textarea
        className="min-h-[70px] w-full rounded border px-3 py-2 text-sm"
        value={(draft[key] as Bi).ar}
        onChange={(e) => updateBi(key, "ar", e.target.value)}
        dir="rtl"
      />
      <textarea
        className="min-h-[70px] w-full rounded border px-3 py-2 text-sm"
        value={(draft[key] as Bi).en}
        onChange={(e) => updateBi(key, "en", e.target.value)}
        dir="ltr"
      />
    </div>
  );

  const editBiList = (label: string, key: keyof Level2) => (
    <div className="grid gap-2 rounded-lg border bg-white/95 p-3 shadow-sm">
      <p className="text-sm font-semibold text-[#254151]">{label}</p>
      {(draft[key] as Bi[]).map((item, idx) => (
        <div key={`${String(key)}-${idx}`} className="grid gap-1 rounded border border-gray-200 p-2">
          <textarea
            className="min-h-[56px] w-full rounded border px-2 py-1 text-sm"
            value={item.ar}
            onChange={(e) => updateList(key, idx, "ar", e.target.value)}
            dir="rtl"
          />
          <textarea
            className="min-h-[56px] w-full rounded border px-2 py-1 text-sm"
            value={item.en}
            onChange={(e) => updateList(key, idx, "en", e.target.value)}
            dir="ltr"
          />
        </div>
      ))}
    </div>
  );

  const h = t.courseDescriptionHighlight;

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] py-20 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto mb-6 flex max-w-5xl justify-end">{renderSectionActions("hero")}</div>
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                <TrendingUp className="size-20" />
              </div>
            </div>
            {editingSection !== "hero" ? (
              <>
                <h1 className="mb-4 text-6xl font-bold">{tr(t.heroTitle)}</h1>
                <h2 className="mb-6 text-3xl font-bold opacity-90">{tr(t.heroSubtitle)}</h2>
                <p className="text-2xl leading-relaxed opacity-95">{tr(t.heroTagline)}</p>
              </>
            ) : (
              <div
                id="edit-form-level2-hero"
                className="mx-auto mt-4 grid max-w-3xl gap-3 rounded-xl border-2 border-white/30 bg-white/10 p-4 text-start backdrop-blur"
              >
                {editBi(isAr ? "عنوان الصفحة" : "Hero title", "heroTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Hero subtitle", "heroSubtitle")}
                {editBi(isAr ? "السطر التوضيحي" : "Hero tagline", "heroTagline")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Course description */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-10 shadow-2xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-1 items-start gap-6">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <BookOpen className="size-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-6 text-4xl font-bold text-[#254151]">{tr(t.courseDescriptionTitle)}</h2>
                </div>
              </div>
              {renderSectionActions("courseDescription")}
            </div>
            {editingSection !== "courseDescription" ? (
              <>
                {t.courseDescriptionParagraphs.map((p, i) => (
                  <p key={i} className="mb-4 text-xl leading-relaxed text-gray-700">
                    {tr(p)}
                  </p>
                ))}
                <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <p className="text-lg leading-relaxed">
                    {tr(h[0])}
                    <strong>{tr(h[1])}</strong>
                    {tr(h[2])}
                    <strong>{tr(h[3])}</strong>
                    {tr(h[4])}
                  </p>
                </div>
              </>
            ) : (
              <div id="edit-form-level2-courseDescription" className="grid gap-3">
                {editBi(isAr ? "عنوان القسم" : "Section title", "courseDescriptionTitle")}
                {editBiList(isAr ? "فقرات الوصف" : "Description paragraphs", "courseDescriptionParagraphs")}
                <p className="text-sm font-semibold text-[#254151]">
                  {isAr ? "مقطع التمييز (٥ أجزاء: عادي، غامق، عادي، غامق، عادي)" : "Highlight (5 segments: normal, bold, normal, bold, normal)"}
                </p>
                {draft.courseDescriptionHighlight.map((seg, idx) => (
                  <div key={idx} className="grid gap-1 rounded-lg border bg-white/95 p-3">
                    <span className="text-xs text-gray-500">
                      {isAr ? `جزء ${idx + 1}` : `Segment ${idx + 1}`}
                      {idx === 1 || idx === 3 ? (isAr ? " (غامق)" : " (bold)") : ""}
                    </span>
                    <textarea
                      className="min-h-[50px] w-full rounded border px-2 py-1 text-sm"
                      value={seg.ar}
                      onChange={(e) => updateList("courseDescriptionHighlight", idx, "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="min-h-[50px] w-full rounded border px-2 py-1 text-sm"
                      value={seg.en}
                      onChange={(e) => updateList("courseDescriptionHighlight", idx, "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Course goals */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-start">
              <h2 className="mb-4 text-5xl font-bold text-[#254151]">{tr(t.courseGoalsTitle)}</h2>
              <p className="text-xl text-gray-600">{tr(t.courseGoalsSubtitle)}</p>
            </div>
            {renderSectionActions("courseGoals")}
          </div>
          {editingSection !== "courseGoals" ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {t.courseGoalsCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-lg border-2 border-purple-200 bg-white p-8 shadow-xl transition-all hover:shadow-2xl"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                      {card.icon === "graduation" ? (
                        <GraduationCap className="size-8" />
                      ) : (
                        <Brain className="size-8" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3 text-2xl font-bold text-purple-700">{tr(card.title)}</h3>
                      <p className="text-lg leading-relaxed text-gray-700">{tr(card.text)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="edit-form-level2-courseGoals" className="grid gap-4">
              {editBi(isAr ? "عنوان القسم" : "Section title", "courseGoalsTitle")}
              {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "courseGoalsSubtitle")}
              {draft.courseGoalsCards.map((card, i) => (
                <div key={i} className="rounded-lg border-2 border-purple-200 bg-white p-6 shadow-md">
                  <p className="mb-2 text-sm font-semibold text-purple-700">
                    {isAr ? `البطاقة ${i + 1}` : `Card ${i + 1}`}
                  </p>
                  <div className="grid gap-2">
                    <textarea
                      className="min-h-[56px] w-full rounded border px-2 py-1 text-sm"
                      value={card.title.ar}
                      onChange={(e) => updateCourseGoalCard(i, "title", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="min-h-[56px] w-full rounded border px-2 py-1 text-sm"
                      value={card.title.en}
                      onChange={(e) => updateCourseGoalCard(i, "title", "en", e.target.value)}
                      dir="ltr"
                    />
                    <textarea
                      className="min-h-[80px] w-full rounded border px-2 py-1 text-sm"
                      value={card.text.ar}
                      onChange={(e) => updateCourseGoalCard(i, "text", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="min-h-[80px] w-full rounded border px-2 py-1 text-sm"
                      value={card.text.en}
                      onChange={(e) => updateCourseGoalCard(i, "text", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Program goals */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-center sm:text-start">
              <h2 className="mb-4 text-5xl font-bold text-[#254151]">{tr(t.programGoalsTitle)}</h2>
              <p className="mb-6 text-xl text-gray-600">{tr(t.programGoalsSubtitle)}</p>
              <div className="mx-auto max-w-4xl rounded-lg bg-gradient-to-r from-[#6096b4] to-[#254151] p-4 text-white sm:mx-0">
                <p className="text-lg font-semibold">{tr(t.programGoalsIntro)}</p>
              </div>
            </div>
            {renderSectionActions("programGoals")}
          </div>
          {editingSection !== "programGoals" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {t.programGoalsItems.map((item) => (
                <div
                  key={item.n}
                  className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-xl transition-all hover:shadow-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#254151] text-2xl font-bold text-white">
                      {item.n}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-[#254151]">{tr(item.title)}</h3>
                      <p className="leading-relaxed text-gray-700">{tr(item.text)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="edit-form-level2-programGoals" className="grid gap-3">
              {editBi(isAr ? "عنوان القسم" : "Section title", "programGoalsTitle")}
              {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "programGoalsSubtitle")}
              {editBi(isAr ? "مقدمة الأهداف" : "Intro banner", "programGoalsIntro")}
              {draft.programGoalsItems.map((item, idx) => (
                <div
                  key={item.n}
                  className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 p-4"
                >
                  <p className="mb-2 text-sm font-semibold text-[#254151]">
                    {isAr ? `هدف ${item.n}` : `Goal ${item.n}`}
                  </p>
                  <textarea
                    className="mb-2 min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                    value={item.title.ar}
                    onChange={(e) => updateProgramGoal(idx, "title", "ar", e.target.value)}
                    dir="rtl"
                  />
                  <textarea
                    className="mb-2 min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                    value={item.title.en}
                    onChange={(e) => updateProgramGoal(idx, "title", "en", e.target.value)}
                    dir="ltr"
                  />
                  <textarea
                    className="min-h-[72px] w-full rounded border px-2 py-1 text-sm"
                    value={item.text.ar}
                    onChange={(e) => updateProgramGoal(idx, "text", "ar", e.target.value)}
                    dir="rtl"
                  />
                  <textarea
                    className="mt-2 min-h-[72px] w-full rounded border px-2 py-1 text-sm"
                    value={item.text.en}
                    onChange={(e) => updateProgramGoal(idx, "text", "en", e.target.value)}
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning outcome tiles */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-start">
              <h2 className="mb-4 text-5xl font-bold text-[#254151]">{tr(t.learningOutcomesTitle)}</h2>
              <p className="text-xl text-gray-600">{tr(t.learningOutcomesSubtitle)}</p>
            </div>
            {renderSectionActions("learningOutcomes")}
          </div>
          {editingSection !== "learningOutcomes" ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {t.learningOutcomeTiles.map((tile, i) => {
                const tone = toneTile[tile.tone];
                const Icon = learningTileIcons[i];
                return (
                  <div
                    key={i}
                    className={`rounded-lg border-2 ${tone.border} bg-white p-6 text-center shadow-xl transition-all hover:shadow-2xl`}
                  >
                    <div
                      className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full text-white ${tone.iconWrap}`}
                    >
                      <Icon className="size-8" />
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${tone.title}`}>{tr(tile.title)}</h3>
                    <div className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${tone.badge}`}>
                      {tr(tile.badge)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div id="edit-form-level2-learningOutcomes" className="grid gap-3">
              {editBi(isAr ? "عنوان القسم" : "Section title", "learningOutcomesTitle")}
              {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "learningOutcomesSubtitle")}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {draft.learningOutcomeTiles.map((tile, i) => {
                  const tone = toneTile[tile.tone];
                  return (
                    <div key={i} className={`rounded-lg border-2 ${tone.border} bg-white p-4`}>
                      <p className="mb-2 text-sm font-semibold text-gray-600">
                        {isAr ? `بلاطة ${i + 1}` : `Tile ${i + 1}`}
                      </p>
                      <textarea
                        className="mb-2 min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                        value={tile.title.ar}
                        onChange={(e) => updateLearningTile(i, "title", "ar", e.target.value)}
                        dir="rtl"
                      />
                      <textarea
                        className="mb-2 min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                        value={tile.title.en}
                        onChange={(e) => updateLearningTile(i, "title", "en", e.target.value)}
                        dir="ltr"
                      />
                      <textarea
                        className="min-h-[40px] w-full rounded border px-2 py-1 text-sm"
                        value={tile.badge.ar}
                        onChange={(e) => updateLearningTile(i, "badge", "ar", e.target.value)}
                        dir="rtl"
                      />
                      <textarea
                        className="mt-2 min-h-[40px] w-full rounded border px-2 py-1 text-sm"
                        value={tile.badge.en}
                        onChange={(e) => updateLearningTile(i, "badge", "en", e.target.value)}
                        dir="ltr"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grammar */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Languages className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.grammarTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.grammarSubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("grammar")}
            </div>
            {editingSection !== "grammar" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {t.grammarItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-blue-500 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <CircleCheckBig className="mt-1 size-6 shrink-0 text-blue-600" />
                      <p className="leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-grammar" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "grammarTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "grammarSubtitle")}
                {editBiList(isAr ? "بنود القواعد" : "Grammar items", "grammarItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vocabulary */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-green-200 bg-white p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-green-600 text-white">
                  <BookOpen className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.vocabularyTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.vocabularySubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("vocabulary")}
            </div>
            {editingSection !== "vocabulary" ? (
              <div className="space-y-4">
                {t.vocabularyItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-green-500 bg-gradient-to-r from-green-50 to-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <p className="pt-1 text-lg leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-vocabulary" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "vocabularyTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "vocabularySubtitle")}
                {editBiList(isAr ? "البنود" : "Items", "vocabularyItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Speaking */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-purple-600 text-white">
                  <Mic className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.speakingTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.speakingSubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("speaking")}
            </div>
            {editingSection !== "speaking" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {t.speakingItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-purple-500 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle className="mt-1 size-6 shrink-0 text-purple-600" />
                      <p className="leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-speaking" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "speakingTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "speakingSubtitle")}
                {editBiList(isAr ? "البنود" : "Items", "speakingItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Listening */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-amber-200 bg-white p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-amber-600 text-white">
                  <Headphones className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.listeningTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.listeningSubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("listening")}
            </div>
            {editingSection !== "listening" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {t.listeningItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-amber-500 bg-gradient-to-r from-amber-50 to-white p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <Headphones className="mt-1 size-6 shrink-0 text-amber-600" />
                      <p className="leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-listening" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "listeningTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "listeningSubtitle")}
                {editBiList(isAr ? "البنود" : "Items", "listeningItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reading */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <Eye className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.readingTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.readingSubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("reading")}
            </div>
            {editingSection !== "reading" ? (
              <div className="space-y-4">
                {t.readingItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-red-500 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpenCheck className="mt-1 size-6 shrink-0 text-red-600" />
                      <p className="text-lg leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-reading" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "readingTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "readingSubtitle")}
                {editBiList(isAr ? "البنود" : "Items", "readingItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-lg border-2 border-teal-200 bg-white p-10 shadow-2xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-teal-600 text-white">
                  <PenTool className="size-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#254151]">{tr(t.writingTitle)}</h2>
                  <p className="text-xl text-gray-600">{tr(t.writingSubtitle)}</p>
                </div>
              </div>
              {renderSectionActions("writing")}
            </div>
            {editingSection !== "writing" ? (
              <div className="space-y-4">
                {t.writingItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border-e-4 border-teal-500 bg-gradient-to-r from-teal-50 to-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <PenTool className="mt-1 size-6 shrink-0 text-teal-600" />
                      <p className="text-lg leading-relaxed text-gray-700">{tr(item)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="edit-form-level2-writing" className="grid gap-3">
                {editBi(isAr ? "العنوان" : "Title", "writingTitle")}
                {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "writingSubtitle")}
                {editBiList(isAr ? "البنود" : "Items", "writingItems")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Study skills */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-start">
              <h2 className="mb-4 text-5xl font-bold text-[#254151]">{tr(t.integratedResultsTitle)}</h2>
              <p className="text-xl text-gray-600">{tr(t.integratedResultsSubtitle)}</p>
            </div>
            {renderSectionActions("integratedResults")}
          </div>
          {editingSection !== "integratedResults" ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {t.studySkillBlocks.map((block, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border-2 border-[#6096b4] bg-white shadow-xl transition-all hover:shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <StudyBlockIcon kind={block.icon} />
                      </div>
                      <h3 className="text-2xl font-bold">{tr(block.title)}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {block.items.map((line, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 rounded-lg border-e-2 border-[#6096b4] bg-gradient-to-r from-blue-50 to-white p-3"
                        >
                          <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-[#6096b4]" />
                          <p className="leading-relaxed text-gray-700">{tr(line)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="edit-form-level2-integratedResults" className="grid gap-4">
              {editBi(isAr ? "عنوان القسم" : "Section title", "integratedResultsTitle")}
              {editBi(isAr ? "العنوان الفرعي" : "Subtitle", "integratedResultsSubtitle")}
              {draft.studySkillBlocks.map((block, bi) => (
                <div key={bi} className="overflow-hidden rounded-lg border-2 border-[#6096b4] bg-white shadow-md">
                  <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-4 text-white">
                    <p className="text-sm font-semibold opacity-90">
                      {isAr ? `كتلة ${bi + 1}` : `Block ${bi + 1}`}
                    </p>
                    <textarea
                      className="mt-2 min-h-[48px] w-full rounded border border-white/30 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/70"
                      value={block.title.ar}
                      onChange={(e) => updateStudyBlockTitle(bi, "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="mt-2 min-h-[48px] w-full rounded border border-white/30 bg-white/10 px-2 py-1 text-sm text-white placeholder:text-white/70"
                      value={block.title.en}
                      onChange={(e) => updateStudyBlockTitle(bi, "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    {block.items.map((line, j) => (
                      <div key={j} className="rounded border bg-gray-50 p-2">
                        <textarea
                          className="min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                          value={line.ar}
                          onChange={(e) => updateStudyBlockItem(bi, j, "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="mt-1 min-h-[48px] w-full rounded border px-2 py-1 text-sm"
                          value={line.en}
                          onChange={(e) => updateStudyBlockItem(bi, j, "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#254151] to-[#6096b4] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">{renderSectionActions("cta")}</div>
          {editingSection !== "cta" ? (
            <>
              <h2 className="mb-6 text-4xl font-bold">{tr(t.ctaTitle)}</h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl">{tr(t.ctaText)}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/main/foundation-program"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#254151] transition-all hover:shadow-2xl"
                >
                  <BookOpen className="size-6" />
                  <span>{tr(t.ctaProgramOverviewLabel)}</span>
                </Link>
                <Link
                  href="/main/foundation-program/level-1"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-8 py-4 text-lg font-bold text-white transition-all hover:shadow-2xl"
                >
                  <Target className="size-6" />
                  <span>{tr(t.ctaLevelOneLabel)}</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-[#254151]"
                >
                  <ChevronLeft className="size-6" />
                  <span>{tr(t.ctaHomeLabel)}</span>
                </Link>
              </div>
            </>
          ) : (
            <div
              id="edit-form-level2-cta"
              className="mx-auto mt-4 grid max-w-2xl gap-3 rounded-xl border-2 border-white/30 bg-white/10 p-4 backdrop-blur"
            >
              {editBi(isAr ? "عنوان الدعوة" : "CTA title", "ctaTitle")}
              {editBi(isAr ? "نص الدعوة" : "CTA body", "ctaText")}
              {editBi(isAr ? "زر نظرة عامة" : "Program overview button", "ctaProgramOverviewLabel")}
              {editBi(isAr ? "زر المستوى 1" : "Level 1 button", "ctaLevelOneLabel")}
              {editBi(isAr ? "زر الرئيسية" : "Home button", "ctaHomeLabel")}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
