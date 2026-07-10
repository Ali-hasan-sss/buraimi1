"use client";

import { useEffect, useState } from "react";
import { Calendar, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type IeltsExam = {
    _id: string;
    monthAr: string;
    monthEn: string;
    date: string;
    module: string;
    order: number;
};

const EMPTY_FORM = {
    monthAr: "",
    monthEn: "",
    date: "",
    module: "",
    order: 0,
};

const T = {
    ar: {
        addBtn: "إضافة موعد",
        addTitle: "إضافة موعد جديد",
        editTitle: "تعديل الموعد",
        deleteTitle: "حذف الموعد",
        deleteDesc: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
        cancel: "إلغاء",
        save: "حفظ",
        add: "إضافة",
        delete: "حذف",
        loading: "جار التحميل...",
        monthAr: "الشهر (عربي)",
        monthEn: "الشهر (English)",
        date: "تاريخ الاختبار",
        module: "النوع",
        order: "الترتيب",
        actions: "إجراءات",
        thMonth: "الشهر",
        thDate: "تاريخ الاختبار",
        thType: "النوع",
    },
    en: {
        addBtn: "Add Exam Date",
        addTitle: "Add New Exam Date",
        editTitle: "Edit Exam Date",
        deleteTitle: "Delete Exam Date",
        deleteDesc: "Are you sure? This cannot be undone.",
        cancel: "Cancel",
        save: "Save",
        add: "Add",
        delete: "Delete",
        loading: "Loading...",
        monthAr: "Month (Arabic)",
        monthEn: "Month (English)",
        date: "Test Date",
        module: "Module",
        order: "Order",
        actions: "Actions",
        thMonth: "Month",
        thDate: "Test Date",
        thType: "Module",
    },
};

type TContent = typeof T["ar"] | typeof T["en"];

export default function IeltsCalendarSection({
    isAr,
    titleEn,
    titleAr,
    isAdmin = false,
}: {
    isAr: boolean;
    titleEn: string;
    titleAr: string;
    isAdmin?: boolean;
}) {
    const t = T[isAr ? "ar" : "en"];

    const [exams, setExams] = useState<IeltsExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<IeltsExam | null>(null);
    const [deleteItem, setDeleteItem] = useState<IeltsExam | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });

    useEffect(() => { fetchExams(); }, []);

    async function fetchExams() {
        setLoading(true);
        try {
            const res = await fetch("/api/ielts-exams");
            const data = await res.json();
            setExams(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load data");
        } finally {
            setLoading(false);
        }
    }

    async function handleAdd() {
        setSaving(true);
        try {
            const res = await fetch("/api/ielts-exams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Added successfully");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchExams();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ielts-exams/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Updated successfully");
            setEditItem(null);
            fetchExams();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ielts-exams/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Deleted successfully");
            setDeleteItem(null);
            fetchExams();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    function openEdit(exam: IeltsExam) {
        setForm({
            monthAr: exam.monthAr,
            monthEn: exam.monthEn,
            date: exam.date,
            module: exam.module,
            order: exam.order,
        });
        setEditItem(exam);
    }

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-green-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 text-center relative">
                <Calendar className="size-9 sm:size-11 lg:size-12 mx-auto mb-2" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{titleEn}</h3>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 mt-2">{titleAr}</p>
                {isAdmin && (
                    <div className="absolute top-4 end-4">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }}
                            className="flex items-center gap-1 text-xs"
                        >
                            <Plus className="size-3" />
                            {t.addBtn}
                        </Button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-12 text-gray-400">
                        <Loader2 className="size-5 animate-spin" />
                        {t.loading}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-green-50 border-b-2 border-green-200">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-start text-sm sm:text-base font-semibold text-[#254151]">{t.thMonth}</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-start text-sm sm:text-base font-semibold text-[#254151]">{t.thDate}</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4 text-start text-sm sm:text-base font-semibold text-[#254151]">{t.thType}</th>
                                {isAdmin && (
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-start text-sm sm:text-base font-semibold text-[#254151]">{t.actions}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, idx) => (
                                <tr
                                    key={exam._id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors border-b border-gray-100`}
                                >
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 font-medium text-sm sm:text-base">
                                        {isAr ? exam.monthAr : exam.monthEn}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{exam.date}</td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${exam.module === "-" ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                                            {exam.module}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-[#6096b4] hover:text-[#4f7e97]"
                                                    onClick={() => openEdit(exam)}
                                                >
                                                    <Pencil className="size-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => setDeleteItem(exam)}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{t.addTitle}</DialogTitle></DialogHeader>
                    <ExamForm form={form} setForm={setForm} t={t} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{t.editTitle}</DialogTitle></DialogHeader>
                    <ExamForm form={form} setForm={setForm} t={t} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditItem(null)}>{t.cancel}</Button>
                        <Button onClick={handleEdit} disabled={saving}>{t.save}</Button>
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
                        {isAr ? deleteItem?.monthAr : deleteItem?.monthEn} — {deleteItem?.date}
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

function ExamForm({
    form,
    setForm,
    t,
}: {
    form: typeof EMPTY_FORM;
    setForm: (f: typeof EMPTY_FORM) => void;
    t: TContent;
}) {
    const set = (key: string, val: string | number) => setForm({ ...form, [key]: val });

    return (
        <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{t.monthAr}</Label>
                    <Input value={form.monthAr} onChange={(e) => set("monthAr", e.target.value)} dir="rtl" placeholder="يناير" />
                </div>
                <div className="grid gap-2">
                    <Label>{t.monthEn}</Label>
                    <Input value={form.monthEn} onChange={(e) => set("monthEn", e.target.value)} placeholder="January" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label>{t.date}</Label>
                <Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="Saturday, 25.01.2025" />
            </div>
            <div className="grid gap-2">
                <Label>{t.module}</Label>
                <Input value={form.module} onChange={(e) => set("module", e.target.value)} placeholder="General Training" />
            </div>
            <div className="grid gap-2">
                <Label>{t.order}</Label>
                <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
            </div>
        </div>
    );
}
