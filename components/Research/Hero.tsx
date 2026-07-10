"use client"
import { FlaskConical } from "lucide-react";
import { useLocale } from "next-intl";

export default function ResHero() {
    const data = {
        ar: {
            title: "البحث العلمي",
            description: "نلتزم في كلية البريمي الجامعية بتعزيز ثقافة البحث العلمي والابتكار من خلال توفير بيئة بحثية متميزة وموارد شاملة تدعم التميز الأكاديمي والتطوير المستمر"
        },
        en: {
            title: "Scientific Research",
            description: "We are committed at Al Buraimi University College to promoting a culture of scientific research and innovation by providing a distinguished research environment and comprehensive resources that support academic excellence and continuous development"
        }
    }

    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false
    return (
        <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-3 mb-8">
                    <div className="w-20 h-0.5 bg-gradient-to-l from-[#c2a772] to-transparent"></div>
                    <FlaskConical className="size-10 text-[#c2a772]" />
                    <div className="w-20 h-0.5 bg-gradient-to-r from-[#c2a772] to-transparent"></div>
                </div>

                <h1 className="text-2xl lg:text-5xl 2xl:text-6xl text-white mb-6 font-black">
                    {isRtl ? data.ar.title : data.en.title}
                </h1>

                <p className="text-white/90 text-md lg:text-xl  leading-relaxed max-w-3xl mx-auto">
                    {isRtl ? data.ar.description : data.en.description}
                </p>
            </div>
        </section>

    )
}