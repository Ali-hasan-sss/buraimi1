"use client"
import { useEffect, useRef, useState } from 'react';
import partnersImage from '@/public/assets/fba3bfdda91dec393b4c95ad988d5d5c28a212e2.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { resolveUploadImageSrc } from '@/lib/upload-public-url';

type PartnerLogoItem = {
    _id?: string;
    name?: string;
    logo?: string;
    link?: string;
};

function toExternalUrl(url: string): string {
    const value = url.trim();
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return `https://${value}`;
}

export function Partners({ partners = [] }: { partners?: PartnerLogoItem[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const normalizedPartners = partners
        .filter((p) => (p.logo || "").trim() !== "")
        .map((p) => ({
            name: p.name || "partner",
            image: resolveUploadImageSrc((p.logo || "").trim()),
            link: (p.link || "").trim(),
        }));


    // Duplicate partners for infinite scroll effect
    const duplicatedPartners = [...normalizedPartners, ...normalizedPartners, ...normalizedPartners];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // pixels per frame

        const getItemWidth = () => {
            const firstItem = scrollContainer.firstElementChild as HTMLElement | null;
            if (!firstItem) return 220;

            const containerStyle = window.getComputedStyle(scrollContainer);
            const gap = parseFloat(containerStyle.columnGap || containerStyle.gap || "0") || 0;
            return firstItem.getBoundingClientRect().width + gap;
        };

        const animate = () => {
            if (!isPaused) {
                scrollPosition += scrollSpeed;

                // Reset position when we've scrolled through one set of partners
                const itemWidth = getItemWidth();
                const resetPoint = normalizedPartners.length * itemWidth;
                if (resetPoint <= 0) return;

                if (scrollPosition >= resetPoint) {
                    scrollPosition = 0;
                }

                if (scrollContainer) {
                    // Changed to positive value to move right (RTL direction)
                    scrollContainer.style.transform = `translateX(${scrollPosition}px)`;
                }

                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isPaused, normalizedPartners.length]);


    const tPartner = useTranslations("partners")

    return (
        <section className="pt-4 pb-20 bg-gray-50 overflow-hidden relative">

            <div className="relative z-10">
                {/* Title section with gray background */}
                <div className="bg-gray-100 py-8 mb-12 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl lg:text-4xl text-[#254151] mb-3">
                                {tPartner('title')}
                            </h2>
                            <p className="text-gray-600 text-base mb-8">
                                {tPartner("subtitle")}
                            </p>

                            {/* Partners Image */}
                            <div className="mt-6 mx-auto w-full max-w-[80%] sm:max-w-3xl lg:max-w-5xl">
                                <Image
                                    width={717}
                                    height={25}
                                    src={partnersImage}
                                    alt="شركاؤنا"
                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 700px, 900px"
                                    className="w-full h-auto mx-auto object-contain object-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrolling Logos Container - Outside Gray Background */}
                <div className="relative">
                    {/* Gradient Overlays for smooth fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 lg:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                    {/* Scrolling Container */}
                    <div className="overflow-hidden">
                        <div
                            ref={scrollRef}
                            className="flex items-center gap-6 sm:gap-10 lg:gap-16 py-6 sm:py-8"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            style={{
                                willChange: 'transform',
                                width: 'fit-content'

                            }}
                        >
                            {duplicatedPartners.length > 0 ? (
                                duplicatedPartners.map((partner, index) => {
                                    const href = toExternalUrl(partner.link || "");
                                    const content = (
                                        <Image
                                            width={100}
                                            height={75}
                                            src={partner.image}
                                            alt={partner.name || "partner"}
                                            sizes="(min-width: 1024px) 180px, (min-width: 640px) 150px, 120px"
                                            className="max-w-full max-h-full object-contain"
                                            loading="lazy"
                                        />
                                    );

                                    if (!href) {
                                        return (
                                            <div
                                                key={`${index}`}
                                                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0 w-[120px] h-[56px] sm:w-[150px] sm:h-[70px] lg:w-[180px] lg:h-[80px]"
                                            >
                                                {content}
                                            </div>
                                        );
                                    }

                                    return (
                                        <a
                                            key={`${index}`}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={partner.name || "partner"}
                                            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0 w-[120px] h-[56px] sm:w-[150px] sm:h-[70px] lg:w-[180px] lg:h-[80px]"
                                        >
                                            {content}
                                        </a>
                                    );
                                })
                            ) : (
                                <div className="w-full text-center text-sm text-gray-500 py-4">
                                    لا توجد شعارات شركاء مضافة حالياً
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}