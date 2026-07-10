import mongoose, { Schema, Document } from "mongoose";

export interface ISeminar extends Document {
  academicYearAr: string;
  academicYearEn: string;
  departmentAr: string;
  departmentEn: string;
  presenterAr: string;
  presenterEn: string;
  titleAr: string;
  titleEn: string;
  date: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SeminarSchema = new Schema<ISeminar>(
  {
    academicYearAr: { type: String, required: true },
    academicYearEn: { type: String, required: true },
    departmentAr: { type: String, required: true },
    departmentEn: { type: String, required: true },
    presenterAr: { type: String, required: true },
    presenterEn: { type: String, required: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    date: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Seminar = mongoose.models.Seminar || mongoose.model<ISeminar>("Seminar", SeminarSchema);

export default Seminar;
