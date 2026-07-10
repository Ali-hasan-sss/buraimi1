import { model, models, Schema } from "mongoose";

const MessageParagraphSchema = new Schema({
    textEn: { type: String, required: true, trim: true },
    textAr: { type: String, required: true, trim: true },
}, { _id: false });

const RoleInfoSchema = new Schema({
    positionEn: { type: String, required: true, trim: true },
    positionAr: { type: String, required: true, trim: true },
    nameEn: { type: String, required: true, trim: true },
    nameAr: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    paragraphs: { type: [MessageParagraphSchema], required: true },
}, { _id: false });

const MessageSchema = new Schema({
    chairman: { type: RoleInfoSchema, required: true },
    dean: { type: RoleInfoSchema, required: true },
}, { timestamps: true });

export const messageModel = models.Message || model("Message", MessageSchema)
