"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Target, Users, User, Lightbulb, Shield, Ear, Lock, Award, CheckCircle, Phone, MapPin, MessageCircle, BookOpen } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import heroImage from "@/public/assets/about/foundation_landing.webp";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";

const contentByLocale = {
    ar: {
        heroTitle: "الإرشاد الطلابي",
        breadcrumb: {
            home: "الرئيسية",
            students: "الطلبة",
            current: "الإرشاد الطلابي",
        },
        pageTitle: "الإرشاد الطلابي",
        subtitle: "About Student Counselling",
        sections: {
            definition: {
                title: 'ماذا يعني "الإرشاد الطلابي"؟',
                description: "مساعدة الأفراد على مواجهة التحديات التي تعيق نموهم أينما كانوا، وتعظيم تنمية إمكاناتهم الشخصية",
            },
            goal: {
                title: "ما هو الهدف المقصود من الإرشاد الطلابي؟",
                description: "مساعدة الفرد على التقدم في اتجاه التنمية المتكاملة لجميع جوانب الشخصية.",
            },
            howHelp: {
                title: "كيف يمكن لخدمات الاستشارة أن تساعدني؟",
                description: "يستطيع أخصائي الإرشاد الطلابي في القسم أن يقدم لك جلسات إرشادية متخصصة في الأوقات التي تراها مناسبة، ودور الأخصائي هو مساعدتك على تعلم كيفية مساعدة نفسك في الحياة، وفهم نفسك بشكل أفضل، والتعرف على إمكانياتك وقدراتك وتحدياتك المختلفة، وتنمية قدرتك على التكيف والتناغم، ومن ثم تحقيق الاستقرار النفسي والأكاديمي مع الحياة الجديدة في الكلية ومن ثم تحقيق تحقيق الذات والصحة النفسية.",
            },
        },
        services: {
            title: "ما هي خدمات الإرشاد الطلابي؟",
            items: [
                {
                    icon: User,
                    title: "الجلسات الفردية",
                    description: "دعم الطالب من خلال جلسات إرشادية فردية، يكشف فيها الطالب عن التحديات النفسية والاجتماعية والأكاديمية التي يواجهها والتي تؤثر على حياته الجامعية، مع ضمان السرية والخصوصية.",
                    color: "from-[#6096b4] to-[#254151]",
                },
                {
                    icon: Users,
                    title: "الاستشارة الجماعية",
                    description: "دعم مجموعة من الطلاب الذين يواجهون نفس التحدي من خلال جلسات جماعية، وضمان السرية والخصوصية.",
                    color: "from-[#c2a772] to-[#6096b4]",
                },
                {
                    icon: BookOpen,
                    title: "البرامج وورش العمل",
                    description: "يقوم القسم بإجراء ورش عمل وبرامج علاجية ووقائية وتنموية لمساعدة الطلبة على تطوير مهاراتهم وأنفسهم طوال الفصل الدراسي.",
                    color: "from-[#254151] to-[#6096b4]",
                },
                {
                    icon: Award,
                    title: "فريق دعم الطلاب",
                    description: "طلاب الجامعات الذين أكملوا السنة الثالثة وما فوق. هدفهم الرئيسي هو دعم ومساعدة الطلاب الجدد الذين ينتقلون من الحياة المدرسية إلى الحياة الجامعية ومساعدتهم على التكيف في بيئة الجامعة والتغلب على التحديات.",
                    color: "from-[#6096b4] to-[#c2a772]",
                },
            ],
        },
        expectations: {
            title: "ما الذي يجب أن تتوقعه من الإرشاد الطلابي؟",
            items: [
                {
                    icon: Lock,
                    title: "السرية والخصوصية",
                    description: "تعتمد علاقة الإرشاد على المبادئ والقيم الأخلاقية المتمثلة في احترام المستشار والحفاظ على السرية التامة للقضايا التي يثيرها المستشار في جلسة الإرشاد، لذا يلتزم المستشار بعدم إجبار المستشار على الإفصاح عن جوانب قد لا يرغب في الحديث عنها وعدم إفشاء أي معلومات عنه لأي طرف دون موافقته.",
                },
                {
                    icon: Ear,
                    title: "الاستماع الجيد",
                    description: "المستشار سيكون مستمعاً جيداً وصبوراً تجاه ما يعبر عنه المستشار في جلسات الإرشاد.",
                },
                {
                    icon: Target,
                    title: "علاقة مهنية متخصصة",
                    description: "العلاقة الإرشادية هي علاقة متخصصة وعلاقة مهنية تسعى إلى تحقيق أهداف محددة للمستشار.",
                },
                {
                    icon: Heart,
                    title: "بيئة آمنة وداعمة",
                    description: "العلاقة الإرشادية تعتمد على التفاعل البناء بين المعالج والمستشار من خلال جو مليء بالثقة والقبول غير المشروط والتسامح والشعور بالأمان مما يوفر الجو المناسب للمستشار للتحدث عن الصعوبات التي يواجهها دون خوف.",
                },
            ],
        },
        quickInfo: {
            individual: { title: "جلسات فردية", description: "دعم شخصي مخصص لكل طالب" },
            group: { title: "جلسات جماعية", description: "دعم جماعي للتحديات المشتركة" },
            workshops: { title: "ورش عمل", description: "برامج تطويرية ووقائية" },
        },
        contact: {
            title: "للتواصل",
            phoneLabel: "رقم الهاتف",
            phone: "25657666-(778) / 25657666/773",
            locationLabel: "المكان",
            location: "Building – B",
            confidentiality: "جميع جلسات الإرشاد سرية وخاصة بضمان تام",
        },
        images: {
            counselingSession: "جلسة إرشادية",
            studentSupport: "دعم الطلاب",
        },
    },
    en: {
        heroTitle: "Student Counselling",
        breadcrumb: {
            home: "Home",
            students: "Students",
            current: "Student Counselling",
        },
        pageTitle: "Student Counselling",
        subtitle: "About Student Counselling",
        sections: {
            definition: {
                title: 'What does "Student Counselling" mean?',
                description: "Helping individuals face challenges that hinder their growth wherever they are, and maximizing the development of their personal potential.",
            },
            goal: {
                title: "What is the goal of Student Counselling?",
                description: "Helping the individual progress toward the integrated development of all aspects of personality.",
            },
            howHelp: {
                title: "How can counselling services help me?",
                description: "The student counsellor in the department can provide you with specialized counselling sessions at times that suit you. The counsellor's role is to help you learn how to help yourself in life, understand yourself better, recognize your capabilities and different challenges, develop your ability to adapt and harmonize, and thus achieve psychological and academic stability with your new life in college, leading to self-actualization and mental health.",
            },
        },
        services: {
            title: "What are the Student Counselling Services?",
            items: [
                {
                    icon: User,
                    title: "Individual Sessions",
                    description: "Supporting the student through individual counselling sessions where the student reveals psychological, social, and academic challenges they face that affect their university life, with guaranteed confidentiality and privacy.",
                    color: "from-[#6096b4] to-[#254151]",
                },
                {
                    icon: Users,
                    title: "Group Counselling",
                    description: "Supporting a group of students facing the same challenge through group sessions, with guaranteed confidentiality and privacy.",
                    color: "from-[#c2a772] to-[#6096b4]",
                },
                {
                    icon: BookOpen,
                    title: "Programs and Workshops",
                    description: "The department conducts therapeutic, preventive, and developmental workshops and programs to help students develop their skills and themselves throughout the semester.",
                    color: "from-[#254151] to-[#6096b4]",
                },
                {
                    icon: Award,
                    title: "Student Support Team",
                    description: "University students who have completed their third year and above. Their main goal is to support and help new students transitioning from school life to university life and help them adapt to the university environment and overcome challenges.",
                    color: "from-[#6096b4] to-[#c2a772]",
                },
            ],
        },
        expectations: {
            title: "What to Expect from Student Counselling?",
            items: [
                {
                    icon: Lock,
                    title: "Confidentiality and Privacy",
                    description: "The counselling relationship is based on ethical principles and values, including respecting the client and maintaining complete confidentiality of issues raised by the client in counselling sessions. The counsellor is committed to not forcing the client to disclose aspects they may not wish to discuss and not revealing any information about them to any party without their consent.",
                },
                {
                    icon: Ear,
                    title: "Good Listening",
                    description: "The counsellor will be a good listener and patient toward what the client expresses in counselling sessions.",
                },
                {
                    icon: Target,
                    title: "Professional Relationship",
                    description: "The counselling relationship is a specialized, professional relationship that seeks to achieve specific goals for the client.",
                },
                {
                    icon: Heart,
                    title: "Safe and Supportive Environment",
                    description: "The counselling relationship depends on constructive interaction between the counsellor and client through an atmosphere filled with trust, unconditional acceptance, tolerance, and a sense of security, providing the appropriate environment for the client to talk about difficulties they face without fear.",
                },
            ],
        },
        quickInfo: {
            individual: { title: "Individual Sessions", description: "Personal support tailored to each student" },
            group: { title: "Group Sessions", description: "Group support for common challenges" },
            workshops: { title: "Workshops", description: "Developmental and preventive programs" },
        },
        contact: {
            title: "Contact Us",
            phoneLabel: "Phone",
            phone: "25657666-(778) / 25657666/773",
            locationLabel: "Location",
            location: "Building – B",
            confidentiality: "All counselling sessions are strictly confidential and private",
        },
        images: {
            counselingSession: "Counselling Session",
            studentSupport: "Student Support",
        },
    },
};

export default function CounselingPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[250px] sm:h-[300px] md:h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroImage.src})`,
                }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4">{content.heroTitle}</h1>

                    {/* Breadcrumb */}
                    <div className={`flex items-center gap-2 text-sm text-white mt-4 ${isAr ? "flex-row" : "flex-row-reverse"}`}>
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">
                            {content.breadcrumb.home}
                        </Link>
                        <span>/</span>
                        <Link href="/students" className="hover:text-[#c2a772] transition-colors">
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
                    <StudentsSidebar activeId="counseling" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                            <div className={`flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4] ${isAr ? "" : "flex-row-reverse"}`}>
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="size-6 text-white" />
                                </div>
                                <div className={isAr ? "text-right" : "text-left"}>
                                    <h2 className="text-2xl sm:text-3xl text-[#254151]">{content.pageTitle}</h2>
                                    <p className="text-sm text-gray-600 mt-1">{content.subtitle}</p>
                                </div>
                            </div>

                            {/* About Section */}
                            <section className="mb-10">
                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    <div className="md:col-span-3 bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-6 sm:p-8">
                                        <div className={`flex items-start gap-4 sm:gap-6 ${isAr ? "" : "flex-row-reverse"}`}>
                                            <div className="hidden md:block flex-shrink-0">
                                                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-[#6096b4] rounded-full flex items-center justify-center">
                                                    <MessageCircle className="size-8 sm:size-10 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-4 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                                    <Lightbulb className="size-5 sm:size-6 text-[#c2a772] flex-shrink-0" />
                                                    {content.sections.definition.title}
                                                </h3>
                                                <p className={`text-gray-700 text-base sm:text-lg leading-loose ${isAr ? "" : "text-left"}`}>
                                                    {content.sections.definition.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-3 bg-white border-2 border-[#c2a772] rounded-lg p-4 sm:p-6">
                                        <h3 className={`text-lg sm:text-xl text-[#254151] mb-4 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                            <Target className="size-5 sm:size-6 text-[#c2a772] flex-shrink-0" />
                                            {content.sections.goal.title}
                                        </h3>
                                        <p className={`text-gray-700 leading-loose ${isAr ? "" : "text-left"}`}>
                                            {content.sections.goal.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-8 text-white">
                                    <h3 className={`text-xl sm:text-2xl mb-4 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <Heart className="size-5 sm:size-6 flex-shrink-0" />
                                        {content.sections.howHelp.title}
                                    </h3>
                                    <p className={`leading-loose text-white/95 ${isAr ? "" : "text-left"}`}>
                                        {content.sections.howHelp.description}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                                    <Image
                                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2VsaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NzMxMjg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt={content.images.counselingSession}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md"
                                    />
                                    <Image
                                        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3VwcG9ydHxlbnwxfHx8fDE3NzMxMjg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt={content.images.studentSupport}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            </section>

                            {/* Services Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Shield className="size-5 sm:size-6 text-[#6096b4] flex-shrink-0" />
                                    {content.services.title}
                                </h3>

                                <div className="grid gap-4 sm:gap-6">
                                    {content.services.items.map((service, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-br ${service.color} rounded-lg p-4 sm:p-6 text-white hover:scale-[1.02] transition-transform`}
                                        >
                                            <div className={`flex items-start gap-3 sm:gap-4 ${isAr ? "" : "flex-row-reverse"}`}>
                                                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <service.icon className="size-6 sm:size-7 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{service.title}</h4>
                                                    <p className={`leading-loose text-white/95 text-sm sm:text-base ${isAr ? "" : "text-left"}`}>{service.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Expectations Section */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <CheckCircle className="size-5 sm:size-6 text-[#c2a772] flex-shrink-0" />
                                    {content.expectations.title}
                                </h3>

                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    {content.expectations.items.map((expectation, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 hover:border-[#6096b4] hover:shadow-lg transition-all"
                                        >
                                            <div className={`flex items-start gap-3 sm:gap-4 ${isAr ? "" : "flex-row-reverse"}`}>
                                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <expectation.icon className="size-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`text-base sm:text-lg text-[#254151] font-semibold mb-2 ${isAr ? "" : "text-left"}`}>{expectation.title}</h4>
                                                    <p className={`text-gray-600 text-sm leading-relaxed ${isAr ? "" : "text-left"}`}>{expectation.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Quick Info Cards */}
                            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                <div className="bg-[#6096b4] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <User className="size-10 sm:size-12 mx-auto mb-3" />
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">{content.quickInfo.individual.title}</h4>
                                    <p className="text-xs sm:text-sm opacity-90">{content.quickInfo.individual.description}</p>
                                </div>

                                <div className="bg-[#c2a772] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <Users className="size-10 sm:size-12 mx-auto mb-3" />
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">{content.quickInfo.group.title}</h4>
                                    <p className="text-xs sm:text-sm opacity-90">{content.quickInfo.group.description}</p>
                                </div>

                                <div className="bg-[#254151] rounded-lg p-4 sm:p-6 text-white text-center">
                                    <BookOpen className="size-10 sm:size-12 mx-auto mb-3" />
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">{content.quickInfo.workshops.title}</h4>
                                    <p className="text-xs sm:text-sm opacity-90">{content.quickInfo.workshops.description}</p>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-8 text-white">
                                <h3 className={`text-xl sm:text-2xl mb-6 text-center font-semibold flex items-center justify-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <MessageCircle className="size-5 sm:size-6 flex-shrink-0" />
                                    {content.contact.title}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div className={`flex-1 ${isAr ? "" : "text-right"}`}>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.contact.phoneLabel}</p>
                                            <p className="font-semibold text-sm" dir="ltr">{content.contact.phone}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
                                        <MapPin className="size-6 flex-shrink-0" />
                                        <div className={`flex-1 ${isAr ? "" : "text-right"}`}>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.contact.locationLabel}</p>
                                            <p className="font-semibold text-sm">{content.contact.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                                    <p className="text-xs sm:text-sm opacity-90">
                                        <Lock className="inline size-4 sm:size-5 mx-2" />
                                        {content.contact.confidentiality}
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
