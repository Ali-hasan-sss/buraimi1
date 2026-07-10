"use client"
import { useMemo, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
    Home,
    Users,
    FileText,
    Scale,
    Award,
    Building2,
    Heart,
    MessageSquare,
    BookOpen,
    Globe,
    UserCheck,
    Laptop,
    Monitor,
    ChevronDown,
    ChevronLeft
} from 'lucide-react';

type MenuId =
    | 'overview'
    | 'student-affairs'
    | 'policies'
    | 'conduct-rules'
    | 'conduct-regulations'
    | 'activities'
    | 'housing'
    | 'clinic'
    | 'counseling'
    | 'academic-advising'
    | 'international'
    | 'admission-criteria'
    | 'international-acceptance'
    | 'tuition-fees'
    | 'scholarship-procedures'
    | 'student-council'
    | 'edtech'
    | 'portal';

interface SubMenuItem {
    id: MenuId;
    titleAr: string;
    titleEn: string;
    path: string;
    submenu?: SubMenuItem[];
}

interface MenuItem {
    id: MenuId;
    titleAr: string;
    titleEn: string;
    icon: ComponentType<{ className?: string }>;
    path: string;
    submenu?: SubMenuItem[];
}

interface StudentsSidebarProps {
    activeId?: MenuId;
}

const menuItems: MenuItem[] = [
    { id: 'overview', titleAr: 'نظرة عامة', titleEn: 'Overview', icon: Home, path: '/main/students' },
    { id: 'student-affairs', titleAr: 'دائرة شؤون الطلبة', titleEn: 'Student Affairs', icon: Users, path: '/main/students/affairs' },
    { id: 'policies', titleAr: 'السياسات والإجراءات', titleEn: 'Policies & Procedures', icon: FileText, path: '/main/students/policies' },
    { id: 'conduct-rules', titleAr: 'قواعد سلوك الطلبة', titleEn: 'Student Conduct Rules', icon: Scale, path: '/main/students/conduct-rules' },
    { id: 'conduct-regulations', titleAr: 'لائحة سلوك الطلبة والإجراءات التأديبية', titleEn: 'Conduct Regulations & Disciplinary Procedures', icon: FileText, path: '/main/students/conduct-regulations' },
    { id: 'activities', titleAr: 'الأنشطة الطلابية', titleEn: 'Student Activities', icon: Award, path: '/main/students/activities' },
    { id: 'housing', titleAr: 'سكن الطالبات', titleEn: 'Female Students Housing', icon: Building2, path: '/main/students/housing' },
    { id: 'clinic', titleAr: 'عيادة الكلية', titleEn: 'College Clinic', icon: Heart, path: '/main/students/clinic' },
    { id: 'counseling', titleAr: 'الإرشاد الطلابي', titleEn: 'Student Counseling', icon: MessageSquare, path: '/main/students/counseling' },
    { id: 'academic-advising', titleAr: 'الإرشاد الأكاديمي', titleEn: 'Academic Advising', icon: BookOpen, path: '/main/students/academic-advising' },
    {
        id: 'international',
        titleAr: 'قبول الطلبة الدوليين',
        titleEn: 'International Students Admission',
        icon: Globe,
        path: '/main/students/international',
        submenu: [
            { id: 'admission-criteria', titleAr: 'معايير ومتطلبات القبول', titleEn: 'Admission Criteria & Requirements', path: '/main/admission-criteria' },
            { id: 'international-acceptance', titleAr: 'قبول الطلبة الدوليين', titleEn: 'International Acceptance', path: '/main/students/international/acceptance' },
            { id: 'tuition-fees', titleAr: 'الرسوم الدراسية والمساعدات المالية (الخصومات)', titleEn: 'Tuition Fees & Financial Aid (Discounts)', path: '/main/students/international/tuition-fees' },
            { id: 'scholarship-procedures', titleAr: 'إجراءات طلبة البعثات', titleEn: 'Scholarship Students Procedures', path: '/main/students/international/scholarship-procedures' }
        ]
    },
    { id: 'student-council', titleAr: 'المجلس الاستشاري الطلابي', titleEn: 'Student Advisory Council', icon: UserCheck, path: '/main/students/student-council' },
    { id: 'edtech', titleAr: 'تكنولوجيا التعليم والتعلم', titleEn: 'Educational Technology', icon: Laptop, path: '/main/students/edtech' },
    { id: 'portal', titleAr: 'البوابة الإلكترونية', titleEn: 'Student Portal', icon: Monitor, path: '/main/students/portal' }
];

export function StudentsSidebar({ activeId }: StudentsSidebarProps) {
    const pathname = usePathname();
    const locale = useLocale();
    const isAr = locale === 'ar';

    const defaultOpenMenus = useMemo(() => {
        const set = new Set<MenuId>();
        if (pathname?.startsWith('/main/students/international') || pathname?.startsWith('/main/admission-criteria')) {
            set.add('international');
        }
        return set;
    }, [pathname]);

    const [openMenus, setOpenMenus] = useState<Set<MenuId>>(defaultOpenMenus);

    const getTitle = (item: { titleAr: string; titleEn: string }) => (isAr ? item.titleAr : item.titleEn);

    const findMenuIdByPath = (items: Array<MenuItem | SubMenuItem>, path: string | null): MenuId | null => {
        if (!path) return null;
        for (const item of items) {
            if (item.path === path) return item.id;
            if ('submenu' in item && item.submenu?.length) {
                const found = findMenuIdByPath(item.submenu, path);
                if (found) return found;
            }
        }
        return null;
    };

    const getActiveId = (): MenuId => {
        if (activeId) return activeId;

        const found = findMenuIdByPath(menuItems, pathname);
        return found ?? 'overview';
    };

    const currentActiveId = getActiveId();

    const toggleMenu = (menuId: MenuId) => {
        setOpenMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    const isMenuOpen = (menuId: MenuId) => openMenus.has(menuId);

    const isActive = (itemId: MenuId, itemPath: string, submenu?: SubMenuItem[]): boolean => {
        if (currentActiveId === itemId) return true;
        if (pathname === itemPath) return true;
        if (submenu) {
            return submenu.some(sub => isActive(sub.id, sub.path, sub.submenu));
        }
        return false;
    };

    const renderSubMenu = (items: SubMenuItem[], level: number = 1) => {
        return (
            <div className={`bg-gray-50 ${level === 1 ? 'border-r-4 border-[#c2a772]' : ''}`}>
                {items.map((subItem) => {
                    const hasSubmenu = subItem.submenu && subItem.submenu.length > 0;
                    const isOpen = hasSubmenu && isMenuOpen(subItem.id);
                    const isItemActive = isActive(subItem.id, subItem.path, subItem.submenu);

                    return (
                        <div key={subItem.id}>
                            <div className="flex items-center">
                                {hasSubmenu ? (
                                    <button
                                        onClick={() => toggleMenu(subItem.id)}
                                        className={`flex-1 flex items-center justify-between px-6 py-3 text-right transition-all border-b border-gray-200 ${level === 1 ? 'pr-8' : 'pr-12'
                                            } ${isItemActive
                                                ? 'bg-[#c2a772] text-white'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-[#6096b4]'
                                            }`}
                                    >
                                        <span className="font-semibold text-sm">{getTitle(subItem)}</span>
                                        {isOpen ? (
                                            <ChevronDown className={`size-4 flex-shrink-0 ${isItemActive ? 'text-white' : 'text-[#6096b4]'}`} />
                                        ) : (
                                            <ChevronLeft className={`size-4 flex-shrink-0 ${isItemActive ? 'text-white' : 'text-[#6096b4]'}`} />
                                        )}
                                    </button>
                                ) : (
                                    <Link
                                        href={subItem.path}
                                        className={`flex-1 flex items-center justify-between px-6 py-3 text-right transition-all border-b border-gray-200 ${level === 1 ? 'pr-8' : 'pr-12'
                                            } ${currentActiveId === subItem.id || pathname === subItem.path
                                                ? 'bg-[#c2a772] text-white'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-[#6096b4]'
                                            }`}
                                    >
                                        <span className="font-semibold text-sm">{getTitle(subItem)}</span>
                                    </Link>
                                )}
                            </div>
                            {hasSubmenu && isOpen && renderSubMenu(subItem.submenu!, level + 1)}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md sticky top-24 overflow-hidden">
                <div className="bg-[#254151] text-white p-4 text-center">
                    <h3 className="text-xl font-bold">{isAr ? 'نظرة عامة' : 'Overview'}</h3>
                </div>
                <nav className="flex flex-col">
                    {menuItems.map((item) => {
                        const hasSubmenu = item.submenu && item.submenu.length > 0;
                        const isOpen = hasSubmenu && isMenuOpen(item.id);
                        const isItemActive = isActive(item.id, item.path, item.submenu);

                        return (
                            <div key={item.id}>
                                <div className="flex items-center">
                                    {hasSubmenu ? (
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className={`flex-1 flex items-center justify-between px-6 py-4 text-right transition-all border-b border-gray-100 ${isItemActive
                                                ? 'bg-[#6096b4] text-white'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-[#6096b4]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm">{getTitle(item)}</span>
                                                {isOpen ? (
                                                    <ChevronDown className={`size-4 ${isItemActive ? 'text-white' : 'text-[#6096b4]'}`} />
                                                ) : (
                                                    <ChevronLeft className={`size-4 ${isItemActive ? 'text-white' : 'text-[#6096b4]'}`} />
                                                )}
                                            </div>
                                            <item.icon className={`size-5 flex-shrink-0 ${isItemActive ? 'text-white' : 'text-[#6096b4]'
                                                }`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.path}
                                            className={`flex-1 flex items-center justify-between px-6 py-4 text-right transition-all border-b border-gray-100 ${currentActiveId === item.id
                                                ? 'bg-[#6096b4] text-white'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-[#6096b4]'
                                                }`}
                                        >
                                            <span className="font-semibold text-sm">{getTitle(item)}</span>
                                            <item.icon className={`size-5 flex-shrink-0 ${currentActiveId === item.id ? 'text-white' : 'text-[#6096b4]'
                                                }`} />
                                        </Link>
                                    )}
                                </div>
                                {hasSubmenu && isOpen && renderSubMenu(item.submenu!)}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

export default StudentsSidebar;