"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Briefcase, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

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
import { DepartmentCareerOpportunity } from "@/types/department"

type Props = {
    opportunities: DepartmentCareerOpportunity[]
    departmentDomain: string
    isAdmin: boolean
}

type OpportunityFormData = {
    id?: string
    titleAr: string
    titleEn: string
}

const emptyOpportunity: OpportunityFormData = {
    titleAr: "",
    titleEn: "",
}

export default function CareerOpportunities({ opportunities, departmentDomain, isAdmin }: Props) {
    const t = useTranslations("departmentCareers")
    const locale = useLocale()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [formData, setFormData] = useState<OpportunityFormData>(emptyOpportunity)

    const opportunitiesList = opportunities || []

    function handleEdit(opportunity: DepartmentCareerOpportunity) {
        setFormData({
            id: opportunity.id,
            titleAr: opportunity.titleAr,
            titleEn: opportunity.titleEn,
        })
        setIsEdit(true)
        setOpen(true)
    }

    function handleAdd() {
        setFormData(emptyOpportunity)
        setIsEdit(false)
        setOpen(true)
    }

    async function handleDelete(id: string) {
        if (!confirm(t("confirmDelete"))) return

        setDeleting(id)
        try {
            const res = await fetch(`/api/departments/${departmentDomain}/career-opportunities/${id}`, {
                method: "DELETE",
            })
            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("deleteFailed"))
                return
            }

            toast.success(t("opportunityDeleted"))
            router.refresh()
        } catch {
            toast.error(t("deleteFailed"))
        } finally {
            setDeleting(null)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        const payload = {
            titleAr: formData.titleAr,
            titleEn: formData.titleEn,
        }

        try {
            const url = isEdit
                ? `/api/departments/${departmentDomain}/career-opportunities/${formData.id}`
                : `/api/departments/${departmentDomain}/career-opportunities`
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

            toast.success(isEdit ? t("opportunityUpdated") : t("opportunityAdded"))
            setOpen(false)
            router.refresh()
        } catch {
            toast.error(isEdit ? t("updateFailed") : t("addFailed"))
        } finally {
            setSaving(false)
        }
    }

    if (!isAdmin && opportunitiesList.length === 0) {
        return null
    }

    return (
        <div className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white p-8 border-2 border-[#c2a772]/20">
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
                                <Briefcase className="size-6 text-white" />
                            </div>
                            <h3 className="text-2xl">
                                {locale === "ar" ? "الفرص الوظيفية" : "Career Opportunities"}
                            </h3>
                        </div>
                        {isAdmin && (
                            <Button
                                onClick={handleAdd}
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                            >
                                <Plus className="size-4" />
                                {t("addOpportunity")}
                            </Button>
                        )}
                    </div>

                    {opportunitiesList.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {opportunitiesList.map((opportunity, index) => (
                                <motion.div
                                    key={opportunity.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm group relative"
                                >
                                    {isAdmin && (
                                        <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <Button
                                                onClick={() => handleEdit(opportunity)}
                                                variant="secondary"
                                                size="sm"
                                                className="h-6 px-2 text-xs"
                                            >
                                                <Pencil className="size-3" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(opportunity.id)}
                                                variant="destructive"
                                                size="sm"
                                                disabled={deleting === opportunity.id}
                                                className="h-6 px-2 text-xs"
                                            >
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#c2a772] flex items-center justify-center rounded-full">
                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <span className="text-white leading-relaxed">
                                        {locale === "ar" ? opportunity.titleAr : opportunity.titleEn}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ) : isAdmin ? (
                        <p className="text-white/70 text-center py-8">
                            {t("noOpportunities")}
                        </p>
                    ) : null}
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{isEdit ? t("editOpportunity") : t("addOpportunity")}</DialogTitle>
                            <DialogDescription>{t("formDesc")}</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
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
