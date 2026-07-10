import { Schema, model, models } from 'mongoose';

const NewsSchema = new Schema(
    {
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        excerptAr: { type: String, required: true, trim: true },
        excerptEn: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true },
        category: { type: String, required: true, enum: ['all', 'events', 'academic', 'research', 'partnerships'] },
        image: { type: String, required: true, trim: true },
        readTime: { type: Number, required: true, },
        featured: { type: Boolean, required: true },
        link: { type: String, required: true }
    },
    { timestamps: true }
);

export const NewsModel =
    models.News || model('News', NewsSchema);
