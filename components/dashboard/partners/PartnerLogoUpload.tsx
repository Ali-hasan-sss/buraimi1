"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageUp, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

export function PartnerLogoUpload({
  defaultPath = "",
  inputName = "logo",
}: {
  defaultPath?: string;
  inputName?: string;
}) {
  const t = useTranslations("dashboardPartners");
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
        throw new Error(json.message || t("upload.uploadFailed"));
      }
      setPath(json.relativePath.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : t("upload.uploadFailed"));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t("upload.label")}</label>

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

      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-muted/30">
          {path ? (
            <Image
              src={resolveUploadImageSrc(path)}
              alt={t("upload.alt")}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              {t("upload.noLogo")}
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadFile(f);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="gap-1.5"
          >
            <ImageUp className="size-4" />
            {path ? t("upload.change") : t("upload.upload")}
          </Button>
          {path && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={uploading}
              onClick={() => setPath("")}
              className="gap-1.5 text-destructive hover:text-destructive"
            >
              <X className="size-4" />
              {t("upload.remove")}
            </Button>
          )}
        </div>
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      <p className="text-xs text-muted-foreground">
        {t("upload.hint")}
      </p>
    </div>
  );
}
