import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import EditorialMemberModel from "@/models/EditorialMember";

const seedData = [
  {
    positionAr: "الإشراف العام",
    positionEn: "General Supervision",
    name: "الأستاذ الدكتور ياسر فؤاد",
    email: "dean@buc.edu.om",
    order: 1,
    isActive: true,
  },
  {
    positionAr: "رئيس التحرير",
    positionEn: "Editor-in-Chief",
    name: "الفاضلة ريمة بنت محمد البادية",
    email: "mmdirector@buc.edu.om",
    order: 2,
    isActive: true,
  },
  {
    positionAr: "مدير التحرير",
    positionEn: "Managing Editor",
    name: "الفاضلة مشاعل بنت محمد العزانية",
    email: "malazani@buc.edu.om",
    order: 3,
    isActive: true,
  },
  {
    positionAr: "التدقيق اللغوي - اللغة العربية",
    positionEn: "Language Editing - Arabic",
    name: "الدكتورة منار المصري",
    email: "manar@buc.edu.om",
    order: 4,
    isActive: true,
  },
  {
    positionAr: "التدقيق اللغوي والترجمة - اللغة الإنجليزية",
    positionEn: "Editing & Translation - English",
    name: "أ. سفيان التارقي",
    email: "sofiene@buc.edu.om",
    order: 5,
    isActive: true,
  },
  {
    positionAr: "تصميم وإخراج",
    positionEn: "Design & Layout",
    name: "الفاضلة إلهام بنت راشد العميرية",
    email: "ealomeiri@buc.edu.om",
    order: 6,
    isActive: true,
  },
];

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await EditorialMemberModel.deleteMany({});
    await EditorialMemberModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await EditorialMemberModel.deleteMany({});
    await EditorialMemberModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
