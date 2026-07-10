"use client"
import React, { useState } from 'react';
import {
    BookOpen,
    Laptop,
    Users,
    Printer,
    RefreshCw,
    Bell,
    AlertTriangle,
    DollarSign,
    Clock,
    CheckCircle,
    Mail,
    Phone,
    Facebook,
    ExternalLink,
    Download,
    Calendar,
    UserCheck,
    Shield,
    Copy,
    Scan,
    MessageSquare,
    BookMarked,
    Building2,
    MapPin,
    ChevronLeft,
    FileText,
    ArrowRight,
    Award,
    Target,
    GraduationCap,
    Briefcase,
    Info
} from 'lucide-react';
import Link from 'next/link';

import ServicesMenu, {
    type BorrowingRule,
    type Service,
    type ServiceId,
    type Step,
    type StudyRoomsSection,
} from '@/components/Library/services/Menu';

export default function LibraryServicesPage() {
    const [activeService, setActiveService] = useState<ServiceId>('borrowing');

    const borrowingRules = [
        {
            category: 'أعضاء هيئة التدريس',
            categoryEn: 'Faculty Members',
            books: '6 كتب',
            duration: 'فصل دراسي واحد',
            durationEn: '1 Semester',
            fine: '200 بيسة',
            fineEn: '200 Baizas',
            icon: GraduationCap,
            color: 'blue'
        },
        {
            category: 'الموظفين الإداريين',
            categoryEn: 'Administrative Staff',
            books: '3 كتب',
            duration: '14 يوم',
            durationEn: '14 Days',
            fine: '200 بيسة',
            fineEn: '200 Baizas',
            icon: Briefcase,
            color: 'green'
        },
        {
            category: 'طلبة الدراسات العليا',
            categoryEn: 'Graduate Students',
            books: '5 كتب',
            duration: '14 يوم',
            durationEn: '14 Days',
            fine: '100 بيسة',
            fineEn: '100 Baizas',
            icon: Award,
            color: 'purple'
        },
        {
            category: 'طلبة المرحلة الجامعية الأولى',
            categoryEn: 'Undergraduate Students',
            books: '3 كتب',
            duration: '14 يوم',
            durationEn: '14 Days',
            fine: '100 بيسة',
            fineEn: '100 Baizas',
            icon: Users,
            color: 'amber'
        }
    ] satisfies BorrowingRule[];

    const studyRooms = [
        { type: 'للطلبة', typeEn: 'For Male Students', rooms: ['غرفة 1', 'غرفة 2'], icon: Users, color: 'blue' },
        { type: 'للطالبات', typeEn: 'For Female Students', rooms: ['غرفة 3', 'غرفة 4'], icon: Users, color: 'pink' }
    ] satisfies StudyRoomsSection[];

    const services = [
        {
            id: 'borrowing',
            title: 'استعارة المصادر الورقية',
            titleEn: 'Book Borrowing Service',
            icon: BookOpen,
            color: 'blue'
        },
        {
            id: 'laptop',
            title: 'استعارة أجهزة الحاسوب',
            titleEn: 'Laptop Borrowing',
            icon: Laptop,
            color: 'green'
        },
        {
            id: 'interlibrary',
            title: 'الإعارة المتبادلة',
            titleEn: 'Interlibrary Lending',
            icon: RefreshCw,
            color: 'purple'
        },
        {
            id: 'rooms',
            title: 'الغرف الدراسية الجماعية',
            titleEn: 'Group Study Rooms',
            icon: Users,
            color: 'amber'
        },
        {
            id: 'printing',
            title: 'الطباعة والنسخ',
            titleEn: 'Printing & Copying',
            icon: Printer,
            color: 'red'
        },
        {
            id: 'recommend',
            title: 'أوصي بكتاب',
            titleEn: 'Recommend a Book',
            icon: BookMarked,
            color: 'teal'
        }
    ] satisfies Service[];

    const laptopSteps = [
        {
            step: '1',
            title: 'التوجه لقسم الإعارة',
            description: 'إبراز البطاقة الجامعية لأمين المكتبة',
            icon: UserCheck
        },
        {
            step: '2',
            title: 'تعبئة الاستمارة',
            description: 'قراءة سياسات الاستعارة قبل الاستلام',
            icon: FileText
        },
        {
            step: '3',
            title: 'استلام الجهاز',
            description: 'مدة الاستعارة يوم واحد داخل الحرم الجامعي',
            icon: Laptop
        },
        {
            step: '4',
            title: 'إرجاع الجهاز',
            description: 'التوقيع على التسليم والتأكد من سلامة الجهاز',
            icon: CheckCircle
        }
    ] satisfies Step[];

    const printingSteps = [
        {
            step: '1',
            title: 'التوجه لأمين المكتبة',
            description: 'طلب استمارة خدمة الطباعة والنسخ',
            icon: MessageSquare
        },
        {
            step: '2',
            title: 'الدفع المالي',
            description: 'التوجه لقسم الشؤون المالية لدفع المبلغ',
            icon: DollarSign
        },
        {
            step: '3',
            title: 'استلام البطاقة',
            description: 'الرجوع لأمين المكتبة واستلام بطاقة الخدمة',
            icon: Award
        },
        {
            step: '4',
            title: 'استخدام الخدمة',
            description: 'الطباعة والنسخ والمسح الضوئي ذاتياً',
            icon: Printer
        }
    ] satisfies Step[];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-14 sm:py-16 lg:py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full">
                                <BookOpen className="size-8 sm:size-16 lg:size-20" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">خدمات المكتبة</h1>
                        <h2 className="text-base sm:text-xl lg:text-3xl font-bold mb-4 sm:mb-6 opacity-90">Library Services</h2>
                        <p className="text-sm sm:text-lg lg:text-2xl opacity-95 leading-relaxed">
                            مكتبة كلية البريمي الجامعية - منذ 2003
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="bg-[#254151] text-white size-14 sm:size-20 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                                <BookOpen className="size-7 sm:size-10" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">عن المكتبة</h2>
                                <p className="text-sm sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                                    منذ تأسيسها عام 2003، تم ربط مكتبة كلية البريمي الجامعية وتطويرها في مجالات التعليم العالي والبحث العلمي. نمت لتحقق التطور في مجالات المعرفة العامة وتقنية المعلومات وإدارة الأعمال واللغة الإنجليزية والقانون، وتقدم المكتبة خدمات متنوعة للمستخدمين.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Menu */}
            <ServicesMenu
                services={services}
                activeService={activeService}
                setActiveService={setActiveService}
                borrowingRules={borrowingRules}
                laptopSteps={laptopSteps}
                printingSteps={printingSteps}
                studyRooms={studyRooms}
            />

            {/* My Account Section */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-purple-200">
                        <div className="text-center mb-6 sm:mb-8">
                            <UserCheck className="size-12 sm:size-16 text-purple-600 mx-auto mb-3 sm:mb-4" />
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">تجديد الكتب - حسابي في المكتبة</h2>
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">My Account - Book Renewal</p>
                        </div>

                        <div className="bg-white rounded-lg p-5 sm:p-6 border-2 border-purple-200 mb-6">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#254151] mb-4">خطوات الدخول إلى حسابك:</h3>
                            <div className="space-y-3">
                                {[
                                    'افتح صفحة حسابك الشخصي في نظام المكتبة',
                                    'أدخل بريدك الإلكتروني وكلمة المرور الخاصة بك',
                                    'اختر "حسابي" للوصول إلى حسابك الخاص'
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-4 bg-purple-50 rounded-lg p-4">
                                        <div className="bg-purple-600 text-white size-7 sm:size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed pt-1 text-xs sm:text-sm lg:text-base">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <a
                            href="#my-account"
                            className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-xl transition-all text-sm sm:text-lg lg:text-xl"
                        >
                            <UserCheck className="size-5 sm:size-7" />
                            <span>الدخول إلى حسابي</span>
                            <ArrowRight className="size-5 sm:size-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
                        <div className="text-center mb-6 sm:mb-8">
                            <MessageSquare className="size-8 sm:size-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#254151] mb-3 sm:mb-4">اسأل أمين المكتبة</h2>
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-600">Ask the Librarian</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200 text-center">
                                <Phone className="size-5 sm:size-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-lg font-bold text-[#254151] mb-2">الهاتف</h3>
                                <a href="tel:+96825657666" className="text-blue-600 hover:underline font-semibold" dir="ltr">
                                    +968 2565 7666
                                </a>
                                <p className="text-sm text-gray-600 mt-2">
                                    8:00 صباحاً - 3:00 مساءً
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-2 border-green-200 text-center">
                                <Mail className="size-5 sm:size-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-lg font-bold text-[#254151] mb-2">البريد الإلكتروني</h3>
                                <a href="mailto:librarian_team@buc.edu.om" className="text-green-600 hover:underline font-semibold break-all">
                                    librarian_team@buc.edu.om
                                </a>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border-2 border-purple-200 text-center">
                                <Facebook className="size-5 sm:size-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="text-base sm:text-lg font-bold text-[#254151] mb-2">فيسبوك</h3>
                                <a
                                    href="https://www.facebook.com/oman.buc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:underline font-semibold inline-flex items-center gap-2"
                                >
                                    <span>BUC Library</span>
                                    <ExternalLink className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 sm:py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">استفد من خدماتنا</h2>
                    <p className="text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                        نحن هنا لمساعدتك في رحلتك التعليمية والبحثية
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/main/library"
                            className="inline-flex items-center gap-2 bg-white text-[#254151] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <BookOpen className="size-5 sm:size-6" />
                            <span>المكتبة الإلكترونية</span>
                        </Link>
                        <Link
                            href="/main/library/electronic-resources"
                            className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-sm sm:text-lg"
                        >
                            <Target className="size-5 sm:size-6" />
                            <span>المصادر الإلكترونية</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-sm sm:text-lg"
                        >
                            <ChevronLeft className="size-5 sm:size-6" />
                            <span>العودة للرئيسية</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
