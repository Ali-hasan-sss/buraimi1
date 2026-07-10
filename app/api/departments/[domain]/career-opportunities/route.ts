import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";
import { randomUUID } from "crypto";

// POST - Add new career opportunity
export async function POST(
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
        const { titleAr, titleEn } = body;

        if (!titleAr || !titleEn) {
            return NextResponse.json(
                { ok: false, message: "Title is required in both languages" },
                { status: 400 }
            );
        }

        await dbConnect();

        const newOpportunity = {
            id: randomUUID(),
            titleAr,
            titleEn,
        };

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $push: {
                    careerOpportunities: newOpportunity,
                },
            },
            { new: true, upsert: true }
        );

        if (!result) {
            return NextResponse.json(
                { ok: false, message: "Department not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, message: "Career opportunity added" });
    } catch (error) {
        console.error("Error adding career opportunity:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to add career opportunity" },
            { status: 500 }
        );
    }
}
