"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiImageUpload } from "@/components/multi-image-upload";
import {
  createResearchHighlightAction,
  uploadResearchHighlightImageAction,
} from "@/components/dashboard/research-highlights/actions";
import type { ResearchHighlightType } from "@/types/research-highlight";

export function CreateResearchHighlightForm({ isAr }: { isAr: boolean }) {
  const router = useRouter();
  const [type, setType] = useState<ResearchHighlightType>("research");
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [summaryAr, setSummaryAr] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [date, setDate] = useState("");
  const [order, setOrder] = useState("0");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const file = imageFiles[0];
      if (!file) throw new Error(isAr ? "يرجى اختيار صورة" : "Please select image");
      const fd = new FormData();
      fd.set("file", file);
      const uploaded = await uploadResearchHighlightImageAction(fd);
      if (!uploaded.ok) throw new Error(uploaded.message);
      const created = await createResearchHighlightAction({
        type,
        titleAr,
        titleEn,
        summaryAr,
        summaryEn,
        contentAr,
        contentEn,
        date,
        image: uploaded.url,
        order: Number(order) || 0,
      });
      if (!created.ok) throw new Error(created.message);
      router.push("/dashboard/research-highlights");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-4xl">
      <h1 className="text-xl font-semibold">{isAr ? "إضافة بحث/جائزة" : "Create Research/Award"}</h1>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as ResearchHighlightType)}
        className="h-9 rounded-md border px-3 text-sm"
      >
        <option value="research">{isAr ? "بحث" : "Research"}</option>
        <option value="award">{isAr ? "جائزة" : "Award"}</option>
      </select>
      <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder={isAr ? "العنوان عربي" : "Title Arabic"} required />
      <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={isAr ? "العنوان إنجليزي" : "Title English"} required />
      <textarea value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" placeholder={isAr ? "ملخص عربي" : "Summary Arabic"} required />
      <textarea value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" placeholder={isAr ? "ملخص إنجليزي" : "Summary English"} required />
      <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} className="min-h-28 rounded-md border p-2 text-sm" placeholder={isAr ? "المحتوى عربي" : "Content Arabic"} required />
      <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} className="min-h-28 rounded-md border p-2 text-sm" placeholder={isAr ? "المحتوى إنجليزي" : "Content English"} required />
      <div className="grid sm:grid-cols-2 gap-3">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} placeholder={isAr ? "ترتيب الظهور" : "Display order"} />
      </div>
      <MultiImageUpload
        files={imageFiles}
        onFilesChange={(next) => setImageFiles(next[0] ? [next[0]] : [])}
        multiple={false}
        maxFiles={1}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/research-highlights")}>
          {isAr ? "رجوع" : "Back"}
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : isAr ? "حفظ" : "Save"}
        </Button>
      </div>
    </form>
  );
}
