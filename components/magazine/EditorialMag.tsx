"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Member = {
    _id: string;
    positionAr: string;
    positionEn: string;
    name: string;
    email: string;
    order: number;
};

const EMPTY_FORM = {
    positionAr: "",
    positionEn: "",
    name: "",
    email: "",
    order: 0,
};

const T = {
    ar: {
        addBtn: "إضافة عضو",
        addTitle: "إضافة عضو جديد",
        editTitle: "تعديل العضو",
        deleteTitle: "حذف العضو",
        deleteDesc: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
        cancel: "إلغاء",
        save: "حفظ",
        add: "إضافة",
        delete: "حذف",
        loading: "جار التحميل...",
        positionAr: "المنصب (عربي)",
        positionEn: "المنصب (English)",
        name: "الاسم",
        email: "البريد الإلكتروني",
        order: "الترتيب",
        actions: "إجراءات",
    },
    en: {
        addBtn: "Add Member",
        addTitle: "Add New Member",
        editTitle: "Edit Member",
        deleteTitle: "Delete Member",
        deleteDesc: "Are you sure? This cannot be undone.",
        cancel: "Cancel",
        save: "Save",
        add: "Add",
        delete: "Delete",
        loading: "Loading...",
        positionAr: "Position (Arabic)",
        positionEn: "Position (English)",
        name: "Name",
        email: "Email",
        order: "Order",
        actions: "Actions",
    },
};

type TContent = typeof T["ar"] | typeof T["en"];

export default function EditorialMag({
    isAr,
    editorialHeading,
    thPosition,
    thName,
    thEmail,
    isAdmin = false,
}: {
    isAr: boolean;
    editorialHeading: string;
    thPosition: string;
    thName: string;
    thEmail: string;
    isAdmin?: boolean;
}) {
    const t = T[isAr ? "ar" : "en"];

    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<Member | null>(null);
    const [deleteItem, setDeleteItem] = useState<Member | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });

    useEffect(() => { fetchMembers(); }, []);

    async function fetchMembers() {
        setLoading(true);
        try {
            const res = await fetch("/api/editorial-members");
            const data = await res.json();
            setMembers(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load members");
        } finally {
            setLoading(false);
        }
    }

    async function handleAdd() {
        setSaving(true);
        try {
            const res = await fetch("/api/editorial-members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Member added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchMembers();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/editorial-members/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Member updated");
            setEditItem(null);
            fetchMembers();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/editorial-members/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Member deleted");
            setDeleteItem(null);
            fetchMembers();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    function openEdit(m: Member) {
        setForm({
            positionAr: m.positionAr,
            positionEn: m.positionEn,
            name: m.name,
            email: m.email,
            order: m.order,
        });
        setEditItem(m);
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl text-[#254151] text-center flex-1">{editorialHeading}</h2>
                {isAdmin && (
                    <Button
                        onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }}
                        className="flex items-center gap-2 shrink-0"
                    >
                        <Plus className="size-4" />
                        {t.addBtn}
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
                    <Loader2 className="size-5 animate-spin" />
                    {t.loading}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead className="bg-[#254151] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-start text-base font-semibold">{thPosition}</th>
                                    <th className="px-6 py-4 text-start text-base font-semibold">{thName}</th>
                                    <th className="px-6 py-4 text-start text-base font-semibold">{thEmail}</th>
                                    {isAdmin && (
                                        <th className="px-6 py-4 text-start text-base font-semibold">{t.actions}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {members.map((member) => (
                                    <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 text-gray-900">
                                            {isAr ? member.positionAr : member.positionEn}
                                        </td>
                                        <td className="px-6 py-5 text-gray-900">{member.name}</td>
                                        <td className="px-6 py-5">
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-[#6096b4] hover:text-[#254151] transition-colors"
                                            >
                                                {member.email}
                                            </a>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-[#6096b4] hover:text-[#4f7e97]"
                                                        onClick={() => openEdit(member)}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => setDeleteItem(member)}
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
                    </div>
                </div>
            )}

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t.addTitle}</DialogTitle>
                    </DialogHeader>
                    <MemberForm form={form} setForm={setForm} t={t} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t.editTitle}</DialogTitle>
                    </DialogHeader>
                    <MemberForm form={form} setForm={setForm} t={t} />
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
                    <p className="text-sm font-medium text-gray-700">{deleteItem?.name}</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{t.cancel}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>{t.delete}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function MemberForm({
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
                    <Label>{t.positionAr}</Label>
                    <Input value={form.positionAr} onChange={(e) => set("positionAr", e.target.value)} dir="rtl" />
                </div>
                <div className="grid gap-2">
                    <Label>{t.positionEn}</Label>
                    <Input value={form.positionEn} onChange={(e) => set("positionEn", e.target.value)} />
                </div>
            </div>
            <div className="grid gap-2">
                <Label>{t.name}</Label>
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label>{t.email}</Label>
                <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label>{t.order}</Label>
                <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
            </div>
        </div>
    );
}

