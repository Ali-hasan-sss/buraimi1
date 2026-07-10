import mongoose, { Schema, Document } from "mongoose";

export interface IExamType extends Document {
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExamTypeSchema = new Schema<IExamType>(
  {
    nameAr: {
      type: String,
      required: true,
      trim: true,
    },
    nameEn: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      default: "FileText",
    },
    color: {
      type: String,
      required: true,
      default: "blue",
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ExamType || mongoose.model<IExamType>("ExamType", ExamTypeSchema);
