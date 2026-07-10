"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, CheckCircle, AlertCircle, Camera, Loader2, Crown } from "lucide-react";
import { updateChairmanMessage } from "../actions/getMessages";
import type { MessageParagraph } from "../actions/getMessages";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

interface ChairmanEditFormProps {
    initialNameAr: string;
    initialNameEn: string;
    initialImage: string;
    initialParagraphs: MessageParagraph[];
}

export default function ChairmanEditForm({
    initialNameAr,
    initialNameEn,
    initialImage,
    initialParagraphs,
}: ChairmanEditFormProps) {
    const t = useTranslations("dashboardMessages");
    const router = useRouter();
    const [nameAr, setNameAr] = useState(initialNameAr);
    const [nameEn, setNameEn] = useState(initialNameEn);
    const [image, setImage] = useState(initialImage);
    const [paragraphs, setParagraphs] = useState<MessageParagraph[]>(initialParagraphs);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleUpdateText = (index: number, field: "textEn" | "textAr", value: string) => {
        const updated = [...paragraphs];
        updated[index] = { ...updated[index], [field]: value };
        setParagraphs(updated);
    };

    const handleAddParagraph = () => {
        setParagraphs([...paragraphs, { textEn: "", textAr: "" }]);
    };

    const handleRemoveParagraph = (index: number) => {
        setParagraphs(paragraphs.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setStatus(null);

        const result = await updateChairmanMessage({
            nameAr,
            nameEn,
            image,
            paragraphs,
        });

        if (result.error) {
            setStatus({ type: "error", message: t("status.saveError") });
        } else {
            setStatus({ type: "success", message: t("status.saveSuccess") });
            router.refresh();
        }

        setIsSubmitting(false);
    };

    const handleImageUpload = async (file: File) => {
        setIsUploadingImage(true);
        setStatus(null);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/uploads", {
                method: "POST",
                body: fd,
                credentials: "include",
            });
            const json = (await res.json()) as {
                ok: boolean;
                relativePath?: string;
                message?: string;
            };
            if (!res.ok || !json.ok || !json.relativePath) {
                throw new Error(json.message || t("status.uploadError"));
            }
            setImage(json.relativePath.trim());
        } catch (error) {
            setStatus({
                type: "error",
                message: error instanceof Error ? error.message : t("status.uploadError"),
            });
        } finally {
            setIsUploadingImage(false);
        }
    };

    return (
        <div className="rounded-xl border bg-background p-6 shadow-sm">
            <div className="mb-6 grid gap-4 md:grid-cols-[auto,1fr] md:items-start">
                <div className="group relative h-28 w-28 overflow-hidden rounded-full border bg-muted">
                    {image ? (
                        <Image
                            src={resolveUploadImageSrc(image)}
                            alt={nameEn || t("roles.chairman.subtitle")}
                            fill
                            sizes="112px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <Crown className="size-10" />
                        </div>
                    )}

                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        {isUploadingImage ? <Loader2 className="size-5 animate-spin text-white" /> : <Camera className="size-5 text-white" />}
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) void handleImageUpload(file);
                                e.currentTarget.value = "";
                            }}
                        />
                    </label>
                </div>

                <div className="space-y-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("form.nameAr")}</label>
                        <Input value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t("form.nameEn")}</label>
                        <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{t("form.editParagraphs")}</h2>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddParagraph}
                    className="gap-2"
                >
                    <Plus className="size-4" />
                    {t("form.addParagraph")}
                </Button>
            </div>

            <div className="space-y-4">
                {paragraphs.map((para, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">
                                {t("form.paragraph")} {index + 1}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveParagraph(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                placeholder={t("form.textArPlaceholder")}
                                value={para.textAr}
                                onChange={(e) => handleUpdateText(index, "textAr", e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                            <Textarea
                                placeholder={t("form.textEnPlaceholder")}
                                value={para.textEn}
                                onChange={(e) => handleUpdateText(index, "textEn", e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {status && (
                <div className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {status.type === "success" ? <CheckCircle className="size-4" /> : <AlertCircle className="size-4" />}
                    <span className="text-sm">{status.message}</span>
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2"
                >
                    <Save className="size-4" />
                    {t("form.save")}
                </Button>
            </div>
        </div>
    );
}
