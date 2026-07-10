import { Schema, model, models } from 'mongoose';

const PartnershipSchema = new Schema(
    {
        order: { type: Number, required: true, index: true, unique: true },
        name: { type: String, required: true, trim: true },
        nameEn: { type: String, trim: true, default: '' },
        logo: { type: String, trim: true, default: '' },
        type: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
        date: { type: String, trim: true, default: '' },
        link: { type: String, trim: true, default: '', required: false },
        international: { type: Boolean, default: false },
    },
    { timestamps: true }
);

if (models.Partnership && !models.Partnership.schema.paths.logo) {
    delete models.Partnership;
}

export const Partnership = models.Partnership || model('Partnership', PartnershipSchema);
