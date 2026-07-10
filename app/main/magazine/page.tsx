"use client";

import { useState } from 'react';
import { useCustomSession } from '@/hooks/useCustomSession';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MagazineOverView from '@/components/magazine/OverviewMag';
import AboutMag from '@/components/magazine/AboutMag';
import EditorialMag from '@/components/magazine/EditorialMag';
import IssuesMag from '@/components/magazine/IssuesMag';


export default function MagazinePage() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    const t = isAr
        ? {
            heroTitle: 'مجلة أضواء',
            breadcrumbHome: 'الرئيسية',
            breadcrumbNews: 'الأخبار والفعاليات',
            breadcrumbMagazine: 'مجلة أضواء',
            tabOverview: 'نظرة عامة',
            tabAbout: 'عن مجلة أضواء',
            tabEditorial: 'هيئة التحرير',
            tabIssues: 'أعداد المجلة',

            aboutHeading: 'لمحة عن مجلة أضواء',
            aboutText:
                'مجلة أضواء هي مجلة إخبارية تصدر مرتين في السنة بهدف تسليط الضوء على الأنشطة الأكاديمية والثقافية في كلية البريمي الجامعية.',
            goalsHeading: 'أهداف مجلة أضواء',
            goalsText1:
                'تهدف المجلة إلى تعزيز الانتماء المؤسسي ودعم التميز الأكاديمي والثقافي من خلال توثيق الأحداث والأنشطة التي تساهم في تطوير بيئة التعلم في الكلية.',
            goalsText2:
                'كما تعد المجلة منصة أكاديمية تسعى إلى توثيق إنجازات الكلية المستمرة وتسليط الضوء على أفكار ومساهمات مجتمع الكلية من طلاب وأعضاء هيئة التدريس من خلال استعراض المبادرات والإنجازات التي تعكس الإبداع والتميز في مختلف المجالات الأكاديمية والثقافية.',
            editorialHeading: 'هيئة التحرير',
            thPosition: 'الوظيفة',
            thName: 'الاسم',
            thEmail: 'البريد الإلكتروني',
            issuesHeading: 'أعداد المجلة',
            downloadPdf: 'تحميل العدد (PDF)',
        }
        : {
            heroTitle: 'Adwaa Magazine',
            breadcrumbHome: 'Home',
            breadcrumbNews: 'News & Events',
            breadcrumbMagazine: 'Adwaa Magazine',
            tabOverview: 'Overview',
            tabAbout: 'About Adwaa',
            tabEditorial: 'Editorial Board',
            tabIssues: 'Issues',

            aboutHeading: 'About Adwaa Magazine',
            aboutText:
                'Adwaa is a biannual news magazine aiming to highlight academic and cultural activities at Buraimi University College.',
            goalsHeading: 'Adwaa Magazine Goals',
            goalsText1:
                'The magazine aims to strengthen institutional belonging and support academic and cultural excellence by documenting events and activities that enhance the learning environment.',
            goalsText2:
                'It also serves as an academic platform that documents the college’s continuous achievements and highlights ideas and contributions from students and faculty.',
            editorialHeading: 'Editorial Board',
            thPosition: 'Position',
            thName: 'Name',
            thEmail: 'Email',
            issuesHeading: 'Magazine Issues',
            downloadPdf: 'Download Issue (PDF)',
        };

    const { data: session } = useCustomSession();
    const isAdmin = session?.isAdmin ?? false;

    const [activeTab, setActiveTab] = useState<'overview' | 'about' | 'editorial' | 'issues'>('overview');

    return (
        <div className="min-h-screen bg-white" dir={dir}>
            {/* Hero Section */}
            <div className="bg-[#254151] text-white py-20 text-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-5xl mb-4">{t.heroTitle}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-sm mt-8">
                        <Link href="/" className="hover:text-[#c2a772] transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <Link href="/main/news" className="hover:text-[#c2a772] transition-colors">
                            {t.breadcrumbNews}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.breadcrumbMagazine}</span>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                {/* Tabs Navigation */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                    <TabsList
                        variant="line"
                        className="flex w-full justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0"
                    >
                        <TabsTrigger
                            value="overview"
                            className="max-w-fit px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold border-b-2 rounded-none data-[state=active]:border-[#6096b4] data-[state=active]:text-[#6096b4] data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#6096b4]"
                        >
                            {t.tabOverview}
                        </TabsTrigger>
                        <TabsTrigger
                            value="about"
                            className="max-w-fit px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold border-b-2 rounded-none data-[state=active]:border-[#6096b4] data-[state=active]:text-[#6096b4] data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#6096b4]"
                        >
                            {t.tabAbout}
                        </TabsTrigger>
                        <TabsTrigger
                            value="editorial"
                            className="max-w-fit px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold border-b-2 rounded-none data-[state=active]:border-[#6096b4] data-[state=active]:text-[#6096b4] data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#6096b4]"
                        >
                            {t.tabEditorial}
                        </TabsTrigger>
                        <TabsTrigger
                            value="issues"
                            className="max-w-fit px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold border-b-2 rounded-none data-[state=active]:border-[#6096b4] data-[state=active]:text-[#6096b4] data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-[#6096b4]"
                        >
                            {t.tabIssues}
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 sm:px-6 py-16">
                    {/* نظرة عامة */}
                    <TabsContent value="overview">
                        <MagazineOverView isAr={isAr} />
                    </TabsContent>

                    {/* عن مجلة أضواء */}
                    <TabsContent value="about">
                        <AboutMag
                            aboutHeading={t.aboutHeading}
                            aboutText={t.aboutText}
                            goalsHeading={t.goalsHeading}
                            goalsText1={t.goalsText1}
                            goalsText2={t.goalsText2}
                        />
                    </TabsContent>

                    {/* هيئة التحرير */}
                    <TabsContent value="editorial">
                        <EditorialMag
                            isAr={isAr}
                            editorialHeading={t.editorialHeading}
                            thPosition={t.thPosition}
                            thName={t.thName}
                            thEmail={t.thEmail}
                            isAdmin={isAdmin}
                        />
                    </TabsContent>

                    {/* أعداد المجلة */}
                    <TabsContent value="issues">
                        <IssuesMag isAr={isAr} issuesHeading={t.issuesHeading} downloadPdf={t.downloadPdf} isAdmin={isAdmin} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
