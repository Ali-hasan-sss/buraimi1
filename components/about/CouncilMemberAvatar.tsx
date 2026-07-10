"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type Props = {
    image?: string;
    name?: string;
    fallback: LucideIcon;
    className: string;
    iconClassName: string;
};

/** Photo from API (`/api/uploads/...` or legacy `/uploads/...`) or gradient + icon fallback. */
export function CouncilMemberAvatar({ image, name, fallback: Icon, className, iconClassName }: Props) {
    const src = resolveUploadImageSrc(image ?? "");
    return (
        <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
            {src ? (
                <Image
                    src={src}
                    alt={name ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 40vw, 160px"
                />
            ) : (
                <Icon className={iconClassName} />
            )}
        </div>
    );
}
