// Department

export type HeadMessageDoc = {
    message?: { __html?: string };
    mail?: string;
    phone?: string;
    writer?: string;
};

export type ProgramLevelDoc = {
    id: string;
    label: string;
    credits: string;
};

export type ProgramDoc = {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    levels: ProgramLevelDoc[];
    objective?: { title: string; data: string[] };
    studyPlan?: unknown[];
};

export type facultyMembers = {
    email: string
    name: string
    phone: string
    position: string
    title: string
    image?: string
}
export type DepartmentDoc = {
    _id: unknown;
    domain: string;
    titleAr: string;
    titleEn: string;
    subTitleAr: string;
    subTitleEn: string;
    /** صورة القسم في كاروسيل الصفحة الرئيسية */
    showcaseImage?: string;
    headMessage?: HeadMessageDoc;
    programs?: ProgramDoc[];
    facultyMembers?: facultyMembers[];
};
