"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations, useLocale } from "next-intl";
import { DEPARTMENTS, ACADEMIC_YEARS, getDepartmentAr, getDepartmentEn } from "@/staticData/seminar-departments";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateSeminarPage() {
    const t = useTranslations("dashboardSeminars");
    const locale = useLocale();
    const isAr = locale === "ar";
    const router = useRouter();

    const [academicYear, setAcademicYear] = useState("");
    const [department, setDepartment] = useState("");
    const [presenterAr, setPresenterAr] = useState("");
    const [presenterEn, setPresenterEn] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [date, setDate] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        const academicYearAr = isAr ? academicYear : getDepartmentAr(academicYear);
        const academicYearEn = isAr ? getDepartmentEn(academicYear) : academicYear;
        const departmentAr = isAr ? department : getDepartmentAr(department);
        const departmentEn = isAr ? getDepartmentEn(department) : department;

        formData.append("academicYearAr", academicYearAr);
        formData.append("academicYearEn", academicYearEn);
        formData.append("departmentAr", departmentAr);
        formData.append("departmentEn", departmentEn);
        formData.append("presenterAr", presenterAr);
        formData.append("presenterEn", presenterEn);
        formData.append("titleAr", titleAr);
        formData.append("titleEn", titleEn);
        formData.append("date", date);

        const res = await fetch("/api/seminars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                academicYearAr: isAr ? academicYear : getDepartmentAr(academicYear),
                academicYearEn: isAr ? getDepartmentEn(academicYear) : academicYear,
                departmentAr: isAr ? department : getDepartmentAr(department),
                departmentEn: isAr ? getDepartmentEn(department) : department,
                presenterAr,
                presenterEn,
                titleAr,
                titleEn,
                date,
            }),
        });

        const data = await res.json();

        if (data.ok) {
            toast.success(t("createSuccess"));
            router.push("/dashboard/seminars");
            router.refresh();
        } else {
            toast.error(t("errorCreate"));
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold">{t("create")}</h1>
                <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="academicYear">{t("academicYear")}</Label>
                        <Select value={academicYear} onValueChange={setAcademicYear} required>
                            <SelectTrigger id="academicYear">
                                <SelectValue placeholder={isAr ? "اختر السنة الأكاديمية" : "Select academic year"} />
                            </SelectTrigger>
                            <SelectContent>
                                {ACADEMIC_YEARS.map((year) => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="department">{t("department")}</Label>
                        <Select value={department} onValueChange={setDepartment} required>
                            <SelectTrigger id="department">
                                <SelectValue placeholder={isAr ? "اختر القسم" : "Select department"} />
                            </SelectTrigger>
                            <SelectContent>
                                {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept.en} value={isAr ? dept.ar : dept.en}>
                                        {isAr ? dept.ar : dept.en}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{t("presenterAr")}</label>
                        <Input value={presenterAr} onChange={(e) => setPresenterAr(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{t("presenterEn")}</label>
                        <Input value={presenterEn} onChange={(e) => setPresenterEn(e.target.value)} required />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{t("titleAr")}</label>
                        <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{t("titleEn")}</label>
                        <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{t("date")}</label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div className="flex gap-2 pt-4">
                    <Button type="submit">{t("create")}</Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard/seminars")}>
                        {t("cancel")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
