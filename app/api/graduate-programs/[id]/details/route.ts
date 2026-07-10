import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { GraduateProgramModel } from "@/models/GraduateProgram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => null);
    const details = body?.details;
    if (details == null || typeof details !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid details payload" },
        { status: 400 }
      );
    }

    await dbConnect();

    const info = (details as any)?.programInfo ?? {};
    const updateSet: Record<string, unknown> = { details };

    // Keep dashboard cards and public listings in sync with in-page editor
    if (typeof info?.titleAr === "string" && info.titleAr.trim()) {
      updateSet.titleAr = info.titleAr.trim();
    }
    if (typeof info?.titleEn === "string" && info.titleEn.trim()) {
      updateSet.titleEn = info.titleEn.trim();
    }
    if (typeof info?.affiliationAr === "string") {
      updateSet.affiliationAr = info.affiliationAr.trim();
    }
    if (typeof info?.affiliationEn === "string") {
      updateSet.affiliationEn = info.affiliationEn.trim();
    }
    if (typeof info?.aboutTextAr === "string" && info.aboutTextAr.trim()) {
      updateSet.descriptionAr = info.aboutTextAr.trim();
    }
    if (typeof info?.aboutTextEn === "string" && info.aboutTextEn.trim()) {
      updateSet.descriptionEn = info.aboutTextEn.trim();
    }

    await GraduateProgramModel.findOneAndUpdate(
      { slug: id },
      { $set: updateSet },
      { upsert: false }
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

