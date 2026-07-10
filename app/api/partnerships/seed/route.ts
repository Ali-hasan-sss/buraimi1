import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { Partnership } from '@/models/Partnership';

export const runtime = 'nodejs';

const SEED_PARTNERSHIPS = [
    {
        partnerId: 1,
        name: 'وزارة التعليم العالي والبحث العلمي والابتكار – سلطنة عمان',
        nameEn: 'Ministry of Higher Education, Research and Innovation - Oman',
        type: 'اتفاقية المنح الداخلية',
        description: 'منح دراسية مجانية لطلاب الدبلوم العام',
        date: '12-تموز-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 2,
        name: 'جامعة ولاية كاليفورنيا ، نورثريدج',
        nameEn: 'California State University, Northridge (CSUN)',
        type: 'اتفاقية الانتساب الأكاديمي',
        description: 'شراكة أكاديمية استراتيجية',
        date: '',
        international: true,
        link: '',
    },
    {
        partnerId: 3,
        name: 'جامعة عين شمس',
        nameEn: 'Ain Shams University',
        type: 'اتفاقيات متعددة',
        description:
            'اتفاقية الإرتباط الأكاديمي – درجة البكالوريوس في القانون، درجة الماجستير في القانون، درجة الدكتوراة في القانون، كلية الآداب، كلية الإعلام والاتصال الجماهيري',
        date: '12-ديسيمبر-2016، 07-نوفيمبر-2024',
        international: true,
        link: '',
    },
    {
        partnerId: 4,
        name: 'الجامعة الأردنية',
        nameEn: 'University of Jordan',
        type: 'اتفاقيات أكاديمية وتدريب',
        description:
            'اتفاقية الإرتباط الأكاديمي – درجة البكالوريوس في إقتصاد الأعمال، اتفاقية ماجستير إدارة الأعمال، اتفاقية التدريب',
        date: '28-نوفيمبر-2016',
        international: true,
        link: '',
    },
    {
        partnerId: 5,
        name: 'الجامعة الألمانية للتكنولوجيا',
        nameEn: 'German University of Technology (GUtech)',
        type: 'شراكة تكنولوجية',
        description: 'تعاون في مجال التكنولوجيا والهندسة',
        date: '',
        international: true,
        link: '',
    },
    {
        partnerId: 6,
        name: 'الكلية العالمية للهندسة والتكنولوجيا',
        nameEn: 'Global College of Engineering and Technology (GCET)',
        type: 'شراكة تعليمية',
        description: 'تعاون في المجالات الهندسية والتقنية',
        date: '18-فبراير-2024',
        international: true,
        link: '',
    },
    {
        partnerId: 7,
        name: 'هيئة البيئة',
        nameEn: 'Environment Authority',
        type: 'تعاون بيئي',
        description: 'التعاون في المجالات البيئية والاستدامة',
        date: '22-فبراير-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 8,
        name: 'الشركة العمانية للاتصالات - عمانتل',
        nameEn: 'Omantel',
        type: 'تدريب الطلبة',
        description: 'التعاون بين كلية البريمي الجامعية وعمانتل لتدريب الطلبة الخريجين',
        date: '14-ديسيمبر-2023',
        international: false,
        link: '',
    },
    {
        partnerId: 9,
        name: 'TICKone للتدريب والتأهيل',
        nameEn: 'TICKone Training',
        type: 'تدريب وتأهيل',
        description: 'برامج تدريبية متخصصة',
        date: '08-مارس-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 10,
        name: 'هيئة تنمية المؤسسات الصغيرة والمتوسطة',
        nameEn: 'SME Development Authority',
        type: 'دعم ريادة الأعمال',
        description: 'تعزيز ريادة الأعمال والمشاريع الصغيرة',
        date: '03-ابريل-2022',
        international: false,
        link: '',
    },
    {
        partnerId: 11,
        name: 'وزارة الإسكان والتخطيط العمراني',
        nameEn: 'Ministry of Housing and Urban Planning',
        type: 'تعاون حكومي',
        description: 'شراكة في مجال التخطيط العمراني',
        date: '08-سيبتمبر-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 12,
        name: 'وزارة الأوقاف والشؤون الدينية',
        nameEn: 'Ministry of Endowments and Religious Affairs',
        type: 'تعاون ديني وثقافي',
        description: 'التعاون في المجالات الدينية والثقافية',
        date: '11-يونيو-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 13,
        name: 'مدن الصناعية - مدائن – البريمي',
        nameEn: 'Madain - Industrial Cities - Al Buraimi',
        type: 'شراكة صناعية',
        description: 'التعاون في المجالات الصناعية والتدريب',
        date: '20-نوفيمبر-2023',
        international: false,
        link: '',
    },
    {
        partnerId: 14,
        name: 'توام للابتكار والاستثمار',
        nameEn: 'Tawam Innovation and Investment',
        type: 'ريادة الأعمال',
        description: 'منصة رائد تساعد المبتكرين ورواد الأعمال على تحويل أحلامهم إلى نماذج أعمال وشركات ناشئة',
        date: '',
        international: false,
        link: '',
    },
    {
        partnerId: 15,
        name: 'بطاقة فزعة',
        nameEn: 'FAZAA Card',
        type: 'مبادرات اجتماعية',
        description: 'مبادرات صندوق التكافل الاجتماعي',
        date: '',
        international: false,
        link: '',
    },
    {
        partnerId: 16,
        name: 'بطاقة إسعاد',
        nameEn: 'Esaad Card - Dubai Police',
        type: 'خدمات مجتمعية',
        description: 'شرطة دبي - خدمات وامتيازات',
        date: '',
        international: true,
        link: '',
    },
    {
        partnerId: 17,
        name: 'معهد المحيط',
        nameEn: 'Al Muheet Institute',
        type: 'تدريب وتأهيل',
        description: 'اتفاقية تعاون مشترك في مجال التدريب والتأهيل',
        date: '30-ديسيمبر-2024',
        international: false,
        link: '',
    },
    {
        partnerId: 18,
        name: 'المعهد البريطاني - ايلتس',
        nameEn: 'British Council - IELTS',
        type: 'امتحانات دولية',
        description: 'اتفاقية مع المجلس الثقافي البريطاني في مسقط - امتحان IELTS',
        date: '04-نوفيمبر-2016',
        international: true,
        link: '',
    },
    {
        partnerId: 19,
        name: 'محافظة البريمي',
        nameEn: 'Al Buraimi Governorate',
        type: 'تعاون محلي',
        description: 'توقيع اتفاقية تعاون مع محافظة البريمي',
        date: '22-يناير-2025',
        international: true,
        link: '',
    },
    {
        partnerId: 20,
        name: 'شركة ما وراء البحار للمواد الغذائية',
        nameEn: 'Beyond Seas Food Company',
        type: 'استشارات بحثية',
        description: 'تقديم استشارات بحثية في المجال الإداري والمالي من خلال مشروع بحثي مشترك مع جامعة كاليفورنيا',
        date: '19-فبراير-2025',
        international: false,
        link: '',
    },
    {
        partnerId: 21,
        name: 'وزارة القوى العاملة',
        nameEn: 'Ministry of Labour',
        type: 'برامج تدريبية',
        description: 'تقديم برامج تدريبية لخريجي الكلية',
        date: '20-فبراير-2025',
        international: false,
        link: '',
    },
    {
        partnerId: 22,
        name: 'مدرسة توام الدولية الخاصة',
        nameEn: 'Tawam International Private School',
        type: 'استشارات تعليمية',
        description: 'تقديم الكلية استشارات بحثية وأكاديمية لدعم المدرسة',
        date: '25-مارس-2025',
        international: false,
        link: '',
    },
    {
        partnerId: 23,
        name: 'الجمعية العمانية للملكية الفكرية',
        nameEn: 'Oman Association for Intellectual Property (OIAP)',
        type: 'ملكية فكرية',
        description: 'نشر التوعية بأهمية تعزيز وحماية حقوق الملكية وتنظيم الورش التدريبية والمؤتمرات والندوات',
        date: '09-مايو-2025',
        international: false,
        link: '',
    },
    {
        partnerId: 24,
        name: 'المؤسسة العامة للمناطق الصناعية (مدائن)',
        nameEn: 'General Organization for Industrial Zones (Madain)',
        type: 'تعاون صناعي',
        description: 'شراكة استراتيجية في المجالات الصناعية',
        date: '27-مايو-2025',
        international: false,
        link: '',
    },
    {
        partnerId: 25,
        name: 'SAP University Alliances',
        nameEn: 'SAP Next Gen Community',
        type: 'تكنولوجيا المعلومات',
        description: 'شراكة في مجال تكنولوجيا المعلومات والأنظمة',
        date: '05-يونيو-2025',
        international: true,
        link: '',
    },
    {
        partnerId: 26,
        name: 'منصة الإرشاد المهني',
        nameEn: 'Career Counseling Platform',
        type: 'إرشاد مهني',
        description: 'منصة إلكترونية تخدم الطالب وولي الأمر والمهتمين بمستقبل الطالب المهني والتعليمي',
        date: '2020',
        international: false,
        link: '',
    },
    {
        partnerId: 27,
        name: 'Advance HE',
        nameEn: 'Advance HE (United Kingdom)',
        type: 'عضوية دولية',
        description:
            'كلية البريمي الجامعية عضو فخور في Advance HE، منظمة دولية تدعم مؤسسات التعليم العالي في جميع أنحاء العالم',
        date: '',
        international: true,
        link: 'https://www.advance-he.ac.uk/',
    },
] as const;

async function seed() {
    try {
        await dbConnect();

        const operations = SEED_PARTNERSHIPS.map((p) => ({
            updateOne: {
                filter: { order: p.partnerId },
                update: {
                    $set: {
                        order: p.partnerId,
                        name: p.name,
                        nameEn: p.nameEn,
                            logo: `/assets/landing/partners/partner-${((p.partnerId - 1) % 16) + 1}.webp`,
                        type: p.type,
                        description: p.description,
                        date: p.date,
                        link: p.link,
                        international: p.international,
                    },
                },
                upsert: true,
            },
        }));

        const result = await Partnership.bulkWrite(operations);

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
