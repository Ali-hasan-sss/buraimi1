"use client";

import { useMemo } from 'react';
import { useCustomSession } from '@/hooks/useCustomSession';
import IeltsCalendarSection from '@/components/training/IeltsCalendarSection';
import TrainingCoursesSection from '@/components/training/TrainingCoursesSection';
import {
    GraduationCap,
    Award,
    Target,
    Users,
    CheckCircle,
    ChevronLeft,
    Mail,
    Phone,
    Globe,
    Briefcase,
    Scale,
    Heart,
    DollarSign,
    Lightbulb,
    Star
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function TrainingInstitutePage() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    const { data: session } = useCustomSession();
    const isAdmin = session?.isAdmin ?? false;


    const t = useMemo(
        () =>
            isAr
                ? {
                    heroTitleAr: 'معهد التدريب',
                    heroTitleEn: 'Training Institute',
                    heroSubtitle: 'التميز في تقديم خدمات تدريبية عالية الجودة',
                    aboutTitle: 'عن معهد التدريب',
                    aboutP1: 'يقدم مركز التدريب بكلية البريمي الجامعية مجموعة متنوعة من الدورات التدريبية للمجتمع المحلي والطلاب والموظفين في مجالات القانون واللغة الإنجليزية وإدارة الأعمال والمحاسبة.',
                    aboutP2: 'يسعى معهد التدريب في كلية البريمي الجامعية إلى التميز وذلك من خلال تقديم خدمات تدريبية حققت الكفاءة والكفاية في الأداء والإنتاج وشكلت جسراً للتواصل بين الكلية ومختلف شرائح المجتمع مما شكل دوراً أساسياً في النمو الثقافي والمهني.',
                    goalsTitle: 'أهدافنا',
                    goalsSubtitle: 'نسعى لتحقيق التميز في التدريب والتطوير',
                    ieltsTitle: 'امتحان IELTS',
                    ieltsSubtitle: 'تقدم كلية البريمي الجامعية بالتعاون مع المجلس الثقافي البريطاني اختبارات الايلتس للمستوى الأكاديمي والعام',
                    whyIelts: 'لماذا تختار IELTS',
                    whyIeltsBody: 'يتم قبول اختبار ايلتس من قبل أكثر من 10,000 منظمة في أكثر من 140 دولة. وتشمل هذه المنظمات الحكومات والمؤسسات الأكاديمية وأصحاب العمل.',
                    regInfo: 'معلومات التسجيل',
                    fees: 'الرسوم:',
                    result: 'النتيجة:',
                    phone: 'الهاتف:',
                    email: 'البريد:',
                    feesValue: '96 ريال عماني (امتحان ورقي)',
                    resultValue: 'بعد 14 يوم من إجراء الاختبار',
                    ieltsCalendarEn: 'IELTS Calendar 2025',
                    ieltsCalendarAr: 'جدول امتحانات الآيلتس لعام 2025',
                    thMonth: 'الشهر',
                    thDate: 'تاريخ الاختبار',
                    thType: 'النوع',
                    coursesTitle: 'الدورات المقدمة',
                    coursesSubtitle: 'اختر من بين أكثر من 150 دورة تدريبية متخصصة',
                    searchPlaceholder: 'ابحث عن دورة...',
                    resultsLabel: 'عدد النتائج:',
                    noResultsTitle: 'لا توجد نتائج',
                    noResultsBody: 'جرب البحث بكلمات مختلفة أو اختر مجال آخر',
                    contactTitle: 'للاستفسار والتسجيل',
                    contactSubtitle: 'تواصل معنا للحصول على المزيد من المعلومات',
                    phoneCardTitle: 'الهاتف',
                    emailCardTitle: 'البريد الإلكتروني',
                    ctaTitle: 'ابدأ رحلتك التدريبية اليوم',
                    ctaSubtitle: 'استثمر في مستقبلك المهني مع أكثر من 150 دورة تدريبية متخصصة',
                    ctaRegister: 'سجل الآن',
                    ctaCall: 'اتصل بنا',
                    ctaBackHome: 'العودة للرئيسية',
                }
                : {
                    heroTitleAr: 'Training Institute',
                    heroTitleEn: 'Training Institute',
                    heroSubtitle: 'Excellence in providing high-quality training services.',
                    aboutTitle: 'About the Training Institute',
                    aboutP1: 'The Training Center at Al Buraimi University College offers a variety of training courses for the local community, students, and staff in the fields of law, English language, business administration, and accounting.',
                    aboutP2: 'The Training Institute at Al Buraimi University College strives for excellence by offering training services that enhance performance and productivity, building a bridge between the college and the community, contributing to cultural and professional growth.',
                    goalsTitle: 'Our Goals',
                    goalsSubtitle: 'We strive to achieve excellence in training and development.',
                    ieltsTitle: 'IELTS Exam',
                    ieltsSubtitle: 'In cooperation with the British Council, Al Buraimi University College offers IELTS tests for Academic and General Training modules.',
                    whyIelts: 'Why choose IELTS',
                    whyIeltsBody: 'IELTS is accepted by more than 10,000 organizations across 140+ countries, including governments, academic institutions, and employers.',
                    regInfo: 'Registration Info',
                    fees: 'Fees:',
                    result: 'Result:',
                    phone: 'Phone:',
                    email: 'Email:',
                    feesValue: 'OMR 96 (paper-based exam)',
                    resultValue: '14 days after the test date',
                    ieltsCalendarEn: 'IELTS Calendar 2025',
                    ieltsCalendarAr: 'IELTS Calendar 2025',
                    thMonth: 'Month',
                    thDate: 'Test Date',
                    thType: 'Module',
                    coursesTitle: 'Offered Courses',
                    coursesSubtitle: 'Choose from 150+ specialized training courses.',
                    searchPlaceholder: 'Search for a course...',
                    resultsLabel: 'Results:',
                    noResultsTitle: 'No results found',
                    noResultsBody: 'Try different keywords or choose another field.',
                    contactTitle: 'Enquiries & Registration',
                    contactSubtitle: 'Contact us for more information.',
                    phoneCardTitle: 'Phone',
                    emailCardTitle: 'Email',
                    ctaTitle: 'Start Your Training Journey Today',
                    ctaSubtitle: 'Invest in your professional future with 150+ specialized courses.',
                    ctaRegister: 'Register Now',
                    ctaCall: 'Call Us',
                    ctaBackHome: 'Back to Home',
                },
        [isAr]
    );

    const goals = useMemo(
        () =>
            isAr
                ? [
                    'يهدف معهد التدريب للوصول إلى بيئة تدريبة متميزة',
                    'تقديم خدمات تدريبية ممتازة لجميع شرائح المجتمع',
                    'إجراء التدريب المناسب وتعزيز مهارات الموظف',
                    'زيادة تطوير البرامج التدريبية واستحداث دورات ذات جودة عالمية',
                    'تعزيز قدرات المتدربين وتحسين جودة المخرجات التدريبية',
                    'رفع كفاءات الإبداع لدى أعضاء هيئة التدريب',
                    'توسعة وتنويع برامجه التدريبية وعقد شراكات محلية وإقليمية',
                ]
                : [
                    'Create an outstanding training environment.',
                    'Provide excellent training services for all segments of society.',
                    'Deliver appropriate training and enhance employee skills.',
                    'Develop and introduce high-quality training programs and courses.',
                    'Strengthen trainees’ capabilities and improve training outcomes.',
                    'Raise creativity and performance of training staff.',
                    'Expand and diversify programs and build local & regional partnerships.',
                ],
        [isAr]
    );

    return (
        <div className="min-h-screen bg-gray-50" dir={dir}>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-12 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-6 rounded-full">
                                <GraduationCap className=" size-8 lg:size-16 xl:size-20" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">{t.heroTitleAr}</h1>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 opacity-90">{t.heroTitleEn}</h2>
                        <p className="text-base sm:text-xl lg:text-2xl opacity-95 leading-relaxed">
                            {t.heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xl p-10 border-2 border-blue-200">
                        <div className="flex items-start gap-6">
                            <div className="bg-[#254151] text-white size-20 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                                <Award className="size-8 sm:size-9 lg:size-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-4">{t.aboutTitle}</h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4">
                                    {t.aboutP1}
                                </p>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                    {t.aboutP2}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Goals Section */}
            <section className="py-12 sm:py-14 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <Target className="size-10 sm:size-14 lg:size-16 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-4">{t.goalsTitle}</h2>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600">{t.goalsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {goals.map((goal, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-xl p-6 border-2 border-blue-200 hover:shadow-2xl transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600 text-white size-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1 text-sm sm:text-base lg:text-lg">{goal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IELTS Section */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-2xl p-4 sm:p-6 lg:p-10 border-2 border-green-200">
                        <div className="text-center mb-8">
                            <Globe className="size-12 sm:size-16 lg:size-20 text-green-600 mx-auto mb-4" />
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-4">{t.ieltsTitle}</h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6">
                                {t.ieltsSubtitle}
                            </p>
                        </div>

                        {/* IELTS Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-200">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4 flex items-center gap-2">
                                    <CheckCircle className="size-5 sm:size-6 text-green-600" />
                                    <span>{t.whyIelts}</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {t.whyIeltsBody}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4 flex items-center gap-2">
                                    <DollarSign className="size-5 sm:size-6 text-blue-600" />
                                    <span>{t.regInfo}</span>
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><strong>{t.fees}</strong> {t.feesValue}</p>
                                    <p className="text-gray-700"><strong>{t.result}</strong> {t.resultValue}</p>
                                    <p className="text-gray-700"><strong>{t.phone}</strong> +968 99229171, +968 25657666 Ext: 763</p>
                                    <p className="text-gray-700 break-all"><strong>{t.email}</strong> tucoordinator@buc.edu.om</p>
                                </div>
                            </div>
                        </div>

                        {/* IELTS Calendar */}
                        <IeltsCalendarSection
                            isAr={isAr}
                            titleEn={t.ieltsCalendarEn}
                            titleAr={t.ieltsCalendarAr}
                            isAdmin={isAdmin}
                        />
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <TrainingCoursesSection isAr={isAr} isAdmin={isAdmin} />

            {/* Contact Section */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xl p-10 border-2 border-blue-200">
                        <div className="text-center mb-8">
                            <Mail className="size-10 sm:size-14 lg:size-16 text-blue-600 mx-auto mb-4" />
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-4">{t.contactTitle}</h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600">{t.contactSubtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg p-6 border-2 border-blue-200 text-center">
                                <Phone className="siz-5 sm:size-9 sm:size-11 lg:size-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">{t.phoneCardTitle}</h3>
                                <a href="tel:+96825657666" className="text-blue-600 hover:underline text-sm sm:text-base lg:text-lg block" dir="ltr">
                                    +968 2565 7666
                                </a>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">Ext: 763</p>
                            </div>

                            <div className="bg-white rounded-lg p-6 border-2 border-green-200 text-center">
                                <Mail className=" size-5 sm:size-9 sm:size-11 lg:size-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">{t.emailCardTitle}</h3>
                                <a href="mailto:tucoordinator@buc.edu.om" className="text-green-600 hover:underline text-sm sm:text-base lg:text-lg break-all">
                                    tucoordinator@buc.edu.om
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 sm:py-14 lg:py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
                    <p className="text-base sm:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                        {t.ctaSubtitle}
                    </p>
                    <div className=" grid sm:flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:tucoordinator@buc.edu.om"
                            className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <Mail className="size-5 sm:size-6" />
                            <span>{t.ctaRegister}</span>
                        </a>
                        <a
                            href="tel:+96825657666"
                            className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <Phone className="size-5 sm:size-6" />
                            <span>{t.ctaCall}</span>
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <ChevronLeft className="size-5 sm:size-6" />
                            <span>{t.ctaBackHome}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
