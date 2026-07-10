"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type MultiImageUploadErrorCode =
    | "too_many_files"
    | "file_too_large"
    | "invalid_type";

export type MultiImageUploadError = {
    code: MultiImageUploadErrorCode;
    message: string;
    fileName?: string;
};

export type MultiImageUploadProps = {
    files: File[];
    onFilesChange: (nextFiles: File[]) => void;

    className?: string;
    disabled?: boolean;

    accept?: string;
    maxFiles?: number;
    maxSizeBytes?: number;

    label?: string;
    helperText?: string;
    multiple?: boolean,

    onError?: (error: MultiImageUploadError) => void;
};

const DEFAULT_ACCEPT = "image/*";
const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024;

function bytesToHuman(bytes: number) {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size = size / 1024;
        unitIndex += 1;
    }
    return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function isFileAccepted(file: File, accept: string) {
    const accepted = accept
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    if (accepted.length === 0) return true;

    return accepted.some((token) => {
        if (token === "image/*") return file.type.startsWith("image/");
        if (token.startsWith(".")) return file.name.toLowerCase().endsWith(token.toLowerCase());
        if (token.endsWith("/*")) return file.type.startsWith(token.slice(0, -1));
        return file.type === token;
    });
}

export function MultiImageUpload({
    files,
    onFilesChange,
    className,
    disabled,
    accept = DEFAULT_ACCEPT,
    maxFiles = DEFAULT_MAX_FILES,
    maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
    label = "Images",
    helperText,
    onError,
    multiple = true,

}: MultiImageUploadProps) {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const objectUrls = useMemo(() => {
        return files.map((f) => URL.createObjectURL(f));
    }, [files]);

    useEffect(() => {
        return () => {
            objectUrls.forEach((u) => URL.revokeObjectURL(u));
        };
    }, [objectUrls]);

    const canAddMore = files.length < maxFiles;

    const rulesText = useMemo(() => {
        const parts: string[] = [];
        if (maxFiles) parts.push(`Up to ${maxFiles} images`);
        if (maxSizeBytes) parts.push(`Max ${bytesToHuman(maxSizeBytes)} each`);
        return parts.join(" • ");
    }, [maxFiles, maxSizeBytes]);

    function pushError(err: MultiImageUploadError) {
        onError?.(err);
    }

    function validateAndMerge(incoming: File[]) {
        if (disabled) return;

        const next: File[] = [...files];

        for (const file of incoming) {
            if (next.length >= maxFiles) {
                pushError({
                    code: "too_many_files",
                    message: `You can upload up to ${maxFiles} images.`,
                    fileName: file.name,
                });
                break;
            }

            if (!isFileAccepted(file, accept)) {
                pushError({
                    code: "invalid_type",
                    message: `File type not allowed: ${file.name}.`,
                    fileName: file.name,
                });
                continue;
            }

            if (file.size > maxSizeBytes) {
                pushError({
                    code: "file_too_large",
                    message: `File is too large (${bytesToHuman(file.size)}). Max is ${bytesToHuman(maxSizeBytes)}: ${file.name}.`,
                    fileName: file.name,
                });
                continue;
            }

            next.push(file);
        }

        onFilesChange(next);
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const list = e.target.files;
        if (!list || list.length === 0) return;
        validateAndMerge(Array.from(list));
        e.target.value = "";
    }

    function openPicker() {
        if (disabled) return;
        inputRef.current?.click();
    }

    function removeAt(index: number) {
        const next = files.filter((_, i) => i !== index);
        onFilesChange(next);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;
        if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

        validateAndMerge(Array.from(e.dataTransfer.files));
    }


    const tImage = useTranslations("images")

    return (
        <div className={cn("space-y-3", className)}>
            <div className="space-y-1">
                <div className="text-sm font-medium text-foreground">{tImage("title")}</div>
                {helperText ? (
                    <div className="text-xs text-muted-foreground">{helperText}</div>
                ) : rulesText ? (
                    <div className="text-xs text-muted-foreground">{rulesText}</div>
                ) : null}
            </div>

            <input
                id={inputId}
                ref={inputRef}
                type="file"
                multiple={multiple}
                accept={accept}
                disabled={disabled || !canAddMore}
                className="hidden"
                onChange={onInputChange}
            />

            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                onClick={openPicker}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openPicker();
                    }
                }}
                onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!disabled) setIsDragging(true);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!disabled) setIsDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                }}
                onDrop={onDrop}
                className={cn(
                    "rounded-xl border border-border bg-card p-4 text-card-foreground transition-colors",
                    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                    isDragging ? "bg-accent" : "hover:bg-accent",
                )}
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                        <div className="text-sm text-foreground">{tImage("Drag & drop images here")}</div>
                        <div className="text-xs text-muted-foreground">{tImage("Or click to browse")}</div>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                        disabled={disabled || !canAddMore}
                        onClick={(e) => {
                            e.stopPropagation();
                            openPicker();
                        }}
                    >
                        {tImage("Upload")}
                    </Button>
                </div>
            </div>

            {files.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {files.map((file, index) => {
                        const src = objectUrls[index]
                        return (
                            <div
                                key={`${file.name}-${file.size}-${index}`}
                                className="group relative overflow-hidden rounded-xl border border-border bg-muted/40"
                            >
                                <div className="relative aspect-square">
                                    {src ? (
                                        <Image
                                            src={src}
                                            alt={file.name}
                                            fill
                                            sizes="(max-width: 1024px) 33vw, 25vw"
                                            className="object-cover"
                                        />
                                    ) : null}
                                </div>

                                <div className="flex items-center justify-between gap-2 p-2">
                                    <div className="min-w-0">
                                        <div className="truncate text-xs text-foreground">{file.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{bytesToHuman(file.size)}</div>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-2 border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                                        disabled={disabled}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeAt(index);
                                        }}
                                    >
                                        {tImage("Remove")}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                    {files.length} / {maxFiles} {tImage("selected")}
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    disabled={disabled || files.length === 0}
                    onClick={() => onFilesChange([])}
                >
                    {tImage("Clear")}
                </Button>
            </div>
        </div>
    );
}
