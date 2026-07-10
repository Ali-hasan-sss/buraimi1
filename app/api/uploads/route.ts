import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

const ALLOWED_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/rtf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
]);
const ALLOWED_EXTENSIONS = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif',
    '.pdf',
    '.txt',
    '.md',
    '.csv',
    '.rtf',
    '.doc',
    '.docx',
]);
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB for policy files

function getBaseUrl() {
    const base = process.env.NEXT_PUBLIC_APP_URL || '';
    return base.endsWith('/') ? base.slice(0, -1) : base;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ ok: false, message: 'file is required' }, { status: 400 });
        }

        const extension = (path.extname(file.name) || '').toLowerCase();
        const isAllowedMime = ALLOWED_TYPES.has(file.type);
        const isAllowedExt = ALLOWED_EXTENSIONS.has(extension);
        if (!isAllowedMime && !isAllowedExt) {
            return NextResponse.json({ ok: false, message: 'unsupported file type' }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ ok: false, message: 'file too large' }, { status: 400 });
        }

        const safeExtension = extension || '.bin';
        const fileName = `${Date.now()}-${randomUUID()}${safeExtension}`;
        /** Served via GET /api/uploads/[...path] so production can read runtime files from disk. */
        const relativePath = `/api/uploads/${fileName}`;
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const fullPath = path.join(uploadsDir, fileName);

        await mkdir(uploadsDir, { recursive: true });
        const arrayBuffer = await file.arrayBuffer();
        await writeFile(fullPath, Buffer.from(arrayBuffer));

        const baseUrl = getBaseUrl();
        return NextResponse.json({
            ok: true,
            relativePath,
            /** Legacy alias for older clients / docs */
            legacyPath: `/uploads/${fileName}`,
            url: baseUrl ? `${baseUrl}${relativePath}` : relativePath,
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
