"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";

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
import { DEPARTMENTS, ACADEMIC_YEARS, getDepartmentAr, getDepartmentEn } from "@/staticData/seminar-departments";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import type { SeminarRow } from "@/components/dashboard/seminars/SeminarsTable";
import { updateSeminarAction } from "@/app/dashboard/seminars/actions/updateSeminar";

type SeminarsEditDialogProps = {
    item: SeminarRow;
    isAr: boolean;
    children: ReactNode;
};

export function SeminarsEditDialog({ item, isAr, children }: SeminarsEditDialogProps) {
    const t = useTranslations("dashboardSeminars");
    const [open, setOpen] = useState(false);

    const [academicYearAr, setAcademicYearAr] = useState(item.academicYearAr);
    const [academicYearEn, setAcademicYearEn] = useState(item.academicYearEn);
    const [departmentAr, setDepartmentAr] = useState(item.departmentAr);
    const [departmentEn, setDepartmentEn] = useState(item.departmentEn);
    const [presenterAr, setPresenterAr] = useState(item.presenterAr);
    const [presenterEn, setPresenterEn] = useState(item.presenterEn);
    const [titleAr, setTitleAr] = useState(item.titleAr);
    const [titleEn, setTitleEn] = useState(item.titleEn);
    const [date, setDate] = useState(item.date);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t("edit")}</DialogTitle>
                    <DialogDescription>
                        {isAr ? "قم بتعديل البيانات ثم حفظ." : "Edit fields and save."}
                    </DialogDescription>
                </DialogHeader>

                <form action={updateSeminarAction} className="grid gap-4">
                    <input type="hidden" name="id" value={item.id} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>{t("academicYear")}</Label>
                            <Select
                                value={isAr ? academicYearAr : academicYearEn}
                                onValueChange={(val) => {
                                    setAcademicYearAr(isAr ? val : getDepartmentAr(val));
                                    setAcademicYearEn(isAr ? getDepartmentEn(val) : val);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={isAr ? "اختر السنة" : "Select year"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {ACADEMIC_YEARS.map((year) => (
                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="academicYearAr" value={academicYearAr} />
                            <input type="hidden" name="academicYearEn" value={academicYearEn} />
                        </div>
                        <div className="grid gap-2">
                            <Label>{t("department")}</Label>
                            <Select
                                value={isAr ? departmentAr : departmentEn}
                                onValueChange={(val) => {
                                    setDepartmentAr(isAr ? val : getDepartmentAr(val));
                                    setDepartmentEn(isAr ? getDepartmentEn(val) : val);
                                }}
                            >
                                <SelectTrigger>
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
                            <input type="hidden" name="departmentAr" value={departmentAr} />
                            <input type="hidden" name="departmentEn" value={departmentEn} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{t("presenterAr")}</label>
                            <Input name="presenterAr" value={presenterAr} onChange={(e) => setPresenterAr(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{t("presenterEn")}</label>
                            <Input name="presenterEn" value={presenterEn} onChange={(e) => setPresenterEn(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{t("titleAr")}</label>
                            <Input name="titleAr" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{t("titleEn")}</label>
                            <Input name="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{t("date")}</label>
                        <Input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button type="submit">
                            {t("save")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
