import { Schema, model, models } from "mongoose";

const GraduateAttributeItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    descriptionAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const GraduateAttributesSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    descriptionAr: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true, trim: true },
    listTitleAr: { type: String, required: true, trim: true },
    listTitleEn: { type: String, required: true, trim: true },
    footerTitleAr: { type: String, required: true, trim: true },
    footerTitleEn: { type: String, required: true, trim: true },
    footerTextAr: { type: String, required: true, trim: true },
    footerTextEn: { type: String, required: true, trim: true },
    attributes: { type: [GraduateAttributeItemSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const GraduateAttributesModel =
  models.GraduateAttributes || model("GraduateAttributes", GraduateAttributesSchema);
