"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { GraduationCap, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DepartmentData, DepartmentProgram } from "@/types/department"
import ProgramCard from "./ProgramCard"

const RichTextInput = dynamic(() => import("@/components/dashboard/RichTextInput"), {
    ssr: false,
    loading: () => <div className="h-[150px] border rounded-md bg-muted/20 animate-pulse" />,
})

type Props = {
    data: DepartmentData
    departmentDomain: string
    isAdmin: boolean
}

type ProgramLevelFormData = {
    id: string
    label: string
    degreeNameAr: string
    degreeNameEn: string
    hours: string
    durationAr: string
    durationEn: string
}

type ProgramFormData = {
    id?: string
    titleAr: string
    titleEn: string
    descriptionAr: string
    descriptionEn: string
    objectiveTitleAr: string
    objectiveTitleEn: string
    objectiveItemsAr: string
    objectiveItemsEn: string
    levels: ProgramLevelFormData[]
}

const emptyLevel: ProgramLevelFormData = {
    id: "",
    label: "",
    degreeNameAr: "",
    degreeNameEn: "",
    hours: "",
    durationAr: "",
    durationEn: "",
}

const emptyProgram: ProgramFormData = {
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    objectiveTitleAr: "",
    objectiveTitleEn: "",
    objectiveItemsAr: "",
    objectiveItemsEn: "",
    levels: [],
}

export default function Programs({ data, departmentDomain, isAdmin }: Props) {
    const t = useTranslations("departmentPrograms")
    const locale = useLocale()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [formData, setFormData] = useState<ProgramFormData>(emptyProgram)

    const programs = data.programs

    function handleEdit(program: DepartmentProgram) {
        setFormData({
            id: program.id,
            titleAr: program.titleAr,
            titleEn: program.titleEn,
            descriptionAr: program.descriptionAr,
            descriptionEn: program.descriptionEn,
            objectiveTitleAr: program.objective?.title || "",
            objectiveTitleEn: program.objective?.titleEn || program.objective?.title || "",
            objectiveItemsAr: program.objective?.data?.join("\n") || "",
            objectiveItemsEn: program.objective?.dataEn?.join("\n") || "",
            levels: program.levels?.map(l => ({
                id: l.id,
                label: l.label,
                degreeNameAr: l.degreeNameAr,
                degreeNameEn: l.degreeNameEn,
                hours: l.hours,
                durationAr: l.durationAr,
                durationEn: l.durationEn,
            })) || [],
        })
        setIsEdit(true)
        setOpen(true)
    }

    function addLevel() {
        const newLevel: ProgramLevelFormData = {
            ...emptyLevel,
            id: `level_${Date.now()}`,
        }
        setFormData({ ...formData, levels: [...formData.levels, newLevel] })
    }

    function removeLevel(index: number) {
        const newLevels = formData.levels.filter((_, i) => i !== index)
        setFormData({ ...formData, levels: newLevels })
    }

    function updateLevel(index: number, field: keyof ProgramLevelFormData, value: string) {
        const newLevels = formData.levels.map((level, i) =>
            i === index ? { ...level, [field]: value } : level
        )
        setFormData({ ...formData, levels: newLevels })
    }

    function handleAdd() {
        setFormData(emptyProgram)
        setIsEdit(false)
        setOpen(true)
    }

    async function handleDelete(programId: string) {
        if (!confirm(t("confirmDelete"))) return

        setDeleting(programId)
        try {
            const res = await fetch(`/api/departments/${departmentDomain}/programs/${programId}`, {
                method: "DELETE",
            })
            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("deleteFailed"))
                return
            }

            toast.success(t("programDeleted"))
            router.refresh()
        } catch {
            toast.error(t("deleteFailed"))
        } finally {
            setDeleting(null)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)

        const form = e.currentTarget
        const formDataInputs = new FormData(form)

        // Read descriptions from RichTextInput hidden fields
        const descriptionAr = String(formDataInputs.get("descriptionAr") || formData.descriptionAr)
        const descriptionEn = String(formDataInputs.get("descriptionEn") || formData.descriptionEn)

        const payload = {
            titleAr: formData.titleAr,
            titleEn: formData.titleEn,
            descriptionAr,
            descriptionEn,
            levels: formData.levels,
            objective: {
                title: formData.objectiveTitleAr || (locale === "ar" ? "أهداف البرنامج" : "Program Objectives"),
                titleEn: formData.objectiveTitleEn || "Program Objectives",
                data: formData.objectiveItemsAr.split("\n").filter(Boolean),
                dataEn: formData.objectiveItemsEn.split("\n").filter(Boolean),
            },
        }

        try {
            const url = isEdit
                ? `/api/departments/${departmentDomain}/programs/${formData.id}`
                : `/api/departments/${departmentDomain}/programs`
            const method = isEdit ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || (isEdit ? t("updateFailed") : t("addFailed")))
                return
            }

            toast.success(isEdit ? t("programUpdated") : t("programAdded"))
            setOpen(false)
            router.refresh()
        } catch {
            toast.error(isEdit ? t("updateFailed") : t("addFailed"))
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-6 py-2 bg-gradient-to-l from-[#c2a772] to-[#254151] text-white rounded-full mb-6">
                        <GraduationCap className="size-5 inline-block ml-2" />
                        <span className="font-bold">Academic Programs</span>
                    </div>
                    <h2 className="text-4xl font-bold text-[#254151] mb-4">
                        {locale === "ar" ? "البرامج الأكاديمية" : "Academic Programs"}
                    </h2>
                    <p className="text-xl text-gray-600">
                        {locale === "ar"
                            ? "برامج متنوعة في إدارة الأعمال والمحاسبة والمالية والموارد البشرية"
                            : "Diverse programs in business administration, accounting, finance, and human resources"}
                    </p>

                    {isAdmin && (
                        <div className="mt-6">
                            <Button onClick={handleAdd} className="gap-2">
                                <Plus className="size-4" />
                                {t("addProgram")}
                            </Button>
                        </div>
                    )}
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start mb-16">
                    {programs.map((program, index) => (
                        <div key={program.id} className="relative group">
                            <ProgramCard program={program} index={index} isAdmin={isAdmin} departmentDomain={departmentDomain} />

                            {isAdmin && (
                                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        onClick={() => handleEdit(program)}
                                        variant="secondary"
                                        size="sm"
                                        className="gap-1"
                                    >
                                        <Pencil className="size-3" />
                                        {t("edit")}
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(program.id)}
                                        variant="destructive"
                                        size="sm"
                                        disabled={deleting === program.id}
                                        className="gap-1"
                                    >
                                        <Trash2 className="size-3" />
                                        {deleting === program.id ? t("deleting") : t("delete")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEdit ? t("editProgram") : t("addProgram")}</DialogTitle>
                            <DialogDescription>{t("formDesc")}</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Program Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-[#254151] border-b pb-2">{t("programInfo")}</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("titleAr")}</label>
                                        <Input
                                            value={formData.titleAr}
                                            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("titleEn")}</label>
                                        <Input
                                            value={formData.titleEn}
                                            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("descriptionAr")}</label>
                                    <RichTextInput
                                        name="descriptionAr"
                                        defaultValue={formData.descriptionAr}
                                        placeholder={t("descriptionAr")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("descriptionEn")}</label>
                                    <RichTextInput
                                        name="descriptionEn"
                                        defaultValue={formData.descriptionEn}
                                        placeholder={t("descriptionEn")}
                                    />
                                </div>
                            </div>

                            {/* Objectives */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-[#254151] border-b pb-2">{t("objectives")}</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("objectiveTitleAr")}</label>
                                        <Input
                                            value={formData.objectiveTitleAr}
                                            onChange={(e) => setFormData({ ...formData, objectiveTitleAr: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("objectiveTitleEn")}</label>
                                        <Input
                                            value={formData.objectiveTitleEn}
                                            onChange={(e) => setFormData({ ...formData, objectiveTitleEn: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("objectiveItemsAr")}</label>
                                    <textarea
                                        value={formData.objectiveItemsAr}
                                        onChange={(e) => setFormData({ ...formData, objectiveItemsAr: e.target.value })}
                                        rows={4}
                                        placeholder={t("objectiveItemsPlaceholder")}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">{t("onePerLine")}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("objectiveItemsEn")}</label>
                                    <textarea
                                        value={formData.objectiveItemsEn}
                                        onChange={(e) => setFormData({ ...formData, objectiveItemsEn: e.target.value })}
                                        rows={4}
                                        placeholder={t("objectiveItemsPlaceholder")}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">{t("onePerLine")}</p>
                                </div>
                            </div>

                            {/* Study Levels */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <h3 className="font-semibold text-[#254151]">{t("studyLevels")}</h3>
                                    <Button type="button" variant="outline" size="sm" onClick={addLevel}>
                                        {t("addLevel")}
                                    </Button>
                                </div>

                                {formData.levels.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        {t("noLevels")}
                                    </p>
                                )}

                                {formData.levels.map((level, index) => (
                                    <div key={level.id} className="border rounded-lg p-4 space-y-3 bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{t("level")} {index + 1}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeLevel(index)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                {t("removeLevel")}
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium">{t("levelLabel")}</label>
                                                <Input
                                                    value={level.label}
                                                    onChange={(e) => updateLevel(index, "label", e.target.value)}
                                                    placeholder={t("levelLabelPlaceholder")}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium">{t("degreeNameAr")}</label>
                                                    <Input
                                                        value={level.degreeNameAr}
                                                        onChange={(e) => updateLevel(index, "degreeNameAr", e.target.value)}
                                                        placeholder={t("degreeNameArPlaceholder")}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium">{t("degreeNameEn")}</label>
                                                    <Input
                                                        value={level.degreeNameEn}
                                                        onChange={(e) => updateLevel(index, "degreeNameEn", e.target.value)}
                                                        placeholder={t("degreeNameEnPlaceholder")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium">{t("hours")}</label>
                                                <Input
                                                    value={level.hours}
                                                    onChange={(e) => updateLevel(index, "hours", e.target.value)}
                                                    placeholder={t("hoursPlaceholder")}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium">{t("durationAr")}</label>
                                                    <Input
                                                        value={level.durationAr}
                                                        onChange={(e) => updateLevel(index, "durationAr", e.target.value)}
                                                        placeholder={t("durationArPlaceholder")}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium">{t("durationEn")}</label>
                                                    <Input
                                                        value={level.durationEn}
                                                        onChange={(e) => updateLevel(index, "durationEn", e.target.value)}
                                                        placeholder={t("durationEnPlaceholder")}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                                    {t("cancel")}
                                </Button>
                                <Button type="submit" disabled={saving}>
                                    {saving ? t("saving") : isEdit ? t("save") : t("add")}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
