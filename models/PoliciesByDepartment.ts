import { Schema, model, models } from "mongoose";

const PolicyItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    file: { type: String, required: true, trim: true, default: "#" },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const PolicyDepartmentSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
    policies: { type: [PolicyItemSchema], required: true, default: [] },
  },
  { _id: false },
);

const PoliciesByDepartmentSchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    sectionSubtitleAr: { type: String, required: true, trim: true },
    sectionSubtitleEn: { type: String, required: true, trim: true },
    departments: { type: [PolicyDepartmentSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const PoliciesByDepartmentModel =
  models.PoliciesByDepartment ||
  model("PoliciesByDepartment", PoliciesByDepartmentSchema);
