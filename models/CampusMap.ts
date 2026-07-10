import { Schema, model, models } from "mongoose";

const LegendItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    labelAr: { type: String, required: true, trim: true },
    labelEn: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const SafetyItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    textAr: { type: String, required: true, trim: true },
    textEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const ContactCardSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    textAr: { type: String, required: true, trim: true },
    textEn: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    iconKey: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const CampusMapSchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    sectionSubtitleAr: { type: String, required: true, trim: true },
    sectionSubtitleEn: { type: String, required: true, trim: true },
    introAr: { type: String, required: true, trim: true },
    introEn: { type: String, required: true, trim: true },
    mapImage: { type: String, required: true, trim: true },
    mapAltAr: { type: String, required: true, trim: true },
    mapAltEn: { type: String, required: true, trim: true },
    legendTitleAr: { type: String, required: true, trim: true },
    legendTitleEn: { type: String, required: true, trim: true },
    legendItems: { type: [LegendItemSchema], required: true, default: [] },
    safetyTitleAr: { type: String, required: true, trim: true },
    safetyTitleEn: { type: String, required: true, trim: true },
    safetyItems: { type: [SafetyItemSchema], required: true, default: [] },
    contacts: { type: [ContactCardSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const CampusMapModel = models.CampusMap || model("CampusMap", CampusMapSchema);
