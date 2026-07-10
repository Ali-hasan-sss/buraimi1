import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EXT_RE = /\.(jpe?g|png|gif|webp|pdf|txt|md|csv|rtf|doc|docx)$/i;

function isSafeSegment(seg: string): boolean {
    if (!seg || seg === "." || seg === "..") return false;
    return /^[a-zA-Z0-9._-]+$/.test(seg);
}

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ path: string[] }> },
) {
    const { path: segments } = await context.params;
    if (!Array.isArray(segments) || segments.length < 1 || segments.length > 2) {
        return new NextResponse("Not found", { status: 404 });
    }
    for (const seg of segments) {
        if (!isSafeSegment(seg)) {
            return new NextResponse("Not found", { status: 404 });
        }
    }
    const basename = segments[segments.length - 1]!;
    if (!EXT_RE.test(basename)) {
        return new NextResponse("Not found", { status: 404 });
    }
    if (segments.length === 2 && segments[0] !== "news") {
        return new NextResponse("Not found", { status: 404 });
    }

    const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");
    const resolved = path.resolve(uploadsRoot, ...segments);
    const relative = path.relative(uploadsRoot, resolved);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
        return new NextResponse("Not found", { status: 404 });
    }

    try {
        const st = await stat(resolved);
        if (!st.isFile()) {
            return new NextResponse("Not found", { status: 404 });
        }
        const buf = await readFile(resolved);
        const ext = path.extname(basename).toLowerCase();
        const contentType =
            ext === ".png"
                ? "image/png"
                : ext === ".webp"
                  ? "image/webp"
                  : ext === ".gif"
                    ? "image/gif"
                    : ext === ".pdf"
                      ? "application/pdf"
                      : ext === ".txt"
                        ? "text/plain; charset=utf-8"
                        : ext === ".md"
                          ? "text/markdown; charset=utf-8"
                          : ext === ".csv"
                            ? "text/csv; charset=utf-8"
                            : ext === ".rtf"
                              ? "application/rtf"
                              : ext === ".doc"
                                ? "application/msword"
                                : ext === ".docx"
                                  ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  : "image/jpeg";
        return new NextResponse(buf, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}
