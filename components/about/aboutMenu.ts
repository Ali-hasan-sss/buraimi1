import {
    Award,
    BookOpen,
    Briefcase,
    Building2,
    CheckCircle2,
    Clipboard,
    FileText,
    GraduationCap,
    Link2,
    Mail,
    MapPin,
    Shield,
    Target,
    UserCheck,
    Users,
} from 'lucide-react';

import type { ElementType } from 'react';

export interface MenuItem {
    id: string;
    title: string;
    icon: ElementType;
    hasSubMenu?: boolean;
    subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    { id: 'about', title: 'عن الكلية', icon: Building2 },
    { id: 'board-chairman-message', title: 'رسالة رئيس مجلس الإدارة', icon: Mail },
    { id: 'dean-message', title: 'رسالة عميد الكلية', icon: Mail },
    { id: 'vision-mission', title: 'الرؤية والرسالة والقيم', icon: Target },
    {
        id: 'councils',
        title: 'المجالس',
        icon: Users,
        hasSubMenu: true,
        subItems: [
            { id: 'board-directors', title: 'مجلس الإدارة', icon: Briefcase },
            { id: 'board-trustees', title: 'مجلس الأمناء', icon: Shield },
            { id: 'advisory-council', title: 'المجلس الاستشاري من القطاع الصناعي', icon: Users },
            { id: 'college-council', title: 'مجلس الكلية', icon: GraduationCap },
        ],
    },
    { id: 'graduate-attributes', title: 'سمات الخريجين', icon: Award },
    { id: 'academic-affiliation', title: 'الارتباط الأكاديمي', icon: Link2 },
    {
        id: 'quality-assurance',
        title: 'دائرة ضمان الجودة',
        icon: CheckCircle2,
        hasSubMenu: true,
        subItems: [
            { id: 'quality-assurance-main', title: 'عن الدائرة', icon: Award },
            { id: 'quality-calendar', title: 'QUALITY ASSURANCE CALENDAR', icon: Clipboard },
            { id: 'policies-by-department', title: 'السياسات حسب الدوائر', icon: BookOpen },
        ],
    },
    { id: 'organizational-structure', title: 'الهيكل التنظيمي', icon: FileText },
    { id: 'partnerships', title: 'الجهات الشريكة', icon: UserCheck },
    { id: 'safety-security', title: 'الأمن والسلامة', icon: Shield },
    { id: 'jobs', title: 'الوظائف', icon: Briefcase },
    { id: 'campus-map', title: 'خارطة الحرم الجامعي', icon: MapPin },
];
