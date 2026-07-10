export interface Event {
    id: number;
    date: string;
    titleAr: string;
    titleEn: string;
    category: 'upcoming' | 'past';
    fullDate: string;
}

export interface ResearchItem {
    id: number;
    date: string;
    titleAr: string;
    titleEn: string;
    logo?: string;
}