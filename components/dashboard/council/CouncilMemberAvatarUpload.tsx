"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Upload, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type Props = {
  /** Stored path, e.g. `/api/uploads/....jpg` or legacy `/uploads/...` */
  defaultPath?: string;
  /** Form field name — use `memberImagePath` so Server Actions reliably post the value */
  inputName?: string;
};

export function CouncilMemberAvatarUpload({
  defaultPath = "",
  inputName = "memberImagePath",
}: Props) {
  const t = useTranslations("dashboardCouncil");
  const [path, setPath] = useState(defaultPath.trim());
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPath(defaultPath.trim());
  }, [defaultPath]);

  async function uploadFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const json = (await res.json()) as {
        ok: boolean;
        relativePath?: string;
        message?: string;
      };
      if (!res.ok || !json.ok || !json.relativePath) {
        throw new Error(json.message || t("uploadFailed"));
      }
      setPath(json.relativePath.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : t("uploadFailed"));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{t("photoLabel")}</span>
      {/*
        Controlled text (not type="hidden"): Next.js Server Actions reliably include it in FormData.
        Hidden + ref updates were often omitted from the posted payload.
      */}
      <input
        type="text"
        name={inputName}
        value={path}
        readOnly
        onChange={() => {}}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="sr-only"
      />

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <div
          className={cn(
            "relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/40",
            path && "border-solid border-border",
          )}
        >
          {path ? (
            <Image
              src={resolveUploadImageSrc(path)}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <User className="size-12 text-muted-foreground" strokeWidth={1.5} />
          )}
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Loader2 className="size-8 animate-spin text-[#254151]" />
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2 sm:pt-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadFile(f);
            }}
          />
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="gap-1.5"
            >
              <Upload className="size-4" />
              {t("upload")}
            </Button>
            {path ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={uploading}
                onClick={() => setPath("")}
                className="gap-1.5 text-destructive hover:text-destructive"
              >
                <X className="size-4" />
                {t("remove")}
              </Button>
            ) : null}
          </div>
          <p className="text-center text-xs text-muted-foreground sm:text-start">
            {t("uploadHint")}
          </p>
          {error ? (
            <p className="text-center text-xs text-destructive sm:text-start">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
