import mongoose, { Schema, Document } from "mongoose";

export interface IPracticePlacementTest extends Document {
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  examTypeId: mongoose.Types.ObjectId;
  language: "ar" | "en";
  duration: number;
  examType: "computerized" | "paper";
  color: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PracticePlacementTestSchema = new Schema<IPracticePlacementTest>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    titleAr: {
      type: String,
      required: true,
      trim: true,
    },
    titleEn: {
      type: String,
      required: true,
      trim: true,
    },
    subtitleAr: {
      type: String,
      required: true,
      trim: true,
    },
    subtitleEn: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionAr: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionEn: {
      type: String,
      required: true,
      trim: true,
    },
    examTypeId: {
      type: Schema.Types.ObjectId,
      ref: "ExamType",
      required: true,
    },
    language: {
      type: String,
      enum: ["ar", "en"],
      required: true,
      default: "en",
    },
    duration: {
      type: Number,
      required: true,
      default: 50,
    },
    examType: {
      type: String,
      enum: ["computerized", "paper"],
      required: true,
      default: "computerized",
    },
    color: {
      type: String,
      required: true,
      default: "blue",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PracticePlacementTest ||
  mongoose.model<IPracticePlacementTest>("PracticePlacementTest", PracticePlacementTestSchema);
