"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { CategoryKey } from "@/types/news";

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

interface NewsDashClientProps {
    initialSearch: string;
    isAr: boolean;
    categoriesKeys: CategoryKey[];
}

export function NewsDashClient({
    initialSearch,
    isAr,
    categoriesKeys,
}: NewsDashClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const dir = isAr ? "rtl" : "ltr";

    const activeCategory = (searchParams.get("category") as CategoryKey | null) ?? "all";

    const getCategoryLabel = (key: CategoryKey) => {
        return isAr ? categoryKeyToLabel.ar[key] : categoryKeyToLabel.en[key];
    };

    const pushParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            for (const [key, value] of Object.entries(updates)) {
                if (value === null) params.delete(key);
                else params.set(key, value);
            }
            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams]
    );

    const handleCategoryChange = (key: CategoryKey) => {
        pushParams({
            category: key === "all" ? null : key,
            page: "1",
        });
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const applySearch = () => {
        const q = searchQuery.trim();
        pushParams({
            search: q ? q : null,
            page: "1",
        });
    };

    const clearSearch = () => {
        setSearchQuery("");
        pushParams({
            search: null,
            page: "1",
        });
    };

    return (
        <div dir={dir} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className={`absolute ${isAr ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-400 size-5`} />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            applySearch();
                        }}
                    >
                        <input
                            type="text"
                            placeholder={isAr ? "البحث في الأخبار..." : "Search news..."}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className={`w-full ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-lg border border-gray-200 focus:border-[#6096b4] focus:outline-none focus:ring-2 focus:ring-[#6096b4]/20 transition-all`}
                        />
                    </form>
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className={`absolute ${isAr ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={applySearch}
                    className="h-12 rounded-lg bg-[#254151] px-5 text-sm font-semibold text-white"
                >
                    {isAr ? "بحث" : "Search"}
                </button>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                    <Filter className="size-5 text-gray-400 flex-shrink-0" />
                    {categoriesKeys.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleCategoryChange(key)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${activeCategory === key
                                ? "bg-[#254151] text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {getCategoryLabel(key)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
