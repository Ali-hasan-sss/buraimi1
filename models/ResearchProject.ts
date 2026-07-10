import mongoose, { Schema, Document } from "mongoose";

export type ProjectCategory =
  | "ريادة الأعمال"
  | "تقنية المعلومات"
  | "الابتكار والتنافسية"
  | "قانوني"
  | "تعليمي";

export interface IResearchProject extends Document {
  year: string;
  investigator: string;
  titleAr?: string;
  titleEn: string;
  objectives: string;
  category: ProjectCategory;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResearchProjectSchema = new Schema<IResearchProject>(
  {
    year: { type: String, required: true },
    investigator: { type: String, required: true },
    titleAr: { type: String },
    titleEn: { type: String, required: true },
    objectives: { type: String, required: true },
    category: {
      type: String,
      enum: ["ريادة الأعمال", "تقنية المعلومات", "الابتكار والتنافسية", "قانوني", "تعليمي"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ResearchProject =
  mongoose.models.ResearchProject ||
  mongoose.model<IResearchProject>("ResearchProject", ResearchProjectSchema);

export default ResearchProject;
