"use client";

import Link from "next/link";
import { FileText, AlertTriangle, Gavel, BookOpen, Users, Shield } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import heroImage from "@/public/assets/about/foundation_landing.webp";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";

// All text content extracted into localization object
const contentByLocale = {
    ar: {
        title: "لوائح مسائلة الطلبة",
        home: "الرئيسية",
        students: "الطلبة",
        subtitle: "القوانين واللوائح المنظمة لمساءلة الطلبة في الكلية",
        introText: "تهدف هذه اللائحة إلى تنظيم إجراءات مساءلة الطلبة عن المخالفات التي يرتكبونها داخل الكلية أو خارجها، وتحديد العقوبات التأديبية المناسبة، وضمان العدالة والنزاهة في تطبيقها.",
        definitionsTitle: "التعريفات",
        violationsTitle: "المخالفات",
        violationsSubtitle: "المخالفات التي يُمنع ارتكابها داخل الكلية أو خارجها",
        penaltiesTitle: "العقوبات التأديبية",
        penaltiesSubtitle: "العقوبات التي يجوز توقيعها على الطلبة المخالفين",
        investigationTitle: "إجراءات التحقيق",
        investigationText: "تُشكل لجنة مساءلة الطلبة للنظر في المخالفات، وتتكون من ممثلين عن الإدارة والشؤون الأكاديمية والطلبة. يحق للطالب المخالف الاعتراض على قرارات اللجنة وفقاً للإجراءات المحددة.",
        definitions: [
            { term: "الكليــــــــة", definition: "كلية البريمي الجامعية" },
            { term: "Chairman", definition: "رئيس مجلس إدارة كلية البريمي الجامعية" },
            { term: "المجلـــــــس", definition: "مجلس الكلية" },
            { term: "عميد الكلية", definition: "Dean of Al Buraimi University College" },
            { term: "مساعد العمــــيد", definition: "مساعد العميد للشؤون الأكاديمية المساندة" },
            { term: "مدير", definition: "مدير دائرة شؤون الطلبة بالكلية" },
            { term: "الطالــــــــب", definition: "كل طالب أو طالبة مقيد بالكلية للدراسة أياً كانت مستوياتهم التعليمية" },
            { term: "اللجنــــــــة", definition: "لجنة مسائلة الطلبة" },
            { term: "المخالفـــــــة", definition: "كل فعل أو قول أو سلوك يخالف الأنظمة واللوائح والتعليمات المعمول بها في الكلية" },
            { term: "العقوبة التأديبيــة", definition: "كل عقوبة منصوص عليها في هذه اللائحة" },
            { term: "الامتحــــــان", definition: "كل اختبار أو تقييم يؤدى بالكلية وفقاً للأحكام التي حددتها لائحة الدراسة والامتحانات بالكلية" },
        ],
        violations: [
            "كل ما يمس أو يزدري الأديان السماوية أو يثير النعرات الدينية أو المذهبية أو الطائفية أو الحزبية أو الفئوية أو القبلية",
            "ممارسة أي نشاط سياسي أو ديني أو مذهبي أو حزبي أو فئوي أو انتخابي دون الحصول على موافقة مسبقة من إدارة الكلية",
            "كل قول أو فعل يمس الدين أو العقيدة أو الشرف أو كرامة الآخرين، أو يخل بحسن سير السلوك، أو ينافي الخلق القويم الذي ينبغي أن يتحلى به الطالب، أو يخدش الحياء، أو يمس سمعة الدولة أو علمها أو شعارها أو رموزها",
            "كل ما يمس سمعة الكلية أو العاملين فيها أو منتسبيها",
            "تعطيل الدراسة أو التحريض عليه أو الامتناع عن حضور المحاضرات أو الأعمال الجامعية الأخرى التي تقضي اللوائح والأنظمة المواظبة عليها",
            "الإخلال بالنظام والانضباط وحسن سير الدراسة في الكلية ومرافقها أو بالقواعد المتبعة أثناء المحاضرات أو الامتحانات أو الندوات أو الأنشطة",
            "الغش في الامتحانات بأي وسيلة كانت أو الشروع أو الاشتراك فيه أو المساعدة عليه أو الحصول على أسئلة الامتحانات قبل انعقادها بطريقة غير مشروعة",
            "الغش في البحوث أو التقارير أو التدريبات العملية والميدانية، ومشاريع التخرج، ورسائل الماجستير والدكتوراه",
            "انتحال صفة الغير في أي من الأمور التي لها علاقة بالكلية وشؤونها، أو إعطاء وثائق أو مستندات أو هويات الكلية للغير بقصد استخدامها بطريقة غير مشروعة",
            "تزوير المستندات أو الشهادات أو الوثائق أو استعمال المستندات أو الشهادات أو الوثائق المزورة",
            "التهديد أو الإهانة أو الاعتداء بالقول أو الفعل بحق أحد أعضاء هيئة التدريس أو أحد منتسبي الكلية",
            "الاطلاع دون وجه حق على المعلومات السرية الخاصة بأي من منتسبي الكلية أو نشرها أو إرشاد الغير على طريقة الحصول عليها",
            "إقامة أي أنشطة أو فعاليات داخل الكلية أو المشاركة فيها، أو إصدار المطبوعات أو النشرات أو الملصقات دون موافقة مسبقة من إدارة الكلية",
            "المساس بالمبادئ والأسس الإسلامية والاجتماعية للسلطنة أو الإساءة إلى الوحدة الوطنية قولاً أو فعلاً",
            "إساءة استعمال أو إتلاف أو تخريب منشآت الكلية أو ممتلكاتها أو تعديلها أو نقلها بغير موافقة إدارة الكلية",
            "إدخال سلاح ناري ولو كان مرخصاً أو سلاح أبيض أو حيازة مواد قابلة للاشتعال أو الانفجار",
            "استخدام التقنيات الحديثة لغرض ينافي الآداب والأخلاق للإضرار بالكلية أو أحد منتسبيها",
            "حيازة أجهزة أو أفلام أو صور أو أشرطة أو صحف أو مجلات تحتوي على ما ينافي الآداب والأخلاق",
            "عدم الالتزام بالذوق العام في الزي أو الملبس أو الهيئة بما لا يتناسب مع القيم الإسلامية والاجتماعية",
            "الإخلال بقواعد الإقامة في سكنات الكلية أو التأخر عن المواعيد المحددة للحضور أو المبيت خارج السكنات دون عذر مقبول",
            "تقديم بيانات غير صحيحة أو الامتناع عن تقديم الأوراق الثبوتية أو عدم اتباع تعليمات موظفي أمن الكلية",
            "الإخلال بإجراءات التحقيق أو الخروج عن حدود الأخلاق والآداب الواجبة في اجتماعات اللجنة",
            "كل مخالفة أخرى ترى الكلية أنها تشكل إخلالاً باللوائح أو التعليمات أو القرارات لم يرد بشأنها نص في هذه اللائحة",
        ],
        penalties: [
            "التنبيه الشفوي أو الكتابي والتوقيع على تعهد خطي من المخالف",
            "الإنذار الشفوي أو الإنذار الكتابي الأول أو النهائي",
            "الحرمان لمدة محدودة من الاستفادة من الخدمات التي تقدمها مرافق الكلية",
            "إلزام المخالف بسداد قيمة ما أتلفه من ممتلكات الكلية أو الغير",
            "إلغاء أو إيقاف المنحة أو الخصومات الممنوحة من الكلية",
            "إلغاء تسجيل الطالب في مقرر أو أكثر وحصوله على تقدير نهائي (F) مع إلزام الطالب بأداء قيمة الرسوم الدراسية",
            "إلغاء الامتحان في مقرر أو أكثر وحصول الطالب على تقدير نهائي (F) مع إلزام الطالب بأداء قيمة الرسوم الدراسية",
            "الفصل المؤقت بما لا يتجاوز فصلين دراسيين، مع عدم احتساب المواد التي يدرسها الطالب في كلية أو جامعة أخرى خلال مدة الفصل",
            "عدم منح وثائق التخرج أو الشهادات العلمية أو الوثائق غير الدراسية أو عدم اعتمادها، أو حجبها بسبب المخالفة التأديبية",
            "الفصل النهائي من الكلية، مع عدم السماح له بالتسجيل فيها مرة أخرى",
        ],
    },
    en: {
        title: "Student Conduct Regulations",
        home: "Home",
        students: "Students",
        subtitle: "Laws and regulations governing student accountability at the college",
        introText: "These regulations aim to organize procedures for holding students accountable for violations committed inside or outside the college, determine appropriate disciplinary penalties, and ensure justice and integrity in their application.",
        definitionsTitle: "Definitions",
        violationsTitle: "Violations",
        violationsSubtitle: "Violations prohibited inside or outside the college",
        penaltiesTitle: "Disciplinary Penalties",
        penaltiesSubtitle: "Penalties that may be imposed on violating students",
        investigationTitle: "Investigation Procedures",
        investigationText: "A Student Accountability Committee is formed to review violations, consisting of representatives from administration, academic affairs, and students. The violating student has the right to object to committee decisions according to specified procedures.",
        definitions: [
            { term: "College", definition: "Al Buraimi University College" },
            { term: "Chairman", definition: "Chairman of the Board of Directors of Al Buraimi University College" },
            { term: "Council", definition: "College Council" },
            { term: "Dean of the College", definition: "Dean of Al Buraimi University College" },
            { term: "Assistant Dean", definition: "Assistant Dean for Academic Support Affairs" },
            { term: "Director", definition: "Director of Student Affairs Department at the College" },
            { term: "Student", definition: "Every male or female student registered at the college for study at any educational level" },
            { term: "Committee", definition: "Student Accountability Committee" },
            { term: "Violation", definition: "Any act, statement, or behavior that violates the regulations, laws, and instructions in force at the college" },
            { term: "Disciplinary Penalty", definition: "Any penalty stipulated in these regulations" },
            { term: "Examination", definition: "Any test or assessment conducted at the college according to the provisions specified by the college's study and examination regulations" },
        ],
        violations: [
            "Anything that disrespects or ridicules heavenly religions or incites sectarian, partisan, or tribal strife",
            "Practicing any political, religious, sectarian, partisan, or electoral activity without prior approval from college administration",
            "Any statement or act that infringes on religion, beliefs, honor, or dignity of others, or violates good conduct, or contradicts the moral character that a student should possess, or offends modesty, or harms the reputation of the state or its symbols",
            "Anything that harms the reputation of the college or its employees or affiliates",
            "Disrupting studies or inciting disruption, or refusing to attend lectures or other academic activities required by regulations and laws",
            "Violating order, discipline, and proper conduct of studies at the college or its facilities, or rules during lectures, exams, seminars, or activities",
            "Cheating in exams by any means, attempting to cheat, helping others cheat, or obtaining exam questions illegally before they are held",
            "Cheating in research, reports, practical and field training, graduation projects, and thesis papers",
            "Impersonation in any matters related to the college and its affairs, or giving college documents to others for illegal use",
            "Forgery of documents, certificates, or papers, or using forged documents",
            "Threatening, insulting, or assaulting any faculty member or college affiliate verbally or physically",
            "Accessing without right confidential information about any college affiliate, publishing it, or guiding others on how to obtain it",
            "Organizing or participating in any activities or events inside the college, or issuing publications or posters without prior approval from college administration",
            "Violating Islamic and social principles of the Sultanate or harming national unity by word or deed",
            "Misuse, destruction, or vandalism of college facilities or property, or modifying or moving them without college administration approval",
            "Bringing firearms (even licensed), weapons, or possessing flammable or explosive materials",
            "Using modern technology for purposes that violate morals and ethics to harm the college or its affiliates",
            "Possessing devices, films, images, tapes, newspapers, or magazines containing immoral content",
            "Not complying with public taste in dress or appearance that does not match Islamic and social values",
            "Violating housing rules at college residences, being late for designated times, or staying outside residences without valid excuse",
            "Providing false information, refusing to submit required documents, or not following security staff instructions",
            "Violating investigation procedures or exceeding the bounds of required ethics and manners in committee meetings",
            "Any other violation that the college deems a breach of regulations, instructions, or decisions not covered by these regulations",
        ],
        penalties: [
            "Verbal or written warning and signing a written pledge by the violator",
            "Verbal warning or first or final written warning",
            "Temporary deprivation from benefiting from services provided by college facilities",
            "Requiring the violator to pay for damaged college or others' property",
            "Cancellation or suspension of scholarships or discounts granted by the college",
            "Canceling student registration in one or more courses and obtaining a final grade (F) with requiring the student to pay tuition fees",
            "Canceling the exam in one or more courses and obtaining a final grade (F) with requiring the student to pay tuition fees",
            "Temporary suspension for no more than two academic semesters, without counting courses studied by the student at another college or university during the suspension period",
            "Not granting graduation documents or academic certificates or non-academic documents, or not approving them, or withholding them due to disciplinary violation",
            "Final expulsion from the college, without allowing re-registration",
        ],
    },
};

export default function ConductRegulationsPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[300px] sm:h-[350px] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-[#254151]/70"></div>

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
                    <StudentsSidebar activeId="conduct-regulations" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#254151]">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#254151] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Gavel className="size-5 sm:size-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl text-[#254151] font-bold">{content.title}</h2>
                                    <p className="text-gray-600 text-sm sm:text-base mt-1">{content.subtitle}</p>
                                </div>
                            </div>

                            {/* Introduction */}
                            <section className="mb-10">
                                <p className={`text-gray-700 leading-loose text-sm sm:text-base ${isAr ? "" : "text-left"}`}>
                                    {content.introText}
                                </p>
                            </section>

                            {/* Definitions */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-6 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <BookOpen className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.definitionsTitle}
                                </h3>

                                <div className="bg-[#6096b4]/5 rounded-xl p-4 sm:p-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {content.definitions.map((def, index) => (
                                            <div
                                                key={index}
                                                className={`bg-white rounded-lg p-4 shadow-sm ${isAr ? "" : "text-left"}`}
                                            >
                                                <h4 className="font-bold text-[#254151] mb-1 text-sm sm:text-base">{def.term}</h4>
                                                <p className="text-gray-600 text-xs sm:text-sm">{def.definition}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Violations */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-2 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <AlertTriangle className="size-5 sm:size-6 text-[#c2a772]" />
                                    {content.violationsTitle}
                                </h3>
                                <p className={`text-gray-600 mb-6 text-sm sm:text-base ${isAr ? "" : "text-left"}`}>
                                    {content.violationsSubtitle}
                                </p>

                                <div className="bg-[#c2a772]/5 rounded-xl p-4 sm:p-6">
                                    <ul className="space-y-3">
                                        {content.violations.map((violation, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}
                                            >
                                                <span className="text-[#c2a772] text-lg flex-shrink-0">•</span>
                                                <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{violation}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Penalties */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-2 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Shield className="size-5 sm:size-6 text-[#254151]" />
                                    {content.penaltiesTitle}
                                </h3>
                                <p className={`text-gray-600 mb-6 text-sm sm:text-base ${isAr ? "" : "text-left"}`}>
                                    {content.penaltiesSubtitle}
                                </p>

                                <div className="bg-[#254151]/5 rounded-xl p-4 sm:p-6">
                                    <ol className={`space-y-3 ${isAr ? "" : "text-left"}`}>
                                        {content.penalties.map((penalty, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse"}`}
                                            >
                                                <span className="bg-[#254151] text-white text-xs sm:text-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{penalty}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </section>

                            {/* Investigation Procedures */}
                            <section className="mb-10">
                                <h3 className={`text-xl sm:text-2xl text-[#254151] mb-4 flex items-center gap-2 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                                    <FileText className="size-5 sm:size-6 text-[#6096b4]" />
                                    {content.investigationTitle}
                                </h3>

                                <div className="bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 rounded-xl p-4 sm:p-6">
                                    <p className={`text-gray-700 leading-relaxed text-sm sm:text-base ${isAr ? "" : "text-left"}`}>
                                        {content.investigationText}
                                    </p>
                                </div>
                            </section>

                            {/* Note */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-4 sm:p-6 text-white">
                                <div className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                                    <Users className="size-5 sm:size-6 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-lg sm:text-xl mb-2 font-semibold">
                                            {isAr ? "ملاحظة هامة" : "Important Note"}
                                        </h4>
                                        <p className="leading-relaxed text-sm sm:text-base">
                                            {isAr
                                                ? "تخضع هذه اللائحة للتعديل والتحديث بما يتناسب مع متطلبات الكلية والأنظمة المعمول بها. يجب على جميع الطلبة الاطلاع عليها بشكل دوري."
                                                : "These regulations are subject to amendment and updating according to college requirements and applicable systems. All students must review them periodically."}
                                        </p>
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
