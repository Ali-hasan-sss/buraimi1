"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ImageUp,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SideActionPanel } from "@/components/main/SideActionPanel";
import type { SideActionPanelContact } from "@/lib/site-contact-settings-defaults";
import { HeroSkeleton } from "@/components/main/HeroSkeleton";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import BilingualTextEditDialog from "@/components/admin/BilingualTextEditDialog";
import ButtonEditDialog from "@/components/admin/ButtonEditDialog";
import LinkEditDialog from "@/components/admin/LinkEditDialog";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type HeroSlide = {
  image: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  ctaLink: string;
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

/** مسار داخلي بدون شرطة أو روابط كاملة كما هي */
function normalizeInternalPath(href: string): string {
  const t = href.trim();
  if (!t) return "/";
  if (t.startsWith("/") || /^https?:\/\//i.test(t)) return t;
  return `/${t}`;
}

type HeroAnnouncement = {
  image: string;
  titleAr: string;
  titleEn: string;
  dateTextAr: string;
  dateTextEn: string;
  /** رابط عند النقر على بطاقة الإعلان */
  link: string;
};

type HeroData = {
  slides: HeroSlide[];
  /** `null` = لا يُعرض الإعلان */
  announcement: HeroAnnouncement | null;
  autoplayMs: number;
};

const DEFAULT_ANNOUNCEMENT: HeroAnnouncement = {
  image: "/assets/studentCampusImage.webp",
  titleAr: "قدّم الآن! برنامج الدراسات العليا",
  titleEn: "Apply now! Graduate Studies Program",
  dateTextAr: "4 فبراير 2026",
  dateTextEn: "February 4, 2026",
  link: "",
};

type AnnouncementCardBodyProps = {
  display: { annTitle: string; annDate: string };
  viewData: HeroData;
  isAdmin: boolean;
  isEditing: boolean;
  annImageUploading: boolean;
  announcementFileInputRef: RefObject<HTMLInputElement | null>;
  onAnnouncementImageFile: (file: File) => void | Promise<void>;
  updateAnnouncement: (
    updater: (ann: HeroAnnouncement) => HeroAnnouncement,
  ) => void;
};

function AnnouncementCardBody({
  display,
  viewData,
  isAdmin,
  isEditing,
  annImageUploading,
  announcementFileInputRef,
  onAnnouncementImageFile,
  updateAnnouncement,
}: AnnouncementCardBodyProps) {
  const t = useTranslations("heroAdmin");
  const ann = viewData.announcement;
  if (!ann) return null;
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <div className="group relative h-24 w-24 overflow-hidden rounded-xl">
          <Image
            src={resolveUploadImageSrc(ann.image)}
            alt="announcement"
            fill
            className="object-cover"
            sizes="96px"
          />
          {isAdmin && isEditing && (
            <>
              <input
                ref={announcementFileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onAnnouncementImageFile(f);
                  e.target.value = "";
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                <button
                  type="button"
                  aria-label={t("uploadAnnouncementImage")}
                  title={t("uploadAnnouncementImage")}
                  disabled={annImageUploading}
                  className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#254151] shadow-md transition hover:scale-105 hover:bg-white disabled:opacity-60"
                  onClick={() => announcementFileInputRef.current?.click()}
                >
                  {annImageUploading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <ImageUp className="size-5" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start gap-2">
          <h3 className="mb-1 text-lg font-bold leading-snug text-[#254151]">
            {display.annTitle}
          </h3>
          {isAdmin && isEditing && (
            <>
              <BilingualTextEditDialog
                label="تعديل عنوان بطاقة الإعلان"
                valueAr={ann.titleAr}
                valueEn={ann.titleEn}
                onSave={({ ar, en }) =>
                  updateAnnouncement((a) => ({
                    ...a,
                    titleAr: ar,
                    titleEn: en,
                  }))
                }
              />
              <LinkEditDialog
                label="رابط بطاقة الإعلان"
                value={ann.link ?? ""}
                onSave={(link) => updateAnnouncement((a) => ({ ...a, link }))}
              />
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-gray-500">{display.annDate}</p>
          {isAdmin && isEditing && (
            <BilingualTextEditDialog
              label={t("editAnnouncementDate")}
              valueAr={ann.dateTextAr}
              valueEn={ann.dateTextEn}
              onSave={({ ar, en }) =>
                updateAnnouncement((a) => ({
                  ...a,
                  dateTextAr: ar,
                  dateTextEn: en,
                }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero({
  sidePanelContact,
}: {
  sidePanelContact: SideActionPanelContact;
}) {
  const t = useTranslations("heroAdmin");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [draft, setDraft] = useState<HeroData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  /** مسارات blob + ملفات مرتبطة لرفعها عند حفظ الهيرو */
  const [slideImageFiles, setSlideImageFiles] = useState<Record<number, File>>(
    {},
  );
  const slideFileInputRef = useRef<HTMLInputElement>(null);
  const announcementFileInputRef = useRef<HTMLInputElement>(null);
  const [annImageUploading, setAnnImageUploading] = useState(false);

  const viewData = isEditing && draft ? draft : heroData;
  const slides = viewData?.slides || [];
  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    async function loadData() {
      try {
        const [heroRes, meRes] = await Promise.all([
          fetch("/api/home-hero", { method: "GET", cache: "no-store" }),
          fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
        ]);
        const heroJson = (await heroRes.json()) as {
          ok: boolean;
          data?: HeroData;
        };
        const meJson = (await meRes.json()) as {
          ok: boolean;
          isAdmin?: boolean;
        };
        if (heroJson.ok && heroJson.data) setHeroData(heroJson.data);
        setIsAdmin(Boolean(meJson?.ok && meJson?.isAdmin));
      } catch {
        setIsAdmin(false);
      }
    }
    void loadData();
  }, []);

  useEffect(() => {
    if (!slides.length || isEditing) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, viewData?.autoplayMs || 4000);
    return () => clearInterval(timer);
  }, [slides.length, viewData?.autoplayMs, isEditing]);

  const display = useMemo(() => {
    if (!currentSlideData) return null;
    const ann = viewData?.announcement;
    return {
      title: isAr ? currentSlideData.titleAr : currentSlideData.titleEn,
      subtitle: isAr
        ? currentSlideData.subtitleAr
        : currentSlideData.subtitleEn,
      ctaText: isAr ? currentSlideData.ctaTextAr : currentSlideData.ctaTextEn,
      annTitle: ann ? (isAr ? ann.titleAr : ann.titleEn) : "",
      annDate: ann ? (isAr ? ann.dateTextAr : ann.dateTextEn) : "",
    };
  }, [currentSlideData, isAr, viewData?.announcement]);

  /** يُعرض زر الـ CTA للزوار فقط إذا وُجد نص بلغة الواجهة ورابط غير فارغ */
  const showSlideCta = useMemo(() => {
    if (!currentSlideData) return false;
    const link = currentSlideData.ctaLink?.trim() ?? "";
    const text =
      (isAr
        ? currentSlideData.ctaTextAr
        : currentSlideData.ctaTextEn
      )?.trim() ?? "";
    return Boolean(link && text);
  }, [currentSlideData, isAr]);

  /** بطاقة الإعلان قابلة للنقر عند وجود رابط؛ أثناء تعديل الأدمن لا نلفّها برابط حتى لا يتعارض مع أدوات التحرير */
  const announcementLinkHref = viewData?.announcement?.link?.trim() ?? "";
  const wrapAnnouncementAsLink =
    Boolean(announcementLinkHref) && !(isAdmin && isEditing);

  const revokeDraftSlideBlobs = (data: HeroData) => {
    for (const slide of data.slides) {
      if (slide.image.startsWith("blob:")) URL.revokeObjectURL(slide.image);
    }
  };

  const handleSlideBackgroundFile = (file: File) => {
    if (!draft) return;
    const idx = currentSlide;
    const next = structuredClone(draft) as HeroData;
    const prevImg = next.slides[idx]?.image;
    if (prevImg?.startsWith("blob:")) URL.revokeObjectURL(prevImg);
    const url = URL.createObjectURL(file);
    next.slides[idx] = { ...next.slides[idx], image: url };
    setDraft(next);
    setSlideImageFiles((prev) => ({ ...prev, [idx]: file }));
  };

  const saveChanges = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const payload = structuredClone(draft) as HeroData;
      for (let i = 0; i < payload.slides.length; i++) {
        if (!payload.slides[i].image.startsWith("blob:")) continue;
        const file = slideImageFiles[i];
        if (!file) {
          throw new Error(t("errorPreviewIncomplete"));
        }
        const formData = new FormData();
        formData.append("file", file);
        const upRes = await fetch("/api/uploads", {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const upJson = (await upRes.json()) as {
          ok: boolean;
          relativePath?: string;
          message?: string;
        };
        if (!upRes.ok || !upJson.ok || !upJson.relativePath) {
          throw new Error(upJson.message || t("errorUploadFailed"));
        }
        payload.slides[i].image = upJson.relativePath;
      }

      const res = await fetch("/api/home-hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; data?: HeroData };
      if (json.ok && json.data) {
        revokeDraftSlideBlobs(draft);
        setSlideImageFiles({});
        setHeroData(json.data);
        setIsEditing(false);
        setDraft(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const updateCurrentSlide = (updater: (slide: HeroSlide) => HeroSlide) => {
    if (!draft) return;
    const next = structuredClone(draft) as HeroData;
    next.slides[currentSlide] = updater(next.slides[currentSlide]);
    setDraft(next);
  };

  const updateAnnouncement = (
    updater: (ann: HeroAnnouncement) => HeroAnnouncement,
  ) => {
    if (!draft?.announcement) return;
    const next = structuredClone(draft) as HeroData;
    const ann = next.announcement;
    if (!ann) return;
    next.announcement = updater(ann);
    setDraft(next);
  };

  const handleAddAnnouncement = () => {
    if (!heroData) return;
    const base = isEditing && draft ? draft : heroData;
    const next = structuredClone(base) as HeroData;
    next.announcement = { ...DEFAULT_ANNOUNCEMENT };
    setDraft(next);
    if (!isEditing) {
      setSlideImageFiles({});
      setIsEditing(true);
    }
  };

  const handleRemoveAnnouncement = () => {
    if (!draft) return;
    setDraft({ ...draft, announcement: null });
  };

  const handleAnnouncementImageFile = async (file: File) => {
    setAnnImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const upRes = await fetch("/api/uploads", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const upJson = (await upRes.json()) as {
        ok: boolean;
        relativePath?: string;
        message?: string;
      };
      if (!upRes.ok || !upJson.ok || !upJson.relativePath) {
        throw new Error(upJson.message || t("errorUploadFailed"));
      }
      const path = upJson.relativePath;
      setDraft((prev) => {
        if (!prev?.announcement) return prev;
        const next = structuredClone(prev) as HeroData;
        const a = next.announcement;
        if (!a) return next;
        next.announcement = { ...a, image: path };
        return next;
      });
    } finally {
      setAnnImageUploading(false);
    }
  };

  if (!viewData || !slides.length || !currentSlideData || !display) {
    return <HeroSkeleton sidePanelContact={sidePanelContact} />;
  }

  return (
    <section
      className="relative w-full overflow-hidden -mt-[112px] pt-[112px] h-[100svh] min-h-[560px] md:h-[calc(100vh+3cm)] md:min-h-[600px]"
    >
      <SideActionPanel contact={sidePanelContact} />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={
            "absolute inset-0 w-full transition-opacity duration-700 ease-out " +
            (index === currentSlide ? "opacity-100" : "opacity-0")
          }
        >
          {slide.image.startsWith("blob:") ? (
            // معاينة محلية قبل الحفظ — blob: لا يُحمَّل عبر next/image
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.image}
              alt={slide.titleAr || slide.titleEn || t("slideAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={resolveUploadImageSrc(slide.image)}
              alt={slide.titleAr || slide.titleEn || t("slideAlt")}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(37, 65, 81, 0.85) 0%, rgba(37, 65, 81, 0.5) 25%, rgba(37, 65, 81, 0) 50%)",
        }}
      />
      {isAdmin && isEditing && (
        <>
          <input
            ref={slideFileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleSlideBackgroundFile(f);
              e.target.value = "";
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            <button
              type="button"
              aria-label={t("uploadSlideBackground")}
              title={t("uploadSlideBackground")}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/35"
              onClick={() => slideFileInputRef.current?.click()}
            >
              <ImageUp className="size-8" strokeWidth={1.75} />
            </button>
          </div>
        </>
      )}
      <div className="absolute inset-0 px-4 sm:px-6 md:px-10 lg:px-16">
        {isAdmin && (
          <div
            className={`absolute top-72 z-50 ${isAr ? "right-6 sm:right-10" : "left-6 sm:left-10"}`}
          >
            {!isEditing ? (
              <button
                type="button"
                className="rounded-lg border border-white/20 bg-[#254151] px-4 py-2 font-semibold text-white shadow-2xl"
                onClick={() => {
                  setSlideImageFiles({});
                  setDraft(JSON.parse(JSON.stringify(heroData)) as HeroData);
                  setIsEditing(true);
                }}
              >
                {t("editHeroSection")}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                  onClick={saveChanges}
                  disabled={saving}
                >
                  {saving ? t("saving") : t("saveChanges")}
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white"
                  onClick={() => {
                    if (draft) revokeDraftSlideBlobs(draft);
                    setSlideImageFiles({});
                    setDraft(null);
                    setIsEditing(false);
                  }}
                >
                  {t("cancel")}
                </button>
              </div>
            )}
          </div>
        )}
        {viewData.announcement && (
          <div className="absolute bottom-56 left-4 right-4 z-20 md:bottom-16 md:left-16 md:right-auto">
            <div className="relative max-w-full md:max-w-md">
              {isAdmin && isEditing && (
                <button
                  type="button"
                  aria-label={t("removeAnnouncement")}
                  title={t("removeAnnouncement")}
                  className="absolute -top-2 -right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
                  onClick={handleRemoveAnnouncement}
                >
                  <Trash2 className="size-4" />
                </button>
              )}
              {wrapAnnouncementAsLink ? (
                isExternalHref(announcementLinkHref) ? (
                  <a
                    href={announcementLinkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-2xl bg-white p-4 md:p-6 shadow-2xl transition hover:ring-2 hover:ring-[#254151]/20"
                  >
                    <AnnouncementCardBody
                      display={display}
                      viewData={viewData}
                      isAdmin={isAdmin}
                      isEditing={isEditing}
                      annImageUploading={annImageUploading}
                      announcementFileInputRef={announcementFileInputRef}
                      onAnnouncementImageFile={handleAnnouncementImageFile}
                      updateAnnouncement={updateAnnouncement}
                    />
                  </a>
                ) : (
                  <Link
                    href={normalizeInternalPath(announcementLinkHref)}
                    className="relative block rounded-2xl bg-white p-4 md:p-6 shadow-2xl transition hover:ring-2 hover:ring-[#254151]/20"
                  >
                    <AnnouncementCardBody
                      display={display}
                      viewData={viewData}
                      isAdmin={isAdmin}
                      isEditing={isEditing}
                      annImageUploading={annImageUploading}
                      announcementFileInputRef={announcementFileInputRef}
                      onAnnouncementImageFile={handleAnnouncementImageFile}
                      updateAnnouncement={updateAnnouncement}
                    />
                  </Link>
                )
              ) : (
                <div className="relative rounded-2xl bg-white p-4 md:p-6 shadow-2xl">
                  <AnnouncementCardBody
                    display={display}
                    viewData={viewData}
                    isAdmin={isAdmin}
                    isEditing={isEditing}
                    annImageUploading={annImageUploading}
                    announcementFileInputRef={announcementFileInputRef}
                    onAnnouncementImageFile={handleAnnouncementImageFile}
                    updateAnnouncement={updateAnnouncement}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {isAdmin && !viewData.announcement && (
          <div className="absolute bottom-56 left-4 right-4 z-20 md:bottom-16 md:left-16 md:right-auto">
            <button
              type="button"
              className="w-full md:w-auto rounded-xl bg-white px-5 py-3 font-semibold text-[#254151] shadow-2xl ring-1 ring-black/10 transition hover:bg-gray-50"
              onClick={handleAddAnnouncement}
            >
              {t("addAnnouncement")}
            </button>
          </div>
        )}
        <div className="absolute bottom-14 left-4 right-4 pb-8 sm:bottom-16 sm:left-6 sm:right-6 md:bottom-0 md:left-auto md:right-16 md:max-w-3xl md:pb-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="flex items-start gap-2">
                <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
                  {display.title}
                </motion.h1>
                {isAdmin && isEditing && (
                  <BilingualTextEditDialog
                    label={t("editSlideTitle")}
                    valueAr={currentSlideData.titleAr}
                    valueEn={currentSlideData.titleEn}
                    onSave={({ ar, en }) =>
                      updateCurrentSlide((s) => ({
                        ...s,
                        titleAr: ar,
                        titleEn: en,
                      }))
                    }
                  />
                )}
              </div>
              <div className="flex items-start gap-2">
                <motion.p className="mb-4 text-sm sm:text-base leading-relaxed text-white/90 md:mb-5 md:text-xl">
                  {display.subtitle}
                </motion.p>
                {isAdmin && isEditing && (
                  <BilingualTextEditDialog
                    label={t("editSlideSubtitle")}
                    valueAr={currentSlideData.subtitleAr}
                    valueEn={currentSlideData.subtitleEn}
                    multiline
                    onSave={({ ar, en }) =>
                      updateCurrentSlide((s) => ({
                        ...s,
                        subtitleAr: ar,
                        subtitleEn: en,
                      }))
                    }
                  />
                )}
              </div>
              {(showSlideCta || (isAdmin && isEditing)) && (
                <div className="flex items-center gap-2">
                  {showSlideCta && (
                    <Button
                      size="lg"
                      className="bg-[#6096b4] hover:bg-[#c2a772] text-white font-bold px-5 py-4 text-sm sm:text-base md:px-8 md:py-6 md:text-lg shadow-xl"
                      onClick={() => {
                        const href = currentSlideData.ctaLink.trim();
                        if (href) window.location.href = href;
                      }}
                    >
                      {display.ctaText}
                      <ArrowLeft className="mr-2 size-5" />
                    </Button>
                  )}
                  {isAdmin && isEditing && (
                    <ButtonEditDialog
                      label={t("editCtaButton")}
                      textAr={currentSlideData.ctaTextAr}
                      textEn={currentSlideData.ctaTextEn}
                      link={currentSlideData.ctaLink}
                      onSave={({ textAr, textEn, link }) =>
                        updateCurrentSlide((s) => ({
                          ...s,
                          ctaTextAr: textAr,
                          ctaTextEn: textEn,
                          ctaLink: link,
                        }))
                      }
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-8 md:left-auto md:right-16 md:translate-x-0">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${index === currentSlide ? "w-12 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"} rounded-full`}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/40 md:block"
        aria-label={t("prevSlide")}
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/40 md:block"
        aria-label={t("nextSlide")}
      >
        <ChevronRight className="size-6" />
      </button>
    </section>
  );
}
