"use client";

import { useEffect, useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { BookOpen, FileText, Award, Users, Search, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export type PublicationType = "journal" | "book" | "chapter" | "conference";

export type Publication = {
    _id: string;
    title: string;
    type: PublicationType;
    details: string;
    author: string;
    year?: string;
    indexed: boolean;
    isActive: boolean;
    order: number;
};

const TYPE_LABELS: Record<PublicationType, { ar: string; en: string; icon: any; color: string }> = {
    journal: { ar: "مجلة محكمة", en: "Peer-Reviewed Journal", icon: Award, color: "green" },
    book: { ar: "كتاب منشور", en: "Published Book", icon: BookOpen, color: "blue" },
    chapter: { ar: "فصل في كتاب", en: "Book Chapter", icon: FileText, color: "purple" },
    conference: { ar: "مؤتمر بحثي", en: "Conference Paper", icon: Users, color: "amber" },
};

const EMPTY_FORM = { title: "", type: "journal" as PublicationType, details: "", author: "", year: "", indexed: false };

export default function PupExplorerSection({ isAdmin = false }: { isAdmin?: boolean }) {
    const locale = useLocale();
    const isAr = locale === "ar";

    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");

    // Dialog state
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<Publication | null>(null);
    const [deleteItem, setDeleteItem] = useState<Publication | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });

    useEffect(() => {
        fetchPublications();
    }, []);

    async function fetchPublications() {
        setLoading(true);
        try {
            const res = await fetch("/api/publications");
            const data = await res.json();
            setPublications(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load publications");
        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        return publications.filter((p) => {
            const matchType = typeFilter === "all" || p.type === typeFilter;
            const matchSearch =
                searchTerm === "" ||
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.details.toLowerCase().includes(searchTerm.toLowerCase());
            return matchType && matchSearch;
        });
    }, [publications, typeFilter, searchTerm]);

    async function handleAdd() {
        setSaving(true);
        try {
            const res = await fetch("/api/publications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Publication added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchPublications();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally {
            setSaving(false);
        }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/publications/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Publication updated");
            setEditItem(null);
            fetchPublications();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/publications/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Publication deleted");
            setDeleteItem(null);
            fetchPublications();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally {
            setSaving(false);
        }
    }

    function openEdit(pub: Publication) {
        setForm({
            title: pub.title,
            type: pub.type,
            details: pub.details,
            author: pub.author,
            year: pub.year || "",
            indexed: pub.indexed,
        });
        setEditItem(pub);
    }

    const colorMap: Record<string, string> = {
        green: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
        blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
        purple: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
        amber: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    };

    const badgeBgMap: Record<string, string> = {
        green: "bg-green-600",
        blue: "bg-blue-600",
        purple: "bg-purple-600",
        amber: "bg-amber-600",
    };

    return (
        <section className="bg-gray-50 py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                {/* Header */}
                <div className="mb-8 text-center sm:mb-10">
                    <h2 className="mb-2 text-2xl font-bold text-[#254151] sm:text-4xl">
                        {isAr ? "استعراض المنشورات" : "Explore Publications"}
                    </h2>
                    <p className="text-sm text-gray-600 sm:text-lg">
                        {isAr ? "تصفح وبحث في المنشورات البحثية" : "Browse and search research publications"}
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
                    {/* Search */}
                    <div className="flex-1">
                        <Label className="mb-2 block text-sm">{isAr ? "بحث" : "Search"}</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                placeholder={isAr ? "ابحث في العنوان أو المؤلف..." : "Search title or author..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Type filter */}
                    <div className="w-full sm:w-56">
                        <Label className="mb-2 block text-sm">{isAr ? "النوع" : "Type"}</Label>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder={isAr ? "جميع الأنواع" : "All types"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{isAr ? "جميع الأنواع" : "All types"}</SelectItem>
                                {(Object.keys(TYPE_LABELS) as PublicationType[]).map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {isAr ? TYPE_LABELS[t].ar : TYPE_LABELS[t].en}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Add button (admin only) */}
                    {isAdmin && (
                        <Button
                            onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }}
                            className="flex items-center gap-2"
                        >
                            <Plus className="size-4" />
                            {isAr ? "إضافة منشور" : "Add Publication"}
                        </Button>
                    )}
                </div>

                {/* Results count */}
                <p className="mb-4 text-sm text-muted-foreground">
                    {isAr ? `النتائج: ${filtered.length} من ${publications.length}` : `Results: ${filtered.length} of ${publications.length}`}
                </p>

                {/* Type filter tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {[{ key: "all", ar: "الكل", en: "All" }, ...Object.entries(TYPE_LABELS).map(([k, v]) => ({ key: k, ar: v.ar, en: v.en }))].map(({ key, ar, en }) => (
                        <button
                            key={key}
                            onClick={() => setTypeFilter(key)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${typeFilter === key ? "bg-[#254151] text-white border-[#254151]" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}
                        >
                            {isAr ? ar : en}
                        </button>
                    ))}
                </div>

                {/* Publications list */}
                {loading ? (
                    <div className="py-20 text-center text-gray-500">
                        {isAr ? "جار التحميل..." : "Loading..."}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                        {isAr ? "لا توجد نتائج" : "No results found"}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filtered.map((pub) => {
                            const meta = TYPE_LABELS[pub.type];
                            const Icon = meta.icon;
                            return (
                                <div
                                    key={pub._id}
                                    className={`relative rounded-xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${colorMap[meta.color]}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 flex size-10 items-center justify-center rounded-full text-white ${badgeBgMap[meta.color]}`}>
                                            <Icon className="size-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${badgeBgMap[meta.color]}`}>
                                                    {isAr ? meta.ar : meta.en}
                                                </span>
                                                {pub.indexed && (
                                                    <span className="rounded-full bg-[#254151] px-2 py-0.5 text-xs font-semibold text-white">
                                                        {isAr ? "مفهرسة" : "Indexed"}
                                                    </span>
                                                )}
                                                {pub.year && (
                                                    <span className="text-xs text-gray-500">{pub.year}</span>
                                                )}
                                            </div>
                                            <h3 className="mb-1 text-base font-bold text-[#254151] leading-snug">
                                                {pub.title}
                                            </h3>
                                            <p className="mb-1 text-sm text-gray-600">{pub.details}</p>
                                            <p className="text-xs text-gray-500 font-medium">{pub.author}</p>
                                        </div>
                                        {/* Admin actions */}
                                        {isAdmin && (
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-[#6096b4] hover:text-[#4f7e97]"
                                                    onClick={() => openEdit(pub)}
                                                >
                                                    <Pencil className="size-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => setDeleteItem(pub)}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isAr ? "إضافة منشور بحثي" : "Add Publication"}</DialogTitle>
                    </DialogHeader>
                    <PublicationForm form={form} setForm={setForm} isAr={isAr} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
                        <Button onClick={handleAdd} disabled={saving}>{isAr ? "إضافة" : "Add"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isAr ? "تعديل المنشور" : "Edit Publication"}</DialogTitle>
                    </DialogHeader>
                    <PublicationForm form={form} setForm={setForm} isAr={isAr} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditItem(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
                        <Button onClick={handleEdit} disabled={saving}>{isAr ? "حفظ" : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{isAr ? "حذف المنشور" : "Delete Publication"}</DialogTitle>
                        <DialogDescription>
                            {isAr ? "هل أنت متأكد من الحذف؟ لا يمكن التراجع." : "Are you sure? This cannot be undone."}
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-sm font-medium text-gray-700 line-clamp-2">{deleteItem?.title}</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                            {isAr ? "حذف" : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}

function PublicationForm({
    form,
    setForm,
    isAr,
}: {
    form: any;
    setForm: (f: any) => void;
    isAr: boolean;
}) {
    const set = (key: string, val: any) => setForm({ ...form, [key]: val });

    return (
        <div className="grid gap-4 py-2">
            <div className="grid gap-2">
                <Label>{isAr ? "النوع" : "Type"}</Label>
                <Select value={form.type} onValueChange={(v) => set("type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {(Object.entries(TYPE_LABELS) as [PublicationType, any][]).map(([k, v]) => (
                            <SelectItem key={k} value={k}>{isAr ? v.ar : v.en}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "عنوان المنشور" : "Title"}</Label>
                <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "التفاصيل (المجلة / الناشر...)" : "Details (Journal / Publisher...)"}</Label>
                <Input value={form.details} onChange={(e) => set("details", e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "المؤلف" : "Author"}</Label>
                <Input value={form.author} onChange={(e) => set("author", e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "السنة" : "Year"}</Label>
                <Input value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="e.g. 2024" />
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="indexed"
                    checked={form.indexed}
                    onChange={(e) => set("indexed", e.target.checked)}
                    className="size-4 cursor-pointer"
                />
                <Label htmlFor="indexed" className="cursor-pointer">
                    {isAr ? "مفهرسة دولياً" : "Internationally Indexed"}
                </Label>
            </div>
        </div>
    );
}

