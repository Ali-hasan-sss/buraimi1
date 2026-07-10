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

// PUT - Update faculty member
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; email: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, email } = await params;
        const decodedEmail = decodeURIComponent(email);
        
        const body = await request.json();
        const { nameAr, nameEn, positionAr, positionEn, phone, image } = body;

        if (!nameAr || !nameEn || !positionAr || !positionEn || !phone) {
            return NextResponse.json(
                { ok: false, message: "Name (both languages), position (both languages) and phone are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain, "facultyMembers.email": decodedEmail },
            {
                $set: {
                    "facultyMembers.$.nameAr": nameAr,
                    "facultyMembers.$.nameEn": nameEn,
                    "facultyMembers.$.positionAr": positionAr,
                    "facultyMembers.$.positionEn": positionEn,
                    "facultyMembers.$.phone": phone,
                    "facultyMembers.$.image": image || "",
                },
            },
            { new: true }
        );

        if (!result) {
            return NextResponse.json(
                { ok: false, message: "Faculty member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ ok: true, message: "Faculty member updated" });
    } catch (error) {
        console.error("Error updating faculty member:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update faculty member" },
            { status: 500 }
        );
    }
}

// DELETE - Delete faculty member
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; email: string }> }
) {
    try {
        const isAdmin = await checkAdmin();
        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { domain, email } = await params;
        const decodedEmail = decodeURIComponent(email);

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $pull: {
                    facultyMembers: { email: decodedEmail },
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

        return NextResponse.json({ ok: true, message: "Faculty member deleted" });
    } catch (error) {
        console.error("Error deleting faculty member:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to delete faculty member" },
            { status: 500 }
        );
    }
}
