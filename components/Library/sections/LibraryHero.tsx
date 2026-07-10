"use client";

import { Search } from "lucide-react";
import type { SearchTab } from "@/components/Library/LibraryPageClient";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type Props = {
    activeTab: SearchTab;
    onChangeTab: (tab: SearchTab) => void;
    searchQuery: string;
    onChangeSearchQuery: (value: string) => void;
    onSubmitBasicSearch: () => void;
};

export default function LibraryHero({
    activeTab,
    onChangeTab,
    searchQuery,
    onChangeSearchQuery,
    onSubmitBasicSearch
}: Props) {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "كلية البريمي الجامعية",
            "login": "تسجيل الدخول",
            "tabs": {
                "basic": "البحث الأساسي",
                "advanced": "البحث المتقدم",
                "federated": "البحث الموحد",
                "browse": "التصفح حسب..."
            },
            "tabSubtitles": {
                "basic": "Basic search",
                "advanced": "Advanced search",
                "federated": "Federated search",
                "browse": "Browse by..."
            },
            "search": {
                "placeholder": "اكتب كلمات البحث هنا ...",
                "fields": {
                    "word": "كلمة",
                    "title": "العنوان",
                    "author": "المؤلف",
                    "subject": "الموضوع"
                }
            }
        },
        "en": {
            "title": "Al Buraimi University College",
            "login": "Login",
            "tabs": {
                "basic": "Basic search",
                "advanced": "Advanced search",
                "federated": "Federated search",
                "browse": "Browse by..."
            },
            "tabSubtitles": {
                "basic": "بحث أساسي",
                "advanced": "بحث متقدم",
                "federated": "بحث موحد",
                "browse": "تصفح"
            },
            "search": {
                "placeholder": "Enter your search here ...",
                "fields": {
                    "word": "Word",
                    "title": "Title",
                    "author": "Author",
                    "subject": "Subject"
                }
            }
        }
    } as const;

    const content = t[locale] ?? t["en"];

    return (
        <section className="relative bg-gradient-to-r from-[#254151]/95 via-[#6096b4]/90 to-[#254151]/95 py-16 sm:py-24">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container relative z-10 mx-auto max-w-5xl px-3 sm:px-4">
                <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
                    <h1 className="text-lg font-bold text-white sm:text-3xl">
                        {content.title}
                    </h1>
                    <a
                        href="#login"
                        className="rounded-lg bg-[#00a7e1] px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#0090c4] sm:px-6 sm:py-3"
                    >
                        {content.login}
                    </a>
                </div>

                <div className="overflow-hidden rounded-t-lg bg-white">
                    <div className="grid grid-cols-2 border-b-2 border-gray-200 sm:flex">
                        <button
                            type="button"
                            onClick={() => onChangeTab("basic")}
                            className={`px-4 py-3 text-sm font-bold transition-all sm:flex-1 sm:px-6 sm:py-4 ${activeTab === "basic" ? "bg-[#00a7e1] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {content.tabs.basic}
                            <span className="mt-1 block text-xs opacity-90 sm:text-sm">{content.tabSubtitles.basic}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onChangeTab("advanced")}
                            className={`px-4 py-3 text-sm font-bold transition-all sm:flex-1 sm:px-6 sm:py-4 ${activeTab === "advanced" ? "bg-[#00a7e1] text-white" : "bg-gray-600 text-white hover:bg-gray-700"
                                }`}
                        >
                            {content.tabs.advanced}
                            <span className="mt-1 block text-xs opacity-90 sm:text-sm">{content.tabSubtitles.advanced}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onChangeTab("federated")}
                            className={`px-4 py-3 text-sm font-bold transition-all sm:flex-1 sm:px-6 sm:py-4 ${activeTab === "federated" ? "bg-[#00a7e1] text-white" : "bg-gray-600 text-white hover:bg-gray-700"
                                }`}
                        >
                            {content.tabs.federated}
                            <span className="mt-1 block text-xs opacity-90 sm:text-sm">{content.tabSubtitles.federated}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onChangeTab("browse")}
                            className={`px-4 py-3 text-sm font-bold transition-all sm:flex-1 sm:px-6 sm:py-4 ${activeTab === "browse" ? "bg-[#00a7e1] text-white" : "bg-gray-600 text-white hover:bg-gray-700"
                                }`}
                        >
                            {content.tabs.browse}
                            <span className="mt-1 block text-xs opacity-90 sm:text-sm">{content.tabSubtitles.browse}</span>
                        </button>
                    </div>

                    <div className="bg-white p-4 sm:p-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                            <select className="rounded-lg border-2 border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base">
                                <option>{content.search.fields.word}</option>
                                <option>{content.search.fields.title}</option>
                                <option>{content.search.fields.author}</option>
                                <option>{content.search.fields.subject}</option>
                            </select>

                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder={content.search.placeholder}
                                    value={searchQuery}
                                    onChange={(e) => onChangeSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 pe-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-6 sm:text-base"
                                />
                                <button
                                    type="button"
                                    onClick={onSubmitBasicSearch}
                                    className={`absolute 
                                         ${locale === "en" ? "right-2" : "left-2"}
                                        top-2/5  transform-[translateY(-50%)] rounded-lg bg-[#00a7e1] p-2 text-white transition-all hover:bg-[#0090c4]`}
                                >
                                    <Search className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
