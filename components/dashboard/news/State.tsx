"use client"
import { Newspaper, Star, TrendingUp } from "lucide-react"
import { useLocale } from "next-intl";

export default function NewsState(
    { total, featured }: { total: number, featured: number }
) {

    const locale = useLocale()
    const isAr = locale == "ar" ? true : false



    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#6096b4]/10 rounded-xl flex items-center justify-center">
                    <Newspaper className="size-7 text-[#6096b4]" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{isAr ? "إجمالي الأخبار" : "Total News"}</p>
                    <p className="text-2xl font-bold text-[#254151]">{total}</p>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#c2a772]/10 rounded-xl flex items-center justify-center">
                    <Star className="size-7 text-[#c2a772]" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{isAr ? "أخبار مميزة" : "Featured"}</p>
                    <p className="text-2xl font-bold text-[#254151]">{featured}</p>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="size-7 text-green-600" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{isAr ? "التصنيفات" : "Categories"}</p>
                    <p className="text-2xl font-bold text-[#254151]">4</p>
                </div>
            </div>
        </div>

    )
}