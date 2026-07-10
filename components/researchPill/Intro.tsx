"use client";

import { Award, BookOpen, Globe, Sparkles, Target } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

const t: Record<
    LocaleKey,
    {
        "heading": string;
        "paragraph": string;
        "callout": {
            "part1": string;
            "part1Connector": string;
            "oman2040": string;
            "part2": string;
            "ninePillars": string;
            "part3": string;
        };
        "quickStats": {
            "labels": [string, string, string, string];
        };
    }
> = {
    ar: {
        "heading": "نبذة عامة",
        "paragraph": "تهدف وحدة البحث العلمي والابتكار إلى تعزيز الرؤية وبيئة علمية مفتوحة داخل الأنشطة البحثية. ويشمل ذلك تعزيز الابتكار، وضمان تمويل البحوث المستدامة، وتعزيز النمو الاقتصادي من خلال خدمات الاستشارات. بالإضافة إلى ذلك، تؤكد الوحدة على أهمية بيئة التعلم المستمر، والتي تعمل كأداة حيوية للتنمية المهنية.",
        "callout": {
            "part1": "تتماشى هذه الجهود",
            "part1Connector": "مع الأهداف الموضحة في",
            "oman2040": "رؤية عمان 2040",
            "part2": "والخطة الاستراتيجية لكلية البريمي الجامعية، وخاصة إنشاء اقتصاد متكامل وتنافسي. تركز الوحدة على",
            "ninePillars": "تسعة ركائز بحثية",
            "part3": "لتحقيق هذه الأهداف.",
        },
        "quickStats": {
            "labels": ["ركائز رئيسية", "رؤية عمان", "الالتزام بالتميز", "الابتكار المستمر"],
        },
    },
    en: {
        "heading": "Overview",
        "paragraph": "The Scientific Research and Innovation Unit aims to foster an open scientific vision and environment within research activities. This includes promoting innovation, ensuring sustainable research funding, and supporting economic growth through consultancy services. In addition, the unit emphasizes the importance of a continuous learning environment as a vital tool for professional development.",
        "callout": {
            "part1": "These efforts align",
            "part1Connector": "with the goals outlined in",
            "oman2040": "Oman Vision 2040",
            "part2": "with the goals outlined in and with Al Buraimi University College’s strategic plan—especially the creation of an integrated and competitive economy. The unit focuses on",
            "ninePillars": "nine research pillars",
            "part3": "to achieve these goals.",
        },
        "quickStats": {
            "labels": ["Key Pillars", "Oman Vision", "Commitment to Excellence", "Continuous Innovation"],
        },
    },
};

const quickStatsMeta = [
    { "number": "9", "icon": Target, "color": "blue" },
    { "number": "2040", "icon": Globe, "color": "green" },
    { "number": "100%", "icon": Award, "color": "purple" },
    { "number": "∞", "icon": Sparkles, "color": "amber" },
] as const;

export default function Intro() {
    const locale = useLocale();
    const localeVal: LocaleKey = locale === "ar" ? "ar" : "en";
    const content = t[localeVal];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-2xl p-10 border-2 border-blue-200">
                    <div className="flex items-start gap-6">
                        <div className="bg-blue-600 text-white size-20 rounded-full flex items-center justify-center flex-shrink-0">
                            <BookOpen className="size-10" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-[#254151] mb-6">{content.heading}</h2>
                            <p className="text-gray-700 text-xl leading-relaxed mb-6">
                                {content.paragraph}
                            </p>
                            <div className="bg-white rounded-lg p-6 border-2 border-blue-300 shadow-md">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    <strong className="text-blue-700">{content.callout.part1}</strong> {" "}
                                    {content.callout.part1Connector} {" "}
                                    <strong className="text-blue-700">{content.callout.oman2040}</strong> {" "}
                                    {content.callout.part2} {" "}
                                    <strong className="text-blue-700">{content.callout.ninePillars}</strong> {" "}
                                    {content.callout.part3}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                    {quickStatsMeta.map((stat, index) => (
                        <div key={index} className={`bg-white rounded-lg shadow-xl p-8 border-2 border-${stat.color}-200 text-center hover:shadow-2xl transition-all`}>
                            <div className={`bg-${stat.color}-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className="size-8" />
                            </div>
                            <h3 className={`text-4xl font-bold text-${stat.color}-700 mb-2`}>{stat.number}</h3>
                            <p className="text-gray-700 font-semibold">{content.quickStats.labels[index]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}