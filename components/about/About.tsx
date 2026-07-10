"use client"
import { useCallback, useMemo, useState } from 'react';

import { motion } from "framer-motion"

import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutMobileMenu from '@/components/about/AboutMobileMenu';
import AboutDesktopSidebarMenu from '@/components/about/AboutDesktopSidebarMenu';
import { menuItems } from '@/components/about/aboutMenu';
import { useAboutHashNavigation } from '@/components/about/useAboutHashNavigation';

import AboutContent from '@/components/about/AboutContent';
import BoardChairmanMessageContent from '@/components/about/BoardChairmanMessageContent';
import DeanMessageContent from '@/components/about/DeanMessageContent';
import VisionMissionContent from '@/components/about/VisionMissionContent';
import BoardDirectorsContent from '@/components/about/BoardDirectorsContent';
import AccreditationCouncilContent from '@/components/about/AccreditationCouncilContent';
import AdvisoryCouncilContent from '@/components/about/AdvisoryCouncilContent';
import CollegeCouncilContent from '@/components/about/CollegeCouncilContent';
import GraduateAttributesContent from '@/components/about/GraduateAttributesContent';
import AcademicAffiliationContent from '@/components/about/AcademicAffiliationContent';
import QualityAssuranceContent from '@/components/about/QualityAssuranceContent';
import QualityCalendarContent from '@/components/about/QualityCalendarContent';
import PoliciesByDepartmentContent from '@/components/about/PoliciesByDepartmentContent';
import OrganizationalStructureContent from '@/components/about/OrganizationalStructureContent';
import PartnershipsContent from '@/components/about/PartnershipsContent';
import SafetySecurityContent from '@/components/about/SafetySecurityContent';
import CampusMapContent from '@/components/about/CampusMapContent';
import DefaultContent from '@/components/about/DefaultContent';
import JobsContent from '@/components/about/JobsContent';

export default function AboutUs() {
    const { activeSection, expandedMenus, setExpandedMenus, navigateToSection } =
        useAboutHashNavigation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const toggleMenu = useCallback((id: string) => {
        setExpandedMenus((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }, [setExpandedMenus]);

    const handleSectionChange = useCallback((id: string) => {
        navigateToSection(id);
        setIsMobileMenuOpen(false);
        setIsSidebarCollapsed(true); // إغلاق القائمة الجانبية ��ند النقر

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigateToSection]);

    const scrollToContent = useCallback(() => {
        const contentSection = document.getElementById('content-section');
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);


    const content = useMemo(() => {
        switch (activeSection) {
            case 'about':
                return <AboutContent />;
            case 'board-chairman-message':
                return <BoardChairmanMessageContent />;
            case 'dean-message':
                return <DeanMessageContent />;
            case 'vision-mission':
                return <VisionMissionContent />;
            case 'board-directors':
                return <BoardDirectorsContent />;
            case 'board-trustees':
                return <AccreditationCouncilContent />;
            case 'advisory-council':
                return <AdvisoryCouncilContent />;
            case 'college-council':
                return <CollegeCouncilContent />;
            case 'graduate-attributes':
                return <GraduateAttributesContent />;
            case 'academic-affiliation':
                return <AcademicAffiliationContent />;
            case 'quality-assurance-main':
                return <QualityAssuranceContent />;
            case 'quality-calendar':
                return <QualityCalendarContent />;
            case 'policies-by-department':
                return <PoliciesByDepartmentContent />;
            case 'organizational-structure':
                return <OrganizationalStructureContent />;
            case 'partnerships':
                return <PartnershipsContent />;
            case 'safety-security':
                return <SafetySecurityContent />;
            case 'jobs':
                return <JobsContent />;
            case 'campus-map':
                return <CampusMapContent />;
            default:
                return <DefaultContent title={menuItems.find(m => m.id === activeSection)?.title || ''} />;
        }
    }, [activeSection]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            <AboutHeroSection onScrollToContent={scrollToContent} />

            <div id="content-section" className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
                <AboutMobileMenu
                    menuItems={menuItems}
                    activeSection={activeSection}
                    expandedMenus={expandedMenus}
                    isOpen={isMobileMenuOpen}
                    onToggleOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    onToggleMenu={toggleMenu}
                    onSelectSection={handleSectionChange}
                />

                <div className="grid lg:grid-cols-[380px,1fr] gap-8 items-start">
                    <AboutDesktopSidebarMenu
                        menuItems={menuItems}
                        activeSection={activeSection}
                        expandedMenus={expandedMenus}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        onToggleMenu={toggleMenu}
                        onSelectSection={handleSectionChange}
                    />

                    {/* Main Content - Modern Design */}
                    <motion.main
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-12 min-h-[600px] border border-gray-100
                                max-w-[95vw]
                        "
                    >
                        {content}
                    </motion.main>
                </div>
            </div>
        </div>
    );
}