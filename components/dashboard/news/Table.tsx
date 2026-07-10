import Image from "next/image";
import { NewsItemFromAPI } from "@/types/news";
import { Archive, Tag, Calendar, Star, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocale } from "next-intl/server";
import { NewsEditDialog } from "@/components/dashboard/news/NewsEditDialog";
import { NewsDeleteDialog } from "@/components/dashboard/news/NewsDeleteDialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface NewsTableProps {
    data: NewsItemFromAPI[];
    meta: { page: number; limit: number; total: number; hasMore: boolean; loadedCount: number; featured?: number } | null;
}

export async function NewsTable({ data, meta: _meta }: NewsTableProps) {
    const meta = _meta;
    const locale = await getLocale();
    const isAr = locale === "ar";

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            events: "bg-purple-100 text-purple-700 border-purple-200",
            academic: "bg-blue-100 text-blue-700 border-blue-200",
            research: "bg-green-100 text-green-700 border-green-200",
            partnerships: "bg-orange-100 text-orange-700 border-orange-200",
        };
        return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
    };

    const getCategoryLabelForItem = (category: string) => {
        const labels: Record<string, { ar: string; en: string }> = {
            events: { ar: "فعاليات", en: "Events" },
            academic: { ar: "أكاديمي", en: "Academic" },
            research: { ar: "بحث علمي", en: "Research" },
            partnerships: { ar: "شراكات", en: "Partnerships" },
        };
        return labels[category]?.[isAr ? "ar" : "en"] || category;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {meta && (
                <div className={`px-4 py-3 border-b text-sm text-gray-500 ${isAr ? "text-right" : "text-left"}`}>
                    {isAr
                        ? `عرض ${data.length} من أصل ${meta.total} عنصر`
                        : `Showing ${data.length} of ${meta.total} items`}
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "الخبر" : "News"}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "التصنيف" : "Category"}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "التاريخ" : "Date"}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "الرابط" : "Link"}
                        </TableHead>
                        <TableHead className={`text-sm font-semibold text-gray-700 ${isAr ? "text-right" : "text-left"}`}>
                            {isAr ? "الحالة" : "Status"}
                        </TableHead>
                        <TableHead className="text-sm font-semibold text-gray-700 text-center">
                            {isAr ? "الإجراءات" : "Actions"}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="py-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <Archive className="size-12 text-gray-300" />
                                    <p className="text-gray-500">
                                        {isAr ? "لا توجد أخبار" : "No news found"}
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-gray-50/50">
                                <TableCell>
                                    <div className={`flex w-full items-center gap-4 ${isAr ? "flex-row" : "flex-row-reverse"}`}>
                                        <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={isAr ? item.titleAr : item.titleEn}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 w-full">
                                            <p className="font-semibold text-[#254151] truncate max-w-[200px] sm:max-w-[300px]">
                                                {isAr ? item.titleAr : item.titleEn}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
                                                {isAr ? item.excerptAr : item.excerptEn}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                                        <Tag className="size-3" />
                                        {getCategoryLabelForItem(item.category)}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Calendar className="size-4" />
                                        {new Date(item.date).toLocaleDateString(isAr ? "ar-SA" : "en-US")}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Button asChild variant="ghost" size="sm" className="justify-start px-2 text-[#6096b4] hover:text-[#4f7e97]">
                                        <a href={item.link} target="_blank" rel="noreferrer">
                                            <span className="inline-flex items-center gap-2">
                                                <Link2 className="size-4" />
                                                <span className="max-w-[180px] truncate">{item.link}</span>
                                            </span>
                                        </a>
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    {item.featured ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                            <Star className="size-3 fill-amber-500" />
                                            {isAr ? "مميز" : "Featured"}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                            {isAr ? "عادي" : "Regular"}
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <NewsEditDialog item={item} isAr={isAr} />
                                        <NewsDeleteDialog id={item.id} isAr={isAr} />
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