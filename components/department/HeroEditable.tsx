"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Globe, Pencil } from "lucide-react"
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

import heroBackgroundImg from "@/public/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png"

type Props = {
    title: string
    subTitle: string
    titleAr: string
    titleEn: string
    subTitleAr: string
    subTitleEn: string
    departmentDomain: string
    isAdmin: boolean
    applyLink?: string
}

export default function DepartmentHero({
    title,
    subTitle,
    titleAr,
    titleEn,
    subTitleAr,
    subTitleEn,
    departmentDomain,
    isAdmin,
    applyLink,
}: Props) {
    const t = useTranslations("department")
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [applyLinkOpen, setApplyLinkOpen] = useState(false)
    const [applyLinkSaving, setApplyLinkSaving] = useState(false)

    const [formData, setFormData] = useState({
        titleAr,
        titleEn,
        subTitleAr,
        subTitleEn,
    })
    const [applyLinkValue, setApplyLinkValue] = useState(applyLink || "")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch(`/api/departments/${departmentDomain}/titles`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("updateFailed"))
                return
            }

            toast.success(t("titlesUpdated"))
            setOpen(false)
            router.refresh()
        } finally {
            setSaving(false)
        }
    }

    async function handleApplyLinkSave(e: React.FormEvent) {
        e.preventDefault()
        setApplyLinkSaving(true)

        try {
            const res = await fetch(`/api/departments/${departmentDomain}/apply-link`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ applyLink: applyLinkValue }),
            })

            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || "Failed to update apply link")
                return
            }

            toast.success("تم تحديث رابط التقديم بنجاح")
            setApplyLinkOpen(false)
            router.refresh()
        } finally {
            setApplyLinkSaving(false)
        }
    }

    return (
        <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-20 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    fill
                    src={heroBackgroundImg}
                    alt="كلية البريمي الجامعية"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#254151]/90 via-[#254151]/80 to-[#2d4a5c]/90"></div>
            </div>

            <div className="relative container mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Globe className="size-16" />
                    </div>
                    <h1 className="text-5xl mb-4">{title}</h1>
                    <p className="text-2xl text-white/90">{subTitle}</p>

                    {isAdmin && (
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Button
                                onClick={() => setOpen(true)}
                                variant="secondary"
                                size="sm"
                                className="gap-2"
                            >
                                <Pencil className="size-4" />
                                {t("editTitles")}
                            </Button>
                            <Button
                                onClick={() => setApplyLinkOpen(true)}
                                variant="secondary"
                                size="sm"
                                className="gap-2"
                            >
                                <Pencil className="size-4" />
                                {t("editApplyLink")}
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{t("editTitles")}</DialogTitle>
                        <DialogDescription>{t("editTitlesDesc")}</DialogDescription>
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("subTitleAr")}</label>
                            <Input
                                value={formData.subTitleAr}
                                onChange={(e) => setFormData({ ...formData, subTitleAr: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("subTitleEn")}</label>
                            <Input
                                value={formData.subTitleEn}
                                onChange={(e) => setFormData({ ...formData, subTitleEn: e.target.value })}
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                                {t("cancel")}
                            </Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? t("saving") : t("save")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Apply Link Dialog */}
            <Dialog open={applyLinkOpen} onOpenChange={setApplyLinkOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{t("editApplyLink")}</DialogTitle>
                        <DialogDescription>{t("editApplyLinkDesc")}</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleApplyLinkSave} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("applyLinkUrl")}</label>
                            <Input
                                value={applyLinkValue}
                                onChange={(e) => setApplyLinkValue(e.target.value)}
                                placeholder="https://forms.gle/..."
                                dir="ltr"
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setApplyLinkOpen(false)} disabled={applyLinkSaving}>
                                {t("cancel")}
                            </Button>
                            <Button type="submit" disabled={applyLinkSaving}>
                                {applyLinkSaving ? t("saving") : t("save")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
