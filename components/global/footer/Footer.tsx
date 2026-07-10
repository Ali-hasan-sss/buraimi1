import {
  CONTACT_PUBLIC_EMAIL,
  CONTACT_MAILTO,
  DEFAULT_SITE_CONTACT_SETTINGS,
  contactTelHref,
} from '@/lib/site-contact-settings-defaults';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import bucLogoFull from '@/public/assets/611e5eacee07f1d8f784863ef6b535306866ecec.png';
import motifPattern from '@/public/assets/f0e151d5a6a95277d4603ec80c838f52dc92392e.png';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';

export function Footer() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const localeKey: 'ar' | 'en' = isRTL ? 'ar' : 'en';

    const t = useMemo(() => {
        const byLocale = {
            ar: {
                alt: 'كلية البريمي الجامعية',
                sections: {
                    colleges: {
                        title: 'الأقسام والبرامج',
                        links: [
                            { text: 'ابحث عن البرامج', href: '/main/department' },
                            { text: 'الطلبة', href: '/main/students' },
                            { text: 'مختبر مفتوح', href: '/main/library' },
                        ],
                    },
                    admission: {
                        title: 'القبول',
                        links: [
                            { text: 'القبول في كلية البريمي الجامعية', href: '/main/admission' },
                            { text: 'الرسوم الدراسية', href: '/main/students/international/tuition-fees' },
                            { text: 'مختبر مفتوح', href: '/main/library' },
                        ],
                    },
                    research: {
                        title: 'البحث العلمي',
                        links: [
                            { text: 'معاهد ومراكز بحثية', href: '/main/research' },
                            { text: 'أبحاث مميزة', href: '/main/research/projects' },
                            { text: 'باحثون وأكاديميون ممتازون علمياً', href: '/main/research-pillars' },
                            { text: 'الابتكار والتقانة', href: '/main/research-pillars' },
                            { text: 'دعم الباحثين', href: '/main/research/research-funding' },
                            { text: 'الإعلام', href: '/main/social-media' },
                        ],
                    },
                    studentLife: {
                        title: 'حياة الطلبة',
                        links: [
                            { text: 'عيش وتعلم واكتشف', href: '/main/student-life' },
                            { text: 'التنقل', href: '/main/student-life' },
                            { text: 'فرص التوظيف الوظيفية', href: '/main/career-guidance' },
                            { text: 'الإعلام', href: '/main/social-media' },
                        ],
                    },
                    otherLinks: {
                        title: 'روابط أخرى',
                        links: [
                            { text: 'الخدمات', href: '/main/student-portal' },
                            { text: 'اكتشاف كلية البريمي الجامعية', href: '/main/about' },
                            { text: 'الوظائف في كلية البريمي الجامعية', href: '/main/careers' },
                            { text: 'الإعلام', href: '/main/social-media' },
                            { text: 'الخريجون', href: '/main/career-guidance' },
                            { text: 'تواصل معنا', href: '/main/contact-directory' },
                        ],
                    },
                },
                newsletter: {
                    send: 'إرسال',
                    placeholder: 'أدخل بريدك الإلكتروني',
                    brand: 'كلية البريمي الجامعية',
                    privacy: 'سياسة الخصوصية',
                    rights: 'جميع الحقوق محفوظة كلية البريمي الجامعية © BUC 2025',
                    subscribe: 'اشترك في نشرتنا الإخبارية',
                },
            },
            en: {
                alt: 'Al Buraimi University College',
                sections: {
                    colleges: {
                        title: 'Departments & Programs',
                        links: [
                            { text: 'Find Programs', href: '/main/department' },
                            { text: 'Students', href: '/main/students' },
                            { text: 'Open Lab', href: '/main/library' },
                        ],
                    },
                    admission: {
                        title: 'Admissions',
                        links: [
                            { text: 'Admissions at Al Buraimi University College', href: '/main/admission' },
                            { text: 'Tuition Fees', href: '/main/students/international/tuition-fees' },
                            { text: 'Open Lab', href: '/main/library' },
                        ],
                    },
                    research: {
                        title: 'Research',
                        links: [
                            { text: 'Institutes & Research Centers', href: '/main/research' },
                            { text: 'Featured Research', href: '/main/research/projects' },
                            { text: 'Researchers & Academics', href: '/main/research-pillars' },
                            { text: 'Innovation & Technology', href: '/main/research-pillars' },
                            { text: 'Research Support', href: '/main/research/research-funding' },
                            { text: 'Media', href: '/main/social-media' },
                        ],
                    },
                    studentLife: {
                        title: 'Student Life',
                        links: [
                            { text: 'Live, Learn & Discover', href: '/main/student-life' },
                            { text: 'Transportation', href: '/main/student-life' },
                            { text: 'Career Opportunities', href: '/main/career-guidance' },
                            { text: 'Media', href: '/main/social-media' },
                        ],
                    },
                    otherLinks: {
                        title: 'Other Links',
                        links: [
                            { text: 'Services', href: '/main/student-portal' },
                            { text: 'Discover Al Buraimi University College', href: '/main/about' },
                            { text: 'Careers at Al Buraimi University College', href: '/main/careers' },
                            { text: 'Media', href: '/main/social-media' },
                            { text: 'Alumni', href: '/main/career-guidance' },
                            { text: 'Contact Us', href: '/main/contact-directory' },
                        ],
                    },
                },
                newsletter: {
                    send: 'Send',
                    placeholder: 'Enter your email',
                    brand: 'Al Buraimi University College',
                    privacy: 'Privacy Policy',
                    rights: 'All rights reserved © BUC 2025',
                    subscribe: 'Subscribe to our newsletter',
                },
            },
        } as const;

        return byLocale[localeKey];
    }, [localeKey]);

    return (
        <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#1f3540] text-gray-300 relative overflow-hidden">
            {/* Motif Pattern - White with 15% opacity */}
            <div
                className="absolute inset-0 opacity-35 "
                style={{
                    backgroundImage: `url(${motifPattern.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto 200%',
                    backgroundPosition: 'left center',
                    zIndex: 1,
                    mixBlendMode: 'soft-light',
                }}
            ></div>

            {/* Row 1 - Darkest Blue */}
            <div className="py-12 relative z-10 border-b border-white/20">
                <div className="w-full px-4 md:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

                        {/* Logo Section */}
                        <div className="col-span-2 md:col-span-3 lg:col-span-1 flex justify-center lg:justify-end order-first lg:order-last">
                            <div className="text-center">
                                <Image
                                    width={150}
                                    height={100}
                                    src={bucLogoFull}
                                    alt={t.alt}
                                    className="h-20 w-auto mx-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* الأقسام والبرامج */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-base">{t.sections.colleges.title}</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                {t.sections.colleges.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#6096b4] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* القبول */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-base">{t.sections.admission.title}</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                {t.sections.admission.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#6096b4] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* البحث العلمي */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-base">{t.sections.research.title}</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                {t.sections.research.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#6096b4] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* حياة الطلبة */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-base">{t.sections.studentLife.title}</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                {t.sections.studentLife.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#6096b4] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* روابط أخرى */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-base">{t.sections.otherLinks.title}</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                {t.sections.otherLinks.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="hover:text-[#6096b4] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                    </div>
                </div>
            </div>

            {/* Row 2 - كلية البريمي الجامعية - Lighter Blue */}
            <div className="py-8 relative z-10 border-b border-white/20">
                <div className="w-full px-4 md:px-8 lg:px-12">
                    {/* Search Bar & Contact Info */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Search Bar */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button
                                className="bg-[#6096b4] hover:bg-[#c2a772] text-white font-bold px-6 h-10 rounded-md transition-all"
                            >
                                {t.newsletter.send}
                            </Button>
                            <Input
                                type="text"
                                placeholder={t.newsletter.placeholder}
                                className="bg-transparent border border-gray-700 text-white placeholder:text-gray-500 h-10 text-sm w-full md:w-64"
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                            <a
                                href={contactTelHref(DEFAULT_SITE_CONTACT_SETTINGS.callPhone1)}
                                className="flex items-center gap-2 hover:text-[#6096b4] transition-colors"
                            >
                                <Phone className="size-4" />
                                <span dir="ltr">{DEFAULT_SITE_CONTACT_SETTINGS.callPhone1}</span>
                            </a>
                            <a
                                href={contactTelHref(DEFAULT_SITE_CONTACT_SETTINGS.callPhone2)}
                                className="flex items-center gap-2 hover:text-[#6096b4] transition-colors"
                            >
                                <Phone className="size-4" />
                                <span dir="ltr">{DEFAULT_SITE_CONTACT_SETTINGS.callPhone2}</span>
                            </a>
                            <a
                                href={CONTACT_MAILTO}
                                className="flex items-center gap-2 hover:text-[#6096b4] transition-colors"
                            >
                                <Mail className="size-4" />
                                <span>{CONTACT_PUBLIC_EMAIL}</span>
                            </a>
                            <span className="text-white">{t.newsletter.brand}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3 - جميع الحقوق - Even Lighter */}
            <div className="py-6 relative z-10 border-b border-white/20">
                <div className="w-full px-4 md:px-8 lg:px-12">
                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                        <a href="/main/privacy-policy" className="text-gray-400 hover:text-[#6096b4] transition-colors">
                            {t.newsletter.privacy}
                        </a>
                        <p className="text-gray-500 text-center">
                            {t.newsletter.rights}
                        </p>
                    </div>
                </div>
            </div>

            {/* Row 4 - Newsletter Banner - Lightest */}
            <div className="py-4 relative z-10">
                <div className="w-full px-4 md:px-8 lg:px-12">
                    <p className="text-white text-center text-sm font-bold">
                        {t.newsletter.subscribe}
                    </p>
                </div>
            </div>
        </footer>
    );
}