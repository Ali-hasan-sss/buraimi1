import { Schema, model, models, Document } from 'mongoose';

export interface IPrivacySection {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    order: number;
}

export interface IPrivacyPolicy extends Document {
    studentTitleAr: string;
    studentTitleEn: string;
    studentIntroAr: string;
    studentIntroEn: string;
    studentSections: IPrivacySection[];
    staffTitleAr: string;
    staffTitleEn: string;
    staffIntroAr: string;
    staffIntroEn: string;
    staffSections: IPrivacySection[];
    lastUpdated: Date;
}

const SectionSchema = new Schema<IPrivacySection>(
    {
        id: { type: String, required: true },
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        contentAr: { type: String, required: true, trim: true },
        contentEn: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
    },
    { _id: false },
);

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
    {
        studentTitleAr: { type: String, default: 'سياسة الخصوصية للطلاب', trim: true },
        studentTitleEn: { type: String, default: 'Student Privacy Policy', trim: true },
        studentIntroAr: { type: String, default: '', trim: true },
        studentIntroEn: { type: String, default: '', trim: true },
        studentSections: { type: [SectionSchema], default: [] },
        staffTitleAr: { type: String, default: 'سياسة الخصوصية للموظفين', trim: true },
        staffTitleEn: { type: String, default: 'Staff Privacy Policy', trim: true },
        staffIntroAr: { type: String, default: '', trim: true },
        staffIntroEn: { type: String, default: '', trim: true },
        staffSections: { type: [SectionSchema], default: [] },
        lastUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export const PrivacyPolicyModel =
    models.PrivacyPolicy || model<IPrivacyPolicy>('PrivacyPolicy', PrivacyPolicySchema);
