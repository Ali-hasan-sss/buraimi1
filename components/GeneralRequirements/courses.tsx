"use client";

import { Award, BookOpen, CheckCircle, Globe } from "lucide-react";
import { useLocale } from "next-intl";

import type { ComponentType } from "react";

type LocaleKey = "ar" | "en";
type ColorKey = "blue" | "green" | "purple" | "amber";

type Course = {
    title: string;
    titleEn: string;
    credits: string;
    creditsEn: string;
    description: string;
    descriptionEn: string;
    icon: ComponentType<{ className?: string }>;
    color: ColorKey;
    topics: string[];
    topicsEn: string[];
};

const courses: Course[] = [
    {
        title: 'اللغة العربية',
        titleEn: 'Arabic Language',
        credits: '3 ساعات معتمدة',
        creditsEn: '3 Credit Hours',
        description: 'يهدف هذا المقرر إلى تطوير مهارات الطالب في اللغة العربية من خلال صقل مهارات القراءة والكتابة والتحدث والاستماع، مع التركيز على تحليل النصوص باستخدام مهارات التفكير النقدي.',
        descriptionEn: 'This course aims to develop students\' Arabic language skills by strengthening reading, writing, speaking, and listening, with a focus on analyzing texts using critical thinking skills.',
        icon: BookOpen,
        color: 'blue',
        topics: [
            'مهارات القراءة والفهم',
            'التحدث والتواصل الشفهي',
            'الاستماع النقدي',
            'الكتابة الأكاديمية',
            'تحليل النصوص الأدبية'
        ],
        topicsEn: [
            'Reading and comprehension skills',
            'Speaking and oral communication',
            'Critical listening',
            'Academic writing',
            'Literary text analysis'
        ]
    },
    {
        title: 'الحضارة الإسلامية',
        titleEn: 'Islamic Civilization',
        credits: '3 ساعات معتمدة',
        creditsEn: '3 Credit Hours',
        description: 'يتناول هذا المقرر دراسة مراحل الحضارة الإسلامية وخصائصها ونظامها، مع تحليل التحولات التي طرأت عليها في مختلف العصور الإسلامية.',
        descriptionEn: 'This course explores the stages, characteristics, and systems of Islamic civilization, analyzing the transformations it underwent across different historical eras.',
        icon: Award,
        color: 'green',
        topics: [
            'مراحل الحضارة الإسلامية',
            'خصائص الحضارة الإسلامية',
            'النظام السياسي والاجتماعي',
            'الإنجازات العلمية والثقافية',
            'التحولات التاريخية'
        ],
        topicsEn: [
            'Stages of Islamic civilization',
            'Characteristics of Islamic civilization',
            'Political and social systems',
            'Scientific and cultural achievements',
            'Historical transformations'
        ]
    },
    {
        title: 'المجتمع العماني',
        titleEn: 'Omani Society',
        credits: '3 ساعات معتمدة',
        creditsEn: '3 Credit Hours',
        description: 'يركز هذا المقرر على دراسة خصائص المجتمع العماني ومقارنته مع المجتمعات الخليجية الأخرى، مع التركيز على العادات والتقاليد والتطورات الاجتماعية.',
        descriptionEn: 'This course focuses on the characteristics of Omani society and compares it with other Gulf societies, emphasizing customs, traditions, and social developments.',
        icon: Globe,
        color: 'purple',
        topics: [
            'خصائص المجتمع العماني',
            'العادات والتقاليد العمانية',
            'المقارنة مع المجتمعات الخليجية',
            'التطور الاجتماعي',
            'المشاركة المجتمعية'
        ],
        topicsEn: [
            'Characteristics of Omani society',
            'Omani customs and traditions',
            'Comparison with Gulf societies',
            'Social development',
            'Community engagement'
        ]
    }
];

export default function CoursesComp(
    { colorStyles }: {
        colorStyles: Record<
            ColorKey,
            {
                border200: string;
                border500: string;
                bg50: string;
                from600: string;
                to700: string;
                text600: string;
                text700: string;
                bg600: string;
            }
        >
    }
) {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "sectionTitle": "المواد المطروحة",
            "topicsTitle": "المواضيع الرئيسية:",
        },
        "en": {
            "sectionTitle": "Courses Offered",
            "topicsTitle": "Key Topics:",
        },
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <div className="mb-12">
            <div className="bg-white rounded-lg shadow-xl p-5 sm:p-10 border-2 border-indigo-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-indigo-600 text-white p-3 sm:p-4 rounded-full">
                        <BookOpen className="size-6 sm:size-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#254151]">{content.sectionTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                    {courses.map((course) => {
                        const c = colorStyles[course.color];
                        const CourseIcon = course.icon;

                        const title = locale === "ar" ? course.title : course.titleEn;
                        const credits = locale === "ar" ? course.credits : course.creditsEn;
                        const creditsSub = locale === "ar" ? course.creditsEn : course.credits;
                        const description = locale === "ar" ? course.description : course.descriptionEn;
                        const topics = locale === "ar" ? course.topics : course.topicsEn;

                        return (
                            <div
                                key={course.titleEn}
                                className={`bg-white rounded-lg shadow-xl border-2 ${c.border200} overflow-hidden hover:shadow-2xl transition-all`}
                            >
                                <div className={`bg-gradient-to-r ${c.from600} ${c.to700} text-white p-5 sm:p-6 text-center`}>
                                    <div className="bg-white/20 backdrop-blur-sm size-16 sm:size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CourseIcon className="size-10 sm:size-12" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{title}</h3>
                                    <p className="text-sm opacity-90 mb-3">{locale === "ar" ? course.titleEn : course.title}</p>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                                        <p className="font-bold">{credits}</p>
                                        <p className="text-xs opacity-90">{creditsSub}</p>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <p className={`text-gray-700 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 border-r-4 ${c.border500} pr-4`}>
                                        {description}
                                    </p>

                                    <div className={`${c.bg50} rounded-lg p-4 sm:p-6 border-2 ${c.border200}`}>
                                        <h4 className="font-bold text-[#254151] mb-3">{content.topicsTitle}</h4>
                                        <ul className="space-y-2">
                                            {topics.map((topic: string) => (
                                                <li key={topic} className="flex items-start gap-2">
                                                    <CheckCircle className={`size-5 ${c.text600} flex-shrink-0 mt-0.5`} />
                                                    <span className="text-gray-700 text-sm sm:text-base">{topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    )
}