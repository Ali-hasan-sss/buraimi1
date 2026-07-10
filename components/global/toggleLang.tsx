'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LangSwitcher(
    {
        className
    }: {
        className?: string
    }
) {
    const locale = useLocale();

    const handleSwitch = (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        window.location.reload();
    };

    return (
        <div className={`min-w-fit `}>
            <Button
                type="button"
                size="sm"
                variant="ghost"
                className={` h-9 rounded-full bg-white/10 px-3 text-xs cursor-pointer text-white hover:bg-white/15 hover:text-white/90
                        ${className}
                    `}
                onClick={() => handleSwitch(locale == "en" ? "ar" : "en")}
            >
                <Globe className="me-2 h-4 w-4" />
                <span className=" font-medium tracking-wide md:hidden">
                    {locale == "en" ? "AR" : "EN"}
                </span>
                <span className="hidden  font-medium tracking-wide md:inline">
                    {locale == "en" ? "Arabic" : "الانجليزية"}
                </span>
            </Button>
        </div>
    );
}