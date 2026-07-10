"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import dbConnect from "@/lib/dbConnect";
import { slugify } from "@/lib/slug";
import { ResearchHighlightModel } from "@/models/ResearchHighlight";
import type { ResearchHighlightType } from "@/types/research-highlight";

type Input = {
  type: ResearchHighlightType;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  image: string;
  order: number;
};

export async function createResearchHighlightAction(input: Input) {
  try {
    await dbConnect();
    const baseSlug = slugify(input.titleEn || input.titleAr);
    const exists = await ResearchHighlightModel.findOne({ slug: baseSlug }).lean();
    const slug = exists ? `${baseSlug}-${Date.now()}` : baseSlug;
    const created = await ResearchHighlightModel.create({ ...input, slug });
    return { ok: true as const, id: String(created._id) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function updateResearchHighlightAction(id: string, input: Input) {
  try {
    await dbConnect();
    const current = await ResearchHighlightModel.findById(id).lean();
    if (!current) return { ok: false as const, message: "Item not found" };
    const baseSlug = slugify(input.titleEn || input.titleAr);
    const slug = baseSlug && baseSlug !== current.slug ? baseSlug : current.slug;
    await ResearchHighlightModel.findByIdAndUpdate(id, { ...input, slug }, { runValidators: true });
    return { ok: true as const };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function deleteResearchHighlightAction(id: string) {
  try {
    await dbConnect();
    const deleted = await ResearchHighlightModel.findByIdAndDelete(id).lean();
    if (!deleted) return { ok: false as const, message: "Item not found" };
    return { ok: true as const };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function uploadResearchHighlightImageAction(formData: FormData) {
  try {
    const maybeFile = formData.get("file");
    if (!(maybeFile instanceof File)) return { ok: false as const, message: "Invalid file" };
    if (!maybeFile.type.startsWith("image/")) return { ok: false as const, message: "Invalid file type" };

    const bytes = Buffer.from(await maybeFile.arrayBuffer());
    const ext = path.extname(maybeFile.name || "").toLowerCase() || ".png";
    const filename = `${randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "research-highlights");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);
    return { ok: true as const, url: `/uploads/research-highlights/${filename}` };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}
