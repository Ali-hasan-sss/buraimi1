import { Schema, model, models } from 'mongoose';

const CollegeCouncilMemberSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        image: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

if (models.CollegeCouncilMember && !models.CollegeCouncilMember.schema.paths.image) {
    delete models.CollegeCouncilMember;
}

export const CollegeCouncilMember =
    models.CollegeCouncilMember || model('CollegeCouncilMember', CollegeCouncilMemberSchema);
