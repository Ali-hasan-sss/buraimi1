import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";
import { randomUUID } from "node:crypto";

// POST - Add new program
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
        const { titleAr, titleEn, descriptionAr, descriptionEn, objective, levels } = body;

        if (!titleAr || !titleEn) {
            return NextResponse.json(
                { ok: false, message: "Title is required in both languages" },
                { status: 400 }
            );
        }

        await dbConnect();

        const newProgram = {
            id: randomUUID(),
            titleAr,
            titleEn,
            descriptionAr: descriptionAr || "",
            descriptionEn: descriptionEn || "",
            objective: {
                title: objective?.title || "أهداف البرنامج",
                titleEn: objective?.titleEn || "Program Objectives",
                data: objective?.data || [],
                dataEn: objective?.dataEn || [],
            },
            levels: levels || [],
            studyPlan: [],
        };

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $push: {
                    programs: newProgram,
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

        return NextResponse.json({ ok: true, message: "Program added", programId: newProgram.id });
    } catch (error) {
        console.error("Error adding program:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to add program" },
            { status: 500 }
        );
    }
}
