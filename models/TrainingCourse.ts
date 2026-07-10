import mongoose, { Schema, Document } from "mongoose";

export const FIELD_IDS = [
  "entrepreneurship",
  "english",
  "customer_service",
  "marketing",
  "logistics",
  "law",
  "hr",
  "strategic_planning",
  "finance_accounting",
  "quality",
  "professional_courses",
] as const;

export type FieldId = (typeof FIELD_IDS)[number];

export interface ITrainingCourse extends Document {
  titleAr: string;
  titleEn: string;
  durationAr: string;
  durationEn: string;
  fieldId: FieldId;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingCourseSchema = new Schema<ITrainingCourse>(
  {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    durationAr: { type: String, required: true },
    durationEn: { type: String, required: true },
    fieldId: { type: String, enum: FIELD_IDS, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TrainingCourseModel =
  mongoose.models.TrainingCourse ||
  mongoose.model<ITrainingCourse>("TrainingCourse", TrainingCourseSchema);

export default TrainingCourseModel;
