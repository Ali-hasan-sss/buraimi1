export type TuitionProgram = {
    programAr: string;
    programEn: string;
    admission: string;
    creditHour: string;
};

export type ScholarshipItem = {
    id: number;
    titleAr: string;
    titleEn: string;
    percentage: string;
    color: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gray';
};
