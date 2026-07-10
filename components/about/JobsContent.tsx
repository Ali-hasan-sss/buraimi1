"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Briefcase, Calendar, Loader2 } from "lucide-react";

type CareerFromAPI = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requirementsAr: string;
  requirementsEn: string;
  startDate: string;
  edDate: string;
};

export default function JobsContent() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState<CareerFromAPI[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/careers", { cache: "no-store" });
        const json = res.ok ? ((await res.json()) as { data?: CareerFromAPI[] }) : null;
        setCareers(Array.isArray(json?.data) ? json.data : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex items-center justify-center text-[#254151]">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
        <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
          <Briefcase className="size-8 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
            {isAr ? "الوظائف" : "Jobs"}
          </h2>
          <p className="text-gray-600 mt-1">{isAr ? "الوظائف الشاغرة" : "Open Positions"}</p>
        </div>
      </div>

      {careers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-600">
          {isAr ? "لا توجد وظائف متاحة حاليا." : "No vacancies available right now."}
        </div>
      ) : (
        <div className="space-y-6">
          {careers.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6096b4] to-[#254151] flex items-center justify-center shrink-0">
                  <Briefcase className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#254151]">
                    {isAr ? c.titleAr : c.titleEn}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#254151] text-sm">
                    <Calendar className="size-4 text-[#6096b4]" />
                    {new Date(c.startDate).toLocaleDateString(isAr ? "ar-SA" : "en-US")} -{" "}
                    {new Date(c.edDate).toLocaleDateString(isAr ? "ar-SA" : "en-US")}
                  </div>
                </div>
              </div>

              <div
                className="prose prose-zinc max-w-none prose-headings:text-[#254151] prose-a:text-[#6096b4]"
                dangerouslySetInnerHTML={{ __html: isAr ? c.descriptionAr : c.descriptionEn }}
              />

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#254151] mb-2">
                  {isAr ? "متطلبات الوظيفة" : "Job Requirements"}
                </h4>
                <div
                  className="prose prose-zinc max-w-none prose-headings:text-[#254151] prose-a:text-[#6096b4]"
                  dangerouslySetInnerHTML={{ __html: isAr ? c.requirementsAr : c.requirementsEn }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
