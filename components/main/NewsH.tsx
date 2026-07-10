"use client"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface NewsItem {
    titleAr: string;
    titleEn: string;
    link: string;
    image: string;
}

export function NewsHighlights({ items }: { items: NewsItem[] }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const itemsPerPage = 4;
    const allNewsItems = items;
    const totalPages = Math.max(1, Math.ceil(allNewsItems.length / itemsPerPage));
    const canSlide = allNewsItems.length > itemsPerPage;

    const currentNews = useMemo(() => {
        return allNewsItems.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
        };
    }, []);

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (isAnimating) return;

        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setDragStart(clientX);
    }, [isAnimating]);

    const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || dragStart === null) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const offset = clientX - dragStart;
        setDragOffset(offset);
    }, [dragStart, isDragging]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);

        const threshold = 50;

        if (Math.abs(dragOffset) > threshold && canSlide) {
            setIsAnimating(true);

            const newPage = dragOffset > 0
                ? (currentPage === 0 ? totalPages - 1 : currentPage - 1)
                : ((currentPage + 1) % totalPages);

            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => {
                setCurrentPage(newPage);
                setIsAnimating(false);
                setDragOffset(0);
                setDragStart(null);
            }, 400);
        } else {
            setDragOffset(0);
            setDragStart(null);
        }
    }, [canSlide, currentPage, dragOffset, isDragging, totalPages]);

    const locale = useLocale()
    const t = useTranslations("general")
    const tNavbar = useTranslations("navbar")

    return (
        <section className="pt-4 pb-4 bg-white">
            <div className="px-4 md:px-8 lg:px-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-[#254151]" style={{ fontFamily: 'Cairo', fontWeight: 900, letterSpacing: '-0.02em' }}>
                        {tNavbar("news")}
                    </h2>
                    <Link href="/main/news" className="bg-[#6096b4] hover:bg-[#254151] text-white px-3 py-2 rounded-lg transition-all flex items-center gap-2">
                        <span className="ml-2 text-sm sm:text-base lg:text-lg">
                            {t('more')}
                        </span>
                        {locale == "ar" ?
                            <ArrowLeft className="size-5" />
                            :
                            <ArrowRight className="size-5" />

                        }
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    style={{
                        transform: isDragging ? `translateX(${dragOffset * 0.8}px)` : 'translateX(0)',
                        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        touchAction: 'pan-y'
                    }}
                >
                    {currentNews.map((news, index) => {
                        const title = locale == "ar" ? news.titleAr : news.titleEn
                        return (
                            <div
                                key={index}
                                className={`group transition-all duration-300 relative ${isAnimating ? 'animate-slideOut' : 'animate-slideIn'
                                    }`}
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                {/* Image with rounded corners - no container background */}
                                <div className="relative h-52 overflow-hidden mb-4 rounded-2xl shadow-md">
                                    <Image
                                        fill
                                        src={news.image}
                                        alt={title}
                                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                                        draggable={false}
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content - no background */}
                                <div className="pb-12">
                                    <h3 className="text-sm text-[#254151] leading-relaxed min-h-[60px] font-medium" style={{ fontFamily: 'Cairo' }}>
                                        {title}
                                    </h3>
                                </div>

                                {/* Arrow Button - Positioned at bottom left */}
                                <div className={`absolute bottom-0 
                                    ${locale == "ar" ? "left-0" : "right-0"}
                                    `}>
                                    <Link href={news.link}
                                        aria-label={title}
                                        className="size-9 bg-[#6193ad] rounded-full flex items-center justify-center hover:bg-[#254151] transition-all group-hover:scale-110 shadow-md">
                                        {locale == "ar" ?
                                            <ArrowLeft className="size-5 text-white" />
                                            :
                                            <ArrowRight className="size-5 text-white" />

                                        }
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {currentNews.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        {locale === "ar" ? "لا توجد أخبار متاحة حالياً" : "No news available at the moment"}
                    </div>
                )}

                {/* Archive Button with Divider */}
                <div className="relative flex items-center justify-center mt-16">
                    {/* Horizontal Line - passes through the button */}
                    <div className="absolute inset-0 flex items-center" style={{ zIndex: 1 }}>
                        <div className="w-full border-t-2 border-gray-300"></div>
                    </div>

                    {/* Center Square with Icon */}
                    <div
                        className="relative flex flex-col items-center px-4"
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                        style={{ zIndex: 5 }}
                    >
                        <button
                            onMouseDown={handleDragStart}
                            onTouchStart={handleDragStart}
                            disabled={isAnimating || !canSlide}
                            type="button"
                            aria-label="Swipe to navigate news"
                            className={`relative bg-[#0ea5a5] rounded-2xl flex items-center justify-center hover:scale-110 transition-all cursor-grab active:cursor-grabbing shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${isDragging ? 'scale-125 shadow-2xl' : ''
                                }`}
                            style={{
                                transform: isDragging ? `translateX(${dragOffset}px) scale(1.25)` : 'translateX(0) scale(1)',
                                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                                zIndex: 10,
                                width: '56px',
                                height: '56px'
                            }}
                        >
                            {/* Bidirectional Arrows Icon */}
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                {/* Left Arrow */}
                                <path d="M9 6L3 12L9 18" />
                                {/* Right Arrow */}
                                <path d="M15 6L21 12L15 18" />
                                {/* Center Line */}
                                <line x1="3" y1="12" x2="21" y2="12" />
                            </svg>
                        </button>

                        {/* Hand Cursor Icon */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-8 h-8 mt-2 text-gray-500"
                        >
                            <path d="M9 11V6C9 4.89543 9.89543 4 11 4C12.1046 4 13 4.89543 13 6V11" />
                            <path d="M9 11V9C9 7.89543 9.89543 7 11 7C12.1046 7 13 7.89543 13 9V11" />
                            <path d="M13 11V10C13 8.89543 13.8954 8 15 8C16.1046 8 17 8.89543 17 10V11" />
                            <path d="M17 11V10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10V14C21 17.866 17.866 21 14 21H13C10.2386 21 7.88462 19.2776 6.84265 16.8204L4.45996 11" />
                            <path d="M7 11V6C7 4.89543 6.10457 4 5 4C3.89543 4 3 4.89543 3 6V9" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                <style>{`
          @keyframes slideOut {
            0% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(100px);
            }
          }

          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(-100px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slideOut {
            animation: slideOut 0.4s ease-out forwards;
          }

          .animate-slideIn {
            animation: slideIn 0.5s ease-out forwards;
          }

          /* Make drag more smooth */
          button.active\:cursor-grabbing:active {
            cursor: grabbing !important;
          }
        `}</style>
            </div>
        </section>
    );
}