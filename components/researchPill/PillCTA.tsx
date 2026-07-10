"use client"
import { ChevronLeft, ChevronRight, Microscope, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

type LocaleKey = "ar" | "en";

const t: Record<
    LocaleKey,
    {
        "title": string;
        "subtitle": string;
        "links": {
            "researchUnit": string;
            "contactDirectory": string;
            "backHome": string;
        };
    }
> = {
    ar: {
        "title": "هل لديك استفسارات عن البحث العلمي؟",
        "subtitle": "تواصل معنا للحصول على مزيد من المعلومات حول وحدة البحث العلمي والابتكار",
        "links": {
            "researchUnit": "وحدة البحث العلمي",
            "contactDirectory": "دليل التواصل",
            "backHome": "العودة للرئيسية",
        },
    },
    en: {
        "title": "Do you have questions about scientific research?",
        "subtitle": "Contact us to learn more about the Scientific Research and Innovation Unit",
        "links": {
            "researchUnit": "Scientific Research Unit",
            "contactDirectory": "Contact Directory",
            "backHome": "Back to Home",
        },
    },
};

export default function PillCTA() {
    const locale = useLocale();
    const localeVal: LocaleKey = locale == "ar" ? "ar" : "en";
    const content = t[localeVal];
    const BackIcon = localeVal === "ar" ? ChevronLeft : ChevronRight;

    return (
        <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">{content.title}</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    {content.subtitle}
                </p>
                <div className=" grid sm:flex flex-wrap justify-center gap-4">
                    <Link
                        href="/main/scientific-research"
                        className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                    >
                        <Microscope className="size-6" />
                        <span>{content.links.researchUnit}</span>
                    </Link>
                    <Link
                        href="/main/contact-directory"
                        className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                    >
                        <Phone className="size-6" />
                        <span>{content.links.contactDirectory}</span>
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"
                    >
                        <BackIcon className="size-6" />
                        <span>{content.links.backHome}</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}