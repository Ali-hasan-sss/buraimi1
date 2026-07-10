export const DEPARTMENTS = [
    {
        ar: "قسم تقنية المعلومات",
        en: "Information Technology Department",
    },
    {
        ar: "قسم اللغة الإنجليزية وآدابها",
        en: "English Language and Literature Department",
    },
    {
        ar: "قسم المحاسبة وإدارة الأعمال",
        en: "Business and Accounting Department",
    },
    {
        ar: "قسم البرنامج التأسيسي العام",
        en: "General Foundation Program",
    },
    {
        ar: "قسم المتطلبات العامة",
        en: "General Requirements Department",
    },
    {
        ar: "برنامج القانون",
        en: "Law Program",
    },
];

export const ACADEMIC_YEARS = [
    "2024 - 2025",
    "2023 - 2024",
    "2022 - 2023",
    "2021 - 2022",
    "2020 - 2021",
];

export function getDepartmentAr(enName: string): string {
    const dept = DEPARTMENTS.find(d => d.en === enName);
    return dept?.ar || enName;
}

export function getDepartmentEn(arName: string): string {
    const dept = DEPARTMENTS.find(d => d.ar === arName);
    return dept?.en || arName;
}
