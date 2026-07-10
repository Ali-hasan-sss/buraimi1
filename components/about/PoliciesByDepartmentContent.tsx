"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useLocale } from "next-intl";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type PolicyItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  file: string;
  order: number;
};

type Department = {
  id: string;
  titleAr: string;
  titleEn: string;
  order: number;
  policies: PolicyItem[];
};

type PoliciesData = {
  sectionTitleAr: string;
  sectionTitleEn: string;
  sectionSubtitleAr: string;
  sectionSubtitleEn: string;
  departments: Department[];
};

const DEPT_STYLE: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  "quality-dept": { color: "from-blue-600 to-cyan-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  academic: { color: "from-[#254151] to-[#6096b4]", bgColor: "bg-slate-50", borderColor: "border-slate-200" },
  research: { color: "from-emerald-600 to-teal-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  admission: { color: "from-violet-600 to-purple-600", bgColor: "bg-violet-50", borderColor: "border-violet-200" },
  "student-affairs": { color: "from-orange-600 to-amber-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  "network-it": { color: "from-indigo-600 to-blue-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
  library: { color: "from-pink-600 to-rose-600", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
  hr: { color: "from-red-600 to-pink-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  admin: { color: "from-gray-600 to-slate-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
  pr: { color: "from-cyan-600 to-blue-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  clinic: { color: "from-[#6096b4] to-[#254151]", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
};

const FALLBACK_STYLE = { color: "from-[#254151] to-[#6096b4]", bgColor: "bg-slate-50", borderColor: "border-slate-200" };

export default function PoliciesByDepartmentContent() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [data, setData] = useState<PoliciesData | null>(null);
  const [draft, setDraft] = useState<PoliciesData | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [authRes, dataRes] = await Promise.all([
          fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" }),
          fetch("/api/policies-by-department", { cache: "no-store" }),
        ]);
        if (authRes.ok) {
          const me = (await authRes.json()) as { ok?: boolean; isAdmin?: boolean };
          setIsAdmin(Boolean(me?.ok && me?.isAdmin));
        }
        if (dataRes.ok) {
          const json = (await dataRes.json()) as { data?: PoliciesData };
          if (json.data) {
            const sortedDepartments = [...json.data.departments].sort((a, b) => a.order - b.order);
            const normalized = {
              ...json.data,
              departments: sortedDepartments.map((dept) => ({
                ...dept,
                policies: [...dept.policies].sort((a, b) => a.order - b.order),
              })),
            };
            setData(normalized);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const departments = useMemo(() => data?.departments ?? [], [data]);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const startEdit = () => {
    if (!data) return;
    setDraft(JSON.parse(JSON.stringify(data)) as PoliciesData);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const updateDeptPolicy = (deptId: string, policyId: string, key: keyof PolicyItem, value: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        departments: prev.departments.map((dept) =>
          dept.id !== deptId
            ? dept
            : {
                ...dept,
                policies: dept.policies.map((policy) =>
                  policy.id === policyId ? { ...policy, [key]: value } : policy,
                ),
              },
        ),
      };
    });
  };

  const addPolicy = (deptId: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        departments: prev.departments.map((dept) => {
          if (dept.id !== deptId) return dept;
          const nextOrder = dept.policies.length;
          return {
            ...dept,
            policies: [
              ...dept.policies,
              {
                id: `policy-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                titleAr: "",
                titleEn: "",
                file: "#",
                order: nextOrder,
              },
            ],
          };
        }),
      };
    });
  };

  const deletePolicy = (deptId: string, policyId: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        departments: prev.departments.map((dept) => {
          if (dept.id !== deptId) return dept;
          const policies = dept.policies.filter((p) => p.id !== policyId).map((p, i) => ({ ...p, order: i }));
          return { ...dept, policies };
        }),
      };
    });
  };

  const uploadPolicyFile = async (deptId: string, policyId: string, file: File) => {
    try {
      setUploadingId(`${deptId}:${policyId}`);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      if (!res.ok) return;
      const json = (await res.json()) as { path?: string; filePath?: string; relativePath?: string; url?: string };
      const uploadedPath = json.relativePath || json.path || json.filePath || json.url;
      if (!uploadedPath) return;
      updateDeptPolicy(deptId, policyId, "file", uploadedPath);
    } finally {
      setUploadingId(null);
    }
  };

  const saveEdit = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch("/api/policies-by-department", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) return;
      const json = (await res.json()) as { data?: PoliciesData };
      if (json.data) {
        setData(json.data);
        setIsEditing(false);
        setDraft(null);
      }
    } finally {
      setSaving(false);
    }
  };

    if (loading) {
      return (
        <div className="py-16 flex items-center justify-center text-[#254151]">
          <Loader2 className="size-6 animate-spin" />
        </div>
      );
    }

    if (!data) return null;

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <BookOpen className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        {isAr ? data.sectionTitleAr : data.sectionTitleEn}
                    </h2>
                    <p className="text-gray-600 mt-1">{isAr ? data.sectionSubtitleAr : data.sectionSubtitleEn}</p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button onClick={startEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#254151] text-white hover:opacity-95">
                      <Pencil className="size-4" />
                      {isAr ? "تعديل القسم" : "Edit Section"}
                    </button>
                  ) : (
                    <>
                      <button onClick={cancelEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700">
                        <X className="size-4" />
                        {isAr ? "إلغاء" : "Cancel"}
                      </button>
                      <button disabled={saving} onClick={saveEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#254151] text-white disabled:opacity-60">
                        {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                        {isAr ? "حفظ" : "Save"}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Departments Accordion */}
            <div className="space-y-4">
                {(isEditing ? draft?.departments ?? [] : departments).map((dept, idx) => {
                    const style = DEPT_STYLE[dept.id] ?? FALLBACK_STYLE;
                    return (
                    <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * idx }}
                        className="overflow-hidden"
                    >
                        {/* Department Header */}
                        <button
                            onClick={() => toggleSection(dept.id)}
                            className={`w-full ${style.bgColor} ${style.borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <FileText className="size-6 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-bold text-xl text-[#254151]">{isAr ? dept.titleAr : dept.titleEn}</h3>
                                        <p className="text-sm text-gray-600">{isAr ? dept.titleEn : dept.titleAr}</p>
                                        <span className="text-xs text-gray-500 mt-1 inline-block">
                                            {dept.policies.length} {dept.policies.length === 1 ? 'سياسة' : 'سياسات'}
                                        </span>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: openSection === dept.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className={`size-6 text-gray-600`} />
                                </motion.div>
                            </div>
                        </button>

                        {/* Policies List */}
                        <AnimatePresence>
                            {openSection === dept.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className={`${style.bgColor} ${style.borderColor} border-2 border-t-0 rounded-b-2xl p-6 space-y-3`}>
                                        {dept.policies.map((policy, policyIdx) => (
                                            <motion.div
                                                key={policy.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * policyIdx }}
                                                className="group/policy bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-lg flex items-center justify-center shrink-0`}>
                                                        <FileText className="size-5 text-white" />
                                                    </div>
                                                    {!isEditing ? (
                                                      <a
                                                        href={resolveUploadImageSrc(policy.file)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-800 font-medium inline-flex items-center gap-2"
                                                      >
                                                        <span>{isAr ? policy.titleAr : policy.titleEn}</span>
                                                        <ExternalLink className="size-4 text-gray-500" />
                                                      </a>
                                                    ) : (
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                                                        <input
                                                          value={policy.titleAr}
                                                          onChange={(e) => updateDeptPolicy(dept.id, policy.id, "titleAr", e.target.value)}
                                                          placeholder="عنوان السياسة (AR)"
                                                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                                        />
                                                        <input
                                                          value={policy.titleEn}
                                                          onChange={(e) => updateDeptPolicy(dept.id, policy.id, "titleEn", e.target.value)}
                                                          placeholder="Policy title (EN)"
                                                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                                        />
                                                      </div>
                                                    )}
                                                </div>
                                                {isEditing && (
                                                  <div className="flex items-center gap-2 shrink-0">
                                                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#254151] text-white text-xs cursor-pointer">
                                                      {uploadingId === `${dept.id}:${policy.id}` ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
                                                      {isAr ? "رفع ملف" : "Upload"}
                                                      <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                                                        onChange={(e) => {
                                                          const file = e.target.files?.[0];
                                                          if (file) void uploadPolicyFile(dept.id, policy.id, file);
                                                          e.currentTarget.value = "";
                                                        }}
                                                      />
                                                    </label>
                                                    <button
                                                      onClick={() => deletePolicy(dept.id, policy.id)}
                                                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-200 text-red-600"
                                                    >
                                                      <Trash2 className="size-4" />
                                                    </button>
                                                  </div>
                                                )}
                                                </div>
                                                {isEditing && policy.file && policy.file !== "#" && (
                                                  <a
                                                    href={resolveUploadImageSrc(policy.file)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 text-xs text-[#254151] underline inline-flex items-center gap-1"
                                                  >
                                                    <ExternalLink className="size-3" />
                                                    {isAr ? "معاينة الملف الحالي" : "Preview current file"}
                                                  </a>
                                                )}
                                            </motion.div>
                                        ))}
                                        {isEditing && (
                                          <button
                                            onClick={() => addPolicy(dept.id)}
                                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[#254151] text-[#254151] text-sm"
                                          >
                                            <Plus className="size-4" />
                                            {isAr ? "إضافة سياسة" : "Add Policy"}
                                          </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )})}
            </div>
        </div>
    );
}