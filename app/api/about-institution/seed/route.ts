import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AboutInstitutionModel } from "@/models/AboutInstitution";

const SEED_DATA = {
  titleAr: "اكتشف كلية البريمي الجامعية",
  titleEn: "Discover Al-Buraimi University College",
  contentAr:
    "كلية البريمي الجامعية هي أول كلية جامعية في محافظة البريمي. كان تأسيسها بمثابة استجابة حقيقية للدعوة السامية للاستثمار في التعليم العالي وتوسيع فرص التعلم النوعي.\n\nبدأت الدراسة في الكلية في العام الأكاديمي (2003 - 2004)، وكانت نقطة انطلاق قائمة على شراكات أكاديمية دولية دعمت جودة التعليم والبحث العلمي.\n\nتواصل الكلية تطوير المعرفة والمهارات المهنية بما ينسجم مع احتياجات المجتمع وسوق العمل، مع الالتزام بمعايير الجودة الأكاديمية.",
  contentEn:
    "Al Buraimi University College is the first university college in Al Buraimi Governorate. Its establishment was a direct response to expanding quality higher education opportunities.\n\nStudy at the college started in the academic year (2003 - 2004), supported by international academic partnerships that strengthened teaching quality and research.\n\nThe college continues to develop knowledge and professional skills aligned with community and labor market needs while maintaining academic quality standards.",
  items: [
    {
      id: "why-buc",
      titleAr: "لماذا كلية البريمي الجامعية؟",
      titleEn: "Why Al Buraimi University College?",
      contentAr:
        "تتميز الكلية ببيئة أكاديمية حديثة، وبرامج نوعية، وشراكات دولية، وتركيز على إعداد خريج قادر على المنافسة محلياً وعالمياً.",
      contentEn:
        "The college offers a modern academic environment, quality programs, international partnerships, and a strong focus on producing competitive graduates.",
      order: 0,
    },
    {
      id: "leadership",
      titleAr: "قيادتنا",
      titleEn: "Our Leadership",
      contentAr:
        "تتبنى قيادة الكلية نهجاً استراتيجياً يوازن بين الجودة الأكاديمية وخدمة المجتمع، مع دعم الابتكار والتحسين المستمر.",
      contentEn:
        "Our leadership adopts a strategic approach that balances academic quality and community service, while supporting innovation and continuous improvement.",
      order: 1,
    },
    {
      id: "vision-values",
      titleAr: "القيم، الرؤية، الاستراتيجية",
      titleEn: "Values, Vision, and Strategy",
      contentAr:
        "تلتزم الكلية برؤية واضحة وقيم مؤسسية تعزز النزاهة والتميز والابتكار، وتوجّه خططها الاستراتيجية نحو تنمية مستدامة.",
      contentEn:
        "The college follows a clear vision and institutional values that promote integrity, excellence, and innovation, guiding its strategy toward sustainable development.",
      order: 2,
    },
    {
      id: "campus-visit",
      titleAr: "زيارة الحرم الجامعي",
      titleEn: "Campus Visit",
      contentAr:
        "يوفر الحرم الجامعي مرافق تعليمية متقدمة ومساحات داعمة للتعلم والبحث والأنشطة الطلابية ضمن بيئة آمنة ومحفزة.",
      contentEn:
        "The campus provides advanced learning facilities and supportive spaces for education, research, and student activities in a safe environment.",
      order: 3,
    },
  ],
};

async function seed() {
  try {
    await dbConnect();
    await AboutInstitutionModel.findOneAndUpdate(
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
