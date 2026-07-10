"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit3, ImageUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  updateResearchHighlightAction,
  uploadResearchHighlightImageAction,
} from "./actions";
import type { ResearchHighlightType } from "@/types/research-highlight";

type Row = {
  id: string;
  type: ResearchHighlightType;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  image: string;
  order: number;
};

export function ResearchHighlightEditDialog({ item, isAr }: { item: Row; isAr: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ResearchHighlightType>(item.type);
  const [titleAr, setTitleAr] = useState(item.titleAr);
  const [titleEn, setTitleEn] = useState(item.titleEn);
  const [summaryAr, setSummaryAr] = useState(item.summaryAr);
  const [summaryEn, setSummaryEn] = useState(item.summaryEn);
  const [contentAr, setContentAr] = useState(item.contentAr);
  const [contentEn, setContentEn] = useState(item.contentEn);
  const [date, setDate] = useState(item.date);
  const [image, setImage] = useState(item.image);
  const [order, setOrder] = useState(String(item.order));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(item.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let nextImage = image;
      if (imageFile) {
        const fd = new FormData();
        fd.set("file", imageFile);
        const uploaded = await uploadResearchHighlightImageAction(fd);
        if (!uploaded.ok) throw new Error(uploaded.message);
        nextImage = uploaded.url;
        setImage(nextImage);
      }
      const res = await updateResearchHighlightAction(item.id, {
        type,
        titleAr,
        titleEn,
        summaryAr,
        summaryEn,
        contentAr,
        contentEn,
        date,
        image: nextImage,
        order: Number(order) || 0,
      });
      if (!res.ok) throw new Error(res.message);
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-[#6096b4]"><Edit3 className="size-4" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isAr ? "تعديل العنصر" : "Edit item"}</DialogTitle>
          <DialogDescription>{isAr ? "حدّث البيانات ثم احفظ." : "Update fields and save."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSave} className="grid gap-3">
          <input
            id={`rh-image-${item.id}`}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setImageFile(file);
              setPreviewUrl(URL.createObjectURL(file));
            }}
          />
          <div className="relative h-52 w-full overflow-hidden rounded-xl border bg-gray-50">
            <Image src={previewUrl} alt={isAr ? titleAr : titleEn} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#254151]/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <label htmlFor={`rh-image-${item.id}`} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-[#254151] shadow-lg">
                <ImageUp className="size-4" />
                {isAr ? "تغيير الصورة" : "Change image"}
              </label>
            </div>
          </div>
          <select value={type} onChange={(e) => setType(e.target.value as ResearchHighlightType)} className="h-9 rounded-md border px-3 text-sm">
            <option value="research">{isAr ? "بحث" : "Research"}</option>
            <option value="award">{isAr ? "جائزة" : "Award"}</option>
          </select>
          <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
          <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          <textarea value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" required />
          <textarea value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" required />
          <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} className="min-h-24 rounded-md border p-2 text-sm" required />
          <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} className="min-h-24 rounded-md border p-2 text-sm" required />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <Input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : isAr ? "حفظ" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
