
import { Briefcase, Users, TrendingUp, Award, BookOpen, Target, MessageCircle } from 'lucide-react';

export const servicesByLocale = {
    ar: [
        {
            title: 'الإرشاد الوظيفي',
            description: 'جلسات فردية وجماعية لمساعدة الطلاب على اختيار المسار المهني المناسب',
            icon: Target,
            color: '#254151',
        },
        {
            title: 'ورش العمل التدريبية',
            description: 'ورش عمل متخصصة في كتابة السيرة الذاتية والمقابلات الشخصية ومهارات التواصل',
            icon: BookOpen,
            color: '#6096b4',
        },
        {
            title: 'معرض التوظيف السنوي',
            description: 'فعالية سنوية تجمع الطلاب بأصحاب العمل من مختلف القطاعات',
            icon: Briefcase,
            color: '#c2a772',
        },
        {
            title: 'التدريب العملي',
            description: 'برامج تدريب عملي في مؤسسات محلية وإقليمية لاكتساب الخبرة المهنية',
            icon: TrendingUp,
            color: '#254151',
        },
        {
            title: 'شبكة الخريجين',
            description: 'التواصل مع خريجي الكلية الناجحين والاستفادة من خبراتهم المهنية',
            icon: Users,
            color: '#6096b4',
        },
        {
            title: 'جوائز التميز',
            description: 'برامج تقدير وتحفيز للطلاب المتميزين أكاديمياً ومهنياً',
            icon: Award,
            color: '#c2a772',
        },
    ],
    en: [
        {
            title: 'Career Guidance',
            description: 'One-on-one and group sessions to help students choose the right career path.',
            icon: Target,
            color: '#254151',
        },
        {
            title: 'Training Workshops',
            description: 'Workshops on CV writing, interviews, and communication skills.',
            icon: BookOpen,
            color: '#6096b4',
        },
        {
            title: 'Annual Career Fair',
            description: 'A yearly event connecting students with employers across sectors.',
            icon: Briefcase,
            color: '#c2a772',
        },
        {
            title: 'Internships',
            description: 'Internship programs with local and regional institutions to build professional experience.',
            icon: TrendingUp,
            color: '#254151',
        },
        {
            title: 'Alumni Network',
            description: 'Connect with successful alumni and benefit from their professional experience.',
            icon: Users,
            color: '#6096b4',
        },
        {
            title: 'Excellence Awards',
            description: 'Recognition programs to motivate outstanding students academically and professionally.',
            icon: Award,
            color: '#c2a772',
        },
    ],
};

export const careerPathsByLocale = {
    ar: [
        {
            title: 'القطاع الحكومي',
            opportunities: ['وزارات ومؤسسات حكومية', 'الخدمة المدنية', 'القطاعات التنظيمية'],
            icon: '🏛️',
        },
        {
            title: 'القطاع الخاص',
            opportunities: ['الشركات الكبرى', 'المؤسسات الصغيرة والمتوسطة', 'الشركات الناشئة'],
            icon: '💼',
        },
        {
            title: 'ريادة الأعمال',
            opportunities: ['تأسيس مشاريع خاصة', 'الشركات الناشئة', 'الاستشارات المهنية'],
            icon: '🚀',
        },
        {
            title: 'الدراسات العليا',
            opportunities: ['برامج الماجستير', 'برامج الدكتوراة', 'البحث العلمي'],
            icon: '🎓',
        },
    ],
    en: [
        {
            title: 'Public Sector',
            opportunities: ['Ministries & government institutions', 'Civil service', 'Regulatory sectors'],
            icon: '🏛️',
        },
        {
            title: 'Private Sector',
            opportunities: ['Large companies', 'SMEs', 'Startups'],
            icon: '💼',
        },
        {
            title: 'Entrepreneurship',
            opportunities: ['Starting your own business', 'Startups', 'Professional consulting'],
            icon: '🚀',
        },
        {
            title: 'Graduate Studies',
            opportunities: ['Master’s programs', 'PhD programs', 'Research'],
            icon: '🎓',
        },
    ],
};
