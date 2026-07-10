import mongoose, { Schema, Document } from "mongoose";

export interface IEditorialMember extends Document {
  positionAr: string;
  positionEn: string;
  name: string;
  email: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EditorialMemberSchema = new Schema<IEditorialMember>(
  {
    positionAr: { type: String, required: true },
    positionEn: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const EditorialMemberModel =
  mongoose.models.EditorialMember ||
  mongoose.model<IEditorialMember>("EditorialMember", EditorialMemberSchema);

export default EditorialMemberModel;
