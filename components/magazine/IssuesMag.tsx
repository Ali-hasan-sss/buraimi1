"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, ImageIcon, Loader2, Pencil, Plus, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Issue = {
    _id: string;
    titleAr: string;
    titleEn: string;
    issueNumberAr: string;
    issueNumberEn: string;
    coverImage: string;
    fileUrl?: string;
    fileName?: string;
    order: number;
};

const EMPTY_FORM = {
    titleAr: "أضواء",
    titleEn: "Adwaa",
    issueNumberAr: "",
    issueNumberEn: "",
    coverImage: "",
    fileUrl: "",
    fileName: "",
    order: 0,
};

const T = {
    ar: {
        heading: "أعداد المجلة",
        download: "تحميل العدد (PDF)",
        noFile: "لا يوجد ملف",
        addBtn: "إضافة عدد",
        addTitle: "إضافة عدد جديد",
        editTitle: "تعديل العدد",
        deleteTitle: "حذف العدد",
        deleteDesc: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
        cancel: "إلغاء",
        save: "حفظ",
        add: "إضافة",
        delete: "حذف",
        loading: "جار التحميل...",
        uploading: "جار الرفع...",
        uploadCover: "رفع صورة الغلاف",
        uploadFile: "رفع ملف العدد (PDF/DOC)",
        coverPreview: "معاينة الغلاف",
        currentFile: "الملف الحالي:",
        noIssues: "لا توجد أعداد بعد",
    },
    en: {
        heading: "Magazine Issues",
        download: "Download Issue (PDF)",
        noFile: "No file available",
        addBtn: "Add Issue",
        addTitle: "Add New Issue",
        editTitle: "Edit Issue",
        deleteTitle: "Delete Issue",
        deleteDesc: "Are you sure? This cannot be undone.",
        cancel: "Cancel",
        save: "Save",
        add: "Add",
        delete: "Delete",
        loading: "Loading...",
        uploading: "Uploading...",
        uploadCover: "Upload Cover Image",
        uploadFile: "Upload Issue File (PDF/DOC)",
        coverPreview: "Cover Preview",
        currentFile: "Current file:",
        noIssues: "No issues yet",
    },
};

type TContent = typeof T["ar"] | typeof T["en"];

export default function IssuesMag({
    isAr,
    issuesHeading,
    downloadPdf,
    isAdmin = false,
}: {
    isAr: boolean;
    issuesHeading: string;
    downloadPdf: string;
    isAdmin?: boolean;
}) {
    const t = T[isAr ? "ar" : "en"];

    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<Issue | null>(null);
    const [deleteItem, setDeleteItem] = useState<Issue | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetchIssues(); }, []);

    async function fetchIssues() {
        setLoading(true);
        try {
            const res = await fetch("/api/magazine-issues");
            const data = await res.json();
            setIssues(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load issues");
        } finally {
            setLoading(false);
        }
    }

    async function uploadFile(file: File, type: "cover" | "pdf") {
        const fd = new FormData();
        fd.append("file", file);
        const setter = type === "cover" ? setUploadingCover : setUploadingFile;
        setter(true);
        try {
            const res = await fetch("/api/uploads", { method: "POST", body: fd });
            const data = await res.json();
            if (!data.url) throw new Error();
            if (type === "cover") {
                setForm((f) => ({ ...f, coverImage: data.url }));
            } else {
                setForm((f) => ({ ...f, fileUrl: data.url, fileName: file.name }));
            }
            toast.success(isAr ? "تم الرفع بنجاح" : "Uploaded successfully");
        } catch {
            toast.error(isAr ? "فشل الرفع" : "Upload failed");
        } finally {
            setter(false);
        }
    }

    async function handleAdd() {
        if (!form.coverImage) {
            toast.error(isAr ? "يرجى رفع صورة الغلاف" : "Cover image is required");
            return;
        }
        setSaving(true);
        try {
            const res = await fetch("/api/magazine-issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Issue added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchIssues();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/magazine-issues/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Issue updated");
            setEditItem(null);
            fetchIssues();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/magazine-issues/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Issue deleted");
            setDeleteItem(null);
            fetchIssues();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    function openEdit(issue: Issue) {
        setForm({
            titleAr: issue.titleAr,
            titleEn: issue.titleEn,
            issueNumberAr: issue.issueNumberAr,
            issueNumberEn: issue.issueNumberEn,
            coverImage: issue.coverImage,
            fileUrl: issue.fileUrl || "",
            fileName: issue.fileName || "",
            order: issue.order,
        });
        setEditItem(issue);
    }

    function handleDownload(issue: Issue) {
        if (!issue.fileUrl) {
            toast.error(isAr ? "لا يوجد ملف لهذا العدد" : "No file for this issue");
            return;
        }
        const a = document.createElement("a");
        a.href = issue.fileUrl;
        a.download = issue.fileName || `${issue.issueNumberEn}.pdf`;
        a.click();
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2 py-20 text-gray-500">
                <Loader2 className="size-5 animate-spin" />
                {t.loading}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl text-[#254151] text-center flex-1">{issuesHeading}</h2>
                {isAdmin && (
                    <Button onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }} className="flex items-center gap-2 shrink-0">
                        <Plus className="size-4" />
                        {t.addBtn}
                    </Button>
                )}
            </div>

            {issues.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-lg">{t.noIssues}</div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    {issues.map((issue) => (
                        <div
                            key={issue._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all overflow-hidden group"
                        >
                            <div className="relative h-96 overflow-hidden">
                                <Image
                                    fill
                                    src={issue.coverImage}
                                    alt={`${isAr ? issue.titleAr : issue.titleEn} - ${isAr ? issue.issueNumberAr : issue.issueNumberEn}`}
                                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    unoptimized
                                />
                                {isAdmin && (
                                    <div className="absolute top-2 end-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEdit(issue)}
                                            className="bg-white/90 hover:bg-white rounded-full p-2 shadow text-[#6096b4]"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteItem(issue)}
                                            className="bg-white/90 hover:bg-white rounded-full p-2 shadow text-red-500"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl text-[#254151] mb-2">{isAr ? issue.titleAr : issue.titleEn}</h3>
                                <p className="text-[#6096b4] text-lg mb-4">{isAr ? issue.issueNumberAr : issue.issueNumberEn}</p>
                                <button
                                    onClick={() => handleDownload(issue)}
                                    disabled={!issue.fileUrl}
                                    className="w-full bg-[#6096b4] hover:bg-[#254151] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="size-5" />
                                    <span>{issue.fileUrl ? downloadPdf : t.noFile}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t.addTitle}</DialogTitle>
                    </DialogHeader>
                    <IssueForm
                        form={form}
                        setForm={setForm}
                        isAr={isAr}
                        t={t}
                        uploadingCover={uploadingCover}
                        uploadingFile={uploadingFile}
                        coverInputRef={coverInputRef}
                        fileInputRef={fileInputRef}
                        onUpload={uploadFile}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving || uploadingCover || uploadingFile}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t.editTitle}</DialogTitle>
                    </DialogHeader>
                    <IssueForm
                        form={form}
                        setForm={setForm}
                        isAr={isAr}
                        t={t}
                        uploadingCover={uploadingCover}
                        uploadingFile={uploadingFile}
                        coverInputRef={coverInputRef}
                        fileInputRef={fileInputRef}
                        onUpload={uploadFile}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditItem(null)}>{t.cancel}</Button>
                        <Button onClick={handleEdit} disabled={saving || uploadingCover || uploadingFile}>{t.save}</Button>
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
                    <p className="text-sm font-medium text-gray-700">
                        {isAr ? deleteItem?.issueNumberAr : deleteItem?.issueNumberEn}
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{t.cancel}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>{t.delete}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function IssueForm({
    form,
    setForm,
    isAr,
    t,
    uploadingCover,
    uploadingFile,
    coverInputRef,
    fileInputRef,
    onUpload,
}: {
    form: typeof EMPTY_FORM;
    setForm: (f: typeof EMPTY_FORM) => void;
    isAr: boolean;
    t: TContent;
    uploadingCover: boolean;
    uploadingFile: boolean;
    coverInputRef: React.RefObject<HTMLInputElement | null>;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onUpload: (file: File, type: "cover" | "pdf") => void;
}) {
    const set = (key: string, val: string | number) => setForm({ ...form, [key]: val });

    return (
        <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{isAr ? "العنوان (عربي)" : "Title (Arabic)"}</Label>
                    <Input value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} dir="rtl" />
                </div>
                <div className="grid gap-2">
                    <Label>{isAr ? "العنوان (English)" : "Title (English)"}</Label>
                    <Input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{isAr ? "رقم العدد (عربي)" : "Issue Number (Arabic)"}</Label>
                    <Input value={form.issueNumberAr} onChange={(e) => set("issueNumberAr", e.target.value)} dir="rtl" placeholder="العدد السابع" />
                </div>
                <div className="grid gap-2">
                    <Label>{isAr ? "رقم العدد (English)" : "Issue Number (English)"}</Label>
                    <Input value={form.issueNumberEn} onChange={(e) => set("issueNumberEn", e.target.value)} placeholder="Issue 7" />
                </div>
            </div>

            <div className="grid gap-2">
                <Label>{isAr ? "الترتيب (رقم أعلى = يظهر أولاً)" : "Order (higher = shown first)"}</Label>
                <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
            </div>

            {/* Cover Image Upload */}
            <div className="grid gap-2">
                <Label>{t.uploadCover}</Label>
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f, "cover"); }}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="w-full"
                >
                    {uploadingCover ? <Loader2 className="size-4 animate-spin me-2" /> : <ImageIcon className="size-4 me-2" />}
                    {uploadingCover ? t.uploading : t.uploadCover}
                </Button>
                {form.coverImage && (
                    <div className="relative h-32 rounded overflow-hidden border">
                        <Image fill src={form.coverImage} alt="cover" className="object-cover" unoptimized />
                    </div>
                )}
            </div>

            {/* PDF File Upload */}
            <div className="grid gap-2">
                <Label>{t.uploadFile}</Label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f, "pdf"); }}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile}
                    className="w-full"
                >
                    {uploadingFile ? <Loader2 className="size-4 animate-spin me-2" /> : <UploadCloud className="size-4 me-2" />}
                    {uploadingFile ? t.uploading : t.uploadFile}
                </Button>
                {form.fileName && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                        <span>✓</span> {t.currentFile} {form.fileName}
                    </p>
                )}
            </div>
        </div>
    );
}

