"use client"
import { TrendingUp } from "lucide-react";
import { useLocale } from "next-intl";

export default function ProfHero() {
    const data = {
        ar: {
            title: "التطوير الوظيفي",
            subTitle: "Professional Development",
            description: "تنظيم الندوات والمنتديات وورش العمل لتعزيز ثقافة التعلم المستمر"
        },
        en: {
            title: "Professional Development",
            subTitle: "التطوير الوظيفي",
            description: "Organizing seminars, forums, and workshops to enhance a culture of continuous learning"
        }

    }

    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"
    const currentData = data[locVal]
    return (
        <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] text-white py-20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                            <TrendingUp className="size-20" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold mb-4">{currentData.title}</h1>
                    <h2 className="text-3xl font-bold mb-6 opacity-90">
                        {currentData.subTitle}
                    </h2>
                    <p className="text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                        {currentData.description}
                    </p>
                </div>
            </div>
        </section>
    )
}