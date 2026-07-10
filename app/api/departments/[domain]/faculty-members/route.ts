import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";

// POST - Add new faculty member
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
        const { nameAr, nameEn, positionAr, positionEn, phone, image, email } = body;

        if (!nameAr || !nameEn || !positionAr || !positionEn || !phone || !email) {
            return NextResponse.json(
                { ok: false, message: "Name (both languages), position (both languages), phone and email are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if email already exists
        const existing = await DepartmentModel.findOne({
            domain,
            "facultyMembers.email": email,
        });

        if (existing) {
            return NextResponse.json(
                { ok: false, message: "Faculty member with this email already exists" },
                { status: 409 }
            );
        }

        const newMember = {
            nameAr,
            nameEn,
            positionAr,
            positionEn,
            phone,
            email,
            image: image || "",
        };

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $push: {
                    facultyMembers: newMember,
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

        return NextResponse.json({ ok: true, message: "Faculty member added" });
    } catch (error) {
        console.error("Error adding faculty member:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to add faculty member" },
            { status: 500 }
        );
    }
}
