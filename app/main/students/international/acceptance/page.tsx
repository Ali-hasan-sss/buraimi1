"use client"
import React from 'react';
import { Globe, Plane, Users, Award, CheckCircle, FileText, Calendar, MapPin, Phone, Mail, Clock } from 'lucide-react';
import heroImage from '@/public/assets/about/foundation_landing.webp';
import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import { InternationalAcceptanceData } from '@/staticData/internatinonal-student';
import { useLocale } from 'next-intl';

export default function InternationalAcceptancePage() {

    const { steps, renewalDocuments, visaDocuments } = InternationalAcceptanceData

    const locale = useLocale()
    const isAr = locale === "ar"
    const locVal = isAr ? "ar" : "en"
    return (
        <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[300px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">{isAr ? "قبول الطلبة الدوليين" : "International Student Acceptance"}</h1>
                        <p className="text-xl max-w-3xl mx-auto">{isAr
                            ? "نرحب بالطلبة من جميع أنحاء العالم للانضمام إلى أسرة كلية البريمي الجامعية"
                            : "We welcome students from around the world to join the Buraimi University College family"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <StudentsSidebar activeId="international-acceptance" />

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            {/* Welcome Message */}
                            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white rounded-lg shadow-lg p-8 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg hidden sm:flex">
                                        <Globe className="size-10 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold mb-4">{isAr ? "مرحباً بكم في كلية البريمي الجامعية" : "Welcome to Buraimi University College"}</h2>
                                        <p className="text-lg leading-relaxed">
                                            {isAr
                                                ? "تفخر كلية البريمي الجامعية باستقبال طلبة من مختلف دول العالم. نحن نلتزم بمساعدة الطلاب الدوليين في إتمام جميع الإجراءات اللازمة للالتحاق بالكلية، بما في ذلك تسهيل الحصول على تأشيرة الدراسة."
                                                : "Buraimi University College is proud to welcome students from different countries around the world. We are committed to helping international students complete all necessary procedures for enrollment, including facilitating the obtainment of study visas."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Admission Steps */}
                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-8 mb-8">
                                <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">{isAr ? "خطوات القبول" : "Admission Steps"}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {steps.map((step, index) => {
                                        const title = locVal == "ar" ? step.titleAr : step.titleEn;
                                        const description = locVal == "ar" ? step.descriptionAr : step.descriptionEn;
                                        return (
                                            <div key={index} className="relative">
                                                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all h-full">
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="bg-[#6096b4] text-white w-12 h-12 rounded-full hidden sm:flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                                            {step.number}
                                                        </div>
                                                        <div className="bg-[#c2a772] p-2 rounded-lg">
                                                            <step.icon className="size-4 sm:size-6 text-white" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#254151] mb-2">{title}</h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Visa Documents */}
                            <div className="bg-white rounded-lg shadow-md  p-3 sm:p-8 mb-8">
                                <h2 className="text-lg md:text-2xl xl:text-3xl font-bold text-[#254151] mb-6 flex items-center gap-3">
                                    <Plane className="size-8 text-[#6096b4]" />
                                    {isAr ? "الوثائق المطلوبة للحصول على تأشيرة الدراسة" : "Required Documents for Study Visa"}
                                </h2>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-[#6096b4] rounded-lg p-6 mb-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {isAr
                                            ? "تساعد كلية البريمي الجامعية الطلاب الدوليين الذين حصلوا على القبول الأولي في الحصول على تأشيرة الدراسة. يجب على هؤلاء الطلاب تقديم المستندات المطلوبة إلى إدارة شؤون الموظفين:"
                                            : "Buraimi University College assists international students who have obtained initial admission in obtaining a study visa. These students must submit the required documents to the Employee Affairs Department:"}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {visaDocuments[locVal].map((doc, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="bg-[#6096b4] p-2 rounded-full flex-shrink-0">
                                                <FileText className="size-3 sm:size-5 text-white" />
                                            </div>
                                            <span className="text-gray-700 font-semibold">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visa Renewal */}
                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-8 mb-8">
                                <h2 className="text-lg md:text-2xl xl:text-3xl font-bold text-[#254151] mb-6 flex items-center gap-3">
                                    <Calendar className="size-8 text-[#6096b4]" />
                                    {isAr ? "تجديد تأشيرة الدراسة" : "Study Visa Renewal"}
                                </h2>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-[#c2a772] rounded-lg p-6 mb-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {isAr
                                            ? "لتجديد تأشيرة الدراسة، يجب على الطلاب الدوليين تقديم المستندات التالية إلى إدارة شؤون الموظفين قبل شهر على الأقل من تاريخ انتهاء التأشيرة الحالية:"
                                            : "To renew the study visa, international students must submit the following documents to the Employee Affairs Department at least one month before the current visa expiration date:"}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renewalDocuments[locVal].map((doc, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                            <div className="bg-green-600 p-2 rounded-full flex-shrink-0">
                                                <CheckCircle className="size-3 sm:size-5 text-white" />
                                            </div>
                                            <span className="text-gray-700 font-semibold">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white rounded-lg shadow-lg p-8">
                                <h2 className="text-lg md:text-xl xl:text-2xl font-bold mb-6 
                                flex flex-col sm:flex-row items-center gap-3">
                                    <Phone className="size-7" />
                                    {isAr ? "معلومات التواصل" : "Contact Information"}
                                </h2>
                                <p className="mb-6 leading-relaxed">
                                    {isAr
                                        ? "لمزيد من المعلومات حول قبول الطلاب الدوليين وإجراءات التأشيرة، يرجى التواصل مع إدارة شؤون الموظفين:"
                                        : "For more information about international student acceptance and visa procedures, please contact the Employee Affairs Department:"}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MapPin className="size-5 text-[#c2a772]" />
                                            <span className="font-semibold">{isAr ? "الموقع" : "Location"}</span>
                                        </div>
                                        <p className="text-sm">{isAr ? "مبنى الإدارة، الطابق الأرضي" : "Administration Building, Ground Floor"}</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Phone className="size-5 text-[#c2a772]" />
                                            <span className="font-semibold">{isAr ? "الهاتف" : "Phone"}</span>
                                        </div>
                                        <p className="text-sm">+968 2568 4999 {isAr ? "تحويلة 120" : "Ext. 120"}</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Mail className="size-5 text-[#c2a772]" />
                                            <span className="font-semibold">{isAr ? "البريد الإلكتروني" : "Email"}</span>
                                        </div>
                                        <p className="text-sm">hr@buc.edu.om</p>
                                    </div>
                                </div>
                                <div className="mt-6 bg-white/10 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="size-5 text-[#c2a772]" />
                                        <span className="font-semibold">{isAr ? "ساعات العمل" : "Working Hours"}</span>
                                        <span className="text-sm">{isAr ? "الأحد - الخميس: 8:00 ص - 2:00 م" : "Sunday - Thursday: 8:00 AM - 2:00 PM"}</span>
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