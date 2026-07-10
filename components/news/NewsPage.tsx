"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Search, Award, Users, Loader2 } from "lucide-react";
import NewsHero from "@/components/news/NewsHero";
import { useLocale } from "next-intl";
import NewsCard from "@/components/news/NewsCard";
import { CategoryKey, NewsItemFromAPI, PaginationMeta } from "@/types/news";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}


const categoriesKeys: CategoryKey[] = [
    "all",
    "events",
    "academic",
    "research",
    "partnerships",
];

const categoryKeyToLabel = {
    ar: {
        all: "الكل",
        events: "فعاليات",
        academic: "أكاديمي",
        research: "بحث علمي",
        partnerships: "شراكات",
    },
    en: {
        all: "All",
        events: "Events",
        academic: "Academic",
        research: "Research",
        partnerships: "Partnerships",
    },
} as const;

function getCategoryLabel(key: CategoryKey, isAr: boolean): string {
    return isAr ? categoryKeyToLabel.ar[key] : categoryKeyToLabel.en[key];
}

export default function NewsPage() {
    const locale = useLocale();
    const isAr = locale === "ar";

    const [news, setNews] = useState<NewsItemFromAPI[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [selectedCategoryKey, setSelectedCategoryKey] =
        useState<CategoryKey>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Check if currently searching (typing or API loading)
    const isSearching = searchQuery !== debouncedSearch || (loading && debouncedSearch);

    const fetchNews = useCallback(
        async (pageNum: number, append = false, categoryKey: CategoryKey = "all", searchQueryParam = "") => {
            setLoading(true);
            try {
                const catParam = categoryKey !== "all" ? `&category=${categoryKey}` : "";
                const searchParam = searchQueryParam.trim() ? `&search=${encodeURIComponent(searchQueryParam.trim())}` : "";
                const res = await fetch(
                    `/api/news?page=${pageNum}&limit=5${catParam}${searchParam}`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                if (json.ok) {
                    if (append) {
                        setNews((prev) => [...prev, ...json.data]);
                    } else {
                        setNews(json.data);
                    }
                    setMeta(json.meta);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
                setInitialLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        setPage(1);
        fetchNews(1, false, selectedCategoryKey, debouncedSearch);
    }, [fetchNews, selectedCategoryKey, debouncedSearch]);

    const loadMore = () => {
        if (meta?.hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchNews(nextPage, true, selectedCategoryKey, debouncedSearch);
        }
    };

    const newsData = useMemo(() => {
        const categoryLabels = {
            ar: {
                events: "فعاليات",
                academic: "أكاديمي",
                research: "بحث علمي",
                partnerships: "شراكات",
            },
            en: {
                events: "Events",
                academic: "Academic",
                research: "Research",
                partnerships: "Partnerships",
            },
        };
        return news.map((n) => ({
            id: parseInt(n.id, 10),
            title: isAr ? n.titleAr : n.titleEn,
            excerpt: isAr ? n.excerptAr : n.excerptEn,
            date: n.date,
            category: isAr
                ? categoryLabels.ar[n.category as keyof typeof categoryLabels.ar] ||
                n.category
                : categoryLabels.en[n.category as keyof typeof categoryLabels.en] ||
                n.category,
            image: n.image,
            featured: n.featured,
            readTime: isAr ? `${n.readTime} دقائق` : `${n.readTime} min`,
        }));
    }, [news, isAr]);

    const featuredNews = useMemo(
        () => newsData.filter((news) => news.featured),
        [newsData]
    );

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <Loader2 className="size-12 animate-spin text-[#6096b4]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <NewsHero />
            <div className="container mx-auto px-4 py-12">
                {/* Search and Filters */}
                <div className="mb-12">
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="relative">
                            <Search className={`absolute right-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${isSearching ? 'text-[#6096b4]' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder={isAr ? "ابحث في الأخبار..." : "Search news..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pr-12 pl-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#6096b4] focus:outline-none text-lg transition-colors"
                            />
                            {isSearching && (
                                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 size-5 animate-spin text-[#6096b4]" />
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="grid grid-cols-2 sm:flex flex-wrap justify-center gap-3">
                        {categoriesKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategoryKey(key)}
                                className={`sm:px-6 sm:py-3 rounded-xl font-bold transition-all duration-300 px-2 py-1 ${selectedCategoryKey === key
                                    ? "bg-gradient-to-l from-[#254151] to-[#2d5263] text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#6096b4]"
                                    }`}
                            >
                                {getCategoryLabel(key, isAr)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured News */}
                {selectedCategoryKey === "all" && featuredNews.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Award className="size-8 text-[#c2a772]" />
                            <h2 className="text-3xl font-bold text-[#254151]">
                                {isAr ? "الأخبار المميزة" : "Featured News"}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredNews.map((news, index) => (
                                <NewsCard news={news} key={index} index={index} isAr={isAr} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All News Grid */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <Users className="size-8 text-[#6096b4]" />
                        <h2 className="text-3xl font-bold text-[#254151]">
                            {isAr ? "جميع الأخبار" : "All News"}
                        </h2>
                    </div>

                    {newsData.length === 0 && !loading ? (
                        <div className="text-center py-16">
                            <p className="text-2xl text-gray-400">
                                {isAr ? "لا توجد أخبار مطابقة للبحث" : "No matching news found"}
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsData.map((news, index) => (
                                <NewsCard news={news} key={index} index={index} isAr={isAr} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {meta?.hasMore && (
                    <div className="text-center">
                        <button
                            onClick={loadMore}
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-l from-[#254151] to-[#2d5263] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    {isAr ? "جاري التحميل..." : "Loading..."}
                                </>
                            ) : (
                                <>{isAr ? "تحميل المزيد من الأخبار" : "Load more news"}</>
                            )}
                        </button>
                    </div>
                )}

                {/* Meta Info */}
                {meta && (
                    <div className="text-center mt-4 text-gray-500 text-sm">
                        {isAr
                            ? `عرض ${meta.loadedCount} من ${meta.total} خبر`
                            : `Showing ${meta.loadedCount} of ${meta.total} news items`}
                    </div>
                )}
            </div>
        </div>
    );
}
