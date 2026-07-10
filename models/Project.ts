// models/Project.ts
import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    // This is your "Foreign Key" pointing to the User
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export const Project = models.Project || model('Project', ProjectSchema);