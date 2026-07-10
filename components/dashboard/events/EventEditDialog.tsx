"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, ImageUp, Loader2 } from "lucide-react";
import Image from "next/image";
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
import { updateEventAction, uploadEventImageAction } from "./actions";
import type { EventTypeKey } from "@/types/event";

type EventRow = {
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  locationAr: string;
  locationEn: string;
  image: string;
  type: EventTypeKey;
};

export function EventEditDialog({ item, isAr }: { item: EventRow; isAr: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [titleAr, setTitleAr] = useState(item.titleAr);
  const [titleEn, setTitleEn] = useState(item.titleEn);
  const [summaryAr, setSummaryAr] = useState(item.summaryAr);
  const [summaryEn, setSummaryEn] = useState(item.summaryEn);
  const [contentAr, setContentAr] = useState(item.contentAr);
  const [contentEn, setContentEn] = useState(item.contentEn);
  const [date, setDate] = useState(item.date);
  const [locationAr, setLocationAr] = useState(item.locationAr);
  const [locationEn, setLocationEn] = useState(item.locationEn);
  const [image, setImage] = useState(item.image);
  const [type, setType] = useState<EventTypeKey>(item.type);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(item.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let nextImage = image;
      const file = imageFile;
      if (file) {
        const fd = new FormData();
        fd.set("file", file);
        const uploaded = await uploadEventImageAction(fd);
        if (!uploaded.ok) throw new Error(uploaded.message);
        nextImage = uploaded.url;
        setImage(nextImage);
        setPreviewUrl(nextImage);
        setImageFile(null);
      }
      const res = await updateEventAction(item.id, {
        titleAr, titleEn, summaryAr, summaryEn, contentAr, contentEn, date, locationAr, locationEn, image: nextImage, type,
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
          <DialogTitle>{isAr ? "تعديل الحدث" : "Edit Event"}</DialogTitle>
          <DialogDescription>{isAr ? "حدّث بيانات الحدث ثم احفظ." : "Update event data and save."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSave} className="grid gap-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              {isAr ? "الصورة الحالية" : "Current image"}
            </label>
            <input
              id={`event-image-${item.id}`}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImageFile(file);
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
              }}
            />
            <div className="relative h-56 w-full overflow-hidden rounded-xl border bg-gray-50">
              <Image
                src={previewUrl}
                alt={isAr ? titleAr : titleEn}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#254151]/35" />
              <div className="absolute inset-0 flex items-center justify-center">
                <label
                  htmlFor={`event-image-${item.id}`}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-[#254151] shadow-lg transition hover:bg-white"
                >
                  <ImageUp className="size-4" />
                  {isAr ? "تغيير الصورة" : "Change image"}
                </label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isAr ? "زر تغيير الصورة في منتصف المعاينة." : "Use the centered button to replace the image."}
            </p>
          </div>

          <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
          <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          <textarea value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" required />
          <textarea value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} className="min-h-20 rounded-md border p-2 text-sm" required />
          <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} className="min-h-24 rounded-md border p-2 text-sm" required />
          <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} className="min-h-24 rounded-md border p-2 text-sm" required />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <select value={type} onChange={(e) => setType(e.target.value as EventTypeKey)} className="h-9 rounded-md border px-3 text-sm">
              <option value="events">{isAr ? "فعاليات" : "Events"}</option>
              <option value="conferences">{isAr ? "مؤتمرات" : "Conferences"}</option>
              <option value="student">{isAr ? "أنشطة طلاب" : "Student Activities"}</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input value={locationAr} onChange={(e) => setLocationAr(e.target.value)} required />
            <Input value={locationEn} onChange={(e) => setLocationEn(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : (isAr ? "حفظ" : "Save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
