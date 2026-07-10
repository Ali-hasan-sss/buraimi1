"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Download, FileText, Loader2, Pencil, Plus, Save, Trash2, Upload, X } from "lucide-react";
import heroBackgroundImg from "@/public/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png";
import { plansReportsByLocale, type PlanReportItem } from "@/staticData/plans-reports";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

export default function PlansReportsPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const t = isAr ? plansReportsByLocale.ar : plansReportsByLocale.en;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [items, setItems] = useState<PlanReportItem[]>([]);
  const [draftItems, setDraftItems] = useState<PlanReportItem[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const [dataRes, meRes] = await Promise.all([
          fetch("/api/plans-reports", { cache: "no-store" }),
          fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
        ]);
        const dataJson = (await dataRes.json()) as { ok?: boolean; data?: { items?: PlanReportItem[] } };
        const meJson = (await meRes.json()) as { ok?: boolean; isAdmin?: boolean };
        const loaded = Array.isArray(dataJson?.data?.items) ? dataJson.data.items : [];
        setItems(loaded);
        setSelectedId(loaded[0]?.id || "");
        setIsAdmin(Boolean(meJson?.ok && meJson?.isAdmin));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentItems = isEditing ? draftItems : items;

  const selected = useMemo(
    () => currentItems.find((x) => x.id === selectedId) ?? currentItems[0],
    [selectedId, currentItems],
  );

  const startEdit = () => {
    setDraftItems(items.map((x) => ({ ...x })));
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setDraftItems([]);
  };
  const updateItem = (id: string, patch: Partial<PlanReportItem>) => {
    setDraftItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };
  const addItem = () => {
    const id = `plan-${Date.now()}`;
    const next = [{ id, year: "", titleAr: "", titleEn: "", summaryAr: "", summaryEn: "", file: "" }, ...draftItems];
    setDraftItems(next);
    setSelectedId(id);
  };
  const removeItem = (id: string) => {
    const next = draftItems.filter((x) => x.id !== id);
    setDraftItems(next);
    if (selectedId === id) setSelectedId(next[0]?.id || "");
  };
  const uploadFile = async (id: string, file: File) => {
    try {
      setUploadingId(id);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      if (!res.ok) return;
      const json = (await res.json()) as { relativePath?: string; path?: string; filePath?: string; url?: string };
      const uploadedPath = json.relativePath || json.path || json.filePath || json.url || "";
      if (!uploadedPath) return;
      updateItem(id, { file: uploadedPath });
    } finally {
      setUploadingId(null);
    }
  };
  const saveEdit = async () => {
    setSaving(true);
    try {
      const payload = draftItems.map((x) => ({ ...x, file: x.file || "" }));
      const res = await fetch("/api/plans-reports", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      if (!res.ok) return;
      const json = (await res.json()) as { data?: { items?: PlanReportItem[] } };
      const loaded = Array.isArray(json?.data?.items) ? json.data.items : [];
      setItems(loaded);
      setSelectedId(loaded[0]?.id || "");
      setIsEditing(false);
      setDraftItems([]);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-[40vh] flex items-center justify-center text-[#254151]"><Loader2 className="size-6 animate-spin" /></div>;
  }
  if (!selected) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir={dir}>
      <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroBackgroundImg} alt="Al Buraimi University College" fill className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#254151]/90 via-[#254151]/80 to-[#2d4a5c]/90"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="size-12" />
            </div>
            <h1 className="text-4xl mb-4">{t.pageTitle}</h1>
            <p className="text-xl text-white/90">{t.pageSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {isAdmin && (
          <div className="sticky top-4 z-30 mb-6">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur border border-gray-200 shadow-lg px-3 py-2">
              {!isEditing ? (
                <button onClick={startEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#254151] text-white hover:opacity-95">
                  <Pencil className="size-4" />{isAr ? "تعديل" : "Edit"}
                </button>
              ) : (
                <>
                  <button onClick={cancelEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white">
                    <X className="size-4" />{isAr ? "إلغاء" : "Cancel"}
                  </button>
                  <button onClick={saveEdit} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c2a772] text-white disabled:opacity-60">
                    {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    {isAr ? "حفظ" : "Save"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                <FileText className="size-6 text-[#c2a772]" />
                {t.availableDocsTitle}
              </h2>
              {isEditing && (
                <button onClick={addItem} className="mb-4 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[#254151] text-[#254151]">
                  <Plus className="size-4" />{isAr ? "إضافة خطة" : "Add Plan"}
                </button>
              )}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {currentItems.map((item) => {
                  const active = item.id === selected.id;
                  return (
                    <div
                      key={item.id}
                      className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                        active
                          ? "border-[#6096b4] bg-gradient-to-l from-blue-50 to-white shadow-md"
                          : "border-gray-200 hover:border-[#c2a772] bg-white"
                      }`}
                    >
                      <button onClick={() => setSelectedId(item.id)} className="w-full text-right">
                      <div className="flex items-start gap-3">
                        <FileText className={`size-5 mt-1 flex-shrink-0 ${active ? "text-[#6096b4]" : "text-gray-400"}`} />
                        <div className="flex-1 min-w-0">
                          {!isEditing ? (
                            <>
                              <h3 className="font-bold text-gray-800 mb-1 text-sm">
                                {isAr ? item.titleAr : item.titleEn}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2">
                                {isAr ? item.summaryAr : item.summaryEn}
                              </p>
                            </>
                          ) : (
                            <div className="space-y-2">
                              <input className="w-full rounded-md border px-2 py-1 text-xs" value={item.titleAr} onChange={(e) => updateItem(item.id, { titleAr: e.target.value })} placeholder="عنوان الخطة (AR)" dir="rtl" />
                              <input className="w-full rounded-md border px-2 py-1 text-xs" value={item.titleEn} onChange={(e) => updateItem(item.id, { titleEn: e.target.value })} placeholder="Plan title (EN)" dir="ltr" />
                              <input className="w-full rounded-md border px-2 py-1 text-xs" value={item.summaryAr} onChange={(e) => updateItem(item.id, { summaryAr: e.target.value })} placeholder="ملخص الخطة (AR)" dir="rtl" />
                              <input className="w-full rounded-md border px-2 py-1 text-xs" value={item.summaryEn} onChange={(e) => updateItem(item.id, { summaryEn: e.target.value })} placeholder="Plan summary (EN)" dir="ltr" />
                            </div>
                          )}
                          <span className="inline-block px-2 py-1 bg-[#c2a772] text-white text-xs rounded-full">
                            {!isEditing ? item.year : (
                              <input className="w-20 bg-transparent text-white text-xs outline-none placeholder:text-white/80" value={item.year} onChange={(e) => updateItem(item.id, { year: e.target.value })} placeholder={isAr ? "السنة" : "Year"} />
                            )}
                          </span>
                        </div>
                      </div>
                      </button>
                      {isEditing && (
                        <div className="mt-3 flex items-center gap-2">
                          <label className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[#254151] text-white text-xs cursor-pointer">
                            {uploadingId === item.id ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
                            {isAr ? "رفع ملف" : "Upload"}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.txt,.md,.csv"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) void uploadFile(item.id, file);
                                e.currentTarget.value = "";
                              }}
                            />
                          </label>
                          <button onClick={() => updateItem(item.id, { file: "" })} className="px-2 py-1 rounded border text-xs">{isAr ? "إزالة الملف" : "Remove file"}</button>
                          <button onClick={() => removeItem(item.id)} className="ms-auto inline-flex items-center gap-1 px-2 py-1 rounded border border-red-200 text-red-600 text-xs">
                            <Trash2 className="size-3" />{isAr ? "حذف" : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="min-h-[600px]">
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-2xl">
                      <FileText className="size-12 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl text-[#254151] mb-2">
                        {isAr ? selected.titleAr : selected.titleEn}
                      </h2>
                      <p className="text-lg text-gray-600 mb-3">
                        {isAr ? selected.summaryAr : selected.summaryEn}
                      </p>
                      <span className="inline-block px-4 py-2 bg-[#c2a772] text-white rounded-full">
                        {t.yearLabel}: {selected.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-12 border-2 border-dashed border-[#6096b4] text-center">
                  <Upload className="size-24 text-[#6096b4] mx-auto mb-6" />
                  {!selected.file ? (
                    <>
                      <h3 className="text-2xl text-gray-800 mb-4">{t.pendingTitle}</h3>
                      <p className="text-gray-600 mb-8 max-w-lg mx-auto">{t.pendingText}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl text-gray-800 mb-4">{isAr ? "المستند متاح للتحميل" : "Document available for download"}</h3>
                      <p className="text-gray-600 mb-8 max-w-lg mx-auto">{isAr ? "يمكنك تحميل النسخة الإلكترونية مباشرة." : "You can download the electronic copy directly."}</p>
                    </>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-right">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h4 className="font-bold text-[#254151] mb-3">{t.howToGetTitle}</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {t.howToGetItems.map((line) => (
                          <li key={line} className="flex items-start gap-2">
                            <span className="text-[#c2a772]">•</span><span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h4 className="font-bold text-[#254151] mb-3">{t.contactTitle}</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li className="flex items-start gap-2"><span className="text-[#c2a772]">📧</span><span>{t.contactEmail}</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#c2a772]">📞</span><span>{t.contactPhone}</span></li>
                        <li className="flex items-start gap-2"><span className="text-[#c2a772]">🕐</span><span>{t.contactHours}</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    {selected.file ? (
                      <a
                        href={resolveUploadImageSrc(selected.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-8 py-4 text-lg rounded-full"
                      >
                        <Download className="size-5" />
                        {isAr ? "تحميل المستند" : "Download Document"}
                      </a>
                    ) : (
                      <a
                        href={`mailto:${t.contactEmail}?subject=${encodeURIComponent(isAr ? `طلب مستند: ${selected.titleAr}` : `Document request: ${selected.titleEn}`)}`}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-8 py-4 text-lg rounded-full"
                      >
                        <Download className="size-5" />
                        {t.requestButton}
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-l from-blue-50 to-gray-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl text-[#254151] mb-4 flex items-center gap-2">
                    <FileText className="size-6 text-[#c2a772]" />
                    {t.detailsTitle}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{isAr ? "اسم المستند:" : "Document name:"}</p>
                      <p className="font-medium">{isAr ? selected.titleAr : selected.titleEn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.yearLabel}:</p>
                      <p className="font-medium">{selected.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.statusLabel}:</p>
                      <p className="font-medium text-[#c2a772]">{t.statusValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
