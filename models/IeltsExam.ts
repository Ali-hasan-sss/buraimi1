import mongoose, { Schema, Document } from "mongoose";

export interface IIeltsExam extends Document {
  monthAr: string;
  monthEn: string;
  date: string;
  module: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IeltsExamSchema = new Schema<IIeltsExam>(
  {
    monthAr: { type: String, required: true },
    monthEn: { type: String, required: true },
    date: { type: String, required: true },
    module: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const IeltsExamModel =
  mongoose.models.IeltsExam ||
  mongoose.model<IIeltsExam>("IeltsExam", IeltsExamSchema);

export default IeltsExamModel;
