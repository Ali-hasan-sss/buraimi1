"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Loader2 } from "lucide-react";

import type { NewsItemFromAPI } from "@/types/news";
import { updateNewsAction, uploadNewsImageAction } from "@/components/dashboard/news/actions";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MultiImageUpload } from "@/components/multi-image-upload";

interface NewsEditDialogProps {
    item: NewsItemFromAPI;
    isAr: boolean;
}

export function NewsEditDialog({ item, isAr }: NewsEditDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const MAX_WAIT_MS = 20000;

    const withTimeout = async <T,>(promise: Promise<T>, ms: number) => {
        return await Promise.race([
            promise,
            new Promise<T>((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), ms)
            ),
        ]);
    };

    const [titleAr, setTitleAr] = useState(item.titleAr);
    const [titleEn, setTitleEn] = useState(item.titleEn);
    const [excerptAr, setExcerptAr] = useState(item.excerptAr);
    const [excerptEn, setExcerptEn] = useState(item.excerptEn);
    const [date, setDate] = useState(item.date);
    const [category, setCategory] = useState(item.category);
    const [image, setImage] = useState(item.image);
    const [link, setLink] = useState(item.link);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [readTime, setReadTime] = useState(String(item.readTime));
    const [featured, setFeatured] = useState(Boolean(item.featured));

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categories = useMemo(
        () => ["events", "academic", "research", "partnerships"],
        []
    );

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let nextImage = image;
            const file = imageFiles[0];
            if (file) {
                const fd = new FormData();
                fd.set("file", file);

                const uploaded = await withTimeout(uploadNewsImageAction(fd), MAX_WAIT_MS);
                if (!uploaded.ok) {
                    throw new Error((isAr ? "فشل رفع الصورة: " : "Image upload failed: ") + uploaded.message);
                }
                nextImage = uploaded.url;
                setImage(nextImage);
            }

            const result = await withTimeout(updateNewsAction({
                id: item.id,
                titleAr,
                titleEn,
                excerptAr,
                excerptEn,
                date,
                category,
                image: nextImage,
                readTime: Number(readTime),
                featured,
                link,
            }), MAX_WAIT_MS);

            if (!result.ok) {
                throw new Error(result.message);
            }

            setOpen(false);
            router.refresh();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            if (message === "timeout") {
                setError(
                    isAr
                        ? "انتهت مهلة الاستجابة من الخادم. حاول مرة أخرى."
                        : "Server took too long to respond. Please try again."
                );
            } else {
                setError(message);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#6096b4] hover:text-[#4f7e97]"
                    title={isAr ? "تعديل" : "Edit"}
                >
                    <Edit3 className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90dvh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>{isAr ? "تعديل الخبر" : "Edit News"}</DialogTitle>
                    <DialogDescription>
                        {isAr
                            ? "قم بتحديث بيانات الخبر ثم احفظ التغييرات."
                            : "Update the news fields and save changes."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "العنوان (عربي)" : "Title (Arabic)"}
                        </label>
                        <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "العنوان (إنجليزي)" : "Title (English)"}
                        </label>
                        <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "المختصر (عربي)" : "Excerpt (Arabic)"}
                        </label>
                        <textarea
                            value={excerptAr}
                            onChange={(e) => setExcerptAr(e.target.value)}
                            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "المختصر (إنجليزي)" : "Excerpt (English)"}
                        </label>
                        <textarea
                            value={excerptEn}
                            onChange={(e) => setExcerptEn(e.target.value)}
                            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                {isAr ? "التاريخ" : "Date"}
                            </label>
                            <Input value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                {isAr ? "التصنيف" : "Category"}
                            </label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="h-9 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "الصورة" : "Image"}
                        </label>
                        <MultiImageUpload
                            files={imageFiles}
                            onFilesChange={(next) => {
                                const file = next[0];
                                setImageFiles(file ? [file] : []);
                            }}
                            multiple={false}
                            maxFiles={1}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            {isAr ? "الرابط" : "Link"}
                        </label>
                        <Input value={link} onChange={(e) => setLink(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                {isAr ? "وقت القراءة" : "Read time"}
                            </label>
                            <Input
                                type="number"
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                id={`featured-${item.id}`}
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor={`featured-${item.id}`} className="text-sm font-medium">
                                {isAr ? "مميز" : "Featured"}
                            </label>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                            {isAr ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? (
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    {isAr ? "جارٍ الحفظ" : "Saving"}
                                </span>
                            ) : (
                                <span>{isAr ? "حفظ" : "Save"}</span>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
