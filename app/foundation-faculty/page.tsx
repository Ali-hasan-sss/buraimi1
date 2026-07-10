
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
  Award,
  BookOpen,
  ChevronLeft,
  CircleUser,
  GraduationCap,
  Loader2,
  Mail,
  Monitor,
  Pencil,
  Phone,
  Plus,
  Save,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  foundationFacultyPageSeed,
  type FoundationFacultyDepartment,
  type FoundationFacultyMember,
  type FoundationFacultyPageData,
} from "@/staticData/foundation-program";

type DeptFilter = "all" | string;

const ICON_OPTIONS = [
  { value: "users", ar: "مستخدمون", en: "Users", Icon: Users },
  { value: "award", ar: "جائزة", en: "Award", Icon: Award },
  { value: "book-open", ar: "كتاب", en: "Book", Icon: BookOpen },
  { value: "monitor", ar: "شاشة", en: "Monitor", Icon: Monitor },
] as const;

const COLOR_OPTIONS = ["blue", "green", "purple", "amber", "indigo", "teal", "red", "pink", "cyan", "violet"] as const;

const departmentStyles: Record<string, { border: string; header: string; light: string; accent: string }> = {
  blue: { border: "border-blue-200", header: "from-blue-600 to-blue-700", light: "bg-blue-50", accent: "text-blue-700" },
  green: { border: "border-green-200", header: "from-green-600 to-green-700", light: "bg-green-50", accent: "text-green-700" },
  purple: { border: "border-purple-200", header: "from-purple-600 to-purple-700", light: "bg-purple-50", accent: "text-purple-700" },
  amber: { border: "border-amber-200", header: "from-amber-600 to-amber-700", light: "bg-amber-50", accent: "text-amber-700" },
  indigo: { border: "border-indigo-200", header: "from-indigo-600 to-indigo-700", light: "bg-indigo-50", accent: "text-indigo-700" },
  teal: { border: "border-teal-200", header: "from-teal-600 to-teal-700", light: "bg-teal-50", accent: "text-teal-700" },
  red: { border: "border-red-200", header: "from-red-600 to-red-700", light: "bg-red-50", accent: "text-red-700" },
  pink: { border: "border-pink-200", header: "from-pink-600 to-pink-700", light: "bg-pink-50", accent: "text-pink-700" },
  cyan: { border: "border-cyan-200", header: "from-cyan-600 to-cyan-700", light: "bg-cyan-50", accent: "text-cyan-700" },
  violet: { border: "border-violet-200", header: "from-violet-600 to-violet-700", light: "bg-violet-50", accent: "text-violet-700" },
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function FacultyCard({ member, isAr }: { member: FoundationFacultyMember; isAr: boolean }) {
  const style = departmentStyles[member.cardTone] ?? departmentStyles.blue;
  return (
    <div className={`bg-white rounded-lg shadow-xl border-2 ${style.border} overflow-hidden hover:shadow-2xl transition-all`}>
      <div className={`bg-gradient-to-r ${style.header} text-white p-6 text-center`}>
        <div className="bg-white/20 backdrop-blur-sm size-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CircleUser className="size-12" />
        </div>
        <h3 className="text-xl font-bold mb-1">{isAr ? member.nameAr : member.nameEn}</h3>
        <p className="text-sm opacity-90">{isAr ? member.nameEn : member.nameAr}</p>
      </div>
      <div className="p-6">
        <div className={`${style.light} p-4 rounded-lg border-2 ${style.border} mb-4 text-center`}>
          <p className="font-bold text-[#254151] mb-1">{isAr ? member.roleAr : member.roleEn}</p>
          <p className="text-sm text-gray-600">{isAr ? member.roleEn : member.roleAr}</p>
        </div>
        <div className="space-y-3">
          <div className={`${style.light} p-3 rounded-lg border-2 ${style.border}`}>
            <div className="flex items-center gap-2 mb-1"><Mail className="size-4 text-gray-600" /><p className="text-xs text-gray-600">{isAr ? "البريد الإلكتروني" : "Email"}</p></div>
            <a href={`mailto:${member.email}`} className={`text-sm font-semibold ${style.accent} hover:underline break-all`}>{member.email}</a>
          </div>
          <div className={`${style.light} p-3 rounded-lg border-2 ${style.border}`}>
            <div className="flex items-center gap-2 mb-1"><Phone className="size-4 text-gray-600" /><p className="text-xs text-gray-600">{isAr ? "رقم الهاتف" : "Phone"}</p></div>
            <a href={`tel:${member.phone}`} className={`text-sm font-semibold ${style.accent} hover:underline`} dir="ltr">{member.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ department, isAr }: { department: FoundationFacultyDepartment; isAr: boolean }) {
  const style = departmentStyles[department.color] ?? departmentStyles.blue;
  const Icon = ICON_OPTIONS.find((i) => i.value === department.icon)?.Icon ?? Users;
  return (
    <div className={`rounded-lg border-2 ${style.border} ${style.light} p-4`}>
      <div className="flex items-center gap-3">
        <div className={`text-white p-2 rounded-full bg-gradient-to-r ${style.header}`}><Icon className="size-5" /></div>
        <div>
          <p className="font-bold text-[#254151]">{isAr ? department.nameAr : department.nameEn}</p>
          <p className="text-xs text-gray-500">{department.id}</p>
        </div>
      </div>
    </div>
  );
}

export default function FoundationFacultyPage() {
  const isAr = useLocale() === "ar";
  const [data, setData] = useState<FoundationFacultyPageData>(foundationFacultyPageSeed);
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<DeptFilter>("all");

  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [addingMemberDepartmentId, setAddingMemberDepartmentId] = useState<string | null>(null);
  const [memberDraft, setMemberDraft] = useState<FoundationFacultyMember | null>(null);

  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [addingDepartment, setAddingDepartment] = useState(false);
  const [departmentDraft, setDepartmentDraft] = useState<FoundationFacultyDepartment | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [authRes, dataRes] = await Promise.all([
          fetch("/api/auth/me", { credentials: "include", cache: "no-store" }),
          fetch("/api/foundation-program", { cache: "no-store" }),
        ]);
        if (authRes.ok) {
          const me = (await authRes.json()) as { ok?: boolean; isAdmin?: boolean };
          setIsAdmin(Boolean(me?.ok && me?.isAdmin));
        }
        if (dataRes.ok) {
          const json = (await dataRes.json()) as { ok?: boolean; data?: { facultyPageDetails?: FoundationFacultyPageData } };
          if (json.ok && json.data?.facultyPageDetails) {
            setData({
              ...foundationFacultyPageSeed,
              ...json.data.facultyPageDetails,
              departments: json.data.facultyPageDetails.departments?.length ? json.data.facultyPageDetails.departments : foundationFacultyPageSeed.departments,
              members: json.data.facultyPageDetails.members?.length ? json.data.facultyPageDetails.members : foundationFacultyPageSeed.members,
            });
          }
        }
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  const counts = useMemo(() => {
    const byDepartment = Object.fromEntries(data.departments.map((d) => [d.id, 0]));
    data.members.forEach((m) => {
      byDepartment[m.departmentId] = (byDepartment[m.departmentId] || 0) + 1;
    });
    return { all: data.members.length, byDepartment };
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.members.filter((m) => {
      const depOk = department === "all" || m.departmentId === department;
      if (!depOk) return false;
      if (!q) return true;
      return `${m.nameAr} ${m.nameEn} ${m.email}`.toLowerCase().includes(q);
    });
  }, [data.members, department, query]);

  const grouped = useMemo(
    () => data.departments.map((d) => ({ department: d, members: filtered.filter((m) => m.departmentId === d.id) })),
    [data.departments, filtered],
  );

  const resetMemberInline = () => {
    setEditingMemberId(null);
    setAddingMemberDepartmentId(null);
    setMemberDraft(null);
  };

  const startEditMember = (m: FoundationFacultyMember) => {
    setEditingMemberId(m.id);
    setAddingMemberDepartmentId(null);
    setMemberDraft({ ...m });
  };

  const startAddMember = (departmentId: string, tone: string) => {
    setEditingMemberId(null);
    setAddingMemberDepartmentId(departmentId);
    setMemberDraft({
      id: "",
      departmentId,
      nameAr: "",
      nameEn: "",
      roleAr: "",
      roleEn: "",
      email: "",
      phone: "",
      cardTone: tone,
      badgeAr: "",
      badgeEn: "",
    });
  };

  const saveMemberInline = () => {
    if (!memberDraft || !memberDraft.nameAr.trim() || !memberDraft.nameEn.trim() || !memberDraft.departmentId) return;
    const payload = { ...memberDraft, id: memberDraft.id || uid() };
    setData((prev) => ({
      ...prev,
      members: prev.members.some((m) => m.id === payload.id) ? prev.members.map((m) => (m.id === payload.id ? payload : m)) : [...prev.members, payload],
    }));
    resetMemberInline();
  };

  const removeMember = (id: string) => {
    setData((prev) => ({ ...prev, members: prev.members.filter((m) => m.id !== id) }));
    if (editingMemberId === id) resetMemberInline();
  };

  const startEditDepartment = (d: FoundationFacultyDepartment) => {
    setAddingDepartment(false);
    setEditingDepartmentId(d.id);
    setDepartmentDraft({ ...d });
  };

  const startAddDepartment = () => {
    setEditingDepartmentId(null);
    setAddingDepartment(true);
    setDepartmentDraft({ id: "", nameAr: "", nameEn: "", color: "blue", icon: "users" });
  };

  const cancelDepartmentInline = () => {
    setEditingDepartmentId(null);
    setAddingDepartment(false);
    setDepartmentDraft(null);
  };

  const saveDepartmentInline = () => {
    if (!departmentDraft || !departmentDraft.nameAr.trim() || !departmentDraft.nameEn.trim()) return;
    if (editingDepartmentId) {
      setData((prev) => ({
        ...prev,
        departments: prev.departments.map((d) => (d.id === editingDepartmentId ? { ...departmentDraft, id: editingDepartmentId } : d)),
      }));
      setEditingDepartmentId(null);
      setDepartmentDraft(null);
      return;
    }

    const generatedId = departmentDraft.nameEn.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || uid();
    if (data.departments.some((d) => d.id === generatedId)) return;
    setData((prev) => ({
      ...prev,
      departments: [...prev.departments, { ...departmentDraft, id: generatedId }],
    }));
    setAddingDepartment(false);
    setDepartmentDraft(null);
  };

  const deleteDepartment = (id: string) => {
    if (data.members.some((m) => m.departmentId === id)) {
      alert(isAr ? "لا يمكن حذف القسم لوجود أعضاء داخله" : "Cannot delete department with members");
      return;
    }
    setData((prev) => ({ ...prev, departments: prev.departments.filter((d) => d.id !== id) }));
    if (department === id) setDepartment("all");
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/foundation-program", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyPageDetails: data }),
      });
      if (!res.ok) throw new Error("save failed");
      alert(isAr ? "تم حفظ التعديلات" : "Changes saved");
    } catch {
      alert(isAr ? "تعذر الحفظ" : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const categoryButton = (id: DeptFilter, labelAr: string, labelEn: string, count: number, Icon: React.ComponentType<{ className?: string }>) => {
    const active = department === id;
    return (
      <button onClick={() => setDepartment(id)} className={`p-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${active ? "bg-gradient-to-r from-[#254151] to-[#6096b4] text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
        <Icon className="size-5" />
        <span className="text-sm">{isAr ? `${labelAr} (${count})` : `${labelEn} (${count})`}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
      <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-16">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6"><div className="bg-white/20 backdrop-blur-sm p-5 rounded-full"><Users className="size-16" /></div></div>
            <h1 className="text-5xl font-bold mb-4">{isAr ? data.heroTitleAr : data.heroTitleEn}</h1>
            <h2 className="text-2xl font-bold mb-6 opacity-90">{isAr ? data.heroSubtitleAr : data.heroSubtitleEn}</h2>
            <p className="text-xl opacity-95 leading-relaxed">{isAr ? data.heroDescriptionAr : data.heroDescriptionEn}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {isAdmin && (
            <div className="mb-8 flex justify-end">
              <button onClick={saveAll} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-[#254151] text-white px-4 py-2 font-semibold disabled:opacity-60">
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {isAr ? "حفظ جميع التعديلات" : "Save All Changes"}
              </button>
            </div>
          )}

          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-6"><div className="bg-blue-600 text-white p-4 rounded-full"><GraduationCap className="size-8" /></div><h2 className="text-3xl font-bold text-[#254151]">{isAr ? data.overviewTitleAr : data.overviewTitleEn}</h2></div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">{isAr ? data.overviewTextAr : data.overviewTextEn}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200"><div className="flex items-center gap-3 mb-2"><Users className="size-6 text-blue-600" /><h3 className="font-bold text-[#254151]">{isAr ? "إجمالي الأعضاء" : "Total Members"}</h3></div><p className="text-3xl font-bold text-blue-700">{counts.all}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200"><div className="flex items-center gap-3 mb-2"><BookOpen className="size-6 text-blue-600" /><h3 className="font-bold text-[#254151]">{isAr ? "قسم اللغة الإنجليزية" : "English Department"}</h3></div><p className="text-3xl font-bold text-blue-700">{counts.byDepartment.english || 0}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200"><div className="flex items-center gap-3 mb-2"><Monitor className="size-6 text-blue-600" /><h3 className="font-bold text-[#254151]">{isAr ? "قسم الحاسب الآلي" : "IT Department"}</h3></div><p className="text-3xl font-bold text-blue-700">{counts.byDepartment.it || 0}</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#254151] font-bold mb-2">{isAr ? "البحث عن عضو هيئة تدريس" : "Search Faculty Member"}</label>
                  <div className="relative">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 size-5 ${isAr ? "right-3" : "left-3"}`} />
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isAr ? "ابحث بالاسم أو البريد الإلكتروني..." : "Search by name or email..."} className={`w-full py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none ${isAr ? "pr-10 pl-4" : "pl-10 pr-4"}`} />
                  </div>
                </div>
                <div>
                  <label className="block text-[#254151] font-bold mb-2">{isAr ? "تصفية حسب القسم" : "Filter by Department"}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryButton("all", "جميع الأقسام", "All Departments", counts.all, Users)}
                    {data.departments.map((d) => {
                      const Icon = ICON_OPTIONS.find((x) => x.value === d.icon)?.Icon ?? Users;
                      return categoryButton(d.id, d.nameAr, d.nameEn, counts.byDepartment[d.id] || 0, Icon);
                    })}
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#254151]">{isAr ? "إدارة الأقسام" : "Departments Management"}</h3>
                    <button onClick={startAddDepartment} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm"><Plus className="size-4" />{isAr ? "إضافة قسم" : "Add Department"}</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.departments.map((d) => (
                      <div key={d.id} className="space-y-2">
                        {editingDepartmentId === d.id && departmentDraft ? (
                          <div className={`rounded-lg border-2 ${departmentStyles[d.color]?.border ?? "border-blue-200"} ${departmentStyles[d.color]?.light ?? "bg-blue-50"} p-4 space-y-2`}>
                            <input className="w-full rounded-lg border-2 px-3 py-2" value={departmentDraft.nameAr} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, nameAr: e.target.value } : s))} placeholder={isAr ? "اسم القسم عربي" : "Department Arabic Name"} />
                            <input className="w-full rounded-lg border-2 px-3 py-2" value={departmentDraft.nameEn} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, nameEn: e.target.value } : s))} placeholder={isAr ? "اسم القسم إنجليزي" : "Department English Name"} />
                            <div className="grid grid-cols-2 gap-2">
                              <select className="rounded-lg border-2 px-3 py-2" value={departmentDraft.color} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, color: e.target.value } : s))}>{COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                              <select className="rounded-lg border-2 px-3 py-2" value={departmentDraft.icon} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, icon: e.target.value as FoundationFacultyDepartment["icon"] } : s))}>{ICON_OPTIONS.map((i) => <option key={i.value} value={i.value}>{isAr ? i.ar : i.en}</option>)}</select>
                            </div>
                            <div className="flex gap-2"><button onClick={saveDepartmentInline} className="flex-1 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm">{isAr ? "حفظ" : "Save"}</button><button onClick={cancelDepartmentInline} className="flex-1 rounded-lg bg-gray-200 px-3 py-2 text-sm">{isAr ? "إلغاء" : "Cancel"}</button></div>
                          </div>
                        ) : (
                          <>
                            <DepartmentCard department={d} isAr={isAr} />
                            <div className="flex gap-2">
                              <button onClick={() => startEditDepartment(d)} className="flex-1 rounded-lg bg-[#254151] text-white px-3 py-2 text-sm"><Pencil className="size-4 inline mr-1" />{isAr ? "تعديل" : "Edit"}</button>
                              <button onClick={() => deleteDepartment(d.id)} className="flex-1 rounded-lg bg-red-600 text-white px-3 py-2 text-sm"><Trash2 className="size-4 inline mr-1" />{isAr ? "حذف" : "Delete"}</button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    {addingDepartment && departmentDraft && (
                      <div className="rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 p-4 space-y-2">
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={departmentDraft.nameAr} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, nameAr: e.target.value } : s))} placeholder={isAr ? "اسم القسم عربي" : "Department Arabic Name"} />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={departmentDraft.nameEn} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, nameEn: e.target.value } : s))} placeholder={isAr ? "اسم القسم إنجليزي" : "Department English Name"} />
                        <div className="grid grid-cols-2 gap-2">
                          <select className="rounded-lg border-2 px-3 py-2" value={departmentDraft.color} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, color: e.target.value } : s))}>{COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                          <select className="rounded-lg border-2 px-3 py-2" value={departmentDraft.icon} onChange={(e) => setDepartmentDraft((s) => (s ? { ...s, icon: e.target.value as FoundationFacultyDepartment["icon"] } : s))}>{ICON_OPTIONS.map((i) => <option key={i.value} value={i.value}>{isAr ? i.ar : i.en}</option>)}</select>
                        </div>
                        <div className="flex gap-2"><button onClick={saveDepartmentInline} className="flex-1 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm">{isAr ? "إضافة" : "Add"}</button><button onClick={cancelDepartmentInline} className="flex-1 rounded-lg bg-gray-200 px-3 py-2 text-sm">{isAr ? "إلغاء" : "Cancel"}</button></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200"><p className="text-gray-700"><strong>{isAr ? `عرض ${filtered.length}` : `Showing ${filtered.length}`}</strong> {isAr ? "من أصل" : "of"} <strong>{counts.all}</strong> {isAr ? "عضو هيئة تدريس" : "faculty members"}</p></div>
            </div>
          </div>

          {grouped.map(({ department: dep, members }) => {
            const SectionIcon = ICON_OPTIONS.find((x) => x.value === dep.icon)?.Icon ?? Users;
            const sectionStyle = departmentStyles[dep.color] ?? departmentStyles.blue;
            if (!members.length && !(isAdmin && addingMemberDepartmentId === dep.id)) return null;
            return (
              <div key={dep.id} className="mb-12">
                <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-gray-200">
                  <div className="flex items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#254151] text-white p-4 rounded-full"><SectionIcon className="size-8" /></div>
                      <h2 className="text-3xl font-bold text-[#254151]">{isAr ? dep.nameAr : dep.nameEn}</h2>
                    </div>
                    {isAdmin && (
                      <button onClick={() => startAddMember(dep.id, dep.color)} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r ${sectionStyle.header}`}>
                        <Plus className="size-4" />{isAr ? "إضافة عضو" : "Add Member"}
                      </button>
                    )}
                  </div>
                  <div className={`grid gap-6 ${members.length > 2 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
                    {members.map((m) => {
                      const style = departmentStyles[m.cardTone] ?? departmentStyles.blue;
                      const isEditingThis = editingMemberId === m.id && memberDraft;
                      return (
                        <div key={m.id} className="space-y-2">
                          {isEditingThis ? (
                            <div className={`rounded-lg border-2 ${style.border} ${style.light} p-4 space-y-2`}>
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.nameAr} onChange={(e) => setMemberDraft((s) => (s ? { ...s, nameAr: e.target.value } : s))} placeholder={isAr ? "الاسم عربي" : "Arabic Name"} />
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.nameEn} onChange={(e) => setMemberDraft((s) => (s ? { ...s, nameEn: e.target.value } : s))} placeholder={isAr ? "الاسم إنجليزي" : "English Name"} />
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.roleAr} onChange={(e) => setMemberDraft((s) => (s ? { ...s, roleAr: e.target.value } : s))} placeholder={isAr ? "المسمى عربي" : "Role Arabic"} />
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.roleEn} onChange={(e) => setMemberDraft((s) => (s ? { ...s, roleEn: e.target.value } : s))} placeholder={isAr ? "المسمى إنجليزي" : "Role English"} />
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.email} onChange={(e) => setMemberDraft((s) => (s ? { ...s, email: e.target.value } : s))} placeholder="email@domain.com" />
                              <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.phone} onChange={(e) => setMemberDraft((s) => (s ? { ...s, phone: e.target.value } : s))} placeholder={isAr ? "رقم الهاتف" : "Phone"} />
                              <select className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.cardTone} onChange={(e) => setMemberDraft((s) => (s ? { ...s, cardTone: e.target.value } : s))}>{COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                              <div className="flex gap-2"><button onClick={saveMemberInline} className={`flex-1 rounded-lg text-white px-3 py-2 text-sm bg-gradient-to-r ${style.header}`}>{isAr ? "حفظ" : "Save"}</button><button onClick={resetMemberInline} className="flex-1 rounded-lg bg-gray-200 px-3 py-2 text-sm"><X className="size-4 inline mr-1" />{isAr ? "إلغاء" : "Cancel"}</button></div>
                            </div>
                          ) : (
                            <>
                              <FacultyCard member={m} isAr={isAr} />
                              {isAdmin && (
                                <div className="flex gap-2">
                                  <button onClick={() => startEditMember(m)} className="flex-1 rounded-lg bg-[#254151] text-white px-3 py-2 text-sm"><Pencil className="size-4 inline mr-1" />{isAr ? "تعديل" : "Edit"}</button>
                                  <button onClick={() => removeMember(m.id)} className="flex-1 rounded-lg bg-red-600 text-white px-3 py-2 text-sm"><Trash2 className="size-4 inline mr-1" />{isAr ? "حذف" : "Delete"}</button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}

                    {isAdmin && addingMemberDepartmentId === dep.id && memberDraft && (
                      <div className={`rounded-lg border-2 border-dashed ${sectionStyle.border} ${sectionStyle.light} p-4 space-y-2`}>
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.nameAr} onChange={(e) => setMemberDraft((s) => (s ? { ...s, nameAr: e.target.value } : s))} placeholder={isAr ? "الاسم عربي" : "Arabic Name"} />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.nameEn} onChange={(e) => setMemberDraft((s) => (s ? { ...s, nameEn: e.target.value } : s))} placeholder={isAr ? "الاسم إنجليزي" : "English Name"} />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.roleAr} onChange={(e) => setMemberDraft((s) => (s ? { ...s, roleAr: e.target.value } : s))} placeholder={isAr ? "المسمى عربي" : "Role Arabic"} />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.roleEn} onChange={(e) => setMemberDraft((s) => (s ? { ...s, roleEn: e.target.value } : s))} placeholder={isAr ? "المسمى إنجليزي" : "Role English"} />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.email} onChange={(e) => setMemberDraft((s) => (s ? { ...s, email: e.target.value } : s))} placeholder="email@domain.com" />
                        <input className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.phone} onChange={(e) => setMemberDraft((s) => (s ? { ...s, phone: e.target.value } : s))} placeholder={isAr ? "رقم الهاتف" : "Phone"} />
                        <select className="w-full rounded-lg border-2 px-3 py-2" value={memberDraft.cardTone} onChange={(e) => setMemberDraft((s) => (s ? { ...s, cardTone: e.target.value } : s))}>{COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                        <div className="flex gap-2"><button onClick={saveMemberInline} className={`flex-1 rounded-lg text-white px-3 py-2 text-sm bg-gradient-to-r ${sectionStyle.header}`}><Plus className="size-4 inline mr-1" />{isAr ? "إضافة" : "Add"}</button><button onClick={resetMemberInline} className="flex-1 rounded-lg bg-gray-200 px-3 py-2 text-sm">{isAr ? "إلغاء" : "Cancel"}</button></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-xl p-10 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="bg-amber-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0"><Phone className="size-8" /></div>
              <div className="flex-1">
                <h3 className="font-bold text-[#254151] text-2xl mb-3">{isAr ? data.contactTitleAr : data.contactTitleEn}</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">{isAr ? data.contactTextAr : data.contactTextEn}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-200"><h4 className="font-bold text-[#254151] mb-2">{isAr ? data.officeTitleAr : data.officeTitleEn}</h4><p className="text-gray-700">{isAr ? data.officeTextAr : data.officeTextEn}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md border-2 border-amber-200"><h4 className="font-bold text-[#254151] mb-2">{isAr ? data.quickTitleAr : data.quickTitleEn}</h4><p className="text-gray-700">{isAr ? data.quickTextAr : data.quickTextEn}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{isAr ? data.ctaTitleAr : data.ctaTitleEn}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{isAr ? data.ctaTextAr : data.ctaTextEn}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/main/foundation-program" className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"><GraduationCap className="size-6" /><span>{isAr ? "البرنامج التأسيسي" : "Foundation Program"}</span></Link>
            <Link href="/main/contact-directory" className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"><Phone className="size-6" /><span>{isAr ? "دليل التواصل" : "Contact Directory"}</span></Link>
            <Link href="/main/academic-affairs" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"><ChevronLeft className="size-6" /><span>{isAr ? "العودة للشؤون الأكاديمية" : "Back to Academic Affairs"}</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
