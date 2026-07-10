"use client"
import { Briefcase } from "lucide-react";
import { useLocale } from "next-intl";

export default function CuonHero() {
    const data = {
        ar: {
            title: "الاستشارات والخدمات البحثية",
            subtitle: "Consultancy & Research Service"
        },
        en: {
            title: "Consultancy & Research Service",
            subtitle: "الاستشارات والخدمات البحثية"
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
                            <Briefcase className="size-20" />
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold mb-4">
                        {currentData.title}
                    </h1>
                    <h2 className="text-3xl font-bold mb-6 opacity-90">
                        {currentData.subtitle}
                    </h2>
                    <p className="text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                        تقديم خدمات استشارية احترافية وتسويق البحث العلمي
                    </p>
                </div>
            </div>
        </section>

    )
}