"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Target, Users, TrendingUp, BookOpen, Award, Lightbulb, CheckCircle, Phone, Mail, Compass, Route, Calendar, BarChart, Briefcase, Link2, FileText, UserCheck, Clock, Heart } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";
import { studentsLanding } from "@/lib/students-landing-images";

const contentByLocale = {
    ar: {
        heroTitle: "الإرشاد الأكاديمي",
        breadcrumb: {
            home: "الرئيسية",
            students: "الطلبة",
            current: "الإرشاد الأكاديمي",
        },
        pageTitle: "الإرشاد الأكاديمي",
        sections: {
            intro: {
                paragraph1: "يعد الإرشاد الأكاديمي ركيزة أساسية في التزام كلية البريمي الجامعية بنجاح الطلاب وتفوقهم الأكاديمي. ويلعب الإرشاد الأكاديمي دورًا محوريًا في توجيه الطلبة ودعمهم خلال رحلتهم التعليمية.",
                paragraph2: "ولا يقتصر دور المرشد الأكاديمي على تقديم التوصيات الدراسية فحسب بل يتمثل دوره في إلهام الطلاب وتمكينهم من تحقيق كل طموحاتهم.",
            },
            goal: {
                title: "الهدف من الإرشاد الأكاديمي",
                paragraph1: "الهدف من الإرشاد الأكاديمي متعدد الأوجه ومحوري لنجاح الطلاب في التعليم العالي. ويشمل ذلك توجيه الطلاب وتمكينهم من تحديد الأهداف الأكاديمية وتحقيقها، والتخطيط الشخصي للمقررات الدراسية، ورصد التقدم الدراسي، وتقديم الاستكشاف المهني والتخصصي، وربط الطلاب بالموارد، وشرح السياسات، وتقديم الدعم السري، وتعزيز تمكين الطلاب.",
                paragraph2: "يهدف الإرشاد إلى تحسين معدلات الاستبقاء والتخرج في الوقت المناسب، وتوسيع نطاق الدعم إلى ما بعد التخرج، وتعزيز خدماته باستمرار. ويتجاوز الإرشاد الأكاديمي في جوهره مجرد اختيار المقررات الدراسية، حيث يركز على الدعم الشامل للطلاب والنمو الشخصي. إنه الجسر الذي يربط بين تطلعات الطلاب وإنجازاتهم التعليمية.",
            },
            objectives: {
                title: "أهداف نظام الإرشاد الأكاديمي",
                items: [
                    { icon: Target, title: "تحديد الأهداف الأكاديمية", description: "توجيه الطلاب وتمكينهم من تحديد الأهداف الأكاديمية وتحقيقها" },
                    { icon: Calendar, title: "التخطيط الشخصي للمقررات", description: "مساعدة الطلاب في التخطيط الشخصي للمقررات الدراسية" },
                    { icon: BarChart, title: "رصد التقدم الدراسي", description: "متابعة ورصد التقدم الأكاديمي للطلاب بشكل مستمر" },
                    { icon: Briefcase, title: "الاستكشاف المهني والتخصصي", description: "تقديم الاستكشاف المهني والتخصصي وتوجيه الطلاب نحو المسار المناسب" },
                    { icon: Link2, title: "ربط الطلاب بالموارد", description: "توصيل الطلاب بالموارد والخدمات الأكاديمية المتاحة" },
                    { icon: FileText, title: "شرح السياسات", description: "توضيح السياسات الأكاديمية واللوائح الجامعية للطلاب" },
                    { icon: UserCheck, title: "تقديم الدعم السري", description: "تقديم الدعم والمشورة في بيئة آمنة وسرية" },
                    { icon: Heart, title: "تعزيز تمكين الطلاب", description: "بناء قدرات الطلاب وتمكينهم من اتخاذ قرارات أكاديمية مستنيرة" },
                ],
            },
            goals: {
                title: "أهداف نظام الإرشاد الأكاديمي",
                items: [
                    { icon: TrendingUp, title: "تحسين معدلات الاستبقاء", description: "تعزيز معدلات استمرار الطلاب في البرامج الأكاديمية", color: "bg-[#6096b4]" },
                    { icon: Clock, title: "التخرج في الوقت المناسب", description: "مساعدة الطلاب على إكمال دراستهم في الإطار الزمني المحدد", color: "bg-[#c2a772]" },
                    { icon: Route, title: "الدعم ما بعد التخرج", description: "توسيع نطاق الدعم إلى ما بعد التخرج", color: "bg-[#254151]" },
                    { icon: Award, title: "تعزيز الخدمات", description: "التحسين المستمر لجودة خدمات الإرشاد الأكاديمي", color: "bg-[#6096b4]" },
                ],
            },
            mission: {
                title: "مهمة الإرشاد الأكاديمي",
                missionLabel: "مهمة الإرشاد الأكاديمي",
                description: "تمكين الطلاب في سعيهم لتحقيق التفوق الأكاديمي من خلال تقديم إرشاد شامل وشخصي. وتلتزم كلية البريمي الجامعية بتعزيز بيئة إرشادية داعمة وشاملة وتعاونية تعزز نجاح الطلبة.",
            },
            features: {
                title: "ما يميز الإرشاد الأكاديمي في كلية البريمي",
                items: [
                    { icon: Users, title: "إرشاد شامل وشخصي", description: "نقدم إرشاداً مخصصاً لكل طالب يراعي احتياجاته وطموحاته الفردية", borderColor: "border-[#6096b4]", iconColor: "text-[#6096b4]" },
                    { icon: Heart, title: "بيئة داعمة وشاملة", description: "نوفر بيئة إرشادية تعاونية تدعم جميع الطلاب في رحلتهم الأكاديمية", borderColor: "border-[#c2a772]", iconColor: "text-[#c2a772]" },
                    { icon: TrendingUp, title: "التركيز على النجاح", description: "هدفنا الأساسي هو تمكين الطلاب من تحقيق التفوق الأكاديمي والنجاح", borderColor: "border-[#6096b4]", iconColor: "text-[#6096b4]" },
                ],
            },
            stats: {
                areas: { value: "8+", label: "مجالات إرشادية" },
                coverage: { value: "100%", label: "تغطية الطلاب" },
                support: { value: "شامل", label: "الدعم الأكاديمي" },
                improvement: { value: "مستمر", label: "التحسين والتطوير" },
            },
            contact: {
                title: "للتواصل",
                phoneLabel: "رقم الهاتف",
                phone: "25657666-(778)",
                emailLabel: "البريد الإلكتروني",
                email: "sc_buc@buc.edu.om",
                tagline: "نحن هنا لدعمك في رحلتك الأكاديمية نحو التفوق والنجاح",
            },
            images: {
                advising: "الإرشاد الأكاديمي",
                mentorship: "التوجيه الأكاديمي",
            },
        },
    },
    en: {
        heroTitle: "Academic Advising",
        breadcrumb: {
            home: "Home",
            students: "Students",
            current: "Academic Advising",
        },
        pageTitle: "Academic Advising",
        sections: {
            intro: {
                paragraph1: "Academic advising is a cornerstone of Buraimi University College's commitment to student success and academic excellence. Academic advising plays a pivotal role in guiding and supporting students throughout their educational journey.",
                paragraph2: "The role of the academic advisor extends beyond providing course recommendations; it lies in inspiring students and empowering them to achieve all their aspirations.",
            },
            goal: {
                title: "Purpose of Academic Advising",
                paragraph1: "The purpose of academic advising is multifaceted and central to student success in higher education. This includes guiding and empowering students to set and achieve academic goals, personal course planning, monitoring academic progress, providing career and major exploration, connecting students with resources, explaining policies, providing confidential support, and enhancing student empowerment.",
                paragraph2: "The advising aims to improve retention rates and timely graduation, extend support beyond graduation, and continuously enhance its services. Academic advising transcends mere course selection, focusing on comprehensive student support and personal growth. It is the bridge that connects student aspirations with educational achievements.",
            },
            objectives: {
                title: "Academic Advising System Objectives",
                items: [
                    { icon: Target, title: "Setting Academic Goals", description: "Guiding and enabling students to identify and achieve academic goals" },
                    { icon: Calendar, title: "Personal Course Planning", description: "Assisting students with personal planning of academic courses" },
                    { icon: BarChart, title: "Monitoring Academic Progress", description: "Continuously tracking and monitoring students' academic progress" },
                    { icon: Briefcase, title: "Career and Major Exploration", description: "Providing career and major exploration and guiding students toward the appropriate path" },
                    { icon: Link2, title: "Connecting Students to Resources", description: "Linking students to available academic resources and services" },
                    { icon: FileText, title: "Explaining Policies", description: "Clarifying academic policies and university regulations to students" },
                    { icon: UserCheck, title: "Providing Confidential Support", description: "Providing support and advice in a safe and confidential environment" },
                    { icon: Heart, title: "Enhancing Student Empowerment", description: "Building students' capabilities and enabling them to make informed academic decisions" },
                ],
            },
            goals: {
                title: "Academic Advising System Goals",
                items: [
                    { icon: TrendingUp, title: "Improving Retention Rates", description: "Enhancing student retention rates in academic programs", color: "bg-[#6096b4]" },
                    { icon: Clock, title: "Timely Graduation", description: "Helping students complete their studies within the specified timeframe", color: "bg-[#c2a772]" },
                    { icon: Route, title: "Post-Graduation Support", description: "Expanding the scope of support beyond graduation", color: "bg-[#254151]" },
                    { icon: Award, title: "Enhancing Services", description: "Continuously improving the quality of academic advising services", color: "bg-[#6096b4]" },
                ],
            },
            mission: {
                title: "Mission of Academic Advising",
                missionLabel: "Mission of Academic Advising",
                description: "Empowering students in their pursuit of academic excellence through comprehensive and personalized advising. Buraimi University College is committed to fostering a supportive, inclusive, and collaborative advising environment that promotes student success.",
            },
            features: {
                title: "What Makes Academic Advising at BUC Distinctive",
                items: [
                    { icon: Users, title: "Comprehensive & Personalized", description: "We provide customized advising for each student that addresses their individual needs and aspirations", borderColor: "border-[#6096b4]", iconColor: "text-[#6096b4]" },
                    { icon: Heart, title: "Supportive & Inclusive", description: "We provide a collaborative advising environment that supports all students in their academic journey", borderColor: "border-[#c2a772]", iconColor: "text-[#c2a772]" },
                    { icon: TrendingUp, title: "Focus on Success", description: "Our primary goal is to enable students to achieve academic excellence and success", borderColor: "border-[#6096b4]", iconColor: "text-[#6096b4]" },
                ],
            },
            stats: {
                areas: { value: "8+", label: "Advising Areas" },
                coverage: { value: "100%", label: "Student Coverage" },
                support: { value: "Full", label: "Academic Support" },
                improvement: { value: "Ongoing", label: "Improvement & Development" },
            },
            contact: {
                title: "Contact Us",
                phoneLabel: "Phone",
                phone: "25657666-(778)",
                emailLabel: "Email",
                email: "sc_buc@buc.edu.om",
                tagline: "We are here to support you in your academic journey toward excellence and success",
            },
            images: {
                advising: "Academic Advising",
                mentorship: "Academic Mentorship",
            },
        },
    },
};

export default function AcademicAdvisingPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
                <Image
                    src={studentsLanding.advisingHero}
                    alt={content.heroTitle}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4">{content.heroTitle}</h1>

                    {/* Breadcrumb */}
                    <div className={`flex items-center gap-2 text-sm text-white mt-4 ${isAr ? "flex-row" : "flex-row-reverse"}`}>
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">
                            {content.breadcrumb.home}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {content.breadcrumb.students}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{content.breadcrumb.current}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="academic-advising" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                            <div className={`flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4] ${isAr ? "" : "flex-row-reverse"}`}>
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="size-6 text-white" />
                                </div>
                                <h2 className={`text-2xl sm:text-3xl text-[#254151] ${isAr ? "" : "text-left"}`}>{content.pageTitle}</h2>
                            </div>

                            {/* Intro Section */}
                            <section className="mb-10">
                                <div className="bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-6 sm:p-8 mb-6">
                                    <div className={`flex items-start gap-4 sm:gap-6 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <div className="hidden md:block flex-shrink-0">
                                            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-full flex items-center justify-center">
                                                <Compass className="size-8 sm:size-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-gray-700 text-base sm:text-lg leading-loose mb-4 ${isAr ? "" : "text-left"}`}>
                                                {content.sections.intro.paragraph1}
                                            </p>
                                            <p className={`text-gray-700 text-base sm:text-lg leading-loose ${isAr ? "" : "text-left"}`}>
                                                {content.sections.intro.paragraph2}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                                    <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden shadow-md">
                                        <Image
                                            src={studentsLanding.advisingInline[0]}
                                            alt={content.sections.images.advising}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                        />
                                    </div>
                                    <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden shadow-md">
                                        <Image
                                            src={studentsLanding.advisingInline[1]}
                                            alt={content.sections.images.mentorship}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Goal Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Target className="size-5 sm:size-6 text-[#6096b4] flex-shrink-0" />
                                    {content.sections.goal.title}
                                </h3>

                                <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-8 text-white mb-8">
                                    <p className={`text-base sm:text-lg leading-loose mb-4 sm:mb-6 ${isAr ? "" : "text-left"}`}>
                                        {content.sections.goal.paragraph1}
                                    </p>
                                    <p className={`text-base sm:text-lg leading-loose ${isAr ? "" : "text-left"}`}>
                                        {content.sections.goal.paragraph2}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {content.sections.objectives.items.map((objective, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-5 hover:border-[#6096b4] hover:shadow-lg transition-all group"
                                        >
                                            <div className="flex flex-col items-center text-center gap-3">
                                                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#6096b4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <objective.icon className="size-6 sm:size-7 text-white" />
                                                </div>
                                                <h4 className="text-sm sm:text-base text-[#254151] font-semibold">{objective.title}</h4>
                                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{objective.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Goals Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Award className="size-5 sm:size-6 text-[#c2a772] flex-shrink-0" />
                                    {content.sections.goals.title}
                                </h3>

                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    {content.sections.goals.items.map((goal, index) => (
                                        <div
                                            key={index}
                                            className={`${goal.color} rounded-lg p-4 sm:p-6 text-white hover:scale-105 transition-transform`}
                                        >
                                            <div className={`flex items-start gap-3 sm:gap-4 ${isAr ? "" : "flex-row-reverse"}`}>
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <goal.icon className="size-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`text-lg sm:text-xl font-semibold mb-2 ${isAr ? "" : "text-left"}`}>{goal.title}</h4>
                                                    <p className={`text-white/90 leading-relaxed text-sm ${isAr ? "" : "text-left"}`}>{goal.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Mission Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Lightbulb className="size-5 sm:size-6 text-[#c2a772] flex-shrink-0" />
                                    {content.sections.mission.title}
                                </h3>

                                <div className="bg-gradient-to-br from-[#c2a772]/20 to-[#6096b4]/20 rounded-lg p-6 sm:p-8 border-2 border-[#c2a772]">
                                    <div className={`flex items-start gap-4 sm:gap-6 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <div className="hidden md:block flex-shrink-0">
                                            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-[#c2a772] rounded-lg flex items-center justify-center">
                                                <Award className="size-7 sm:size-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-gray-700 text-base sm:text-lg leading-loose ${isAr ? "" : "text-left"}`}>
                                                <strong className="text-[#254151]">{content.sections.mission.missionLabel}</strong> {content.sections.mission.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Features Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <CheckCircle className="size-5 sm:size-6 text-[#6096b4] flex-shrink-0" />
                                    {content.sections.features.title}
                                </h3>

                                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                                    {content.sections.features.items.map((feature, index) => (
                                        <div key={index} className={`bg-white border-l-4 ${feature.borderColor} shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all ${isAr ? "" : "border-l-0 border-r-4"}`}>
                                            <feature.icon className={`size-10 sm:size-12 ${feature.iconColor} mb-4`} />
                                            <h4 className={`text-base sm:text-lg text-[#254151] font-semibold mb-2 ${isAr ? "" : "text-left"}`}>{feature.title}</h4>
                                            <p className={`text-gray-600 text-sm leading-relaxed ${isAr ? "" : "text-left"}`}>{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Stats Section */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 mb-8">
                                <div className="bg-[#6096b4] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <Target className="size-8 sm:size-10 mx-auto mb-2" />
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">{content.sections.stats.areas.value}</div>
                                    <p className="text-xs sm:text-sm opacity-90">{content.sections.stats.areas.label}</p>
                                </div>

                                <div className="bg-[#c2a772] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <Users className="size-8 sm:size-10 mx-auto mb-2" />
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">{content.sections.stats.coverage.value}</div>
                                    <p className="text-xs sm:text-sm opacity-90">{content.sections.stats.coverage.label}</p>
                                </div>

                                <div className="bg-[#254151] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <BookOpen className="size-8 sm:size-10 mx-auto mb-2" />
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">{content.sections.stats.support.value}</div>
                                    <p className="text-xs sm:text-sm opacity-90">{content.sections.stats.support.label}</p>
                                </div>

                                <div className="bg-[#6096b4] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <Award className="size-8 sm:size-10 mx-auto mb-2" />
                                    <div className="text-2xl sm:text-3xl font-bold mb-1">{content.sections.stats.improvement.value}</div>
                                    <p className="text-xs sm:text-sm opacity-90">{content.sections.stats.improvement.label}</p>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-8 text-white">
                                <h3 className={`text-xl sm:text-2xl mb-6 text-center font-semibold flex items-center justify-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <GraduationCap className="size-5 sm:size-6 flex-shrink-0" />
                                    {content.sections.contact.title}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div className={`flex-1 ${isAr ? "" : "text-right"}`}>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.sections.contact.phoneLabel}</p>
                                            <p className="font-semibold text-sm" dir="ltr">{content.sections.contact.phone}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <Mail className="size-6 flex-shrink-0" />
                                        <div className={`flex-1 ${isAr ? "" : "text-right"}`}>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.sections.contact.emailLabel}</p>
                                            <p className="font-semibold text-sm">{content.sections.contact.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                                    <p className="text-xs sm:text-sm opacity-90">
                                        <Compass className="inline size-4 sm:size-5 mx-2" />
                                        {content.sections.contact.tagline}
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
