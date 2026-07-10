"use client";

import Link from "next/link";
import { Scale, Shield, BookOpen, Users, Award, Home as HomeIcon, Laptop, AlertCircle, FileText } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import heroImage from "@/public/assets/about/foundation_landing.webp";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";

// All text content extracted into localization object
const contentByLocale = {
    ar: {
        title: "قواعد سلوك الطلبة",
        home: "الرئيسية",
        students: "الطلبة",
        introTitle: "مقدمة",
        introText: "يوفر دليل قواعد السلوك الطلابي هذه إطارًا واضحًا للسلوك المتوقع من الطالب الجامعي في حرم الكلية وفي السكنات الداخلية. ويهدف إلى تعزيز بيئة تعليمية داعمة ومحترمة ومنتجة مع ضمان سلامة ورفاهية جميع الطلاب. ويهدف قسم الإرشاد الطلابي إلى مساعدة الطلاب على النمو ليصبحوا أفراداً مسؤولين ومحترمين، وقادرين على اتخاذ قرارات سليمة تعكس النضج والتعاطف والمساءلة.",
        coreValuesTitle: "القيم الأساسية",
        coreValues: [
            "احترام الذات والآخرين",
            "النزاهة في جميع التصرفات والقرارات",
            "المسؤولية في السلوك الأكاديمي والشخصي",
            "التفكير المجتمعي للمساهمة الإيجابية في البيئة الجامعية",
            "السلامة الذاتية ومجتمع الكلية",
        ],
        guidelinesTitle: "الإرشادات السلوكية العامّة",
        sections: {
            respectOthers: {
                title: "احترام الآخرين",
                icon: Users,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "يجب معاملة الأقران وأعضاء هيئة التدريس والموظفين بلطف واحترام، سواء داخل الفصل الدراسي أو خارجه.",
                    "لن يتم التسامح مع التنمر أو التحرش (الجسدي أو اللفظي أو عبر الإنترنت) أو التمييز على أساس العرق أو الجنس أو الدين أو أي عامل آخر.",
                    "يجب على الطلاب احترام ممتلكات الآخرين ومساحاتهم الشخصية، خاصةً في الأماكن المشتركة.",
                    "يجب عدم قول أو فعل ما يمس أو يزدري الأديان السماوية أو يثير النعرات الدينية أو المذهبية أو الطائفية أو الحزبية أو الفئوية أو القبلية.",
                    "يجب عدم ممارسة أي نشاط سياسي أو ديني أو مذهبي أو حزبي أو فئوي أو انتخابي دون الحصول على موافقة مسبقة من إدارة الكلية.",
                    "يجب عدم قول أو ممارسة فعل يمس الدين أو العقيدة أو الشرف أو كرامة الآخرين، أو يخل بحسن سير السلوك، أو ينافي الخلق القويم الذي ينبغي أن يتحلى به الطالب، أو يخدش الحياء، أو يمس سمعة الدولة أو علمها أو شعارها أو رموزها.",
                    "يجب عدم قول أو ممارسة فعل يمس سمعة الكلية أو العاملين فيها أو منتسبيها.",
                    "يمنع التهديد أو الإهانة أو الاعتداء بالقول أو الفعل بحق أحد أعضاء هيئة التدريس أو أحد منتسبي الكلية طلاباً أو موظفين أو منتسبي الشركات أو المؤسسات العاملة في الكلية.",
                ],
            },
            academicIntegrity: {
                title: "النزاهة الأكاديمية",
                icon: BookOpen,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "تمنع السرقة الأدبية والغش وعدم الأمانة الأكاديمية بأي شكل من الأشكال غير مقبولة.",
                    "يُتوقع من الطلاب اتباع الإرشادات التي يقدمها المعلمون فيما يتعلق بالتعاون والعمل الفردي.",
                    "يمنع الغش في الامتحانات بأي وسيلة كانت أو الشروع أو الاشتراك فيه أو المساعدة عليه أو الحصول على أسئلة الامتحانات قبل انعقادها بطريقة غير مشروعة، والغش بإدخال الطالب بديلاً عنه في الامتحانات أو دخوله بدلاً عن غيره أو الشروع فيه.",
                    "يمنع الغش في البحوث أو التقارير أو التدريبات العملية والميدانية، ومشاريع التخرج، ورسائل الماجستير والدكتوراه.",
                    "يمنع انتحال صفة الغير في أي من الأمور التي لها علاقة بالكلية وشؤونها، أو إعطاء وثائق أو مستندات أو هويات الكلية للغير بقصد استخدامها بطريقة غير مشروعة أو التحدث باسم الكلية دون صفة رسمية أو موافقة مسبقة من إدارة الكلية.",
                    "يمنع تزوير المستندات أو الشهادات أو الوثائق أو استعمال المستندات أو الشهادات أو الوثائق المزورة سواء كانت صادرة من الكلية أو خارجها ما دامت لها صلة بعلاقة الطالب بالكلية أو بإجراءات الدراسة فيها، أو إتلاف كل أو بعض محتواها عمداً، أو أتباع طريقة غير مشروعة للحصول عليها.",
                ],
            },
            housing: {
                title: "السكن الداخلي",
                icon: HomeIcon,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "يجب الحفاظ على بيئة نظيفة ومحترمة في السكن الداخلي.",
                    "يجب الحفاظ على الحد الأدنى من الضوضاء خلال ساعات الهدوء المحددة (على سبيل المثال، من الساعة 10 مساءً إلى 7 صباحاً).",
                    "يجب احترام خصوصية زملاء السكن والزملاء في المساحات المشتركة.",
                    "يجب عدم الإخلال بقواعد الإقامة في سكنات الكلية أو التأخر عن المواعيد المحددة للحضور أو المبيت خارج السكنات دون عذر مقبول أو إحداث أي تغيير في السكن أو محتوياته أو الخروج من الكلية أو السكنات والمخالفة للنظام والتعليمات الصادرة من إدارة الكلية.",
                ],
            },
            campus: {
                title: "الحرم الجامعي",
                icon: Shield,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "يجب اتبع جداول المقررات المطروح من الكلية وحضور المحاضرات الدراسية في الوقت المحدد.",
                    "يجب اتباع قواعد حرم الكلية بشأن حظر التجول ومناطق الدخول والاستخدام المناسب للمرافق العامة.",
                    "يجب الامتناع عن الانخراط في أي مشاجرات جسدية أو سرقة أو تخريب الممتلكات العامة.",
                    "يمنع تعطيل الدراسة أو التحريض عليه أو الامتناع عن حضور المحاضرات أو الأعمال الأخرى التي تقضي اللوائح والأنظمة المواظبة عليها.",
                    "يمنع الإخلال بالنظام والانضباط وحسن سير الدراسة في الكلية ومرافقها أو بالقواعد المتبعة أثناء المحاضرات أو الامتحانات أو الندوات أو الأنشطة التي تقام داخل الكلية أو أحد مرافقها أو تلك التي تقام خارجها وتشترك فيها الكلية.",
                    "لا يحق لأي طالبـ/ـة الاطلاع دون وجه حق على المعلومات السرية الخاصة بأي من منتسبي الكلية أو نشرها أو إرشاد الغير على طريقة الحصول عليها.",
                    "يمنع إقامة أي أنشطة أو فعاليات داخل الكلية أو المشاركة فيها، أو إصدار المطبوعات أو النشرات أو الملصقات أو المشاركة في توزيعها، أو جمع الأموال أو التبرعات أو التوقيعات دون موافقة مسبقة من إدارة الكلية.",
                    "منع إساءة استعمال أو إتلاف أو تخريب منشآت الكلية أو ممتلكاتها أو تعديلها أو نقلها بغير موافقة إدارة الكلية، أو السلوك الذي يؤثر على نظافة الكلية ومرافقها أو الشروع في ذلك.",
                    "يمنع إدخال سلاح ناري ولو كان مرخصاً أو سلاح أبيض أو حيازة مواد قابلة للاشتعال أو الانفجار أو إدخال أي مواد يمكن استخدامها لغرض غير مشروع للكلية أو مرافقها، أو التهديد باستعمال أي من ذلك.",
                ],
            },
            technology: {
                title: "استخدام التكنولوجيا",
                icon: Laptop,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "يجب استخدام التكنولوجيا (مثل أجهزة الكمبيوتر والهواتف المحمولة) بمسؤولية.",
                    "يُحظر التنمر الإلكتروني أو مشاركة المحتوى غير اللائق أو انتهاك الخصوصية (مثل تسجيل شخص ما سرًا).",
                    "يجب عدم استخدام التقنيات الحديثة لغرض ينافي الآداب والأخلاق للإضرار بالكلية أو أحد منتسبيها.",
                    "تمنع حيازة أجهزة أو أفلام أو صور أو أشرطة أو صحف أو مجلات تحتوي على ما ينافي الآداب والأخلاق داخل الكلية أو أحد مرافقها.",
                ],
            },
            personalResponsibility: {
                title: "المسؤولية الشخصية",
                icon: AlertCircle,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "من المتوقع أن يتحمل الطلاب مسؤولية أفعالهم وتبعات المخالفات السلوكية.",
                    "يجب الالتزام بالذوق العام في الزي والملبس والهيئة بما يتناسب مع القيم الإسلامية والاجتماعية للمجتمع العماني، وما تصدره الكلية من تعليمات في ذات الشأن.",
                    "يجب على الطالب عدم تقديم بيانات غير صحيحة أو الامتناع عن تقديم الأوراق الثبوتية أو عدم أتباع تعليمات موظفي أمن الكلية.",
                    "في حالة نشوب نزاعات أو خلافات مع الزملاء أو أي شخص منتسب للكلية، يجب على الطلبة طلب المساعدة من قسم الإرشاد الطلابي أو الموظفين المعنيين الموثوق بهم قبل أن تتفاقم المشكلة.",
                    "يتحمل الطالب مسؤولية ارتكابه أي مخالفة أخرى ترى الكلية أنها تشكل إخلالاً باللوائح أو التعليمات أو القرارات لم يرد بشأنها نص في هذه اللائحة وتحتفظ الكلية بحقها في توقيع عقوبة على أي طالب لم يلتزم بأي تعليمات أو إرشادات تُصدر من إدارة الكلية.",
                ],
            },
        },
        supportMeasuresTitle: "التدابير الداعمة",
        supportMeasures: [
            {
                title: "الجلسات الاستشارية",
                description: "سيتم تقديم جلسات استشارية فردية أو جماعية للطلاب الذين يعانون من مشكلات سلوكية للمساعدة في تحديد المشكلات الكامنة وتطوير استراتيجيات أفضل للتكيف.",
            },
            {
                title: "الوساطة وحل النزاعات",
                description: "سيقوم مستشارو التوجيه الإرشادي بتسهيل اجتماعات حل النزاعات بين الطلاب للمساعدة في حل النزاعات الشخصية بطريقة سلمية.",
            },
            {
                title: "إخطار ولي الأمر",
                description: "سيتم إشراك أولياء الأمور أو الأوصياء في مراحل مختلفة من العملية الإصلاحية لضمان بذل جهد تعاوني في تحسين سلوك الطالب.",
            },
        ],
        noteTitle: "ملاحظة مهمة",
        noteText: "على الطالب الاطلاع على العقوبات في لائحة سلوك الطلبة المنصوص عليها في المادة 9 والدارجة في (دليل الطالب ص74-75)",
    },
    en: {
        title: "Student Conduct Rules",
        home: "Home",
        students: "Students",
        introTitle: "Introduction",
        introText: "This Student Conduct Guide provides a clear framework for the expected behavior of college students on campus and in residential housing. It aims to promote a supportive, respectful, and productive learning environment while ensuring the safety and well-being of all students. The Student Counseling Department aims to help students grow into responsible and respectful individuals capable of making sound decisions that reflect maturity, empathy, and accountability.",
        coreValuesTitle: "Core Values",
        coreValues: [
            "Respect for self and others",
            "Integrity in all actions and decisions",
            "Responsibility in academic and personal conduct",
            "Community thinking for positive contribution to the university environment",
            "Personal safety and college community safety",
        ],
        guidelinesTitle: "General Behavioral Guidelines",
        sections: {
            respectOthers: {
                title: "Respect for Others",
                icon: Users,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "Peers, faculty, and staff must be treated with kindness and respect, both inside and outside the classroom.",
                    "Bullying or harassment (physical, verbal, or online) or discrimination based on race, gender, religion, or any other factor will not be tolerated.",
                    "Students must respect others' property and personal space, especially in shared areas.",
                    "One must not say or do anything that disrespects or ridicules heavenly religions or incites sectarian, partisan, or tribal strife.",
                    "No political, religious, sectarian, partisan, or electoral activity may be practiced without prior approval from college administration.",
                    "One must not say or do anything that infringes on the religion, beliefs, honor, or dignity of others, or violates good conduct and modesty, or harms the reputation of the state or its symbols.",
                    "One must not say or do anything that harms the reputation of the college or its staff or affiliates.",
                    "Threatening, insulting, or assaulting any faculty member, student, employee, or company staff member working at the college is prohibited.",
                ],
            },
            academicIntegrity: {
                title: "Academic Integrity",
                icon: BookOpen,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "Plagiarism, cheating, and any form of academic dishonesty are unacceptable.",
                    "Students are expected to follow the guidelines provided by instructors regarding cooperation and individual work.",
                    "Cheating in exams by any means, attempting to cheat, helping others cheat, or obtaining exam questions illegally is prohibited.",
                    "Cheating in research, reports, practical and field training, graduation projects, and thesis papers is prohibited.",
                    "Impersonation in any college-related matters, or giving college documents to others for illegal use, or speaking on behalf of the college without official authority is prohibited.",
                    "Forgery of documents, certificates, or papers, or using forged documents, or destroying any part of them, or obtaining them through illegal means is prohibited.",
                ],
            },
            housing: {
                title: "Residential Housing",
                icon: HomeIcon,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "A clean and respectful environment must be maintained in residential housing.",
                    "Minimum noise levels must be maintained during designated quiet hours (e.g., from 10 PM to 7 AM).",
                    "The privacy of roommates and peers in shared spaces must be respected.",
                    "Violating housing rules, being late for designated times, staying outside housing without valid excuse, or making unauthorized changes to housing is prohibited.",
                ],
            },
            campus: {
                title: "Campus",
                icon: Shield,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "Course schedules must be followed and lectures attended on time.",
                    "College rules regarding curfews, entry zones, and appropriate use of public facilities must be followed.",
                    "Engagement in any physical altercations, theft, or vandalism of public property must be avoided.",
                    "Disrupting studies or inciting disruption, or refusing to attend lectures is prohibited.",
                    "Violating order, discipline, and proper conduct of studies at the college or its facilities is prohibited.",
                    "No student has the right to access, publish, or guide others to obtain confidential information about college affiliates.",
                    "Organizing or participating in any activities, issuing publications or posters, or collecting funds without prior college approval is prohibited.",
                    "Misuse, destruction, or vandalism of college facilities or property without approval is prohibited.",
                    "Bringing firearms (even licensed), weapons, or flammable materials, or threatening to use any of these is prohibited.",
                ],
            },
            technology: {
                title: "Technology Use",
                icon: Laptop,
                borderColor: "#6096b4",
                bulletColor: "#6096b4",
                items: [
                    "Technology (such as computers and mobile phones) must be used responsibly.",
                    "Cyberbullying, sharing inappropriate content, or violating privacy (such as secretly recording someone) is prohibited.",
                    "Modern technology must not be used for purposes that violate morals and ethics to harm the college or its affiliates.",
                    "Possession of devices, films, images, tapes, newspapers, or magazines containing immoral content within the college is prohibited.",
                ],
            },
            personalResponsibility: {
                title: "Personal Responsibility",
                icon: AlertCircle,
                borderColor: "#c2a772",
                bulletColor: "#c2a772",
                items: [
                    "Students are expected to take responsibility for their actions and the consequences of behavioral violations.",
                    "Public taste in dress and appearance must be observed in accordance with Islamic and social values of Omani society.",
                    "Students must not provide false information, refuse to submit required documents, or fail to follow security staff instructions.",
                    "In case of disputes with peers or any college affiliate, students should seek help from the Student Counseling Department before the problem escalates.",
                    "The student bears responsibility for committing any other violation that the college deems a breach of regulations, instructions, or decisions not covered by this regulation.",
                ],
            },
        },
        supportMeasuresTitle: "Supportive Measures",
        supportMeasures: [
            {
                title: "Counseling Sessions",
                description: "Individual or group counseling sessions will be provided to students with behavioral problems to help identify underlying issues and develop better coping strategies.",
            },
            {
                title: "Mediation and Conflict Resolution",
                description: "Counseling advisors will facilitate conflict resolution meetings between students to help resolve personal disputes peacefully.",
            },
            {
                title: "Parental Notification",
                description: "Parents or guardians will be involved at various stages of the corrective process to ensure collaborative effort in improving student behavior.",
            },
        ],
        noteTitle: "Important Note",
        noteText: "Students should review the penalties in the Student Conduct Code specified in Article 9 and listed in (Student Guide pp. 74-75)",
    },
};

export default function ConductRulesPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    const sections = [
        content.sections.respectOthers,
        content.sections.academicIntegrity,
        content.sections.housing,
        content.sections.campus,
        content.sections.technology,
        content.sections.personalResponsibility,
    ];

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[300px] sm:h-[350px] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 font-bold">{content.title}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">{content.home}</Link>
                        <span>/</span>
                        <Link href="/students" className="hover:text-[#c2a772] transition-colors">{content.students}</Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{content.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="conduct-rules" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Scale className="size-5 sm:size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151] font-bold">{content.title}</h2>
                            </div>

                            {/* Introduction */}
                            <section className="mb-10">
                                <h3 className="text-xl sm:text-2xl text-[#254151] mb-4 flex items-center gap-2 font-semibold">
                                    <FileText className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.introTitle}
                                </h3>
                                <p className="text-gray-700 leading-loose text-sm sm:text-base">{content.introText}</p>
                            </section>

                            {/* Core Values */}
                            <section className="mb-10">
                                <h3 className="text-xl sm:text-2xl text-[#254151] mb-4 flex items-center gap-2 font-semibold">
                                    <Award className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.coreValuesTitle}
                                </h3>
                                <div className="bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-4 sm:p-6">
                                    <ul className="space-y-3">
                                        {content.coreValues.map((value, index) => (
                                            <li key={index} className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                                <span className="w-2 h-2 bg-[#6096b4] rounded-full mt-2 flex-shrink-0"></span>
                                                <span className="text-gray-700 text-base sm:text-lg">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Guidelines */}
                            <section className="mb-10">
                                <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold">
                                    <Scale className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.guidelinesTitle}
                                </h3>

                                {sections.map((section, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-8 bg-white ${isAr ? "border-r-4" : "border-l-4"} p-4 sm:p-6 rounded-lg shadow-sm`}
                                        style={{ borderColor: section.borderColor }}
                                    >
                                        <h4 className={`text-lg sm:text-xl text-[#254151] mb-4 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                            <section.icon className="size-5 sm:size-6" style={{ color: section.bulletColor }} />
                                            {section.title}
                                        </h4>
                                        <ul className="space-y-3">
                                            {section.items.map((item, index) => (
                                                <li key={index} className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                                    <span className="text-xl flex-shrink-0" style={{ color: section.bulletColor }}>•</span>
                                                    <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>

                            {/* Support Measures */}
                            <section className="mb-10">
                                <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold">
                                    <Shield className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.supportMeasuresTitle}
                                </h3>

                                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                                    {content.supportMeasures.map((measure, index) => (
                                        <div key={index} className={`rounded-lg p-4 sm:p-6 ${index % 2 === 0 ? "bg-[#6096b4]/10" : "bg-[#c2a772]/10"}`}>
                                            <h4 className="text-base sm:text-lg text-[#254151] mb-3 font-semibold">{measure.title}</h4>
                                            <p className="text-gray-700 text-sm leading-relaxed">{measure.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Important Note */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-6 text-white">
                                <div className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                    <AlertCircle className="size-5 sm:size-6 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-lg sm:text-xl mb-2 font-semibold">{content.noteTitle}</h4>
                                        <p className="leading-relaxed text-sm sm:text-base">{content.noteText}</p>
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