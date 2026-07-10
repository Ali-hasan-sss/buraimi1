import { Schema, model, models } from 'mongoose';

const AdvisoryCouncilMemberSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        image: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

if (models.AdvisoryCouncilMember && !models.AdvisoryCouncilMember.schema.paths.image) {
    delete models.AdvisoryCouncilMember;
}

export const AdvisoryCouncilMember =
    models.AdvisoryCouncilMember || model('AdvisoryCouncilMember', AdvisoryCouncilMemberSchema);
