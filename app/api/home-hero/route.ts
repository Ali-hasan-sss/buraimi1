import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { HomeHeroModel } from "@/models/HomeHero";

type HeroAnnouncement = {
  image: string;
  titleAr: string;
  titleEn: string;
  dateTextAr: string;
  dateTextEn: string;
  /** رابط بطاقة الإعلان */
  link: string;
};

type HeroPayload = {
  slides: Array<{
    image: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    ctaTextAr: string;
    ctaTextEn: string;
    ctaLink: string;
  }>;
  /** `null` = لا يوجد إعلان */
  announcement: HeroAnnouncement | null;
  autoplayMs: number;
};

const defaultAnnouncement: HeroAnnouncement = {
  image: "/assets/studentCampusImage.webp",
  titleAr: "قدّم الآن! برنامج الدراسات العليا",
  titleEn: "Apply now! Graduate Studies Program",
  dateTextAr: "4 فبراير 2026",
  dateTextEn: "February 4, 2026",
  link: "",
};

const defaultHero: HeroPayload = {
  slides: [
    {
      image: "/assets/landing/slider/slider-1.webp",
      titleAr: "مرحباً بكم في كلية البريمي الجامعية",
      titleEn: "Welcome to Al Buraimi University College (BUC)",
      subtitleAr: "اكتشف مستقبلك في كلية البريمي الجامعية",
      subtitleEn:
        "Discover your future at BUC — next admission cycle coming soon!",
      ctaTextAr: "اكتشف المزيد",
      ctaTextEn: "Discover more",
      ctaLink: "/main/about",
    },
    {
      image: "/assets/landing/slider/slider-2.webp",
      titleAr: "",
      titleEn: "",
      subtitleAr: "",
      subtitleEn: "",
      ctaTextAr: "اكتشف المزيد",
      ctaTextEn: "Discover more",
      ctaLink: "/main/about",
    },
    {
      image: "/assets/landing/slider/slider-3.webp",
      titleAr: "",
      titleEn: "",
      subtitleAr: "",
      subtitleEn: "",
      ctaTextAr: "اكتشف المزيد",
      ctaTextEn: "Discover more",
      ctaLink: "/main/about",
    },
  ],
  announcement: defaultAnnouncement,
  autoplayMs: 4000,
};

type RawSlide = Partial<HeroPayload["slides"][number]> & {
  title?: string;
  subtitle?: string;
  ctaText?: string;
};

type RawDoc = Partial<HeroPayload> & {
  slides?: RawSlide[];
  announcement?:
    | Partial<HeroAnnouncement>
    | null
    | {
        title?: string;
        dateText?: string;
      };
};

function coalesceStr(v: unknown, fallback: string): string {
  if (v === undefined || v === null) return fallback;
  return String(v).trim();
}

function normalizeSlideStrings(s: RawSlide): HeroPayload["slides"][number] {
  return {
    image: String(s?.image || "").trim(),
    titleAr: coalesceStr(s?.titleAr ?? s?.title, ""),
    titleEn: coalesceStr(s?.titleEn ?? s?.title, ""),
    subtitleAr: coalesceStr(s?.subtitleAr ?? s?.subtitle, ""),
    subtitleEn: coalesceStr(s?.subtitleEn ?? s?.subtitle, ""),
    ctaTextAr: coalesceStr(s?.ctaTextAr ?? s?.ctaText, "اكتشف المزيد"),
    ctaTextEn: coalesceStr(s?.ctaTextEn ?? s?.ctaText, "Discover more"),
    ctaLink: coalesceStr(s?.ctaLink, "/main/about"),
  };
}

function normalizeAnnouncement(
  ann: RawDoc["announcement"],
  fallback: HeroAnnouncement,
): HeroAnnouncement | null {
  if (ann === null) return null;
  if (ann === undefined) return { ...fallback };
  if (typeof ann !== "object") return { ...fallback };
  return {
    image: String((ann as HeroAnnouncement).image || fallback.image).trim(),
    titleAr: String(
      (ann as HeroAnnouncement).titleAr ??
        (ann as { title?: string }).title ??
        fallback.titleAr,
    ).trim(),
    titleEn: String(
      (ann as HeroAnnouncement).titleEn ??
        (ann as { title?: string }).title ??
        fallback.titleEn,
    ).trim(),
    dateTextAr: String(
      (ann as HeroAnnouncement).dateTextAr ??
        (ann as { dateText?: string }).dateText ??
        fallback.dateTextAr,
    ).trim(),
    dateTextEn: String(
      (ann as HeroAnnouncement).dateTextEn ??
        (ann as { dateText?: string }).dateText ??
        fallback.dateTextEn,
    ).trim(),
    link: coalesceStr((ann as HeroAnnouncement).link, ""),
  };
}

function normalizeDoc(doc: RawDoc): HeroPayload {
  const slides = Array.isArray(doc?.slides) ? doc.slides : [];
  const announcement = normalizeAnnouncement(
    doc?.announcement,
    defaultAnnouncement,
  );

  return {
    slides: slides.length
      ? slides.map((s: RawSlide) => normalizeSlideStrings(s))
      : defaultHero.slides,
    announcement,
    autoplayMs:
      typeof doc?.autoplayMs === "number" && doc.autoplayMs >= 1500
        ? doc.autoplayMs
        : 4000,
  };
}

export async function GET() {
  try {
    await dbConnect();
    let doc = await HomeHeroModel.findOne().lean();
    if (!doc) {
      doc = await HomeHeroModel.create(defaultHero);
      doc = doc.toObject();
    }
    return NextResponse.json({ ok: true, data: normalizeDoc(doc) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = normalizeDoc(await request.json());
    if (body.slides.some((s) => !s.image)) {
      return NextResponse.json(
        { ok: false, message: "each slide must have image" },
        { status: 400 },
      );
    }

    /**
     * `findOneAndUpdate` مع مصفوفة فرعية لا يضمن دائماً استبدال حقول كل عنصر في `slides`.
     * التحميل ثم `set` + `markModified('slides')` + `save()` يحفظ العنوان والوصف والزر بشكل موثوق.
     */
    let doc = await HomeHeroModel.findOne();
    if (!doc) {
      doc = await HomeHeroModel.create(body);
    } else {
      doc.set({
        slides: body.slides,
        announcement: body.announcement,
        autoplayMs: body.autoplayMs,
      });
      doc.markModified("slides");
      doc.markModified("announcement");
      await doc.save();
    }

    const lean = doc.toObject({ flattenMaps: true });
    return NextResponse.json({ ok: true, data: normalizeDoc(lean as RawDoc) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
