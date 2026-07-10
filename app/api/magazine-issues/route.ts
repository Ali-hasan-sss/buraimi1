import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MagazineIssueModel from "@/models/MagazineIssue";
import { magazineIssues } from "@/staticData/magazine";

const staticSeedData = magazineIssues.map((issue) => ({
  titleAr: issue.titleAr,
  titleEn: issue.titleEn,
  issueNumberAr: issue.issueNumberAr,
  issueNumberEn: issue.issueNumberEn,
  coverImage: issue.coverImage,
  fileUrl: issue.fileUrl ?? issue.pdfUrl,
  fileName: issue.fileName,
  order: issue.id,
  isActive: true,
}));

export async function GET() {
  try {
    await dbConnect();
    let issues = await MagazineIssueModel.find({ isActive: true })
      .sort({ order: -1, createdAt: -1 })
      .lean();

    if (issues.length === 0) {
      await MagazineIssueModel.insertMany(staticSeedData);
      issues = await MagazineIssueModel.find({ isActive: true })
        .sort({ order: -1, createdAt: -1 })
        .lean();
    }

    return NextResponse.json({ ok: true, data: issues });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const issue = await MagazineIssueModel.create(body);
    return NextResponse.json({ ok: true, data: issue });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create" }, { status: 500 });
  }
}
