"use client";

import { FileText, Scale, BookOpen, AlertCircle, CheckCircle, Download } from "lucide-react";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { StudentsSidebar } from "@/components/student/clinic/StudentsSidebar";

// All text content extracted into localization object with icons and colors
const contentByLocale = {
    ar: {
        title: "السياسات والإجراءات",
        subtitle: "دليل شامل للسياسات والإجراءات الأكاديمية والإدارية لطلبة كلية البريمي الجامعية",
        policies: [
            {
                title: "السياسة الأكاديمية",
                description: "القواعد والإجراءات المتعلقة بالشؤون الأكاديمية والتعليمية",
                icon: BookOpen,
                color: "#254151",
                items: [
                    "سياسة القبول والتسجيل",
                    "سياسة الحضور والغياب",
                    "سياسة الامتحانات والتقييم",
                    "سياسة الانسحاب من المقررات",
                    "سياسة النقل والتحويل",
                ],
            },
            {
                title: "السياسة الإدارية",
                description: "الإجراءات الإدارية والتنظيمية للطلبة",
                icon: FileText,
                color: "#6096b4",
                items: [
                    "إجراءات التسجيل",
                    "إجراءات الرسوم الدراسية",
                    "إجراءات استخراج الوثائق",
                    "إجراءات المنح والخصومات",
                    "إجراءات التخرج",
                ],
            },
            {
                title: "سياسة السلوك الطلابي",
                description: "قواعد السلوك والانضباط داخل الحرم الجامعي",
                icon: Scale,
                color: "#c2a772",
                items: [
                    "قواعد السلوك العامة",
                    "الإجراءات التأديبية",
                    "حقوق وواجبات الطلبة",
                    "آلية تقديم الشكاوى",
                    "سياسة الاستئناف",
                ],
            },
        ],
        importantPoliciesTitle: "سياسات مهمة",
        importantPolicies: [
            {
                title: "سياسة الأمانة الأكاديمية",
                description: "سياسة مكافحة الغش والانتحال الأكاديمي",
                icon: AlertCircle,
                color: "#c2a772",
            },
            {
                title: "سياسة حماية البيانات",
                description: "حماية خصوصية وبيانات الطلبة",
                icon: CheckCircle,
                color: "#6096b4",
            },
        ],
        guidelinesTitle: "إرشادات مهمة",
        newStudentsTitle: "للطلبة الجدد",
        newStudentsText: "يُنصح جميع الطلبة الجدد بقراءة دليل الطالب بعناية والتعرف على جميع السياسات والإجراءات المتبعة في الكلية.",
        continuingStudentsTitle: "للطلبة المستمرين",
        continuingStudentsText: "يجب على الطلبة المستمرين متابعة التحديثات والتعديلات على السياسات والإجراءات من خلال البوابة الإلكترونية.",
        downloadSectionTitle: "تحميل دليل السياسات والإجراءات",
        downloadSectionText: "يمكنك تحميل النسخة الكاملة من دليل السياسات والإجراءات بصيغة PDF",
        downloadButton: "تحميل الدليل الكامل (PDF)",
        viewDetailsButton: "عرض التفاصيل",
    },
    en: {
        title: "Policies and Procedures",
        subtitle: "A comprehensive guide to academic and administrative policies and procedures for students of Al Buraimi University College",
        policies: [
            {
                title: "Academic Policy",
                description: "Rules and procedures related to academic and educational affairs",
                icon: BookOpen,
                color: "#254151",
                items: [
                    "Admission and Registration Policy",
                    "Attendance and Absence Policy",
                    "Examinations and Assessment Policy",
                    "Course Withdrawal Policy",
                    "Transfer and Conversion Policy",
                ],
            },
            {
                title: "Administrative Policy",
                description: "Administrative and organizational procedures for students",
                icon: FileText,
                color: "#6096b4",
                items: [
                    "Registration Procedures",
                    "Tuition Fee Procedures",
                    "Document Extraction Procedures",
                    "Scholarship and Discount Procedures",
                    "Graduation Procedures",
                ],
            },
            {
                title: "Student Conduct Policy",
                description: "Rules of conduct and discipline within the campus",
                icon: Scale,
                color: "#c2a772",
                items: [
                    "General Conduct Rules",
                    "Disciplinary Procedures",
                    "Student Rights and Responsibilities",
                    "Complaint Submission Mechanism",
                    "Appeal Policy",
                ],
            },
        ],
        importantPoliciesTitle: "Important Policies",
        importantPolicies: [
            {
                title: "Academic Integrity Policy",
                description: "Policy against cheating and academic plagiarism",
                icon: AlertCircle,
                color: "#c2a772",
            },
            {
                title: "Data Protection Policy",
                description: "Protection of student privacy and data",
                icon: CheckCircle,
                color: "#6096b4",
            },
        ],
        guidelinesTitle: "Important Guidelines",
        newStudentsTitle: "For New Students",
        newStudentsText: "All new students are advised to read the student guide carefully and familiarize themselves with all policies and procedures in place at the college.",
        continuingStudentsTitle: "For Continuing Students",
        continuingStudentsText: "Continuing students must follow updates and amendments to policies and procedures through the electronic portal.",
        downloadSectionTitle: "Download Policies and Procedures Guide",
        downloadSectionText: "You can download the complete version of the Policies and Procedures Guide in PDF format",
        downloadButton: "Download Full Guide (PDF)",
        viewDetailsButton: "View Details",
    },
};

export default function PoliciesPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const dir = isAr ? "rtl" : "ltr";

    const content = useMemo(() => contentByLocale[isAr ? "ar" : "en"], [isAr]);

    return (
        <div dir={dir} className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row">

                <div className={`flex-1 `}>
                    {/* Page Header */}
                    <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-12 sm:py-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className={`flex items-center gap-4 mb-4 ${isAr ? "" : "flex-row-reverse"}`}>
                                <FileText className="size-8 sm:size-10 text-[#c2a772]" />
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                                    {content.title}
                                </h1>
                            </div>
                            <p className={`text-white/90 text-base sm:text-lg max-w-3xl ${isAr ? "" : "text-right"}`}>
                                {content.subtitle}
                            </p>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-5 px-3">

                        <StudentsSidebar activeId="policies" />

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:col-span-9">
                            {/* Main Policies */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12">
                                {content.policies.map((policy, index) => {
                                    const Icon = policy.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#6096b4]"
                                        >
                                            <div
                                                className="p-4 sm:p-6"
                                                style={{ backgroundColor: `${policy.color}15` }}
                                            >
                                                <div
                                                    className="inline-flex items-center justify-center size-12 sm:size-16 rounded-xl mb-4"
                                                    style={{ backgroundColor: policy.color }}
                                                >
                                                    <Icon className="size-6 sm:size-8 text-white" />
                                                </div>

                                                <h3 className="text-xl sm:text-2xl font-bold text-[#254151] mb-3">
                                                    {policy.title}
                                                </h3>

                                                <p className={`text-gray-600 mb-6 text-sm sm:text-base ${isAr ? "" : "text-right"}`}>
                                                    {policy.description}
                                                </p>

                                                <ul className="space-y-2 sm:space-y-3">
                                                    {policy.items.map((item, idx) => (
                                                        <li key={idx} className={`flex items-start gap-3 ${isAr ? "" : "flex-row-reverse text-right"}`}>
                                                            <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
                                                <button className="w-full bg-gradient-to-l from-[#254151] to-[#6096b4] hover:from-[#6096b4] hover:to-[#254151] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base">
                                                    {content.viewDetailsButton}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Important Policies */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-10 sm:mb-12">
                                <h2 className={`text-2xl sm:text-3xl font-black text-[#254151] mb-6 sm:mb-8 flex items-center gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
                                    <AlertCircle className="size-6 sm:size-8 text-[#c2a772]" />
                                    {content.importantPoliciesTitle}
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    {content.importantPolicies.map((policy, index) => {
                                        const Icon = policy.icon;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-start gap-4 p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#6096b4] transition-all ${isAr ? "" : "flex-row-reverse text-right"}`}
                                            >
                                                <div
                                                    className="flex-shrink-0 size-10 sm:size-12 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: policy.color }}
                                                >
                                                    <Icon className="size-5 sm:size-6 text-white" />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-[#254151] mb-2">
                                                        {policy.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm sm:text-base">
                                                        {policy.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Guidelines */}
                            <div className="bg-gradient-to-l from-[#254151]/5 to-[#6096b4]/5 rounded-2xl p-6 sm:p-8 mb-10 sm:mb-12">
                                <h2 className={`text-2xl sm:text-3xl font-black text-[#254151] mb-6 ${isAr ? "" : "text-right"}`}>
                                    {content.guidelinesTitle}
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
                                        <h3 className={`text-lg sm:text-xl font-bold text-[#6096b4] mb-4 ${isAr ? "" : "text-right"}`}>
                                            {content.newStudentsTitle}
                                        </h3>
                                        <p className={`text-gray-700 leading-relaxed text-sm sm:text-base ${isAr ? "" : "text-right"}`}>
                                            {content.newStudentsText}
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
                                        <h3 className={`text-lg sm:text-xl font-bold text-[#6096b4] mb-4 ${isAr ? "" : "text-right"}`}>
                                            {content.continuingStudentsTitle}
                                        </h3>
                                        <p className={`text-gray-700 leading-relaxed text-sm sm:text-base ${isAr ? "" : "text-right"}`}>
                                            {content.continuingStudentsText}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Download Section */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-2xl p-6 sm:p-8 text-center">
                                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                                    {content.downloadSectionTitle}
                                </h2>
                                <p className="text-white/90 mb-6 text-base sm:text-lg">
                                    {content.downloadSectionText}
                                </p>
                                <button className={`inline-flex items-center gap-2 bg-[#c2a772] hover:bg-[#d4bd90] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl ${isAr ? "" : "flex-row-reverse"}`}>
                                    <Download className="size-5 sm:size-6" />
                                    {content.downloadButton}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
