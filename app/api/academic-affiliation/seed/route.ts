import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AcademicAffiliationModel } from "@/models/AcademicAffiliation";

const SEED_DATA = {
  sectionTitleAr: "الارتباط الأكاديمي",
  sectionTitleEn: "Academic Affiliation",
  introAr:
    "انطلاقا من الدور الأساسي الذي تلعبه المؤسسات التعليمية في توفير احتياجات المجتمع من المتخصصين والخبراء في مختلف المجالات العلمية والتقنية، ونظرا للتطورات الهائلة التي يشهدها عالمنا المعاصر في مختلف جوانب المعرفة، حرصت كلية البريمي الجامعية على الاستفادة من خبرات الآخرين.",
  introEn:
    "Recognizing the vital role educational institutions play in meeting community needs with qualified specialists and experts, and in light of the rapid developments across knowledge domains, Al Buraimi University College has been keen to benefit from global expertise.",
  highlightedAr:
    "لذلك اخترنا جامعة ولاية كاليفورنيا، نورثريدج، وجامعة عين شمس، والجامعة الأردنية. وتعد هذه الجامعات من المؤسسات العريقة ذات التاريخ الطويل والكفاءة العلمية إقليميًا ودوليًا.",
  highlightedEn:
    "For this reason, we selected California State University, Northridge, Ain Shams University, and the University of Jordan. These are prestigious institutions with a long history and strong academic reputation regionally and internationally.",
  qualityTitleAr: "ضمانات الجودة التعليمية",
  qualityTitleEn: "Educational Quality Assurance",
  qualityTextAr:
    "تمثل هذه الشراكات أحد أهم ضمانات الجودة التعليمية من خلال الإشراف الأكاديمي ومتابعة البرامج الدراسية، بما يضمن مستوى تعليم جامعي معترفًا به دوليًا.",
  qualityTextEn:
    "These partnerships represent a key quality assurance pillar through academic supervision and program follow-up, ensuring internationally recognized university-level education.",
  partnersTitleAr: "جامعاتنا الشريكة",
  partnersTitleEn: "Our Partner Universities",
  cardFeaturesAr: ["إشراف ومتابعة أكاديمية", "معايير دولية معتمدة", "شراكة استراتيجية"],
  cardFeaturesEn: [
    "Academic supervision and follow-up",
    "Internationally recognized standards",
    "Strategic partnership",
  ],
  badgeTitleAr: "جودة تعليمية معترف بها دوليًا",
  badgeTitleEn: "Internationally Recognized Educational Quality",
  badgeTextAr:
    "برامج دراسية وفق المستويات الأكاديمية العالمية مع إشراف مباشر من جامعات عريقة ذات تاريخ طويل وكفاءة علمية على المستوى الإقليمي والدولي.",
  badgeTextEn:
    "Study programs aligned with global academic standards, with direct oversight from prestigious universities with long-standing regional and international academic excellence.",
  partners: [
    {
      id: "ain-shams",
      nameAr: "جامعة عين شمس",
      nameEn: "Ain Shams University",
      countryAr: "جمهورية مصر العربية",
      countryEn: "Arab Republic of Egypt",
      image:
        "https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      order: 0,
    },
    {
      id: "jordan-university",
      nameAr: "الجامعة الأردنية",
      nameEn: "University of Jordan",
      countryAr: "المملكة الأردنية الهاشمية",
      countryEn: "Hashemite Kingdom of Jordan",
      image:
        "https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      order: 1,
    },
    {
      id: "csun",
      nameAr: "جامعة ولاية كاليفورنيا، نورثريدج",
      nameEn: "California State University, Northridge",
      countryAr: "الولايات المتحدة الأمريكية",
      countryEn: "United States of America",
      image:
        "https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      order: 2,
    },
  ],
};

async function seed() {
  try {
    await dbConnect();
    await AcademicAffiliationModel.findOneAndUpdate(
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
