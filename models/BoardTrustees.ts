import { Schema, model, models } from 'mongoose';

const BoardTrusteeSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        image: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

// Next.js keeps `mongoose.models` across HMR; an older schema without `image` would strip the field on save.
if (models.BoardTrustee && !models.BoardTrustee.schema.paths.image) {
    delete models.BoardTrustee;
}

export const BoardTrustee = models.BoardTrustee || model('BoardTrustee', BoardTrusteeSchema);
