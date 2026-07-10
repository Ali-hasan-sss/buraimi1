"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Users, Palette, Mic, Heart, MessageSquare, Dumbbell, GraduationCap, Globe, Lightbulb, FileText, Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";
import { studentsLanding } from "@/lib/students-landing-images";

// All text content extracted into localization object
const contentByLocale = {
    ar: {
        title: "الأنشطة الطلابية",
        home: "الرئيسية",
        students: "الطلبة",
        subtitle: "الأنشطة والفعاليات الطلابية في كلية البريمي الجامعية",
        aboutTitle: "نبذة عن الأنشطة الطلابية",
        aboutText: "ويعمل المختصون في القسم على توسيع قاعدة الطلبة المهتمين بالمشاركة في الأنشطة الطلابية لما لها من أثر عظيم في توسيع مدارك الطالب بطريقة علمية وصقل المهارات العامة كالتواصل والعمل الجماعي والقيادة والتي يتم من خلالها اكتشاف المواهب والطاقات واستثمارها من خلال إعداد خطة عمل سنوية تدمج الطلبة في الحياة الجامعية من خلال المرافق المجهزة بمركز الأنشطة الطلابية المتنوعة بين مرافق رياضية وثقافية وترفيهية لخدمة رؤية الكلية ورسالتها.",
        groupsTitle: "الأندية والمجموعات الطلابية",
        academicClubsTitle: "الأندية التابعة للأقسام الأكاديمية بالتنسيق مع قسم الأنشطة الطلابية",
        servicesTitle: "الخدمات التي نقدمها",
        forms: {
            activities: "استمارة الاشتراك في الأنشطة",
            activitiesDesc: "انضم إلى الأنشطة الطلابية وشارك في بناء مستقبلك",
            facilities: "استمارة استخدام مرافق الأنشطة",
            facilitiesDesc: "احجز المرافق المتاحة لأنشطتك وفعالياتك",
        },
        contactTitle: "للتواصل",
        contact: {
            phone: "رقم الهاتف",
            location: "المكان",
            email: "البريد الإلكتروني",
            phoneValue: "25657666-(778)",
            locationValue: "دائرة شؤون الطلبة",
            emailValue: "sc_buc@buc.edu.om",
        },
        studentGroups: [
            {
                title: "جماعة الإعلام",
                description: "جماعة الإعلام كجماعة طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الجماعة من (تقديم – كتابة خبر صحفي – لقاءات صحفية – إلخ ...).",
            },
            {
                title: "جماعة المسرح والأدب",
                description: "جماعة المسرح والأدب كجماعة طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الجماعة من (تقديم – كتابة خبر صحفي – لقاءات صحفية – إلخ ...).",
            },
            {
                title: "جماعة عون",
                description: "جماعة طلابية تطوعية تحت إشراف قسم الإرشاد الطلابي وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات العمل التطوعي داخل الحرم الجامعي لمنتسبي الجماعة.",
            },
            {
                title: "نادي المناظرات",
                description: "جماعة المناظرات كجماعة طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الجماعة من مهارات خاصة بالإقناع والمعلومات العامة وقواعد التناظر.",
            },
            {
                title: "جماعة الشعر والأدب \"قافية\"",
                description: "جماعة الأدب كجماعة طلابية تحت إشراف وحدة المتطلبات العامة وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الجماعة من (كتابة أدبية – القراءة والاطلاع – إلخ ...)",
            },
            {
                title: "عشائر الجوالة",
                description: "عشائر الجوالة والجوالات كجماعة طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على توفير البيئة التي تحفز الطلبة للمشاركة والمساهمة في الأنشطة التطوعية التي تفيد المجتمع وتقدم خدمات اجتماعية متنوعة، وتحقق الرسالة التي يتبناها القسم من خلال المساهمة في خدمة المجتمع الجامعي والمجتمع المحلي وتربية الشباب على الجدية والعمل بإخلاص وفق القيم الإسلامية في إعداد شخصيات قيادية تسهم في بناء الوطن ورفعته تحت مظلة المديرية العامة للكشافة والمرشدات.",
            },
            {
                title: "مجموعة الفنون الجميلة",
                description: "جماعة الفنون التشكيلية كجماعة طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على تنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الجماعة من فنون تشكيلية مختلفة (رسم – تصوير – نحت – أعمال يدوية – إلخ ...)",
            },
            {
                title: "الفرق الرياضية",
                description: "الفرق الرياضية كجماعات طلابية تحت إشراف قسم الأنشطة الطلابية وتعمل على تخطيط وتنفيذ خطة للأنشطة والفعاليات تساعد على تنمية مهارات منتسبي الفرق (كرة قدم – الكرة الطائرة- تنس الطاولة– البلياردو- اللياقة البدنية وكمال الأجسام – إلخ ...)",
            },
        ],
        academicClubs: [
            {
                title: "نادي اللغة الإنجليزية",
                description: "تعمل الجماعة تحت إشراف قسم اللغة الإنجليزية وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي المهارات اللغوية في سياق الأهداف التعليمية للقسم.",
            },
            {
                title: "العيادة القانونية",
                description: "تعمل العيادة القانونية تحت إشراف برنامج القانون وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي المهارات القانونية.",
            },
            {
                title: "نادي إدارة الأعمال",
                description: "تعمل الجماعة تحت إشراف قسم إدارة الأعمال وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي المهارات الإدارية وريادة الأعمال والتسويق إلخ ...",
            },
            {
                title: "نادي تكنولوجيا المعلومات",
                description: "تعمل الجماعة تحت إشراف قسم تقنية المعلومات وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي مهارات تقنية المعلومات.",
            },
            {
                title: "نادي البرنامج التأسيسي",
                description: "تعمل الجماعة تحت إشراف وحدة البرنامج التأسيسي وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي المهارات اللغوية ودمج الطلبة الجدد بالحياة الجامعية.",
            },
            {
                title: "جماعة الثقافة والإبداع",
                description: "تعمل الجماعة تحت إشراف وحدة المتطلبات العامة وتعمل على تخطيط وتنفيذ أنشطة وفعاليات لاصفية تنمي الحس الوطني وخدمة المجتمع.",
            },
            {
                title: "نادي الخريجين",
                description: "يعمل النادي تحت إشراف قسم التوجيه الوظيفي ومتابعة الخريجين وينفذ خطة تعمل على ربط الخريجين بالكلية وصقل مهاراتهم والحفاظ على جسر من التواصل معهم.",
            },
            {
                title: "نادي الطلبة الدوليين",
                description: "يعمل النادي تحت إشراف قسم شؤون الطلبة الدوليين وينفذ خطة تعمل على دمج الطلبة الدوليين بالمجتمع العماني بشكل عام ومجتمع الكلية بشكل خاص والتواصل المستمر معهم.",
            },
            {
                title: "جماعة ريادة الأعمال والابتكار",
                description: "تعمل الجماعة تحت إشراف حاضنة الأعمال وتعمل على نشر ثقافة ريادة الأعمال والتشجيع على الابتكار.",
            },
        ],
    },
    en: {
        title: "Student Activities",
        home: "Home",
        students: "Students",
        subtitle: "Student activities and events at Al Buraimi University College",
        aboutTitle: "About Student Activities",
        aboutText: "The department specialists work to expand the base of students interested in participating in student activities, given their great impact in expanding students' knowledge in a scientific way and refining general skills such as communication, teamwork, and leadership. Through these activities, talents and energies are discovered and invested through the preparation of an annual work plan that integrates students into university life through the facilities equipped at the Student Activities Center, which include various sports, cultural, and recreational facilities to serve the college's vision and mission.",
        groupsTitle: "Student Groups and Clubs",
        academicClubsTitle: "Academic Department Clubs in Coordination with Student Activities Department",
        servicesTitle: "Services We Offer",
        forms: {
            activities: "Activities Registration Form",
            activitiesDesc: "Join student activities and participate in building your future",
            facilities: "Facility Usage Form",
            facilitiesDesc: "Book available facilities for your activities and events",
        },
        contactTitle: "Contact Us",
        contact: {
            phone: "Phone Number",
            location: "Location",
            email: "Email",
            phoneValue: "25657666-(778)",
            locationValue: "Student Affairs Department",
            emailValue: "sc_buc@buc.edu.om",
        },
        studentGroups: [
            {
                title: "Media Club",
                description: "The Media Club is a student group under the supervision of the Student Activities Department that implements a plan of activities and events to help develop members' skills in (presentation - news writing - press interviews - etc.).",
            },
            {
                title: "Theater and Literature Club",
                description: "The Theater and Literature Club is a student group under the supervision of the Student Activities Department that implements a plan of activities and events to help develop members' skills.",
            },
            {
                title: "Aoun Club",
                description: "A student volunteer group under the supervision of the Student Counseling Department that implements a plan of activities and events to help develop volunteer work skills on campus.",
            },
            {
                title: "Debating Club",
                description: "The Debating Club is a student group under the supervision of the Student Activities Department that implements a plan of activities and events to help develop members' skills in persuasion, general knowledge, and debate rules.",
            },
            {
                title: "Qafiya Poetry and Literature Club",
                description: "The Literature Club is a student group under the supervision of the General Requirements Unit that implements a plan of activities and events to help develop members' skills in (literary writing - reading and research - etc.)",
            },
            {
                title: "Scouts",
                description: "The Scouts are a student group under the supervision of the Student Activities Department that provides an environment that motivates students to participate and contribute to volunteer activities that benefit society and provide various social services, achieving the department's mission through contributing to serving the university and local community and raising youth to be dedicated and work with sincerity according to Islamic values in preparing leadership personalities that contribute to building and raising the nation under the umbrella of the General Directorate of Scouting and Guiding.",
            },
            {
                title: "Fine Arts Group",
                description: "The Fine Arts Club is a student group under the supervision of the Student Activities Department that implements a plan of activities and events to help develop members' skills in various visual arts (drawing - photography - sculpture - handicrafts - etc.)",
            },
            {
                title: "Sports Teams",
                description: "The Sports Teams are student groups under the supervision of the Student Activities Department that plan and implement a plan of activities and events to help develop team members' skills (football - volleyball - table tennis - billiards - fitness and bodybuilding - etc.)",
            },
        ],
        academicClubs: [
            {
                title: "English Language Club",
                description: "The group works under the supervision of the English Department and plans and implements extracurricular activities and events that develop language skills in the context of the department's educational objectives.",
            },
            {
                title: "Legal Clinic",
                description: "The Legal Clinic operates under the supervision of the Law Program and plans and implements extracurricular activities and events that develop legal skills.",
            },
            {
                title: "Business Management Club",
                description: "The group works under the supervision of the Business Management Department and plans and implements extracurricular activities and events that develop administrative, entrepreneurship, and marketing skills.",
            },
            {
                title: "Information Technology Club",
                description: "The group works under the supervision of the Information Technology Department and plans and implements extracurricular activities and events that develop IT skills.",
            },
            {
                title: "Foundation Program Club",
                description: "The group works under the supervision of the Foundation Program Unit and plans and implements extracurricular activities and events that develop language skills and integrate new students into university life.",
            },
            {
                title: "Culture and Creativity Club",
                description: "The group works under the supervision of the General Requirements Unit and plans and implements extracurricular activities and events that develop national consciousness and community service.",
            },
            {
                title: "Alumni Club",
                description: "The club operates under the supervision of the Career Guidance and Alumni Follow-up Department and implements a plan that works to connect alumni with the college, refine their skills, and maintain a bridge of communication with them.",
            },
            {
                title: "International Students Club",
                description: "The club operates under the supervision of the International Students Affairs Department and implements a plan that works to integrate international students into Omani society in general and the college community in particular, with continuous communication with them.",
            },
            {
                title: "Entrepreneurship and Innovation Club",
                description: "The group works under the supervision of the Business Incubator and works to spread the culture of entrepreneurship and encourage innovation.",
            },
        ],
    },
};

// Icons mapped for student groups (alternating colors)
const groupIcons = [Mic, MessageSquare, Heart, Users, MessageSquare, Award, Palette, Dumbbell];
const groupColors = ["bg-[#6096b4]", "bg-[#c2a772]", "bg-[#6096b4]", "bg-[#c2a772]", "bg-[#6096b4]", "bg-[#c2a772]", "bg-[#6096b4]", "bg-[#c2a772]"];

// Icons for academic clubs
const clubIcons = [Globe, FileText, Users, GraduationCap, GraduationCap, Award, GraduationCap, Globe, Lightbulb];

export default function ActivitiesPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[300px] sm:h-[350px]">
                <Image
                    src={studentsLanding.activitiesHero}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 font-bold">
                        {content.title}
                    </h1>

                    {/* Breadcrumb */}
                    <div className={`flex items-center gap-2 text-sm text-white mt-4 ${isAr ? "" : "flex-row-reverse"}`}>
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">
                            {content.home}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {content.students}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{content.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="activities" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <div className={`flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4] ${isAr ? "" : "flex-row-reverse"}`}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Award className="size-5 sm:size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151] font-bold">{content.title}</h2>
                            </div>

                            {/* About Student Activities */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-4 font-semibold ${isAr ? "" : "text-left"}`}>
                                    {content.aboutTitle}
                                </h3>
                                <p className={`text-gray-700 leading-loose mb-6 text-sm sm:text-base ${isAr ? "" : "text-left"}`}>
                                    {content.aboutText}
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6">
                                    {studentsLanding.activitiesGallery.map((src, i) => {
                                        const alts = [content.title, content.groupsTitle, content.academicClubsTitle];
                                        return (
                                            <div
                                                key={i}
                                                className="relative h-40 sm:h-48 rounded-lg overflow-hidden shadow-md"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={alts[i] ?? content.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(min-width: 768px) 33vw, 100vw"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Student Groups */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Users className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.groupsTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    {content.studentGroups.map((group, index) => {
                                        const Icon = groupIcons[index];
                                        const color = groupColors[index];
                                        return (
                                            <div
                                                key={index}
                                                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all"
                                            >
                                                <div className={`flex items-start gap-4 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                                    <div className={`${color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className="size-5 sm:size-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-base sm:text-lg text-[#254151] font-semibold mb-2">{group.title}</h4>
                                                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{group.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Academic Clubs */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <GraduationCap className="size-5 sm:size-6 text-[#c2a772]" />
                                    {content.academicClubsTitle}
                                </h3>

                                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                                    {content.academicClubs.map((club, index) => {
                                        const Icon = clubIcons[index];
                                        return (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all"
                                            >
                                                <div className={`flex flex-col items-center text-center gap-3 ${isAr ? "" : "text-left items-start"}`}>
                                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#254151] rounded-full flex items-center justify-center">
                                                        <Icon className="size-6 sm:size-7 text-white" />
                                                    </div>
                                                    <h4 className="text-base sm:text-lg text-[#254151] font-semibold">{club.title}</h4>
                                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{club.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Services */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <FileText className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.servicesTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-[#6096b4] rounded-lg p-4 sm:p-6 text-white text-center hover:bg-[#254151] transition-all cursor-pointer">
                                        <FileText className="size-10 sm:size-12 mx-auto mb-3" />
                                        <h4 className="text-lg sm:text-xl font-semibold mb-2">{content.forms.activities}</h4>
                                        <p className="text-xs sm:text-sm opacity-90">{content.forms.activitiesDesc}</p>
                                    </div>

                                    <div className="bg-[#c2a772] rounded-lg p-4 sm:p-6 text-white text-center hover:bg-[#254151] transition-all cursor-pointer">
                                        <FileText className="size-10 sm:size-12 mx-auto mb-3" />
                                        <h4 className="text-lg sm:text-xl font-semibold mb-2">{content.forms.facilities}</h4>
                                        <p className="text-xs sm:text-sm opacity-90">{content.forms.facilitiesDesc}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-8 text-white">
                                <h3 className="text-xl sm:text-2xl mb-6 text-center font-semibold">
                                    {content.contactTitle}
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                        <Phone className="size-5 sm:size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.contact.phone}</p>
                                            <p className="font-semibold text-sm sm:text-base" dir="ltr">{content.contact.phoneValue}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                        <MapPin className="size-5 sm:size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.contact.location}</p>
                                            <p className="font-semibold text-sm sm:text-base">{content.contact.locationValue}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                        <Mail className="size-5 sm:size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs sm:text-sm opacity-90 mb-1">{content.contact.email}</p>
                                            <p className="font-semibold text-xs sm:text-sm">{content.contact.emailValue}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
