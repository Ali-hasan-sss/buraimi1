"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BookOpen, Search, Loader2, Plus, Pencil, Trash2,
    Lightbulb, Globe, Scale, Users, Target, DollarSign,
    Award, Heart, TrendingUp, Briefcase, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const FIELD_IDS = [
    "entrepreneurship", "english", "customer_service", "marketing",
    "logistics", "law", "hr", "strategic_planning",
    "finance_accounting", "quality", "professional_courses",
] as const;

type FieldId = (typeof FIELD_IDS)[number];

type Course = {
    _id: string;
    titleAr: string;
    titleEn: string;
    durationAr: string;
    durationEn: string;
    fieldId: FieldId;
    order: number;
};

const EMPTY_FORM: Omit<Course, "_id"> = {
    titleAr: "", titleEn: "", durationAr: "", durationEn: "",
    fieldId: "entrepreneurship", order: 0,
};

const FIELD_META: Record<FieldId, { nameAr: string; nameEn: string; icon: React.ElementType; color: string }> = {
    entrepreneurship:    { nameAr: "ريادة الأعمال",             nameEn: "Entrepreneurship",    icon: Lightbulb,  color: "#f59e0b" },
    english:             { nameAr: "اللغة الإنجليزية",           nameEn: "English Language",    icon: Globe,      color: "#3b82f6" },
    customer_service:    { nameAr: "خدمة العملاء",               nameEn: "Customer Service",    icon: Heart,      color: "#ec4899" },
    marketing:           { nameAr: "التسويق",                    nameEn: "Marketing",           icon: TrendingUp, color: "#8b5cf6" },
    logistics:           { nameAr: "اللوجستيات",                 nameEn: "Logistics",           icon: Briefcase,  color: "#6366f1" },
    law:                 { nameAr: "القانون",                    nameEn: "Law",                 icon: Scale,      color: "#64748b" },
    hr:                  { nameAr: "الموارد البشرية",             nameEn: "Human Resources",     icon: Users,      color: "#10b981" },
    strategic_planning:  { nameAr: "التخطيط الاستراتيجي",        nameEn: "Strategic Planning",  icon: Target,     color: "#f97316" },
    finance_accounting:  { nameAr: "المالية والمحاسبة",           nameEn: "Finance & Accounting",icon: DollarSign, color: "#14b8a6" },
    quality:             { nameAr: "الجودة",                     nameEn: "Quality",             icon: Award,      color: "#eab308" },
    professional_courses:{ nameAr: "الدورات الاحترافية",         nameEn: "Professional Courses",icon: Star,       color: "#254151" },
};

const T = {
    ar: {
        coursesTitle: "الدورات المقدمة",
        coursesSubtitle: "اختر من بين أكثر من 150 دورة تدريبية متخصصة",
        searchPlaceholder: "ابحث عن دورة...",
        resultsLabel: "عدد النتائج:",
        noResultsTitle: "لا توجد نتائج",
        noResultsBody: "جرب البحث بكلمات مختلفة أو اختر مجال آخر",
        allFields: "الكل",
        addBtn: "إضافة دورة",
        addTitle: "إضافة دورة جديدة",
        editTitle: "تعديل الدورة",
        deleteTitle: "حذف الدورة",
        deleteDesc: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
        cancel: "إلغاء", save: "حفظ", add: "إضافة", delete: "حذف",
        loading: "جار التحميل...",
        titleAr: "العنوان (عربي)", titleEn: "العنوان (English)",
        durationAr: "المدة (عربي)", durationEn: "المدة (English)",
        field: "المجال", order: "الترتيب",
    },
    en: {
        coursesTitle: "Offered Courses",
        coursesSubtitle: "Choose from 150+ specialized training courses.",
        searchPlaceholder: "Search for a course...",
        resultsLabel: "Results:",
        noResultsTitle: "No results found",
        noResultsBody: "Try different keywords or choose another field.",
        allFields: "All",
        addBtn: "Add Course",
        addTitle: "Add New Course",
        editTitle: "Edit Course",
        deleteTitle: "Delete Course",
        deleteDesc: "Are you sure? This cannot be undone.",
        cancel: "Cancel", save: "Save", add: "Add", delete: "Delete",
        loading: "Loading...",
        titleAr: "Title (Arabic)", titleEn: "Title (English)",
        durationAr: "Duration (Arabic)", durationEn: "Duration (English)",
        field: "Field", order: "Order",
    },
};

type TContent = typeof T["ar"] | typeof T["en"];

export default function TrainingCoursesSection({
    isAr,
    isAdmin = false,
}: {
    isAr: boolean;
    isAdmin?: boolean;
}) {
    const t = T[isAr ? "ar" : "en"];

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFieldId, setSelectedFieldId] = useState<FieldId | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<Course | null>(null);
    const [deleteItem, setDeleteItem] = useState<Course | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<Omit<Course, "_id">>({ ...EMPTY_FORM });

    useEffect(() => { fetchCourses(); }, []);

    async function fetchCourses() {
        setLoading(true);
        try {
            const res = await fetch("/api/training-courses");
            const data = await res.json();
            setCourses(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load courses");
        } finally { setLoading(false); }
    }

    async function handleAdd() {
        setSaving(true);
        try {
            const res = await fetch("/api/training-courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Course added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchCourses();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/training-courses/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Course updated");
            setEditItem(null);
            fetchCourses();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/training-courses/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Course deleted");
            setDeleteItem(null);
            fetchCourses();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    function openEdit(c: Course) {
        setForm({ titleAr: c.titleAr, titleEn: c.titleEn, durationAr: c.durationAr, durationEn: c.durationEn, fieldId: c.fieldId, order: c.order });
        setEditItem(c);
    }

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return courses.filter((c) => {
            const matchField = selectedFieldId === "all" || c.fieldId === selectedFieldId;
            const title = isAr ? c.titleAr : c.titleEn;
            const matchSearch = q.length === 0 || title.toLowerCase().includes(q);
            return matchField && matchSearch;
        });
    }, [courses, selectedFieldId, searchQuery, isAr]);

    const fields = useMemo(() => [
        { id: "all" as FieldId | "all", nameAr: "الكل", nameEn: "All", icon: BookOpen, color: "#254151" },
        ...FIELD_IDS.map((id) => ({ id: id as FieldId | "all", ...FIELD_META[id] })),
    ], []);

    return (
        <section className="py-12 sm:py-14 lg:py-16 bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <BookOpen className="size-10 sm:size-14 lg:size-16 text-purple-600 mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-4">{t.coursesTitle}</h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600">{t.coursesSubtitle}</p>
                </div>

                {/* Search + Add */}
                <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-2 border-purple-200">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute end-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pe-10 ps-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-sm sm:text-base"
                            />
                        </div>
                        {isAdmin && (
                            <Button onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }} className="flex items-center gap-2 shrink-0">
                                <Plus className="size-4" />
                                {t.addBtn}
                            </Button>
                        )}
                    </div>

                    {/* Field Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {fields.map((field) => {
                            const Icon = field.icon;
                            const active = selectedFieldId === field.id;
                            return (
                                <button
                                    key={field.id}
                                    onClick={() => setSelectedFieldId(field.id as FieldId | "all")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${active ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
                                    style={active ? { backgroundColor: field.color, borderColor: field.color } : {}}
                                >
                                    <Icon className="size-3.5" />
                                    {isAr ? field.nameAr : field.nameEn}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        {t.resultsLabel} <span className="font-bold text-purple-600">{filtered.length}</span>
                    </p>
                </div>

                {/* Courses Grid */}
                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
                        <Loader2 className="size-5 animate-spin" />
                        {t.loading}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <Search className="size-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">{t.noResultsTitle}</h3>
                        <p className="text-gray-400">{t.noResultsBody}</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course) => {
                            const meta = FIELD_META[course.fieldId];
                            const Icon = meta.icon;
                            return (
                                <div key={course._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                                    <div className="h-2" style={{ backgroundColor: meta.color }} />
                                    <div className="p-5">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: `${meta.color}20` }}>
                                                <Icon className="size-5" style={{ color: meta.color }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${meta.color}20`, color: meta.color }}>
                                                    {isAr ? meta.nameAr : meta.nameEn}
                                                </span>
                                                <h3 className="text-sm sm:text-base font-bold text-[#254151] mt-1 leading-snug">
                                                    {isAr ? course.titleAr : course.titleEn}
                                                </h3>
                                            </div>
                                            {isAdmin && (
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <Button variant="ghost" size="icon-sm" className="text-[#6096b4] hover:text-[#4f7e97]" onClick={() => openEdit(course)}>
                                                        <Pencil className="size-3.5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-700" onClick={() => setDeleteItem(course)}>
                                                        <Trash2 className="size-3.5" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 border-t pt-2">
                                            {isAr ? course.durationAr : course.durationEn}
                                        </p>
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
                    <DialogHeader><DialogTitle>{t.addTitle}</DialogTitle></DialogHeader>
                    <CourseForm form={form} setForm={setForm} t={t} isAr={isAr} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>{t.editTitle}</DialogTitle></DialogHeader>
                    <CourseForm form={form} setForm={setForm} t={t} isAr={isAr} />
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
                    <p className="text-sm font-medium text-gray-700">{isAr ? deleteItem?.titleAr : deleteItem?.titleEn}</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{t.cancel}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>{t.delete}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}

function CourseForm({
    form, setForm, t, isAr,
}: {
    form: Omit<Course, "_id">;
    setForm: (f: Omit<Course, "_id">) => void;
    t: TContent;
    isAr: boolean;
}) {
    return (
        <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{t.titleAr}</Label>
                    <Input value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} dir="rtl" />
                </div>
                <div className="grid gap-2">
                    <Label>{t.titleEn}</Label>
                    <Input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{t.durationAr}</Label>
                    <Input value={form.durationAr} onChange={(e) => setForm({ ...form, durationAr: e.target.value })} dir="rtl" placeholder="إجمالي 15 ساعة..." />
                </div>
                <div className="grid gap-2">
                    <Label>{t.durationEn}</Label>
                    <Input value={form.durationEn} onChange={(e) => setForm({ ...form, durationEn: e.target.value })} placeholder="Total 15 hours..." />
                </div>
            </div>
            <div className="grid gap-2">
                <Label>{t.field}</Label>
                <select
                    value={form.fieldId}
                    onChange={(e) => setForm({ ...form, fieldId: e.target.value as FieldId })}
                    className="border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    {FIELD_IDS.map((id) => (
                        <option key={id} value={id}>
                            {isAr ? FIELD_META[id].nameAr : FIELD_META[id].nameEn}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-2">
                <Label>{t.order}</Label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
        </div>
    );
}
