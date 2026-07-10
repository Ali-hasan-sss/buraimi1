import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { OrganizationalStructureModel } from "@/models/OrganizationalStructure";

const SEED_DATA = {
  sectionTitleAr: "الهيكل التنظيمي",
  sectionTitleEn: "Organizational Structure",
  sectionSubtitleAr: "الهيكل التنظيمي لكلية البريمي الجامعية",
  sectionSubtitleEn: "BUC Organizational Structure",
  chartTitleAr: "الهيكل التنظيمي لكلية البريمي الجامعية",
  chartTitleEn: "BUC Organizational Structure",
  chartImageAr: "/assets/69f7e84c76557c76b4de31e83615bf97bc78eef3.png",
  chartImageEn: "/assets/69f7e84c76557c76b4de31e83615bf97bc78eef3.png",
  aboutTitleAr: "عن الهيكل التنظيمي",
  aboutTitleEn: "About Organizational Structure",
  aboutTextAr:
    "يوضح الهيكل التنظيمي لكلية البريمي الجامعية التسلسل الإداري والأكاديمي للمؤسسة، بدءاً من مجلس الأمناء ومجلس الإدارة، مروراً بالعمادة وصولاً إلى مختلف الدوائر والأقسام الأكاديمية والإدارية. يهدف هذا الهيكل إلى ضمان الحوكمة الفعالة والتنسيق بين جميع الوحدات التنظيمية لتحقيق رؤية الكلية ورسالتها الأكاديمية.",
  aboutTextEn:
    "The organizational structure of Buraimi University College illustrates the administrative and academic hierarchy of the institution, starting from the Board of Trustees and Board of Directors, through the deanship, and reaching all academic and administrative departments. This structure aims to ensure effective governance and coordination across all organizational units to achieve the college vision and academic mission.",
};

async function seed() {
  try {
    await dbConnect();
    await OrganizationalStructureModel.findOneAndUpdate(
      {},
      { $set: SEED_DATA },
      { new: true, upsert: true },
    );
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
