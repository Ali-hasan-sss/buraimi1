import { Schema, model, models } from "mongoose";

const AboutInstitutionItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    contentAr: { type: String, required: true, trim: true },
    contentEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const AboutInstitutionSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    contentAr: { type: String, required: true, trim: true },
    contentEn: { type: String, required: true, trim: true },
    items: { type: [AboutInstitutionItemSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const AboutInstitutionModel =
  models.AboutInstitution || model("AboutInstitution", AboutInstitutionSchema);
