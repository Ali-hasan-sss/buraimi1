import { Schema, model, models } from 'mongoose';

const careersSchema = new Schema(
    {
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        descriptionAr: { type: String, required: true }, // HTML string, no trim
        descriptionEn: { type: String, required: true }, // HTML string, no trim
        requirementsAr: { type: String, required: true, default: "" }, // HTML string, no trim
        requirementsEn: { type: String, required: true, default: "" }, // HTML string, no trim
        startDate: { type: Date, required: true },
        edDate: { type: Date, required: true },
    },
    { timestamps: true }
);

export const CareersModel =
    models.careers || model('careers', careersSchema);
