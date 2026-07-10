import mongoose, { model, Schema } from "mongoose";

const HeroSlideSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    titleAr: { type: String, default: "", trim: true },
    titleEn: { type: String, default: "", trim: true },
    subtitleAr: { type: String, default: "", trim: true },
    subtitleEn: { type: String, default: "", trim: true },
    ctaTextAr: { type: String, default: "", trim: true },
    ctaTextEn: { type: String, default: "", trim: true },
    ctaLink: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const HeroAnnouncementSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    titleAr: { type: String, default: "", trim: true },
    titleEn: { type: String, default: "", trim: true },
    dateTextAr: { type: String, default: "", trim: true },
    dateTextEn: { type: String, default: "", trim: true },
    /** رابط عند النقر على بطاقة الإعلان */
    link: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const HomeHeroSchema = new Schema(
  {
    slides: { type: [HeroSlideSchema], required: true, default: [] },
    /** إذا كان `null` لا يُعرض الإعلان في الواجهة */
    announcement: {
      type: HeroAnnouncementSchema,
      required: false,
      default: null,
    },
    autoplayMs: { type: Number, required: true, default: 4000 },
  },
  { timestamps: true },
);

export const HOME_HERO_MODEL = "HomeHero";

/** إعادة تسجيل المخطط بعد التعديل (وإلا يبقى Mongoose في ذاكرة Next.js بنمط قديم يستخدم `title`/`dateText`) */
if (mongoose.models[HOME_HERO_MODEL]) {
  delete mongoose.models[HOME_HERO_MODEL];
}

export const HomeHeroModel =
  mongoose.models[HOME_HERO_MODEL] || model(HOME_HERO_MODEL, HomeHeroSchema);
