"use client";

import { BookOpen, ChevronLeft, FileText, Globe, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { gradCardHeaderBackgroundStyle } from "@/lib/graduate-program-gradient";
import { cn } from "@/lib/utils";

import type { GraduateProgramFormDefaults } from "./graduate-program-form-defaults";
import { useGraduateProgramFormVisual } from "./GraduateProgramFormVisualContext";

function linesToList(s: string): string[] {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Keep in sync with `components/graduateStudies/GradProgram.tsx` section titles. */
const PUBLIC_LABELS = {
  affiliation: "الارتباط الأكاديمي",
  specializations: "الخطة الدراسية للتخصصات",
  fees: "الرسوم الدراسية",
  features: "مميزات البرنامج:",
} as const;

type Props = {
  defaults: GraduateProgramFormDefaults;
  featuresArText: string;
  featuresEnText: string;
};

export default function GraduateProgramCardFormSection({
  defaults,
  featuresArText,
  featuresEnText,
}: Props) {
  const { twGradient } = useGraduateProgramFormVisual();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("dashboardGraduatePrograms.form");

  const [titleAr, setTitleAr] = useState(defaults.titleAr ?? "");
  const [titleEn, setTitleEn] = useState(defaults.titleEn ?? "");
  const [descriptionAr, setDescriptionAr] = useState(defaults.descriptionAr ?? "");
  const [descriptionEn, setDescriptionEn] = useState(defaults.descriptionEn ?? "");
  const [affiliationAr, setAffiliationAr] = useState(defaults.affiliationAr ?? "");
  const [affiliationEn, setAffiliationEn] = useState(defaults.affiliationEn ?? "");
  const [specializationsAr, setSpecializationsAr] = useState(
    defaults.specializationsAr ?? "",
  );
  const [specializationsEn, setSpecializationsEn] = useState(
    defaults.specializationsEn ?? "",
  );
  const [feesAr, setFeesAr] = useState(defaults.feesAr ?? "");
  const [feesEn, setFeesEn] = useState(defaults.feesEn ?? "");
  const [creditsAr, setCreditsAr] = useState(defaults.creditsAr ?? "");
  const [creditsEn, setCreditsEn] = useState(defaults.creditsEn ?? "");
  const [totalFeesAr, setTotalFeesAr] = useState(defaults.totalFeesAr ?? "");
  const [totalFeesEn, setTotalFeesEn] = useState(defaults.totalFeesEn ?? "");
  const [featuresAr, setFeaturesAr] = useState(featuresArText);
  const [featuresEn, setFeaturesEn] = useState(featuresEnText);
  const [order, setOrder] = useState(String(defaults.order ?? 0));

  const headerStyle = useMemo(
    () => gradCardHeaderBackgroundStyle(twGradient),
    [twGradient],
  );

  const descriptionDisplay = isRtl ? descriptionAr : descriptionEn;
  const affiliationDisplay = isRtl ? affiliationAr : affiliationEn;
  const specializationsDisplay = isRtl ? specializationsAr : specializationsEn;
  const feesDisplay = isRtl ? feesAr : feesEn;
  const creditsDisplay = isRtl ? creditsAr : creditsEn;
  const totalFeesDisplay = isRtl ? totalFeesAr : totalFeesEn;
  const featureLines = linesToList(isRtl ? featuresAr : featuresEn);

  return (
    <div
      className="rounded-lg border-2 border-gray-100 bg-white shadow-lg overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <p className="border-b border-amber-200/80 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900">
        {t("listCardEditorHint")}
      </p>

      {/* Program header — matches GradProgram (titleAr main, titleEn subtitle) */}
      <div className="p-5 text-white sm:p-6 lg:p-8" style={headerStyle}>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wide text-white/70">
              {t("titleAr")}
            </label>
            <Input
              id="titleAr"
              name="titleAr"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              required
              className="border-white/35 bg-white/10 text-base font-bold text-white placeholder:text-white/45 focus-visible:border-white/60 focus-visible:ring-white/25 md:text-lg"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium uppercase tracking-wide text-white/70">
              {t("titleEn")}
            </label>
            <Input
              id="titleEn"
              name="titleEn"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
              className="border-white/35 bg-white/10 text-sm text-white/95 placeholder:text-white/45 focus-visible:border-white/60 focus-visible:ring-white/25 md:text-base"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="descriptionAr">
              {t("descriptionAr")}
            </label>
            <Textarea
              id="descriptionAr"
              name="descriptionAr"
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              rows={4}
              required
              className="text-gray-800"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="descriptionEn">
              {t("descriptionEn")}
            </label>
            <Textarea
              id="descriptionEn"
              name="descriptionEn"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={4}
              required
              className="text-gray-800"
            />
          </div>
        </div>

        <p className="rounded-md border border-dashed border-muted-foreground/25 bg-muted/20 px-3 py-2 text-sm leading-relaxed text-gray-700">
          {descriptionDisplay || (
            <span className="text-muted-foreground">{t("previewEmptyParagraph")}</span>
          )}
        </p>

        {/* Affiliation — same chrome as public card */}
        <div className="rounded-lg border-r-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <div className="mb-3 flex items-start gap-3">
            <Globe className="mt-1 size-5 shrink-0 text-blue-600 sm:size-6" />
            <h4 className="text-base font-bold text-[#254151] sm:text-lg">
              {PUBLIC_LABELS.affiliation}
            </h4>
          </div>
          {affiliationDisplay ? (
            <p className="mb-4 text-sm font-semibold leading-relaxed text-gray-700 sm:text-base">
              {affiliationDisplay}
            </p>
          ) : (
            <p className="mb-4 text-sm text-muted-foreground">{t("previewHiddenAffiliation")}</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-blue-900/80" htmlFor="affiliationAr">
                {t("affiliationAr")}
              </label>
              <Input
                id="affiliationAr"
                name="affiliationAr"
                value={affiliationAr}
                onChange={(e) => setAffiliationAr(e.target.value)}
                className="border-blue-200 bg-white/80"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-blue-900/80" htmlFor="affiliationEn">
                {t("affiliationEn")}
              </label>
              <Input
                id="affiliationEn"
                name="affiliationEn"
                value={affiliationEn}
                onChange={(e) => setAffiliationEn(e.target.value)}
                className="border-blue-200 bg-white/80"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#254151] sm:text-base">
              <BookOpen className="size-4 text-purple-600 sm:size-5" />
              {PUBLIC_LABELS.specializations}
            </h4>
            <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
              {specializationsDisplay || (
                <span className="text-muted-foreground">{t("previewEmptyField")}</span>
              )}
            </p>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-purple-900/80" htmlFor="specializationsAr">
                  {t("specializationsAr")}
                </label>
                <Textarea
                  id="specializationsAr"
                  name="specializationsAr"
                  value={specializationsAr}
                  onChange={(e) => setSpecializationsAr(e.target.value)}
                  rows={3}
                  className="border-purple-200 bg-white/90 text-sm text-gray-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-purple-900/80" htmlFor="specializationsEn">
                  {t("specializationsEn")}
                </label>
                <Textarea
                  id="specializationsEn"
                  name="specializationsEn"
                  value={specializationsEn}
                  onChange={(e) => setSpecializationsEn(e.target.value)}
                  rows={3}
                  className="border-purple-200 bg-white/90 text-sm text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#254151] sm:text-base">
              <FileText className="size-4 text-green-600 sm:size-5" />
              {PUBLIC_LABELS.fees}
            </h4>
            <div className="mb-3 space-y-2 text-sm sm:text-base">
              {feesDisplay ? (
                <p className="text-gray-700">{feesDisplay}</p>
              ) : null}
              {creditsDisplay ? (
                <p className="text-xs text-gray-600 sm:text-sm">{creditsDisplay}</p>
              ) : null}
              {totalFeesDisplay ? (
                <p className="font-bold text-green-700">{totalFeesDisplay}</p>
              ) : null}
              {!feesDisplay && !creditsDisplay && !totalFeesDisplay ? (
                <p className="text-muted-foreground">{t("previewEmptyFeesBlock")}</p>
              ) : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="feesAr">
                  {t("feesAr")}
                </label>
                <Input
                  id="feesAr"
                  name="feesAr"
                  value={feesAr}
                  onChange={(e) => setFeesAr(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="feesEn">
                  {t("feesEn")}
                </label>
                <Input
                  id="feesEn"
                  name="feesEn"
                  value={feesEn}
                  onChange={(e) => setFeesEn(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="creditsAr">
                  {t("creditsAr")}
                </label>
                <Input
                  id="creditsAr"
                  name="creditsAr"
                  value={creditsAr}
                  onChange={(e) => setCreditsAr(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="creditsEn">
                  {t("creditsEn")}
                </label>
                <Input
                  id="creditsEn"
                  name="creditsEn"
                  value={creditsEn}
                  onChange={(e) => setCreditsEn(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="totalFeesAr">
                  {t("totalFeesAr")}
                </label>
                <Input
                  id="totalFeesAr"
                  name="totalFeesAr"
                  value={totalFeesAr}
                  onChange={(e) => setTotalFeesAr(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-green-900/80" htmlFor="totalFeesEn">
                  {t("totalFeesEn")}
                </label>
                <Input
                  id="totalFeesEn"
                  name="totalFeesEn"
                  value={totalFeesEn}
                  onChange={(e) => setTotalFeesEn(e.target.value)}
                  className="border-green-200 bg-white/90"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-base font-bold text-[#254151] sm:mb-4 sm:text-lg">
            {PUBLIC_LABELS.features}
          </h4>
          <div className="mb-4 grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2">
            {featureLines.length ? (
              featureLines.map((feature, idx) => (
                <div
                  key={`${idx}-${feature.slice(0, 24)}`}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <div
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full bg-[#6096b4] text-white sm:size-6",
                    )}
                  >
                    <span className="text-[10px] sm:text-xs">✓</span>
                  </div>
                  <span className="text-sm font-semibold leading-relaxed text-gray-700 sm:text-base">
                    {feature}
                  </span>
                </div>
              ))
            ) : (
              <p className="col-span-full text-sm text-muted-foreground">{t("previewNoFeatures")}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="featuresAr">
                {t("featuresAr")}
              </label>
              <Textarea
                id="featuresAr"
                name="featuresAr"
                value={featuresAr}
                onChange={(e) => setFeaturesAr(e.target.value)}
                rows={6}
                placeholder={t("featuresLineHint")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="featuresEn">
                {t("featuresEn")}
              </label>
              <Textarea
                id="featuresEn"
                name="featuresEn"
                value={featuresEn}
                onChange={(e) => setFeaturesEn(e.target.value)}
                rows={6}
                placeholder={t("featuresLineHint")}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-2 border-gray-100 pt-4">
          <label className="text-sm font-medium" htmlFor="order">
            {t("sortOrder")}
          </label>
          <Input
            id="order"
            name="order"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="max-w-[12rem]"
          />
        </div>

        <div className="pointer-events-none flex select-none flex-col gap-3 border-t-2 border-gray-100 pt-4 opacity-90 sm:flex-row sm:flex-wrap sm:gap-4">
          <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6096b4] to-[#254151] px-6 py-3 text-base font-bold text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
            <span>{t("previewReadMoreFake")}</span>
            <ChevronLeft className="size-5 sm:size-6" />
          </span>
          <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#6096b4] bg-white px-6 py-3 text-base font-bold text-[#6096b4] sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
            <Phone className="size-5 sm:size-6" />
            <span>{t("previewContactFake")}</span>
          </span>
        </div>
        <p className="text-center text-[11px] text-muted-foreground">{t("previewActionsNote")}</p>
        <p className="text-center text-xs">
          <a
            href="/main/graduate-studies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            {t("openPublicListPage")}
          </a>
        </p>
      </div>
    </div>
  );
}
