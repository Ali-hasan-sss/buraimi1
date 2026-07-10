"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarYearSelectorProps = {
  years: string[];
  activeYear: string;
  onYearChange: (year: string) => void;
};

export default function CalendarYearSelector({
  years,
  activeYear,
  onYearChange,
}: CalendarYearSelectorProps) {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {years.map((year) => {
            const isActive = activeYear === year;

            return (
              <Button
                key={year}
                type="button"
                variant="outline"
                onClick={() => onYearChange(year)}
                className={cn(
                  "px-8 py-3 h-auto rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg",
                  isActive
                    ? "bg-gradient-to-l from-[#254151] to-[#6096b4] text-white scale-105 border-transparent hover:text-white"
                    : "bg-white text-[#254151] border-2 border-[#6096b4] hover:bg-[#6096b4]/10 hover:text-[#254151]"
                )}
              >
                {year}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
