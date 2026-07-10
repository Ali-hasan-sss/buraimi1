
export type Tab = 'public' | 'private';

export type Course = {
    code: string;
    titleAr: string;
    titleEn: string;
    credits: number;
    times?: number;
};

export type ProgramInfo = {
    titleAr: string;
    titleEn: string;
    affiliationAr: string;
    affiliationEn: string;
    durationAr: string;
    durationEn: string;
    totalCreditsAr: string;
    totalCreditsEn: string;
    courseCreditsAr: string;
    courseCreditsEn: string;
    thesisCreditsAr: string;
    thesisCreditsEn: string;
    studyModeAr: string;
    studyModeEn: string;
};
