"use client";

import Link from "next/link";
import LangSwitcher from "../toggleLang";

import type { SiteHeaderContact } from "@/lib/site-contact-settings-defaults";
import { MOODLE_URL } from "@/lib/external-links";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export default function TopNavbar({ contact }: { contact: SiteHeaderContact }) {
  const t = useTranslations("navbar");
  return (
    <div className=" z-50 bg-primary text-white sticky top-0 w-full h-[50px] max-h-[50px]">
      <div className="mx-auto flex max-w-7xl gap-2 px-4 py-2 flex-row items-center justify-between">
        <div className="flex  gap-2 flex-row md:items-center">
          <LangSwitcher />

          <nav className="-mx-1 hidden sm:flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm md:overflow-visible">
            <div className="flex items-center divide-x divide-white/25">
              <a
                className="px-3 py-1 hover:text-(--link-hover)"
                href={MOODLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("model")}
              </a>
              <Link
                className="px-3 py-1 hover:text-(--link-hover)"
                href={"/main/student-portal"}
              >
                {t("student_gateway")}
              </Link>
              <Link
                className="px-3 py-1 hover:text-(--link-hover)"
                href={"/main/academic-calendar"}
              >
                {t("aca_cal")}
              </Link>
            </div>
            <Link
              href="/main/admission"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-gradient-to-br from-[#e8d9bb] via-[#c9ac72] to-[#a68950] px-3 py-1 text-sm font-semibold text-[#1E3540] shadow-sm transition hover:from-[#f0e5cf] hover:via-[#d4bc85] hover:to-[#b8965c] hover:shadow-md"
            >
              <span>{t("apply_now")}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
          </nav>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm">
          <a
            className="inline-flex min-w-0 max-w-[min(100%,12rem)] items-center gap-2 rounded-md px-2 py-1 hover:text-(--link-hover) md:max-w-none"
            href={contact.mailto}
          >
            <Mail className="h-4 w-4 shrink-0 opacity-90" />
            <span className="hidden max-w-[10rem] truncate md:inline">{contact.email}</span>
            <span className="sr-only md:hidden">{contact.email}</span>
            <span className="md:hidden" aria-hidden>
              Email
            </span>
          </a>

          {contact.phones.map((p, i) => (
            <a
              key={`${p.href}-${i}`}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:text-(--link-hover)"
              href={p.href}
              title={p.display}
              aria-label={p.display}
            >
              <Phone className="h-4 w-4 shrink-0 opacity-90" />
              <span className="hidden whitespace-nowrap md:inline" dir="ltr">
                {p.display}
              </span>
              <span className="sr-only md:hidden">{p.display}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
