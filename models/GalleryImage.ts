import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  url: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    categoryAr: { type: String, required: true },
    categoryEn: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const GalleryImageModel =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export default GalleryImageModel;
