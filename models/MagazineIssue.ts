import mongoose, { Schema, Document } from "mongoose";

export interface IMagazineIssue extends Document {
  titleAr: string;
  titleEn: string;
  issueNumberAr: string;
  issueNumberEn: string;
  coverImage: string;
  fileUrl?: string;
  fileName?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MagazineIssueSchema = new Schema<IMagazineIssue>(
  {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    issueNumberAr: { type: String, required: true },
    issueNumberEn: { type: String, required: true },
    coverImage: { type: String, required: true },
    fileUrl: { type: String },
    fileName: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MagazineIssueModel =
  mongoose.models.MagazineIssue ||
  mongoose.model<IMagazineIssue>("MagazineIssue", MagazineIssueSchema);

export default MagazineIssueModel;
