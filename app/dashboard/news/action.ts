"use server"

import { CategoryKey, NewsItemFromAPI } from "@/types/news";

export async function fetchNews(
    page: number,
    category: string,
    locale: string,
    limit: number,
    search?: string
): Promise<{
    data: NewsItemFromAPI[];
    meta: { page: number; limit: number; total: number; hasMore: boolean; loadedCount: number, featured: number } | null;
}> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const catParam = category !== "all" ? `&category=${category}` : "";
    const searchParam = search?.trim() ? `&search=${encodeURIComponent(search.trim())}` : "";


    // console.log(limit, "from acction");
    const res = await fetch(
        `${baseUrl}/api/news?page=${page}&limit=${limit}${catParam}${searchParam}`,
        {
            cache: "no-store",
            headers: {
                "Accept-Language": locale,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    const json = await res.json();
    return {
        data: json.data || [],
        meta: json.meta || null,
    };
}
