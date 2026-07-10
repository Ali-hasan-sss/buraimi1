import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";

// Helper to check admin
async function checkAdmin() {
    const session = await getSession();
    const raw = process.env.ADMIN_EMAILS || "";
    const allowed = raw
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
    return (
        allowed.length === 0 ||
        (session?.email ? allowed.includes(session.email.toLowerCase()) : false)
    );
}

// PUT - Update program
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; programId: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, programId } = await params;
        const body = await request.json();
        const { titleAr, titleEn, descriptionAr, descriptionEn, objective, levels } = body;

        if (!titleAr || !titleEn) {
            return NextResponse.json(
                { ok: false, message: "Title is required in both languages" },
                { status: 400 }
            );
        }

        await dbConnect();

        const objectiveData = {
            title: objective?.title || "أهداف البرنامج",
            titleEn: objective?.titleEn || "Program Objectives",
            data: objective?.data || [],
            dataEn: objective?.dataEn || [],
        };

        const result = await DepartmentModel.findOneAndUpdate(
            { domain, "programs.id": programId },
            {
                $set: {
                    "programs.$.titleAr": titleAr,
                    "programs.$.titleEn": titleEn,
                    "programs.$.descriptionAr": descriptionAr || "",
                    "programs.$.descriptionEn": descriptionEn || "",
                    "programs.$.objective": objectiveData,
                    "programs.$.levels": levels || [],
                },
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { ok: false, message: "Program not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, message: "Program updated" });
    } catch (error) {
        console.error("Error updating program:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update program" },
            { status: 500 }
        );
    }
}

// DELETE - Delete program
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; programId: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, programId } = await params;

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $pull: {
                    programs: { id: programId },
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

        return NextResponse.json({ ok: true, message: "Program deleted" });
    } catch (error) {
        console.error("Error deleting program:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to delete program" },
            { status: 500 }
        );
    }
}
