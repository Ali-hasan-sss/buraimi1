"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Upload, Loader2, FileText, Pencil } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type LocaleKey = "ar" | "en";

const LABELS = {
    ar: {
        title: "تحميل قائمة المنشورات الكاملة",
        body: "احصل على القائمة الكاملة للمنشورات البحثية بصيغة PDF",
        button: "تحميل القائمة الكاملة",
        noFile: "لم يتم رفع ملف بعد",
        uploadBtn: "رفع ملف جديد",
        uploading: "جار الرفع...",
        uploadSuccess: "تم رفع الملف بنجاح",
        uploadFail: "فشل رفع الملف",
        downloadFail: "لا يوجد ملف متاح للتحميل",
    },
    en: {
        title: "Download the Full Publications List",
        body: "Get the complete list of research publications in PDF format.",
        button: "Download Full List",
        noFile: "No file uploaded yet",
        uploadBtn: "Upload new file",
        uploading: "Uploading...",
        uploadSuccess: "File uploaded successfully",
        uploadFail: "Failed to upload file",
        downloadFail: "No file available for download",
    },
} as const;

export default function PupDownloadSection({ isAdmin = false }: { isAdmin?: boolean }) {
    const locale = useLocale() as LocaleKey;
    const isAr = locale === "ar";
    const t = LABELS[locale] ?? LABELS.en;

    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("publications-list.pdf");
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("/api/publications-file")
            .then((r) => r.json())
            .then((d) => {
                if (d.ok && d.data) {
                    setFileUrl(d.data.fileUrl);
                    setFileName(d.data.fileName || "publications-list.pdf");
                }
            })
            .catch(() => {});
    }, []);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            // 1. Upload file to /api/uploads
            const formData = new FormData();
            formData.append("file", file);
            const uploadRes = await fetch("/api/uploads", {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const uploadJson = await uploadRes.json();
            if (!uploadRes.ok || !uploadJson.ok) throw new Error(uploadJson.message || "upload failed");

            const relativePath: string = uploadJson.relativePath;

            // 2. Save relative path to DB
            const saveRes = await fetch("/api/publications-file", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileUrl: relativePath, fileName: file.name }),
            });
            if (!saveRes.ok) throw new Error("save failed");

            setFileUrl(relativePath);
            setFileName(file.name);
            toast.success(t.uploadSuccess);
        } catch (err) {
            toast.error(t.uploadFail);
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    function handleDownload() {
        if (!fileUrl) {
            toast.error(t.downloadFail);
            return;
        }
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-10 sm:py-16">
            <div className="container mx-auto max-w-4xl px-3 sm:px-4">
                <div className="rounded-lg border-2 border-amber-200 bg-white p-6 text-center shadow-2xl sm:p-10">
                    <div className="mb-5 flex justify-center sm:mb-6">
                        <div className="flex size-14 items-center justify-center rounded-full bg-amber-600 text-white sm:size-20">
                            <Download className="size-7 sm:size-10" />
                        </div>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-[#254151] sm:mb-4 sm:text-4xl">{t.title}</h3>
                    <p className="mb-6 text-base text-gray-700 sm:mb-8 sm:text-xl">{t.body}</p>

                    {/* Current file indicator */}
                    {fileUrl && (
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-700">
                            <FileText className="size-4" />
                            <span className="max-w-[240px] truncate">{fileName}</span>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        {/* Download button */}
                        <button
                            onClick={handleDownload}
                            disabled={!fileUrl}
                            className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#254151] to-[#6096b4] px-6 py-3 text-base font-bold text-white transition-all hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed sm:px-10 sm:py-5 sm:text-xl"
                        >
                            <Download className="size-5 sm:size-7" />
                            <span>{t.button}</span>
                            {fileUrl && (
                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm">
                                    {fileName.split(".").pop()?.toUpperCase() || "PDF"}
                                </span>
                            )}
                        </button>

                        {/* Admin upload button */}
                        {isAdmin && (
                            <>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => inputRef.current?.click()}
                                    disabled={uploading}
                                    className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                                >
                                    {uploading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <Upload className="size-4" />
                                    )}
                                    {uploading ? t.uploading : t.uploadBtn}
                                </Button>
                            </>
                        )}
                    </div>

                    {/* No file warning for admin */}
                    {isAdmin && !fileUrl && (
                        <p className="mt-4 text-sm text-amber-600">{t.noFile}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
