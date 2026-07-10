
"use client";
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
    BookOpen,
    FileText,
    Download,
    CheckCircle,
    Search,
    Users,
    Shield,
    AlertCircle,
    Laptop,
    Database,
    Printer,
    Mail,
    Phone,
    ChevronLeft,
    ArrowRight,
    Award,
    HelpCircle,
    Lightbulb,
} from 'lucide-react';
import { faqs, guideFeatures, notesAr, notesEn, policies, procedures, quickLinks } from '@/staticData/PoliciesLib';

export default function LibraryPoliciesPage() {
    const locale = useLocale();
    const isAr = locale === 'ar';

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-14 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full">
                                <FileText className="size-14 sm:size-16 lg:size-20" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
                            {isAr ? 'دليل خدمات المكتبة' : 'Library Services Guide'}
                        </h1>
                        <h2 className="text-base sm:text-xl lg:text-3xl font-bold mb-4 sm:mb-6 opacity-90">Library Services Guide</h2>
                        <p className="text-sm sm:text-lg lg:text-2xl opacity-95 leading-relaxed">
                            {isAr ? 'إجراءات وسياسات المكتبة' : 'Library procedures and policies'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="bg-[#254151] text-white size-14 sm:size-20 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                                <BookOpen className="size-7 sm:size-10" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                                    {isAr ? 'دليل خدمات المكتبة' : 'Library Services Guide'}
                                </h2>
                                <p className="text-sm sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4">
                                    {isAr
                                        ? 'يوفر دليل خدمات المكتبة نظرة شاملة على أهم الخدمات والمصادر التي تقدمها المكتبة، مع شرح مبسط لكيفية الاستفادة منها. يتضمن الدليل معلومات عن البحث في الفهرس، استعارة الكتب، الوصول إلى المصادر الإلكترونية وغيرها من الخدمات الأخرى.'
                                        : 'This guide provides an overview of key library services and resources, with a simple explanation of how to benefit from them. It includes information on catalog search, borrowing, electronic resources access, and more.'}
                                </p>
                                <p className="text-xs sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                    {isAr ? 'نأمل أن يساعدكم هذا الدليل في تحقيق تجربة معرفية مثمرة.' : 'We hope this guide helps you achieve a productive learning experience.'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <a
                                href="#download"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white px-6 sm:px-10 py-3 sm:py-5 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg lg:text-xl"
                            >
                                <Download className="size-5 sm:size-7" />
                                <span>{isAr ? 'تحميل دليل خدمات المكتبة' : 'Download the Library Services Guide'}</span>
                                <span className="bg-white/20 px-3 py-1 rounded text-xs sm:text-sm">PDF</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'محتويات الدليل' : 'Guide Contents'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr ? 'ما يتضمنه دليل خدمات المكتبة' : 'What the library guide includes'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {guideFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 ${feature.borderColor} hover:shadow-2xl transition-all`}
                            >
                                <div className={`${feature.bgColor} ${feature.textColor} size-12 sm:size-16 rounded-full flex items-center justify-center mb-5 sm:mb-6`}>
                                    <feature.icon className="size-5 sm:size-8" />
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-2">
                                    {isAr ? feature.title : feature.titleEn}
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-3">
                                    {isAr ? feature.titleEn : feature.title}
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                    {isAr ? feature.description : feature.descriptionEn}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'إجراءات الاستخدام' : 'Usage Procedures'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr ? 'خطوات بسيطة للاستفادة من المكتبة' : 'Simple steps to benefit from the library'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {procedures.map((procedure, index) => (
                            <div key={index} className="relative">
                                {index < procedures.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-0"></div>
                                )}

                                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl p-6 border-2 border-blue-200 hover:shadow-2xl transition-all relative z-10">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white size-12 sm:size-16 rounded-full flex items-center justify-center text-xl sm:text-3xl font-bold mb-4 mx-auto shadow-lg">
                                        {procedure.step}
                                    </div>

                                    <div className="bg-blue-100 text-blue-600 size-12 sm:size-16 rounded-full hidden sm:flex items-center justify-center mb-4 mx-auto">
                                        <procedure.icon className="size-5 sm:size-8 " />
                                    </div>

                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-3 text-center">
                                        {isAr ? procedure.title : procedure.titleEn}
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center leading-relaxed">
                                        {isAr ? procedure.description : procedure.descriptionEn}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'السياسات والقواعد' : 'Policies & Rules'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr ? 'القواعد والإجراءات الهامة للمكتبة' : 'Important rules and procedures'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {policies.map((policy, index) => (
                            <div key={index} className={`bg-white rounded-lg shadow-2xl overflow-hidden border-2 ${policy.borderColor}`}>
                                <div className={`${policy.headerBg} text-white p-5 sm:p-6`}>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                                            <policy.icon className="size-8 sm:size-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                                {isAr ? policy.title : policy.titleEn}
                                            </h3>
                                            <p className="text-sm sm:text-lg opacity-90 mt-1">
                                                {isAr ? policy.titleEn : policy.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="space-y-3">
                                        {(isAr ? policy.points : policy.pointsEn).map((point, idx) => (
                                            <div key={idx} className={`flex items-start gap-3 ${policy.bgColor} rounded-lg p-4 border-2 ${policy.borderColor}`}>
                                                <CheckCircle className={`size-5 sm:size-6 ${policy.textColor} flex-shrink-0 mt-0.5`} />
                                                <span className="text-gray-700 font-semibold leading-relaxed text-xs sm:text-sm lg:text-base">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-amber-200">
                        <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <div className="bg-amber-100 text-amber-600 size-12 sm:size-16 rounded-full flex items-center justify-center">
                                <AlertCircle className="size-5 sm:size-8" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151]">{isAr ? 'ملاحظات هامة' : 'Important Notes'}</h2>
                                <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mt-2">{isAr ? 'يرجى الانتباه' : 'Please note'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {(isAr ? notesAr : notesEn).map((note, idx) => (
                                <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-4 border-2 border-amber-200">
                                    <div className="bg-amber-600 text-white size-7 sm:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1 text-xs sm:text-sm lg:text-base">{note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? 'روابط سريعة' : 'Quick Links'}</h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">{isAr ? 'استكشف خدمات المكتبة الأخرى' : 'Explore other library services'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className={`bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 ${link.borderColor} hover:shadow-2xl transition-all text-center group`}
                            >
                                <div className={`${link.bgColor} ${link.textColor} size-12 sm:size-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                    <link.icon className="size-5 sm:size-8" />
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">{isAr ? link.title : link.titleEn}</h3>
                                <ArrowRight className="size-5 sm:size-6 text-gray-400 mx-auto group-hover:text-blue-600 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <HelpCircle className="size-12 sm:size-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">{isAr ? 'إجابات على الأسئلة المتكررة' : 'Answers to common questions'}</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-5 sm:p-6 border-2 border-blue-200">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600 text-white size-7 sm:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-2">{isAr ? faq.qAr : faq.qEn}</h3>
                                        <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{isAr ? faq.aAr : faq.aEn}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
                        <div className="text-center mb-6 sm:mb-8">
                            <Mail className="size-12 sm:size-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? 'هل لديك استفسار؟' : 'Have a question?'} </h2>
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">{isAr ? 'تواصل معنا للحصول على المساعدة' : 'Contact us for support'}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200 text-center">
                                <Mail className="size-5 sm:size-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-xl font-bold text-[#254151] mb-2">{isAr ? 'البريد الإلكتروني' : 'Email'}</h3>
                                <a href="mailto:librarian_team@buc.edu.om" className="text-blue-600 hover:underline text-sm sm:text-lg break-all">
                                    librarian_team@buc.edu.om
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-2 border-green-200 text-center">
                                <Phone className="size-5 sm:size-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-xl font-bold text-[#254151] mb-2">{isAr ? 'الهاتف' : 'Phone'}</h3>
                                <a href="tel:+96825657666" className="text-green-600 hover:underline text-sm sm:text-lg" dir="ltr">
                                    +968 2565 7666
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                        {isAr ? 'ابدأ باستخدام المكتبة اليوم' : 'Start Using the Library Today'}
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                        {isAr ? 'استفد من جميع خدماتنا ومصادرنا المتنوعة' : 'Benefit from all our services and diverse resources'}
                    </p>
                    <div className=" grid sm:flex flex-wrap justify-center gap-4">
                        <a
                            href="#download"
                            className="inline-flex items-center gap-2 bg-white text-[#254151] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <Download className="size-5 sm:size-6" />
                            <span>{isAr ? 'تحميل الدليل' : 'Download Guide'}</span>
                        </a>
                        <Link
                            href="/main/library"
                            className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <BookOpen className="size-5 sm:size-6" />
                            <span>{isAr ? 'المكتبة الإلكترونية' : 'Library'}</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-sm sm:text-lg"
                        >
                            <ChevronLeft className="size-5 sm:size-6" />
                            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
