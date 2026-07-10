"use client"
import { NewsItem } from "@/types/news"
import { motion } from "framer-motion"
import { Calendar, ChevronLeft, Clock } from "lucide-react"
import Image from "next/image"
export default function NewsCard(
    { news, index, isAr }: { news: NewsItem, index: number, isAr: boolean }
) {
    return (<motion.div
        key={news.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
        <div className="relative h-64 overflow-hidden">
            <Image
                fill
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute top-4 right-4 bg-[#c2a772] text-white px-4 py-2 rounded-lg font-bold">
                {news.category}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-[#254151] mb-3 group-hover:text-[#6096b4] transition-colors">
                {news.title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{news.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{new Date(news.date).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{news.readTime}</span>
                    </div>
                </div>
                <button className="text-[#6096b4] hover:text-[#254151] font-bold flex items-center gap-1">
                    {isAr ? 'اقرأ المزيد' : 'Read more'}
                    <ChevronLeft className="size-4" />
                </button>
            </div>
        </div>
    </motion.div>
    )
}