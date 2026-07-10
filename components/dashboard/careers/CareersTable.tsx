import { getLocale } from "next-intl/server";

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
import { CareersEditDialog } from "@/components/dashboard/careers/CareersEditDialog";
import { CareersDeleteDialog } from "@/components/dashboard/careers/CareersDeleteDialog";

export type CareerRow = {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    requirementsAr: string;
    requirementsEn: string;
    startDate: string;
    edDate: string;
};

type CareersTableProps = {
    data: CareerRow[];
};

export async function CareersTable({ data }: CareersTableProps) {
    const locale = await getLocale();
    const isAr = locale === "ar";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "الوظيفة" : "Career"}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "التاريخ" : "Dates"}
                        </TableHead>
                        <TableHead className="text-sm font-semibold text-gray-700 text-center">
                            {isAr ? "الإجراءات" : "Actions"}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="py-12 text-center text-gray-500">
                                {isAr ? "لا توجد وظائف" : "No careers found"}
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
                                            {isAr ? item.descriptionAr : item.descriptionEn}
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="size-4" />
                                        <span className="truncate max-w-[220px]">
                                            {new Date(item.startDate).toLocaleDateString(isAr ? "ar-SA" : "en-US")} - {new Date(item.edDate).toLocaleDateString(isAr ? "ar-SA" : "en-US")}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <CareersEditDialog item={item} isAr={isAr}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                className="text-[#6096b4] hover:text-[#4f7e97]"
                                                title={isAr ? "تعديل" : "Edit"}
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                        </CareersEditDialog>

                                        <CareersDeleteDialog item={item} isAr={isAr}>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                className="text-red-600 hover:text-red-700"
                                                title={isAr ? "حذف" : "Delete"}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </CareersDeleteDialog>
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
