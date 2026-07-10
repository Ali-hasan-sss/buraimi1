import mongoose, { Schema, Document } from "mongoose";

export type PublicationType = "journal" | "book" | "chapter" | "conference";

export interface IPublication extends Document {
  title: string;
  type: PublicationType;
  details: string;
  author: string;
  year?: string;
  indexed: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["journal", "book", "chapter", "conference"], required: true },
    details: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: String },
    indexed: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Publication = mongoose.models.Publication || mongoose.model<IPublication>("Publication", PublicationSchema);

export default Publication;
