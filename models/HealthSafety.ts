import { Schema, model, models } from "mongoose";

const HealthSafetyObjectiveSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    textAr: { type: String, required: true, trim: true },
    textEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const HealthSafetySchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    sectionSubtitleAr: { type: String, required: true, trim: true },
    sectionSubtitleEn: { type: String, required: true, trim: true },
    introTitleAr: { type: String, required: true, trim: true },
    introTitleEn: { type: String, required: true, trim: true },
    introParagraph1Ar: { type: String, required: true, trim: true },
    introParagraph1En: { type: String, required: true, trim: true },
    introParagraph2Ar: { type: String, required: true, trim: true },
    introParagraph2En: { type: String, required: true, trim: true },
    objectivesTitleAr: { type: String, required: true, trim: true },
    objectivesTitleEn: { type: String, required: true, trim: true },
    objectives: { type: [HealthSafetyObjectiveSchema], required: true, default: [] },
    responsibilitiesTitleAr: { type: String, required: true, trim: true },
    responsibilitiesTitleEn: { type: String, required: true, trim: true },
    committeeTitleAr: { type: String, required: true, trim: true },
    committeeTitleEn: { type: String, required: true, trim: true },
    committeeTextAr: { type: String, required: true, trim: true },
    committeeTextEn: { type: String, required: true, trim: true },
    supervisorsTitleAr: { type: String, required: true, trim: true },
    supervisorsTitleEn: { type: String, required: true, trim: true },
    supervisorsText1Ar: { type: String, required: true, trim: true },
    supervisorsText1En: { type: String, required: true, trim: true },
    supervisorsText2Ar: { type: String, required: true, trim: true },
    supervisorsText2En: { type: String, required: true, trim: true },
    staffStudentsTitleAr: { type: String, required: true, trim: true },
    staffStudentsTitleEn: { type: String, required: true, trim: true },
    staffStudentsTextAr: { type: String, required: true, trim: true },
    staffStudentsTextEn: { type: String, required: true, trim: true },
    badge1Ar: { type: String, required: true, trim: true },
    badge1En: { type: String, required: true, trim: true },
    badge2Ar: { type: String, required: true, trim: true },
    badge2En: { type: String, required: true, trim: true },
    badge3Ar: { type: String, required: true, trim: true },
    badge3En: { type: String, required: true, trim: true },
    badge4Ar: { type: String, required: true, trim: true },
    badge4En: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const HealthSafetyModel =
  models.HealthSafety || model("HealthSafety", HealthSafetySchema);
