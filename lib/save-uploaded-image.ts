import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function saveUploadedImage(fileEntry: FormDataEntryValue | null): Promise<string | null> {
  if (!(fileEntry instanceof File)) return null;
  if (!fileEntry.size) return null;

  if (!ALLOWED_TYPES.has(fileEntry.type)) {
    throw new Error("Unsupported image type");
  }
  if (fileEntry.size > MAX_FILE_SIZE) {
    throw new Error("Image is too large");
  }

  const extension = path.extname(fileEntry.name) || ".webp";
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const fullPath = path.join(uploadsDir, fileName);

  await mkdir(uploadsDir, { recursive: true });
  const arrayBuffer = await fileEntry.arrayBuffer();
  await writeFile(fullPath, Buffer.from(arrayBuffer));

  return `/api/uploads/${fileName}`;
}
