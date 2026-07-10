"use client";

import { FlaskConical, TrendingUp, DollarSign, Briefcase, BookOpen, FolderOpen, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from "next-intl";

const researchAreas = [
    {
        title: 'ركائز البحث العلمي',
        titleEn: 'Research Pillars',
        description: 'استكشف المجالات البحثية الرئيسية والمشاريع العلمية المتقدمة في كلية البريمي الجامعية',
        descriptionEn: 'Explore key research areas and advanced scientific projects at Al Buraimi University College',
        icon: FlaskConical,
        link: '/main/research-pillars',
        color: '#254151'
    },
    {
        title: 'التطوير الوظيفي',
        titleEn: 'Professional Development',
        description: 'برامج تطوير القدرات والمهارات البحثية لأعضاء هيئة التدريس والباحثين',
        descriptionEn: 'Capacity-building and research skills development programs for faculty members and researchers',
        icon: TrendingUp,
        link: '/main/research/professional-development',
        color: '#6096b4'
    },
    {
        title: 'المساعدات المالية والمنح',
        titleEn: 'Research Funding & Grants',
        description: 'فرص التمويل البحثي والمنح المتاحة لدعم المشاريع العلمية والبحثية',
        descriptionEn: 'Funding opportunities and available grants to support scientific and research projects',
        icon: DollarSign,
        link: '/main/research/research-funding',
        color: '#c2a772'
    },
    {
        title: 'الاستشارات والخدمات البحثية',
        titleEn: 'Consultancy & Research Services',
        description: 'خدمات الاستشارات العلمية والبحثية للمؤسسات والجهات المختلفة',
        descriptionEn: 'Scientific and research consultancy services for institutions and various organizations',
        icon: Briefcase,
        link: '/main/research/consultancy-research',
        color: '#254151'
    },
    {
        title: 'المنشورات البحثية',
        titleEn: 'Research Publications',
        description: 'الأوراق العلمية والدراسات البحثية المنشورة من قبل أعضاء هيئة التدريس',
        descriptionEn: 'Published papers and research studies by faculty members',
        icon: BookOpen,
        link: '/main/research/publications',
        color: '#6096b4'
    },
    {
        title: 'المشاريع البحثية',
        titleEn: 'Research Projects',
        description: 'المشاريع البحثية الحالية والمنجزة في مختلف التخصصات الأكاديمية',
        descriptionEn: 'Current and completed research projects across various academic disciplines',
        icon: FolderOpen,
        link: '/main/research/projects',
        color: '#c2a772'
    },
    {
        title: 'بوابة عمان البحثية - TRC',
        titleEn: 'Oman Research Portal (TRC)',
        description: 'الوصول إلى بوابة مجلس البحث العلمي وموارد البحث الوطنية',
        descriptionEn: 'Access the Research Council portal and national research resources',
        icon: Globe,
        link: '/main/research/trc-portal',
        color: '#254151'
    }
];
export default function ResearchAreasComp() {
    const locale = useLocale();
    const localeVal = locale === "ar" ? "ar" : "en";

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {researchAreas.map((area, index) => {
                        const Icon = area.icon;
                        const title = localeVal === "ar" ? area.title : area.titleEn;
                        const description = localeVal === "ar" ? area.description : area.descriptionEn;
                        const learnMore = localeVal === "ar" ? "اعرف المزيد" : "Learn more";

                        return (
                            <Link
                                key={index}
                                href={area.link}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#6096b4] transform hover:-translate-y-2"
                            >
                                <div
                                    className="p-8 text-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${area.color}15 0%, ${area.color}05 100%)`
                                    }}
                                >
                                    <div
                                        className="inline-flex items-center justify-center size-10 sm:size-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                                        style={{ backgroundColor: area.color }}
                                    >
                                        <Icon className="size-5 sm:size-10 text-white" />
                                    </div>

                                    <h3 className=" text-lg md:text-2xl font-bold text-[#254151] mb-4 group-hover:text-[#6096b4] transition-colors">
                                        {title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {description}
                                    </p>

                                    <div className=" text-sm lg:text-base mt-6 inline-flex items-center gap-2 text-[#c2a772] font-bold group-hover:gap-3 transition-all">
                                        <span>{learnMore}</span>
                                        <svg className={`size-5 ${localeVal === "ar" ? "" : "transform rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}