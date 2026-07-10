import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { VisionMissionModel } from "@/models/VisionMission";

const SEED_DATA = {
  visionEn:
    "To be a leading educational institution in knowledge production and innovation, achieving sustainable development and actively contributing to building a knowledge-based economy and a prosperous society.",
  visionAr:
    "أن تكون مؤسسة تعليمية رائدة في إنتاج المعرفة والابتكار، وتحقيق التنمية المستدامة والمساهمة بفعالية في بناء اقتصاد قائم على المعرفة ومجتمع مزدهر.",
  missionEn:
    "Provide distinguished education and produce innovative scientific research that serves the national economy and achieves sustainable development, and prepare competent graduates capable of effective participation in society and contributing to the development and dissemination of knowledge locally and globally.",
  missionAr:
    "تقديم تعليم متميز وإنتاج بحث علمي مبتكر يخدم الاقتصاد الوطني ويحقق التنمية المستدامة، وإعداد خريجين أكفاء قادرين على المشاركة الفاعلة في المجتمع والإسهام في إنتاج المعرفة ونشرها محلياً وعالمياً.",
  values: [
    {
      id: "loyalty",
      titleAr: "الولاء",
      titleEn: "Loyalty",
      contentAr:
        "إظهار الالتزام الراسخ بمجتمع عمان، ورؤيته، وثقافته من خلال تعزيز الانتماء والمسؤولية والفخر القوي.",
      contentEn:
        "Demonstrating unwavering commitment to the Omani society, its vision, and culture by fostering a strong sense of belonging, responsibility, and pride.",
      iconKey: "shield",
      order: 0,
    },
    {
      id: "innovation",
      titleAr: "الابتكار",
      titleEn: "Innovation",
      contentAr:
        "تعزيز الإبداع وتقبل التغيير لتطوير أفكار وحلول وأساليب جديدة تدفع التقدم والتحسين.",
      contentEn:
        "Fostering creativity and embracing change to develop new ideas, solutions, and approaches that drive progress and improvement.",
      iconKey: "award",
      order: 1,
    },
    {
      id: "excellence",
      titleAr: "التميز",
      titleEn: "Excellence",
      contentAr:
        "السعي لتحقيق أعلى جودة في كل جانب، مع التحسين المستمر وتجاوز التوقعات من خلال نهج قائم على الأدلة والتوافق.",
      contentEn:
        "Pursuing the highest quality in every aspect, continuously improving, and exceeding expectations through evidence-based approach and alignment.",
      iconKey: "target",
      order: 2,
    },
    {
      id: "equity",
      titleAr: "الإنصاف",
      titleEn: "Equity",
      contentAr:
        "ضمان العدالة والشمول وتكافؤ الفرص لجميع الطلاب وأعضاء هيئة التدريس والموظفين.",
      contentEn:
        "Ensuring fairness, inclusion, and equal opportunity for all students, faculty, and staff.",
      iconKey: "users",
      order: 3,
    },
    {
      id: "sustainability",
      titleAr: "الاستدامة",
      titleEn: "Sustainability",
      contentAr:
        "التصرف بمسؤولية لحماية الموارد والحفاظ عليها للأجيال القادمة من خلال تعزيز الرفاهية البيئية والاقتصادية والاجتماعية.",
      contentEn:
        "Acting responsibly to protect and preserve resources for future generations by promoting environmental, economic, and social well-being.",
      iconKey: "check-circle",
      order: 4,
    },
    {
      id: "integrity",
      titleAr: "النزاهة",
      titleEn: "Integrity",
      contentAr:
        "الالتزام بأعلى معايير الأمانة والشفافية والسلوك الأخلاقي في جميع الإجراءات والقرارات.",
      contentEn:
        "Upholding the highest standards of honesty, transparency, and ethical behavior in all actions and decisions.",
      iconKey: "file-text",
      order: 5,
    },
    {
      id: "collaboration",
      titleAr: "التعاون",
      titleEn: "Collaboration",
      contentAr:
        "العمل معًا باحترام متبادل وتواصل مفتوح وأهداف مشتركة لتحقيق نتائج أفضل كفريق وبناء شراكات قوية مع المجتمع الأوسع.",
      contentEn:
        "Working together with mutual respect, open communication, and shared goals to achieve greater outcomes as a team and build strong partnerships with the wider community.",
      iconKey: "user-check",
      order: 6,
    },
  ],
};

async function seed() {
  try {
    await dbConnect();
    await VisionMissionModel.findOneAndUpdate(
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
