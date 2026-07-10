import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { AdvisoryCouncilMember } from '@/models/AdvisoryCouncil';

export const runtime = 'nodejs';

const SEED_ADVISORY_COUNCIL = [
    { name: 'مساعد العميد للشؤون الأكاديمية والبحث العلمي', role: 'نائب رئيس المجلس الاستشاري', description: '' },
    { name: 'الأستاذ الدكتور ياسر فؤاد', role: 'رئيس المجلس الاستشاري مع القطاع الصناعي', description: 'عميد كلية البريمي الجامعية' },
    { name: 'مدير برنامج القانون', role: 'عضو', description: '' },
    { name: 'رئيس قسم إدارة الأعمال والمحاسبة', role: 'عضو', description: '' },
    { name: 'رئيس قسم تقنية المعلومات', role: 'عضو', description: '' },
    { name: 'رئيس قسم اللغة الإنجليزية', role: 'عضو', description: '' },
    {
        name: 'د. وليد البرماني',
        role: 'industry',
        description: 'عضو بلجنة التعليم والبحث العلمي بغرفة تجارة وصناعة عمان – ومستشارا لبرنامج القانون',
    },
    { name: 'د. حمد بن حمدان الربيعي', role: 'industry', description: 'رئيس جمعية المحاميين العمانية - مستشارا لبرنامج القانون' },
    { name: 'سيف بن هاشل الغريبي', role: 'industry', description: 'محامي - مستشارا لبرنامج القانون' },
    {
        name: 'محمد علي سالم الشيزاوي',
        role: 'industry',
        description: 'المدير التنفيذي للموارد البشرية بميناء صحار والمنطقة الحرة - مستشارا لقسم إدارة الأعمال والمحاسبة',
    },
    {
        name: 'بيجوي جوزاف بولاتو',
        role: 'industry',
        description: 'مدير المبيعات الوطنية بمتاجر الريف ومستشاراً لقسم إدارة الأعمال والمحاسبة',
    },
    { name: 'رشاد بن منصور الوهيبي', role: 'industry', description: 'المدير التنفيذي للموارد البشرية بميناء صحار والمنطقة الحرة' },
    { name: 'عناد البلوشي', role: 'industry', description: 'مسؤول حماية البيانات في بنك مسقط - مستشارا لقسم تقنية المعلومات' },
    {
        name: 'هشام بن سعيد النيامي',
        role: 'industry',
        description: 'مهندس أول لتكنولوجيا المعلومات والأمن السيبراني بشركة أكواب اور - مستشارا لقسم تقنية المعلومات',
    },
    {
        name: 'خالد بن عبد الله الساعدي',
        role: 'industry',
        description: 'مهندس مجال النظام بوزارة التجارة والصناعة وترويج الاستثمار - مستشارا لقسم تقنية المعلومات',
    },
    {
        name: 'مريم بنت حمد بن سعيد المعمري',
        role: 'industry',
        description: 'مدير المعجم الدولي للترجمة القانونية - مستشارا لقسم اللغة الإنجليزية',
    },
    { name: 'نعيمة بنت سالم بن صالح الكندي', role: 'industry', description: 'مشرف أول لغة انجليزية - مستشارا لقسم اللغة الانجليزية' },
    {
        name: 'عماد ماهر',
        role: 'industry',
        description: 'المنسق الأكاديمي للبرامج الدولية بمدرسة توام العالمية الخاصة- مستشارا لقسم اللغة الانجليزية',
    },
] as const;

async function seed() {
    try {
        await dbConnect();

        const operations = SEED_ADVISORY_COUNCIL.map((m) => ({
            updateOne: {
                filter: { name: m.name },
                update: { $set: { name: m.name, role: m.role, description: m.description } },
                upsert: true,
            },
        }));

        const result = await AdvisoryCouncilMember.bulkWrite(operations);

        return NextResponse.json({ ok: true, result });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function GET(_request: Request) {
    void _request;
    return seed();
}

export async function POST(_request: Request) {
    void _request;
    return seed();
}
