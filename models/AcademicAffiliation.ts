import { Schema, model, models } from "mongoose";

const PartnerUniversitySchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    nameAr: { type: String, required: true, trim: true },
    nameEn: { type: String, required: true, trim: true },
    countryAr: { type: String, required: true, trim: true },
    countryEn: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, trim: true, default: "" },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const AcademicAffiliationSchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    introAr: { type: String, required: true, trim: true },
    introEn: { type: String, required: true, trim: true },
    highlightedAr: { type: String, required: true, trim: true },
    highlightedEn: { type: String, required: true, trim: true },
    qualityTitleAr: { type: String, required: true, trim: true },
    qualityTitleEn: { type: String, required: true, trim: true },
    qualityTextAr: { type: String, required: true, trim: true },
    qualityTextEn: { type: String, required: true, trim: true },
    partnersTitleAr: { type: String, required: true, trim: true },
    partnersTitleEn: { type: String, required: true, trim: true },
    cardFeaturesAr: { type: [String], required: true, default: [] },
    cardFeaturesEn: { type: [String], required: true, default: [] },
    badgeTitleAr: { type: String, required: true, trim: true },
    badgeTitleEn: { type: String, required: true, trim: true },
    badgeTextAr: { type: String, required: true, trim: true },
    badgeTextEn: { type: String, required: true, trim: true },
    partners: { type: [PartnerUniversitySchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const AcademicAffiliationModel =
  models.AcademicAffiliation ||
  model("AcademicAffiliation", AcademicAffiliationSchema);
