import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { SocialPostModel } from "@/models/SocialPost";

export const runtime = "nodejs";

const DEFAULT_POSTS = [
  {
    titleAr: "الطلبة في مكتبة كلية البريمي الجامعية",
    titleEn: "Students at Al Buraimi College Library",
    image: "/assets/697518319cfbd5386e1be0c0c198fb998764dde2.png",
    postUrl: "https://www.instagram.com/bucnewss/?hl=en",
    platform: "instagram",
    pageName: "burimicollege",
    order: 0,
  },
  {
    titleAr: "حفل تخرج الدفعة الجديدة من كلية البريمي الجامعية",
    titleEn: "Graduation Ceremony at Al Buraimi College",
    image: "/assets/86fa987e38c10a34d094002d21242b323a8f85a8.png",
    postUrl: "https://www.facebook.com/profile.php?id=100063702033637",
    platform: "facebook",
    pageName: "Al Buraimi University College",
    order: 1,
  },
] as const;

export async function GET() {
  try {
    await dbConnect();
    let docs = await SocialPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (!docs.length) {
      await SocialPostModel.insertMany(DEFAULT_POSTS);
      docs = await SocialPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }
    return NextResponse.json({ ok: true, data: docs });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const created = await SocialPostModel.create(body);
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
