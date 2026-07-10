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

// PUT - Update career opportunity
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; opportunityId: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, opportunityId } = await params;
        
        const body = await request.json();
        const { titleAr, titleEn } = body;

        if (!titleAr || !titleEn) {
            return NextResponse.json(
                { ok: false, message: "Title is required in both languages" },
                { status: 400 }
            );
        }

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain, "careerOpportunities.id": opportunityId },
            {
                $set: {
                    "careerOpportunities.$.titleAr": titleAr,
                    "careerOpportunities.$.titleEn": titleEn,
                },
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { ok: false, message: "Career opportunity not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, message: "Career opportunity updated" });
    } catch (error) {
        console.error("Error updating career opportunity:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update career opportunity" },
            { status: 500 }
        );
    }
}

// DELETE - Delete career opportunity
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; opportunityId: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, opportunityId } = await params;

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $pull: {
                    careerOpportunities: { id: opportunityId },
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

        return NextResponse.json({ ok: true, message: "Career opportunity deleted" });
    } catch (error) {
        console.error("Error deleting career opportunity:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to delete career opportunity" },
            { status: 500 }
        );
    }
}
