import { Schema, model, models } from "mongoose";

const GraduateProgramSchema = new Schema(
  {
    /** معرّف في المسار العام: /main/graduate-studies/[slug] */
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    descriptionAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true, trim: true },
    affiliationAr: { type: String, trim: true, default: "" },
    affiliationEn: { type: String, trim: true, default: "" },
    /** تدرج Tailwind للبطاقة، مثل from-red-600 to-red-700 */
    color: { type: String, trim: true, default: "from-[#254151] to-[#6096b4]" },
    /** لون سداسي لواجهة الكاروسيل (نقاط التنقل) */
    accentColor: { type: String, trim: true, default: "#254151" },
    /** صورة الكاروسيل في الصفحة الرئيسية */
    carouselImage: { type: String, trim: true, default: "" },
    specializationsAr: { type: String, trim: true, default: "" },
    specializationsEn: { type: String, trim: true, default: "" },
    feesAr: { type: String, trim: true, default: "" },
    feesEn: { type: String, trim: true, default: "" },
    creditsAr: { type: String, trim: true, default: "" },
    creditsEn: { type: String, trim: true, default: "" },
    totalFeesAr: { type: String, trim: true, default: "" },
    totalFeesEn: { type: String, trim: true, default: "" },
    featuresAr: { type: [String], default: [] },
    featuresEn: { type: [String], default: [] },
    order: { type: Number, default: 0, index: true },

    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const GraduateProgramModel =
  models.GraduateProgram || model("GraduateProgram", GraduateProgramSchema);
