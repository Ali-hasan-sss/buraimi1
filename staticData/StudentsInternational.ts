
import { IntlGuide, IntlProcedure, IntlRequirement, IntlService } from '@/types/students';
import {
    Award,
    BookOpen,
    CheckCircle,
    FileText,
    Globe,
    GraduationCap,
    Plane,
    UserCheck,
    Users,
} from 'lucide-react';

export const requirements = [
    {
        icon: FileText,
        titleAr: 'الوثائق المطلوبة',
        titleEn: 'Required Documents',
        itemsAr: [
            'جواز سفر ساري المفعول',
            'شهادة الثانوية العامة أو ما يعادلها مصدقة',
            'كشف درجات مصدق من الجهات المختصة',
            'شهادة إجادة اللغة العربية (إن لم تكن اللغة الأم)',
            'شهادة إجادة اللغة الإنجليزية (IELTS أو TOEFL)',
            'صورة شخصية حديثة',
        ],
        itemsEn: [
            'Valid passport',
            'Attested high school certificate or equivalent',
            'Officially attested academic transcript',
            'Arabic language proficiency certificate (if Arabic is not the mother tongue)',
            'English language proficiency certificate (IELTS or TOEFL)',
            'Recent personal photo',
        ],
        color: 'bg-[#6096b4]',
    },
    {
        icon: CheckCircle,
        titleAr: 'معايير القبول',
        titleEn: 'Admission Criteria',
        itemsAr: [
            'الحصول على نسبة لا تقل عن 65% في الثانوية العامة',
            'اجتياز امتحان القبول للكلية',
            'استيفاء شروط القبول للتخصص المطلوب',
            'إثبات القدرة المالية على تحمل تكاليف الدراسة',
            'الحصول على تأشيرة طالب سارية المفعول',
        ],
        itemsEn: [
            'Achieve at least 65% in high school',
            'Pass the college admission test',
            'Meet the admission requirements for the desired program',
            'Provide proof of financial ability to cover study costs',
            'Hold a valid student visa',
        ],
        color: 'bg-[#c2a772]',
    },
] satisfies IntlRequirement[];

export const procedures = [
    {
        step: '1',
        titleAr: 'التقديم الإلكتروني',
        titleEn: 'Online Application',
        descriptionAr: 'تعبئة نموذج التقديم الإلكتروني عبر موقع الكلية وإرفاق جميع المستندات المطلوبة',
        descriptionEn: 'Fill out the online application form on the college website and attach all required documents.',
        icon: Globe,
    },
    {
        step: '2',
        titleAr: 'مراجعة الطلب',
        titleEn: 'Application Review',
        descriptionAr: 'تقوم لجنة القبول بمراجعة الطلب والتحقق من استيفاء جميع الشروط',
        descriptionEn: 'The admissions committee reviews the application and verifies that all requirements are met.',
        icon: UserCheck,
    },
    {
        step: '3',
        titleAr: 'امتحان القبول',
        titleEn: 'Admission Test',
        descriptionAr: 'حضور امتحان القبول والمقابلة الشخصية (إن لزم الأمر)',
        descriptionEn: 'Attend the admission test and the personal interview (if required).',
        icon: FileText,
    },
    {
        step: '4',
        titleAr: 'إصدار القبول',
        titleEn: 'Issuing Admission',
        descriptionAr: 'الحصول على خطاب القبول الرسمي من الكلية',
        descriptionEn: 'Receive the official admission letter from the college.',
        icon: Award,
    },
    {
        step: '5',
        titleAr: 'التأشيرة والإقامة',
        titleEn: 'Visa & Residency',
        descriptionAr: 'التقدم للحصول على تأشيرة طالب وإقامة في سلطنة عمان',
        descriptionEn: 'Apply for a student visa and residency in the Sultanate of Oman.',
        icon: Plane,
    },
    {
        step: '6',
        titleAr: 'التسجيل والدراسة',
        titleEn: 'Enrollment & Study',
        descriptionAr: 'إتمام إجراءات التسجيل والبدء في الدراسة',
        descriptionEn: 'Complete enrollment procedures and begin your studies.',
        icon: GraduationCap,
    },
] satisfies IntlProcedure[];

export const guides = [
    {
        titleAr: 'دليل الطالب للمرحلة الجامعية الأولى',
        titleEn: "Student Guide (Undergraduate)",
        icon: BookOpen,
        color: 'from-[#6096b4] to-[#254151]',
        link: 'https://heyzine.com/flip-book/ef74596e30.html',
    },
    {
        titleAr: 'دليل الطالب لبرنامج الماجستير في الإدارة',
        titleEn: "Student Guide (Master's in Management)",
        icon: GraduationCap,
        color: 'from-[#c2a772] to-[#6096b4]',
        link: 'https://heyzine.com/flip-book/fe13d880ba.html',
    },
    {
        titleAr: 'دليل الطالب لبرنامج الماجستير في القانون',
        titleEn: "Student Guide (Master's in Law)",
        icon: Award,
        color: 'from-[#254151] to-[#6096b4]',
        link: 'https://heyzine.com/flip-book/591a82274d.html',
    },
    {
        titleAr: 'دليل الطالب لبرنامج الدكتوراه في القانون',
        titleEn: 'Student Guide (PhD in Law)',
        icon: GraduationCap,
        color: 'from-[#6096b4] to-[#c2a772]',
        link: 'https://heyzine.com/flip-book/3572a2c05e.html',
    },
] satisfies IntlGuide[];

export const services = [
    {
        icon: Plane,
        titleAr: 'خدمة الاستقبال',
        titleEn: 'Reception Service',
        descriptionAr: 'نساعد الطلبة الدوليين عند وصولهم إلى سلطنة عمان',
        descriptionEn: 'We assist international students upon their arrival in the Sultanate of Oman.',
    },
    {
        icon: Users,
        titleAr: 'الإرشاد والتوجيه',
        titleEn: 'Guidance & Orientation',
        descriptionAr: 'برامج تعريفية للطلبة الجدد وإرشاد مستمر طوال فترة الدراسة',
        descriptionEn: 'Orientation programs for new students and continuous guidance throughout the study period.',
    },
    {
        icon: Award,
        titleAr: 'الدعم الأكاديمي',
        titleEn: 'Academic Support',
        descriptionAr: 'مساعدة أكاديمية متخصصة لضمان النجاح الدراسي',
        descriptionEn: 'Specialized academic support to help ensure academic success.',
    },
    {
        icon: Globe,
        titleAr: 'الأنشطة الثقافية',
        titleEn: 'Cultural Activities',
        descriptionAr: 'فعاليات وأنشطة ثقافية للتعريف بالثقافة العمانية',
        descriptionEn: 'Events and cultural activities to introduce Omani culture.',
    },
] satisfies IntlService[];
