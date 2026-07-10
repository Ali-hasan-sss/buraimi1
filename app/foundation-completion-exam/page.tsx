"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Award, BookOpen, CheckCircle2, ChevronLeft, Clock, Download, FileText, Headphones, Loader2, MessageCircle, Pencil, Plus, Save, Trash2, TrendingUp, Upload, X } from "lucide-react";
import {
  foundationCompletionExamDetailsSeed,
  type CompletionExamSectionIcon,
  type FoundationCompletionExamDetailsData,
} from "@/staticData/foundation-program";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type Bilingual = { ar: string; en: string };
type ExamSection = FoundationCompletionExamDetailsData["sections"][number];
type SuccessCard = FoundationCompletionExamDetailsData["successCards"][number];
type ConversionRow = FoundationCompletionExamDetailsData["conversionRows"][number];
type RetakeCard = FoundationCompletionExamDetailsData["retakeCards"][number];
type SampleButton = FoundationCompletionExamDetailsData["sampleButtons"][number];
type SampleBtnColor = SampleButton["color"];
type SectionColor = ExamSection["color"];

const SECTION_ICON_ORDER: CompletionExamSectionIcon[] = ["book", "headphones", "pencil", "message"];

function sectionCardBorder(c: SectionColor) {
  return c === "blue" ? "border-blue-200" : c === "green" ? "border-green-200" : c === "purple" ? "border-purple-200" : "border-amber-200";
}

function sectionNumberCircle(c: SectionColor) {
  return c === "blue"
    ? "bg-blue-600"
    : c === "green"
      ? "bg-green-600"
      : c === "purple"
        ? "bg-purple-600"
        : "bg-amber-600";
}

function sectionInnerPanel(c: SectionColor) {
  return c === "blue"
    ? "bg-blue-50 border-blue-200"
    : c === "green"
      ? "bg-green-50 border-green-200"
      : c === "purple"
        ? "bg-purple-50 border-purple-200"
        : "bg-amber-50 border-amber-200";
}

function sectionIconPill(c: SectionColor) {
  return c === "blue"
    ? "bg-blue-100 text-blue-600"
    : c === "green"
      ? "bg-green-100 text-green-600"
      : c === "purple"
        ? "bg-purple-100 text-purple-600"
        : "bg-amber-100 text-amber-600";
}

function SectionIconGlyph({ icon, index }: { icon?: CompletionExamSectionIcon; index: number }) {
  const k = icon ?? SECTION_ICON_ORDER[index % SECTION_ICON_ORDER.length];
  const cls = "size-8";
  if (k === "headphones") return <Headphones className={cls} />;
  if (k === "pencil") return <Pencil className={cls} />;
  if (k === "message") return <MessageCircle className={cls} />;
  return <BookOpen className={cls} />;
}

type SuccessTone = FoundationCompletionExamDetailsData["successCards"][number]["color"];

function successCardPanel(c: SuccessTone) {
  return c === "blue" ? "bg-blue-50 border-blue-200" : c === "green" ? "bg-green-50 border-green-200" : "bg-purple-50 border-purple-200";
}

function successCardSolid(c: SuccessTone) {
  return c === "blue" ? "bg-blue-600" : c === "green" ? "bg-green-600" : "bg-purple-600";
}

function sampleDownloadBtnClass(c: SampleBtnColor) {
  return c === "blue"
    ? "bg-blue-600 hover:bg-blue-700"
    : c === "green"
      ? "bg-green-600 hover:bg-green-700"
      : c === "purple"
        ? "bg-purple-600 hover:bg-purple-700"
        : "bg-amber-600 hover:bg-amber-700";
}

type EditSection = "hero" | "overview" | "sections" | "success" | "conversion" | "retake" | "sample" | "tips" | "cta";

export default function FoundationCompletionExamPage() {
  const isAr = useLocale() === "ar";
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingSection, setEditingSection] = useState<EditSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [sampleUploadingIndex, setSampleUploadingIndex] = useState<number | null>(null);
  const [data, setData] = useState<FoundationCompletionExamDetailsData>(foundationCompletionExamDetailsSeed);
  const [draft, setDraft] = useState<FoundationCompletionExamDetailsData>(foundationCompletionExamDetailsSeed);

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
          const json = (await dataRes.json()) as { ok?: boolean; data?: { completionExamDetails?: FoundationCompletionExamDetailsData } };
          if (json.ok && json.data?.completionExamDetails) {
            setData(json.data.completionExamDetails);
            setDraft(json.data.completionExamDetails);
          }
        }
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!editingSection) return;
    const el = document.getElementById(`edit-${editingSection}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [editingSection]);

  const t = draft;
  const tr = (v: Bilingual) => (isAr ? v.ar : v.en);

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/foundation-program", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completionExamDetails: draft }),
      });
      const json = (await res.json()) as { ok?: boolean; data?: { completionExamDetails?: FoundationCompletionExamDetailsData } };
      if (res.ok && json.ok) {
        const next = json.data?.completionExamDetails || draft;
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

  const sectionActions = (section: EditSection) => {
    if (!isAdmin) return null;
    if (editingSection !== section) {
      return (
        <button onClick={() => setEditingSection(section)} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white">
          <Pencil className="size-4" />{isAr ? "تعديل القسم" : "Edit Section"}
        </button>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><X className="size-4" />{isAr ? "إلغاء" : "Cancel"}</button>
        <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#c2a772] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{isAr ? "حفظ" : "Save"}</button>
      </div>
    );
  };

  const setBi = (key: keyof FoundationCompletionExamDetailsData, lang: "ar" | "en", value: string) => {
    setDraft((p) => ({ ...p, [key]: { ...(p[key] as Bilingual), [lang]: value } }));
  };
  const setBiList = (key: keyof FoundationCompletionExamDetailsData, idx: number, lang: "ar" | "en", value: string) => {
    setDraft((p) => {
      const arr = [...(p[key] as Bilingual[])];
      arr[idx] = { ...arr[idx], [lang]: value };
      return { ...p, [key]: arr };
    });
  };

  const biField = (
    label: string,
    valueAr: string,
    valueEn: string,
    onAr: (v: string) => void,
    onEn: (v: string) => void,
    large = false,
  ) => (
    <div className="rounded-lg border-2 border-gray-200 bg-white p-3 shadow-sm">
      <p className="mb-2 text-xs font-semibold text-[#254151]">{label}</p>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <textarea className={`w-full rounded border px-2 py-1 ${large ? "min-h-[110px]" : "min-h-[72px]"}`} value={valueAr} onChange={(e) => onAr(e.target.value)} dir="rtl" />
        <textarea className={`w-full rounded border px-2 py-1 ${large ? "min-h-[110px]" : "min-h-[72px]"}`} value={valueEn} onChange={(e) => onEn(e.target.value)} dir="ltr" />
      </div>
    </div>
  );

  const renumberSections = (list: ExamSection[]) => list.map((s, i) => ({ ...s, id: i + 1 }));

  const defaultExamSection = (): ExamSection => ({
    id: 1,
    title: { ar: "", en: "" },
    subtitle: { ar: "", en: "" },
    tasksLabel: { ar: "المهام", en: "Tasks" },
    tasksValue: { ar: "", en: "" },
    marksLabel: { ar: "الدرجات", en: "Marks" },
    marksValue: { ar: "", en: "" },
    description: { ar: "", en: "" },
    color: "blue",
    icon: "book",
  });

  const patchSection = (index: number, patch: Partial<ExamSection>) => {
    setDraft((p) => {
      const list = [...p.sections];
      list[index] = { ...list[index], ...patch };
      return { ...p, sections: renumberSections(list) };
    });
  };

  const addExamSection = () => {
    setDraft((p) => ({ ...p, sections: renumberSections([...p.sections, defaultExamSection()]) }));
  };

  const removeExamSection = (index: number) => {
    setDraft((p) => {
      if (p.sections.length <= 1) return p;
      return { ...p, sections: renumberSections(p.sections.filter((_, j) => j !== index)) };
    });
  };

  const defaultSuccessCard = (): SuccessCard => ({
    title: { ar: "", en: "" },
    value: { ar: "", en: "" },
    text: { ar: "", en: "" },
    color: "blue",
  });

  const patchSuccessCard = (index: number, patch: Partial<SuccessCard>) => {
    setDraft((p) => {
      const list = [...p.successCards];
      list[index] = { ...list[index], ...patch };
      return { ...p, successCards: list };
    });
  };

  const addSuccessCard = () => {
    setDraft((p) => ({ ...p, successCards: [...p.successCards, defaultSuccessCard()] }));
  };

  const removeSuccessCard = (index: number) => {
    setDraft((p) => {
      if (p.successCards.length <= 1) return p;
      return { ...p, successCards: p.successCards.filter((_, j) => j !== index) };
    });
  };

  const defaultConversionRow = (): ConversionRow => ({
    rawScore: "",
    band: "",
    level: { ar: "", en: "" },
    status: { ar: "", en: "" },
  });

  const patchConversionRow = (index: number, patch: Partial<ConversionRow>) => {
    setDraft((p) => {
      const list = [...p.conversionRows];
      list[index] = { ...list[index], ...patch };
      return { ...p, conversionRows: list };
    });
  };

  const addConversionRow = () => {
    setDraft((p) => ({ ...p, conversionRows: [...p.conversionRows, defaultConversionRow()] }));
  };

  const removeConversionRow = (index: number) => {
    setDraft((p) => {
      if (p.conversionRows.length <= 1) return p;
      return { ...p, conversionRows: p.conversionRows.filter((_, j) => j !== index) };
    });
  };

  const defaultRetakeCard = (): RetakeCard => ({
    title: { ar: "", en: "" },
    text: { ar: "", en: "" },
  });

  const patchRetakeCard = (index: number, patch: Partial<RetakeCard>) => {
    setDraft((p) => {
      const list = [...p.retakeCards];
      list[index] = { ...list[index], ...patch };
      return { ...p, retakeCards: list };
    });
  };

  const addRetakeCard = () => {
    setDraft((p) => ({ ...p, retakeCards: [...p.retakeCards, defaultRetakeCard()] }));
  };

  const removeRetakeCard = (index: number) => {
    setDraft((p) => {
      if (p.retakeCards.length <= 1) return p;
      return { ...p, retakeCards: p.retakeCards.filter((_, j) => j !== index) };
    });
  };

  const addRetakeImportantItem = () => {
    setDraft((p) => ({
      ...p,
      retakeImportantItems: [...p.retakeImportantItems, { ar: "", en: "" }],
    }));
  };

  const removeRetakeImportantItem = (index: number) => {
    setDraft((p) => {
      if (p.retakeImportantItems.length <= 1) return p;
      return {
        ...p,
        retakeImportantItems: p.retakeImportantItems.filter((_, j) => j !== index),
      };
    });
  };

  const defaultSampleButton = (): SampleButton => ({
    label: { ar: "", en: "" },
    color: "blue",
    fileUrl: "",
  });

  const patchSampleButton = (index: number, patch: Partial<SampleButton>) => {
    setDraft((p) => {
      const list = [...p.sampleButtons];
      list[index] = { ...list[index], ...patch };
      return { ...p, sampleButtons: list };
    });
  };

  const addSampleButton = () => {
    setDraft((p) => ({ ...p, sampleButtons: [...p.sampleButtons, defaultSampleButton()] }));
  };

  const removeSampleButton = (index: number) => {
    setDraft((p) => {
      if (p.sampleButtons.length <= 1) return p;
      return { ...p, sampleButtons: p.sampleButtons.filter((_, j) => j !== index) };
    });
  };

  const uploadSampleFile = async (index: number, file: File) => {
    setSampleUploadingIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: formData, credentials: "include" });
      const json = (await res.json()) as {
        ok?: boolean;
        relativePath?: string;
        message?: string;
      };
      if (!res.ok || !json.ok) return;
      const uploadedPath = json.relativePath?.trim();
      if (uploadedPath) patchSampleButton(index, { fileUrl: uploadedPath });
    } finally {
      setSampleUploadingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-16">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-end">{sectionActions("hero")}</div>
            <div className="flex justify-center mb-6"><div className="bg-white/20 backdrop-blur-sm p-5 rounded-full"><FileText className="size-16" /></div></div>
            {editingSection !== "hero" ? (
              <>
                <h1 className="text-5xl font-bold mb-4">{tr(t.heroTitle)}</h1>
                <h2 className="text-2xl font-bold mb-6 opacity-90">{tr(t.heroSubtitle)}</h2>
                <p className="text-xl opacity-95">{tr(t.heroDescription)}</p>
              </>
            ) : (
              <div id="edit-hero" className="grid gap-3 rounded-lg bg-white/10 p-3">
                {biField("Hero Title", t.heroTitle.ar, t.heroTitle.en, (v) => setBi("heroTitle", "ar", v), (v) => setBi("heroTitle", "en", v))}
                {biField("Hero Subtitle", t.heroSubtitle.ar, t.heroSubtitle.en, (v) => setBi("heroSubtitle", "ar", v), (v) => setBi("heroSubtitle", "en", v))}
                {biField("Hero Description", t.heroDescription.ar, t.heroDescription.en, (v) => setBi("heroDescription", "ar", v), (v) => setBi("heroDescription", "en", v), true)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0 rounded-full bg-indigo-600 p-4 text-white">
                  <FileText className="size-8" />
                </div>
                {editingSection !== "overview" ? (
                  <h2 className="text-3xl font-bold text-[#254151]">{tr(t.overviewTitle)}</h2>
                ) : (
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-indigo-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.overviewTitle.ar}
                      onChange={(e) => setBi("overviewTitle", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-indigo-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.overviewTitle.en}
                      onChange={(e) => setBi("overviewTitle", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              {sectionActions("overview")}
            </div>
            {editingSection !== "overview" ? (
              <div className="rounded-lg border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-8">
                <p className="mb-4 text-lg leading-relaxed text-gray-700">{tr(t.overviewText)}</p>
                <div className="rounded-lg border-2 border-indigo-300 bg-white p-6 shadow-md">
                  <div className="flex items-center gap-3">
                    <Award className="size-8 shrink-0 text-indigo-600" />
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-[#254151]">{tr(t.standardTitle)}</h3>
                      <p className="text-gray-700">{tr(t.standardText)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="edit-overview"
                className="rounded-lg border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-8"
              >
                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <textarea
                    className="w-full min-h-[120px] resize-y rounded-lg border-2 border-indigo-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700 shadow-sm"
                    value={t.overviewText.ar}
                    onChange={(e) => setBi("overviewText", "ar", e.target.value)}
                    dir="rtl"
                  />
                  <textarea
                    className="w-full min-h-[120px] resize-y rounded-lg border-2 border-indigo-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700 shadow-sm"
                    value={t.overviewText.en}
                    onChange={(e) => setBi("overviewText", "en", e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="rounded-lg border-2 border-indigo-300 bg-white p-6 shadow-md">
                  <div className="flex items-start gap-3">
                    <Award className="size-8 shrink-0 text-indigo-600" />
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-indigo-200 bg-indigo-50/50 px-3 py-2 text-xl font-bold text-[#254151]"
                          value={t.standardTitle.ar}
                          onChange={(e) => setBi("standardTitle", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-indigo-200 bg-indigo-50/50 px-3 py-2 text-xl font-bold text-[#254151]"
                          value={t.standardTitle.en}
                          onChange={(e) => setBi("standardTitle", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-indigo-200 bg-white px-3 py-2 text-gray-700"
                          value={t.standardText.ar}
                          onChange={(e) => setBi("standardText", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-indigo-200 bg-white px-3 py-2 text-gray-700"
                          value={t.standardText.en}
                          onChange={(e) => setBi("standardText", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {editingSection !== "sections" ? (
                <h2 className="flex-1 text-center text-3xl font-bold text-[#254151] sm:text-start">{tr(t.sectionsTitle)}</h2>
              ) : (
                <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                  <textarea
                    className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                    value={t.sectionsTitle.ar}
                    onChange={(e) => setBi("sectionsTitle", "ar", e.target.value)}
                    dir="rtl"
                  />
                  <textarea
                    className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                    value={t.sectionsTitle.en}
                    onChange={(e) => setBi("sectionsTitle", "en", e.target.value)}
                    dir="ltr"
                  />
                </div>
              )}
              <div className="flex shrink-0 justify-center sm:justify-end">{sectionActions("sections")}</div>
            </div>
            {editingSection !== "sections" ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {t.sections.map((s, i) => (
                    <div
                      key={s.id}
                      className={`rounded-lg border-2 bg-white p-8 shadow-xl ${sectionCardBorder(s.color)}`}
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <div
                          className={`flex size-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white ${sectionNumberCircle(s.color)}`}
                        >
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 text-2xl font-bold text-[#254151]">{tr(s.title)}</h3>
                          <p className="text-lg text-gray-600">{tr(s.subtitle)}</p>
                        </div>
                        <div className={`rounded-full p-3 ${sectionIconPill(s.color)}`}>
                          <SectionIconGlyph icon={s.icon} index={i} />
                        </div>
                      </div>
                      <div className={`mb-4 rounded-lg border-2 p-6 ${sectionInnerPanel(s.color)}`}>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="mb-1 text-sm text-gray-600">{tr(s.tasksLabel)}</p>
                            <p className="text-lg font-bold text-[#254151]">{tr(s.tasksValue)}</p>
                          </div>
                          <div>
                            <p className="mb-1 text-sm text-gray-600">{tr(s.marksLabel)}</p>
                            <p className="text-lg font-bold text-[#254151]">{tr(s.marksValue)}</p>
                          </div>
                        </div>
                        {s.durationLabel && s.durationValue ? (
                          <div className="rounded-lg border-2 border-amber-200 bg-white p-3">
                            <div className="flex items-center gap-2">
                              <Clock className="size-5 shrink-0 text-amber-600" />
                              <span className="font-bold text-[#254151]">
                                {tr(s.durationLabel)}: {tr(s.durationValue)}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <p className="leading-relaxed text-gray-700">{tr(s.description)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="size-8 shrink-0 text-amber-600" />
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-[#254151]">{tr(t.writtenDurationTitle)}</h3>
                      <p className="text-lg text-gray-700">{tr(t.writtenDurationText)}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="edit-sections" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {t.sections.map((s, i) => {
                    const hasDuration = Boolean(s.durationLabel && s.durationValue);
                    return (
                      <div
                        key={s.id}
                        className={`rounded-lg border-2 bg-white p-8 shadow-xl ${sectionCardBorder(s.color)}`}
                      >
                        <div className="mb-4 flex flex-wrap items-start gap-4">
                          <div
                            className={`flex size-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white ${sectionNumberCircle(s.color)}`}
                          >
                            {i + 1}
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                              <textarea
                                className="w-full min-h-[3rem] resize-y rounded-lg border border-gray-200 bg-white px-2 py-1 text-2xl font-bold text-[#254151]"
                                value={s.title.ar}
                                onChange={(e) =>
                                  patchSection(i, { title: { ...s.title, ar: e.target.value } })
                                }
                                dir="rtl"
                              />
                              <textarea
                                className="w-full min-h-[3rem] resize-y rounded-lg border border-gray-200 bg-white px-2 py-1 text-2xl font-bold text-[#254151]"
                                value={s.title.en}
                                onChange={(e) =>
                                  patchSection(i, { title: { ...s.title, en: e.target.value } })
                                }
                                dir="ltr"
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                              <textarea
                                className="w-full min-h-[2.75rem] resize-y rounded-lg border border-gray-200 bg-white px-2 py-1 text-lg text-gray-600"
                                value={s.subtitle.ar}
                                onChange={(e) =>
                                  patchSection(i, { subtitle: { ...s.subtitle, ar: e.target.value } })
                                }
                                dir="rtl"
                              />
                              <textarea
                                className="w-full min-h-[2.75rem] resize-y rounded-lg border border-gray-200 bg-white px-2 py-1 text-lg text-gray-600"
                                value={s.subtitle.en}
                                onChange={(e) =>
                                  patchSection(i, { subtitle: { ...s.subtitle, en: e.target.value } })
                                }
                                dir="ltr"
                              />
                            </div>
                          </div>
                          <div className="ms-auto flex shrink-0 flex-col items-end gap-2">
                            <div className={`rounded-full p-3 ${sectionIconPill(s.color)}`}>
                              <SectionIconGlyph icon={s.icon} index={i} />
                            </div>
                            <select
                              className="max-w-[200px] rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-[#254151]"
                              value={s.icon ?? SECTION_ICON_ORDER[i % SECTION_ICON_ORDER.length]}
                              onChange={(e) =>
                                patchSection(i, { icon: e.target.value as CompletionExamSectionIcon })
                              }
                            >
                              <option value="book">{isAr ? "أيقونة: كتاب" : "Icon: Book"}</option>
                              <option value="headphones">{isAr ? "أيقونة: سماعة" : "Icon: Headphones"}</option>
                              <option value="pencil">{isAr ? "أيقونة: قلم" : "Icon: Pencil"}</option>
                              <option value="message">{isAr ? "أيقونة: محادثة" : "Icon: Message"}</option>
                            </select>
                            <select
                              className="max-w-[200px] rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-[#254151]"
                              value={s.color}
                              onChange={(e) => patchSection(i, { color: e.target.value as SectionColor })}
                            >
                              <option value="blue">{isAr ? "لون: أزرق" : "Color: Blue"}</option>
                              <option value="green">{isAr ? "لون: أخضر" : "Color: Green"}</option>
                              <option value="purple">{isAr ? "لون: بنفسجي" : "Color: Purple"}</option>
                              <option value="amber">{isAr ? "لون: كهرماني" : "Color: Amber"}</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeExamSection(i)}
                              disabled={t.sections.length <= 1}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Trash2 className="size-3.5" />
                              {isAr ? "حذف القسم" : "Delete"}
                            </button>
                          </div>
                        </div>
                        <div className={`mb-4 rounded-lg border-2 p-6 ${sectionInnerPanel(s.color)}`}>
                          <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-gray-600">{isAr ? "المهام" : "Tasks"}</p>
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm"
                                value={s.tasksLabel.ar}
                                onChange={(e) =>
                                  patchSection(i, { tasksLabel: { ...s.tasksLabel, ar: e.target.value } })
                                }
                                dir="rtl"
                                placeholder={isAr ? "تسمية (عربي)" : "Label (AR)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm"
                                value={s.tasksLabel.en}
                                onChange={(e) =>
                                  patchSection(i, { tasksLabel: { ...s.tasksLabel, en: e.target.value } })
                                }
                                dir="ltr"
                                placeholder={isAr ? "تسمية (إنجليزي)" : "Label (EN)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm font-bold text-[#254151]"
                                value={s.tasksValue.ar}
                                onChange={(e) =>
                                  patchSection(i, { tasksValue: { ...s.tasksValue, ar: e.target.value } })
                                }
                                dir="rtl"
                                placeholder={isAr ? "القيمة (عربي)" : "Value (AR)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm font-bold text-[#254151]"
                                value={s.tasksValue.en}
                                onChange={(e) =>
                                  patchSection(i, { tasksValue: { ...s.tasksValue, en: e.target.value } })
                                }
                                dir="ltr"
                                placeholder={isAr ? "القيمة (إنجليزي)" : "Value (EN)"}
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-gray-600">{isAr ? "الدرجات" : "Marks"}</p>
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm"
                                value={s.marksLabel.ar}
                                onChange={(e) =>
                                  patchSection(i, { marksLabel: { ...s.marksLabel, ar: e.target.value } })
                                }
                                dir="rtl"
                                placeholder={isAr ? "تسمية (عربي)" : "Label (AR)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm"
                                value={s.marksLabel.en}
                                onChange={(e) =>
                                  patchSection(i, { marksLabel: { ...s.marksLabel, en: e.target.value } })
                                }
                                dir="ltr"
                                placeholder={isAr ? "تسمية (إنجليزي)" : "Label (EN)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm font-bold text-[#254151]"
                                value={s.marksValue.ar}
                                onChange={(e) =>
                                  patchSection(i, { marksValue: { ...s.marksValue, ar: e.target.value } })
                                }
                                dir="rtl"
                                placeholder={isAr ? "القيمة (عربي)" : "Value (AR)"}
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-white/80 bg-white/90 px-2 py-1 text-sm font-bold text-[#254151]"
                                value={s.marksValue.en}
                                onChange={(e) =>
                                  patchSection(i, { marksValue: { ...s.marksValue, en: e.target.value } })
                                }
                                dir="ltr"
                                placeholder={isAr ? "القيمة (إنجليزي)" : "Value (EN)"}
                              />
                            </div>
                          </div>
                          <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#254151]">
                            <input
                              type="checkbox"
                              className="size-4 rounded border-gray-400"
                              checked={hasDuration}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  patchSection(i, {
                                    durationLabel: s.durationLabel ?? { ar: "المدة", en: "Duration" },
                                    durationValue: s.durationValue ?? { ar: "", en: "" },
                                  });
                                } else {
                                  patchSection(i, { durationLabel: undefined, durationValue: undefined });
                                }
                              }}
                            />
                            {isAr ? "إظهار المدة" : "Show duration"}
                          </label>
                          {hasDuration ? (
                            <div className="rounded-lg border-2 border-amber-200 bg-white p-3">
                              <div className="mb-2 flex items-center gap-2 text-amber-700">
                                <Clock className="size-5 shrink-0" />
                                <span className="text-xs font-bold">{isAr ? "المدة" : "Duration"}</span>
                              </div>
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <textarea
                                  className="w-full min-h-[2.25rem] resize-y rounded border border-amber-100 px-2 py-1 text-sm"
                                  value={s.durationLabel?.ar ?? ""}
                                  onChange={(e) =>
                                    patchSection(i, {
                                      durationLabel: { ...(s.durationLabel ?? { ar: "", en: "" }), ar: e.target.value },
                                    })
                                  }
                                  dir="rtl"
                                />
                                <textarea
                                  className="w-full min-h-[2.25rem] resize-y rounded border border-amber-100 px-2 py-1 text-sm"
                                  value={s.durationLabel?.en ?? ""}
                                  onChange={(e) =>
                                    patchSection(i, {
                                      durationLabel: { ...(s.durationLabel ?? { ar: "", en: "" }), en: e.target.value },
                                    })
                                  }
                                  dir="ltr"
                                />
                                <textarea
                                  className="w-full min-h-[2.25rem] resize-y rounded border border-amber-100 px-2 py-1 text-sm font-bold text-[#254151]"
                                  value={s.durationValue?.ar ?? ""}
                                  onChange={(e) =>
                                    patchSection(i, {
                                      durationValue: { ...(s.durationValue ?? { ar: "", en: "" }), ar: e.target.value },
                                    })
                                  }
                                  dir="rtl"
                                />
                                <textarea
                                  className="w-full min-h-[2.25rem] resize-y rounded border border-amber-100 px-2 py-1 text-sm font-bold text-[#254151]"
                                  value={s.durationValue?.en ?? ""}
                                  onChange={(e) =>
                                    patchSection(i, {
                                      durationValue: { ...(s.durationValue ?? { ar: "", en: "" }), en: e.target.value },
                                    })
                                  }
                                  dir="ltr"
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          <textarea
                            className="w-full min-h-[100px] resize-y rounded-lg border border-gray-200 bg-white px-2 py-2 text-gray-700"
                            value={s.description.ar}
                            onChange={(e) =>
                              patchSection(i, { description: { ...s.description, ar: e.target.value } })
                            }
                            dir="rtl"
                          />
                          <textarea
                            className="w-full min-h-[100px] resize-y rounded-lg border border-gray-200 bg-white px-2 py-2 text-gray-700"
                            value={s.description.en}
                            onChange={(e) =>
                              patchSection(i, { description: { ...s.description, en: e.target.value } })
                            }
                            dir="ltr"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addExamSection}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#1a2f3c]"
                  >
                    <Plus className="size-4" />
                    {isAr ? "إضافة قسم" : "Add section"}
                  </button>
                </div>
                <div className="rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="size-8 shrink-0 text-amber-600" />
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-amber-200 bg-white px-3 py-2 text-xl font-bold text-[#254151]"
                          value={t.writtenDurationTitle.ar}
                          onChange={(e) => setBi("writtenDurationTitle", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-amber-200 bg-white px-3 py-2 text-xl font-bold text-[#254151]"
                          value={t.writtenDurationTitle.en}
                          onChange={(e) => setBi("writtenDurationTitle", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-amber-200 bg-white px-3 py-2 text-lg text-gray-700"
                          value={t.writtenDurationText.ar}
                          onChange={(e) => setBi("writtenDurationText", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-amber-200 bg-white px-3 py-2 text-lg text-gray-700"
                          value={t.writtenDurationText.en}
                          onChange={(e) => setBi("writtenDurationText", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12 rounded-lg border-2 border-green-200 bg-white p-10 shadow-xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0 rounded-full bg-green-600 p-4 text-white">
                  <Award className="size-8" />
                </div>
                {editingSection !== "success" ? (
                  <h2 className="text-3xl font-bold text-[#254151]">{tr(t.successTitle)}</h2>
                ) : (
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-green-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.successTitle.ar}
                      onChange={(e) => setBi("successTitle", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-green-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.successTitle.en}
                      onChange={(e) => setBi("successTitle", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">{sectionActions("success")}</div>
            </div>
            {editingSection !== "success" ? (
              <>
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {t.successCards.map((c, i) => (
                    <div key={i} className={`rounded-lg border-2 p-6 ${successCardPanel(c.color)}`}>
                      <div
                        className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full text-white ${successCardSolid(c.color)}`}
                      >
                        <Award className="size-8" />
                      </div>
                      <h3 className="mb-2 text-center text-xl font-bold text-[#254151]">{tr(c.title)}</h3>
                      <div
                        className={`mb-3 rounded-lg py-3 text-center text-2xl font-bold text-white ${successCardSolid(c.color)}`}
                      >
                        {tr(c.value)}
                      </div>
                      <p className="text-center text-sm text-gray-700">{tr(c.text)}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="size-10 shrink-0 text-green-600" />
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-[#254151]">{tr(t.successConditionsTitle)}</h3>
                      <p className="text-lg leading-relaxed text-gray-700">{tr(t.successConditionsText)}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="edit-success" className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {t.successCards.map((c, i) => (
                    <div key={i} className={`rounded-lg border-2 p-6 ${successCardPanel(c.color)}`}>
                      <div
                        className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full text-white ${successCardSolid(c.color)}`}
                      >
                        <Award className="size-8" />
                      </div>
                      <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[2.75rem] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-lg font-bold text-[#254151]"
                          value={c.title.ar}
                          onChange={(e) =>
                            patchSuccessCard(i, { title: { ...c.title, ar: e.target.value } })
                          }
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[2.75rem] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-lg font-bold text-[#254151]"
                          value={c.title.en}
                          onChange={(e) =>
                            patchSuccessCard(i, { title: { ...c.title, en: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className={`mb-3 rounded-lg p-2 ${successCardSolid(c.color)}`}>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          <textarea
                            className="w-full min-h-[2.75rem] resize-y rounded-md border border-white/40 bg-white/95 px-2 py-2 text-center text-xl font-bold text-[#254151]"
                            value={c.value.ar}
                            onChange={(e) =>
                              patchSuccessCard(i, { value: { ...c.value, ar: e.target.value } })
                            }
                            dir="rtl"
                          />
                          <textarea
                            className="w-full min-h-[2.75rem] resize-y rounded-md border border-white/40 bg-white/95 px-2 py-2 text-center text-xl font-bold text-[#254151]"
                            value={c.value.en}
                            onChange={(e) =>
                              patchSuccessCard(i, { value: { ...c.value, en: e.target.value } })
                            }
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[72px] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-sm text-gray-700"
                          value={c.text.ar}
                          onChange={(e) =>
                            patchSuccessCard(i, { text: { ...c.text, ar: e.target.value } })
                          }
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[72px] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-sm text-gray-700"
                          value={c.text.en}
                          onChange={(e) =>
                            patchSuccessCard(i, { text: { ...c.text, en: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className="flex flex-col gap-2 border-t border-green-200/60 pt-3">
                        <select
                          className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-semibold text-[#254151]"
                          value={c.color}
                          onChange={(e) =>
                            patchSuccessCard(i, { color: e.target.value as SuccessTone })
                          }
                        >
                          <option value="blue">{isAr ? "لون: أزرق" : "Color: Blue"}</option>
                          <option value="green">{isAr ? "لون: أخضر" : "Color: Green"}</option>
                          <option value="purple">{isAr ? "لون: بنفسجي" : "Color: Purple"}</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeSuccessCard(i)}
                          disabled={t.successCards.length <= 1}
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 className="size-3.5" />
                          {isAr ? "حذف البطاقة" : "Remove card"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addSuccessCard}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800"
                  >
                    <Plus className="size-4" />
                    {isAr ? "إضافة بطاقة" : "Add card"}
                  </button>
                </div>
                <div className="rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="size-10 shrink-0 text-green-600" />
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-green-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                          value={t.successConditionsTitle.ar}
                          onChange={(e) => setBi("successConditionsTitle", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-green-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                          value={t.successConditionsTitle.en}
                          onChange={(e) => setBi("successConditionsTitle", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[120px] resize-y rounded-lg border border-green-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700"
                          value={t.successConditionsText.ar}
                          onChange={(e) => setBi("successConditionsText", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[120px] resize-y rounded-lg border border-green-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700"
                          value={t.successConditionsText.en}
                          onChange={(e) => setBi("successConditionsText", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12 rounded-lg border-2 border-purple-200 bg-white p-10 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0 rounded-full bg-purple-600 p-4 text-white">
                  <TrendingUp className="size-8" />
                </div>
                {editingSection !== "conversion" ? (
                  <h2 className="text-3xl font-bold text-[#254151]">{tr(t.conversionTitle)}</h2>
                ) : (
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-purple-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.conversionTitle.ar}
                      onChange={(e) => setBi("conversionTitle", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-purple-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.conversionTitle.en}
                      onChange={(e) => setBi("conversionTitle", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">{sectionActions("conversion")}</div>
            </div>
            {editingSection !== "conversion" ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                        <th className="border-2 border-white p-4 text-right">
                          {isAr ? "الدرجة الخام" : "Raw Score"}
                        </th>
                        <th className="border-2 border-white p-4 text-center">
                          {isAr ? "درجة النطاق" : "Band Score"}
                        </th>
                        <th className="border-2 border-white p-4 text-right">
                          {isAr ? "المستوى" : "Level"}
                        </th>
                        <th className="border-2 border-white p-4 text-center">
                          {isAr ? "الحالة" : "Status"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.conversionRows.map((r, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="border-2 border-gray-200 p-4 font-mono">{r.rawScore}</td>
                          <td className="border-2 border-gray-200 p-4 text-center">
                            <span className="inline-block min-w-[60px] rounded-full bg-purple-600 px-4 py-2 font-bold text-white">
                              {r.band}
                            </span>
                          </td>
                          <td className="border-2 border-gray-200 p-4 font-bold text-[#254151]">{tr(r.level)}</td>
                          <td className="border-2 border-gray-200 p-4 text-center">
                            <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                              {tr(r.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                  <p className="text-lg text-gray-700">
                    <strong>{isAr ? "ملاحظة:" : "Note:"}</strong> {tr(t.conversionNote)}
                  </p>
                </div>
              </>
            ) : (
              <div id="edit-conversion" className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                        <th className="border-2 border-white p-3 text-right text-sm font-bold">
                          {isAr ? "الدرجة الخام" : "Raw Score"}
                        </th>
                        <th className="border-2 border-white p-3 text-center text-sm font-bold">
                          {isAr ? "درجة النطاق" : "Band Score"}
                        </th>
                        <th className="min-w-[140px] border-2 border-white p-3 text-right text-sm font-bold">
                          {isAr ? "المستوى" : "Level"}
                        </th>
                        <th className="min-w-[140px] border-2 border-white p-3 text-center text-sm font-bold">
                          {isAr ? "الحالة" : "Status"}
                        </th>
                        <th className="border-2 border-white p-3 text-center text-sm font-bold">
                          {isAr ? "حذف" : "Del."}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.conversionRows.map((r, idx) => (
                        <tr key={idx} className="border-b bg-white">
                          <td className="align-top border-2 border-gray-200 p-2">
                            <input
                              className="w-full min-w-[5rem] rounded border border-gray-300 bg-gray-50 px-2 py-2 font-mono text-sm"
                              value={r.rawScore}
                              onChange={(e) => patchConversionRow(idx, { rawScore: e.target.value })}
                              dir="ltr"
                            />
                          </td>
                          <td className="align-top border-2 border-gray-200 p-2 text-center">
                            <input
                              className="mx-auto block w-full min-w-[3rem] max-w-[6rem] rounded-full border-2 border-purple-400 bg-purple-50 px-2 py-2 text-center text-sm font-bold text-purple-900"
                              value={r.band}
                              onChange={(e) => patchConversionRow(idx, { band: e.target.value })}
                              dir="ltr"
                            />
                          </td>
                          <td className="align-top border-2 border-gray-200 p-2">
                            <div className="flex flex-col gap-1">
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-gray-300 px-2 py-1 text-xs font-bold text-[#254151]"
                                value={r.level.ar}
                                onChange={(e) =>
                                  patchConversionRow(idx, { level: { ...r.level, ar: e.target.value } })
                                }
                                dir="rtl"
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-gray-300 px-2 py-1 text-xs font-bold text-[#254151]"
                                value={r.level.en}
                                onChange={(e) =>
                                  patchConversionRow(idx, { level: { ...r.level, en: e.target.value } })
                                }
                                dir="ltr"
                              />
                            </div>
                          </td>
                          <td className="align-top border-2 border-gray-200 p-2">
                            <div className="flex flex-col gap-1">
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-800"
                                value={r.status.ar}
                                onChange={(e) =>
                                  patchConversionRow(idx, { status: { ...r.status, ar: e.target.value } })
                                }
                                dir="rtl"
                              />
                              <textarea
                                className="w-full min-h-[2.5rem] resize-y rounded border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-800"
                                value={r.status.en}
                                onChange={(e) =>
                                  patchConversionRow(idx, { status: { ...r.status, en: e.target.value } })
                                }
                                dir="ltr"
                              />
                            </div>
                          </td>
                          <td className="align-middle border-2 border-gray-200 p-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeConversionRow(idx)}
                              disabled={t.conversionRows.length <= 1}
                              className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={isAr ? "حذف الصف" : "Delete row"}
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addConversionRow}
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-800"
                  >
                    <Plus className="size-4" />
                    {isAr ? "إضافة صف" : "Add row"}
                  </button>
                </div>
                <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6">
                  <p className="mb-3 text-lg text-gray-700">
                    <strong>{isAr ? "ملاحظة:" : "Note:"}</strong>
                  </p>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[100px] resize-y rounded-lg border border-purple-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700"
                      value={t.conversionNote.ar}
                      onChange={(e) => setBi("conversionNote", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[100px] resize-y rounded-lg border border-purple-200 bg-white px-3 py-2 text-lg leading-relaxed text-gray-700"
                      value={t.conversionNote.en}
                      onChange={(e) => setBi("conversionNote", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12 rounded-lg border-2 border-orange-200 bg-white p-10 shadow-xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0 rounded-full bg-orange-600 p-4 text-white">
                  <TrendingUp className="size-8" />
                </div>
                {editingSection !== "retake" ? (
                  <h2 className="text-3xl font-bold text-[#254151]">{tr(t.retakeTitle)}</h2>
                ) : (
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-orange-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.retakeTitle.ar}
                      onChange={(e) => setBi("retakeTitle", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-orange-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.retakeTitle.en}
                      onChange={(e) => setBi("retakeTitle", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">{sectionActions("retake")}</div>
            </div>
            {editingSection !== "retake" ? (
              <>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {t.retakeCards.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6"
                    >
                      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-600 text-white">
                        <TrendingUp className="size-8" />
                      </div>
                      <h3 className="mb-3 text-center text-xl font-bold text-[#254151]">{tr(c.title)}</h3>
                      <p className="text-center text-gray-700">{tr(c.text)}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="size-10 shrink-0 text-orange-600" />
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 text-xl font-bold text-[#254151]">{tr(t.retakeImportantTitle)}</h3>
                      <ul className="space-y-2 text-gray-700">
                        {t.retakeImportantItems.map((x, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-600" />
                            <span>{tr(x)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="edit-retake" className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {t.retakeCards.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6"
                    >
                      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-600 text-white">
                        <TrendingUp className="size-8" />
                      </div>
                      <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[2.75rem] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-lg font-bold text-[#254151]"
                          value={c.title.ar}
                          onChange={(e) =>
                            patchRetakeCard(i, { title: { ...c.title, ar: e.target.value } })
                          }
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[2.75rem] resize-y rounded-lg border border-white/80 bg-white px-2 py-1 text-center text-lg font-bold text-[#254151]"
                          value={c.title.en}
                          onChange={(e) =>
                            patchRetakeCard(i, { title: { ...c.title, en: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-white/80 bg-white px-2 py-2 text-center text-gray-700"
                          value={c.text.ar}
                          onChange={(e) =>
                            patchRetakeCard(i, { text: { ...c.text, ar: e.target.value } })
                          }
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[88px] resize-y rounded-lg border border-white/80 bg-white px-2 py-2 text-center text-gray-700"
                          value={c.text.en}
                          onChange={(e) =>
                            patchRetakeCard(i, { text: { ...c.text, en: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRetakeCard(i)}
                        disabled={t.retakeCards.length <= 1}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-2 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="size-3.5" />
                        {isAr ? "حذف البطاقة" : "Remove card"}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addRetakeCard}
                    className="inline-flex items-center gap-2 rounded-lg bg-orange-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-800"
                  >
                    <Plus className="size-4" />
                    {isAr ? "إضافة بطاقة" : "Add card"}
                  </button>
                </div>
                <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="size-10 shrink-0 text-orange-600" />
                    <div className="min-w-0 flex-1 space-y-4">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-orange-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                          value={t.retakeImportantTitle.ar}
                          onChange={(e) => setBi("retakeImportantTitle", "ar", e.target.value)}
                          dir="rtl"
                        />
                        <textarea
                          className="w-full min-h-[3rem] resize-y rounded-lg border-2 border-orange-200 bg-white px-3 py-2 text-xl font-bold text-[#254151] shadow-sm"
                          value={t.retakeImportantTitle.en}
                          onChange={(e) => setBi("retakeImportantTitle", "en", e.target.value)}
                          dir="ltr"
                        />
                      </div>
                      <ul className="space-y-3">
                        {t.retakeImportantItems.map((x, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 rounded-lg border border-orange-200/80 bg-white/70 p-3"
                          >
                            <CheckCircle2 className="mt-1 size-5 shrink-0 text-orange-600" />
                            <div className="min-w-0 flex-1 grid grid-cols-1 gap-2 md:grid-cols-2">
                              <textarea
                                className="w-full min-h-[72px] resize-y rounded-lg border border-orange-100 px-2 py-1 text-sm text-gray-700"
                                value={x.ar}
                                onChange={(e) =>
                                  setBiList("retakeImportantItems", i, "ar", e.target.value)
                                }
                                dir="rtl"
                              />
                              <textarea
                                className="w-full min-h-[72px] resize-y rounded-lg border border-orange-100 px-2 py-1 text-sm text-gray-700"
                                value={x.en}
                                onChange={(e) =>
                                  setBiList("retakeImportantItems", i, "en", e.target.value)
                                }
                                dir="ltr"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeRetakeImportantItem(i)}
                              disabled={t.retakeImportantItems.length <= 1}
                              className="shrink-0 self-start rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={isAr ? "حذف البند" : "Remove item"}
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center pt-1">
                        <button
                          type="button"
                          onClick={addRetakeImportantItem}
                          className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-800 shadow-sm hover:bg-orange-50"
                        >
                          <Plus className="size-4" />
                          {isAr ? "إضافة بند" : "Add item"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-10 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0 rounded-full bg-blue-600 p-4 text-white">
                  <Download className="size-8" />
                </div>
                {editingSection !== "sample" ? (
                  <h2 className="text-3xl font-bold text-[#254151]">{tr(t.sampleTitle)}</h2>
                ) : (
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-blue-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.sampleTitle.ar}
                      onChange={(e) => setBi("sampleTitle", "ar", e.target.value)}
                      dir="rtl"
                    />
                    <textarea
                      className="w-full min-h-[3.25rem] resize-y rounded-lg border-2 border-blue-200 bg-white px-3 py-2 text-2xl font-bold text-[#254151] shadow-sm"
                      value={t.sampleTitle.en}
                      onChange={(e) => setBi("sampleTitle", "en", e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              <div className="flex shrink-0 justify-center sm:justify-end">{sectionActions("sample")}</div>
            </div>
            {editingSection !== "sample" ? (
              <div className="rounded-lg bg-white p-8 shadow-md">
                <p className="mb-6 text-lg leading-relaxed text-gray-700">{tr(t.sampleText)}</p>
                <div className="flex flex-wrap gap-4">
                  {t.sampleButtons.map((b, i) => {
                    const hrefRaw = (b.fileUrl ?? "").trim();
                    const href = hrefRaw ? resolveUploadImageSrc(hrefRaw) : "";
                    const cls = `inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all rounded-lg ${sampleDownloadBtnClass(b.color)}`;
                    return href ? (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                        download
                      >
                        <Download className="size-6 shrink-0" />
                        <span>{tr(b.label)}</span>
                      </a>
                    ) : (
                      <span
                        key={i}
                        className={`${cls} cursor-not-allowed opacity-50`}
                        title={isAr ? "لم يُرفع ملف بعد" : "No file uploaded yet"}
                      >
                        <Download className="size-6 shrink-0" />
                        <span>{tr(b.label)}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div id="edit-sample" className="space-y-6 rounded-lg border-2 border-blue-100 bg-white p-8 shadow-md">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <textarea
                    className="w-full min-h-[120px] resize-y rounded-lg border-2 border-blue-100 px-3 py-2 text-lg leading-relaxed text-gray-700"
                    value={t.sampleText.ar}
                    onChange={(e) => setBi("sampleText", "ar", e.target.value)}
                    dir="rtl"
                  />
                  <textarea
                    className="w-full min-h-[120px] resize-y rounded-lg border-2 border-blue-100 px-3 py-2 text-lg leading-relaxed text-gray-700"
                    value={t.sampleText.en}
                    onChange={(e) => setBi("sampleText", "en", e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {t.sampleButtons.map((b, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 rounded-lg border-2 border-blue-100 bg-blue-50/50 p-4 md:flex-row md:items-start"
                    >
                      <div
                        className={`inline-flex shrink-0 items-center gap-2 self-start rounded-lg px-4 py-2 text-sm font-bold text-white md:mt-1 ${sampleDownloadBtnClass(b.color)}`}
                      >
                        <Download className="size-5" />
                        <span>{isAr ? `زر ${i + 1}` : `Button ${i + 1}`}</span>
                      </div>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          <textarea
                            className="w-full min-h-[2.75rem] resize-y rounded-lg border border-blue-200 bg-white px-2 py-1 text-sm font-bold text-[#254151]"
                            value={b.label.ar}
                            onChange={(e) =>
                              patchSampleButton(i, { label: { ...b.label, ar: e.target.value } })
                            }
                            dir="rtl"
                          />
                          <textarea
                            className="w-full min-h-[2.75rem] resize-y rounded-lg border border-blue-200 bg-white px-2 py-1 text-sm font-bold text-[#254151]"
                            value={b.label.en}
                            onChange={(e) =>
                              patchSampleButton(i, { label: { ...b.label, en: e.target.value } })
                            }
                            dir="ltr"
                          />
                        </div>
                        <select
                          className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-semibold text-[#254151] md:max-w-sm"
                          value={b.color}
                          onChange={(e) =>
                            patchSampleButton(i, { color: e.target.value as SampleBtnColor })
                          }
                        >
                          <option value="blue">{isAr ? "لون: أزرق" : "Color: Blue"}</option>
                          <option value="green">{isAr ? "لون: أخضر" : "Color: Green"}</option>
                          <option value="purple">{isAr ? "لون: بنفسجي" : "Color: Purple"}</option>
                          <option value="amber">{isAr ? "لون: كهرماني" : "Color: Amber"}</option>
                        </select>
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                            {sampleUploadingIndex === i ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Upload className="size-4" />
                            )}
                            <span>{isAr ? "رفع ملف النموذج" : "Upload sample file"}</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.txt,.md,.rtf"
                              disabled={sampleUploadingIndex !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                e.target.value = "";
                                if (file) void uploadSampleFile(i, file);
                              }}
                            />
                          </label>
                          {b.fileUrl?.trim() ? (
                            <>
                              <a
                                href={resolveUploadImageSrc(b.fileUrl.trim())}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-sm font-medium text-blue-700 underline"
                              >
                                {b.fileUrl.trim()}
                              </a>
                              <button
                                type="button"
                                onClick={() => patchSampleButton(i, { fileUrl: "" })}
                                className="text-xs font-semibold text-red-600 hover:underline"
                              >
                                {isAr ? "إزالة الملف" : "Remove file"}
                              </button>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {isAr ? "لا يوجد ملف بعد" : "No file yet"}
                            </span>
                          )}
                        </div>
                        <textarea
                          className="w-full min-h-[2.5rem] resize-y rounded border border-dashed border-blue-300 bg-white px-2 py-1 font-mono text-xs text-gray-600"
                          value={b.fileUrl ?? ""}
                          onChange={(e) => patchSampleButton(i, { fileUrl: e.target.value })}
                          dir="ltr"
                          placeholder={isAr ? "/api/uploads/..." : "/api/uploads/..."}
                        />
                        <p className="text-xs text-gray-500">
                          {isAr
                            ? "يُخزَّن المسار النسبي (مثل /api/uploads/...) بعد الرفع، أو الصق رابطًا يدويًا."
                            : "Stores relative path (e.g. /api/uploads/...) after upload, or paste manually."}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeSampleButton(i)}
                          disabled={t.sampleButtons.length <= 1}
                          className="inline-flex items-center gap-1 self-start rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 className="size-3.5" />
                          {isAr ? "حذف الزر" : "Remove button"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center border-t border-blue-100 pt-4">
                  <button
                    type="button"
                    onClick={addSampleButton}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800"
                  >
                    <Plus className="size-4" />
                    {isAr ? "إضافة زر تحميل" : "Add download button"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow-xl p-10 border-2 border-teal-200">
            <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-3xl font-bold text-[#254151] text-center">{tr(t.tipsTitle)}</h2>{sectionActions("tips")}</div>
            {editingSection !== "tips" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{t.tips.map((tip, i) => <div key={i} className="bg-white rounded-lg p-6 shadow-md border-2 border-teal-200"><div className="flex items-center gap-3 mb-4"><div className="bg-teal-600 text-white size-12 rounded-full flex items-center justify-center"><BookOpen className="size-6" /></div><h3 className="font-bold text-[#254151] text-xl">{tr(tip.title)}</h3></div><p className="text-gray-700">{tr(tip.text)}</p></div>)}</div>
            ) : (
              <div id="edit-tips" className="grid gap-3 rounded-lg border-2 border-teal-200 bg-white p-4">
                {biField("Tips Title", t.tipsTitle.ar, t.tipsTitle.en, (v) => setBi("tipsTitle", "ar", v), (v) => setBi("tipsTitle", "en", v))}
                {t.tips.map((tip, i) => (
                  <div key={i} className="grid gap-2 rounded-lg border-2 border-teal-100 bg-teal-50 p-3">
                    <p className="text-xs font-semibold text-[#254151]">Tip {i + 1}</p>
                    {biField(
                      "Title",
                      tip.title.ar,
                      tip.title.en,
                      (v) => setDraft((p) => { const a=[...p.tips]; a[i]={...a[i], title:{...a[i].title, ar:v}}; return {...p, tips:a}; }),
                      (v) => setDraft((p) => { const a=[...p.tips]; a[i]={...a[i], title:{...a[i].title, en:v}}; return {...p, tips:a}; }),
                    )}
                    {biField(
                      "Text",
                      tip.text.ar,
                      tip.text.en,
                      (v) => setDraft((p) => { const a=[...p.tips]; a[i]={...a[i], text:{...a[i].text, ar:v}}; return {...p, tips:a}; }),
                      (v) => setDraft((p) => { const a=[...p.tips]; a[i]={...a[i], text:{...a[i].text, en:v}}; return {...p, tips:a}; }),
                      true,
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex justify-center">{sectionActions("cta")}</div>
          {editingSection !== "cta" ? (
            <>
              <h2 className="text-4xl font-bold mb-6">{tr(t.ctaTitle)}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">{tr(t.ctaText)}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/main/foundation-program/level-1" className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"><BookOpen className="size-6" /><span>{tr(t.ctaLevel1)}</span></Link>
                <Link href="/main/foundation-program#level2" className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"><TrendingUp className="size-6" /><span>{tr(t.ctaLevel2)}</span></Link>
                <Link href="/main/foundation-program" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"><ChevronLeft className="size-6" /><span>{tr(t.ctaBack)}</span></Link>
              </div>
            </>
          ) : (
            <div id="edit-cta" className="grid gap-3 rounded-xl border-2 border-white/30 bg-white/10 p-4 text-start backdrop-blur">
              {biField("CTA Title", t.ctaTitle.ar, t.ctaTitle.en, (v) => setBi("ctaTitle", "ar", v), (v) => setBi("ctaTitle", "en", v))}
              {biField("CTA Text", t.ctaText.ar, t.ctaText.en, (v) => setBi("ctaText", "ar", v), (v) => setBi("ctaText", "en", v), true)}
              {biField("CTA Level 1", t.ctaLevel1.ar, t.ctaLevel1.en, (v) => setBi("ctaLevel1", "ar", v), (v) => setBi("ctaLevel1", "en", v))}
              {biField("CTA Level 2", t.ctaLevel2.ar, t.ctaLevel2.en, (v) => setBi("ctaLevel2", "ar", v), (v) => setBi("ctaLevel2", "en", v))}
              {biField("CTA Back", t.ctaBack.ar, t.ctaBack.en, (v) => setBi("ctaBack", "ar", v), (v) => setBi("ctaBack", "en", v))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

