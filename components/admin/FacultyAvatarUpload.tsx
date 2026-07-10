"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Loader2, Upload, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type Props = {
  /** Current image path */
  path?: string;
  /** Callback when image is uploaded */
  onUploaded: (relativePath: string) => void;
  /** Size of the avatar */
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-12",
  md: "size-16",
  lg: "size-24",
};

const iconSizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
};

export function FacultyAvatarUpload({
  path = "",
  onUploaded,
  size = "md",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

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
        throw new Error(json.message || "Upload failed");
      }
      onUploaded(json.relativePath.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
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
      
      {/* Clickable avatar */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors",
          path && "border-solid border-border",
          sizeClasses[size]
        )}
      >
        {path ? (
          <Image
            src={resolveUploadImageSrc(path)}
            alt=""
            fill
            className="object-cover"
            sizes={`${size === "sm" ? 48 : size === "md" ? 64 : 96}px`}
          />
        ) : (
          <User className={cn("text-muted-foreground", iconSizes[size])} strokeWidth={1.5} />
        )}
        
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
            <Loader2 className="size-5 animate-spin text-[#254151]" />
          </div>
        ) : (
          /* Hover overlay */
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
            <Upload className="size-5 text-white" />
          </div>
        )}
      </button>

      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
