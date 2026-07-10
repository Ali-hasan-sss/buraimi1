"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import dbConnect from "@/lib/dbConnect";
import { slugify } from "@/lib/slug";
import { EventModel } from "@/models/Event";
import type { EventTypeKey } from "@/types/event";

type EventInput = {
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  locationAr: string;
  locationEn: string;
  image: string;
  type: EventTypeKey;
};

export async function createEventAction(input: EventInput) {
  try {
    await dbConnect();
    const baseSlug = slugify(input.titleEn || input.titleAr);
    const exists = await EventModel.findOne({ slug: baseSlug }).lean();
    const slug = exists ? `${baseSlug}-${Date.now()}` : baseSlug;

    const created = await EventModel.create({ ...input, slug });
    return { ok: true as const, id: String(created._id) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function updateEventAction(id: string, input: EventInput) {
  try {
    await dbConnect();
    const current = await EventModel.findById(id).lean();
    if (!current) return { ok: false as const, message: "Event not found" };

    let nextSlug = current.slug;
    const nextBase = slugify(input.titleEn || input.titleAr);
    if (nextBase && nextBase !== current.slug) {
      const exists = await EventModel.findOne({
        slug: nextBase,
        _id: { $ne: id },
      }).lean();
      nextSlug = exists ? `${nextBase}-${Date.now()}` : nextBase;
    }

    await EventModel.findByIdAndUpdate(id, { ...input, slug: nextSlug }, { runValidators: true });
    return { ok: true as const };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function deleteEventAction(id: string) {
  try {
    await dbConnect();
    const deleted = await EventModel.findByIdAndDelete(id).lean();
    if (!deleted) return { ok: false as const, message: "Event not found" };
    return { ok: true as const };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}

export async function uploadEventImageAction(formData: FormData) {
  try {
    const maybeFile = formData.get("file");
    if (!maybeFile) return { ok: false as const, message: "No file provided" };
    if (!(maybeFile instanceof File)) return { ok: false as const, message: "Invalid file" };
    if (!maybeFile.type?.startsWith("image/")) return { ok: false as const, message: "Invalid file type" };

    const bytes = Buffer.from(await maybeFile.arrayBuffer());
    const ext = path.extname(maybeFile.name || "").toLowerCase() || ".png";
    const filename = `${randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);
    return { ok: true as const, url: `/uploads/events/${filename}` };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { ok: false as const, message };
  }
}
