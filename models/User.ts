// models/User.ts
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    age: { type: Number, required: false },
    email: { type: String, unique: true, sparse: true, required: false },
    password: { type: String, required: false },
    role: { type: String, enum: ['admin', 'student', 'staff'], default: 'admin', required: true },
    accessCode: { type: String, unique: true, sparse: true, required: false },
}, { timestamps: true });

// Crucial: check if model exists before creating it to avoid Next.js errors
export const User = models.User || model('User', UserSchema);