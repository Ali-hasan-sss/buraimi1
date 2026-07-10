import { NextResponse } from "next/server";

import { listGradProgramsForPage } from "@/lib/graduate-program-public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const programs = await listGradProgramsForPage();
    return NextResponse.json({ ok: true, programs });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
