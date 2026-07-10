"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLocale } from "next-intl"
import {
    ChevronDown,
    Home,
    ImageUp,
    Loader2,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react"
import { toast } from "sonner"

import BilingualTextEditDialog from "@/components/admin/BilingualTextEditDialog"
import { normalizeAdmissionProgram } from "@/lib/admission-program-normalize"
import { AdmissionImage } from "@/components/admission/AdmissionImage"
import { AdmissionStepThumbs } from "@/components/admission/AdmissionStepThumbs"
import type {
    AdmissionAccordionItem,
    AdmissionPageData,
    AdmissionProgramCard,
    AdmissionStep,
} from "@/types/admission-page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

function AccordionArrow() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
                d="M9.51055 5.49407C9.53759 5.46703 9.55106 5.44009 9.56453 5.42652C9.578 5.41305 9.60504 5.37254 9.61851 5.33194C9.64555 5.26439 9.65902 5.19684 9.65902 5.12939C9.65902 5.06184 9.64555 4.9943 9.61851 4.92685C9.60504 4.88634 9.578 4.84583 9.56453 4.83226C9.55106 4.81879 9.53749 4.79175 9.51055 4.76471L5.59393 0.848089C5.49934 0.753505 5.36434 0.699524 5.22925 0.699524C5.09416 0.699524 4.95916 0.753505 4.86458 0.848089C4.6755 1.03716 4.6755 1.38827 4.86458 1.57734L7.88983 4.6161L0.880424 4.6161C0.596758 4.6161 0.367187 4.84569 0.367187 5.12934C0.367187 5.41299 0.59677 5.64258 0.880424 5.64258L7.88983 5.64258L4.85107 8.68134C4.64853 8.88388 4.64853 9.20806 4.85107 9.41059C5.05362 9.61314 5.37779 9.61314 5.58032 9.41059L9.51055 5.49407Z"
                fill="currentColor"
            />
        </svg>
    )
}

function RichHtml({ html }: { html: string }) {
    if (!html.trim()) return null
    return (
        <div
            className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pr-6 [&_ol]:list-decimal [&_ol]:pr-6 [&_a]:text-[#6096b4] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

function emptyAccordion(): AdmissionAccordionItem {
    return {
        id: crypto.randomUUID(),
        titleAr: "",
        titleEn: "",
        contentAr: "",
        contentEn: "",
    }
}

function emptyStep(index: number): AdmissionStep {
    const num = String(index + 1).padStart(2, "0")
    return {
        id: crypto.randomUUID(),
        number: num,
        titleAr: `الخطوة ${num}`,
        titleEn: `Step ${num}`,
        contentTitleAr: `الخطوة ${num}`,
        contentTitleEn: `Step ${num}`,
        accordionItems: [emptyAccordion()],
    }
}

export default function AdmissionProgramDetailContent({ slug }: { slug: string }) {
    const locale = useLocale()
    const isAr = locale === "ar"

    const [pageData, setPageData] = useState<AdmissionPageData | null>(null)
    const [program, setProgram] = useState<AdmissionProgramCard | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [heroUploading, setHeroUploading] = useState(false)
    const [activeStepIndex, setActiveStepIndex] = useState(0)
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null)

    const [editingStepId, setEditingStepId] = useState<string | null>(null)
    const [stepDraft, setStepDraft] = useState<AdmissionStep | null>(null)
    const [editingAccordionId, setEditingAccordionId] = useState<string | null>(null)
    const [accordionDraft, setAccordionDraft] = useState<AdmissionAccordionItem | null>(null)

    const heroFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        async function load() {
            try {
                const [pageRes, meRes] = await Promise.all([
                    fetch("/api/admission-page", { cache: "no-store" }),
                    fetch("/api/auth/me", { credentials: "include", cache: "no-store" }),
                ])
                const pageJson = (await pageRes.json()) as { ok: boolean; data?: AdmissionPageData }
                const meJson = (await meRes.json()) as { ok: boolean; isAdmin?: boolean }
                if (pageJson.ok && pageJson.data) {
                    setPageData(pageJson.data)
                    const found = pageJson.data.programs.find((p) => p.id === slug)
                    const normalized = found ? normalizeAdmissionProgram(found) : null
                    setProgram(normalized)
                    if (normalized?.steps?.[0]?.accordionItems?.[0]) {
                        setOpenAccordionId(normalized.steps[0].accordionItems[0].id)
                    }
                }
                setIsAdmin(Boolean(meJson?.ok && meJson?.isAdmin))
            } catch {
                setIsAdmin(false)
            } finally {
                setLoading(false)
            }
        }
        void load()
    }, [slug])

    useEffect(() => {
        if (!program?.steps?.[activeStepIndex]) return
        const first = program.steps[activeStepIndex].accordionItems?.[0]
        if (first) setOpenAccordionId(first.id)
    }, [activeStepIndex, program])

    const persistProgram = async (nextProgram: AdmissionProgramCard, msg?: string) => {
        if (!pageData) return false
        setSaving(true)
        try {
            const programs = pageData.programs.map((p) =>
                p.id === nextProgram.id ? nextProgram : p,
            )
            const res = await fetch("/api/admission-page", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ ...pageData, programs }),
            })
            const json = (await res.json()) as { ok: boolean; data?: AdmissionPageData; message?: string }
            if (!res.ok || !json.ok || !json.data) {
                toast.error(json.message || "فشل الحفظ")
                return false
            }
            setPageData(json.data)
            const updated = json.data.programs.find((p) => p.id === nextProgram.id)
            if (updated) setProgram(normalizeAdmissionProgram(updated))
            if (msg) toast.success(msg)
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

    const handleHeroUpload = async (file: File) => {
        if (!program) return
        setHeroUploading(true)
        try {
            const path = await uploadImage(file)
            await persistProgram(
                { ...program, detailHeroImageDesktop: path, detailHeroImageMobile: path },
                "تم تحديث صورة الهيدر",
            )
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "فشل رفع الصورة")
        } finally {
            setHeroUploading(false)
        }
    }

    const saveStep = async () => {
        if (!program || !stepDraft) return
        if (!stepDraft.titleAr.trim() || !stepDraft.titleEn.trim()) {
            toast.error("يرجى تعبئة عنوان الخطوة بالعربية والإنجليزية")
            return
        }

        const currentSteps = program.steps ?? []
        const isNew = editingStepId === "__new__"
        const stepToSave: AdmissionStep = {
            ...stepDraft,
            number: stepDraft.number.trim() || String(currentSteps.length + 1).padStart(2, "0"),
            contentTitleAr: stepDraft.contentTitleAr.trim() || stepDraft.titleAr.trim(),
            contentTitleEn: stepDraft.contentTitleEn.trim() || stepDraft.titleEn.trim(),
        }
        const nextSteps = isNew
            ? [...currentSteps, stepToSave]
            : currentSteps.map((s) => (s.id === editingStepId ? stepToSave : s))

        const ok = await persistProgram(
            { ...program, steps: nextSteps },
            isNew ? "تمت إضافة الخطوة" : "تم تحديث الخطوة",
        )
        if (ok) {
            if (isNew) {
                const newIndex = nextSteps.length - 1
                setActiveStepIndex(newIndex)
                const firstAccordion = nextSteps[newIndex]?.accordionItems?.[0]
                if (firstAccordion) setOpenAccordionId(firstAccordion.id)
            }
            setEditingStepId(null)
            setStepDraft(null)
        }
    }

    const deleteStep = async (stepId: string) => {
        if (!program) return
        if (!confirm("هل أنت متأكد من حذف هذه الخطوة؟")) return
        const currentSteps = program.steps ?? []
        const nextSteps = currentSteps.filter((s) => s.id !== stepId)
        const ok = await persistProgram({ ...program, steps: nextSteps }, "تم حذف الخطوة")
        if (ok && activeStepIndex >= nextSteps.length) setActiveStepIndex(Math.max(0, nextSteps.length - 1))
    }

    const saveAccordion = async () => {
        if (!program || !accordionDraft || editingAccordionId === null) return
        const currentSteps = program.steps ?? []
        const step = currentSteps[activeStepIndex]
        if (!step) return

        const items =
            editingAccordionId === "__new__"
                ? [...(step.accordionItems ?? []), accordionDraft]
                : (step.accordionItems ?? []).map((a) => (a.id === editingAccordionId ? accordionDraft : a))

        const nextSteps = currentSteps.map((s, i) =>
            i === activeStepIndex ? { ...s, accordionItems: items } : s,
        )
        const ok = await persistProgram(
            { ...program, steps: nextSteps },
            editingAccordionId === "__new__" ? "تمت إضافة القسم" : "تم تحديث القسم",
        )
        if (ok) {
            setEditingAccordionId(null)
            setAccordionDraft(null)
        }
    }

    const deleteAccordion = async (accordionId: string) => {
        if (!program) return
        if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return
        const currentSteps = program.steps ?? []
        const step = currentSteps[activeStepIndex]
        if (!step) return
        const items = (step.accordionItems ?? []).filter((a) => a.id !== accordionId)
        const nextSteps = currentSteps.map((s, i) =>
            i === activeStepIndex ? { ...s, accordionItems: items } : s,
        )
        await persistProgram({ ...program, steps: nextSteps }, "تم حذف القسم")
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="size-10 animate-spin text-[#6096b4]" />
            </div>
        )
    }

    if (!program) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-[#254151] text-lg">البرنامج غير موجود</p>
                <Link href="/main/admission" className="text-[#6096b4] hover:underline">
                    العودة إلى صفحة القبول
                </Link>
            </div>
        )
    }

    const steps = program.steps ?? []
    const title = isAr ? program.titleAr : program.titleEn
    const stepsTitle = isAr ? program.stepsSectionTitleAr : program.stepsSectionTitleEn
    const safeStepIndex = steps.length ? Math.min(activeStepIndex, steps.length - 1) : 0
    const activeStep = steps[safeStepIndex]
    const activeStepTitle = activeStep
        ? isAr
            ? activeStep.contentTitleAr
            : activeStep.contentTitleEn
        : ""

    return (
        <main id="maincontent" className="min-h-screen bg-white" tabIndex={-1}>
            {/* Hero */}
            <section className="relative w-full overflow-hidden">
                <div className="relative hidden md:block h-[450px] lg:h-[550px]">
                    <AdmissionImage
                        src={program.detailHeroImageDesktop || program.image}
                        alt={title}
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative md:hidden h-[400px] sm:h-[450px]">
                    <AdmissionImage
                        src={program.detailHeroImageMobile || program.image}
                        alt={title}
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#254151]/50 via-[#254151]/20 to-transparent pointer-events-none" />

                {isAdmin && (
                    <>
                        <input
                            ref={heroFileRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (f) void handleHeroUpload(f)
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
                    <div className="mx-auto w-full px-4 md:px-5 lg:px-6 pb-10 lg:pb-14">
                        <div className="flex items-end gap-2">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                                {title}
                            </h1>
                            {isAdmin && (
                                <BilingualTextEditDialog
                                    label="تعديل عنوان البرنامج"
                                    valueAr={program.titleAr}
                                    valueEn={program.titleEn}
                                    onSave={({ ar, en }) =>
                                        void persistProgram(
                                            { ...program, titleAr: ar, titleEn: en },
                                            "تم تحديث العنوان",
                                        )
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps section */}
            <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto w-full px-4 md:px-5 lg:px-6">
                    <div className="text-center mb-10 lg:mb-14">
                        <div className="inline-flex items-center gap-2 justify-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151]">
                                {stepsTitle}
                            </h2>
                            {isAdmin && (
                                <BilingualTextEditDialog
                                    label="تعديل عنوان قسم الخطوات"
                                    valueAr={program.stepsSectionTitleAr}
                                    valueEn={program.stepsSectionTitleEn}
                                    onSave={({ ar, en }) =>
                                        void persistProgram(
                                            {
                                                ...program,
                                                stepsSectionTitleAr: ar,
                                                stepsSectionTitleEn: en,
                                            },
                                            "تم تحديث العنوان",
                                        )
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="mb-10 lg:mb-12 w-full">
                        <AdmissionStepThumbs
                            steps={steps}
                            activeIndex={safeStepIndex}
                            isAr={isAr}
                            isAdmin={isAdmin}
                            onSelect={setActiveStepIndex}
                            onEdit={(step) => {
                                setEditingStepId(step.id)
                                setStepDraft({ ...step })
                            }}
                            onDelete={(stepId) => void deleteStep(stepId)}
                            onAdd={
                                isAdmin
                                    ? () => {
                                          setEditingStepId("__new__")
                                          setStepDraft(emptyStep(steps.length))
                                      }
                                    : undefined
                            }
                        />
                    </div>

                    {/* Active step content */}
                    {!activeStep && isAdmin && (
                        <div className="bg-white p-8 text-center shadow-sm">
                            <p className="text-[#254151] mb-4">
                                {isAr ? "لا توجد خطوات بعد. أضف أول خطوة للقبول." : "No steps yet. Add the first admission step."}
                            </p>
                            <Button
                                type="button"
                                onClick={() => {
                                    setEditingStepId("__new__")
                                    setStepDraft(emptyStep(0))
                                }}
                                className="bg-[#254151] hover:bg-[#6096b4]"
                            >
                                <Plus className="size-4 ml-2" />
                                إضافة خطوة
                            </Button>
                        </div>
                    )}

                    {activeStep && (
                        <div className="bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
                            <div className="flex items-start justify-between gap-2 mb-6">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#254151]">
                                    {activeStepTitle}
                                </h2>
                                {isAdmin && (
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-100 p-2 text-[#254151] shrink-0"
                                        onClick={() => {
                                            setEditingStepId(activeStep.id)
                                            setStepDraft({ ...activeStep })
                                        }}
                                    >
                                        <Pencil className="size-4" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-0 border-t border-gray-200">
                                {activeStep.accordionItems.map((item) => {
                                    const itemTitle = isAr ? item.titleAr : item.titleEn
                                    const itemContent = isAr ? item.contentAr : item.contentEn
                                    const isOpen = openAccordionId === item.id

                                    return (
                                        <div key={item.id} className="border-b border-gray-200 group relative">
                                            {isAdmin && (
                                                <div className="absolute top-3 left-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                        className="rounded-full bg-white p-1.5 shadow text-[#254151]"
                                                        onClick={() => {
                                                            setEditingAccordionId(item.id)
                                                            setAccordionDraft({ ...item })
                                                        }}
                                                    >
                                                        <Pencil className="size-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="rounded-full bg-red-600 p-1.5 shadow text-white"
                                                        onClick={() => void deleteAccordion(item.id)}
                                                    >
                                                        <Trash2 className="size-3" />
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-right"
                                                onClick={() =>
                                                    setOpenAccordionId(isOpen ? null : item.id)
                                                }
                                            >
                                                <h4 className="text-base sm:text-lg font-semibold text-[#254151] flex-1">
                                                    {itemTitle}
                                                </h4>
                                                <span
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#254151] text-white shrink-0 transition-transform ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                >
                                                    <AccordionArrow />
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="pb-5 sm:pb-6 pr-1">
                                                    <RichHtml html={itemContent} />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}

                                {isAdmin && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingAccordionId("__new__")
                                            setAccordionDraft(emptyAccordion())
                                        }}
                                        className="w-full flex items-center justify-center gap-2 py-4 text-[#6096b4] font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus className="size-5" />
                                        إضافة قسم
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Breadcrumb back */}
            <div className="mx-auto w-full px-4 md:px-5 lg:px-6 py-6">
                <Link
                    href="/main/admission"
                    className="inline-flex items-center gap-2 text-[#6096b4] hover:text-[#254151] font-medium transition-colors"
                >
                    <Home className="size-4" />
                    <span>{isAr ? "العودة إلى القبول" : "Back to Admissions"}</span>
                </Link>
            </div>

            {/* Step edit dialog */}
            <Dialog
                open={editingStepId !== null && stepDraft !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingStepId(null)
                        setStepDraft(null)
                    }
                }}
            >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingStepId === "__new__" ? "إضافة خطوة" : "تعديل الخطوة"}
                        </DialogTitle>
                    </DialogHeader>
                    {stepDraft && (
                        <div className="space-y-4">
                            <Input
                                value={stepDraft.number}
                                onChange={(e) => setStepDraft({ ...stepDraft, number: e.target.value })}
                                placeholder="01"
                                className="font-mono w-24"
                                dir="ltr"
                            />
                            <Input
                                value={stepDraft.titleAr}
                                onChange={(e) => setStepDraft({ ...stepDraft, titleAr: e.target.value })}
                                placeholder="عنوان الخطوة بالعربية"
                                className="font-semibold text-[#254151]"
                                dir="rtl"
                            />
                            <Input
                                value={stepDraft.titleEn}
                                onChange={(e) => setStepDraft({ ...stepDraft, titleEn: e.target.value })}
                                placeholder="Step title in English"
                                dir="ltr"
                            />
                            <Input
                                value={stepDraft.contentTitleAr}
                                onChange={(e) =>
                                    setStepDraft({ ...stepDraft, contentTitleAr: e.target.value })
                                }
                                placeholder="عنوان المحتوى بالعربية"
                                className="text-lg font-bold text-[#254151]"
                                dir="rtl"
                            />
                            <Input
                                value={stepDraft.contentTitleEn}
                                onChange={(e) =>
                                    setStepDraft({ ...stepDraft, contentTitleEn: e.target.value })
                                }
                                placeholder="Content title in English"
                                dir="ltr"
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={() => void saveStep()}
                            disabled={saving}
                            className="bg-[#254151] hover:bg-[#6096b4]"
                        >
                            حفظ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Accordion edit dialog */}
            <Dialog
                open={editingAccordionId !== null && accordionDraft !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingAccordionId(null)
                        setAccordionDraft(null)
                    }
                }}
            >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingAccordionId === "__new__" ? "إضافة قسم" : "تعديل القسم"}
                        </DialogTitle>
                    </DialogHeader>
                    {accordionDraft && (
                        <div className="space-y-4">
                            <Input
                                value={accordionDraft.titleAr}
                                onChange={(e) =>
                                    setAccordionDraft({ ...accordionDraft, titleAr: e.target.value })
                                }
                                placeholder="عنوان القسم بالعربية"
                                className="font-semibold text-[#254151]"
                                dir="rtl"
                            />
                            <Input
                                value={accordionDraft.titleEn}
                                onChange={(e) =>
                                    setAccordionDraft({ ...accordionDraft, titleEn: e.target.value })
                                }
                                placeholder="Section title in English"
                                dir="ltr"
                            />
                            <div>
                                <p className="text-xs text-gray-500 mb-1">المحتوى بالعربية (HTML)</p>
                                <Textarea
                                    value={accordionDraft.contentAr}
                                    onChange={(e) =>
                                        setAccordionDraft({ ...accordionDraft, contentAr: e.target.value })
                                    }
                                    className="min-h-[140px] font-mono text-sm"
                                    dir="rtl"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Content in English (HTML)</p>
                                <Textarea
                                    value={accordionDraft.contentEn}
                                    onChange={(e) =>
                                        setAccordionDraft({ ...accordionDraft, contentEn: e.target.value })
                                    }
                                    className="min-h-[140px] font-mono text-sm"
                                    dir="ltr"
                                />
                            </div>
                            {accordionDraft.contentAr && (
                                <div className="border border-dashed border-[#6096b4]/40 rounded-lg p-4 bg-gray-50">
                                    <p className="text-xs text-gray-500 mb-2">معاينة</p>
                                    <RichHtml html={accordionDraft.contentAr} />
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={() => void saveAccordion()}
                            disabled={saving}
                            className="bg-[#254151] hover:bg-[#6096b4]"
                        >
                            حفظ
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}
