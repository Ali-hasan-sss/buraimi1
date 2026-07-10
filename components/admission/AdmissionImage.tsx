"use client"

import Image from "next/image"
import { resolveUploadImageSrc, isLocallyStoredUploadSrc } from "@/lib/upload-public-url"

export function AdmissionImage({
    src,
    alt,
    className,
    priority,
    sizes,
}: {
    src: string
    alt: string
    className?: string
    priority?: boolean
    sizes?: string
}) {
    const resolved = resolveUploadImageSrc(src)
    if (src.startsWith("blob:")) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className={className} />
        )
    }
    return (
        <Image
            src={resolved}
            alt={alt}
            fill
            priority={priority}
            className={className}
            sizes={sizes}
            unoptimized={isLocallyStoredUploadSrc(resolved)}
        />
    )
}
