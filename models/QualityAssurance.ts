import { Schema, model, models } from "mongoose";

const QualityObjectiveSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    textAr: { type: String, required: true, trim: true },
    textEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const QualityAssuranceSchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    visionTitleAr: { type: String, required: true, trim: true },
    visionTitleEn: { type: String, required: true, trim: true },
    visionTextAr: { type: String, required: true, trim: true },
    visionTextEn: { type: String, required: true, trim: true },
    missionTitleAr: { type: String, required: true, trim: true },
    missionTitleEn: { type: String, required: true, trim: true },
    missionTextAr: { type: String, required: true, trim: true },
    missionTextEn: { type: String, required: true, trim: true },
    objectivesTitleAr: { type: String, required: true, trim: true },
    objectivesTitleEn: { type: String, required: true, trim: true },
    objectives: { type: [QualityObjectiveSchema], required: true, default: [] },
    qmsTitleAr: { type: String, required: true, trim: true },
    qmsTitleEn: { type: String, required: true, trim: true },
    qmsParagraph1Ar: { type: String, required: true, trim: true },
    qmsParagraph1En: { type: String, required: true, trim: true },
    qmsParagraph2Ar: { type: String, required: true, trim: true },
    qmsParagraph2En: { type: String, required: true, trim: true },
    qmsGoalTitleAr: { type: String, required: true, trim: true },
    qmsGoalTitleEn: { type: String, required: true, trim: true },
    qmsGoalTextAr: { type: String, required: true, trim: true },
    qmsGoalTextEn: { type: String, required: true, trim: true },
    directorNameAr: { type: String, required: true, trim: true },
    directorNameEn: { type: String, required: true, trim: true },
    directorRoleAr: { type: String, required: true, trim: true },
    directorRoleEn: { type: String, required: true, trim: true },
    directorEmail: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const QualityAssuranceModel =
  models.QualityAssurance || model("QualityAssurance", QualityAssuranceSchema);
