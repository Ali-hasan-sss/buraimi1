export interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    featured?: boolean;
    readTime: string;
}

export type NewsCategoryKey = 'events' | 'academic' | 'research' | 'partnerships';

export type CategoryKey = 'all' | NewsCategoryKey;

export interface LocalizedNewsItem {
    id: number;
    name: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    date: string;
    category: NewsCategoryKey;
    image: string;
    featured: boolean;
    readTime: number;
}


export interface NewsItemFromAPI {
    id: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    date: string;
    category: string;
    image: string;
    readTime: number;
    featured: boolean;
    link: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    loadedCount: number;
}
