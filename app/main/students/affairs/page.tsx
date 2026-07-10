"use client";

import Link from "next/link";
import { Users, FileText } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import heroImage from "@/public/assets/about/foundation_landing.webp";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";

export default function StudentAffairsPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const t = useMemo(() => {
        const byLocale = {
            ar: {
                title: "دائرة شؤون الطلبة",
                students: "الطلبة",
                home: "الرئيسية",
                overviewTitle: "لمحة عن دائرة شؤون الطلبة",
                overview1: "تعد دائرة شؤون الطلبة أحد الدوائر المساندة التي تساهم بشكل فعال في تعزيز العملية التعليمية، وذلك من خلال الإشراف على مجموعة متنوعة من البرامج والخدمات المصممة لدعم الطلبة أكاديمياً وشخصياً. وتتمثل الأهداف الاستراتيجية لهذا القسم في توفير بيئة تعليمية شاملة وداعمة تساهم في التفوق الأكاديمي.",
                overview2: "بالإضافة إلى ذلك، يتولى القسم مهمة تأهيل الطلبة في المجالات المهنية والرياضية والثقافية بهدف رفع قدراتهم وتنمية مهاراتهم الفكرية والجسدية بما يتماشى مع متطلبات أصحاب العمل. كما يولي اهتماماً خاصاً بالطلبة الدوليين، حيث يقدم لهم الدعم اللازم في مختلف المجالات لضمان تمثيل مشرف للسلطنة والكلية في بلدانهم الأصلية.",
                overview3: "وبشكل عام، يتطلع القسم إلى إعداد خريجين مؤهلين ومتميزين، يمكنهم من المنافسة بفعالية في بيئات أكاديمية ومهنية وتخصصية متعددة.",
                complaintsTitle: "رابط التظلمات والاقتراحات",
                complaintsCta: "تقديم تظلم أو اقتراح",
                contactTitle: "للتواصل",
                phone: "رقم الهاتف:",
                location: "المكان:",
                structureTitle: "الهيكل التنظيمي",
                structureDesc: "يمكنك الاطلاع على الهيكل التنظيمي لدائرة شؤون الطلبة لمعرفة الأقسام والخدمات المتاحة",
            },
            en: {
                title: "Student Affairs Department",
                students: "Students",
                home: "Home",
                overviewTitle: "About Student Affairs Department",
                overview1: "The Student Affairs Department is one of the supportive departments that effectively contributes to enhancing the educational process by supervising a variety of programs and services designed to support students academically and personally. The strategic objectives of this department are to provide a comprehensive and supportive educational environment that contributes to academic excellence.",
                overview2: "In addition, the department undertakes the task of qualifying students in professional, sports, and cultural fields to raise their capabilities and develop their intellectual and physical skills in line with employer requirements. It also pays special attention to international students by providing them with the necessary support in various fields to ensure a distinguished representation of the Sultanate and the College in their home countries.",
                overview3: "In general, the department aims to prepare qualified and distinguished graduates who can compete effectively in multiple academic, professional, and specialized environments.",
                complaintsTitle: "Complaints & Suggestions Link",
                complaintsCta: "Submit Complaint or Suggestion",
                contactTitle: "Contact Us",
                phone: "Phone Number:",
                location: "Location:",
                structureTitle: "Organizational Structure",
                structureDesc: "You can view the organizational structure of the Student Affairs Department to learn about available departments and services",
            },
        } as const;
        return byLocale[isAr ? "ar" : "en"];
    }, [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[300px] sm:h-[350px] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 font-bold">{t.title}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">{t.home}</Link>
                        <span>/</span>
                        <Link href="/students" className="hover:text-[#c2a772] transition-colors">{t.students}</Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="student-affairs" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="size-5 sm:size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151] font-bold">{t.title}</h2>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl text-[#254151] mb-4 font-semibold">{t.overviewTitle}</h3>
                                <p className="text-gray-700 leading-loose mb-4 text-sm sm:text-base">{t.overview1}</p>
                                <p className="text-gray-700 leading-loose mb-4 text-sm sm:text-base">{t.overview2}</p>
                                <p className="text-gray-700 leading-loose text-sm sm:text-base">{t.overview3}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                                <div className="bg-[#6096b4]/10 rounded-lg p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl text-[#254151] mb-3 flex items-center gap-2 font-semibold">
                                        <FileText className="size-5 sm:size-6 text-[#6096b4]" />
                                        {t.complaintsTitle}
                                    </h3>
                                    <a
                                        href="#"
                                        className="inline-block bg-[#6096b4] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#254151] transition-all text-sm sm:text-base"
                                    >
                                        {t.complaintsCta}
                                    </a>
                                </div>

                                <div className="bg-[#c2a772]/10 rounded-lg p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl text-[#254151] mb-3 font-semibold">{t.contactTitle}</h3>
                                    <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                                        <p className="flex items-start gap-2">
                                            <span className="font-semibold text-[#254151]">{t.phone}</span>
                                            <span dir="ltr">25657666-(778) / 25657666/771</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <span className="font-semibold text-[#254151]">{t.location}</span>
                                            <span>Building – B</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#6096b4]/5 rounded-lg p-4 sm:p-6 text-center">
                                <h3 className="text-lg sm:text-xl text-[#254151] mb-3 flex items-center justify-center gap-2 font-semibold">
                                    <FileText className="size-5 sm:size-6 text-[#6096b4]" />
                                    {t.structureTitle}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base">{t.structureDesc}</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
