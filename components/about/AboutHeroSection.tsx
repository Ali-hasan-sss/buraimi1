"use clinet"
import { motion } from 'framer-motion';
import { Building2, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image, { type StaticImageData } from 'next/image';

export default function AboutHeroSection({
    onScrollToContent,
}: {
    onScrollToContent: () => void;
}) {
    const t = useTranslations('navbar');
    const tAbout = useTranslations("about")
    return (
        <div className="relative h-[360px] sm:h-[420px] md:h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    fill
                    src={'/assets/about/foundation_landing.webp'}
                    alt="كلية البريمي الجامعية"
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#6096b4]/60 via-[#7aa5be]/50 to-[#a8c5d8]/40"></div>
            </div>

            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                ></div>
            </div>

            <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6">
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <Building2 className="size-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl break-words">
                            {t("about")}
                        </h1>
                        <p className="text-lg sm:text-2xl md:text-3xl text-blue-100 mb-6 sm:mb-8 drop-shadow-lg break-words">
                            {tAbout("title")}
                        </p>
                        <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-[#c2a772] to-transparent rounded-full mb-5 sm:mb-8"></div>
                        <p className="text-sm sm:text-lg text-white/90 max-w-2xl mx-auto break-words">
                            {tAbout("sub")}
                        </p>
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={onScrollToContent}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/80 text-sm font-medium group-hover:text-[#c2a772] transition-colors">
                        اكتشف المزيد
                    </span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center group-hover:bg-[#c2a772] group-hover:border-[#c2a772] transition-all duration-300">
                        <ChevronDown className="size-6 text-white" />
                    </div>
                </div>
            </motion.button>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6096b4] via-[#c2a772] to-[#6096b4]"></div>
        </div>
    );
}

