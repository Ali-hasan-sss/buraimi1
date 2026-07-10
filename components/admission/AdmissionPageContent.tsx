"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ImageUp, Loader2, Pencil, Plus, Trash2, X } from "lucide-react"
import { toast } from "sonner"

import BilingualTextEditDialog from "@/components/admin/BilingualTextEditDialog"
import { AdmissionImage } from "@/components/admission/AdmissionImage"
import { admissionProgramPath } from "@/lib/admission-program-url"
import type { AdmissionPageData, AdmissionProgramCard } from "@/types/admission-page"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function ReadMoreArrow() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
                d="M9.51055 5.49407C9.53759 5.46703 9.55106 5.44009 9.56453 5.42652C9.578 5.41305 9.60504 5.37254 9.61851 5.33194C9.64555 5.26439 9.65902 5.19684 9.65902 5.12939C9.65902 5.06184 9.64555 4.9943 9.61851 4.92685C9.60504 4.88634 9.578 4.84583 9.56453 4.83226C9.55106 4.81879 9.53749 4.79175 9.51055 4.76471L5.59393 0.848089C5.49934 0.753505 5.36434 0.699524 5.22925 0.699524C5.09416 0.699524 4.95916 0.753505 4.86458 0.848089C4.6755 1.03716 4.6755 1.38827 4.86458 1.57734L7.88983 4.6161L0.880424 4.6161C0.596758 4.6161 0.367187 4.84569 0.367187 5.12934C0.367187 5.41299 0.59677 5.64258 0.880424 5.64258L7.88983 5.64258L4.85107 8.68134C4.64853 8.88388 4.64853 9.20806 4.85107 9.41059C5.05362 9.61314 5.37779 9.61314 5.58032 9.41059L9.51055 5.49407Z"
                fill="currentColor"
            />
        </svg>
    )
}

function IntroEditDialog({
    data,
    open,
    onOpenChange,
    onSave,
}: {
    data: AdmissionPageData
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (patch: Pick<AdmissionPageData, "introTitleAr" | "introTitleEn" | "introTextAr" | "introTextEn">) => void
}) {
    const [titleAr, setTitleAr] = useState(data.introTitleAr)
    const [titleEn, setTitleEn] = useState(data.introTitleEn)
    const [textAr, setTextAr] = useState(data.introTextAr)
    const [textEn, setTextEn] = useState(data.introTextEn)

    useEffect(() => {
        if (open) {
            setTitleAr(data.introTitleAr)
            setTitleEn(data.introTitleEn)
            setTextAr(data.introTextAr)
            setTextEn(data.introTextEn)
        }
    }, [open, data])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>تعديل عنوان الصفحة والنص التعريفي</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">معاينة العنوان</p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] border border-dashed border-[#6096b4]/40 rounded-lg p-3 bg-gray-50">
                            {titleAr || "العنوان بالعربية"}
                        </h2>
                        <Input
                            value={titleAr}
                            onChange={(e) => setTitleAr(e.target.value)}
                            placeholder="العنوان بالعربية"
                            className="text-lg font-bold text-[#254151]"
                            dir="rtl"
                        />
                        <Input
                            value={titleEn}
                            onChange={(e) => setTitleEn(e.target.value)}
                            placeholder="Title in English"
                            className="text-lg font-bold text-[#254151]"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">معاينة النص التعريفي</p>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed border border-dashed border-[#6096b4]/40 rounded-lg p-3 bg-gray-50">
                            {textAr || "النص التعريفي بالعربية"}
                        </p>
                        <Textarea
                            value={textAr}
                            onChange={(e) => setTextAr(e.target.value)}
                            placeholder="النص التعريفي بالعربية"
                            className="text-base text-gray-600 min-h-[100px]"
                            dir="rtl"
                        />
                        <Textarea
                            value={textEn}
                            onChange={(e) => setTextEn(e.target.value)}
                            placeholder="Intro text in English"
                            className="text-base text-gray-600 min-h-[100px]"
                            dir="ltr"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            onSave({
                                introTitleAr: titleAr.trim(),
                                introTitleEn: titleEn.trim(),
                                introTextAr: textAr.trim(),
                                introTextEn: textEn.trim(),
                            })
                            onOpenChange(false)
                        }}
                    >
                        حفظ
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type CardDraft = Omit<AdmissionProgramCard, "id"> & { id?: string }

const emptyCardDraft = (id: string): CardDraft => ({
    id,
    titleAr: "",
    titleEn: "",
    image: "/assets/studentsImage.webp",
    href: admissionProgramPath(id),
    buttonTextAr: "اقرأ المزيد",
    buttonTextEn: "Read more",
    detailHeroImageDesktop: "/assets/studentsImage.webp",
    detailHeroImageMobile: "/assets/studentsImage.webp",
    stepsSectionTitleAr: "خطوات القبول",
    stepsSectionTitleEn: "Admission Steps",
    steps: [],
})

export default function AdmissionPageContent() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const [data, setData] = useState<AdmissionPageData | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [heroUploading, setHeroUploading] = useState(false)
    const [introDialogOpen, setIntroDialogOpen] = useState(false)
    const [editingCardId, setEditingCardId] = useState<string | null>(null)
    const [cardDraft, setCardDraft] = useState<CardDraft | null>(null)
    const [cardImageUploading, setCardImageUploading] = useState(false)

    const heroFileRef = useRef<HTMLInputElement>(null)
    const cardFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        async function load() {
            try {
                const [pageRes, meRes] = await Promise.all([
                    fetch("/api/admission-page", { cache: "no-store" }),
                    fetch("/api/auth/me", { credentials: "include", cache: "no-store" }),
                ])
                const pageJson = (await pageRes.json()) as { ok: boolean; data?: AdmissionPageData }
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean }
                if (pageJson.ok && pageJson.data) setData(pageJson.data)
                setIsAdmin(Boolean(meJson?.ok && meJson?.isAdmin))
            } catch {
                setIsAdmin(false)
            } finally {
                setLoading(false)
            }
        }
        void load()
    }, [])

    const persist = async (next: AdmissionPageData, successMsg?: string) => {
        setSaving(true)
        try {
            const res = await fetch("/api/admission-page", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(next),
            })
            const json = (await res.json()) as { ok: boolean; data?: AdmissionPageData; message?: string }
            if (!res.ok || !json.ok || !json.data) {
                toast.error(json.message || "فشل الحفظ")
                return false
            }
            setData(json.data)
            if (successMsg) toast.success(successMsg)
            return true
        } catch {
            toast.error("فشل الحفظ")
            return false
        } finally {
            setSaving(false)
        }
    }

    const uploadImage = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        const res = await fetch("/api/uploads", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        const json = (await res.json()) as { ok: boolean; relativePath?: string; message?: string }
        if (!res.ok || !json.ok || !json.relativePath) {
            throw new Error(json.message || "فشل رفع الصورة")
        }
        return json.relativePath
    }

    const handleHeroImageUpload = async (file: File) => {
        if (!data) return
        setHeroUploading(true)
        try {
            const path = await uploadImage(file)
            await persist(
                { ...data, heroImageDesktop: path, heroImageMobile: path },
                "تم تحديث صورة الهيدر",
            )
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "فشل رفع الصورة")
        } finally {
            setHeroUploading(false)
        }
    }

    const handleCardImageUpload = async (file: File) => {
        if (!cardDraft) return
        setCardImageUploading(true)
        try {
            const path = await uploadImage(file)
            setCardDraft((prev) => (prev ? { ...prev, image: path } : prev))
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "فشل رفع الصورة")
        } finally {
            setCardImageUploading(false)
        }
    }

    const startEditCard = (card: AdmissionProgramCard) => {
        setEditingCardId(card.id)
        setCardDraft({ ...card })
    }

    const startAddCard = () => {
        const newId = crypto.randomUUID()
        setEditingCardId("__new__")
        setCardDraft(emptyCardDraft(newId))
    }

    const cancelCardEdit = () => {
        setEditingCardId(null)
        setCardDraft(null)
    }

    const saveCard = async () => {
        if (!data || !cardDraft) return
        const id = editingCardId === "__new__" ? crypto.randomUUID() : cardDraft.id || crypto.randomUUID()
        const existing =
            editingCardId !== "__new__"
                ? data.programs.find((p) => p.id === editingCardId)
                : undefined

        const card: AdmissionProgramCard = {
            id,
            titleAr: cardDraft.titleAr.trim(),
            titleEn: cardDraft.titleEn.trim(),
            image: cardDraft.image.trim(),
            href: admissionProgramPath(id),
            buttonTextAr: cardDraft.buttonTextAr.trim() || "اقرأ المزيد",
            buttonTextEn: cardDraft.buttonTextEn.trim() || "Read more",
            detailHeroImageDesktop:
                cardDraft.detailHeroImageDesktop?.trim() ||
                existing?.detailHeroImageDesktop ||
                cardDraft.image.trim(),
            detailHeroImageMobile:
                cardDraft.detailHeroImageMobile?.trim() ||
                existing?.detailHeroImageMobile ||
                cardDraft.image.trim(),
            stepsSectionTitleAr:
                cardDraft.stepsSectionTitleAr?.trim() ||
                existing?.stepsSectionTitleAr ||
                "خطوات القبول",
            stepsSectionTitleEn:
                cardDraft.stepsSectionTitleEn?.trim() ||
                existing?.stepsSectionTitleEn ||
                "Admission Steps",
            steps: existing?.steps?.length ? existing.steps : cardDraft.steps || [],
        }

        if (!card.titleAr || !card.titleEn) {
            toast.error("يرجى تعبئة العنوان")
            return
        }

        const programs =
            editingCardId === "__new__"
                ? [...data.programs, card]
                : data.programs.map((p) => (p.id === editingCardId ? card : p))

        const ok = await persist({ ...data, programs }, editingCardId === "__new__" ? "تمت إضافة البطاقة" : "تم تحديث البطاقة")
        if (ok) cancelCardEdit()
    }

    const deleteCard = async (id: string) => {
        if (!data) return
        if (!confirm("هل أنت متأكد من حذف هذه البطاقة؟")) return
        const programs = data.programs.filter((p) => p.id !== id)
        await persist({ ...data, programs }, "تم حذف البطاقة")
    }

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="size-10 animate-spin text-[#6096b4]" />
            </div>
        )
    }

    const heroTitle = isAr ? data.heroTitleAr : data.heroTitleEn
    const introTitle = isAr ? data.introTitleAr : data.introTitleEn
    const introText = isAr ? data.introTextAr : data.introTextEn

    return (
        <main id="maincontent" className="min-h-screen bg-white" tabIndex={-1}>
            {/* Hero */}
            <section className="relative w-full overflow-hidden">
                <div className="relative hidden md:block h-[450px] lg:h-[550px]">
                    <AdmissionImage
                        src={data.heroImageDesktop}
                        alt={introTitle}
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative md:hidden h-[400px] sm:h-[450px]">
                    <AdmissionImage
                        src={data.heroImageMobile}
                        alt={introTitle}
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#254151]/40 via-transparent to-transparent pointer-events-none" />

                {isAdmin && (
                    <>
                        <input
                            ref={heroFileRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (f) void handleHeroImageUpload(f)
                                e.target.value = ""
                            }}
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <button
                                type="button"
                                aria-label="تغيير صورة الهيدر"
                                disabled={heroUploading || saving}
                                className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/35 disabled:opacity-60"
                                onClick={() => heroFileRef.current?.click()}
                            >
                                {heroUploading ? (
                                    <Loader2 className="size-8 animate-spin" />
                                ) : (
                                    <ImageUp className="size-8" strokeWidth={1.75} />
                                )}
                            </button>
                        </div>
                    </>
                )}

                <div className="absolute inset-0 flex items-end z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
                        <div className="flex items-end gap-2">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                                {heroTitle}
                            </h1>
                            {isAdmin && (
                                <BilingualTextEditDialog
                                    label="تعديل عنوان الهيدر"
                                    valueAr={data.heroTitleAr}
                                    valueEn={data.heroTitleEn}
                                    onSave={({ ar, en }) =>
                                        void persist(
                                            { ...data, heroTitleAr: ar, heroTitleEn: en },
                                            "تم تحديث عنوان الهيدر",
                                        )
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs section */}
            <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 lg:mb-14">
                        <div className="flex items-start gap-2 mb-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151]">
                                {introTitle}
                            </h2>
                            {isAdmin && (
                                <button
                                    type="button"
                                    aria-label="تعديل العنوان والنص التعريفي"
                                    className="inline-flex items-center justify-center rounded-full bg-white text-[#254151] p-2 shadow hover:bg-gray-50 mt-1"
                                    onClick={() => setIntroDialogOpen(true)}
                                >
                                    <Pencil className="size-4" />
                                </button>
                            )}
                        </div>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
                            {introText}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                        {data.programs.map((program) => {
                            const isEditing = editingCardId === program.id
                            const draft = isEditing ? cardDraft : null
                            const title = isAr ? program.titleAr : program.titleEn
                            const buttonText = isAr ? program.buttonTextAr : program.buttonTextEn

                            if (isEditing && draft) {
                                return (
                                    <article
                                        key={program.id}
                                        className="bg-white overflow-hidden shadow-sm border-2 border-[#6096b4]"
                                    >
                                        <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-200">
                                            <AdmissionImage
                                                src={draft.image}
                                                alt={draft.titleAr || "بطاقة"}
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 320px"
                                            />
                                            <input
                                                ref={cardFileRef}
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/gif"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const f = e.target.files?.[0]
                                                    if (f) void handleCardImageUpload(f)
                                                    e.target.value = ""
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-0 flex items-center justify-center bg-black/20"
                                                onClick={() => cardFileRef.current?.click()}
                                                disabled={cardImageUploading}
                                            >
                                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#254151] shadow">
                                                    {cardImageUploading ? (
                                                        <Loader2 className="size-5 animate-spin" />
                                                    ) : (
                                                        <ImageUp className="size-5" />
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <input
                                                value={draft.titleAr}
                                                onChange={(e) =>
                                                    setCardDraft((p) => (p ? { ...p, titleAr: e.target.value } : p))
                                                }
                                                placeholder="عنوان البطاقة بالعربية"
                                                className="w-full text-base sm:text-lg font-bold text-[#254151] bg-transparent border-b-2 border-[#c2a772]/50 focus:border-[#6096b4] outline-none pb-1"
                                                dir="rtl"
                                            />
                                            <input
                                                value={draft.titleEn}
                                                onChange={(e) =>
                                                    setCardDraft((p) => (p ? { ...p, titleEn: e.target.value } : p))
                                                }
                                                placeholder="Card title in English"
                                                className="w-full text-base font-semibold text-[#254151]/80 bg-transparent border-b border-gray-200 focus:border-[#6096b4] outline-none pb-1"
                                                dir="ltr"
                                            />
                                            <p className="text-sm text-gray-500 font-mono bg-gray-50 border border-gray-200 rounded px-3 py-2" dir="ltr">
                                                {admissionProgramPath(draft.id || editingCardId || "")}
                                            </p>
                                            <div className="flex gap-2">
                                                <input
                                                    value={draft.buttonTextAr}
                                                    onChange={(e) =>
                                                        setCardDraft((p) =>
                                                            p ? { ...p, buttonTextAr: e.target.value } : p,
                                                        )
                                                    }
                                                    className="flex-1 inline-flex items-center gap-2 bg-[#254151] text-white px-4 py-2.5 text-sm font-semibold text-center border-2 border-transparent focus:border-[#c2a772] outline-none"
                                                    dir="rtl"
                                                />
                                                <input
                                                    value={draft.buttonTextEn}
                                                    onChange={(e) =>
                                                        setCardDraft((p) =>
                                                            p ? { ...p, buttonTextEn: e.target.value } : p,
                                                        )
                                                    }
                                                    className="flex-1 inline-flex items-center gap-2 bg-[#6096b4] text-white px-4 py-2.5 text-sm font-semibold text-center border-2 border-transparent focus:border-[#c2a772] outline-none"
                                                    dir="ltr"
                                                />
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => void saveCard()}
                                                    disabled={saving}
                                                    className="bg-[#254151] hover:bg-[#6096b4]"
                                                >
                                                    حفظ
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={cancelCardEdit}
                                                >
                                                    إلغاء
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                )
                            }

                            return (
                                <article
                                    key={program.id}
                                    className="group relative bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    {isAdmin && (
                                        <div className="absolute top-3 left-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                aria-label="تعديل البطاقة"
                                                className="inline-flex items-center justify-center rounded-full bg-white text-[#254151] p-2 shadow hover:bg-gray-50"
                                                onClick={() => startEditCard(program)}
                                            >
                                                <Pencil className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="حذف البطاقة"
                                                className="inline-flex items-center justify-center rounded-full bg-red-600 text-white p-2 shadow hover:bg-red-700"
                                                onClick={() => void deleteCard(program.id)}
                                                disabled={saving}
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    )}
                                    <div className="relative h-36 sm:h-40 overflow-hidden">
                                        <AdmissionImage
                                            src={program.image}
                                            alt={title}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, 320px"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-base sm:text-lg font-bold text-[#254151] mb-3 line-clamp-2">
                                            {title}
                                        </h4>
                                        <Link
                                            href={admissionProgramPath(program.id)}
                                            className="inline-flex items-center gap-1.5 bg-[#254151] hover:bg-[#6096b4] text-white px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200"
                                        >
                                            <span>{buttonText}</span>
                                            <span className="flex items-center justify-center">
                                                <ReadMoreArrow />
                                            </span>
                                        </Link>
                                    </div>
                                </article>
                            )
                        })}

                        {/* Add card placeholder */}
                        {isAdmin && editingCardId === "__new__" && cardDraft && (
                            <article className="bg-white overflow-hidden shadow-sm border-2 border-[#6096b4]">
                                <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-200">
                                    <AdmissionImage
                                        src={cardDraft.image}
                                        alt="بطاقة جديدة"
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, 320px"
                                    />
                                    <input
                                        ref={cardFileRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp,image/gif"
                                        className="hidden"
                                        onChange={(e) => {
                                            const f = e.target.files?.[0]
                                            if (f) void handleCardImageUpload(f)
                                            e.target.value = ""
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-0 flex items-center justify-center bg-black/20"
                                        onClick={() => cardFileRef.current?.click()}
                                        disabled={cardImageUploading}
                                    >
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#254151] shadow">
                                            {cardImageUploading ? (
                                                <Loader2 className="size-5 animate-spin" />
                                            ) : (
                                                <ImageUp className="size-5" />
                                            )}
                                        </span>
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    <input
                                        value={cardDraft.titleAr}
                                        onChange={(e) =>
                                            setCardDraft((p) => (p ? { ...p, titleAr: e.target.value } : p))
                                        }
                                        placeholder="عنوان البطاقة بالعربية"
                                        className="w-full text-base sm:text-lg font-bold text-[#254151] bg-transparent border-b-2 border-[#c2a772]/50 focus:border-[#6096b4] outline-none pb-1"
                                        dir="rtl"
                                    />
                                    <input
                                        value={cardDraft.titleEn}
                                        onChange={(e) =>
                                            setCardDraft((p) => (p ? { ...p, titleEn: e.target.value } : p))
                                        }
                                        placeholder="Card title in English"
                                        className="w-full text-base font-semibold text-[#254151]/80 bg-transparent border-b border-gray-200 focus:border-[#6096b4] outline-none pb-1"
                                        dir="ltr"
                                    />
                                    <p className="text-sm text-gray-500 font-mono bg-gray-50 border border-gray-200 rounded px-3 py-2" dir="ltr">
                                        {admissionProgramPath(cardDraft.id || "")}
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            value={cardDraft.buttonTextAr}
                                            onChange={(e) =>
                                                setCardDraft((p) =>
                                                    p ? { ...p, buttonTextAr: e.target.value } : p,
                                                )
                                            }
                                            className="flex-1 bg-[#254151] text-white px-4 py-2.5 text-sm font-semibold text-center border-2 border-transparent focus:border-[#c2a772] outline-none"
                                            dir="rtl"
                                        />
                                        <input
                                            value={cardDraft.buttonTextEn}
                                            onChange={(e) =>
                                                setCardDraft((p) =>
                                                    p ? { ...p, buttonTextEn: e.target.value } : p,
                                                )
                                            }
                                            className="flex-1 bg-[#6096b4] text-white px-4 py-2.5 text-sm font-semibold text-center border-2 border-transparent focus:border-[#c2a772] outline-none"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => void saveCard()}
                                            disabled={saving}
                                            className="bg-[#254151] hover:bg-[#6096b4]"
                                        >
                                            إضافة
                                        </Button>
                                        <Button type="button" size="sm" variant="outline" onClick={cancelCardEdit}>
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        )}

                        {isAdmin && editingCardId !== "__new__" && (
                            <button
                                type="button"
                                onClick={startAddCard}
                                className="flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-[#6096b4]/50 bg-white/60 hover:bg-white hover:border-[#6096b4] transition-colors"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#254151] text-white shadow-lg mb-2">
                                    <Plus className="size-5" />
                                </span>
                                <span className="text-[#254151] font-semibold">إضافة بطاقة</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <IntroEditDialog
                data={data}
                open={introDialogOpen}
                onOpenChange={setIntroDialogOpen}
                onSave={(patch) => void persist({ ...data, ...patch }, "تم تحديث العنوان والنص التعريفي")}
            />
        </main>
    )
}
