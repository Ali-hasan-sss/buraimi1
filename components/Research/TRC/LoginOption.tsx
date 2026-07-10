"use client";

import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle,
    ExternalLink,
    Key,
    Lock,
    LogIn,
    Search,
    Shield,
    UserPlus,
    XCircle
} from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

type LocaleKey = "ar" | "en";

type ExternalFeature = {
    icon: typeof XCircle;
    text: string;
    isNegative?: boolean;
    isPositive?: boolean;
    isWarning?: boolean;
};

export default function LoginOptionTRC() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "تسجيل الدخول",
            "subtitle": "اختر طريقة الدخول المناسبة لك",
            "external": {
                "title": "تسجيل دخول للمستخدم الخارجي",
                "subtitle": "External User Login",
                "features": [
                    { "icon": XCircle, "text": "غير مخصص للباحثين", "isNegative": true },
                    { "icon": XCircle, "text": "غير مخصص لأعضاء المؤسسات البحثية المرتبطة", "isNegative": true },
                    { "icon": CheckCircle, "text": "مخصص للمراجعين من مؤسسات بحثية غير مرتبطة", "isPositive": true },
                    {
                        "icon": AlertCircle,
                        "text": "يجب تقديم طلب التسجيل أولاً وانتظار الموافقة قبل منح الوصول",
                        "isWarning": true
                    }
                ],
                "registrationStepsTitle": "خطوات التسجيل:",
                "steps": [
                    "تقديم طلب التسجيل كمستخدم خارجي",
                    "انتظار الموافقة من إدارة النظام",
                    "استلام بيانات الدخول بعد الموافقة"
                ],
                "registerButton": "طلب التسجيل كمستخدم خارجي",
                "loginButton": "تسجيل الدخول (للمستخدمين المسجلين)"
            },
            "institutional": {
                "title": "تسجيل دخول بالحساب المؤسسي",
                "subtitle": "Institutional Login via Identity Provider",
                "features": [
                    { "icon": CheckCircle, "text": "مخصص لأعضاء الجامعات والمؤسسات البحثية المرتبطة بالنظام" },
                    { "icon": CheckCircle, "text": "لا حاجة لإنشاء حساب جديد او التسجيل" },
                    { "icon": CheckCircle, "text": "يمكن الدخول مباشرة باستخدام بيانات مؤسستك" }
                ],
                "selectInstitutionTitle": "اختر اسم المؤسسة المنتسب إليها:",
                "selectPlaceholder": "-- اختر المؤسسة --",
                "selectedPrefix": "تم اختيار:",
                "loginInfoTitle": "معلومات تسجيل الدخول:",
                "loginInfo": [
                    "استخدم بيانات تسجيل الدخول الخاصة بمؤسستك",
                    "سيتم توجيهك لصفحة تسجيل الدخول الخاصة بمؤسستك",
                    "لا حاجة لإنشاء حساب جديد في النظام"
                ],
                "loginButton": "تسجيل الدخول عبر الحساب المؤسسي",
                "selectFirstAlert": "الرجاء اختيار المؤسسة أولاً"
            },
            "institutions": [
                "كلية البريمي الجامعية - Al Buraimi University College",
                "جامعة السلطان قابوس - Sultan Qaboos University",
                "جامعة التقنية والعلوم التطبيقية - University of Technology and Applied Sciences",
                "جامعة نزوى - University of Nizwa",
                "جامعة صحار - Sohar University",
                "جامعة ظفار - Dhofar University",
                "الكلية الحديثة للتجارة والعلوم - Modern College of Business and Science",
                "جامعة صور - Sur University College",
                "الجامعة الألمانية للتكنولوجيا - German University of Technology"
            ]
        },
        "en": {
            "title": "Login",
            "subtitle": "Choose the login method that suits you",
            "external": {
                "title": "External User Login",
                "subtitle": "تسجيل دخول للمستخدم الخارجي",
                "features": [
                    { "icon": XCircle, "text": "Not intended for researchers", "isNegative": true },
                    { "icon": XCircle, "text": "Not intended for members of connected research institutions", "isNegative": true },
                    { "icon": CheckCircle, "text": "For reviewers from non-connected research institutions", "isPositive": true },
                    {
                        "icon": AlertCircle,
                        "text": "You must submit a registration request and wait for approval before access is granted",
                        "isWarning": true
                    }
                ],
                "registrationStepsTitle": "Registration steps:",
                "steps": [
                    "Submit an external user registration request",
                    "Wait for system administration approval",
                    "Receive login credentials after approval"
                ],
                "registerButton": "Request External Registration",
                "loginButton": "Login (registered users)"
            },
            "institutional": {
                "title": "Institutional Login",
                "subtitle": "تسجيل دخول بالحساب المؤسسي",
                "features": [
                    { "icon": CheckCircle, "text": "For members of institutions connected to the system" },
                    { "icon": CheckCircle, "text": "No new registration required" },
                    { "icon": CheckCircle, "text": "Login using your institution credentials" }
                ],
                "selectInstitutionTitle": "Select your institution:",
                "selectPlaceholder": "-- Select institution --",
                "selectedPrefix": "Selected:",
                "loginInfoTitle": "Login information:",
                "loginInfo": [
                    "Use your institution login credentials",
                    "You will be redirected to your institution login page",
                    "No need to create a new account in the system"
                ],
                "loginButton": "Login via Institutional Account",
                "selectFirstAlert": "Please select an institution first"
            },
            "institutions": [
                "Al Buraimi University College",
                "Sultan Qaboos University",
                "University of Technology and Applied Sciences",
                "University of Nizwa",
                "Sohar University",
                "Dhofar University",
                "Modern College of Business and Science",
                "Sur University College",
                "German University of Technology"
            ]
        }
    } as const;

    const content = t[locale] ?? t["en"];

    const [selectedInstitution, setSelectedInstitution] = useState("");

    const institutions = content.institutions;
    const externalUserFeatures = content.external.features as unknown as ExternalFeature[];
    const institutionalUserFeatures = content.institutional.features as unknown as { icon: typeof CheckCircle; text: string }[];

    return (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-10 sm:py-16">
            <div className="container mx-auto max-w-7xl px-3 sm:px-4">
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-2 text-3xl font-bold text-[#254151] sm:mb-4 sm:text-5xl">{content.title}</h2>
                    <p className="text-sm text-gray-600 sm:text-xl">{content.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* External User Login */}
                    <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-amber-200">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-5 text-white sm:p-8">
                            <div className="mb-4 flex items-center gap-3 sm:gap-4">
                                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm sm:p-4">
                                    <UserPlus className="size-7 sm:size-10" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold sm:text-3xl">{content.external.title}</h3>
                                    <p className="mt-1 text-sm opacity-90 sm:text-lg">{content.external.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-8">
                            <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                                {externalUserFeatures.map((feature, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 rounded-lg border-2 p-3 sm:p-4 ${feature.isPositive
                                            ? "bg-green-50 border-green-200"
                                            : feature.isNegative
                                                ? "bg-red-50 border-red-200"
                                                : "bg-amber-50 border-amber-200"
                                            }`}
                                    >
                                        <feature.icon
                                            className={`mt-0.5 size-5 flex-shrink-0 sm:size-6 ${feature.isPositive
                                                ? "text-green-600"
                                                : feature.isNegative
                                                    ? "text-red-600"
                                                    : "text-amber-600"
                                                }`}
                                        />
                                        <p
                                            className={`text-sm leading-relaxed sm:text-lg ${feature.isPositive
                                                ? "text-green-800"
                                                : feature.isNegative
                                                    ? "text-red-800"
                                                    : "text-amber-800"
                                                }`}
                                        >
                                            {feature.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Registration Steps */}
                            <div className="mb-6 rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-amber-800 sm:text-xl">
                                    <AlertCircle className="size-5 sm:size-6" />
                                    {content.external.registrationStepsTitle}
                                </h4>
                                <ol className="space-y-3 text-gray-700">
                                    {content.external.steps.map((step, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white sm:size-8">
                                                {idx + 1}
                                            </span>
                                            <span className="pt-1 text-sm sm:text-lg">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 sm:space-y-4">
                                <a
                                    href="https://trc.gov.om"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 text-base font-bold text-white transition-all hover:shadow-2xl sm:px-8 sm:py-5 sm:text-xl"
                                >
                                    <UserPlus className="size-6 sm:size-7" />
                                    <span>{content.external.registerButton}</span>
                                    <ExternalLink className="size-5 sm:size-6" />
                                </a>

                                <a
                                    href="https://trc.gov.om"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-amber-600 bg-white px-6 py-3 text-sm font-bold text-amber-700 transition-all hover:bg-amber-50 sm:px-8 sm:py-4 sm:text-lg"
                                >
                                    <LogIn className="size-5 sm:size-6" />
                                    <span>{content.external.loginButton}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Institutional User Login */}
                    <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-blue-200">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-5 text-white sm:p-8">
                            <div className="mb-4 flex items-center gap-3 sm:gap-4">
                                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm sm:p-4">
                                    <Building2 className="size-7 sm:size-10" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold sm:text-3xl">{content.institutional.title}</h3>
                                    <p className="mt-1 text-sm opacity-90 sm:text-lg">{content.institutional.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-8">
                            <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                                {institutionalUserFeatures.map((feature, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded-lg border-2 border-green-200 bg-green-50 p-3 sm:p-4"
                                    >
                                        <feature.icon className="mt-0.5 size-5 flex-shrink-0 text-green-600 sm:size-6" />
                                        <p className="text-sm leading-relaxed text-green-800 sm:text-lg">{feature.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Institution Selection */}
                            <div className="mb-6 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-[#254151] sm:text-xl">
                                    <Building2 className="size-5 sm:size-6" />
                                    {content.institutional.selectInstitutionTitle}
                                </h4>

                                <div className="relative">
                                    <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={selectedInstitution}
                                        onChange={(e) => setSelectedInstitution(e.target.value)}
                                        className="w-full appearance-none cursor-pointer rounded-lg border-2 border-blue-300 bg-white py-3 pl-4 pr-12 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-4 sm:pl-6 sm:text-lg"
                                    >
                                        <option value="">{content.institutional.selectPlaceholder}</option>
                                        {institutions.map((institution, index: number) => (
                                            <option key={index} value={institution}>
                                                {institution}
                                            </option>
                                        ))}
                                    </select>
                                    <ArrowRight className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                                </div>

                                {selectedInstitution && (
                                    <div className="mt-4 rounded-lg border-2 border-green-200 bg-white p-3 sm:p-4">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="size-5 text-green-600 sm:size-6" />
                                            <p className="text-sm font-semibold text-green-700 sm:text-lg">
                                                {content.institutional.selectedPrefix} {selectedInstitution}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Login Instructions */}
                            <div className="mb-6 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6">
                                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-blue-800 sm:text-xl">
                                    <Key className="size-5 sm:size-6" />
                                    {content.institutional.loginInfoTitle}
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <Shield className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                                        <span className="text-sm sm:text-lg">{content.institutional.loginInfo[0]}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Lock className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                                        <span className="text-sm sm:text-lg">{content.institutional.loginInfo[1]}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                                        <span className="text-sm sm:text-lg">{content.institutional.loginInfo[2]}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Action Button */}
                            <a
                                href="https://trc.gov.om"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 text-base font-bold transition-all sm:px-8 sm:py-5 sm:text-xl ${selectedInstitution
                                    ? "bg-gradient-to-r from-[#254151] to-[#6096b4] text-white hover:shadow-2xl"
                                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                                    }`}
                                onClick={(e) => {
                                    if (!selectedInstitution) {
                                        e.preventDefault();
                                        alert(content.institutional.selectFirstAlert);
                                    }
                                }}
                            >
                                <LogIn className="size-6 sm:size-7" />
                                <span>{content.institutional.loginButton}</span>
                                <ExternalLink className="size-5 sm:size-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}