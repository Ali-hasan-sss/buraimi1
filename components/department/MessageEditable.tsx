"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Mail, Phone, Users, Pencil, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
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
import { resolveUploadImageSrc } from "@/lib/upload-public-url"

// Dynamic import RichTextInput to avoid SSR issues
const RichTextInput = dynamic(() => import("@/components/dashboard/RichTextInput"), {
    ssr: false,
    loading: () => <div className="h-[200px] border rounded-md bg-muted/20 animate-pulse" />,
})

type headMessage = {
    messageAr: { __html: string | TrustedHTML }
    messageEn: { __html: string | TrustedHTML }
    mail: string
    phone: string
    writer: string
    image?: string
}

type Props = {
    message: headMessage
    departmentDomain: string
    isAdmin: boolean
}

export default function HeadMessage({ message, departmentDomain, isAdmin }: Props) {
    const t = useTranslations("department")
    const locale = useLocale()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        writer: message.writer,
        mail: message.mail,
        phone: message.phone,
        messageArHtml: message.messageAr?.__html as string || "",
        messageEnHtml: message.messageEn?.__html as string || "",
        image: message.image || "",
    })

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)

        // Read from form elements including RichTextInput hidden fields
        const form = e.currentTarget
        const formDataFromInputs = new FormData(form)

        try {
            const payload = {
                writer: formData.writer,
                mail: formData.mail,
                phone: formData.phone,
                messageArHtml: String(formDataFromInputs.get("messageArHtml") || formData.messageArHtml),
                messageEnHtml: String(formDataFromInputs.get("messageEnHtml") || formData.messageEnHtml),
                image: formData.image,
            }
            const res = await fetch(`/api/departments/${departmentDomain}/head-message`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("updateFailed"))
                return
            }

            toast.success(t("messageUpdated"))
            setOpen(false)
            router.refresh()
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
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-white to-blue-50 p-10 border-2 border-[#c2a772]/20 relative">
                        {isAdmin && (
                            <div className="absolute top-4 left-4">
                                <Button
                                    onClick={() => setOpen(true)}
                                    variant="secondary"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Pencil className="size-4" />
                                    {t("editMessage")}
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-8">
                            {message.image ? (
                                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                    <Image
                                        src={resolveUploadImageSrc(message.image)}
                                        alt={message.writer}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[#254151] to-[#6096b4] flex items-center justify-center">
                                    <Users className="size-8 text-white" />
                                </div>
                            )}
                            <div>
                                <h2 className="text-3xl text-[#254151]">{t("headMessageTitle")}</h2>
                                <p className="text-[#6096b4]">{message.writer}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <div dangerouslySetInnerHTML={locale === "en" ? message.messageEn : message.messageAr} />
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-[#254151]">
                                    <Mail className="size-5" />
                                    <span>{message.mail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#254151]">
                                    <Phone className="size-5" />
                                    <span dir="ltr">{message.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t("editMessage")}</DialogTitle>
                        <DialogDescription>{t("editMessageDesc")}</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Image Upload - Click on placeholder or current image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("headImage")}</label>
                            <div className="flex items-center gap-4">
                                {formData.image ? (
                                    <div className="relative w-20 h-20 rounded-md overflow-hidden group cursor-pointer">
                                        <Image
                                            src={imageSrc}
                                            alt="Head"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <label className="cursor-pointer">
                                                <Upload className="size-6 text-white" />
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
                                    <label className="w-20 h-20 rounded-md bg-gradient-to-br from-[#254151] to-[#6096b4] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                                        {uploading ? (
                                            <span className="text-white text-xs">{t("uploading")}</span>
                                        ) : (
                                            <Upload className="size-6 text-white" />
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
                            <p className="text-xs text-muted-foreground">{t("clickToUploadImage")}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("writer")}</label>
                            <Input
                                value={formData.writer}
                                onChange={(e) => setFormData({ ...formData, writer: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("email")}</label>
                                <Input
                                    type="email"
                                    value={formData.mail}
                                    onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
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

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("messageAr")}</label>
                                <RichTextInput
                                    name="messageArHtml"
                                    defaultValue={formData.messageArHtml}
                                    placeholder={t("messageArPlaceholder") || "أدخل الرسالة بالعربية..."}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t("messageEn")}</label>
                                <RichTextInput
                                    name="messageEnHtml"
                                    defaultValue={formData.messageEnHtml}
                                    placeholder={t("messageEnPlaceholder") || "Enter message in English..."}
                                />
                            </div>
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
        </div>
    )
}
