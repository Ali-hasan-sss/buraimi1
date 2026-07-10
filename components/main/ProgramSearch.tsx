"use client"
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

export default function ProgramSearch() {

    const locale = useLocale()
    const isAr = locale === "ar"
    const localeKey: "ar" | "en" = isAr ? "ar" : "en"

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('all');

    const t = useMemo(() => {
        const byLocale = {
            ar: {
                title: "ابحث عن البرنامج",
                searchButton: "البحث",
                searchLabel: "ابحث عن البرنامج",
                searchPlaceholder: "ابحث عن برنامج...",
                colleges: {
                    all: "جميع الأقسام",
                    engineering: "قسم الهندسة",
                    business: "قسم إدارة الأعمال",
                    law: "قسم الحقوق",
                },
                filters: {
                    bachelor: "البكالوريوس",
                    master: "الدراسات العليا - برامج الماجستير",
                    diploma: "الدبلوم العالي",
                    phd: "الدراسات العليا - برامج الدكتوراه",
                },
                filterApplied: (count: number) => `${count} فلتر مُطبق`,
                searchingFor: "تبحث عن:",
                clearAll: "مسح جميع الفلاتر",
            },
            en: {
                title: "Search for a Program",
                searchButton: "Search",
                searchLabel: "Search for a program",
                searchPlaceholder: "Search for a program...",
                colleges: {
                    all: "All departments",
                    engineering: "Engineering Department",
                    business: "Business Administration Department",
                    law: "Law Department",
                },
                filters: {
                    bachelor: "Bachelor's",
                    master: "Graduate Studies - Master's Programs",
                    diploma: "Higher Diploma",
                    phd: "Graduate Studies - PhD Programs",
                },
                filterApplied: (count: number) => `${count} filter${count === 1 ? "" : "s"} applied`,
                searchingFor: "Searching for:",
                clearAll: "Clear all filters",
            },
        } as const

        return byLocale[localeKey]
    }, [localeKey])

    const filters = useMemo(() => {
        return [
            { id: 'bachelor', label: t.filters.bachelor },
            { id: 'master', label: t.filters.master },
            { id: 'diploma', label: t.filters.diploma },
            { id: 'phd', label: t.filters.phd },
        ];
    }, [t.filters]);

    return (
        <div dir={isAr ? "rtl" : "ltr"} className="lg:px-16 md:px-8 px-4  my-8 ">
            <h2 className={`md:text-xl xl:text-3xl  2xl:text-[41px] font-black text-[#254151] mb-6 sm:mb-12 ${isAr ? "text-right" : "text-left"}`} style={{ fontFamily: 'Cairo', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {t.title}
            </h2>

            <div className="flex justify-start">
                <div className="w-full lg:w-2/3 space-y-6">
                    <div className="flex justify-start">
                        <div className="w-full md:w-64">
                            <select
                                value={selectedCollege}
                                onChange={(e) => setSelectedCollege(e.target.value)}
                                className="w-full px-4 py-3 text-sm border-2 border-gray-300 focus:border-[#6096b4] focus:outline-none transition-colors rounded-lg text-left bg-white appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.25rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="all">{t.colleges.all}</option>
                                <option value="engineering">{t.colleges.engineering}</option>
                                <option value="business">{t.colleges.business}</option>
                                <option value="law">{t.colleges.law}</option>
                            </select>
                        </div>
                    </div>

                    {/* Filters - Horizontal Radio Buttons */}
                    <div className="flex flex-wrap gap-4 sm:gap-8 justify-start items-center">
                        {filters.map((filter) => (
                            <label
                                key={filter.id}
                                className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                            >
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="program-filter"
                                        checked={selectedFilters.includes(filter.id)}
                                        onChange={() => {
                                            setSelectedFilters([filter.id]);
                                        }}
                                        className="peer sr-only"
                                    />
                                    <div className="size-5 border-2 border-gray-400 peer-checked:border-[#6096b4] peer-checked:bg-white transition-all flex items-center justify-center rounded-full">
                                        <div className="size-2.5 bg-[#6096b4] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <span className="text-sm sm:text-base text-gray-700 group-hover:text-[#254151] transition-colors">
                                    {filter.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Search Box and Button */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-0">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full px-4 py-3 sm:py-4 pl-12 text-sm sm:text-base border-2 border-gray-300 focus:border-[#6096b4] focus:outline-none transition-colors rounded-lg text-left bg-white h-12 sm:h-[60px]"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
                        </div>

                        {/* Search Button */}
                        <Button className="bg-gradient-to-r from-[#6096b4] to-[#254151] hover:from-[#254151] hover:to-[#6096b4] text-white w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all h-12 sm:h-[60px] whitespace-nowrap flex-shrink-0">
                            {t.searchButton}
                        </Button>
                    </div>

                    {/* Search Label Below */}
                    <div className={isAr ? "text-right" : "text-left"}>
                        <span className="text-sm text-gray-500">{t.searchLabel}</span>
                    </div>

                    {/* Results hint */}
                    {(selectedFilters.length > 0 || searchTerm) && (
                        <div className={`${isAr ? "text-right" : "text-left"} pt-5 mt-5 border-t border-gray-300`}>
                            <p className="text-sm text-gray-600">
                                {selectedFilters.length > 0 && (
                                    <span className="text-[#6096b4]">{t.filterApplied(selectedFilters.length)}</span>
                                )}
                                {selectedFilters.length > 0 && searchTerm && ' • '}
                                {searchTerm && (
                                    <span>{t.searchingFor} <strong>{searchTerm}</strong></span>
                                )}
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedFilters([]);
                                    setSearchTerm('');
                                }}
                                className="text-xs text-[#6096b4] hover:text-[#254151] mt-2 underline"
                            >
                                {t.clearAll}
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}