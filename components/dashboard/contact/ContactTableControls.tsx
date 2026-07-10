"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactTableControls({ initialSearch }: { initialSearch: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(initialSearch);

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            applySearch();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search by name, title, or position..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:border-[#6096b4] focus:outline-none focus:ring-2 focus:ring-[#6096b4]/20 transition-all"
                        />
                    </form>

                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                <Button type="button" className="h-12" onClick={applySearch}>
                    Search
                </Button>
            </div>
        </div>
    );
}
