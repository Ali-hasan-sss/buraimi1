import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AcademicAffiliationModel } from "@/models/AcademicAffiliation";

const DEFAULT_DOC = {
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
  partners: [],
};

async function ensureDoc() {
  let doc = await AcademicAffiliationModel.findOne({}).lean();
  if (!doc) {
    await AcademicAffiliationModel.create(DEFAULT_DOC);
    doc = await AcademicAffiliationModel.findOne({}).lean();
  }
  return doc;
}

export async function GET() {
  try {
    await dbConnect();
    const doc = await ensureDoc();
    return NextResponse.json({ ok: true, data: doc });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const payload = {
      sectionTitleAr: String(body?.sectionTitleAr || "").trim(),
      sectionTitleEn: String(body?.sectionTitleEn || "").trim(),
      introAr: String(body?.introAr || "").trim(),
      introEn: String(body?.introEn || "").trim(),
      highlightedAr: String(body?.highlightedAr || "").trim(),
      highlightedEn: String(body?.highlightedEn || "").trim(),
      qualityTitleAr: String(body?.qualityTitleAr || "").trim(),
      qualityTitleEn: String(body?.qualityTitleEn || "").trim(),
      qualityTextAr: String(body?.qualityTextAr || "").trim(),
      qualityTextEn: String(body?.qualityTextEn || "").trim(),
      partnersTitleAr: String(body?.partnersTitleAr || "").trim(),
      partnersTitleEn: String(body?.partnersTitleEn || "").trim(),
      cardFeaturesAr: Array.isArray(body?.cardFeaturesAr)
        ? body.cardFeaturesAr.map((x: unknown) => String(x || "").trim()).filter(Boolean)
        : [],
      cardFeaturesEn: Array.isArray(body?.cardFeaturesEn)
        ? body.cardFeaturesEn.map((x: unknown) => String(x || "").trim()).filter(Boolean)
        : [],
      badgeTitleAr: String(body?.badgeTitleAr || "").trim(),
      badgeTitleEn: String(body?.badgeTitleEn || "").trim(),
      badgeTextAr: String(body?.badgeTextAr || "").trim(),
      badgeTextEn: String(body?.badgeTextEn || "").trim(),
      partners: Array.isArray(body?.partners)
        ? body.partners.map((partner: unknown, index: number) => {
            const p = partner as Record<string, unknown>;
            return {
              id: String(p.id || `partner-${index + 1}`).trim(),
              nameAr: String(p.nameAr || "").trim(),
              nameEn: String(p.nameEn || "").trim(),
              countryAr: String(p.countryAr || "").trim(),
              countryEn: String(p.countryEn || "").trim(),
              image: String(p.image || "").trim(),
              link: String(p.link || "").trim(),
              order: Number.isFinite(Number(p.order)) ? Number(p.order) : index,
            };
          })
        : [],
    };

    const updated = await AcademicAffiliationModel.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true },
    ).lean();

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
