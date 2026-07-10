"use client";

import type React from 'react';
import { useLocale } from 'next-intl';
import {
    AlertTriangle,
    Bell,
    BookMarked,
    BookOpen,
    Building2,
    CheckCircle,
    DollarSign,
    ExternalLink,
    FileText,
    Info,
    Laptop,
    Mail,
    Printer,
    RefreshCw,
    UserCheck,
    Users,
} from 'lucide-react';

export type ServiceId =
    | 'borrowing'
    | 'laptop'
    | 'interlibrary'
    | 'rooms'
    | 'printing'
    | 'recommend';

export type Accent = 'blue' | 'green' | 'purple' | 'amber' | 'red' | 'teal' | 'pink';

type IconType = React.ComponentType<{ className?: string }>;

export type Service = {
    id: ServiceId;
    title: string;
    titleEn: string;
    icon: IconType;
    color: Accent;
};

export type BorrowingRule = {
    category: string;
    categoryEn: string;
    books: string;
    duration: string;
    durationEn: string;
    fine: string;
    fineEn: string;
    icon: IconType;
    color: Accent;
};

export type Step = {
    step: string;
    title: string;
    description: string;
    icon: IconType;
};

export type StudyRoomsSection = {
    type: string;
    typeEn: string;
    rooms: string[];
    icon: IconType;
    color: 'blue' | 'pink';
};

const colorClasses: Record<Accent, { bg600: string; bg100: string; border200: string; border400: string; hoverBorder400: string; text600: string }> = {
    blue: { bg600: 'bg-blue-600', bg100: 'bg-blue-100', border200: 'border-blue-200', border400: 'border-blue-400', hoverBorder400: 'hover:border-blue-400', text600: 'text-blue-600' },
    green: { bg600: 'bg-green-600', bg100: 'bg-green-100', border200: 'border-green-200', border400: 'border-green-400', hoverBorder400: 'hover:border-green-400', text600: 'text-green-600' },
    purple: { bg600: 'bg-purple-600', bg100: 'bg-purple-100', border200: 'border-purple-200', border400: 'border-purple-400', hoverBorder400: 'hover:border-purple-400', text600: 'text-purple-600' },
    amber: { bg600: 'bg-amber-600', bg100: 'bg-amber-100', border200: 'border-amber-200', border400: 'border-amber-400', hoverBorder400: 'hover:border-amber-400', text600: 'text-amber-600' },
    red: { bg600: 'bg-red-600', bg100: 'bg-red-100', border200: 'border-red-200', border400: 'border-red-400', hoverBorder400: 'hover:border-red-400', text600: 'text-red-600' },
    teal: { bg600: 'bg-teal-600', bg100: 'bg-teal-100', border200: 'border-teal-200', border400: 'border-teal-400', hoverBorder400: 'hover:border-teal-400', text600: 'text-teal-600' },
    pink: { bg600: 'bg-pink-600', bg100: 'bg-pink-100', border200: 'border-pink-200', border400: 'border-pink-400', hoverBorder400: 'hover:border-pink-400', text600: 'text-pink-600' },
};

export default function ServicesMenu({
    services,
    activeService,
    setActiveService,
    borrowingRules,
    laptopSteps,
    printingSteps,
    studyRooms,
}: {
    services: Service[];
    activeService: ServiceId;
    setActiveService: (id: ServiceId) => void;
    borrowingRules: BorrowingRule[];
    laptopSteps: Step[];
    printingSteps: Step[];
    studyRooms: StudyRoomsSection[];
}) {
    const locale = useLocale();
    const isAr = locale === 'ar';

    const copy = {
        menuTitle: { ar: 'خدماتنا', en: 'Our Services' },
        menuSubtitle: { ar: 'اختر الخدمة لعرض التفاصيل', en: 'Select a service to view details' },
        borrowingTitle: { ar: 'خدمة استعارة المصادر الورقية', en: 'Book Borrowing Service' },
        borrowingSubtitle: { ar: 'Book Borrowing Service', en: 'خدمة استعارة المصادر الورقية' },
        borrowingNotice: { ar: 'الخدمة متاحة فقط لمنتسبي الكلية وفق الفئات التالية:', en: 'This service is available only for college members in the following categories:' },
        tableCategory: { ar: 'الفئة', en: 'Category' },
        tableBooks: { ar: 'عدد الكتب', en: 'Books' },
        tableDuration: { ar: 'مدة الإعارة', en: 'Loan Period' },
        tableFine: { ar: 'غرامة التأخير / يوم', en: 'Late Fine / Day' },
        lostTitle: { ar: 'فقد أو إتلاف الكتب', en: 'Lost or Damaged Books' },
        lostBody: { ar: 'يتم فرض غرامات على المستفيد في حالة فقدان أو تلف الكتب المعارة وكتب المكتبة.', en: 'Fines are applied in case of loss or damage of borrowed items and library books.' },
        renewTitle: { ar: 'تجديد الكتب', en: 'Renewals' },
        renewBody: { ar: 'يمكن تجديد الكتب (3) مرات بعد الإعارة الأولى من خلال حسابك الشخصي أو زيارة المكتبة.', en: 'Books can be renewed (3) times after the first loan via your account or by visiting the library.' },
        notifyTitle: { ar: 'إشعارات الإرجاع', en: 'Return Notifications' },
        notifyBody: { ar: 'يرسل النظام الإلكتروني إشعارات عبر البريد الإلكتروني لتذكيرك بإرجاع الكتب المستعارة.', en: 'The system sends email notifications to remind you to return borrowed books.' },
        accountTitle: { ar: 'حسابي في المكتبة', en: 'My Library Account' },
        accountLink: { ar: 'الدخول إلى حسابك الشخصي →', en: 'Go to your account →' },
        laptopTitle: { ar: 'خدمة الإعارة لأجهزة الحاسوب المحمول', en: 'Laptop Borrowing Service' },
        laptopSubtitle: { ar: 'Laptop Borrowing Service', en: 'خدمة الإعارة لأجهزة الحاسوب المحمول' },
        laptopNotice: { ar: 'هي خدمة متاحة فقط لمنتسبي الكلية', en: 'This service is available only for college members' },
        laptopStepsTitle: { ar: 'إجراءات الاستعارة:', en: 'Borrowing Procedure:' },
        lateFineTitle: { ar: 'غرامة التأخير', en: 'Late Fine' },
        lateFineBody: { ar: '1 ريال عماني عن كل يوم تأخير في الإرجاع', en: '1 OMR for each day of late return' },
        lateFineNote: { ar: '⚠️ يجب إرجاع الجهاز خلال يوم واحد فقط وضمن نطاق الحرم الجامعي', en: '⚠️ The device must be returned within one day and within the campus premises' },
        interTitle: { ar: 'خدمة الإعارة المتبادلة بين المكتبات', en: 'Interlibrary Lending Service' },
        interSubtitle: { ar: 'Interlibrary Lending Service', en: 'خدمة الإعارة المتبادلة بين المكتبات' },
        interNotice: { ar: 'هي خدمة متاحة للفئات التالية:', en: 'This service is available for the following categories:' },
        interApplyTitle: { ar: 'تقديم طلب الإعارة المتبادلة', en: 'Submit an Interlibrary Request' },
        interApplyBody: { ar: 'يمكنك تقديم طلبك عبر الاستمارة الإلكترونية', en: 'You can submit your request via the email form' },
        interApplyCta: { ar: 'تقديم طلب الإعارة', en: 'Submit Request' },
        roomsTitle: { ar: 'خدمة الغرف الدراسية الجماعية', en: 'Group Study Rooms Service' },
        roomsSubtitle: { ar: 'Group Study Rooms Service', en: 'خدمة الغرف الدراسية الجماعية' },
        roomsNotice: { ar: 'هي خدمة متاحة فقط لمنتسبي الكلية', en: 'This service is available only for college members' },
        roomsProceduresTitle: { ar: 'إجراءات الاستخدام:', en: 'Usage Procedures:' },
        roomsInfo: { ar: 'تحتوي المكتبة على 4 غرف دراسية جماعية - غرفتان للطلبة وغرفتان للطالبات', en: 'The library has 4 group study rooms — two for male students and two for female students' },
        printingTitle: { ar: 'خدمة الطباعة، النسخ، المسح الضوئي', en: 'Printing, Copying & Scanning Service' },
        printingSubtitle: { ar: 'Printing, Copying & Scanning Service', en: 'خدمة الطباعة، النسخ، المسح الضوئي' },
        printingNotice: { ar: 'هي خدمة متاحة فقط لمنتسبي الكلية - خدمة ذاتية عبر بطاقة إلكترونية', en: 'Available only for college members — self-service via an electronic card' },
        printingStepsTitle: { ar: 'إجراءات الاستخدام:', en: 'How to Use:' },
        devicesTitle: { ar: 'الأجهزة المتوفرة:', en: 'Available Devices:' },
        maleStudents: { ar: 'للطلاب', en: 'For Male Students' },
        femaleStudents: { ar: 'للطالبات', en: 'For Female Students' },
        devicesCountLabel: { ar: 'عدد الأجهزة', en: 'Number of Devices' },
        recommendTitle: { ar: 'أوصي بكتاب', en: 'Recommend a Book' },
        recommendSubtitle: { ar: 'Recommend a Book', en: 'أوصي بكتاب' },
        recommendNotice: { ar: 'يرجى مراجعة فهرس المكتبة تحت العنوان الدقيق قبل طلب شراء الكتب.', en: 'Please check the library catalog under the exact title before requesting a purchase.' },
        requiredInfoTitle: { ar: 'المعلومات المطلوبة:', en: 'Required Information:' },
        sendRecTitle: { ar: 'أرسل توصيتك', en: 'Send Your Recommendation' },
        sendRecBody: { ar: 'أرسل كتب التوصية الخاصة بك مع جميع التفاصيل المطلوبة', en: 'Send your recommended books with all the required details' },
    } as const;

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? copy.menuTitle.ar : copy.menuTitle.en}</h2>
                    <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">{isAr ? copy.menuSubtitle.ar : copy.menuSubtitle.en}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
                    {services.map((service) => {
                        const c = colorClasses[service.color];
                        const isActive = activeService === service.id;
                        const Icon = service.icon;
                        return (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setActiveService(service.id)}
                                className={`p-3 sm:p-4 lg:p-6 rounded-lg border-2 transition-all text-center ${isActive
                                    ? `${c.bg600} ${c.border400} text-white shadow-xl scale-105`
                                    : `bg-white ${c.border200} text-gray-700 ${c.hoverBorder400}`
                                    }`}
                            >
                                <Icon
                                    className={`mx-auto mb-2 sm:mb-3 size-7 sm:size-9 lg:size-12 ${isActive ? 'text-white' : c.text600
                                        }`}
                                />
                                <h3 className="font-bold text-xs sm:text-sm mb-1">{isAr ? service.title : service.titleEn}</h3>
                                <p className="text-[10px] sm:text-xs opacity-80">{isAr ? service.titleEn : service.title}</p>
                            </button>
                        );
                    })}
                </div>

                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-blue-200">
                    {activeService === 'borrowing' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-blue-100 text-blue-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <BookOpen className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.borrowingTitle.ar : copy.borrowingTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.borrowingSubtitle.ar : copy.borrowingSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border-2 border-blue-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    {isAr ? copy.borrowingNotice.ar : copy.borrowingNotice.en}
                                </p>
                            </div>

                            <div className="overflow-x-auto mb-6 sm:mb-8">
                                <table className="w-full min-w-[720px] border-2 border-gray-300">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold border-l-2 border-white text-sm sm:text-base">{isAr ? copy.tableCategory.ar : copy.tableCategory.en}</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold border-l-2 border-white text-sm sm:text-base">{isAr ? copy.tableBooks.ar : copy.tableBooks.en}</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold border-l-2 border-white text-sm sm:text-base">{isAr ? copy.tableDuration.ar : copy.tableDuration.en}</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold text-sm sm:text-base">{isAr ? copy.tableFine.ar : copy.tableFine.en}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowingRules.map((rule, index) => {
                                            const c = colorClasses[rule.color];
                                            const RuleIcon = rule.icon;
                                            return (
                                                <tr key={index} className="border-b-2 border-gray-200 hover:bg-blue-50 transition-colors">
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 border-l-2 border-gray-200">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`${c.bg100} p-2 rounded-lg`}>
                                                                <RuleIcon className={`size-5 sm:size-6 ${c.text600}`} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm sm:text-base">{isAr ? rule.category : rule.categoryEn}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">{isAr ? rule.categoryEn : rule.category}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 border-l-2 border-gray-200">
                                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{rule.books}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">{rule.books.replace('كتب', 'Books')}</p>
                                                    </td>
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4 border-l-2 border-gray-200">
                                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{rule.duration}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">{rule.durationEn}</p>
                                                    </td>
                                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{rule.fine}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">{rule.fineEn}</p>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 sm:p-6 border-2 border-amber-200">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <AlertTriangle className="size-6 sm:size-7 lg:size-8 text-amber-600" />
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-amber-800">{isAr ? copy.lostTitle.ar : copy.lostTitle.en}</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {isAr ? copy.lostBody.ar : copy.lostBody.en}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 sm:p-6 border-2 border-green-200">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <RefreshCw className="size-6 sm:size-7 lg:size-8 text-green-600" />
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-green-800">{isAr ? copy.renewTitle.ar : copy.renewTitle.en}</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {isAr ? copy.renewBody.ar : copy.renewBody.en}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 border-2 border-blue-200">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <Bell className="size-6 sm:size-7 lg:size-8 text-blue-600" />
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-blue-800">{isAr ? copy.notifyTitle.ar : copy.notifyTitle.en}</h4>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {isAr ? copy.notifyBody.ar : copy.notifyBody.en}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 sm:p-6 border-2 border-purple-200">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <UserCheck className="size-6 sm:size-7 lg:size-8 text-purple-600" />
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-purple-800">{isAr ? copy.accountTitle.ar : copy.accountTitle.en}</h4>
                                    </div>
                                    <a href="#my-account" className="text-purple-600 hover:underline font-semibold text-sm sm:text-base">
                                        {isAr ? copy.accountLink.ar : copy.accountLink.en}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeService === 'laptop' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-green-100 text-green-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <Laptop className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.laptopTitle.ar : copy.laptopTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.laptopSubtitle.ar : copy.laptopSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 sm:p-6 border-2 border-green-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{isAr ? copy.laptopNotice.ar : copy.laptopNotice.en}</p>
                            </div>

                            <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6">{isAr ? copy.laptopStepsTitle.ar : copy.laptopStepsTitle.en}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                {laptopSteps.map((step, index) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <div key={index} className="relative">
                                            {index < laptopSteps.length - 1 && (
                                                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-green-600 to-teal-600 z-0" />
                                            )}

                                            <div className="bg-gradient-to-br from-green-50 to-white rounded-lg shadow-xl p-5 sm:p-6 border-2 border-green-200 hover:shadow-2xl transition-all relative z-10">
                                                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center text-lg sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 mx-auto shadow-lg">
                                                    {step.step}
                                                </div>

                                                <div className="bg-green-100 text-green-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                                    <StepIcon className="size-6 sm:size-7 lg:size-8" />
                                                </div>

                                                <h5 className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-bold text-[#254151] mb-2 sm:mb-3 text-center">{step.title}</h5>
                                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-5 sm:p-6 border-2 border-red-200">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <DollarSign className="size-7 sm:size-8 lg:size-10 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-red-800 mb-2">{isAr ? copy.lateFineTitle.ar : copy.lateFineTitle.en}</h4>
                                        <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
                                            {isAr ? (
                                                <>
                                                    <span className="font-bold">1 ريال عماني</span> عن كل يوم تأخير في الإرجاع
                                                </>
                                            ) : (
                                                <>
                                                    <span className="font-bold">1 OMR</span> for each day of late return
                                                </>
                                            )}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-2">{isAr ? copy.lateFineNote.ar : copy.lateFineNote.en}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeService === 'interlibrary' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-purple-100 text-purple-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <RefreshCw className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.interTitle.ar : copy.interTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.interSubtitle.ar : copy.interSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border-2 border-purple-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">{isAr ? copy.interNotice.ar : copy.interNotice.en}</p>
                                <div className="space-y-3">
                                    {(isAr
                                        ? ['أعضاء هيئة التدريس', 'طلبة السنة الأخيرة', 'طلبة الدراسات العليا']
                                        : ['Faculty Members', 'Final Year Students', 'Graduate Students']
                                    ).map((label, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 border-2 border-purple-200">
                                            <CheckCircle className="size-5 sm:size-6 text-purple-600" />
                                            <span className="font-semibold text-gray-800 text-sm sm:text-base">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 sm:p-8 border-2 border-blue-200 text-center">
                                <FileText className="size-10 sm:size-12 lg:size-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
                                <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? copy.interApplyTitle.ar : copy.interApplyTitle.en}</h4>
                                <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{isAr ? copy.interApplyBody.ar : copy.interApplyBody.en}</p>
                                <a
                                    href="mailto:librarian_team@buc.edu.om?subject=Interlibrary Lending Request"
                                    className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg"
                                >
                                    <Mail className="size-5 sm:size-6" />
                                    <span>{isAr ? copy.interApplyCta.ar : copy.interApplyCta.en}</span>
                                    <ExternalLink className="size-4 sm:size-5" />
                                </a>
                            </div>
                        </div>
                    )}

                    {activeService === 'rooms' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-amber-100 text-amber-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <Users className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.roomsTitle.ar : copy.roomsTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.roomsSubtitle.ar : copy.roomsSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-4 sm:p-6 border-2 border-amber-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{isAr ? copy.roomsNotice.ar : copy.roomsNotice.en}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                                {studyRooms.map((section, index) => {
                                    const c = colorClasses[section.color];
                                    const SectionIcon = section.icon;
                                    return (
                                        <div key={index} className={`bg-gradient-to-br from-white to-white rounded-lg shadow-xl p-5 sm:p-6 lg:p-8 border-2 ${c.border200}`}>
                                            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                                <div className={`${c.bg100} ${c.text600} size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center`}>
                                                    <SectionIcon className="size-6 sm:size-7 lg:size-8" />
                                                </div>
                                                <div>
                                                    <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151]">{isAr ? section.type : section.typeEn}</h4>
                                                    <p className="text-gray-600 text-xs sm:text-sm">{isAr ? section.typeEn : section.type}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                {section.rooms.map((room, idx) => (
                                                    <div key={idx} className={`bg-white rounded-lg p-4 border-2 ${c.border200} flex items-center justify-between`}>
                                                        <span className="font-bold text-gray-800 text-sm sm:text-base">{room}</span>
                                                        <Building2 className={`size-5 sm:size-6 ${c.text600}`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 sm:p-6 lg:p-8 border-2 border-blue-200 mb-4 sm:mb-6">
                                <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6">{isAr ? copy.roomsProceduresTitle.ar : copy.roomsProceduresTitle.en}</h4>
                                <div className="space-y-4">
                                    {(isAr
                                        ? [
                                            'التوجه إلى أمين المكتبة في قسم الإعارة وطلب استخدام الغرفة',
                                            'التأكد من عدم وجود حجوزات مسبقة للغرفة',
                                            'يمكن الحجز عبر البريد الإلكتروني أو بالحضور لقسم الإعارة',
                                            'في حالة عدم حضور من حجز الغرفة خلال 10 دقائق، يتم إتاحتها لمستفيد آخر',
                                            'مدة الاستخدام: ساعتان كحد أقصى',
                                            'يمكن الحجز لمجموعة مكونة من 4 أشخاص فقط',
                                        ]
                                        : [
                                            'Go to the circulation librarian and request to use a room',
                                            'Make sure there are no prior bookings',
                                            'Booking can be made via email or in person at circulation',
                                            'If the group does not arrive within 10 minutes, the room may be reassigned',
                                            'Maximum usage duration: 2 hours',
                                            'Booking is available for groups of up to 4 people only',
                                        ]
                                    ).map((procedure, idx) => (
                                        <div key={idx} className="flex items-start gap-4 bg-white rounded-lg p-4 border-2 border-blue-200">
                                            <div className="bg-blue-600 text-white size-7 sm:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed pt-0.5 sm:pt-1 text-xs sm:text-sm lg:text-base">{procedure}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 sm:p-6 border-2 border-green-200">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <Info className="size-7 sm:size-8 lg:size-10 text-green-600" />
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                                        <span className="font-bold">{isAr ? copy.roomsInfo.ar : copy.roomsInfo.en}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeService === 'printing' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-red-100 text-red-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <Printer className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.printingTitle.ar : copy.printingTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.printingSubtitle.ar : copy.printingSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-red-50 rounded-lg p-4 sm:p-6 border-2 border-red-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    {isAr ? copy.printingNotice.ar : copy.printingNotice.en}
                                </p>
                            </div>

                            <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6">{isAr ? copy.printingStepsTitle.ar : copy.printingStepsTitle.en}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                {printingSteps.map((step, index) => {
                                    const StepIcon = step.icon;
                                    return (
                                        <div key={index} className="relative">
                                            {index < printingSteps.length - 1 && (
                                                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-red-600 to-orange-600 z-0" />
                                            )}

                                            <div className="bg-gradient-to-br from-red-50 to-white rounded-lg shadow-xl p-5 sm:p-6 border-2 border-red-200 hover:shadow-2xl transition-all relative z-10">
                                                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center text-lg sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 mx-auto shadow-lg">
                                                    {step.step}
                                                </div>

                                                <div className="bg-red-100 text-red-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                                                    <StepIcon className="size-6 sm:size-7 lg:size-8" />
                                                </div>

                                                <h5 className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-bold text-[#254151] mb-2 sm:mb-3 text-center">{step.title}</h5>
                                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 text-center leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-5 sm:p-6 lg:p-8 border-2 border-indigo-200">
                                <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-4 sm:mb-6">{isAr ? copy.devicesTitle.ar : copy.devicesTitle.en}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-blue-200">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-blue-100 text-blue-600 size-12 sm:size-14 rounded-full flex items-center justify-center">
                                                <Users className="size-6 sm:size-7" />
                                            </div>
                                            <div>
                                                <h5 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151]">{isAr ? copy.maleStudents.ar : copy.maleStudents.en}</h5>
                                                <p className="text-gray-600 text-xs sm:text-sm">{isAr ? copy.maleStudents.en : copy.maleStudents.ar}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
                                            <span className="font-semibold text-gray-800 text-sm sm:text-base">{isAr ? copy.devicesCountLabel.ar : copy.devicesCountLabel.en}</span>
                                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">1</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-pink-200">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-pink-100 text-pink-600 size-12 sm:size-14 rounded-full flex items-center justify-center">
                                                <Users className="size-6 sm:size-7" />
                                            </div>
                                            <div>
                                                <h5 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151]">{isAr ? copy.femaleStudents.ar : copy.femaleStudents.en}</h5>
                                                <p className="text-gray-600 text-xs sm:text-sm">{isAr ? copy.femaleStudents.en : copy.femaleStudents.ar}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-pink-50 rounded-lg p-4">
                                            <span className="font-semibold text-gray-800 text-sm sm:text-base">{isAr ? copy.devicesCountLabel.ar : copy.devicesCountLabel.en}</span>
                                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600">1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeService === 'recommend' && (
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <div className="bg-teal-100 text-teal-600 size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center">
                                    <BookMarked className="size-6 sm:size-7 lg:size-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{isAr ? copy.recommendTitle.ar : copy.recommendTitle.en}</h3>
                                    <p className="text-xs sm:text-sm lg:text-lg text-gray-600">{isAr ? copy.recommendSubtitle.ar : copy.recommendSubtitle.en}</p>
                                </div>
                            </div>

                            <div className="bg-teal-50 rounded-lg p-4 sm:p-6 border-2 border-teal-200 mb-6 sm:mb-8">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    {isAr ? copy.recommendNotice.ar : copy.recommendNotice.en}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-5 sm:p-6 lg:p-8 border-2 border-teal-200 mb-4 sm:mb-6">
                                <h4 className="text-base sm:text-lg lg:text-2xl font-bold text-[#254151] mb-3 sm:mb-4">{isAr ? copy.requiredInfoTitle.ar : copy.requiredInfoTitle.en}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    {(isAr
                                        ? [
                                            'العنوان (Title)',
                                            'المؤلف (Author)',
                                            'الناشر (Publisher)',
                                            'مكان النشر (Place of Publication)',
                                            'تاريخ النشر (Publication Date)',
                                            'ISBN',
                                        ]
                                        : [
                                            'Title (العنوان)',
                                            'Author (المؤلف)',
                                            'Publisher (الناشر)',
                                            'Place of Publication (مكان النشر)',
                                            'Publication Date (تاريخ النشر)',
                                            'ISBN',
                                        ]
                                    ).map((field, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 border-2 border-teal-200">
                                            <CheckCircle className="size-5 sm:size-6 text-teal-600" />
                                            <span className="font-semibold text-gray-800 text-sm sm:text-base">{field}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white rounded-lg p-5 sm:p-6 lg:p-8 text-center">
                                <Mail className="size-10 sm:size-12 lg:size-16 mx-auto mb-4 sm:mb-6" />
                                <h4 className="text-base sm:text-lg lg:text-2xl font-bold mb-3 sm:mb-4">{isAr ? copy.sendRecTitle.ar : copy.sendRecTitle.en}</h4>
                                <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 opacity-90">
                                    {isAr ? copy.sendRecBody.ar : copy.sendRecBody.en}
                                </p>

                                <a
                                    href="mailto:librarian_team@buc.edu.om?subject=Book Recommendation"
                                    className="inline-flex items-center gap-2 sm:gap-3 bg-white text-teal-600 px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-base lg:text-lg"
                                >
                                    <Mail className="size-5 sm:size-6" />
                                    <span>librarian_team@buc.edu.om</span>
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}