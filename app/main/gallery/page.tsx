"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useCustomSession } from "@/hooks/useCustomSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type GalleryImg = {
    _id: string;
    url: string;
    titleAr: string;
    titleEn: string;
    categoryAr: string;
    categoryEn: string;
    order: number;
};

const EMPTY_FORM = {
    titleAr: "",
    titleEn: "",
    categoryAr: "",
    categoryEn: "",
    url: "",
    order: 0,
};

const ResponsiveMasonry = dynamic(
    () => import("react-responsive-masonry").then((m) => m.ResponsiveMasonry),
    { ssr: false }
);
const Masonry = dynamic(
    () => import("react-responsive-masonry").then((m) => m.default),
    { ssr: false }
);

export default function GalleryPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";
    const { data: session } = useCustomSession();
    const isAdmin = session?.isAdmin ?? false;

    const t = isAr
        ? {
            heroTitle: "ألبوم الصور",
            breadcrumbHome: "الرئيسية",
            breadcrumbNews: "الأخبار والفعاليات",
            breadcrumbGallery: "ألبوم الصور",
            addBtn: "إضافة صورة",
            addTitle: "إضافة صورة جديدة",
            deleteTitle: "حذف الصورة",
            deleteDesc: "هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع.",
            cancel: "إلغاء",
            add: "إضافة",
            delete: "حذف",
            titleAr: "العنوان (عربي)",
            titleEn: "العنوان (English)",
            categoryAr: "الفئة (عربي)",
            categoryEn: "الفئة (English)",
            uploadImg: "رفع الصورة",
            uploading: "جار الرفع...",
            loading: "جار التحميل...",
            order: "الترتيب",
        }
        : {
            heroTitle: "Photo Gallery",
            breadcrumbHome: "Home",
            breadcrumbNews: "News & Events",
            breadcrumbGallery: "Photo Gallery",
            addBtn: "Add Image",
            addTitle: "Add New Image",
            deleteTitle: "Delete Image",
            deleteDesc: "Are you sure you want to delete this image? This cannot be undone.",
            cancel: "Cancel",
            add: "Add",
            delete: "Delete",
            titleAr: "Title (Arabic)",
            titleEn: "Title (English)",
            categoryAr: "Category (Arabic)",
            categoryEn: "Category (English)",
            uploadImg: "Upload Image",
            uploading: "Uploading...",
            loading: "Loading...",
            order: "Order",
        };

    const [images, setImages] = useState<GalleryImg[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryImg | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState<GalleryImg | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetchImages(); }, []);

    async function fetchImages() {
        setLoading(true);
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setImages(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل الصور" : "Failed to load images");
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(file: File) {
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/uploads", { method: "POST", body: fd });
            const data = await res.json();
            if (!data.url) throw new Error();
            setForm((f) => ({ ...f, url: data.url }));
            toast.success(isAr ? "تم رفع الصورة" : "Image uploaded");
        } catch {
            toast.error(isAr ? "فشل رفع الصورة" : "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    async function handleAdd() {
        if (!form.url) {
            toast.error(isAr ? "يرجى رفع صورة أولاً" : "Please upload an image first");
            return;
        }
        setSaving(true);
        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Image added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchImages();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/gallery/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Image deleted");
            if (selectedImage?._id === deleteItem._id) setSelectedImage(null);
            setDeleteItem(null);
            fetchImages();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    const openModal = (img: GalleryImg, idx: number) => {
        setSelectedImage(img);
        setCurrentIndex(idx);
    };

    const goToNext = () => {
        const next = (currentIndex + 1) % images.length;
        setCurrentIndex(next);
        setSelectedImage(images[next]);
    };

    const goToPrevious = () => {
        const prev = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prev);
        setSelectedImage(images[prev]);
    };

    return (
        <div className="min-h-screen bg-white" dir={dir}>
            {/* Hero */}
            <div className="bg-[#254151] text-white py-20 text-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-5xl mb-4">{t.heroTitle}</h1>
                    <div className="flex items-center justify-center gap-2 text-sm mt-8">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">{t.breadcrumbHome}</Link>
                        <span>/</span>
                        <Link href="/main/news" className="hover:text-[#c2a772] transition-colors">{t.breadcrumbNews}</Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.breadcrumbGallery}</span>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <div className="container mx-auto px-4 sm:px-6 py-16">
                {isAdmin && (
                    <div className="mb-6 flex justify-end">
                        <Button onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }} className="flex items-center gap-2">
                            <Plus className="size-4" />
                            {t.addBtn}
                        </Button>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
                        <Loader2 className="size-5 animate-spin" />
                        {t.loading}
                    </div>
                ) : (
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
                        <Masonry gutter="16px">
                            {images.map((image, index) => (
                                <div key={image._id} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
                                    <div onClick={() => openModal(image, index)}>
                                        <Image
                                            src={image.url}
                                            alt={isAr ? image.titleAr : image.titleEn}
                                            width={1200}
                                            height={900}
                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white text-lg mb-1">{isAr ? image.titleAr : image.titleEn}</h3>
                                            <p className="text-white/80 text-sm">{isAr ? image.categoryAr : image.categoryEn}</p>
                                        </div>
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setDeleteItem(image); }}
                                            className="absolute top-2 end-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow z-10"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                )}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center" onClick={() => setSelectedImage(null)}>
                    <button onClick={() => setSelectedImage(null)} className="absolute top-6 left-6 text-white hover:text-[#c2a772] transition-colors z-10">
                        <X className="size-8" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-[#c2a772] transition-colors z-10">
                        <ChevronRight className="size-12" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-[#c2a772] transition-colors z-10">
                        <ChevronLeft className="size-12" />
                    </button>
                    <div className="max-w-7xl max-h-[90vh] mx-auto px-4 sm:px-12 lg:px-20" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh]">
                            <Image fill src={selectedImage.url} alt={isAr ? selectedImage.titleAr : selectedImage.titleEn} className="object-contain rounded-lg" sizes="100vw" priority unoptimized />
                        </div>
                        <div className="text-center mt-6">
                            <h2 className="text-white text-2xl mb-2">{isAr ? selectedImage.titleAr : selectedImage.titleEn}</h2>
                            <p className="text-white/70 text-base">{isAr ? selectedImage.categoryAr : selectedImage.categoryEn}</p>
                            <p className="text-white/50 text-sm mt-2">{currentIndex + 1} / {images.length}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t.addTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        {/* Upload */}
                        <div className="grid gap-2">
                            <Label>{t.uploadImg}</Label>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="w-full">
                                {uploading ? <Loader2 className="size-4 animate-spin me-2" /> : <UploadCloud className="size-4 me-2" />}
                                {uploading ? t.uploading : t.uploadImg}
                            </Button>
                            {form.url && (
                                <div className="relative h-32 rounded overflow-hidden border">
                                    <Image fill src={form.url} alt="preview" className="object-cover" unoptimized />
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>{t.titleAr}</Label>
                                <Input value={form.titleAr} onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))} dir="rtl" />
                            </div>
                            <div className="grid gap-2">
                                <Label>{t.titleEn}</Label>
                                <Input value={form.titleEn} onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>{t.categoryAr}</Label>
                                <Input value={form.categoryAr} onChange={(e) => setForm((f) => ({ ...f, categoryAr: e.target.value }))} dir="rtl" />
                            </div>
                            <div className="grid gap-2">
                                <Label>{t.categoryEn}</Label>
                                <Input value={form.categoryEn} onChange={(e) => setForm((f) => ({ ...f, categoryEn: e.target.value }))} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>{t.order}</Label>
                            <Input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving || uploading}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{t.deleteTitle}</DialogTitle>
                        <DialogDescription>{t.deleteDesc}</DialogDescription>
                    </DialogHeader>
                    {deleteItem && (
                        <div className="relative h-24 rounded overflow-hidden border">
                            <Image fill src={deleteItem.url} alt="" className="object-cover" unoptimized />
                        </div>
                    )}
                    <p className="text-sm font-medium text-gray-700">{isAr ? deleteItem?.titleAr : deleteItem?.titleEn}</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{t.cancel}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>{t.delete}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}