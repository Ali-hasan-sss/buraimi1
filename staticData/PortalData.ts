import { Monitor, User, BookOpen, Calendar, FileText, MessageSquare, DollarSign, Award, Clock, Mail } from 'lucide-react';

export const portalFeatures = [
    {
        titleAr: 'المعلومات الشخصية',
        titleEn: 'Personal Information',
        descriptionAr: 'عرض وتحديث بياناتك الشخصية والأكاديمية',
        descriptionEn: 'View and update your personal and academic information',
        icon: User,
        color: '#254151',
        link: '#profile',
    },
    {
        titleAr: 'التسجيل الأكاديمي',
        titleEn: 'Academic Registration',
        descriptionAr: 'تسجيل المقررات الدراسية والانسحاب والإضافة',
        descriptionEn: 'Register courses and manage add/drop and withdrawal',
        icon: BookOpen,
        color: '#6096b4',
        link: '#registration',
    },
    {
        titleAr: 'الجدول الدراسي',
        titleEn: 'Class Schedule',
        descriptionAr: 'عرض جدولك الدراسي والمحاضرات',
        descriptionEn: 'View your schedule and lectures',
        icon: Calendar,
        color: '#c2a772',
        link: '#schedule',
    },
    {
        titleAr: 'النتائج والدرجات',
        titleEn: 'Grades & Results',
        descriptionAr: 'الاطلاع على نتائج الامتحانات والمعدل التراكمي',
        descriptionEn: 'Check exam results and your cumulative GPA',
        icon: Award,
        color: '#254151',
        link: '#grades',
    },
    {
        titleAr: 'المالية والرسوم',
        titleEn: 'Finance & Fees',
        descriptionAr: 'عرض الرسوم الدراسية والمدفوعات',
        descriptionEn: 'View tuition fees and payments',
        icon: DollarSign,
        color: '#6096b4',
        link: '#finance',
    },
    {
        titleAr: 'المراسلات',
        titleEn: 'Messages',
        descriptionAr: 'التواصل مع الإدارة وأعضاء هيئة التدريس',
        descriptionEn: 'Communicate with administration and faculty members',
        icon: MessageSquare,
        color: '#c2a772',
        link: '#messages',
    },
];

export const quickLinks = [
    { titleAr: 'طلب إفادة طالب', titleEn: 'Request Student Certificate', icon: FileText },
    { titleAr: 'طلب كشف درجات', titleEn: 'Request Transcript', icon: Award },
    { titleAr: 'تحديث البيانات الشخصية', titleEn: 'Update Personal Information', icon: User },
    { titleAr: 'التواصل مع المرشد الأكاديمي', titleEn: 'Contact Academic Advisor', icon: Mail },
    { titleAr: 'الجدول الزمني للامتحانات', titleEn: 'Exam Schedule', icon: Clock },
    { titleAr: 'تقديم شكوى أو اقتراح', titleEn: 'Submit a Complaint or Suggestion', icon: MessageSquare },
];
