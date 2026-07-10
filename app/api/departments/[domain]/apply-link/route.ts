import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const { domain } = await params;
        await dbConnect();
        const dept = await DepartmentModel.findOne({ domain }, { applyLink: 1 }).lean();
        if (!dept) {
            return NextResponse.json({ ok: false, message: "Department not found" }, { status: 404 });
        }
        return NextResponse.json({ ok: true, applyLink: dept.applyLink || "" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    try {
        const session = await getSession();
        const { domain } = await params;

        const raw = process.env.ADMIN_EMAILS || "";
        const allowed = raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
        const isAdmin =
            allowed.length === 0 ||
            (session?.email ? allowed.includes(session.email.toLowerCase()) : false);

        if (!isAdmin) {
            return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json() as { applyLink?: string };
        const applyLink = String(body.applyLink || "").trim();

        await dbConnect();

        const result = await DepartmentModel.findOneAndUpdate(
            { domain },
            { $set: { applyLink } },
            { new: true }
        );

        if (!result) {
            return NextResponse.json({ ok: false, message: "Department not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, applyLink: result.applyLink || "" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}
