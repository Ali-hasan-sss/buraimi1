import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MagazineIssueModel from "@/models/MagazineIssue";
import { magazineIssues } from "@/staticData/magazine";

const seedData = magazineIssues.map((issue) => ({
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

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await MagazineIssueModel.deleteMany({});
    await MagazineIssueModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await MagazineIssueModel.deleteMany({});
    await MagazineIssueModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
