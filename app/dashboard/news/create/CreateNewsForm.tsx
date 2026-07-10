"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { createNewsAction, uploadNewsImageAction } from "@/components/dashboard/news/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MultiImageUpload } from "@/components/multi-image-upload";

type CreateNewsFormProps = {
    isAr: boolean;
};

export function CreateNewsForm({ isAr }: CreateNewsFormProps) {
    const router = useRouter();

    const MAX_WAIT_MS = 20000;

    const withTimeout = async <T,>(promise: Promise<T>, ms: number) => {
        return await Promise.race([
            promise,
            new Promise<T>((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), ms)
            ),
        ]);
    };

    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [excerptAr, setExcerptAr] = useState("");
    const [excerptEn, setExcerptEn] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("events");
    const [link, setLink] = useState("");
    const [readTime, setReadTime] = useState("5");
    const [featured, setFeatured] = useState(false);

    const [imageFiles, setImageFiles] = useState<File[]>([]);

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
            const file = imageFiles[0];
            if (!file) {
                throw new Error(isAr ? "يرجى اختيار صورة" : "Please select an image");
            }

            const readTimeNumber = Number(readTime);
            if (!Number.isFinite(readTimeNumber) || readTimeNumber <= 0) {
                throw new Error(isAr ? "وقت القراءة غير صحيح" : "Invalid read time");
            }

            if (!date.trim()) {
                throw new Error(isAr ? "يرجى إدخال التاريخ" : "Please enter a date");
            }

            if (!link.trim()) {
                throw new Error(isAr ? "يرجى إدخال الرابط" : "Please enter a link");
            }

            const fd = new FormData();
            fd.set("file", file);

            const uploaded = await withTimeout(uploadNewsImageAction(fd), MAX_WAIT_MS);
            if (!uploaded.ok) {
                throw new Error((isAr ? "فشل رفع الصورة: " : "Image upload failed: ") + uploaded.message);
            }

            const created = await withTimeout(createNewsAction({
                titleAr,
                titleEn,
                excerptAr,
                excerptEn,
                date,
                category,
                image: uploaded.url,
                readTime: readTimeNumber,
                featured,
                link,
            }), MAX_WAIT_MS);

            if (!created.ok) {
                throw new Error((isAr ? "فشل إنشاء الخبر: " : "Failed to create news: ") + created.message);
            }

            router.push("/dashboard/news");
            router.refresh();
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
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
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">{isAr ? "إضافة خبر" : "Create News"}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isAr
                            ? "املأ البيانات ثم احفظ لإضافة خبر جديد."
                            : "Fill the fields and save to create a new news item."}
                    </p>
                </div>

                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/news")} disabled={saving}>
                    {isAr ? "رجوع" : "Back"}
                </Button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-4 max-w-3xl">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                    <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                    <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "المختصر (عربي)" : "Excerpt (Arabic)"}</label>
                    <textarea
                        value={excerptAr}
                        onChange={(e) => setExcerptAr(e.target.value)}
                        className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "المختصر (إنجليزي)" : "Excerpt (English)"}</label>
                    <textarea
                        value={excerptEn}
                        onChange={(e) => setExcerptEn(e.target.value)}
                        className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "التاريخ" : "Date"}</label>
                        <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder={isAr ? "مثال: 2026-03-29" : "e.g. 2026-03-29"} required />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "التصنيف" : "Category"}</label>
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
                    <label className="text-sm font-medium">{isAr ? "الصورة" : "Image"}</label>
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
                    <label className="text-sm font-medium">{isAr ? "الرابط" : "Link"}</label>
                    <Input value={link} onChange={(e) => setLink(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "وقت القراءة" : "Read time"}</label>
                        <Input type="number" value={readTime} onChange={(e) => setReadTime(e.target.value)} required />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                        <input
                            id="featured-create"
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <label htmlFor="featured-create" className="text-sm font-medium">
                            {isAr ? "مميز" : "Featured"}
                        </label>
                    </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-end gap-2">
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
                </div>
            </form>
        </div>
    );
}
