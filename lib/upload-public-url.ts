/**
 * User uploads are stored under `public/uploads` on disk but many production setups
 * only ship static files from the build — runtime files are not served as `/uploads/*`.
 * Serving through `/api/uploads/*` reads from the same directory the POST handler writes to.
 *
 * - Legacy DB values: `/uploads/foo.jpg` or `/uploads/news/foo.jpg`
 * - New uploads: `/api/uploads/...` (stored as-is)
 * - External URLs: unchanged
 */
export function resolveUploadImageSrc(stored: string | undefined | null): string {
    if (stored == null) return "";
    const s = stored.trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("/api/uploads/")) return s;
    if (s.startsWith("/uploads/")) {
        const rest = s.slice("/uploads/".length).replace(/^\/+/, "");
        if (!rest || rest.includes("..")) return s;
        const parts = rest.split("/").filter(Boolean);
        if (parts.length === 0 || parts.length > 2) return s;
        for (const p of parts) {
            if (!/^[a-zA-Z0-9._-]+$/.test(p)) return s;
        }
        return `/api/uploads/${parts.map((p) => encodeURIComponent(p)).join("/")}`;
    }
    return s;
}

/** Same-origin user uploads (legacy or API-served) — often need `unoptimized` on `next/image`. */
export function isLocallyStoredUploadSrc(s: string): boolean {
    return s.startsWith("/uploads/") || s.startsWith("/api/uploads/");
}
