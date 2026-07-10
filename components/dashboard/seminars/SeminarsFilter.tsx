"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { SeminarsTable, type SeminarRow } from "./SeminarsTable";

type SeminarsFilterProps = {
    data: SeminarRow[];
};

export function SeminarsFilter({ data }: SeminarsFilterProps) {
    const t = useTranslations("dashboardSeminars");
    const locale = useLocale();
    const isAr = locale === "ar";

    const [searchTerm, setSearchTerm] = useState("");
    const [yearFilter, setYearFilter] = useState("all");
    const [departmentFilter, setDepartmentFilter] = useState("all");

    // Get unique values for filters
    const uniqueYears = useMemo(() => {
        const years = new Set<string>();
        data.forEach((s) => {
            years.add(isAr ? s.academicYearAr : s.academicYearEn);
        });
        return Array.from(years).sort().reverse();
    }, [data, isAr]);

    const uniqueDepartments = useMemo(() => {
        const depts = new Set<string>();
        data.forEach((s) => {
            depts.add(isAr ? s.departmentAr : s.departmentEn);
        });
        return Array.from(depts).sort();
    }, [data, isAr]);

    // Filter data
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch =
                searchTerm === "" ||
                (isAr ? item.titleAr : item.titleEn)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (isAr ? item.presenterAr : item.presenterEn)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (isAr ? item.departmentAr : item.departmentEn)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesYear =
                yearFilter === "all" ||
                (isAr ? item.academicYearAr : item.academicYearEn) === yearFilter;

            const matchesDepartment =
                departmentFilter === "all" ||
                (isAr ? item.departmentAr : item.departmentEn) === departmentFilter;

            return matchesSearch && matchesYear && matchesDepartment;
        });
    }, [data, searchTerm, yearFilter, departmentFilter, isAr]);

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="search" className="mb-2 block text-sm">
                        {isAr ? "بحث" : "Search"}
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            id="search"
                            placeholder={isAr ? "ابحث في العنوان أو المقدم..." : "Search title or presenter..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Year Filter */}
                <div className="w-full sm:w-48">
                    <Label htmlFor="year" className="mb-2 block text-sm">
                        {t("academicYear")}
                    </Label>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger id="year">
                            <SelectValue placeholder={isAr ? "جميع السنوات" : "All years"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                {isAr ? "جميع السنوات" : "All years"}
                            </SelectItem>
                            {uniqueYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Department Filter */}
                <div className="w-full sm:w-64">
                    <Label htmlFor="department" className="mb-2 block text-sm">
                        {t("department")}
                    </Label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger id="department">
                            <SelectValue placeholder={isAr ? "جميع الأقسام" : "All departments"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                {isAr ? "جميع الأقسام" : "All departments"}
                            </SelectItem>
                            {uniqueDepartments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
                {isAr
                    ? `إجمالي النتائج: ${filteredData.length} من ${data.length}`
                    : `Total results: ${filteredData.length} of ${data.length}`}
            </div>

            {/* Table */}
            <SeminarsTable data={filteredData} />
        </div>
    );
}
