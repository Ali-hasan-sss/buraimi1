
"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
    Brain,
    Sparkles,
    BookOpen,
    Lightbulb,
    ExternalLink,
    CheckCircle,
    Users,
    Database,
    ChevronLeft,
    Phone,
    Mail,
    ArrowRight,
} from 'lucide-react';
import { aiTools, benefits, useCases } from '@/staticData/aiToolsData';

export default function AIToolsPage() {
    const locale = useLocale();
    const isAr = locale === 'ar';


    const tipsAr = [
        'استخدم أسئلة واضحة ومحددة للحصول على إجابات دقيقة',
        'تحقق دائماً من مصداقية المعلومات المقدمة',
        'استفد من التوصيات المخصصة لاكتشاف مصادر جديدة',
        'جرّب أدوات مختلفة للعثور على الأنسب لاحتياجاتك',
        'شارك النتائج المفيدة مع زملائك الباحثين',
        'تواصل مع أمناء المكتبة للحصول على المساعدة',
    ];
    const tipsEn = [
        'Use clear and specific questions to get accurate answers',
        'Always verify the credibility of the provided information',
        'Leverage personalized recommendations to discover new sources',
        'Try different tools to find what fits your needs best',
        'Share useful findings with your fellow researchers',
        'Contact library staff for support when needed',
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-14 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full">
                                <Brain className="size-6  sm:size-16 lg:size-20" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
                            {isAr ? 'أدوات الذكاء الاصطناعي' : 'AI Tools'}
                        </h1>
                        <h2 className="text-base sm:text-xl lg:text-3xl font-bold mb-4 sm:mb-6 opacity-90">
                            {isAr ? 'AI Tools for Library Services' : 'AI Tools for Library Services'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-2xl opacity-95 leading-relaxed">
                            {isAr
                                ? 'تحويل خدمات المكتبات من خلال تعزيز تجربة المستخدم وتبسيط العمليات'
                                : 'Transforming library services by enhancing user experience and streamlining operations'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">

                        <div className="flex items-start gap-4 sm:gap-6 mb-6">
                            <div className="bg-[#254151] text-white size-14 sm:size-20 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                                <Brain className="size-7 sm:size-10" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                                    {isAr ? 'أدوات الذكاء الاصطناعي وخدمات المكتبة' : 'AI Tools and Library Services'}
                                </h2>
                                <p className="text-sm sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4">
                                    {isAr
                                        ? 'تعمل أدوات الذكاء الاصطناعي (AI) على تحويل خدمات المكتبات بشكل متزايد من خلال تعزيز تجربة المستخدم وتبسيط العمليات. بالإضافة إلى ذلك، تقوم خوارزميات التعلم الآلي بتحليل بيانات المستخدم لتخصيص التوصيات، مما يسهل على المستفيدين اكتشاف المواد ذات الصلة.'
                                        : 'AI tools are increasingly transforming library services by enhancing user experience and streamlining operations. In addition, machine-learning algorithms analyze user data to personalize recommendations, making it easier to discover relevant materials.'}
                                </p>
                                <p className="text-xs sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                    {isAr
                                        ? 'وعلاوة على ذلك، يمكن لأدوات الذكاء الاصطناعي المساعدة في إدارة المجموعات الرقمية، وتحسين وظائف البحث، وحتى تسهيل ترجمة اللغات، وبالتالي توسيع نطاق الوصول إلى المعلومات لمختلف مجموعات المستخدمين. بشكل عام، لا يؤدي دمج الذكاء الاصطناعي في خدمات المكتبة إلى زيادة الكفاءة فحسب، بل يثري أيضًا بيئة التعلم لجميع المستخدمين.'
                                        : 'Moreover, AI can help manage digital collections, improve search functions, and facilitate language translation—expanding access to information for different user groups. Overall, integrating AI boosts efficiency and enriches the learning environment for everyone.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'فوائد الذكاء الاصطناعي في المكتبات' : 'Benefits of AI in Libraries'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr ? 'كيف تحسّن أدوات AI تجربة المستخدم' : 'How AI tools enhance user experience'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 ${benefit.borderColor} hover:shadow-2xl transition-all`}
                            >
                                <div
                                    className={`${benefit.bgColor} ${benefit.textColor} size-12 sm:size-16 rounded-full flex items-center justify-center mb-5 sm:mb-6`}
                                >
                                    <benefit.icon className="size-5 sm:size-8" />
                                </div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#254151] mb-2">
                                    {isAr ? benefit.title : benefit.titleEn}
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-3">
                                    {isAr ? benefit.titleEn : benefit.title}
                                </p>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                    {isAr ? benefit.description : benefit.descriptionEn}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'الأدوات المتاحة' : 'Available Tools'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr
                                ? 'استكشف أفضل أدوات الذكاء الاصطناعي للبحث الأكاديمي'
                                : 'Explore the best AI tools for academic research'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {aiTools.map((tool, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-2xl overflow-hidden border-2 ${tool.borderColor} hover:shadow-3xl transition-all`}
                            >
                                <div className={`${tool.headerBg} text-white p-6 sm:p-8`}>
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                                            <tool.icon className="size-9 sm:size-12" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-bold">{tool.name}</h3>
                                            <p className="text-base sm:text-xl opacity-90">{tool.nameAr}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 inline-block">
                                        <p className="text-sm sm:text-lg font-semibold">{tool.provider}</p>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="mb-6">
                                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-2">
                                            {isAr ? tool.description : tool.descriptionEn}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 italic">
                                            {isAr ? tool.descriptionEn : tool.description}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-4 flex items-center gap-2">
                                            <Sparkles className="size-5 sm:size-6 text-amber-600" />
                                            <span>{isAr ? 'المميزات الرئيسية:' : 'Key Features:'}</span>
                                        </h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            {(isAr ? tool.features : tool.featuresEn).map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center gap-3 ${tool.bgColor} rounded-lg p-3 border-2 ${tool.borderColor}`}
                                                >
                                                    <CheckCircle className={`size-4 sm:size-5 ${tool.textColor} flex-shrink-0`} />
                                                    <span className="text-gray-700 font-semibold text-xs sm:text-sm lg:text-base">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-3 w-full ${tool.btnBg} text-white px-6 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg`}
                                    >
                                        <span>{isAr ? 'اختر هنا للقراءة' : 'Open to Read'}</span>
                                        <ExternalLink className="size-5 sm:size-6" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">
                            {isAr ? 'حالات الاستخدام' : 'Use Cases'}
                        </h2>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                            {isAr ? 'كيف يمكن استخدام أدوات AI' : 'How AI tools can be used'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-xl overflow-hidden border-2 ${useCase.borderColor}`}
                            >
                                <div className={`${useCase.headerBg} text-white p-5 sm:p-6 text-center`}>
                                    <div className="bg-white/20 backdrop-blur-sm size-16 sm:size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <useCase.icon className="size-8 sm:size-10" />
                                    </div>
                                    <h3 className="text-lg sm:text-2xl font-bold">{isAr ? useCase.title : useCase.titleEn}</h3>
                                    <p className="text-sm sm:text-lg opacity-90 mt-2">{isAr ? useCase.titleEn : useCase.title}</p>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <div className="space-y-3">
                                        {(isAr ? useCase.items : useCase.itemsEn).map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-3 ${useCase.bgColor} rounded-lg p-3 border-2 ${useCase.borderColor}`}
                                            >
                                                <ArrowRight className={`size-4 sm:size-5 ${useCase.textColor} flex-shrink-0`} />
                                                <span className="text-gray-700 font-semibold text-xs sm:text-sm lg:text-base">{item}</span>
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
                        <div className="text-center mb-6 sm:mb-8">
                            <Lightbulb className="size-12 sm:size-16 text-amber-600 mx-auto mb-4" />
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                                {isAr ? 'نصائح الاستخدام' : 'Usage Tips'}
                            </h2>
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                                {isAr ? 'للحصول على أفضل النتائج' : 'For best results'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {(isAr ? tipsAr : tipsEn).map((tip, idx) => (
                                <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-4 border-2 border-amber-200">
                                    <div className="bg-amber-600 text-white size-7 sm:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1 text-xs sm:text-sm lg:text-base">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
                        <div className="text-center mb-6 sm:mb-8">
                            <Users className="size-8 sm:size-16 text-blue-600 mx-auto mb-4" />
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">
                                {isAr ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?'}
                            </h2>
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
                                {isAr ? 'فريق المكتبة جاهز لمساعدتك' : 'The library team is ready to help'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200 text-center">
                                <Mail className="size-5 sm:size-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-xl font-bold text-[#254151] mb-2">{isAr ? 'البريد الإلكتروني' : 'Email'}</h3>
                                <a
                                    href="mailto:librarian_team@buc.edu.om"
                                    className="text-blue-600 hover:underline text-sm sm:text-lg break-all"
                                >
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
                        {isAr ? 'ابدأ باستخدام أدوات AI اليوم' : 'Start Using AI Tools Today'}
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                        {isAr ? 'استكشف الأدوات وحسّن تجربتك البحثية' : 'Explore tools and enhance your research experience'}
                    </p>
                    <div className="grid sm:flex flex-wrap justify-center gap-4">
                        <Link
                            href="/main/library"
                            className="inline-flex items-center gap-2 bg-white text-[#254151] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <BookOpen className="size-5 sm:size-6" />
                            <span>{isAr ? 'المكتبة الإلكترونية' : 'Library'}</span>
                        </Link>
                        <Link
                            href="/main/library/electronic-resources"
                            className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <Database className="size-5 sm:size-6" />
                            <span>{isAr ? 'المصادر الإلكترونية' : 'Electronic Resources'}</span>
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
