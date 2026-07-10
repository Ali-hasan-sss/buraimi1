"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import mobileLogo from "@/public/logo.webp"

import desktopLogo from '@/public/assets/611e5eacee07f1d8f784863ef6b535306866ecec.png';
import { useLocale } from "next-intl"

import { cn } from "@/lib/utils"

import { GradProgramsData } from "@/staticData/GraduateStudies"

import DropdownPanel from "./DropdownPanel"
import MobileTab from "./MobileTab"
import DesktopTab from "./DesktopTab"

const DROPDOWN_TOP_PX = 100

type DropdownLink = {
    title: string
    href: string
    description?: string
    submenu?: DropdownLink[]
}

export type NavCategory = {
    label: string
    title: string
    href?: string
    description?: string
    links?: DropdownLink[]
}

type DepartmentNavItem = {
    domain: string
    titleAr: string
    titleEn?: string
}

type GraduateNavProgram = {
    id: string
    title: string
    titleEn: string
}

export default function DetailNav() {

    const locale = useLocale()
    const isAr = locale === "ar"
    const localeKey: "ar" | "en" = isAr ? "ar" : "en"

    const [departmentItems, setDepartmentItems] = React.useState<DepartmentNavItem[]>([])
    const [graduatePrograms, setGraduatePrograms] = React.useState<GraduateNavProgram[]>([])

    const departmentLinks = React.useMemo<DropdownLink[]>(() => {
        return departmentItems.map((d) => ({
            title: localeKey === "en" ? (d.titleEn ?? d.titleAr) : d.titleAr,
            href: `/main/department/${d.domain}`,
        }))
    }, [departmentItems, localeKey])

    const graduateStudyLinks = React.useMemo<DropdownLink[]>(() => {
        const source: GraduateNavProgram[] =
            graduatePrograms.length > 0
                ? graduatePrograms
                : GradProgramsData.map((p) => ({
                      id: p.id,
                      title: p.title,
                      titleEn: p.titleEn,
                  }))
        return source.map((p) => ({
            title: localeKey === "en" ? p.titleEn : p.title,
            href: `/main/graduate-studies/${p.id}`,
        }))
    }, [graduatePrograms, localeKey])

    React.useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                const res = await fetch("/api/graduate-programs", { method: "GET" })
                if (!res.ok) return
                const json = (await res.json()) as {
                    ok?: boolean
                    programs?: { id: string; title: string; titleEn: string }[]
                }
                if (cancelled || !json.ok || !Array.isArray(json.programs) || json.programs.length === 0) {
                    return
                }
                setGraduatePrograms(
                    json.programs.map((p) => ({
                        id: p.id,
                        title: p.title,
                        titleEn: p.titleEn,
                    })),
                )
            } catch {
                /* keep static fallback from GradProgramsData */
            }
        }

        void load()

        return () => {
            cancelled = true
        }
    }, [])

    React.useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                const res = await fetch("/api/departments", { method: "GET" })
                if (!res.ok) {
                    return;
                }

                const json = (await res.json()) as { ok: boolean; data?: DepartmentNavItem[] };
                if (!cancelled) {
                    if (json.ok && Array.isArray(json.data)) {
                        setDepartmentItems(json.data)
                    }
                }
            } catch {
            } finally {
            }
        }

        void load()

        return () => {
            cancelled = true
        }
    }, [])

    const CATEGORIES = React.useMemo<NavCategory[]>(
        () => {
            const categoriesByLocale: Record<"ar" | "en", NavCategory[]> = {
                ar: [
                    {
                        label: "نبذة عنا",
                        title: "نبذة عن كلية البريمي الجامعية",
                        href: "/main/about",
                        description: "تُعد كلية البريمي الجامعية واحدة من أبرز المؤسسات التعليمية في سلطنة عُمان، حيث تلتزم بمعايير الجودة العالية في التعليم والبحث العلمي. نسعى لتقديم بيئة تعليمية متميزة تُساهم في إعداد جيل من الخريجين المؤهلين والقادرين على المشاركة الفاعلة في التنمية الشاملة للمجتمع من خلال برامج أكاديمية متنوعة ومتطورة تواكب متطلبات سوق العمل المحلي والإقليمي",
                        links: [
                            { title: "عن الكلية", href: "/main/about#about-institution" },
                            {
                                title: "رسالة ترحيبية",
                                href: "/main/about#welcome-message",
                                submenu: [
                                    { title: "رسالة رئيس مجلس الإدارة", href: "/main/about#board-chairman-message" },
                                    { title: "رسالة عميد الكلية", href: "/main/about#dean-message" },
                                ],
                            },
                            { title: "القيم والرؤية والرسالة", href: "/main/about#vision-mission" },
                            {
                                title: "المجالس",
                                href: "/main/about/councils",
                                submenu: [
                                    { title: "مجلس الإدارة", href: "/main/about/councils/board-directors" },
                                    { title: "مجلس الأمناء", href: "/main/about/councils/board-trustees" },
                                    { title: "المجلس الاستشاري من القطاع الصناعي", href: "/main/about/councils/advisory-council" },
                                    { title: "مجلس الكلية", href: "/main/about/councils/college-council" },
                                ],
                            },
                            { title: "سمات الخريجين", href: "/main/about#graduate-attributes" },
                            { title: "الارتباط الأكاديمي", href: "/main/about#academic-affiliation" },
                            { title: "دائرة ضمان الجودة", href: "/main/about#quality-assurance" },
                            { title: "الهيكل التنظيمي", href: "/main/about#organizational-structure" },
                            { title: "الخطط والتقارير", href: "/main/plans-reports" },
                            { title: "الشركاء", href: "/main/about#partners" },
                            { title: "الوظائف", href: "/main/careers" },
                            { title: "الصحة والسلامة", href: "/main/about#health-safety" },
                            { title: "خارطة الجامعة", href: "/main/about#campus-map" },
                        ],
                    },
                    {
                        label: "الشؤون الأكادمية",
                        title: "الشؤون الاكاديمية",
                        href: "/main/department",
                        description: "تضم كلية البريمي الجامعية مجموعة متنوعة من الأقسام الأكاديمية المتخصصة التي تقدم برامج تعليمية عالية الجودة في مختلف المجالات، بالإضافة إلى الدراسات العليا والبرنامج التأسيسي والبحث العلمي والمكتبة.",
                        links: [
                            {
                                title: "الأقسام الأكاديمية",
                                href: "/main/department",
                                submenu: departmentLinks,
                            },
                            {
                                title: "الدراسات العليا",
                                href: "/main/graduate-studies",
                                submenu: graduateStudyLinks,
                            },
                            { title: "البرنامج التأسيسي العام", href: "/main/foundation-program" },
                            { title: "وحدة المتطلبات العامة", href: "/main/general-requirements" },
                            {
                                title: "البحث العلمي",
                                href: "/main/research",
                                submenu: [
                                    { title: "ركائز البحث العلمي", href: "/main/research-pillars" },
                                    { title: "التطوير الوظيفي", href: "/main/research/professional-development" },
                                    { title: "المساعدات المالية والمنح", href: "/main/research/research-funding" },
                                    { title: "خدمات الاستشارات والبحث", href: "/main/research/consultancy-research" },
                                    { title: "المنشورات", href: "/main/research/publications" },
                                    { title: "المشاريع", href: "/main/research/projects" },
                                    { title: "بوابة عمان البحثية - TRC", href: "/main/research/trc-portal" },
                                ],
                            },
                            {
                                title: "المكتبة",
                                href: "/main/library",
                                submenu: [
                                    { title: "Library index (Liberty)", href: "/main/library" },
                                    { title: "المصادر الإلكترونية (مصادر)", href: "/main/library/electronic-resources" },
                                    { title: "خدمات المكتبة", href: "/main/library/library-services" },
                                    { title: "أدوات الذكاء الاصطناعي", href: "/main/library/ai-tools" },
                                    { title: "إجراءات وسياسات المكتبة", href: "/main/library/library-policies" },
                                ],
                            },
                        ],
                    },
                    {
                        label: "القبول والتسجيل",
                        title: "القبول والتسجيل",
                        href: "/main/admission",
                        description: "مرحباً بك في كلية البريمي الجامعية. نوفر لك كافة المعلومات والخدمات المتعلقة بالقبول والتسجيل، بما في ذلك شروط القبول، المنح الدراسية، والرسوم الدراسية.",
                        links: [
                            { title: "التقديم الآن", href: "/main/admission" },
                            { title: "دليل الطالب", href: "/main/admission-criteria#student-handbook" },
                            { title: "أسس ومعايير القبول", href: "/main/admission-criteria" },
                            { title: "قبول الطلبة الدوليين", href: "/main/students/international" },
                            {
                                title: "الرسوم الدراسية والمنح والمساعدات المالية (الخصومات)",
                                href: "/main/students/international/tuition-fees",
                            },
                            { title: "إجراءات الابتعاث", href: "/main/students/international/scholarship-procedures" },
                        ],
                    },
                    {
                        label: "الأخبار والفعاليات",
                        title: "الأخبار والفعاليات",
                        href: "/main/news",
                        description: "تابع آخر أخبار وفعاليات كلية البريمي الجامعية، واطلع على مجلة أضواء وألبوم الصور، وتواصل معنا عبر وسائل التواصل الاجتماعي.",
                        links: [
                            { title: "الأخبار", href: "/main/news" },
                            { title: "الفعاليات", href: "/main/news#events" },
                            { title: "مؤتمر GITBPDE 2027", href: "/main/conference" },
                            { title: "مجلة أضواء", href: "/main/magazine" },
                            { title: "ألبوم الصور", href: "/main/gallery" },
                            { title: "وسائل التواصل الاجتماعي", href: "/main/social-media" },
                        ],
                    },
                    {
                        label: "الطلاب",
                        title: "الطلاب",
                        href: "/main/students",
                        description: "اكتشف خدماتنا الطلابية وأنشطتنا، واستفد من إرشادنا الأكاديمي، واستخدم بوابة الطالب، واطلع على خريجي الكلية.",
                        links: [
                            {
                                title: "الطلبة",
                                href: "/main/students#overview",
                                submenu: [
                                    { title: "الطلبة", href: "/main/students#overview" },
                                    { title: "دائرة شؤون الطلبة", href: "/main/students#student-affairs" },
                                    { title: "السياسات والإجراءات", href: "/main/students#policies" },
                                    { title: "الأنشطة الطلابية", href: "/main/students#activities" },
                                    { title: "سكن الطالبات", href: "/main/students#housing" },
                                    { title: "عيادة الكلية", href: "/main/students#clinic" },
                                    { title: "الإرشاد الطلابي", href: "/main/students#student-guidance" },
                                    { title: "الإرشاد الأكاديمي", href: "/main/students#academic-advising" },
                                    { title: "الطلبة الدوليين", href: "/main/students#international" },
                                    { title: "المجلس الاستشاري الطلبي", href: "/main/students#advisory-council" },
                                    { title: "تكنولوجيا التعليم والتعلم", href: "/main/students#technology" },
                                    { title: "البوابة الإلكترونية", href: "/main/students#portal" },
                                ],
                            },
                            { title: "التوجيه الوظيفي وشؤون الخريجين", href: "/main/career-guidance" },
                            { title: "حياة الطالب في كلية البريمي", href: "/main/student-life" },
                        ],
                    },
                    {
                        label: "معهد التدريب",
                        title: "معهد التدريب",
                        href: "/main/training-institute",
                        // description: "اكتشف البرامج التدريبية والدورات القصيرة ودورات IELTS وخيارات التسجيل.",
                        // links: [
                        //     { title: "البرامج التدريبية", href: "/main/training-institute" },
                        //     { title: "الدورات القصيرة", href: "/main/training-institute#courses" },
                        //     { title: "دورة IELTS", href: "/main/training-institute#ielts" },
                        //     { title: "التسجيل في الدورات", href: "/main/training-institute#registration" },
                        // ],
                    },
                ],
                en: [
                    {
                        label: "About",
                        title: "About Al Buraimi University College",
                        href: "/about/main",
                        description: "Al Buraimi University College is one of the leading higher education institutions in the Sultanate of Oman. We are committed to high standards of quality in teaching and research, and we strive to provide an outstanding learning environment that prepares graduates to contribute effectively to society through diverse and modern academic programs aligned with local and regional market needs.",
                        links: [
                            { title: "About the College", href: "/main/about#about-institution" },
                            {
                                title: "Welcome Message",
                                href: "/main/about#welcome-message",
                                submenu: [
                                    { title: "Chairman’s Message", href: "/main/about#board-chairman-message" },
                                    { title: "Dean’s Message", href: "/main/about#dean-message" },
                                ],
                            },
                            { title: "Values, Vision & Mission", href: "/main/about#vision-mission" },
                            {
                                title: "Councils",
                                href: "/main/about/councils",
                                submenu: [
                                    { title: "Board of Directors", href: "/main/about/councils/board-directors" },
                                    { title: "Board of Trustees", href: "/main/about/councils/board-trustees" },
                                    { title: "Industrial Advisory Council", href: "/main/about/councils/advisory-council" },
                                    { title: "College Council", href: "/main/about/councils/college-council" },
                                ],
                            },
                            { title: "Graduate Attributes", href: "/main/about#graduate-attributes" },
                            { title: "Academic Affiliation", href: "/main/about#academic-affiliation" },
                            { title: "Quality Assurance", href: "/main/about#quality-assurance" },
                            { title: "Organizational Structure", href: "/main/about#organizational-structure" },
                            { title: "Plans & Reports", href: "/main/plans-reports" },
                            { title: "Partners", href: "/main/about#partners" },
                            { title: "Careers", href: "/main/careers" },
                            { title: "Health & Safety", href: "/main/about#health-safety" },
                            { title: "BUC Campus Map", href: "/main/about#campus-map" },
                        ],
                    },
                    {
                        label: "Academics",
                        title: "Academics",
                        href: "/main/department",
                        description: "Al Buraimi University College includes a variety of specialized academic departments that offer high-quality educational programs across different fields, in addition to graduate studies, the foundation program, research, and the library.",
                        links: [
                            {
                                title: "Academic Departments",
                                href: "/main/department",
                                submenu: departmentLinks,
                            },
                            {
                                title: "Graduate Studies",
                                href: "/main/graduate-studies",
                                submenu: graduateStudyLinks,
                            },
                            { title: "General Foundation Program", href: "/main/foundation-program" },
                            { title: "General Requirements Unit", href: "/main/general-requirements" },
                            {
                                title: "Research",
                                href: "/main/research",
                                submenu: [
                                    { title: "Research Pillars", href: "/main/research-pillars" },
                                    { title: "Professional Development", href: "/main/research/professional-development" },
                                    { title: "Financial Support & Grants", href: "/main/research/research-funding" },
                                    { title: "Consultancy & Research Service", href: "/main/research/consultancy-research" },
                                    { title: "Publications", href: "/main/research/publications" },
                                    { title: "Projects", href: "/main/research/projects" },
                                    { title: "Oman Research Portal - TRC", href: "/main/research/trc-portal" },
                                ],
                            },
                            {
                                title: "Library",
                                href: "/main/library",
                                submenu: [
                                    { title: "Library index (Liberty)", href: "/main/library" },
                                    { title: "Electronic Resources (Masader)", href: "/main/library/electronic-resources" },
                                    { title: "Library Services", href: "/main/library/library-services" },
                                    { title: "AI Tools", href: "/main/library/ai-tools" },
                                    { title: "Library Policies & Procedures", href: "/main/library/library-policies" },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Admissions",
                        title: "Admissions",
                        href: "/main/admission",
                        description: "Welcome to Al Buraimi University College. We provide information and services related to admissions and registration, including admission requirements, scholarships, and tuition fees.",
                        links: [
                            { title: "Apply Now", href: "/main/admission" },
                            { title: "Student Handbook", href: "/main/admission-criteria#student-handbook" },
                            { title: "Admission Criteria", href: "/main/admission-criteria" },
                            { title: "International Students", href: "/main/students/international" },
                            {
                                title: "Tuition Fees, Scholarships & Financial Aid (Discounts)",
                                href: "/main/students/international/tuition-fees",
                            },
                            { title: "Scholarship Procedures", href: "/main/students/international/scholarship-procedures" },
                        ],
                    },
                    {
                        label: "News & Events",
                        title: "News & Events",
                        href: "/main/news",
                        description: "Follow the latest news and events at Al Buraimi University College. Explore the magazine, photo gallery, and connect with us through social media.",
                        links: [
                            { title: "News", href: "/main/news" },
                            { title: "Events", href: "/main/news#events" },
                            { title: "GITBPDE 2027 Conference", href: "/main/conference" },
                            { title: "Lights Magazine", href: "/main/magazine" },
                            { title: "Photo Gallery", href: "/main/gallery" },
                            { title: "Social Media", href: "/main/social-media" },
                        ],
                    },
                    {
                        label: "Students",
                        title: "Students",
                        href: "/main/students",
                        description: "Discover student services and activities, benefit from academic guidance, access the student portal, and learn more about alumni support.",
                        links: [
                            {
                                title: "Students",
                                href: "/main/students#overview",
                                submenu: [
                                    { title: "Students Overview", href: "/main/students#overview" },
                                    { title: "Student Affairs Department", href: "/main/students#student-affairs" },
                                    { title: "Policies & Procedures", href: "/main/students#policies" },
                                    { title: "Student Activities", href: "/main/students#activities" },
                                    { title: "Female Students Housing", href: "/main/students#housing" },
                                    { title: "College Clinic", href: "/main/students#clinic" },
                                    { title: "Student Guidance", href: "/main/students#student-guidance" },
                                    { title: "Academic Advising", href: "/main/students#academic-advising" },
                                    { title: "International Students", href: "/main/students#international" },
                                    { title: "Student Advisory Council", href: "/main/students#advisory-council" },
                                    { title: "Education Technology", href: "/main/students#technology" },
                                    { title: "Electronic Portal", href: "/main/students#portal" },
                                ],
                            },
                            { title: "Career Guidance & Alumni Affairs", href: "/main/career-guidance" },
                            { title: "Student Life at Al Buraimi University College", href: "/main/student-life" },
                        ],
                    },
                    {
                        label: "Training Institute",
                        title: "Training Institute",
                        href: "/main/training-institute",
                        // description: "Explore training programs, short courses, IELTS courses, and registration options.",
                        // links: [
                        //     { title: "Training Programs", href: "/main/training-institute" },
                        //     { title: "Short Courses", href: "/main/training-institute#courses" },
                        //     { title: "IELTS Course", href: "/main/training-institute#ielts" },
                        //     { title: "Course Registration", href: "/main/training-institute#registration" },
                        // ],
                    },
                ],
            }

            return categoriesByLocale[localeKey]
        },
        [departmentLinks, graduateStudyLinks, localeKey]
    )

    const [scrolled, setScrolled] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const [activeCategory, setActiveCategory] = React.useState<NavCategory | null>(null)
    const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)



    React.useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    React.useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        }
    }, [])

    const cancelClose = React.useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }, [])

    const scheduleClose = React.useCallback(() => {
        cancelClose()
        closeTimerRef.current = setTimeout(() => {
            setActiveCategory(null)
        }, 120)
    }, [cancelClose])

    const isSolid = scrolled || hovered

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-[50px] h-[70px]  z-50 transition-colors duration-300 lg:py-2",
                isSolid ? "bg-white backdrop-blur-md shadow-sm" : "bg-transparent"
            )}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false)
                scheduleClose()
            }}
        >
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-2 sm:px-4 ">

                <Link
                    href="/"
                    className={cn(
                        "text-base font-semibold tracking-tight transition-colors",
                        isSolid ? "text-foreground" : "text-white"
                    )}
                >
                    <Image src={mobileLogo}
                        width={40} height={40}
                        className="sm:h-12 sm:w-12 
                        block lg:hidden
                        " alt="Al Buraimi University Collage" />

                    <Image src={desktopLogo}
                        width={194}
                        height={95}
                        className={cn(
                            "h-auto w-auto max-h-12 object-contain transition-all duration-300",
                            isSolid ? "brightness-75" : "",
                            "hidden lg:block"
                        )}
                        alt="Al Buraimi University Collage" />
                </Link>

                <MobileTab isSolid={isSolid} CATEGORIES={CATEGORIES} />
                <DesktopTab isSolid={isSolid} CATEGORIES={CATEGORIES}
                    cancelClose={cancelClose} setActiveCategory={setActiveCategory} activeCategory={activeCategory}
                />
            </div>

            {activeCategory ? (
                <div
                    className="sticky left-0 z-50 w-full origin-top animate-in fade-in-0 slide-in-from-top-2 duration-200"
                    style={{ top: `${DROPDOWN_TOP_PX}px` }}
                    onMouseEnter={() => {
                        cancelClose()
                        setHovered(true)
                    }}

                    onMouseLeave={() => {
                        setHovered(false)
                        scheduleClose()
                    }}
                >
                    <div className=" animate-in fade-in-0 zoom-in-95 duration-200 ">
                        <DropdownPanel category={activeCategory} />
                    </div>
                </div>
            ) : null}
        </header>
    )
}