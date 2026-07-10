"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Building2, FileText, Filter, Search } from "lucide-react";

type LocaleKey = "ar" | "en";

export type Seminar = {
    "academicYear": string;
    "department": string;
    "presenter": string;
    "title": string;
    "date": string;
};

type SeminarsListProps = {
    "seminars": Seminar[];
};

type SeminarsListContent = {
    "title": string;
    "subtitle": string;
    "show": string;
    "entries": string;
    "searchPlaceholder": string;
    "yearLabel": string;
    "departmentLabel": string;
    "allYears": string;
    "allDepartments": string;
    "table": {
        "academicYear": string;
        "department": string;
        "presenter": string;
        "title": string;
        "date": string;
    };
    "noResults": string;
    "pagination": {
        "previous": string;
        "next": string;
        "showing": (from: number, to: number, total: number) => string;
    };
};

const t: Record<LocaleKey, SeminarsListContent> = {
    ar: {
        "title": "قائمة الندوات وورش العمل",
        "subtitle": "List of Seminars and Workshops",
        "show": "أظهر",
        "entries": "مُدخلات",
        "searchPlaceholder": "ابحث...",
        "yearLabel": "السنة الأكاديمية:",
        "departmentLabel": "القسم:",
        "allYears": "جميع السنوات",
        "allDepartments": "جميع الأقسام",
        "table": {
            "academicYear": "Academic Year",
            "department": "القسم الأكاديمي / الدائرة",
            "presenter": "Seminar Presenter",
            "title": "Title of the Seminar",
            "date": "التاريخ",
        },
        "noResults": "لم يتم العثور على نتائج",
        "pagination": {
            "previous": "السابق",
            "next": "التالي",
            "showing": (from, to, total) => `عرض ${from} إلى ${to} من أصل ${total} مُدخلات`,
        },
    },
    en: {
        "title": "Seminars & Workshops",
        "subtitle": "قائمة الندوات وورش العمل",
        "show": "Show",
        "entries": "Entries",
        "searchPlaceholder": "Search...",
        "yearLabel": "Academic year:",
        "departmentLabel": "Department:",
        "allYears": "All years",
        "allDepartments": "All departments",
        "table": {
            "academicYear": "Academic Year",
            "department": "Department",
            "presenter": "Presenter",
            "title": "Seminar title",
            "date": "Date",
        },
        "noResults": "No results found",
        "pagination": {
            "previous": "Previous",
            "next": "Next",
            "showing": (from, to, total) => `Showing ${from} to ${to} of ${total} entries`,
        },
    },
};

export default function SeminarsListComp({ seminars }: SeminarsListProps) {
    const locale = useLocale();
    const localeVal: LocaleKey = locale === "ar" ? "ar" : "en";
    const content = t[localeVal];

    const [searchTerm, setSearchTerm] = React.useState("");
    const [yearFilter, setYearFilter] = React.useState("all");
    const [departmentFilter, setDepartmentFilter] = React.useState("all");
    const [entriesPerPage, setEntriesPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    const uniqueYears = React.useMemo(() => {
        return Array.from(new Set(seminars.map((s) => s.academicYear))).sort().reverse();
    }, [seminars]);

    const uniqueDepartments = React.useMemo(() => {
        return Array.from(new Set(seminars.map((s) => s.department))).sort();
    }, [seminars]);

    const filteredSeminars = React.useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        return seminars.filter((s) => {
            const matchesYear = yearFilter === "all" || s.academicYear === yearFilter;
            const matchesDept = departmentFilter === "all" || s.department === departmentFilter;
            const matchesSearch =
                query.length === 0 ||
                s.academicYear.toLowerCase().includes(query) ||
                s.department.toLowerCase().includes(query) ||
                s.presenter.toLowerCase().includes(query) ||
                s.title.toLowerCase().includes(query) ||
                s.date.toLowerCase().includes(query);
            return matchesYear && matchesDept && matchesSearch;
        });
    }, [seminars, searchTerm, yearFilter, departmentFilter]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, yearFilter, departmentFilter, entriesPerPage]);

    const totalPages = Math.max(1, Math.ceil(filteredSeminars.length / entriesPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentSeminars = filteredSeminars.slice(startIndex, endIndex);

    const pageButtons = React.useMemo(() => {
        const maxButtons = 5;
        const pages = Math.min(maxButtons, totalPages);
        return Array.from({ length: pages }, (_, i) => {
            if (totalPages <= maxButtons) return i + 1;
            if (safeCurrentPage <= 3) return i + 1;
            if (safeCurrentPage >= totalPages - 2) return totalPages - 4 + i;
            return safeCurrentPage - 2 + i;
        });
    }, [safeCurrentPage, totalPages]);

    return (
        <section className="py-8 sm:py-16">
            <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
                <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-10 border-2 border-purple-200">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                        <div className="bg-purple-600 text-white p-3 sm:p-4 rounded-full w-fit">
                            <FileText className="size-5 sm:size-8" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-4xl font-bold text-[#254151] break-words">{content.title}</h2>
                            <p className="text-sm sm:text-xl text-gray-600 break-words">{content.subtitle}</p>
                        </div>
                    </div>

                    <div className="mb-6 sm:mb-8 space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                <label className="text-gray-700 text-sm sm:text-base">{content.show}</label>
                                <select
                                    value={entriesPerPage}
                                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                    className="border-2 border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <label className="text-gray-700 text-sm sm:text-base">{content.entries}</label>
                            </div>

                            <div className="flex items-center gap-2 w-full lg:max-w-md">
                                <Search className="size-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder={content.searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 border-2 border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row  gap-3 sm:gap-4">
                            <div className="flex  flex-col md:flex-row w-full md:items-center gap-2">
                                <div className="flex">
                                    <Filter className="size-5 text-gray-500" />
                                    <label className="text-gray-700 font-semibold text-sm sm:text-base">{content.yearLabel}</label>
                                </div>
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    className="border-2 border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
                                >
                                    <option value="all">{content.allYears}</option>
                                    {uniqueYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex md:items-center gap-2 flex-col md:flex-row  max-w-full">
                                <div className="flex gap-2">
                                    <Building2 className="size-5 text-gray-500" />
                                    <label className="text-gray-700 font-semibold text-sm sm:text-base">{content.departmentLabel}</label>
                                </div>
                                <select
                                    value={departmentFilter}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                    className="border-2  border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
                                >
                                    <option value="all">{content.allDepartments}</option>
                                    {uniqueDepartments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border-2 border-gray-200">
                        <table className="w-full min-w-[780px]">
                            <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                                <tr>
                                    <th className="px-3 sm:px-6 py-2.5 sm:py-4 text-right font-bold text-sm sm:text-base">{content.table.academicYear}</th>
                                    <th className="px-3 sm:px-6 py-2.5 sm:py-4 text-right font-bold text-sm sm:text-base">{content.table.department}</th>
                                    <th className="px-3 sm:px-6 py-2.5 sm:py-4 text-right font-bold text-sm sm:text-base">{content.table.presenter}</th>
                                    <th className="px-3 sm:px-6 py-2.5 sm:py-4 text-right font-bold text-sm sm:text-base">{content.table.title}</th>
                                    <th className="px-3 sm:px-6 py-2.5 sm:py-4 text-right font-bold text-sm sm:text-base">{content.table.date}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSeminars.length > 0 ? (
                                    currentSeminars.map((seminar, index) => (
                                        <tr
                                            key={`${seminar.academicYear}-${seminar.department}-${seminar.presenter}-${seminar.title}-${seminar.date}-${index}`}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-purple-50"} hover:bg-purple-100 transition-colors border-b border-gray-200`}
                                        >
                                            <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-gray-700 text-sm sm:text-base">{seminar.academicYear}</td>
                                            <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-gray-700 font-semibold text-sm sm:text-base">{seminar.department}</td>
                                            <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-gray-700 text-sm sm:text-base">{seminar.presenter}</td>
                                            <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-gray-700 text-sm sm:text-base">{seminar.title}</td>
                                            <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-gray-700 text-sm sm:text-base">{seminar.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 sm:px-6 py-10 sm:py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-4">
                                                <Search className="size-12 sm:size-16 text-gray-300" />
                                                <p className="text-sm sm:text-xl">{content.noResults}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredSeminars.length > 0 && (
                        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="text-gray-700 text-xs sm:text-base">
                                {content.pagination.showing(
                                    startIndex + 1,
                                    Math.min(endIndex, filteredSeminars.length),
                                    filteredSeminars.length
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    disabled={safeCurrentPage === 1}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                                >
                                    {content.pagination.previous}
                                </button>

                                <div className="flex gap-1">
                                    {pageButtons.map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`size-8 sm:size-10 rounded-lg font-semibold text-sm sm:text-base transition-colors ${safeCurrentPage === pageNum
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    disabled={safeCurrentPage === totalPages}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                                >
                                    {content.pagination.next}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}