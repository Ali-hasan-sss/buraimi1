import { Calendar } from "lucide-react";

export default function CalendarHeader() {
    return (
        <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-20 overflow-hidden">

            <div className="relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-16 h-0.5 bg-gradient-to-l from-[#c2a772] to-transparent"></div>
                        <Calendar className="size-8 text-[#c2a772]" />
                        <div className="w-16 h-0.5 bg-gradient-to-r from-[#c2a772] to-transparent"></div>
                    </div>
                    <h1 className="text-5xl lg:text-6xl text-white mb-6">
                        التقويم الأكاديمي
                    </h1>
                    <p className="text-white/90 text-xl leading-relaxed">
                        مواعيد العام الدراسي والفصول الأكاديمية لكلية البريمي الجامعية
                    </p>
                </div>
            </div>
        </section>

    )
}