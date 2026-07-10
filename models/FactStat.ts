import { Schema, model, models } from "mongoose";

const FactStatSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    value: { type: Number, required: true, min: 0, default: 0 },
    suffixAr: { type: String, trim: true, default: "" },
    suffixEn: { type: String, trim: true, default: "" },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const FactStat = models.FactStat || model("FactStat", FactStatSchema);
