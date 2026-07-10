import { EditorMember, MagazineIssue } from "@/types/magazien";

const BUC_UPLOADS = "https://buc.edu.om/wp-content/uploads";

export const editorialBoard: EditorMember[] = [
    {
        positionAr: 'الإشراف العام',
        positionEn: 'General Supervision',
        name: 'الأستاذ الدكتور ياسر فؤاد',
        email: 'dean@buc.edu.om',
    },
    {
        positionAr: 'رئيس التحرير',
        positionEn: 'Editor-in-Chief',
        name: 'الفاضلة ريمة بنت محمد البادية',
        email: 'mmdirector@buc.edu.om',
    },
    {
        positionAr: 'مدير التحرير',
        positionEn: 'Managing Editor',
        name: 'الفاضلة مشاعل بنت محمد العزانية',
        email: 'malazani@buc.edu.om',
    },
    {
        positionAr: 'التدقيق اللغوي - اللغة العربية',
        positionEn: 'Language Editing - Arabic',
        name: 'الدكتورة منار المصري',
        email: 'manar@buc.edu.om',
    },
    {
        positionAr: 'التدقيق اللغوي والترجمة - اللغة الإنجليزية',
        positionEn: 'Editing & Translation - English',
        name: 'أ. سفيان التارقي',
        email: 'sofiene@buc.edu.om',
    },
    {
        positionAr: 'تصميم وإخراج',
        positionEn: 'Design & Layout',
        name: 'الفاضلة إلهام بنت راشد العميرية',
        email: 'ealomeiri@buc.edu.om',
    },
];

export const magazineIssues: MagazineIssue[] = [
    {
        id: 7,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد السابع',
        issueNumberEn: 'Issue 7',
        coverImage: `${BUC_UPLOADS}/2025/12/Spotlights-magazine-1024x724.jpg`,
    },
    {
        id: 6,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد السادس',
        issueNumberEn: 'Issue 6',
        coverImage: `${BUC_UPLOADS}/2025/03/spotlight_6-1024x725.jpg`,
        fileUrl: `${BUC_UPLOADS}/2025/03/SpotLights-6th-Issue.pdf`,
        fileName: 'SpotLights-6th-Issue.pdf',
    },
    {
        id: 5,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد الخامس',
        issueNumberEn: 'Issue 5',
        coverImage: `${BUC_UPLOADS}/2024/11/5th-Issue-Cover-1024x725.jpg`,
        fileUrl: `${BUC_UPLOADS}/2024/11/SpotLights-5th-Issue.pdf`,
        fileName: 'SpotLights-5th-Issue.pdf',
    },
    {
        id: 4,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد الرابع',
        issueNumberEn: 'Issue 4',
        coverImage: `${BUC_UPLOADS}/2024/11/4th-Issue-Cover-1024x723.jpg`,
        fileUrl: `${BUC_UPLOADS}/2024/11/Spotlights-4th-Issue.pdf`,
        fileName: 'Spotlights-4th-Issue.pdf',
    },
    {
        id: 3,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد الثالث',
        issueNumberEn: 'Issue 3',
        coverImage: `${BUC_UPLOADS}/2024/11/3rd-Issue-Cover-1024x724.jpg`,
        fileUrl: `${BUC_UPLOADS}/2024/11/Spotlights-3rd-Issue.pdf`,
        fileName: 'Spotlights-3rd-Issue.pdf',
    },
    {
        id: 2,
        titleAr: 'أضواء',
        titleEn: 'Adwaa',
        issueNumberAr: 'العدد الثاني',
        issueNumberEn: 'Issue 2',
        coverImage: `${BUC_UPLOADS}/2024/11/2nd-Issue-Cover-1024x718.jpg`,
        fileUrl: `${BUC_UPLOADS}/2024/11/Spotlights-2nd-Issue.pdf`,
        fileName: 'Spotlights-2nd-Issue.pdf',
    },
];
