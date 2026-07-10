import { Schema, model, models } from "mongoose";

const PlansReportItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    summaryAr: { type: String, required: true, trim: true },
    summaryEn: { type: String, required: true, trim: true },
    file: { type: String, required: false, trim: true, default: "" },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const PlansReportsSchema = new Schema(
  {
    items: { type: [PlansReportItemSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const PlansReportsModel =
  models.PlansReports || model("PlansReports", PlansReportsSchema);
