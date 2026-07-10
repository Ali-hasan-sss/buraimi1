import { Schema, model, models } from "mongoose";

const ResearchHighlightSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    type: { type: String, required: true, enum: ["research", "award"], default: "research" },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    summaryAr: { type: String, required: true, trim: true },
    summaryEn: { type: String, required: true, trim: true },
    contentAr: { type: String, required: true, trim: true },
    contentEn: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const ResearchHighlightModel =
  models.ResearchHighlight || model("ResearchHighlight", ResearchHighlightSchema);
