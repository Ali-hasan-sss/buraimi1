"use client";

import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Calendar, Pencil, Trash2 } from "lucide-react";
import { SeminarsEditDialog } from "@/components/dashboard/seminars/SeminarsEditDialog";
import { SeminarsDeleteDialog } from "@/components/dashboard/seminars/SeminarsDeleteDialog";

export type SeminarRow = {
    id: string;
    academicYearAr: string;
    academicYearEn: string;
    departmentAr: string;
    departmentEn: string;
    presenterAr: string;
    presenterEn: string;
    titleAr: string;
    titleEn: string;
    date: string;
    isActive: boolean;
};

type SeminarsTableProps = {
    data: SeminarRow[];
};

export function SeminarsTable({ data }: SeminarsTableProps) {
    const locale = useLocale();
    const isAr = locale === "ar";
    const t = useTranslations("dashboardSeminars");

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {t("seminarTitle")}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {t("department")}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {t("year")}
                        </TableHead>
                        <TableHead className="text-sm font-semibold text-gray-700 text-center">
                            {t("actions")}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-12 text-center text-gray-500">
                                {t("noSeminars")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-gray-50/50">
                                <TableCell>
                                    <div className="min-w-0">
                                        <div className="font-semibold text-[#254151] truncate max-w-[240px] sm:max-w-[360px]">
                                            {isAr ? item.titleAr : item.titleEn}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate max-w-[240px] sm:max-w-[360px]">
                                            {isAr ? item.presenterAr : item.presenterEn}
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="text-sm text-gray-600">
                                        {isAr ? item.departmentAr : item.departmentEn}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="size-4" />
                                        <span className="truncate">
                                            {item.date}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <SeminarsEditDialog item={item} isAr={isAr}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                className="text-[#6096b4] hover:text-[#4f7e97]"
                                                title={t("edit")}
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                        </SeminarsEditDialog>

                                        <SeminarsDeleteDialog item={item} isAr={isAr}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                className="text-red-600 hover:text-red-700"
                                                title={t("delete")}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </SeminarsDeleteDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
