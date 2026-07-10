import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const session = await getSession();
        const { domain } = await params;

        // Check admin
        const raw = process.env.ADMIN_EMAILS || "";
        const allowed = raw
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean);
        const isAdmin =
            allowed.length === 0 ||
            (session?.email ? allowed.includes(session.email.toLowerCase()) : false);

        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { writer, mail, phone, messageArHtml, messageEnHtml, image } = body;

        if (!writer || !mail || !phone) {
            return NextResponse.json(
                { ok: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await dbConnect();

        const headMessage = {
            writer,
            mail,
            phone,
            messageAr: {
                __html: messageArHtml || '',
            },
            messageEn: {
                __html: messageEnHtml || '',
            },
            image: image || undefined,
        };

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $set: {
                    headMessage,
                },
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { ok: false, message: "Department not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, message: "Head message updated" });
    } catch (error) {
        console.error("Error updating head message:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update head message" },
            { status: 500 }
        );
    }
}
