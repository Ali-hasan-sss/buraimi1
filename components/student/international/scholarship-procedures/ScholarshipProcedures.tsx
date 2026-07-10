
"use client";

import React from 'react';
import {
    FileText,
    Building2,
    GraduationCap,
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle,
    Calendar,
} from 'lucide-react';
import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import { useLocale } from 'next-intl';

type InfoCard = {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
};

export default function ScholarshipProceduresPage() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    const t = isAr
        ? {
            heroTitle: 'إجراءات طلبة البعثات',
            heroSubtitle: 'دليل شامل للإجراءات والضوابط المتعلقة بطلبة البعثات الدراسية',
            section1Title: 'أولاً: تغيير المؤسسة التعليمية',
            section1SubTitle: 'أ: حالات الموافقة على تغيير المؤسسة',
            section1Intro: 'توافق لجنة الابتعاث على طلبات تغيير المؤسسة التعليمية في الحالات التالية:',
            restrictionsTitle: 'القيود والشروط',
            rA: 'ب',
            rB: 'ج',
            rC: 'د',
            section2Title: 'ثانياً: تغيير التخصص',
            section2SubTitle: 'أ: حالات الموافقة على تغيير التخصص',
            section2Intro: 'توافق لجنة الابتعاث على طلبات تغيير تخصص الطالب في الحالات التالية:',
            section2RestrictionPrefix: (idx: number) => (idx === 0 ? 'ب' : 'ت'),
            section3Title: 'ثالثاً: التأجيل',
            section4Title: 'رابعاً: مدة الدراسة',
            noteTitle: 'ملاحظة هامة:',
            noteText: 'الفصل الصيفي لا يحسب ضمن مدة المنحة الدراسية',
            contactTitle: 'للاستفسارات والمزيد من المعلومات',
            contactText: 'يرجى التواصل مع قسم شؤون الطلبة أو لجنة الابتعاث بالكلية',
            phoneLabel: 'الهاتف',
            emailLabel: 'البريد الإلكتروني',
        }
        : {
            heroTitle: 'Scholarship Student Procedures',
            heroSubtitle: 'A comprehensive guide to procedures and regulations for scholarship students',
            section1Title: 'First: Changing the Educational Institution',
            section1SubTitle: 'A: Approved cases for changing the institution',
            section1Intro: 'The Scholarship Committee approves requests to change the educational institution in the following cases:',
            restrictionsTitle: 'Restrictions & Conditions',
            rA: 'B',
            rB: 'C',
            rC: 'D',
            section2Title: 'Second: Changing the Major',
            section2SubTitle: 'A: Approved cases for changing the major',
            section2Intro: 'The Scholarship Committee approves requests to change a student’s major in the following cases:',
            section2RestrictionPrefix: (idx: number) => (idx === 0 ? 'B' : 'C'),
            section3Title: 'Third: Deferment',
            section4Title: 'Fourth: Study Duration',
            noteTitle: 'Important Note:',
            noteText: 'The summer semester is not counted within the scholarship duration.',
            contactTitle: 'For inquiries and more information',
            contactText: 'Please contact the Student Affairs Department or the Scholarship Committee.',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
        };

    const institutionChangeConditions: InfoCard[] = [
        {
            titleAr: 'نقل الطالب من جامعة إلى أخرى',
            titleEn: 'Transfer a student from one university to another',
            descriptionAr: 'بمبررات معتمدة من قبل لجنة الابتعاث',
            descriptionEn: 'With reasons approved by the Scholarship Committee',
        },
        {
            titleAr: 'تغيير المؤسسة للبرنامج التحضيري أو اللغة الإنجليزية',
            titleEn: 'Changing the institution for the foundation program or English language',
            descriptionAr:
                'بشرط أن يكون مستوفياً للقبول غير المشروط للمؤسسة التي يرغب في التحويل إليها في نفس مجال المعرفة (نفس القسم الأكاديمي)',
            descriptionEn:
                'Provided the student meets unconditional admission at the institution they wish to transfer to within the same field of knowledge (same academic department).',
        },
        {
            titleAr: 'تغيير المؤسسة بعد الانتهاء من البرنامج التحضيري',
            titleEn: 'Changing the institution after completing the foundation program',
            descriptionAr:
                'بشرط أن يكون الطالب مستوفياً للقبول غير المشروط في البرنامج الأكاديمي من المؤسسة التعليمية الراغبة في التحويل في نفس مجال المعرفة',
            descriptionEn:
                'Provided the student meets unconditional admission to the academic program at the receiving institution within the same field of knowledge.',
        },
    ];

    const institutionChangeRestrictionsAr = [
        'ألا يترتب على التغيير إعادة سنة دراسية واحدة',
        'ألا يترتب على الطالب أي التزامات مالية تجاه المؤسسة التعليمية الملتحق بها',
        'يتحمل الطالب كافة التكاليف المالية الشخصية المرتبطة بالسكن والإيجار والفواتير الناتجة عن قرار التحويل من المؤسسة التعليمية',
    ];
    const institutionChangeRestrictionsEn = [
        'The change must not result in repeating an academic year.',
        'The student must not have any financial obligations to the current institution.',
        'The student bears all personal financial costs related to housing, rent, and bills resulting from the transfer decision.',
    ];

    const majorChangeConditions: InfoCard[] = [
        {
            titleAr: 'الحصول على قبول مباشر في التخصص الجديد',
            titleEn: 'Obtaining direct admission to the new major',
            descriptionAr: 'بشرط أن يكون في نفس مجال المعرفة مثل التخصص المقبول',
            descriptionEn: 'Provided it is within the same field of knowledge as the originally admitted major.',
        },
        {
            titleAr: 'عدم القدرة على الالتحاق بالتخصص الموفد إليه',
            titleEn: 'Inability to join the sponsored major',
            descriptionAr:
                'لأسباب أكاديمية أو لعدم وجود مقاعد كافية في التخصص بعد الحصول على توصية من المشرف الأكاديمي في المؤسسة التعليمية تفيد بإمكانية الالتحاق بالبرنامج لتحسين الحالة الأكاديمية وبموافقة لجنة الابتعاث',
            descriptionEn:
                'For academic reasons or due to insufficient seats in the major, after receiving an academic supervisor recommendation and with Scholarship Committee approval.',
        },
        {
            titleAr: 'إكمال البرنامج التأسيسي',
            titleEn: 'Completing the foundation program',
            descriptionAr:
                'الحصول على قبول غير مشروط في التخصص الذي يرغب في الالتحاق به بشرط أن يكون في نفس مجال المعرفة',
            descriptionEn:
                'Obtaining unconditional admission to the desired major, provided it is within the same field of knowledge.',
        },
    ];

    const majorChangeRestrictionsAr = [
        'أن لا يؤثر تغيير التخصص على التاريخ المتوقع لتخرج الطالب بما لا يزيد عن المدة المحددة للتمديد',
        'ألا يترتب على التغيير إعادة سنة دراسية واحدة',
    ];
    const majorChangeRestrictionsEn = [
        'Changing the major must not affect the expected graduation date beyond the allowed extension period.',
        'The change must not result in repeating an academic year.',
    ];

    const defermentTypes: InfoCard[] = [
        {
            titleAr: 'التأجيل عن المدة المحددة',
            titleEn: 'Deferment beyond the specified period',
            descriptionAr: 'فصلين دراسيين منفصلين أو متصلين',
            descriptionEn: 'Two academic semesters, consecutive or separate.',
        },
        {
            titleAr: 'بدء الدراسة بعد التأجيل',
            titleEn: 'Resuming study after deferment',
            descriptionAr: 'العودة للدراسة بعد انتهاء فترة التأجيل المعتمدة',
            descriptionEn: 'Returning to study after the approved deferment period ends.',
        },
    ];

    const studyDurations = [
        {
            programAr: 'البرنامج التأسيسي',
            programEn: 'Foundation Program',
            durationAr: 'عام واحد فقط (فصلين دراسيين)',
            durationEn: 'One year only (two semesters)',
            noteAr: 'وإلا فسيكون على حساب الطالب',
            noteEn: 'Otherwise, it will be at the student’s expense.',
            icon: GraduationCap,
            color: 'blue' as const,
        },
        {
            programAr: 'طلاب المرحلة الجامعية',
            programEn: 'Undergraduate Students',
            durationAr: '8 فصول دراسية في التخصص',
            durationEn: '8 semesters in the major',
            noteAr: '',
            noteEn: '',
            icon: Building2,
            color: 'green' as const,
        },
        {
            programAr: 'طلاب الدبلوم',
            programEn: 'Diploma Students',
            durationAr: '4 فصول دراسية للتخصص',
            durationEn: '4 semesters in the major',
            noteAr: '',
            noteEn: '',
            icon: FileText,
            color: 'orange' as const,
        },
    ];

    const bgColors: Record<(typeof studyDurations)[number]['color'], string> = {
        blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
        green: 'bg-gradient-to-br from-green-500 to-green-600',
        orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
    };

    return (
        <div className="min-h-screen" dir={dir}>
            <section className="relative h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/assets/about/foundation_landing.webp)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90" />
                </div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">{t.heroTitle}</h1>
                        <p className="text-sm sm:text-base lg:text-xl max-w-3xl mx-auto">
                            {t.heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
                <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <StudentsSidebar activeId="scholarship-procedures" />

                        <div className="lg:col-span-9">
                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#6096b4] p-2 sm:p-3 rounded-lg">
                                        <Building2 className="size-5 sm:size-8 text-white" />
                                    </div>
                                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{t.section1Title}</h2>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4">{t.section1SubTitle}</h3>
                                    <p className="text-gray-700 mb-4 bg-blue-50 border-r-4 border-[#6096b4] p-3 sm:p-4 rounded">
                                        {t.section1Intro}
                                    </p>

                                    <div className="space-y-4">
                                        {institutionChangeConditions.map((condition) => (
                                            <div
                                                key={condition.titleAr}
                                                className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 sm:p-5"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="hidden sm:flex size-6 text-green-600 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-[#254151] mb-2">{isAr ? condition.titleAr : condition.titleEn}</h4>
                                                        <p className="text-gray-700 text-sm leading-relaxed">{isAr ? condition.descriptionAr : condition.descriptionEn}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4">{t.restrictionsTitle}</h3>

                                    <div className="space-y-3">
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500 rounded-lg p-3 sm:p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="hidden sm:flex size-5 text-amber-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-800">{t.rA}: {isAr ? institutionChangeRestrictionsAr[0] : institutionChangeRestrictionsEn[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500 rounded-lg p-3 sm:p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="hidden sm:flex size-5 text-amber-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-800">{t.rB}: {isAr ? institutionChangeRestrictionsAr[1] : institutionChangeRestrictionsEn[1]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-r-4 border-red-500 rounded-lg p-3 sm:p-4">
                                            <div className="flex items-start gap-3">
                                                <XCircle className="hidden sm:flex size-5 text-red-600 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-gray-800">{t.rC}: {isAr ? institutionChangeRestrictionsAr[2] : institutionChangeRestrictionsEn[2]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#c2a772] p-2 sm:p-3 rounded-lg">
                                        <GraduationCap className="size-5 sm:size-8 text-white" />
                                    </div>
                                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{t.section2Title}</h2>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4">{t.section2SubTitle}</h3>
                                    <p className="text-gray-700 mb-4 bg-purple-50 border-r-4 border-purple-500 p-3 sm:p-4 rounded">
                                        {t.section2Intro}
                                    </p>

                                    <div className="space-y-4">
                                        {majorChangeConditions.map((condition) => (
                                            <div
                                                key={condition.titleAr}
                                                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 sm:p-5"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="hidden sm:flex size-6 text-blue-600 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-[#254151] mb-2">{isAr ? condition.titleAr : condition.titleEn}</h4>
                                                        <p className="text-gray-700 text-sm leading-relaxed">{isAr ? condition.descriptionAr : condition.descriptionEn}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#254151] mb-4">{t.restrictionsTitle}</h3>
                                    <div className="space-y-3">
                                        {(isAr ? majorChangeRestrictionsAr : majorChangeRestrictionsEn).map((restriction, index) => (
                                            <div
                                                key={restriction}
                                                className="bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500 rounded-lg p-3 sm:p-4"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle className="hidden sm:flex size-5 text-amber-600 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <p className="font-bold text-gray-800">{t.section2RestrictionPrefix(index)}: {restriction}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#6096b4] p-2 sm:p-3 rounded-lg">
                                        <Clock className="size-5 sm:size-8 text-white" />
                                    </div>
                                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{t.section3Title}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {defermentTypes.map((type, index) => (
                                        <div
                                            key={type.titleAr}
                                            className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4 sm:p-6"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="bg-indigo-600 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full hidden sm:flex items-center justify-center font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#254151] mb-2">{isAr ? type.titleAr : type.titleEn}</h4>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{isAr ? type.descriptionAr : type.descriptionEn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-[#c2a772] p-2 sm:p-3 rounded-lg">
                                        <Calendar className="size-5 sm:size-8 text-white" />
                                    </div>
                                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#254151]">{t.section4Title}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
                                    {studyDurations.map((item) => {
                                        const Icon = item.icon;
                                        const program = isAr ? item.programAr : item.programEn;
                                        const duration = isAr ? item.durationAr : item.durationEn;
                                        const note = isAr ? item.noteAr : item.noteEn;

                                        return (
                                            <div key={program} className={`${bgColors[item.color]} text-white rounded-lg p-4 sm:p-6`}>
                                                <div className="flex justify-center mb-4">
                                                    <div className="bg-white/20 p-3 sm:p-4 rounded-lg">
                                                        <Icon className="size-8 sm:size-10 text-white" />
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-lg sm:text-xl mb-3 text-center">{program}</h3>
                                                <p className="text-center mb-2 text-base sm:text-lg">{duration}</p>
                                                {note ? (
                                                    <p className="text-center text-sm bg-white/20 rounded p-2 mt-3">{note}</p>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-r-4 border-red-500 rounded-lg p-4 sm:p-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="hidden sm:flex size-6 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-base sm:text-xl text-[#254151]">{t.noteTitle}</p>
                                            <p className="text-gray-700 mt-2">{t.noteText}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white rounded-lg shadow-lg p-4 sm:p-8">
                                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-center">{t.contactTitle}</h3>
                                <p className="text-center text-sm sm:text-lg mb-4">{t.contactText}</p>
                                <div className="grid sm:flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                                    <div className="bg-white/20 px-4 sm:px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">{t.phoneLabel}</p>
                                        <p className="font-bold">+968 2568 0000</p>
                                    </div>
                                    <div className="bg-white/20 px-4 sm:px-6 py-3 rounded-lg text-center">
                                        <p className="text-sm opacity-90">{t.emailLabel}</p>
                                        <p className="font-bold break-all">scholarships@alburayimi.edu.om</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
