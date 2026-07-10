"use client"

import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";


export default function TablePaginationController(
    { limit, page, total }:
        {

            total: number;
            page: number;
            limit: number;
        }
) {

    const t = useTranslations("general");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = total === 0 ? 0 : Math.min(total, currentPage * limit);


    const pushParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(updates)) {
            if (value === null) params.delete(key);
            else params.set(key, value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-gray-500">
                    {t("Rows")}
                </p>


                <Select
                    value={String(limit)}
                    onValueChange={(value) => pushParams({ limit: value, page: "1" })}
                >

                    <SelectTrigger className="h-9 w-24 border-border bg-background text-foreground hover:bg-accent">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-popover text-popover-foreground">
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="1">1</SelectItem>
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="5">5</SelectItem>
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="10">10</SelectItem>
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="20">20</SelectItem>
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="50">50</SelectItem>
                        <SelectItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground" value="100">100</SelectItem>
                    </SelectContent>
                </Select>

                <p className="text-xs text-gray-500">
                    {startItem}-{endItem} / {total}
                </p>

            </div>


            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 border-border bg-background text-foreground shadow-xs hover:bg-accent disabled:opacity-50"
                    disabled={currentPage <= 1}
                    onClick={() => pushParams({ page: String(Math.max(1, currentPage - 1)) })}
                >
                    {t("Prev")}
                </Button>

                <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                    <span>{t("Page")}</span>
                    <span className="font-semibold text-foreground">{currentPage}</span>
                    <span>/</span>
                    <span className="font-medium">{totalPages}</span>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 border-border bg-background text-foreground shadow-xs hover:bg-accent disabled:opacity-50"
                    disabled={currentPage >= totalPages}
                    onClick={() => pushParams({ page: String(Math.min(totalPages, currentPage + 1)) })}
                >
                    {t("Next")}
                </Button>
            </div>

        </div>
    )
}