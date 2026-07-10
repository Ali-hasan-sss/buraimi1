"use client";

import Link from "next/link";
import { Users, BookOpen, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";
import { studentsLanding } from "@/lib/students-landing-images";
import Image from "next/image";


export default function StudentsPage() {
    const locale = useLocale();
    const isAr = locale === "ar";

    const stats = useMemo(() => {
        const labels = isAr
            ? ["الأندية الأكاديمية", "الجماعات الطلابية", "المشاركات الخارجية", "الطلبة الدوليين"]
            : ["Academic Clubs", "Student Groups", "External Participations", "International Students"];
        const icons = [BookOpen, Users, Globe, Users];
        const numbers = ["6", "9", "75", "135"];
        return labels.map((label, i) => ({ label, icon: icons[i], number: numbers[i] }));
    }, [isAr]);

    const t = useMemo(() => {
        return isAr
            ? { title: "الطلبة", home: "الرئيسية" }
            : { title: "Students", home: "Home" };
    }, [isAr]);

    return (
        <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[350px]">
                <Image
                    src={studentsLanding.overviewHero}
                    alt={t.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">{t.title}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">
                            {t.home}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="overview" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Users className="size-6 text-white" />
                                </div>
                                <h2 className="text-3xl text-[#254151]">{t.title}</h2>
                            </div>

                            <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
                                {isAr
                                    ? "يضم الحرم الجامعي لدينا مجموعة من الأفراد المتميزين والمبدعين، انضم إلينا لتكون واحدًا منهم."
                                    : "Our campus is home to a diverse group of exceptional and creative individuals. Join us to be one of them."}
                            </p>

                            {/* Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-[#254151] to-[#6096b4] p-6 rounded-lg text-center text-white hover:scale-105 transition-transform"
                                    >
                                        <stat.icon className="size-10 mx-auto mb-3 text-[#c2a772]" />
                                        <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                        <div className="text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={studentsLanding.overviewGallery[0]}
                                        alt={isAr ? "حياة الطالب" : "Student life"}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={studentsLanding.overviewGallery[1]}
                                        alt={isAr ? "الطلاب" : "Students"}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
