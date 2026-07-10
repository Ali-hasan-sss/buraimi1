"use server";

import dbConnect from "@/lib/dbConnect";
import { messageModel } from "@/models/message";
import { revalidatePath } from "next/cache";

const MAX_WAIT_MS = 20000;

export interface MessageParagraph {
    textEn: string;
    textAr: string;
}

export interface RoleInfo {
    positionEn: string;
    positionAr: string;
    nameEn: string;
    nameAr: string;
    image: string;
    paragraphs: MessageParagraph[];
}

export interface MessagesData {
    chairman: RoleInfo;
    dean: RoleInfo;
}

export async function getMessagesData(): Promise<MessagesData | null> {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const messages = await messageModel.findOne().lean();

        if (!messages) {
            return null;
        }

        return JSON.parse(JSON.stringify(messages));
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}

export async function updateChairmanParagraphs(paragraphs: MessageParagraph[]) {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const result = await messageModel.findOneAndUpdate(
            {},
            { $set: { "chairman.paragraphs": paragraphs } },
            { new: true, upsert: true }
        );

        if (!result) {
            return { error: "Failed to update chairman paragraphs" };
        }

        revalidatePath("/dashboard/messages/chairman");
        return { success: true };
    } catch (error) {
        console.error("Error updating chairman paragraphs:", error);
        return { error: "Failed to update chairman paragraphs" };
    }
}

export async function updateDeanParagraphs(paragraphs: MessageParagraph[]) {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const result = await messageModel.findOneAndUpdate(
            {},
            { $set: { "dean.paragraphs": paragraphs } },
            { new: true, upsert: true }
        );

        if (!result) {
            return { error: "Failed to update dean paragraphs" };
        }

        revalidatePath("/dashboard/messages/dean");
        return { success: true };
    } catch (error) {
        console.error("Error updating dean paragraphs:", error);
        return { error: "Failed to update dean paragraphs" };
    }
}

interface UpdateRolePayload {
    nameAr: string;
    nameEn: string;
    image: string;
    paragraphs: MessageParagraph[];
}

export async function updateChairmanMessage(payload: UpdateRolePayload) {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const result = await messageModel.findOneAndUpdate(
            {},
            {
                $set: {
                    "chairman.nameAr": payload.nameAr.trim(),
                    "chairman.nameEn": payload.nameEn.trim(),
                    "chairman.image": payload.image.trim(),
                    "chairman.paragraphs": payload.paragraphs,
                },
            },
            { new: true, upsert: true }
        );

        if (!result) {
            return { error: "Failed to update chairman message" };
        }

        revalidatePath("/dashboard/messages/chairman");
        return { success: true };
    } catch (error) {
        console.error("Error updating chairman message:", error);
        return { error: "Failed to update chairman message" };
    }
}

export async function updateDeanMessage(payload: UpdateRolePayload) {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const result = await messageModel.findOneAndUpdate(
            {},
            {
                $set: {
                    "dean.nameAr": payload.nameAr.trim(),
                    "dean.nameEn": payload.nameEn.trim(),
                    "dean.image": payload.image.trim(),
                    "dean.paragraphs": payload.paragraphs,
                },
            },
            { new: true, upsert: true }
        );

        if (!result) {
            return { error: "Failed to update dean message" };
        }

        revalidatePath("/dashboard/messages/dean");
        return { success: true };
    } catch (error) {
        console.error("Error updating dean message:", error);
        return { error: "Failed to update dean message" };
    }
}
