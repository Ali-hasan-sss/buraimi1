import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema({
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
}, { timestamps: true }
)

export const contactModel = models.Contact || model("Contact", ContactSchema)