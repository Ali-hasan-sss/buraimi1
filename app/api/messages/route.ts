import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { messageModel } from "@/models/message";

const MAX_WAIT_MS = 20000;

export async function GET() {
    try {
        await Promise.race([
            dbConnect(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Database connection timeout")), MAX_WAIT_MS)
            ),
        ]);

        const messages = await messageModel.findOne().lean();

        if (!messages) {
            return NextResponse.json(
                { error: "No messages found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
