"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Mail, Phone, Users, Plus, Pencil, Trash2, Upload, X } from "lucide-react"
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
import { resolveUploadImageSrc, isLocallyStoredUploadSrc } from "@/lib/upload-public-url"
import { DepartmentFacultyMember } from "@/types/department"

type Props = {
    facultyMembers: DepartmentFacultyMember[]
    departmentDomain: string
    isAdmin: boolean
}

type FacultyFormData = {
    email?: string
    nameAr: string
    nameEn: string
    positionAr: string
    positionEn: string
    phone: string
    image: string
}

const emptyFaculty: FacultyFormData = {
    nameAr: "",
    nameEn: "",
    positionAr: "",
    positionEn: "",
    phone: "",
    image: "",
}

export default function FacultyMember({ facultyMembers, departmentDomain, isAdmin }: Props) {
    const t = useTranslations("departmentFaculty")
    const locale = useLocale()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [formData, setFormData] = useState<FacultyFormData>(emptyFaculty)

    function handleEdit(member: DepartmentFacultyMember) {
        setFormData({
            email: member.email,
            nameAr: member.nameAr,
            nameEn: member.nameEn,
            positionAr: member.positionAr,
            positionEn: member.positionEn,
            phone: member.phone,
            image: member.image || "",
        })
        setIsEdit(true)
        setOpen(true)
    }

    function handleAdd() {
        setFormData(emptyFaculty)
        setIsEdit(false)
        setOpen(true)
    }

    async function handleDelete(email: string) {
        if (!confirm(t("confirmDelete"))) return

        setDeleting(email)
        try {
            const res = await fetch(`/api/departments/${departmentDomain}/faculty-members/${encodeURIComponent(email)}`, {
                method: "DELETE",
            })
            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("deleteFailed"))
                return
            }

            toast.success(t("memberDeleted"))
            router.refresh()
        } catch {
            toast.error(t("deleteFailed"))
        } finally {
            setDeleting(null)
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fd = new FormData()
        fd.append("file", file)

        try {
            const res = await fetch("/api/uploads", {
                method: "POST",
                body: fd,
            })
            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.relativePath) {
                toast.error(json?.message || t("uploadFailed"))
                return
            }

            setFormData({ ...formData, image: json.relativePath })
            toast.success(t("imageUploaded"))
        } catch {
            toast.error(t("uploadFailed"))
        } finally {
            setUploading(false)
        }
    }

    function removeImage() {
        setFormData({ ...formData, image: "" })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        const payload = {
            nameAr: formData.nameAr,
            nameEn: formData.nameEn,
            positionAr: formData.positionAr,
            positionEn: formData.positionEn,
            phone: formData.phone,
            image: formData.image,
            email: isEdit ? formData.email : formData.email || `${Date.now()}@temp.buc.edu.om`,
        }

        try {
            const url = isEdit
                ? `/api/departments/${departmentDomain}/faculty-members/${encodeURIComponent(formData.email || "")}`
                : `/api/departments/${departmentDomain}/faculty-members`
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

            toast.success(isEdit ? t("memberUpdated") : t("memberAdded"))
            setOpen(false)
            router.refresh()
        } catch {
            toast.error(isEdit ? t("updateFailed") : t("addFailed"))
        } finally {
            setSaving(false)
        }
    }

    const imageSrc = resolveUploadImageSrc(formData.image)

    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-6 py-2 bg-gradient-to-l from-[#c2a772] to-[#254151] text-white mb-6">
                        <Users className="size-5 inline-block ml-2" />
                        <span className="font-bold">{locale === "ar" ? "أعضاء الهيئة التدريسية" : "Faculty Members"}</span>
                    </div>
                    <h2 className="text-4xl text-[#254151] mb-4">
                        {locale === "ar" ? "الكادر الأكاديمي" : "Academic Staff"}
                    </h2>
                    <p className="text-xl text-gray-600">
                        {locale === "ar" ? "نخبة من الأساتذة المتخصصين" : "A select group of specialized professors"}
                    </p>

                    {isAdmin && (
                        <div className="mt-6">
                            <Button onClick={handleAdd} className="gap-2">
                                <Plus className="size-4" />
                                {t("addMember")}
                            </Button>
                        </div>
                    )}
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {facultyMembers.map((member, index) => (
                        <motion.div
                            key={member.email}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-white to-blue-50 p-6 border border-[#c2a772]/20 hover:border-[#6096b4] transition-all relative group"
                        >
                            {isAdmin && (
                                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Button
                                        onClick={() => handleEdit(member)}
                                        variant="secondary"
                                        size="sm"
                                        className="gap-1"
                                    >
                                        <Pencil className="size-3" />
                                        {t("edit")}
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(member.email)}
                                        variant="destructive"
                                        size="sm"
                                        disabled={deleting === member.email}
                                        className="gap-1"
                                    >
                                        <Trash2 className="size-3" />
                                        {deleting === member.email ? t("deleting") : t("delete")}
                                    </Button>
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-4">
                                {member.image && resolveUploadImageSrc(member.image) ? (
                                    <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-md border border-[#c2a772]/30">
                                        <Image
                                            src={resolveUploadImageSrc(member.image)}
                                            alt={locale === "ar" ? member.nameAr : member.nameEn}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                            unoptimized={isLocallyStoredUploadSrc(member.image)}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#254151] to-[#6096b4] flex items-center justify-center flex-shrink-0">
                                        <Users className="size-7 text-white" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg text-[#254151] mb-1 truncate">
                                        {locale === "ar" ? member.nameAr : member.nameEn}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {locale === "ar" ? member.positionAr : member.positionEn}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="size-4 text-[#c2a772] flex-shrink-0" />
                                    <a href={`mailto:${member.email}`} className="hover:text-[#6096b4] transition-colors truncate">
                                        {member.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="size-4 text-[#c2a772] flex-shrink-0" />
                                    <span className="truncate" dir="ltr">{member.phone}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isEdit ? t("editMember") : t("addMember")}</DialogTitle>
                            <DialogDescription>{t("formDesc")}</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("photo")}</label>
                                <div className="flex items-center gap-4">
                                    {formData.image ? (
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden group cursor-pointer">
                                            <Image
                                                src={imageSrc}
                                                alt="Faculty"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <label className="cursor-pointer">
                                                    <Upload className="size-5 text-white" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                        disabled={uploading}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="w-16 h-16 rounded-md bg-gradient-to-br from-[#254151] to-[#6096b4] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                                            {uploading ? (
                                                <span className="text-white text-xs">{t("uploading")}</span>
                                            ) : (
                                                <Upload className="size-5 text-white" />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                        </label>
                                    )}

                                    {formData.image && (
                                        <Button type="button" variant="outline" size="sm" onClick={removeImage}>
                                            <X className="size-4 mr-1" />
                                            {t("removeImage")}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("nameAr")}</label>
                                    <Input
                                        value={formData.nameAr}
                                        onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("nameEn")}</label>
                                    <Input
                                        value={formData.nameEn}
                                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("positionAr")}</label>
                                    <Input
                                        value={formData.positionAr}
                                        onChange={(e) => setFormData({ ...formData, positionAr: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("positionEn")}</label>
                                    <Input
                                        value={formData.positionEn}
                                        onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("email")}</label>
                                    <Input
                                        type="email"
                                        value={formData.email || ""}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isEdit}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t("phone")}</label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
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
