"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Pencil } from "lucide-react";

export default function AdminCareersDashboardButton() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; isAdmin?: boolean };
        setIsAdmin(Boolean(json?.ok && json?.isAdmin));
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/dashboard/careers"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 text-white font-medium"
    >
      <Pencil className="size-4" />
      {isAr ? "تعديل الوظائف" : "Edit Careers"}
    </Link>
  );
}
