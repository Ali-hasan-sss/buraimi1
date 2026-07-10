import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";
import type { OrgChartNode, OrgChartConnection } from "@/types/orgChart";
import { DEFAULT_ORG_CHART_NODES, DEFAULT_ORG_CHART_CONNECTIONS } from "@/types/orgChart";

interface Params {
  params: Promise<{ domain: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { domain } = await params;
    await dbConnect();
    const department = await DepartmentModel.findOne({ domain }).lean();
    if (!department) {
      return NextResponse.json({ ok: false, message: "Department not found" }, { status: 404 });
    }

    const data = {
      enabled: department.orgChartEnabled ?? false,
      titleAr: department.orgChartTitleAr || "الهيكل التنظيمي",
      titleEn: department.orgChartTitleEn || "Organizational Structure",
      nodes: department.orgChartNodes?.length ? department.orgChartNodes : DEFAULT_ORG_CHART_NODES,
      connections: department.orgChartConnections?.length ? department.orgChartConnections : DEFAULT_ORG_CHART_CONNECTIONS,
    };

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { domain } = await params;
    await dbConnect();

    // Check admin
    const authRes = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/me`, {
      headers: req.headers,
    });
    const authData = await authRes.json();
    if (!authData.ok || !authData.isAdmin) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as {
      enabled?: boolean;
      titleAr?: string;
      titleEn?: string;
      nodes?: OrgChartNode[];
      connections?: OrgChartConnection[];
    };

    const updateData: Record<string, unknown> = {
      orgChartEnabled: Boolean(body.enabled),
    };

    if (body.titleAr !== undefined) {
      updateData.orgChartTitleAr = String(body.titleAr).trim();
    }
    if (body.titleEn !== undefined) {
      updateData.orgChartTitleEn = String(body.titleEn).trim();
    }
    if (Array.isArray(body.nodes)) {
      updateData.orgChartNodes = body.nodes;
    }
    if (Array.isArray(body.connections)) {
      updateData.orgChartConnections = body.connections;
    }

    const updated = await DepartmentModel.findOneAndUpdate(
      { domain },
      { $set: updateData },
      { new: true, upsert: false }
    ).lean();

    if (!updated) {
      return NextResponse.json({ ok: false, message: "Department not found" }, { status: 404 });
    }

    const data = {
      enabled: updated.orgChartEnabled ?? false,
      titleAr: updated.orgChartTitleAr || "الهيكل التنظيمي",
      titleEn: updated.orgChartTitleEn || "Organizational Structure",
      nodes: updated.orgChartNodes?.length ? updated.orgChartNodes : DEFAULT_ORG_CHART_NODES,
      connections: updated.orgChartConnections?.length ? updated.orgChartConnections : DEFAULT_ORG_CHART_CONNECTIONS,
    };

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
