"use client"
import { FileText, GraduationCap, Globe, DollarSign, Users, BookOpen, Award, CheckCircle } from 'lucide-react';
import { AdmissionDetailsData } from "@/staticData/AdmissionDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdmissionDetailHeroComp from "@/components/admissionDetail/DetailHero";
import Overview from "@/components/admissionDetail/Overview";
import Requirements from "@/components/admissionDetail/Requirements";
import International from "@/components/admissionDetail/International";
import Fees from "@/components/admissionDetail/Fees";
import ScholarshipProcedures from "@/components/admissionDetail/ScholarshipProcedures";
import Register from "@/components/admissionDetail/Register";
import Guides from "@/components/admissionDetail/Guides";
import AdmissionDetailCTA from "@/components/admissionDetail/AdmissionDetailCTA";
import { useLocale } from 'next-intl';

export default function AdmissionDetails() {
    const sections = [
        { id: 'overview', title: 'نظرة عامة', icon: BookOpen },
        { id: 'requirements', title: 'معايير ومتطلبات القبول', icon: CheckCircle },
        { id: 'international', title: 'قبول الطلبة الدوليين', icon: Globe },
        { id: 'fees', title: 'الرسوم الدراسية والمساعدات المالية', icon: DollarSign },
        { id: 'scholarships', title: 'اجراءات طلبة البعثات', icon: Award },
        { id: 'register', title: 'سجل الآن', icon: Users },
        { id: 'guides', title: 'دليل الطالب', icon: FileText }
    ];


    const studentGuides = [
        { title: 'دليل الطالب للمرحلة الجامعية الأولى', icon: BookOpen },
        { title: 'دليل الطالب لبرنامج الماجستير في الإدارة', icon: GraduationCap },
        { title: 'دليل الطالب لبرنامج الماجستير في القانون', icon: FileText },
        { title: 'دليل الطالب لبرنامج الدكتوراة في القانون', icon: Award }
    ];

    const data = AdmissionDetailsData

    const locale = useLocale()
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <AdmissionDetailHeroComp />

            <Tabs defaultValue="overview" className="gap-0" dir={locale == "ar" ? "rtl" : "ltr"}>
                {/* Navigation Tabs */}
                <div className="sticky top-[100px] z-40 bg-white shadow-md  ">
                    <div className="w-[95%] mx-auto overflow-x-scroll scrollbar-hide bg-transparent ">
                        <TabsList
                            variant="line"
                            className=" min-h-[100px] flex   overflow-x-auto gap-2   "
                        >
                            {sections.map((section) => (
                                <TabsTrigger
                                    key={section.id}
                                    value={section.id}
                                    className="h-[60px] flex-none items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all border-0 bg-gray-100 text-gray-600 hover:bg-gray-200 data-[state=active]:bg-gradient-to-l data-[state=active]:from-[#254151] data-[state=active]:to-[#6096b4] data-[state=active]:text-white data-[state=active]:shadow-lg"
                                >
                                    <section.icon className="size-5" />
                                    <span>{section.title}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="container mx-auto px-4 py-12">
                    <TabsContent value="overview">
                        <Overview />
                    </TabsContent>

                    <TabsContent value="requirements">
                        <Requirements />
                    </TabsContent>

                    <TabsContent value="international">
                        <International />
                    </TabsContent>

                    <TabsContent value="fees">
                        <Fees
                            undergraduateFees={data.undergraduateFees}
                            graduateFees={data.graduateFees}
                            scholarships={data.scholarships}
                        />
                    </TabsContent>

                    <TabsContent value="scholarships">
                        <ScholarshipProcedures />
                    </TabsContent>

                    <TabsContent value="register">
                        <Register />
                    </TabsContent>

                    <TabsContent value="guides">
                        <Guides guides={studentGuides} />
                    </TabsContent>
                </div>
            </Tabs>

            {/* Bottom CTA */}
            <AdmissionDetailCTA />
        </div>
    );
}
