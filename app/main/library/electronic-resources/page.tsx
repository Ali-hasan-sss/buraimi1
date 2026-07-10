"use client"
import {
    Database,
    Globe,
    Clock,
    Users,
    BookOpen,
    Search,
    Download,
    Unlock,
    GraduationCap,
    Briefcase,
    FileText,
    Video,
    Headphones,
    Image as ImageIcon,
    CheckCircle,
    ExternalLink,
    Monitor,
    Smartphone,
    Tablet,
    Shield,
    BookMarked,
    Lightbulb,
    ChevronLeft,
    Phone,
    Mail,
    HelpCircle,
    Play
} from 'lucide-react';
import Link from 'next/link';

import { useMemo, useState } from "react"

export default function ElectronicResourcesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const colorClasses = useMemo(() => {
        return {
            blue: {
                border200: 'border-blue-200',
                bg100: 'bg-blue-100',
                text600: 'text-blue-600',
                text700: 'text-blue-700',
                from600: 'from-blue-600',
                to500: 'to-blue-500',
            },
            green: {
                border200: 'border-green-200',
                bg100: 'bg-green-100',
                text600: 'text-green-600',
                text700: 'text-green-700',
                from600: 'from-green-600',
                to500: 'to-green-500',
            },
            purple: {
                border200: 'border-purple-200',
                bg100: 'bg-purple-100',
                text600: 'text-purple-600',
                text700: 'text-purple-700',
                from600: 'from-purple-600',
                to500: 'to-purple-500',
            },
            red: {
                border200: 'border-red-200',
                bg100: 'bg-red-100',
                text600: 'text-red-600',
                text700: 'text-red-700',
                from600: 'from-red-600',
                to500: 'to-red-500',
            },
            amber: {
                border200: 'border-amber-200',
                bg100: 'bg-amber-100',
                text600: 'text-amber-600',
                text700: 'text-amber-700',
                from600: 'from-amber-600',
                to500: 'to-amber-500',
            },
            teal: {
                border200: 'border-teal-200',
                bg100: 'bg-teal-100',
                text600: 'text-teal-600',
                text700: 'text-teal-700',
                from600: 'from-teal-600',
                to500: 'to-teal-500',
            },
            indigo: {
                border200: 'border-indigo-200',
                bg100: 'bg-indigo-100',
                text600: 'text-indigo-600',
                text700: 'text-indigo-700',
                from600: 'from-indigo-600',
                to500: 'to-indigo-500',
            },
            orange: {
                border200: 'border-orange-200',
                bg100: 'bg-orange-100',
                text600: 'text-orange-600',
                text700: 'text-orange-700',
                from600: 'from-orange-600',
                to500: 'to-orange-500',
            },
            yellow: {
                border200: 'border-yellow-200',
                bg100: 'bg-yellow-100',
                text600: 'text-yellow-600',
                text700: 'text-yellow-700',
                from600: 'from-yellow-600',
                to500: 'to-yellow-500',
            },
        } as const;
    }, []);

    const features = [
        {
            icon: Clock,
            title: 'متاح 24/7',
            titleEn: 'Available 24/7',
            description: 'الوصول إلى المصادر على مدار الساعة طوال أيام الأسبوع',
            color: 'blue'
        },
        {
            icon: Globe,
            title: 'من أي مكان',
            titleEn: 'From Anywhere',
            description: 'استخدم المصادر من المنزل، المكتبة، أو أي مكان آخر',
            color: 'green'
        },
        {
            icon: Users,
            title: 'لجميع المستخدمين',
            titleEn: 'For All Users',
            description: 'متاح للطلبة وأعضاء الهيئة الأكاديمية والباحثين',
            color: 'purple'
        },
        {
            icon: Database,
            title: 'قواعد بيانات متنوعة',
            titleEn: 'Diverse Databases',
            description: 'الوصول إلى مئات الآلاف من المصادر العلمية',
            color: 'amber'
        },
        {
            icon: Search,
            title: 'بحث متقدم',
            titleEn: 'Advanced Search',
            description: 'أدوات بحث قوية للعثور على المصادر بسرعة',
            color: 'red'
        },
        {
            icon: Download,
            title: 'تحميل مجاني',
            titleEn: 'Free Download',
            description: 'حمّل المقالات والأبحاث بصيغ متنوعة',
            color: 'teal'
        }
    ];

    const databases = [
        {
            name: 'IEEE Xplore Digital Library',
            description: 'قاعدة بيانات متخصصة في الهندسة والتكنولوجيا والعلوم التطبيقية',
            category: 'engineering',
            subjects: ['الهندسة', 'تقنية المعلومات', 'الإلكترونيات', 'الاتصالات'],
            icon: Monitor,
            color: 'blue',
            url: 'https://ieeexplore.ieee.org'
        },
        {
            name: 'Emerald Insight',
            description: 'مجموعة شاملة من الدوريات في إدارة الأعمال والعلوم الاجتماعية',
            category: 'business',
            subjects: ['إدارة الأعمال', 'التسويق', 'الإدارة', 'الاقتصاد'],
            icon: Briefcase,
            color: 'green',
            url: 'https://www.emerald.com'
        },
        {
            name: 'JSTOR',
            description: 'أرشيف رقمي للمجلات الأكاديمية والكتب والمصادر الأولية',
            category: 'humanities',
            subjects: ['العلوم الإنسانية', 'الآداب', 'التاريخ', 'الفلسفة'],
            icon: BookMarked,
            color: 'purple',
            url: 'https://www.jstor.org'
        },
        {
            name: 'ProQuest',
            description: 'قاعدة بيانات شاملة تغطي جميع التخصصات الأكاديمية',
            category: 'multidisciplinary',
            subjects: ['متعدد التخصصات', 'الأبحاث', 'الرسائل العلمية'],
            icon: Database,
            color: 'amber',
            url: 'https://www.proquest.com'
        },
        {
            name: 'EBSCO',
            description: 'مجموعة واسعة من قواعد البيانات الأكاديمية والبحثية',
            category: 'multidisciplinary',
            subjects: ['العلوم', 'الطب', 'التمريض', 'علم النفس'],
            icon: FileText,
            color: 'red',
            url: 'https://www.ebsco.com'
        },
        {
            name: 'Springer Link',
            description: 'منصة للكتب والمجلات العلمية في مختلف المجالات',
            category: 'science',
            subjects: ['العلوم الطبيعية', 'الطب', 'الهندسة', 'الرياضيات'],
            icon: BookOpen,
            color: 'teal',
            url: 'https://link.springer.com'
        },
        {
            name: 'Sage Journals',
            description: 'دوريات علمية في العلوم الاجتماعية والإنسانية',
            category: 'social',
            subjects: ['علم الاجتماع', 'التربية', 'العلوم السياسية'],
            icon: Users,
            color: 'indigo',
            url: 'https://journals.sagepub.com'
        },
        {
            name: 'Oxford Academic',
            description: 'مجلات أكاديمية من جامعة أكسفورد',
            category: 'multidisciplinary',
            subjects: ['القانون', 'الطب', 'العلوم الاجتماعية'],
            icon: GraduationCap,
            color: 'blue',
            url: 'https://academic.oup.com'
        },
        {
            name: 'Taylor & Francis Online',
            description: 'منصة للمجلات العلمية في مختلف التخصصات',
            category: 'multidisciplinary',
            subjects: ['العلوم', 'التكنولوجيا', 'الطب', 'العلوم الإنسانية'],
            icon: Globe,
            color: 'orange',
            url: 'https://www.tandfonline.com'
        },
        {
            name: 'ScienceDirect',
            description: 'قاعدة بيانات Elsevier للمجلات والكتب العلمية',
            category: 'science',
            subjects: ['العلوم', 'الطب', 'الهندسة', 'التكنولوجيا'],
            icon: Lightbulb,
            color: 'yellow',
            url: 'https://www.sciencedirect.com'
        }
    ];

    const categories = [
        { id: 'all', label: 'جميع التخصصات', labelEn: 'All Disciplines' },
        { id: 'engineering', label: 'الهندسة والتكنولوجيا', labelEn: 'Engineering & Technology' },
        { id: 'business', label: 'إدارة الأعمال', labelEn: 'Business' },
        { id: 'science', label: 'العلوم', labelEn: 'Science' },
        { id: 'humanities', label: 'العلوم الإنسانية', labelEn: 'Humanities' },
        { id: 'social', label: 'العلوم الاجتماعية', labelEn: 'Social Sciences' },
        { id: 'multidisciplinary', label: 'متعدد التخصصات', labelEn: 'Multidisciplinary' }
    ];

    const accessSteps = [
        {
            step: '1',
            title: 'زيارة منصة مصادر',
            description: 'افتح الرابط: https://www.masader.om',
            icon: Globe
        },
        {
            step: '2',
            title: 'اختر المؤسسة',
            description: 'اختر "كلية البريمي الجامعية" من القائمة',
            icon: Search
        },
        {
            step: '3',
            title: 'تسجيل الدخول',
            description: 'استخدم بيانات الدخول الجامعية الخاصة بك',
            icon: Unlock
        },
        {
            step: '4',
            title: 'ابدأ البحث',
            description: 'ابحث في قواعد البيانات المتاحة',
            icon: BookOpen
        }
    ];

    const resourceTypes = [
        { icon: FileText, label: 'مقالات علمية', count: '2M+', color: 'blue' },
        { icon: BookOpen, label: 'كتب إلكترونية', count: '500K+', color: 'green' },
        { icon: GraduationCap, label: 'رسائل علمية', count: '300K+', color: 'purple' },
        { icon: Video, label: 'مواد مرئية', count: '100K+', color: 'red' },
        { icon: Headphones, label: 'مواد صوتية', count: '50K+', color: 'amber' },
        { icon: ImageIcon, label: 'صور ورسوم', count: '1M+', color: 'teal' }
    ];

    const filteredDatabases = selectedCategory === 'all'
        ? databases
        : databases.filter(db => db.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-12 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-full">
                                <Database className="size-12 sm:size-16 lg:size-20" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4">منصة مصادر الإلكترونية</h1>
                        <h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold mb-4 sm:mb-6 opacity-90">Masader Electronic Resources Platform</h2>
                        <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl opacity-95 leading-relaxed mb-3 sm:mb-4">
                            الشبكة العمانية للبحث العلمي والتعلم
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl opacity-90 mb-6 sm:mb-8">
                            Oman Research and Education Network
                        </p>

                        {/* Quick Access Button */}
                        <a
                            href="https://www.masader.om"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#254151] px-5 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-base lg:text-xl 2xl:text-2xl"
                        >
                            <Globe className="size-5 sm:size-6 lg:size-7 2xl:size-8" />
                            <span>الدخول إلى منصة مصادر</span>
                            <ExternalLink className="size-5 sm:size-6 lg:size-6 2xl:size-7" />
                        </a>
                    </div>
                </div>
            </section>

            {/* About Platform Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-2xl p-5 sm:p-8 lg:p-10 border-2 border-blue-200">
                        <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-[#254151] text-white size-14 sm:size-16 lg:size-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Database className="size-7 sm:size-8 lg:size-10" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">عن منصة مصادر</h2>
                                <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-700 leading-relaxed mb-3 sm:mb-4">
                                    توفر منصة مصادر إمكانية الوصول إلى قواعد البيانات والمصادر الإلكترونية المتنوعة في أي وقت، حيث تتاح خدماتها على مدار الساعة (24/7)، مما يتيح للطلبة وأعضاء الهيئة الأكاديمية استخدام المصادر في أي وقت ومن أي مكان.
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-600 leading-relaxed">
                                    المنصة هي جزء من الشبكة العمانية للبحث العلمي والتعلم (OREN)، وتوفر وصولاً مجانياً لجميع مؤسسات التعليم العالي في سلطنة عمان إلى أفضل قواعد البيانات والمجلات العلمية العالمية.
                                </p>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {resourceTypes.map((type, index) => (
                                <div key={index} className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 border-2 ${colorClasses[type.color as keyof typeof colorClasses].border200} hover:shadow-xl transition-all text-center`}>
                                    <div className={`${colorClasses[type.color as keyof typeof colorClasses].bg100} ${colorClasses[type.color as keyof typeof colorClasses].text600} size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                        <type.icon className="size-6 sm:size-7 lg:size-8" />
                                    </div>
                                    <h3 className={`text-lg sm:text-2xl lg:text-3xl font-bold ${colorClasses[type.color as keyof typeof colorClasses].text600} mb-1 sm:mb-2`}>{type.count}</h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-semibold">{type.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">مميزات المنصة</h2>
                        <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">لماذا تستخدم منصة مصادر؟</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className={`bg-white rounded-lg shadow-xl p-5 sm:p-6 lg:p-8 border-2 ${colorClasses[feature.color as keyof typeof colorClasses].border200} hover:shadow-2xl transition-all`}>
                                <div className={`${colorClasses[feature.color as keyof typeof colorClasses].bg100} ${colorClasses[feature.color as keyof typeof colorClasses].text600} size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center mb-4 sm:mb-6`}>
                                    <feature.icon className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold text-[#254151] mb-1 sm:mb-2">{feature.title}</h3>
                                <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-500 mb-2 sm:mb-3">{feature.titleEn}</p>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Access Steps Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">كيفية الوصول إلى المنصة</h2>
                        <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">اتبع هذه الخطوات البسيطة للبدء</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {accessSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connector Line */}
                                {index < accessSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-[#6096b4] to-[#254151] z-0"></div>
                                )}

                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl p-5 sm:p-6 border-2 border-blue-200 hover:shadow-2xl transition-all relative z-10">
                                    {/* Step Number */}
                                    <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center text-lg sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 mx-auto shadow-lg">
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="bg-blue-100 text-blue-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                        <step.icon className="size-6 sm:size-7 lg:size-8" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-bold text-[#254151] mb-2 sm:mb-3 text-center">{step.title}</h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Tutorial */}
                    <div className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-xl p-5 sm:p-6 lg:p-8 border-2 border-purple-200">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="bg-purple-600 text-white size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                <Play className="size-6 sm:size-7 lg:size-8" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold text-[#254151]">دليل الاستخدام المرئي</h3>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600">شاهد الفيديو التعليمي لمعرفة كيفية استخدام المنصة</p>
                            </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg 2xl:text-xl flex items-center justify-center gap-2 sm:gap-3">
                            <Video className="size-5 sm:size-6 lg:size-7" />
                            <span>مشاهدة الفيديو التعليمي</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Databases Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">قواعد البيانات المتاحة</h2>
                        <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">استكشف مجموعة واسعة من المصادر العلمية</p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-bold transition-all ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-[#254151] to-[#6096b4] text-white shadow-xl'
                                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#6096b4]'
                                    }`}
                            >
                                <span className="block text-sm sm:text-base">{category.label}</span>
                                <span className="block text-xs sm:text-sm opacity-80">{category.labelEn}</span>
                            </button>
                        ))}
                    </div>

                    {/* Database Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredDatabases.map((db, index) => (
                            <div key={index} className={`bg-white rounded-lg shadow-xl overflow-hidden border-2 ${colorClasses[db.color as keyof typeof colorClasses].border200} hover:shadow-2xl transition-all`}>
                                <div className={`bg-gradient-to-r ${colorClasses[db.color as keyof typeof colorClasses].from600} ${colorClasses[db.color as keyof typeof colorClasses].to500} text-white p-5 sm:p-6`}>
                                    <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                                        <div className="bg-white/20 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg">
                                            <db.icon className="size-7 sm:size-8 lg:size-10" />
                                        </div>
                                        <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold">{db.name}</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg opacity-90">{db.description}</p>
                                </div>

                                <div className="p-5 sm:p-6">
                                    {/* Subjects */}
                                    <div className="mb-6">
                                        <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                                            <BookOpen className="size-4 sm:size-5 text-gray-600" />
                                            <span>التخصصات:</span>
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {db.subjects.map((subject, idx) => (
                                                <span key={idx} className={`${colorClasses[db.color as keyof typeof colorClasses].bg100} ${colorClasses[db.color as keyof typeof colorClasses].text700} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold`}>
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Access Button */}
                                    <a
                                        href="https://www.masader.om"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r ${colorClasses[db.color as keyof typeof colorClasses].from600} ${colorClasses[db.color as keyof typeof colorClasses].to500} text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base`}
                                    >
                                        <ExternalLink className="size-5 sm:size-6" />
                                        <span>الدخول إلى القاعدة</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Device Compatibility Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-2xl p-5 sm:p-8 lg:p-10 border-2 border-indigo-200">
                        <div className="text-center mb-8">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">متوافق مع جميع الأجهزة</h2>
                            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">استخدم المنصة من أي جهاز تفضله</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Monitor, label: 'الحاسوب', color: 'blue' },
                                { icon: Tablet, label: 'الجهاز اللوحي', color: 'purple' },
                                { icon: Smartphone, label: 'الهاتف الذكي', color: 'indigo' }
                            ].map((device, index) => (
                                <div key={index} className={`bg-white rounded-lg shadow-lg p-5 sm:p-6 lg:p-8 border-2 ${colorClasses[device.color as keyof typeof colorClasses].border200} text-center hover:shadow-xl transition-all`}>
                                    <div className={`${colorClasses[device.color as keyof typeof colorClasses].bg100} ${colorClasses[device.color as keyof typeof colorClasses].text600} size-16 sm:size-20 lg:size-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                        <device.icon className="size-8 sm:size-10 lg:size-12" />
                                    </div>
                                    <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold text-[#254151] mb-1 sm:mb-2">{device.label}</h3>
                                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm sm:text-base">
                                        <CheckCircle className="size-5 sm:size-6" />
                                        <span className="text-sm sm:text-base">متوافق</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Help & Support Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-2xl p-5 sm:p-8 lg:p-10 border-2 border-amber-200">
                        <div className="text-center mb-8">
                            <HelpCircle className="size-10 sm:size-12 lg:size-16 text-amber-600 mx-auto mb-3 sm:mb-4" />
                            <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">هل تحتاج إلى مساعدة؟</h2>
                            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">فريق المكتبة جاهز لمساعدتك</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200">
                                <Mail className="size-7 sm:size-8 lg:size-10 text-blue-600 mb-3 sm:mb-4" />
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">البريد الإلكتروني</h3>
                                <a href="mailto:library@buc.edu.om" className="text-blue-600 hover:underline text-sm sm:text-base lg:text-lg">
                                    library@buc.edu.om
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-2 border-green-200">
                                <Phone className="size-7 sm:size-8 lg:size-10 text-green-600 mb-3 sm:mb-4" />
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">الهاتف</h3>
                                <a href="tel:+96825652222" className="text-green-600 hover:underline text-sm sm:text-base lg:text-lg" dir="ltr">
                                    +968 2565 2222
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/main/library"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg"
                            >
                                <BookOpen className="size-5 sm:size-6" />
                                <span>زيارة صفحة المكتبة</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Notice */}
            <section className="py-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-start gap-4 sm:gap-6">
                        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full flex-shrink-0">
                            <Shield className="size-8 sm:size-10 lg:size-12" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold mb-2 sm:mb-3">ملاحظة أمنية</h3>
                            <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg leading-relaxed opacity-90">
                                للوصول إلى المنصة من خارج شبكة الجامعة، يُرجى استخدام VPN أو تسجيل الدخول من خلال بوابة الطالب/الموظف. جميع الوصولات محمية ومشفرة لضمان أمن البيانات والخصوصية.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold mb-4 sm:mb-6">ابدأ البحث الآن</h2>
                    <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                        استفد من آلاف المصادر العلمية المتاحة على منصة مصادر
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://www.masader.om"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-[#254151] px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <Globe className="size-5 sm:size-6" />
                            <span>الدخول إلى منصة مصادر</span>
                            <ExternalLink className="size-4 sm:size-5" />
                        </a>
                        <Link
                            href="/main/library"
                            className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <BookOpen className="size-5 sm:size-6" />
                            <span>المكتبة الإلكترونية</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-sm sm:text-base lg:text-lg"
                        >
                            <ChevronLeft className="size-5 sm:size-6" />
                            <span>العودة للرئيسية</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}