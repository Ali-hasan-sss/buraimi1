import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { FactStat } from "@/models/FactStat";

type FactStatPayload = {
  titleAr?: string;
  titleEn?: string;
  value?: number;
  suffixAr?: string;
  suffixEn?: string;
  order?: number;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = (await request.json()) as FactStatPayload;

    const update: Record<string, string | number> = {};

    if (typeof body.titleAr === "string") {
      const v = body.titleAr.trim();
      if (!v) {
        return NextResponse.json(
          { ok: false, message: "Invalid Arabic title" },
          { status: 400 },
        );
      }
      update.titleAr = v;
    }

    if (typeof body.titleEn === "string") {
      const v = body.titleEn.trim();
      if (!v) {
        return NextResponse.json(
          { ok: false, message: "Invalid English title" },
          { status: 400 },
        );
      }
      update.titleEn = v;
    }

    if (typeof body.suffixAr === "string") update.suffixAr = body.suffixAr.trim();
    if (typeof body.suffixEn === "string") update.suffixEn = body.suffixEn.trim();

    if (body.value !== undefined) {
      const v = Number(body.value);
      if (Number.isNaN(v) || v < 0) {
        return NextResponse.json(
          { ok: false, message: "Invalid value" },
          { status: 400 },
        );
      }
      update.value = v;
    }

    if (body.order !== undefined) {
      const v = Number(body.order);
      if (Number.isNaN(v) || v < 0) {
        return NextResponse.json(
          { ok: false, message: "Invalid order" },
          { status: 400 },
        );
      }
      update.order = v;
    }

    if (!Object.keys(update).length) {
      return NextResponse.json(
        { ok: false, message: "No fields to update" },
        { status: 400 },
      );
    }

    const updated = await FactStat.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await FactStat.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: deleted });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
