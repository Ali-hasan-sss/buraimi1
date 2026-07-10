"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
    Award, BookOpen, Brain, Briefcase, Calendar, Filter, Search,
    Target, Users, Zap, Plus, Pencil, Trash2, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type LocaleKey = "ar" | "en";
type ProjectCategory = "ريادة الأعمال" | "تقنية المعلومات" | "الابتكار والتنافسية" | "قانوني" | "تعليمي";

type Project = {
    _id: string;
    year: string;
    investigator: string;
    titleAr?: string;
    titleEn: string;
    objectives: string;
    category: ProjectCategory;
    isActive: boolean;
    order: number;
};

const YEARS = ["الكل", "2024-2025", "2023-2024", "2022-2023", "2021-2022"];
const CATEGORIES: ProjectCategory[] = ["ريادة الأعمال", "تقنية المعلومات", "الابتكار والتنافسية", "تعليمي", "قانوني"];
const ALL_CATEGORIES = ["الكل", ...CATEGORIES] as const;

const CATEGORY_META: Record<ProjectCategory, { ar: string; en: string; icon: any; color: string }> = {
    "ريادة الأعمال":       { ar: "ريادة الأعمال",       en: "Entrepreneurship",          icon: Briefcase, color: "blue"   },
    "تقنية المعلومات":     { ar: "تقنية المعلومات",     en: "Information Technology",    icon: Zap,       color: "purple" },
    "الابتكار والتنافسية": { ar: "الابتكار والتنافسية", en: "Innovation & Competitiveness", icon: Brain,  color: "green"  },
    "تعليمي":              { ar: "تعليمي",              en: "Education",                  icon: BookOpen,  color: "amber"  },
    "قانوني":              { ar: "قانوني",              en: "Legal",                      icon: Award,     color: "red"    },
};

const EMPTY_FORM = {
    year: "2024-2025",
    investigator: "",
    titleAr: "",
    titleEn: "",
    objectives: "",
    category: "ريادة الأعمال" as ProjectCategory,
};

const YEARS_OPTIONS = ["2024-2025", "2023-2024", "2022-2023", "2021-2022"];

const T = {
    ar: {
        searchPlaceholder: "ابحث في المشاريع البحثية...",
        yearFilter: "تصنيف حسب السنة:",
        categoryFilter: "تصنيف حسب الفئة:",
        resultsLabel: "مشروع بحثي",
        investigatorsLabel: "الباحثون الرئيسيون:",
        objectivesLabel: "أهداف المشروع:",
        noResultsTitle: "لم يتم العثور على نتائج",
        noResultsBody: "جرب البحث بكلمات مختلفة أو غيّر التصنيف",
        all: "الكل",
        addBtn: "إضافة مشروع",
        addTitle: "إضافة مشروع بحثي",
        editTitle: "تعديل المشروع",
        deleteTitle: "حذف المشروع",
        deleteDesc: "هل أنت متأكد من الحذف؟ لا يمكن التراجع.",
        cancel: "إلغاء",
        save: "حفظ",
        add: "إضافة",
        delete: "حذف",
        loading: "جار التحميل...",
    },
    en: {
        searchPlaceholder: "Search research projects...",
        yearFilter: "Filter by year:",
        categoryFilter: "Filter by category:",
        resultsLabel: "Projects",
        investigatorsLabel: "Principal Investigators:",
        objectivesLabel: "Project Objectives:",
        noResultsTitle: "No results found",
        noResultsBody: "Try different keywords or change the filters",
        all: "All",
        addBtn: "Add Project",
        addTitle: "Add Research Project",
        editTitle: "Edit Project",
        deleteTitle: "Delete Project",
        deleteDesc: "Are you sure? This cannot be undone.",
        cancel: "Cancel",
        save: "Save",
        add: "Add",
        delete: "Delete",
        loading: "Loading...",
    },
} as const;

export default function ProjExplorerSection({ isAdmin = false }: { isAdmin?: boolean }) {
    const locale = useLocale() as LocaleKey;
    const isAr = locale === "ar";
    const t = T[locale] ?? T.en;

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("الكل");
    const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
    const [searchQuery, setSearchQuery] = useState("");

    // Dialog state
    const [addOpen, setAddOpen] = useState(false);
    const [editItem, setEditItem] = useState<Project | null>(null);
    const [deleteItem, setDeleteItem] = useState<Project | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ ...EMPTY_FORM });

    useEffect(() => { fetchProjects(); }, []);

    async function fetchProjects() {
        setLoading(true);
        try {
            const res = await fetch("/api/research-projects");
            const data = await res.json();
            setProjects(data.data || []);
        } catch {
            toast.error(isAr ? "فشل تحميل البيانات" : "Failed to load projects");
        } finally {
            setLoading(false);
        }
    }

    const filteredProjects = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return projects.filter((p) => {
            const matchYear = selectedYear === "الكل" || p.year === selectedYear;
            const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
            const matchSearch =
                !q ||
                p.titleEn.toLowerCase().includes(q) ||
                (p.titleAr?.toLowerCase().includes(q) ?? false) ||
                p.investigator.toLowerCase().includes(q) ||
                p.objectives.toLowerCase().includes(q);
            return matchYear && matchCat && matchSearch;
        });
    }, [projects, selectedYear, selectedCategory, searchQuery]);

    // Derive year list dynamically from DB + defaults
    const years = useMemo(() => {
        const dbYears = [...new Set(projects.map((p) => p.year))].sort().reverse();
        const merged = ["الكل", ...new Set([...YEARS_OPTIONS, ...dbYears])];
        return merged;
    }, [projects]);

    async function handleAdd() {
        setSaving(true);
        try {
            const res = await fetch("/api/research-projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تمت الإضافة بنجاح" : "Project added");
            setAddOpen(false);
            setForm({ ...EMPTY_FORM });
            fetchProjects();
        } catch {
            toast.error(isAr ? "فشلت الإضافة" : "Failed to add");
        } finally { setSaving(false); }
    }

    async function handleEdit() {
        if (!editItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/research-projects/${editItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم التعديل بنجاح" : "Project updated");
            setEditItem(null);
            fetchProjects();
        } catch {
            toast.error(isAr ? "فشل التعديل" : "Failed to update");
        } finally { setSaving(false); }
    }

    async function handleDelete() {
        if (!deleteItem) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/research-projects/${deleteItem._id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success(isAr ? "تم الحذف بنجاح" : "Project deleted");
            setDeleteItem(null);
            fetchProjects();
        } catch {
            toast.error(isAr ? "فشل الحذف" : "Failed to delete");
        } finally { setSaving(false); }
    }

    function openEdit(p: Project) {
        setForm({
            year: p.year,
            investigator: p.investigator,
            titleAr: p.titleAr || "",
            titleEn: p.titleEn,
            objectives: p.objectives,
            category: p.category,
        });
        setEditItem(p);
    }

    const primaryTitle = (p: Project) => isAr ? (p.titleAr ?? p.titleEn) : p.titleEn;
    const secondaryTitle = (p: Project) => isAr ? (p.titleAr ? p.titleEn : null) : (p.titleAr ?? null);

    return (
        <>
            {/* Filter section */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-10 sm:py-16">
                <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                    <div className="rounded-lg border-2 border-blue-200 bg-white p-5 shadow-2xl sm:p-8">
                        {/* Search + Add */}
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-400 sm:size-6" />
                                <input
                                    type="text"
                                    placeholder={t.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border-2 border-blue-300 py-3 pl-4 pr-12 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-4 sm:pl-6 sm:pr-14 sm:text-lg"
                                />
                            </div>
                            {isAdmin && (
                                <Button
                                    onClick={() => { setForm({ ...EMPTY_FORM }); setAddOpen(true); }}
                                    className="flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Plus className="size-4" />
                                    {t.addBtn}
                                </Button>
                            )}
                        </div>

                        {/* Year filter */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center gap-2">
                                <Calendar className="size-5 text-blue-700 sm:size-6" />
                                <span className="text-sm font-bold text-blue-700 sm:text-lg">{t.yearFilter}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`rounded-lg px-4 py-2 text-sm font-bold transition-all sm:px-6 sm:py-3 ${
                                            selectedYear === year
                                                ? "bg-[#254151] text-white shadow-xl"
                                                : "border-2 border-blue-200 bg-white text-gray-700 hover:border-blue-400 hover:shadow-md"
                                        }`}
                                    >
                                        {year === "الكل" ? t.all : year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category filter */}
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <Filter className="size-5 text-purple-700 sm:size-6" />
                                <span className="text-sm font-bold text-purple-700 sm:text-lg">{t.categoryFilter}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {ALL_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`rounded-lg px-4 py-2 text-sm font-bold transition-all sm:px-6 sm:py-3 ${
                                            selectedCategory === cat
                                                ? "bg-[#6096b4] text-white shadow-xl"
                                                : "border-2 border-purple-200 bg-white text-gray-700 hover:border-purple-400 hover:shadow-md"
                                        }`}
                                    >
                                        {cat === "الكل" ? t.all : (isAr ? CATEGORY_META[cat as ProjectCategory]?.ar : CATEGORY_META[cat as ProjectCategory]?.en)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 text-center sm:mt-6">
                            <p className="text-sm text-gray-700 sm:text-lg">
                                <span className="text-xl font-bold text-blue-700 sm:text-2xl">{filteredProjects.length}</span>
                                <span className="ms-2">{t.resultsLabel}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects list */}
            <section className="bg-white py-10 sm:py-16">
                <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-20 text-gray-500">
                            <Loader2 className="size-5 animate-spin" />
                            {t.loading}
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-6">
                            {filteredProjects.map((project, index) => {
                                const meta = CATEGORY_META[project.category];
                                const CategoryIcon = meta?.icon ?? Target;
                                const color = meta?.color ?? "gray";
                                const mainTitle = primaryTitle(project);
                                const subTitle = secondaryTitle(project);

                                return (
                                    <div
                                        key={project._id}
                                        className="rounded-lg border-2 border-blue-200 bg-white p-4 shadow-xl transition-all hover:shadow-2xl sm:p-6"
                                    >
                                        <div className="flex items-start gap-4 sm:gap-6">
                                            <div className="hidden sm:flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-[#254151] text-lg font-bold text-white sm:size-16 sm:text-2xl">
                                                {index + 1}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="mb-4 flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="mb-2 text-base font-bold leading-relaxed text-[#254151] sm:text-2xl">{mainTitle}</h3>
                                                        {subTitle && (
                                                            <h4 className="text-sm font-bold leading-relaxed text-[#6096b4] sm:text-xl">{subTitle}</h4>
                                                        )}
                                                    </div>
                                                    {isAdmin && (
                                                        <div className="flex flex-shrink-0 gap-1">
                                                            <Button variant="ghost" size="icon-sm" className="text-[#6096b4] hover:text-[#4f7e97]" onClick={() => openEdit(project)}>
                                                                <Pencil className="size-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-700" onClick={() => setDeleteItem(project)}>
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-4 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
                                                    <div className="flex items-center gap-2 rounded-lg border-2 border-amber-200 bg-amber-100 p-2 sm:p-3">
                                                        <Calendar className="size-4 text-amber-600 sm:size-5" />
                                                        <span className="text-xs font-bold text-amber-700 sm:text-sm">{project.year}</span>
                                                    </div>
                                                    <div className={`flex items-center gap-2 rounded-lg border-2 border-${color}-200 bg-${color}-100 p-2 sm:p-3`}>
                                                        <CategoryIcon className={`size-4 sm:size-5 text-${color}-600`} />
                                                        <span className={`text-xs sm:text-sm font-bold text-${color}-700`}>
                                                            {isAr ? meta?.ar : meta?.en}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 rounded-lg border-2 border-blue-200 bg-blue-100 p-2 sm:p-3">
                                                        <Users className="size-4 text-blue-600 sm:size-5" />
                                                        <span className="truncate text-xs font-bold text-blue-700 sm:text-sm" title={project.investigator}>
                                                            {project.investigator.split(",")[0]}
                                                            {project.investigator.includes(",") ? "..." : ""}
                                                        </span>
                                                    </div>
                                                </div>

                                                {project.investigator.includes(",") && (
                                                    <div className="mb-4 rounded-lg border-r-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white p-3 sm:p-4">
                                                        <div className="flex items-start gap-2">
                                                            <Users className="mt-1 size-4 flex-shrink-0 text-blue-600 sm:size-5" />
                                                            <div>
                                                                <p className="mb-1 text-xs font-bold text-blue-700 sm:text-sm">{t.investigatorsLabel}</p>
                                                                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{project.investigator}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="rounded-lg border-r-4 border-green-500 bg-gradient-to-r from-green-50 to-white p-3 sm:p-4">
                                                    <div className="flex items-start gap-2">
                                                        <Target className="mt-1 size-5 flex-shrink-0 text-green-600 sm:size-6" />
                                                        <div>
                                                            <p className="mb-2 text-xs font-bold text-green-700 sm:text-sm">{t.objectivesLabel}</p>
                                                            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{project.objectives}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="mt-8 rounded-lg border-2 border-gray-300 bg-gray-100 p-8 text-center sm:mt-10 sm:p-12">
                            <Search className="mx-auto mb-4 size-14 text-gray-400 sm:size-20" />
                            <h3 className="mb-2 text-lg font-bold text-gray-600 sm:text-2xl">{t.noResultsTitle}</h3>
                            <p className="text-sm text-gray-500 sm:text-lg">{t.noResultsBody}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Add Dialog */}
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t.addTitle}</DialogTitle>
                    </DialogHeader>
                    <ProjectForm form={form} setForm={setForm} isAr={isAr} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddOpen(false)}>{t.cancel}</Button>
                        <Button onClick={handleAdd} disabled={saving}>{t.add}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t.editTitle}</DialogTitle>
                    </DialogHeader>
                    <ProjectForm form={form} setForm={setForm} isAr={isAr} />
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
                    <p className="text-sm font-medium text-gray-700 line-clamp-2">{deleteItem?.titleEn}</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteItem(null)}>{t.cancel}</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={saving}>{t.delete}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function ProjectForm({
    form,
    setForm,
    isAr,
}: {
    form: typeof EMPTY_FORM;
    setForm: (f: typeof EMPTY_FORM) => void;
    isAr: boolean;
}) {
    const set = (key: string, val: string) => setForm({ ...form, [key]: val });

    return (
        <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label>{isAr ? "السنة الأكاديمية" : "Academic Year"}</Label>
                    <Select value={form.year} onValueChange={(v) => set("year", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {YEARS_OPTIONS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>{isAr ? "الفئة" : "Category"}</Label>
                    <Select value={form.category} onValueChange={(v) => set("category", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {isAr ? CATEGORY_META[c].ar : CATEGORY_META[c].en}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "عنوان المشروع (English)" : "Project Title (English)"}</Label>
                <Input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "عنوان المشروع (عربي) - اختياري" : "Project Title (Arabic) - optional"}</Label>
                <Input value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} dir="rtl" />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "الباحث / الباحثون" : "Investigator(s)"}</Label>
                <Input value={form.investigator} onChange={(e) => set("investigator", e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label>{isAr ? "أهداف المشروع" : "Project Objectives"}</Label>
                <Textarea
                    value={form.objectives}
                    onChange={(e) => set("objectives", e.target.value)}
                    rows={4}
                    required
                />
            </div>
        </div>
    );
}

