"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiImageUpload } from "@/components/multi-image-upload";
import { createEventAction, uploadEventImageAction } from "@/components/dashboard/events/actions";
import type { EventTypeKey } from "@/types/event";

export function CreateEventForm({ isAr }: { isAr: boolean }) {
  const router = useRouter();

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [summaryAr, setSummaryAr] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [date, setDate] = useState("");
  const [locationAr, setLocationAr] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [type, setType] = useState<EventTypeKey>("events");
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
      const uploaded = await uploadEventImageAction(fd);
      if (!uploaded.ok) throw new Error(uploaded.message);

      const created = await createEventAction({
        titleAr,
        titleEn,
        summaryAr,
        summaryEn,
        contentAr,
        contentEn,
        date,
        locationAr,
        locationEn,
        type,
        image: uploaded.url,
      });
      if (!created.ok) throw new Error(created.message);
      router.push("/dashboard/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-4xl">
      <h1 className="text-xl font-semibold">{isAr ? "إضافة حدث" : "Create Event"}</h1>

      <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder={isAr ? "العنوان عربي" : "Title Arabic"} required />
      <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={isAr ? "العنوان إنجليزي" : "Title English"} required />

      <textarea value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} placeholder={isAr ? "ملخص عربي" : "Summary Arabic"} className="min-h-20 rounded-md border p-2 text-sm" required />
      <textarea value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} placeholder={isAr ? "ملخص إنجليزي" : "Summary English"} className="min-h-20 rounded-md border p-2 text-sm" required />

      <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} placeholder={isAr ? "تفاصيل الحدث عربي" : "Content Arabic"} className="min-h-28 rounded-md border p-2 text-sm" required />
      <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} placeholder={isAr ? "تفاصيل الحدث إنجليزي" : "Content English"} className="min-h-28 rounded-md border p-2 text-sm" required />

      <div className="grid sm:grid-cols-2 gap-3">
        <Input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
        <select value={type} onChange={(e) => setType(e.target.value as EventTypeKey)} className="h-9 rounded-md border px-3 text-sm">
          <option value="events">{isAr ? "فعاليات" : "Events"}</option>
          <option value="conferences">{isAr ? "مؤتمرات" : "Conferences"}</option>
          <option value="student">{isAr ? "أنشطة طلاب" : "Student Activities"}</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Input value={locationAr} onChange={(e) => setLocationAr(e.target.value)} placeholder={isAr ? "المكان عربي" : "Location Arabic"} required />
        <Input value={locationEn} onChange={(e) => setLocationEn(e.target.value)} placeholder={isAr ? "المكان إنجليزي" : "Location English"} required />
      </div>

      <MultiImageUpload
        files={imageFiles}
        onFilesChange={(next) => {
          const file = next[0];
          setImageFiles(file ? [file] : []);
        }}
        multiple={false}
        maxFiles={1}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/events")} disabled={saving}>
          {isAr ? "رجوع" : "Back"}
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : (isAr ? "حفظ" : "Save")}
        </Button>
      </div>
    </form>
  );
}
