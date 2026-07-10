import { Award, CheckCircle, FileText, Globe, Users } from "lucide-react";

export const InternationalAcceptanceData = {
    visaDocuments: {
        ar: [
            'شهادة فحص طبي معتمدة (إذا كانت مطلوبة لبعض الجنسيات)',
            'نسخة من جواز السفر',
            'صورتان شخصيتان بحجم جواز السفر',
            'دليل على الطالب بعد إتمام عملية التسجيل بالكلية',
            'إيصال دفع رسوم التسجيل'
        ],
        en: [
            'Certified medical examination certificate (if required for certain nationalities)',
            'Copy of passport',
            'Two passport-sized photographs',
            'Proof of student status after completing college registration',
            'Receipt of registration fee payment'
        ]
    },

    renewalDocuments: {
        ar: [
            'أصل جواز السفر',
            'نسخة من تأشيرة الدراسة',
            'أصل بطاقة الإقامة',
            'صورتان شخصيتان بحجم جواز السفر',
            'خطاب قيد الطالب ومدة الدراسة المتبقية من القبول والتسجيل'
        ],
        en: [
            'Original passport',
            'Copy of study visa',
            'Original residency card',
            'Two passport-sized photographs',
            'Student status letter and remaining study duration from Admission and Registration'

        ]
    },

    steps: [
        {
            number: '1',
            titleAr: 'الحصول على القبول الأولي',
            titleEn: 'Obtain Initial Admission',
            descriptionAr: 'التقديم عبر البوابة الإلكترونية واستلام خطاب القبول الأولي من الكلية',
            descriptionEn: 'Apply through the online portal and receive the initial admission letter from the college',
            icon: FileText
        },
        {
            number: '2',
            titleAr: 'تقديم المستندات',
            titleEn: 'Submit Documents',
            descriptionAr: 'إرسال جميع المستندات المطلوبة إلى إدارة شؤون الموظفين بالكلية',
            descriptionEn: 'Send all required documents to the college\'s employee affairs department',
            icon: Globe
        },
        {
            number: '3',
            titleAr: 'الحصول على تأشيرة الدراسة',
            titleEn: 'Obtain Study Visa',
            descriptionAr: 'تساعد الكلية الطلاب في الحصول على تأشيرة الدراسة من السلطات المختصة',
            descriptionEn: 'The college assists students in obtaining a study visa from the relevant authorities',
            icon: CheckCircle
        },
        {
            number: '4',
            titleAr: 'إكمال التسجيل',
            titleEn: 'Complete Registration',
            descriptionAr: 'الحضور إلى الكلية وإكمال إجراءات التسجيل ودفع الرسوم الدراسية',
            descriptionEn: 'Attend the college to complete registration procedures and pay tuition fees',
            icon: Users
        },
        {
            number: '5',
            titleAr: 'بدء الدراسة',
            titleEn: 'Begin Studies',
            descriptionAr: 'حضور البرنامج التوجيهي والبدء في الفصل الدراسي',
            descriptionEn: 'Attend the orientation program and start the academic semester',
            icon: Award
        }
    ]

}