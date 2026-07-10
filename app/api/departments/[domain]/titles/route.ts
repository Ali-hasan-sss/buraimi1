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
        const { titleAr, titleEn, subTitleAr, subTitleEn } = body;

        if (!titleAr || !titleEn || !subTitleAr || !subTitleEn) {
            return NextResponse.json(
                { ok: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            {
                $set: {
                    titleAr,
                    titleEn,
                    subTitleAr,
                    subTitleEn,
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

        return NextResponse.json({ ok: true, message: "Titles updated" });
    } catch (error) {
        console.error("Error updating department titles:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update titles" },
            { status: 500 }
        );
    }
}
