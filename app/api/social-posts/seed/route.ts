import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { SocialPostModel } from "@/models/SocialPost";

const SEED = [
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
    postUrl: "https://x.com/bucnewss",
    platform: "twitter",
    pageName: "@bucnewss",
    order: 1,
  },
] as const;

async function seed() {
  try {
    await dbConnect();
    for (const item of SEED) {
      await SocialPostModel.updateOne(
        { postUrl: item.postUrl, order: item.order },
        { $set: item },
        { upsert: true },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}
