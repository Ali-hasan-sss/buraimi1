"use client"
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { DepartmentShowcaseCard } from '@/lib/department-public';
import { isLocallyStoredUploadSrc, resolveUploadImageSrc } from '@/lib/upload-public-url';

export function CollegesShowcase({ colleges }: { colleges: DepartmentShowcaseCard[] }) {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCustomCursor, setShowCustomCursor] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setShowCustomCursor(true);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        setCursorPos({ x: e.clientX, y: e.clientY });

        if (isDragging && sliderRef.current) {
            const x = e.pageX - sliderRef.current.offsetLeft;
            const walk = (x - startX) * 2; // السرعة × 2
            sliderRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseLeave = () => {
        setShowCustomCursor(false);
        setIsDragging(false);
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false

    const t = useTranslations("general")

    if (colleges.length === 0) {
        return null;
    }

    return (
        <section className="py-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">

            {/* Custom Cursor */}
            {showCustomCursor && (
                <div
                    className="fixed pointer-events-none z-[99999]"
                    style={{
                        left: cursorPos.x - 40,
                        top: cursorPos.y - 40,
                        width: '80px',
                        height: '80px'
                    }}
                >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-[#254151] font-bold text-base">اسحب</span>
                    </div>
                </div>
            )}

            <div className="relative z-10">
                <div className="px-4 md:px-8 lg:px-16">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                        <h2 className="text-3xl font-black text-[#254151]" style={{ fontFamily: 'Cairo', fontWeight: 900, letterSpacing: '-0.02em' }}>
                            {colleges.length} {" "}
                            {t("sec_study_con")}
                        </h2>
                        <div className="flex items-center gap-4
                         sm:w-fit w-full sm:justify-start justify-around 
                         mt-5 sm:mt-0
                        ">
                            <button
                                onClick={() => {
                                    if (sliderRef.current) {
                                        if (isRtl) sliderRef.current.scrollLeft += 300
                                        else sliderRef.current.scrollLeft -= 300
                                    }
                                }}
                                className="size-12 bg-white border-2 border-gray-300 flex items-center justify-center hover:border-[#6096b4] hover:bg-[#6096b4] hover:text-white transition-all rounded-lg"
                            >
                                {isRtl ?
                                    <ChevronRight className="size-6" />
                                    :
                                    <ChevronLeft className="size-6" />
                                }
                            </button>
                            <button
                                onClick={() => {
                                    if (sliderRef.current) {
                                        if (isRtl) sliderRef.current.scrollLeft -= 300;
                                        else sliderRef.current.scrollLeft += 300;
                                    }
                                }}
                                className="size-12 bg-white border-2 border-gray-300 flex items-center justify-center hover:border-[#6096b4] hover:bg-[#6096b4] hover:text-white transition-all rounded-lg"
                            >
                                {isRtl ?
                                    <ChevronLeft className="size-6" />
                                    :
                                    <ChevronRight className="size-6" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Colleges Horizontal Scroll */}
                    <div
                        ref={sliderRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        className="flex gap-8 overflow-x-scroll scrollbar-hide pb-4 select-none"
                        style={{
                            cursor: showCustomCursor ? 'none' : 'grab',
                            scrollBehavior: isDragging ? 'auto' : 'smooth',
                            touchAction: 'pan-y'
                        }}
                    >
                        {colleges.map((college, idx) => {
                            const title = isRtl ? college.titleAr : college.titleEn
                            const description = isRtl ? college.descriptionAr : college.descriptionEn
                            return (
                                <a
                                    key={idx}
                                    href={college.link}
                                    className="group relative overflow-hidden transition-all duration-500 hover:scale-105 rounded-xl shadow-lg flex-shrink-0"
                                    style={{ width: 'min(350px, 88vw)', height: '400px' }}
                                    data-dragging={isDragging ? 'true' : 'false'}
                                    draggable={false}
                                >
                                    <div className="relative h-full w-full">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                fill
                                                src={resolveUploadImageSrc(college.image)}
                                                alt={title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
                                                draggable={false}
                                                sizes="(min-width: 1536px) 380px, (min-width: 1024px) 350px, (min-width: 640px) 320px, 88vw"
                                                unoptimized={isLocallyStoredUploadSrc(college.image)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        </div>

                                        {/* Icon Badge */}
                                        <div className="absolute top-6 right-6 size-14 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-lg">
                                            <BookOpen className="size-7 text-white" />
                                        </div>

                                        {/* College Title */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl text-white mb-3 leading-relaxed group-hover:translate-y-[-8px] transition-transform duration-300">
                                                {title}
                                            </h3>
                                            <div className="text-sm text-white line-clamp-2 max-h-[50px] bg-white/10 backdrop-blur-sm rounded p-2">
                                                {description}
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#254151]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                            <div className="size-12 bg-white flex items-center justify-center rounded-lg">
                                                <ChevronLeft className="size-6 text-[#254151]" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {colleges.map((college, index) => (
                            <div
                                key={index}
                                className="size-2 rounded-full transition-all duration-300 bg-gray-300"
                                style={{ backgroundColor: '#6096b4', opacity: 0.6 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}