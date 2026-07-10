"use client";

import { careerPathsByLocale, servicesByLocale } from '@/staticData/career-guidance';
import { Briefcase, MessageCircle, Pencil } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SeminarsListComp from '@/components/Research/prof/SeminarsList';

export default function CareerGuidancePage() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';
    const localeKey = isAr ? 'ar' : 'en';

    const [seminars, setSeminars] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchSeminars = async () => {
            try {
                const res = await fetch('/api/seminars');
                const data = await res.json();
                if (data.ok) {
                    const formatted = data.data.map((s: any) => ({
                        academicYear: isAr ? s.academicYearAr : s.academicYearEn,
                        department: isAr ? s.departmentAr : s.departmentEn,
                        presenter: isAr ? s.presenterAr : s.presenterEn,
                        title: isAr ? s.titleAr : s.titleEn,
                        date: s.date,
                    }));
                    setSeminars(formatted);
                }
            } catch (error) {
                console.error('Failed to fetch seminars:', error);
            }
        };
        fetchSeminars();

        // Check admin status
        const checkAdmin = async () => {
            try {
                const res = await fetch('/api/auth/me', { credentials: 'include' });
                const data = await res.json();
                setIsAdmin(Boolean(data.ok && data.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [isAr]);

    const t = isAr
        ? {
            heroTitle: 'التوجيه الوظيفي وشؤون الخريجين',
            heroSubtitle:
                'نساعد طلابنا وخريجينا على بناء مستقبل مهني ناجح من خلال خدمات التوجيه الوظيفي والتطوير المهني المستمر',
            servicesTitle: 'خدماتنا',
            servicesSubtitle: 'نقدم مجموعة شاملة من الخدمات لدعم مسيرتك المهنية',
            pathsTitle: 'المسارات الوظيفية',
            pathsSubtitle: 'استكشف الفرص المهنية المتاحة لخريجينا',
            storiesTitle: 'قصص نجاح الخريجين',
            storiesSubtitle: 'نفخر بإنجازات خريجينا في مختلف المجالات المهنية',
            storyName: (i: number) => `خريج متميز ${i}`,
            storyRole: 'المنصب الوظيفي - الشركة',
            storyText:
                'قصة نجاح ملهمة لأحد خريجينا المتميزين الذين حققوا إنجازات مهنية رائعة في مجال تخصصهم.',
            contactTitle: 'هل تحتاج إلى مساعدة؟',
            contactText: 'فريقنا جاهز لمساعدتك في بناء مسيرتك المهنية والإجابة على جميع استفساراتك',
            ctaBook: 'احجز موعد استشارة',
            ctaContact: 'تواصل معنا',
            seminarsTitle: 'قائمة الندوات وورش العمل',
            seminarsSubtitle: 'List of Seminars and Workshops',
        }
        : {
            heroTitle: 'Career Guidance & Alumni Affairs',
            heroSubtitle:
                'We help our students and alumni build a successful career through career guidance services and continuous professional development.',
            servicesTitle: 'Our Services',
            servicesSubtitle: 'We provide a comprehensive set of services to support your career journey.',
            pathsTitle: 'Career Paths',
            pathsSubtitle: 'Explore career opportunities available for our graduates.',
            storiesTitle: 'Alumni Success Stories',
            storiesSubtitle: 'We are proud of our alumni achievements across diverse professional fields.',
            storyName: (i: number) => `Outstanding Graduate ${i}`,
            storyRole: 'Job Title - Company',
            storyText:
                'An inspiring success story of one of our distinguished alumni who achieved remarkable professional milestones in their field.',
            contactTitle: 'Need help?',
            contactText: 'Our team is ready to support your career journey and answer all your questions.',
            ctaBook: 'Book a consultation',
            ctaContact: 'Contact us',
            seminarsTitle: 'Seminars & Workshops',
            seminarsSubtitle: 'قائمة الندوات وورش العمل',
        };

    const services = servicesByLocale[localeKey];
    const careerPaths = careerPathsByLocale[localeKey];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={dir}>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-14 sm:py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
                        <div className="w-12 sm:w-20 h-0.5 bg-gradient-to-l from-[#c2a772] to-transparent"></div>
                        <Briefcase className="size-8 sm:size-10 text-[#c2a772]" />
                        <div className="w-12 sm:w-20 h-0.5 bg-gradient-to-r from-[#c2a772] to-transparent"></div>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white mb-4 sm:mb-6 font-black">{t.heroTitle}</h1>

                    <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">{t.heroSubtitle}</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-black text-[#254151] mb-4 sm:mb-6">
                            {t.servicesTitle}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            {t.servicesSubtitle}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#6096b4] transform hover:-translate-y-2"
                                >
                                    <div
                                        className="inline-flex items-center justify-center size-10 sm:size-16 rounded-xl mb-5 sm:mb-6"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <Icon className="size-5 sm:size-8 text-white" />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#254151] mb-3 sm:mb-4">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Career Paths Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-l from-[#254151]/5 to-[#6096b4]/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-black text-[#254151] mb-4 sm:mb-6">
                            {t.pathsTitle}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            {t.pathsSubtitle}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {careerPaths.map((path, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-5xl sm:text-6xl mb-5 sm:mb-6 text-center">
                                    {path.icon}
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-[#254151] mb-5 sm:mb-6 text-center">
                                    {path.title}
                                </h3>

                                <ul className="space-y-3">
                                    {path.opportunities.map((opp, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{opp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alumni Success Stories */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-black text-[#254151] mb-4 sm:mb-6">
                            {t.storiesTitle}
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            {t.storiesSubtitle}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <div className="h-48 bg-gradient-to-br from-[#254151] to-[#6096b4]"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#254151] mb-2">
                                        {t.storyName(i)}
                                    </h3>
                                    <p className="text-[#6096b4] font-semibold mb-3">
                                        {t.storyRole}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t.storyText}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seminars & Workshops Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-l from-[#254151]/5 to-[#6096b4]/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                            <h2 className="text-2xl sm:text-4xl font-black text-[#254151]">
                                {t.seminarsTitle}
                            </h2>
                            {isAdmin && (
                                <Link
                                    href="/dashboard/seminars"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#254151] text-white rounded-lg hover:bg-[#1a2f3a] transition-colors text-sm font-semibold"
                                >
                                    <Pencil className="w-4 h-4" />
                                    {isAr ? 'تعديل' : 'Edit'}
                                </Link>
                            )}
                        </div>
                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                            {t.seminarsSubtitle}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <SeminarsListComp seminars={seminars} />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-l from-[#254151] to-[#6096b4]">
                <div className="container mx-auto px-4 text-center">
                    <MessageCircle className="size-12 sm:size-16 text-[#c2a772] mx-auto mb-5 sm:mb-6" />

                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">{t.contactTitle}</h2>

                    <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">{t.contactText}</p>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                        <button className="bg-[#c2a772] hover:bg-[#d4bd90] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl">
                            {t.ctaBook}
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all border-2 border-white">
                            {t.ctaContact}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
