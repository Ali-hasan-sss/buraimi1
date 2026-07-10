"use server";

import dbConnect from "@/lib/dbConnect";
import { NewsModel } from "@/models/news";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export type UpdateNewsInput = {
    id: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    date: string;
    category: string;
    image: string;
    readTime: number;
    featured: boolean;
    link: string;
};

export type CreateNewsInput = {
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    date: string;
    category: string;
    image: string;
    readTime: number;
    featured: boolean;
    link: string;
};

export async function updateNewsAction(input: UpdateNewsInput): Promise<{ ok: true } | { ok: false; message: string }> {
    try {
        await dbConnect();

        const { id, ...update } = input;

        const updated = await NewsModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).lean();

        if (!updated) {
            return { ok: false, message: "News item not found" };
        }

        return { ok: true };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return { ok: false, message };
    }
}

export async function createNewsAction(input: CreateNewsInput): Promise<{ ok: true; id: string } | { ok: false; message: string }> {
    try {
        await dbConnect();

        const created = await NewsModel.create(input);
        return { ok: true, id: String(created._id) };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return { ok: false, message };
    }
}

export async function deleteNewsAction(id: string): Promise<{ ok: true } | { ok: false; message: string }> {
    try {
        await dbConnect();

        const deleted = await NewsModel.findByIdAndDelete(id).lean();
        if (!deleted) {
            return { ok: false, message: "News item not found" };
        }

        return { ok: true };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return { ok: false, message };
    }
}

export async function uploadNewsImageAction(formData: FormData): Promise<{ ok: true; url: string } | { ok: false; message: string }> {
    try {
        const maybeFile = formData.get("file");
        if (!maybeFile) return { ok: false, message: "No file provided" };
        if (!(maybeFile instanceof File)) return { ok: false, message: "Invalid file" };

        const file = maybeFile;
        if (!file.type?.startsWith("image/")) return { ok: false, message: "Invalid file type" };

        const bytes = Buffer.from(await file.arrayBuffer());

        const ext = path.extname(file.name || "").toLowerCase() || ".png";
        const filename = `${randomUUID()}${ext}`;

        const uploadDir = path.join(process.cwd(), "public", "uploads", "news");
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, bytes);

        const url = `/uploads/news/${filename}`;
        return { ok: true, url };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return { ok: false, message };
    }
}
