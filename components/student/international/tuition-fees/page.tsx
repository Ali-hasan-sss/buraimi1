"use client";

import React from 'react';
import { Award, GraduationCap, AlertCircle, TrendingDown } from 'lucide-react';
// import heroImage from '@/public/assets/about/foundation_landing.webp';

import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import { gradPrograms, scholarships, undergradPrograms } from '@/staticData/TuitionFees';
import { useLocale } from 'next-intl';

export default function TuitionFees() {

    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    const t = isAr
        ? {
            heroTitle: 'الرسوم الدراسية والمساعدات المالية',
            heroSubtitle: 'رسوم دراسية تنافسية مع خصومات ومساعدات مالية متنوعة',
            applicationFeeTitle: 'رسوم التقديم',
            applicationFeePrefix: 'رسوم التقديم',
            applicationFeeAmount: '(150) ريال عماني',
            applicationFeeSuffix: 'تُدفع عند تقديم الطلب',
            applicationFeeNonRefundable: '(رسوم غير قابلة للاسترداد)',
            undergradTitle: 'الرسوم الدراسية للمرحلة الجامعية الأولى',
            gradTitle: 'الرسوم الدراسية للدراسات العليا',
            colProgram: 'التخصص',
            colAdmission: 'رسوم القبول',
            colCreditHour: 'رسم الساعة المعتمدة',
            currencyOmr: 'ر.ع',
            currencyRial: 'ريال',
            scholarshipsTitle: 'المنح الطلابية والمساعدات المالية (الخصومات)',
            stats10Label: '8 فئات',
            stats15Label: 'فئة واحدة',
            stats20Label: '19 فئة',
            stats2530Label: '4 فئات',
            notesTitle: 'ملاحظات هامة',
            notes: [
                'لا يمكن الجمع بين أكثر من خصم واحد، ويُطبق الخصم الأعلى تلقائياً',
                'رسوم التقديم (150 ريال عماني) غير قابلة للاسترداد',
                'يجب تقديم المستندات الداعمة للحصول على الخصم المناسب',
                'الرسوم قابلة للتغيير حسب قرارات مجلس الكلية',
                'للمزيد من المعلومات، يرجى التواصل مع قسم الشؤون المالية',
            ],
        }
        : {
            heroTitle: 'Tuition Fees & Financial Aid',
            heroSubtitle: 'Competitive tuition fees with a variety of discounts and financial aid options',
            applicationFeeTitle: 'Application Fee',
            applicationFeePrefix: 'Application fee',
            applicationFeeAmount: '(150) OMR',
            applicationFeeSuffix: 'is paid upon application submission',
            applicationFeeNonRefundable: '(non-refundable)',
            undergradTitle: 'Undergraduate Tuition Fees',
            gradTitle: 'Graduate Tuition Fees',
            colProgram: 'Program',
            colAdmission: 'Admission Fee',
            colCreditHour: 'Credit Hour Fee',
            currencyOmr: 'OMR',
            currencyRial: 'Rial',
            scholarshipsTitle: 'Scholarships & Financial Aid (Discounts)',
            stats10Label: '8 categories',
            stats15Label: '1 category',
            stats20Label: '19 categories',
            stats2530Label: '4 categories',
            notesTitle: 'Important Notes',
            notes: [
                'Multiple discounts cannot be combined; the highest discount is applied automatically.',
                'The application fee (150 OMR) is non-refundable.',
                'Supporting documents must be provided to obtain the applicable discount.',
                'Fees are subject to change based on College Council decisions.',
                'For more information, please contact the Finance Department.',
            ],
        };

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'green': return 'bg-green-50 border-green-200 text-green-700';
            case 'orange': return 'bg-orange-50 border-orange-200 text-orange-700';
            case 'purple': return 'bg-purple-50 border-purple-200 text-purple-700';
            case 'red': return 'bg-red-50 border-red-200 text-red-700';
            default: return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen" dir={dir}>
            {/* Hero Section */}
            <section className="relative h-[300px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url( /assets/about/foundation_landing.webp  )` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold mb-4">{t.heroTitle}</h1>
                        <p className="text-sm md:text-md lg:text-lg md:text-xl xl:text-2xl max-w-3xl mx-auto">{t.heroSubtitle}</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <StudentsSidebar activeId="tuition-fees" />

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            {/* Application Fee Notice */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-[#c2a772] rounded-lg p-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="size-6 text-[#c2a772] flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-[#254151] mb-2">{t.applicationFeeTitle}</h3>
                                        <p className="text-gray-700">
                                            {t.applicationFeePrefix}{' '}
                                            <span className="font-bold text-[#254151]">{t.applicationFeeAmount}</span>{' '}
                                            {t.applicationFeeSuffix}{' '}
                                            <span className="font-bold text-red-600">{t.applicationFeeNonRefundable}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Undergraduate Tuition Fees */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white p-6">
                                    <h2 className="text-md md:text-xl xl:text-3xl font-bold flex items-center gap-3">
                                        <GraduationCap className="size-8" />
                                        {t.undergradTitle}
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-start font-bold text-gray-700 border-b-2 border-gray-200">{t.colProgram}</th>
                                                <th className="px-6 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">{t.colAdmission}</th>
                                                <th className="px-6 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">{t.colCreditHour}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {undergradPrograms.map((prog, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-semibold text-[#254151]">{isAr ? prog.programAr : prog.programEn}</td>
                                                    <td className="px-6 py-4 text-center text-gray-700">{prog.admission} {t.currencyOmr}</td>
                                                    <td className="px-6 py-4 text-center text-[#6096b4] font-bold">{prog.creditHour} {t.currencyRial}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Graduate Tuition Fees */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="bg-gradient-to-r from-[#6096b4] to-[#c2a772] text-white p-6">
                                    <h2 className="text-md md:text-xl xl:text-3xl font-bold flex items-center gap-3">
                                        <Award className="size-8" />
                                        {t.gradTitle}
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-start font-bold text-gray-700 border-b-2 border-gray-200">{t.colProgram}</th>
                                                <th className="px-6 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">{t.colAdmission}</th>
                                                <th className="px-6 py-4 text-center font-bold text-gray-700 border-b-2 border-gray-200">{t.colCreditHour}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gradPrograms.map((prog, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-semibold text-[#254151]">{isAr ? prog.programAr : prog.programEn}</td>
                                                    <td className="px-6 py-4 text-center text-gray-700">{prog.admission} {t.currencyOmr}</td>
                                                    <td className="px-6 py-4 text-center text-[#6096b4] font-bold">{prog.creditHour} {t.currencyRial}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Scholarships and Financial Aid */}
                            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                                <h2 className="text-md md:text-xl xl:text-3xl font-bold text-[#254151] mb-8 text-center flex items-center justify-center gap-3">
                                    <TrendingDown className="size-8 text-[#6096b4]" />
                                    {t.scholarshipsTitle}
                                </h2>

                                {/* Statistics Summary */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 text-center">
                                        <div className="text-md md:text-xl xl:text-3xl font-bold mb-1">10%</div>
                                        <div className="text-sm opacity-90">{t.stats10Label}</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
                                        <div className="text-md md:text-xl xl:text-3xl font-bold mb-1">15%</div>
                                        <div className="text-sm opacity-90">{t.stats15Label}</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center">
                                        <div className="text-md md:text-xl xl:text-3xl font-bold mb-1">20%</div>
                                        <div className="text-sm opacity-90">{t.stats20Label}</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4 text-center">
                                        <div className="text-md md:text-xl xl:text-3xl font-bold mb-1">25-30%</div>
                                        <div className="text-sm opacity-90">{t.stats2530Label}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {scholarships.map((scholarship) => (
                                        <div
                                            key={scholarship.id}
                                            className={`flex sm:flex-row flex-col items-center justify-between p-4 rounded-lg border-2 ${getColorClasses(scholarship.color)} transition-all hover:shadow-md`}
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="bg-white w-10 h-10 rounded-full hidden sm:flex items-center justify-center font-bold text-gray-700 flex-shrink-0">
                                                    {scholarship.id}
                                                </div>
                                                <span className="font-semibold">{isAr ? scholarship.titleAr : scholarship.titleEn}</span>
                                            </div>
                                            <div className="text-2xl font-bold flex-shrink-0 mx-4 mt-4 sm:mt-0">
                                                {scholarship.percentage}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Important Notes */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-[#c2a772] rounded-lg p-6">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="size-6 text-[#c2a772] flex-shrink-0 hidden sm:flex" />
                                    <div>
                                        <h3 className="text-xl font-bold text-[#254151] mb-3 flex gap-3 items-center">
                                            <AlertCircle className="size-5 text-[#c2a772] flex-shrink-0 flex sm:hidden" />
                                            {t.notesTitle}
                                        </h3>
                                        <ul className="space-y-2 text-gray-700">
                                            {t.notes.map((note) => (
                                                <li key={note} className="flex items-start gap-2">
                                                    <span className="text-[#c2a772] font-bold">•</span>
                                                    <span>{note}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}