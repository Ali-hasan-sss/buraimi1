import { Schema, model, models } from 'mongoose';

const EmailOtpSchema = new Schema(
    {
        email: { type: String, required: true, index: true },
        purpose: { type: String, required: true, enum: ['login', 'register'] },
        codeHash: { type: String, required: true },
        expiresAt: { type: Date, required: true, index: true },
        attempts: { type: Number, required: true, default: 0 },
        payload: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

EmailOtpSchema.index({ email: 1, purpose: 1 });
EmailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailOtp = models.EmailOtp || model('EmailOtp', EmailOtpSchema);
