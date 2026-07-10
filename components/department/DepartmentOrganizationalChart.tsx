"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, X, Loader2, Network } from "lucide-react";
import { useLocale } from "next-intl";
import type { OrgChartNode, OrgChartConnection } from "@/types/orgChart";
import { DEFAULT_ORG_CHART_NODES, DEFAULT_ORG_CHART_CONNECTIONS } from "@/types/orgChart";
import OrganizationalChartEditor from "@/components/about/OrganizationalChartEditor";
import OrganizationalChartViewer from "@/components/about/OrganizationalChartViewer";

interface DepartmentOrganizationalChartProps {
  departmentDomain: string;
  isAdmin: boolean;
}

interface OrgChartData {
  enabled: boolean;
  titleAr: string;
  titleEn: string;
  nodes: OrgChartNode[];
  connections: OrgChartConnection[];
}

export default function DepartmentOrganizationalChart({
  departmentDomain,
  isAdmin,
}: DepartmentOrganizationalChartProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OrgChartData | null>(null);
  const [draft, setDraft] = useState<OrgChartData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/departments/${departmentDomain}/org-chart`, {
          method: "GET",
          cache: "no-store",
        });
        const json = (await res.json()) as { ok: boolean; data?: OrgChartData };
        if (json.ok && json.data) {
          setData(json.data);
        }
      } catch {
        // Silently fail
      }
    };
    load();
  }, [departmentDomain]);

  const view = isEditing ? draft : data;

  const startEdit = () => {
    if (!data) return;
    setDraft({ ...data });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(null);
  };

  const updateDraft = (patch: Partial<OrgChartData>) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const saveEdit = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/departments/${departmentDomain}/org-chart`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = (await res.json()) as { ok: boolean; data?: OrgChartData };
      if (res.ok && json.ok && json.data) {
        setData(json.data);
        setDraft(null);
        setIsEditing(false);
      }
    } finally {
      setSaving(false);
    }
  };

  // If chart is disabled and not editing, don't show anything (unless admin)
  if (!view?.enabled && !isEditing && !isAdmin) {
    return null;
  }

  // If no data yet, show loading or nothing
  if (!view) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-l from-[#254151]/5 to-[#6096b4]/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-4xl font-black text-[#254151]">
              {isAr ? view.titleAr : view.titleEn}
            </h2>
            {isAdmin && (
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={startEdit}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-[#1a2f3a] transition-colors"
                  >
                    <Pencil className="size-4" />
                    {isAr ? "تعديل" : "Edit"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={saveEdit}
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-60 hover:bg-green-700 transition-colors"
                    >
                      {saving ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Save className="size-4" />
                      )}
                      {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "حفظ" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors"
                    >
                      <X className="size-4" />
                      {isAr ? "إلغاء" : "Cancel"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chart Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
            <div className="flex items-center justify-center gap-3">
              <Network className="w-8 h-8 text-white" />
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                    value={draft?.titleAr || ""}
                    onChange={(e) => updateDraft({ titleAr: e.target.value })}
                    dir="rtl"
                    placeholder="العنوان بالعربية"
                  />
                  <input
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                    value={draft?.titleEn || ""}
                    onChange={(e) => updateDraft({ titleEn: e.target.value })}
                    dir="ltr"
                    placeholder="Title in English"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft?.enabled || false}
                      onChange={(e) => updateDraft({ enabled: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">
                      {isAr ? "تفعيل المخطط التنظيمي" : "Enable Organizational Chart"}
                    </span>
                  </label>
                </div>
                {draft?.enabled && (
                  <OrganizationalChartEditor
                    nodes={draft?.nodes || DEFAULT_ORG_CHART_NODES}
                    connections={draft?.connections || DEFAULT_ORG_CHART_CONNECTIONS}
                    onChange={(nodes, connections) => {
                      updateDraft({ nodes, connections });
                    }}
                    isAr={isAr}
                  />
                )}
              </>
            ) : (
              view.enabled && (
                <OrganizationalChartViewer
                  nodes={data?.nodes || DEFAULT_ORG_CHART_NODES}
                  connections={data?.connections || DEFAULT_ORG_CHART_CONNECTIONS}
                  isAr={isAr}
                />
              )
            )}

            {isEditing && !draft?.enabled && (
              <div className="text-center py-12 text-gray-500">
                {isAr
                  ? "المخطط التنظيمي معطل. قم بتفعيله لبدء التحرير."
                  : "Organizational chart is disabled. Enable it to start editing."}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
