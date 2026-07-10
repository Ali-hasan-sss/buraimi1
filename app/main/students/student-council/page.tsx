"use client"
import { Users, Target, CheckCircle, Lightbulb, MessageSquare, HandHeart, Phone, Mail, Award } from 'lucide-react';
import heroImage from '@/public/assets/about/foundation_landing.webp';
import councilImage from '@/public/assets/councilImage.webp';
import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import Link from 'next/link';
import { StudentCouncilData, StudentCouncilFeatures, StudentCouncilBenefits } from '@/staticData/Student-Council';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function StudentCouncilPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const features = StudentCouncilFeatures[isAr ? "ar" : "en"];
    const responsibilities = StudentCouncilData[isAr ? "ar" : "en"];
    const benefits = StudentCouncilBenefits[isAr ? "ar" : "en"];
    return (
        <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">{isAr ? "المجلس الاستشاري الطلابي" : "Student Advisory Council"}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">
                            {isAr ? "الرئيسية" : "Home"}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {isAr ? "الطلبة" : "Students"}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{isAr ? "المجلس الاستشاري الطلابي" : "Student Advisory Council"}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-3 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="student-council" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="sm:w-12 w-10 sm:h-12 h-10 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Users className="size-5 sm:size-6 text-white" />
                                </div>
                                <h2 className="text-lg md:text-2xl xl:text-3xl text-[#254151]">{isAr ? "المجلس الاستشاري الطلابي" : "Student Advisory Council"}</h2>
                            </div>

                            {/* نبذة عن المجلس */}
                            <section className="mb-10">
                                <div className="bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-8 border-l-4 border-[#6096b4]">
                                    <div className="flex items-start gap-6">
                                        <div className="hidden md:block">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-full flex items-center justify-center">
                                                <Target className="size-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                                                <Lightbulb className="size-6 text-[#c2a772]" />
                                                {isAr ? "الهدف" : "Objective"}
                                            </h3>
                                            <p className="text-gray-700 text-lg leading-loose">
                                                {isAr
                                                    ? "يهدف إلى تخطيط وتحقيق المشاركة الطلابية الإيجابية في صنع القرار بالكلية لتطوير العملية التعليمية والأنشطة الطلابية، وتوصيل وجهات نظر الطلاب حيال ما يقدم من أنشطة تعليمية ولا صفية وخدمية بالمؤسسة."
                                                    : "It aims to plan and achieve positive student participation in college decision-making to develop the educational process and student activities, and to convey students' views on educational, extracurricular, and service activities provided by the institution."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mt-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className={`${feature.bgColor} rounded-lg p-6 text-white text-center hover:scale-105 transition-transform`}>
                                            <feature.icon className="siz-6 sm:size-12 mx-auto mb-3" />
                                            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                            <p className="text-sm opacity-90">{feature.subtitle}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* مهام ومسؤوليات المجلس */}
                            <section className="mb-10">
                                <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <CheckCircle className="size-6 text-[#6096b4]" />

                                    {isAr ? "مهام ومسؤوليات المجلس" : "Council Tasks and Responsibilities"}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {responsibilities.map((responsibility, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-6 hover:border-[#6096b4] hover:shadow-lg transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`${responsibility.color} w-12 h-12 rounded-lg hidden sm:flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <responsibility.icon className=" size-4 sm:size-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg text-[#254151] font-semibold mb-2">{responsibility.title}</h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{responsibility.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* أعضاء المجلس الاستشاري الطلابي */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Users className="size-6 text-[#c2a772]" />
                                    {isAr ? "أعضاء المجلس الاستشاري الطلابي" : "Student Advisory Council Members"}
                                </h3>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#c2a772]">
                                    <div className="bg-gradient-to-l from-[#c2a772] to-[#6096b4] p-4">
                                        <h4 className="text-xl text-white font-semibold text-center">
                                            {isAr ? "تشكيلة المجلس الاستشاري الطلابي - الدورة العاشرة 2024-2025" : "Student Advisory Council Formation - Tenth Session 2024-2025"}
                                        </h4>
                                    </div>
                                    <div className="p-6">
                                        <Image
                                            width={917}
                                            height={904}
                                            src={councilImage}
                                            alt={isAr ? "تشكيلة المجلس الاستشاري الطلابي للدورة العاشرة 2024-2025" : "Student Advisory Council Formation for Tenth Session 2024-2025"}
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-4 mt-6">
                                    <div className="bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-lg p-2 sm:p-6 text-white text-center">
                                        <div className="text-xl lg:text-3xl xl:text-4xl font-bold mb-2">4</div>
                                        <p className="text-sm opacity-90">{isAr ? "لجان متخصصة" : "Specialized Committees"}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#c2a772] to-[#6096b4] rounded-lg p-2 sm:p-6 text-white text-center">
                                        <div className="text-xl lg:text-3xl xl:text-4xl font-bold mb-2">{isAr ? "الأكاديمية" : "Academic"}</div>
                                        <p className="text-sm opacity-90">{isAr ? "لجنة الشؤون الأكاديمية" : "Academic Affairs Committee"}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-lg p-2 sm:p-6 text-white text-center">
                                        <div className="text-xl lg:text-3xl xl:text-4xl font-bold mb-2">{isAr ? "الأنشطة" : "Activities"}</div>
                                        <p className="text-sm opacity-90">{isAr ? "لجنة الأنشطة والمبادرات" : "Activities and Initiatives Committee"}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-[#6096b4] to-[#c2a772] rounded-lg p-2 sm:p-6 text-white text-center">
                                        <div className="text-xl lg:text-3xl xl:text-4xl font-bold mb-2">{isAr ? "الخدمات" : "Services"}</div>
                                        <p className="text-sm opacity-90">{isAr ? "لجنة الخدمات الطلابية" : "Student Services Committee"}</p>
                                    </div>
                                </div>
                            </section>

                            {/* فوائد المجلس */}
                            <section className="mb-10">
                                <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Award className="size-6 text-[#6096b4]" />
                                    {isAr ? "أهمية المجلس الاستشاري الطلابي" : "Importance of the Student Advisory Council"}
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className={`bg-white border-l-4 ${benefit.borderColor} shadow-md rounded-lg p-6 hover:shadow-lg transition-all`}>
                                            <benefit.icon className={`size-6 sm:size-12 ${benefit.iconColor} mb-4`} />
                                            <h4 className="text-lg text-[#254151] font-semibold mb-2">{benefit.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* للتواصل */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                                <h3 className="text-2xl mb-6 text-center font-semibold flex flex-col sm:flex-row items-center sm:justify-center gap-2">
                                    <Users className="size-6" />
                                    {isAr ? "للتواصل مع المجلس الاستشاري الطلابي" : "Contact the Student Advisory Council"}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{isAr ? "رقم الهاتف" : "Phone Number"}</p>
                                            <p className="font-semibold" dir="ltr">25657666-(778)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                                            <p className="font-semibold text-sm">sc_buc@buc.edu.om</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                                    <p className="text-sm opacity-90">
                                        <MessageSquare className="inline size-5 ml-2 " />
                                        {isAr ? "صوتك يهمنا! شارك آراءك ومقترحاتك لتطوير الكلية" : "Your voice matters! Share your opinions and suggestions to develop the college"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}