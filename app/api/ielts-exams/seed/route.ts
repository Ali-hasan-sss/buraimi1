import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import IeltsExamModel from "@/models/IeltsExam";

const seedData = [
  { monthAr: "يناير",  monthEn: "January",  date: "Saturday, 25.01.2025", module: "-",                order: 1  },
  { monthAr: "فبراير", monthEn: "February", date: "Saturday, 22.02.2025", module: "General Training", order: 2  },
  { monthAr: "مارس",   monthEn: "March",    date: "Saturday, 22.03.2025", module: "General Training", order: 3  },
  { monthAr: "أبريل",  monthEn: "April",    date: "Saturday, 26.04.2025", module: "General Training", order: 4  },
  { monthAr: "مايو",   monthEn: "May",      date: "Saturday, 24.05.2025", module: "General Training", order: 5  },
  { monthAr: "يونيو",  monthEn: "June",     date: "Saturday, 28.06.2025", module: "-",                order: 6  },
  { monthAr: "يوليو",  monthEn: "July",     date: "Saturday, 26.07.2025", module: "General Training", order: 7  },
  { monthAr: "أغسطس", monthEn: "August",   date: "Saturday, 23.08.2025", module: "General Training", order: 8  },
  { monthAr: "سبتمبر",monthEn: "September",date: "Saturday, 27.09.2025", module: "General Training", order: 9  },
  { monthAr: "أكتوبر",monthEn: "October",  date: "Saturday, 27.10.2025", module: "-",                order: 10 },
  { monthAr: "نوفمبر",monthEn: "November", date: "Saturday, 22.11.2025", module: "General Training", order: 11 },
  { monthAr: "ديسمبر",monthEn: "December", date: "Saturday, 27.12.2025", module: "General Training", order: 12 },
];

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await IeltsExamModel.deleteMany({});
    await IeltsExamModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await IeltsExamModel.deleteMany({});
    await IeltsExamModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
