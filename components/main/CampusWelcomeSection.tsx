"use client"
import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import campusWelcomeImage from '@/public/assets/campusWelcomeImage.webp';
import buildingImage from '@/public/assets/buildingImage.webp';
import studentsImage from '@/public/assets/studentsImage.webp';
import experienceTextImage from '@/public/assets/3da207d037bead2acafe1ad4e2b8ffa78a443357.png';

import { Button } from '@/components/ui/button';

type Tab = {
    id: string;
    title: string;
    heading: string;
    description: string;
};

export function CampusWelcomeSection() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const localeKey: 'ar' | 'en' = isRTL ? 'ar' : 'en';

    const t = useMemo(() => {
        const byLocale = {
            ar: {
                alt: 'كلية البريمي الجامعية',
                kicker: 'عش تجربة كلية البريمي الجامعية',
                title: 'خطوتك الأولى نحو الحرم الجامعي',
                description:
                    'نوفر لك تجربة تعليمية مميزة داخل الحرم الجامعي تجمع بين الراحة وجودة التعليم، سواء خلال الفصل الدراسي أو في أي وقت آخر. بيئة متكاملة تلبي احتياجات جميع الطلبة.',
                cta: 'اكتشف',
            },
            en: {
                alt: 'Al Buraimi University College',
                kicker: 'Live the Al Buraimi University College experience',
                title: 'Your first step to campus',
                description:
                    'We offer you a distinctive educational experience on campus that combines comfort and quality education, whether during the semester or at any other time. An integrated environment that meets the needs of all students.',
                cta: 'Discover',
            },
        } as const;

        return byLocale[localeKey];
    }, [localeKey]);

    return (
        <section dir={isRTL ? 'rtl' : 'ltr'} className="relative w-full h-[70vh] min-h-[420px] max-h-[560px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    fill
                    src={campusWelcomeImage}
                    alt={t.alt}
                    className="w-full h-full object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className={`relative h-full flex items-start ${isRTL ? 'justify-end' : 'justify-start'} px-4 sm:px-6 lg:px-16 pt-6 z-20`}>
                <div className={`max-w-3xl text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-base sm:text-xl md:text-[41px] font-normal mb-4">
                        {t.kicker}
                    </h3>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        {t.title}
                    </h2>

                    <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                        {t.description}
                    </p>

                    <Button
                        size="lg"
                        className="bg-[#c2a772] hover:bg-[#6096b4] text-white font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-xl transition-all"
                    >
                        {t.cta}
                    </Button>
                </div>
            </div>
        </section>
    );
}

export function CampusExperience() {
    const [activeTab, setActiveTab] = useState('visit');

    const locale = useLocale();
    const isRTL = locale === 'ar';
    const localeKey: 'ar' | 'en' = isRTL ? 'ar' : 'en';

    const enterX = isRTL ? -100 : 100;
    const exitX = isRTL ? 100 : -100;

    const tabs: Tab[] = useMemo(
        () => {
            const ar: Tab[] = [
                {
                    id: 'visit',
                    title: 'قم بزيارة الحرم الجامعي',
                    heading: 'خطوتك الأولى نحو الحرم الجامعي',
                    description:
                        'نوفر لك تجربة تعليمية مميزة داخل الحرم الجامعي تجمع بين الراحة وجودة التعليم، سواء خلال الفصل الدراسي أو في أي وقت آخر بيئة متكاملة تلبي احتياجات جميع الطلبة',
                },
                {
                    id: 'facilities',
                    title: 'تعرف على مرافق حرم كلية البريمي الجامعية',
                    heading: 'مرافق حديثة ومتطورة للمستقبل',
                    description:
                        'يوفر حرم كلية البريمي الجامعية بيئة تعليمية متكاملة بمرافق منفصلة للطلاب والطالبات، تضم مباني حديثة وقاعات دراسية متطورة.',
                },
                {
                    id: 'city',
                    title: 'تعرف على البريمي عن قرب',
                    heading: 'مدينة البريمي — حيث يلتقي التراث بالحداثة',
                    description:
                        'تتميز مدينة البريمي بموقعها الاستراتيجي وتنوعها الثقافي، حيث تجمع بين الأصالة والحداثة في بيئة حيوية متكاملة.',
                },
                {
                    id: 'contact',
                    title: 'تواصل مع كلية البريمي الجامعية',
                    heading: 'نحن هنا لخدمتك وبناء مستقبلك معنا',
                    description:
                        'نشكرك على اهتمامك بـ كلية البريمي الجامعية. يسعدنا استقبال تواصلك والرد على جميع استفساراتك في أقرب وقت.',
                },
            ];

            const en: Tab[] = [
                {
                    id: 'visit',
                    title: 'Visit the campus',
                    heading: 'Your first step to campus',
                    description:
                        'We offer you a distinctive educational experience on campus that combines comfort and quality education, whether during the semester or at any other time. An integrated environment that meets the needs of all students.',
                },
                {
                    id: 'facilities',
                    title: 'Explore campus facilities',
                    heading: 'Modern facilities for the future',
                    description:
                        'Our campus provides an integrated learning environment with separate facilities for male and female students, featuring modern buildings and advanced classrooms.',
                },
                {
                    id: 'city',
                    title: 'Get to know Al Buraimi',
                    heading: 'Al Buraimi — where heritage meets modernity',
                    description:
                        'Al Buraimi is known for its strategic location and cultural diversity, blending authenticity and modernity in a vibrant, integrated environment.',
                },
                {
                    id: 'contact',
                    title: 'Contact the university college',
                    heading: 'We are here to support you',
                    description:
                        'Thank you for your interest in Al Buraimi University College. We are happy to hear from you and respond to your inquiries as soon as possible.',
                },
            ];

            return localeKey === 'ar' ? ar : en;
        },
        [localeKey]
    );

    const activeTabData = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

    return (
        <section dir={isRTL ? 'rtl' : 'ltr'} className="relative bg-white overflow-hidden ">
            <div className="relative w-full min-h-[980px] h-[1100px] sm:h-[1250px] lg:h-[1400px]">
                <div className="absolute inset-0 z-10 bg-gray-300/50"></div>

                <div className="absolute inset-0 z-20 top-0 lg:-top-[100px]">
                    <Image
                        fill
                        src={buildingImage}
                        alt={localeKey === 'ar' ? 'بناية كلية البريمي الجامعية' : 'Al Buraimi University College building'}
                        className="h-full w-full object-cover"
                        sizes="100vw"
                        priority
                    />
                </div>

                <div className="absolute inset-x-0 z-30 top-[420px] sm:top-[500px] lg:top-[550px] bottom-0">
                    <Image
                        fill
                        src={studentsImage}
                        alt={localeKey === 'ar' ? 'طلاب كلية البريمي الجامعية' : 'Students at Al Buraimi University College'}
                        className="h-full w-full object-cover"
                        sizes="100vw"
                    />
                </div>

                <div className="relative z-40 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className={`${isRTL ? 'text-right' : 'text-left'} order-2 lg:order-1 lg:-mt-[480px]`}></div>

                            <div className={`${isRTL ? 'text-right' : 'text-left'} order-1 lg:order-2 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg relative z-20 mt-0 lg:-mt-[480px]`}>
                                <motion.div
                                    className="mb-6 inline-block"
                                    initial={{ opacity: 0, scale: 0.8, y: -30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                                >
                                    <Image
                                        src={experienceTextImage}
                                        alt={localeKey === 'ar' ? 'عش تجربة كلية البريمي الجامعية' : 'Live the Al Buraimi University College experience'}
                                        width={192}
                                        height={64}
                                        className="h-auto w-40 sm:w-48"
                                        priority
                                        style={{
                                            filter: 'brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(1800%) hue-rotate(160deg) brightness(95%) contrast(90%)',
                                        }}
                                    />
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: enterX, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: exitX, scale: 0.9 }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    >
                                        <motion.h1
                                            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#254151] mb-4 sm:mb-6 leading-tight break-words"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            {activeTabData.heading}
                                        </motion.h1>
                                        <motion.p
                                            className="text-base lg:text-lg text-[#254151] leading-relaxed max-w-2xl break-words"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                        >
                                            {activeTabData.description}
                                        </motion.p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-white">
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                        {tabs.map((tab, index) => {
                            const colors = [
                                'bg-[#7db3d1]',
                                'bg-[#6096b4]',
                                'bg-[#4a7088]',
                                'bg-[#254151]',
                            ];

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 sm:py-6 px-3 sm:px-6 text-center text-xs sm:text-sm lg:text-base font-normal transition-all duration-300 ${colors[index]} text-white hover:opacity-90 whitespace-normal break-words ${activeTab === tab.id ? 'shadow-lg' : ''}`}
                                >
                                    {tab.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}