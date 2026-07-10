"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { isLocallyStoredUploadSrc, resolveUploadImageSrc } from "@/lib/upload-public-url";
import {
  buildTailwindGradientTwoStops,
  carouselImageOverlayStyle,
  parseTailwindGradientTwoStops,
} from "@/lib/graduate-program-gradient";

import { useGraduateProgramFormVisual } from "./GraduateProgramFormVisualContext";

type Props = {
  defaultColor?: string;
  defaultAccent?: string;
  defaultImage?: string;
  defaultTitleAr?: string;
  defaultTitleEn?: string;
};

function normalizeHexAccent(s: string): string {
  const t = s.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(t)) return t;
  if (/^[0-9a-fA-F]{6}$/.test(t)) return `#${t}`;
  return "#254151";
}

export default function GraduateProgramPresentationSection({
  defaultColor,
  defaultAccent = "#254151",
  defaultImage = "",
  defaultTitleAr = "",
  defaultTitleEn = "",
}: Props) {
  const t = useTranslations("dashboardGraduatePrograms.form");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const initial = parseTailwindGradientTwoStops(defaultColor);
  const [hexFrom, setHexFrom] = useState(initial.from);
  const [hexTo, setHexTo] = useState(initial.to);
  const [accent, setAccent] = useState(() =>
    normalizeHexAccent(defaultAccent?.trim() ? defaultAccent : "#254151"),
  );

  const [imagePath, setImagePath] = useState(defaultImage.trim());
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [previewTitleAr, setPreviewTitleAr] = useState(defaultTitleAr);
  const [previewTitleEn, setPreviewTitleEn] = useState(defaultTitleEn);

  const twGradient = buildTailwindGradientTwoStops(hexFrom, hexTo);
  const overlayStyle = carouselImageOverlayStyle(twGradient);
  const { setTwGradient } = useGraduateProgramFormVisual();

  useEffect(() => {
    setTwGradient(twGradient);
  }, [twGradient, setTwGradient]);

  useEffect(() => {
    const ar = document.getElementById("titleAr") as HTMLInputElement | null;
    const en = document.getElementById("titleEn") as HTMLInputElement | null;
    const sync = () => {
      setPreviewTitleAr(ar?.value ?? "");
      setPreviewTitleEn(en?.value ?? "");
    };
    sync();
    ar?.addEventListener("input", sync);
    en?.addEventListener("input", sync);
    return () => {
      ar?.removeEventListener("input", sync);
      en?.removeEventListener("input", sync);
    };
  }, [defaultTitleAr, defaultTitleEn]);

  const openPicker = useCallback(() => {
    if (!uploading) fileRef.current?.click();
  }, [uploading]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = (await res.json()) as {
        ok?: boolean;
        message?: string;
        relativePath?: string;
      };
      if (!res.ok || !data.ok || !data.relativePath) {
        setUploadError(data.message || t("uploadFailed"));
        return;
      }
      setImagePath(data.relativePath);
    } catch {
      setUploadError(t("uploadFailed"));
    } finally {
      setUploading(false);
    }
  };

  const displayTitle = isRtl
    ? previewTitleAr || previewTitleEn || "—"
    : previewTitleEn || previewTitleAr || "—";

  const imageSrc = imagePath
    ? resolveUploadImageSrc(imagePath) || imagePath
    : "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect fill="#e8eef2" width="400" height="500"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14">Preview</text></svg>`,
      );

  return (
    <fieldset className="space-y-4 rounded-xl border bg-background p-4">
      <legend className="px-2 text-sm font-semibold text-muted-foreground">
        {t("presentation")}
      </legend>

      <input type="hidden" name="color" value={twGradient} readOnly />
      <input type="hidden" name="accentColor" value={accent} readOnly />
      <input
        type="hidden"
        name="carouselImage"
        value={imagePath}
        key={imagePath || "empty"}
        readOnly
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={onFileChange}
        tabIndex={-1}
        aria-hidden
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t("presentationHint")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="gradFrom">
                {t("gradientFromLabel")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="gradFrom"
                  type="color"
                  value={hexFrom}
                  onChange={(e) => setHexFrom(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-input bg-background p-1"
                  aria-label={t("gradientFromLabel")}
                />
                <span className="text-xs text-muted-foreground font-mono">{hexFrom}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="gradTo">
                {t("gradientToLabel")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="gradTo"
                  type="color"
                  value={hexTo}
                  onChange={(e) => setHexTo(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-input bg-background p-1"
                  aria-label={t("gradientToLabel")}
                />
                <span className="text-xs text-muted-foreground font-mono">{hexTo}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="accentPicker">
              {t("accentPickerLabel")}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="accentPicker"
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded border border-input bg-background p-1"
                aria-label={t("accentPickerLabel")}
              />
              <span className="text-xs text-muted-foreground font-mono">{accent}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("accentPickerHint")}</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              {t("accentPreviewDots")}
            </p>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-block rounded-full transition-all",
                    i === 0 ? "size-3" : "size-2 bg-gray-300",
                  )}
                  style={
                    i === 0
                      ? { backgroundColor: accent }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t("cardPreviewLabel")}</p>
          <p className="text-xs text-muted-foreground">{t("cardPreviewHint")}</p>

          <div className="relative mx-auto w-full max-w-[220px]">
            <button
              type="button"
              onClick={openPicker}
              disabled={uploading}
              className={cn(
                "group relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg transition-transform",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                uploading && "pointer-events-none opacity-80",
              )}
              aria-label={t("carouselUploadAria")}
            >
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="220px"
                unoptimized={
                  isLocallyStoredUploadSrc(imagePath) ||
                  imageSrc.startsWith("data:")
                }
              />
              <div className="absolute inset-0" style={overlayStyle} />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3
                  className="text-sm font-bold leading-snug text-white drop-shadow-md line-clamp-3"
                  style={{ fontFamily: "Cairo, system-ui, sans-serif" }}
                >
                  {displayTitle}
                </h3>
              </div>

              <div
                className={cn(
                  "absolute right-2 top-2 flex size-10 items-center justify-center rounded-lg border border-white/40 bg-black/35 text-white backdrop-blur-sm transition-opacity",
                  "opacity-90 group-hover:opacity-100",
                )}
              >
                {uploading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ImageUp className="size-5" strokeWidth={1.5} />
                )}
              </div>

              {!imagePath && !uploading && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 px-3 text-center text-white">
                  <ImageUp className="size-8 opacity-90" />
                  <span className="text-xs font-medium">{t("carouselUploadHint")}</span>
                </div>
              )}
            </button>
          </div>

          {uploadError ? (
            <p className="text-xs text-destructive">{uploadError}</p>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}
