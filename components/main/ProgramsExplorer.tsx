"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { carouselImageOverlayStyle } from "@/lib/graduate-program-gradient";
import { cn } from "@/lib/utils";
import { getFallbackGraduateCarousel } from "@/lib/graduate-program-fallback";
import type { GraduateCarouselCard } from "@/types/graduate-program";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";

type Props = {
  programs?: GraduateCarouselCard[];
};

export function GraduateStudies({ programs: programsProp }: Props) {
  const programs = programsProp ?? getFallbackGraduateCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("mainPage");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const programKey = useMemo(
    () => programs.map((p) => p.id).join("|"),
    [programs],
  );
  useEffect(() => {
    setCurrentIndex(0);
  }, [programKey]);

  const showCarouselChrome = programs.length > 4;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % programs.length);
  }, [programs.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length);
  }, [programs.length]);

  const visiblePrograms = useMemo(() => {
    if (!showCarouselChrome) return programs;
    const visible: GraduateCarouselCard[] = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % programs.length;
      visible.push(programs[index]);
    }
    return visible;
  }, [currentIndex, programs, showCarouselChrome]);

  const gridClass = showCarouselChrome
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    : programs.length >= 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : programs.length === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : programs.length === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1";

  return (
    <section className="py-4 bg-white overflow-hidden relative">
      <div className="relative z-10">
        <div className="px-4 md:px-8 lg:px-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <h2
              className="text-3xl font-black text-[#254151]"
              style={{
                fontFamily: "Cairo",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              {t("graduateProgramsHeading", { count: programs.length })}
            </h2>
            {showCarouselChrome ? (
              <div className="flex items-center gap-4 sm:w-fit w-full sm:justify-start justify-around mt-5 sm:mt-0">
                <button
                  onClick={() => {
                    if (isRtl) prevSlide();
                    else nextSlide();
                  }}
                  type="button"
                  aria-label="Previous programs"
                  className="size-10 sm:size-12 2xl:size-14 bg-white border-2 border-gray-300 flex items-center justify-center hover:border-[#6096b4] hover:bg-[#6096b4] hover:text-white transition-all rounded-lg"
                >
                  {isRtl ? (
                    <ChevronRight className="size-5 sm:size-6 2xl:size-7" />
                  ) : (
                    <ChevronLeft className="size-5 sm:size-6 2xl:size-7" />
                  )}
                </button>
                <button
                  onClick={() => {
                    if (isRtl) nextSlide();
                    else prevSlide();
                  }}
                  type="button"
                  aria-label="Next programs"
                  className="size-10 sm:size-12 2xl:size-14 bg-white border-2 border-gray-300 flex items-center justify-center hover:border-[#6096b4] hover:bg-[#6096b4] hover:text-white transition-all rounded-lg"
                >
                  {isRtl ? (
                    <ChevronLeft className="size-5 sm:size-6 2xl:size-7" />
                  ) : (
                    <ChevronRight className="size-5 sm:size-6 2xl:size-7" />
                  )}
                </button>
              </div>
            ) : null}
          </div>

          {/* Programs Grid — حتى 4 برامج تُعرض دفعة واحدة؛ أكثر من 4 يُفعَّل الكاروسيل */}
          <div
            className={cn(
              "grid gap-8 mb-2",
              gridClass,
            )}
          >
            {visiblePrograms.map((program, idx) => (
              <div
                key={`${program.id}-${idx}`}
                className="group relative h-[400px] overflow-hidden transition-all duration-500 hover:scale-105 rounded-xl shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    fill
                    src={resolveUploadImageSrc(program.image)}
                    alt={program.titleAr ?? program.titleEn}
                    sizes="(min-width: 1536px) 33vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
                  />
                  <div
                    className="absolute inset-0"
                    style={carouselImageOverlayStyle(program.gradient)}
                  />
                </div>

                {/* Program Title */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end bg-gradient-to-t from-black/70 via-black/35 to-transparent p-6 min-h-[38%]">
                  <h3
                    className="text-2xl text-white leading-relaxed break-words transition-transform duration-300 group-hover:translate-y-[-8px]"
                    style={{ fontFamily: "Cairo" }}
                  >
                    {isRtl ? program.titleAr : program.titleEn}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#254151]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link
                    href={program.href}
                    className="size-12 bg-white flex items-center justify-center rounded-lg"
                  >
                    {isRtl ? (
                      <ChevronLeft className="size-6 text-[#254151]" />
                    ) : (
                      <ChevronRight className="size-6 text-[#254151]" />
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline — عند أكثر من 4 برامج */}
          {showCarouselChrome ? (
            <div className="relative py-8">
              {/* Single Row of Pills */}
              <div
                className="relative flex justify-center items-center gap-2 sm:gap-3 max-w-full mx-auto overflow-x-auto px-1"
                style={{ zIndex: 10 }}
              >
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => setCurrentIndex(index)}
                  >
                    {/* Pill Button */}
                    <div
                      className={`relative px-4 py-2 ${isRtl ? "pr-10" : "pl-10"} rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 text-gray-700 overflow-hidden group/pill bg-white`}
                      style={{
                        fontFamily: "Cairo",
                      }}
                    >
                      {/* Background Circle - starts gray from right, turns blue and expands on hover */}
                      <div
                        className={`absolute top-1/2 ${isRtl ? "right-1" : "left-1"}  
                                            w-7 h-7 bg-gray-400 rounded-full transform -translate-y-1/2 transition-all duration-500 ease-out group-hover/pill:bg-[#6096b4] group-hover/pill:scale-[30] group-hover/pill:translate-x-[-400%]`}
                        style={{ zIndex: 0 }}
                      ></div>

                      {/* Text */}
                      <span className="relative z-10 group-hover/pill:text-white transition-colors duration-300">
                        {isRtl ? program.titleAr : program.titleEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Navigation Dots */}
          {showCarouselChrome ? (
            <div className="flex justify-center items-center gap-2 mt-8">
              {programs.map((program, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex ||
                    index === (currentIndex + 1) % programs.length ||
                    index === (currentIndex + 2) % programs.length
                      ? "size-2.5 2xl:size-3.5"
                      : "size-2 2xl:size-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentIndex ||
                      index === (currentIndex + 1) % programs.length ||
                      index === (currentIndex + 2) % programs.length
                        ? program.color
                        : undefined,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
