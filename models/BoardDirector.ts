import { Schema, model, models } from 'mongoose';

const BoardDirectorSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        image: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

if (models.BoardDirector && !models.BoardDirector.schema.paths.image) {
    delete models.BoardDirector;
}

export const BoardDirector = models.BoardDirector || model('BoardDirector', BoardDirectorSchema);
