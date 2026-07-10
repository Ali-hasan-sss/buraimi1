import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { CampusMapModel } from "@/models/CampusMap";

const SEED_DATA = {
  sectionTitleAr: "خارطة الحرم الجامعي",
  sectionTitleEn: "Campus Map",
  sectionSubtitleAr: "خارطة الحرم الجامعي",
  sectionSubtitleEn: "Campus Map",
  introAr:
    "خريطة تفصيلية للحرم الجامعي توضح موقع المباني والمرافق ومواقف السيارات ومخارج الطوارئ ونقاط التجمع",
  introEn:
    "A detailed campus map showing the location of buildings, facilities, parking areas, emergency exits, and assembly points.",
  mapImage: "/assets/campusMapImg.webp",
  mapAltAr: "خارطة الحرم الجامعي - كلية البريمي الجامعية",
  mapAltEn: "Campus Map - Al Buraimi University College",
  legendTitleAr: "مفتاح الخريطة",
  legendTitleEn: "Map Legend",
  legendItems: [
    { id: "lg-1", icon: "🚰", labelAr: "خزان المياه", labelEn: "Water Tank", color: "from-blue-500 to-blue-600", order: 0 },
    { id: "lg-2", icon: "🚗", labelAr: "مواقف الطوارئ", labelEn: "Emergency Parking", color: "from-red-500 to-red-600", order: 1 },
    { id: "lg-3", icon: "🚶", labelAr: "مسار الإخلاء", labelEn: "Evacuation Route", color: "from-purple-500 to-purple-600", order: 2 },
    { id: "lg-4", icon: "🚑", labelAr: "مسار مركبات الطوارئ", labelEn: "Emergency Vehicles Route", color: "from-orange-500 to-orange-600", order: 3 },
    { id: "lg-5", icon: "🚪", labelAr: "مخارج الطوارئ", labelEn: "Emergency Exits", color: "from-green-500 to-green-600", order: 4 },
    { id: "lg-6", icon: "👥", labelAr: "نقاط التجمع", labelEn: "Assembly Points", color: "from-teal-500 to-teal-600", order: 5 },
    { id: "lg-7", icon: "🔥", labelAr: "خيمات الحريق", labelEn: "Fire Tents", color: "from-red-600 to-red-700", order: 6 },
    { id: "lg-8", icon: "⚡", labelAr: "غرف الكهرباء", labelEn: "Electrical Rooms", color: "from-yellow-500 to-yellow-600", order: 7 },
  ],
  safetyTitleAr: "تعليمات السلامة",
  safetyTitleEn: "Safety Instructions",
  safetyItems: [
    { id: "s-1", textAr: "يرجى التعرف على مواقع مخارج الطوارئ القريبة منك", textEn: "Please identify the nearest emergency exits.", order: 0 },
    { id: "s-2", textAr: "في حالة الطوارئ، اتبع مسارات الإخلاء الموضحة باللون البنفسجي", textEn: "In emergencies, follow evacuation routes marked in purple.", order: 1 },
    { id: "s-3", textAr: "تجمع عند نقاط التجمع المحددة في حالة الإخلاء", textEn: "Gather at designated assembly points during evacuation.", order: 2 },
    { id: "s-4", textAr: "لا تستخدم المصاعد أثناء حالات الطوارئ", textEn: "Do not use elevators during emergencies.", order: 3 },
  ],
  contacts: [
    { id: "c-1", titleAr: "الأمن والسلامة", titleEn: "Safety and Security", textAr: "للطوارئ: 9999", textEn: "Emergency: 9999", color: "from-[#254151] to-[#2d4a5c]", iconKey: "shield", order: 0 },
    { id: "c-2", titleAr: "العيادة الطبية", titleEn: "Medical Clinic", textAr: "متوفرة طوال أيام العمل", textEn: "Available during working days", color: "from-[#6096b4] to-[#5085a3]", iconKey: "heart", order: 1 },
    { id: "c-3", titleAr: "الاستعلامات", titleEn: "Information Desk", textAr: "مكتب الاستقبال الرئيسي", textEn: "Main reception desk", color: "from-[#c2a772] to-[#b39662]", iconKey: "info", order: 2 },
  ],
};

async function seed() {
  try {
    await dbConnect();
    await CampusMapModel.findOneAndUpdate({}, { $set: SEED_DATA }, { new: true, upsert: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}
