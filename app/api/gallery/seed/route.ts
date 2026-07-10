import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GalleryImageModel from "@/models/GalleryImage";

const seedData = [
  {
    url: "https://images.unsplash.com/photo-1758270704524-596810e891b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjbGFzc3Jvb20lMjBsZWN0dXJlfGVufDF8fHx8MTc3MzEyNzMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "محاضرة أكاديمية", titleEn: "Academic Lecture",
    categoryAr: "الفعاليات الأكاديمية", categoryEn: "Academic Events", order: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1738949538943-e54722a44ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3JhZHVhdGlvbiUyMGNlcmVtb255fGVufDF8fHx8MTc3MzEyNzMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "حفل التخرج", titleEn: "Graduation Ceremony",
    categoryAr: "الحفلات والمناسبات", categoryEn: "Ceremonies & Occasions", order: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMDU0MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "مباني الكلية", titleEn: "College Buildings",
    categoryAr: "الحرم الجامعي", categoryEn: "Campus", order: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1718327453695-4d32b94c90a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwbGlicmFyeXxlbnwxfHx8fDE3NzMwNDM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "المكتبة", titleEn: "Library",
    categoryAr: "المرافق التعليمية", categoryEn: "Educational Facilities", order: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY29uZmVyZW5jZSUyMHNlbWluYXJ8ZW58MXx8fHwxNzczMTI3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "مؤتمر علمي", titleEn: "Scientific Conference",
    categoryAr: "المؤتمرات", categoryEn: "Conferences", order: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1772653519333-c1927e38f791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3BvcnRzJTIwZXZlbnR8ZW58MXx8fHwxNzczMTI3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "النشاط الرياضي", titleEn: "Sports Activity",
    categoryAr: "الأنشطة الرياضية", categoryEn: "Sports Activities", order: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1602052294200-a8b75e03adfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGFib3JhdG9yeSUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MzEyNzMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "المختبر العلمي", titleEn: "Science Lab",
    categoryAr: "المرافق التعليمية", categoryEn: "Educational Facilities", order: 7,
  },
  {
    url: "https://images.unsplash.com/photo-1764920265158-500a6e60c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGFjdGl2aXRpZXN8ZW58MXx8fHwxNzczMDU0MTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "الأنشطة الطلابية", titleEn: "Student Activities",
    categoryAr: "الأنشطة الطلابية", categoryEn: "Student Activities", order: 8,
  },
  {
    url: "https://images.unsplash.com/photo-1770028919882-017b31ad6d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYXdhcmRzJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzczMTI3MzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "حفل التكريم", titleEn: "Awards Ceremony",
    categoryAr: "الحفلات والمناسبات", categoryEn: "Ceremonies & Occasions", order: 9,
  },
  {
    url: "https://images.unsplash.com/photo-1766297247924-6638d54e7c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY29tcHV0ZXIlMjBsYWIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzEyNzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "مختبر الحاسوب", titleEn: "Computer Lab",
    categoryAr: "المرافق التعليمية", categoryEn: "Educational Facilities", order: 10,
  },
  {
    url: "https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdGVhbXdvcmslMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MzEyNzMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "العمل الجماعي", titleEn: "Teamwork",
    categoryAr: "الفعاليات الأكاديمية", categoryEn: "Academic Events", order: 11,
  },
  {
    url: "https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMDU0MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    titleAr: "الحرم الجامعي", titleEn: "Campus",
    categoryAr: "الحرم الجامعي", categoryEn: "Campus", order: 12,
  },
];

export async function POST(request: NextRequest) {
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.ADMIN_SEED_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    await GalleryImageModel.deleteMany({});
    await GalleryImageModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    await GalleryImageModel.deleteMany({});
    await GalleryImageModel.insertMany(seedData);
    return NextResponse.json({ ok: true, count: seedData.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
