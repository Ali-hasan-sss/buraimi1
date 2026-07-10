"use client"
import * as React from "react"
import { ArrowLeft, ArrowRight, Search } from "lucide-react";


import motifPattern from '@/public/assets/45a75d0cafcfcebe2c8053e8b7812df4739c5eff.png';
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function What() {
    const locale = useLocale()
    const isAr = locale === "ar"
    const localeKey: "ar" | "en" = locale === "ar" ? "ar" : "en"
    const [selectedFilter, setSelectedFilter] = React.useState("")
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedCollege, setSelectedCollege] = React.useState("all")

    const items = React.useMemo(() => {
        const itemsByLocale: Record<"ar" | "en", Array<{ title: string; description: string; link: string; color: string }>> = {
            ar: [
                {
                    title: "البرامج الأكاديمية",
                    description: "اكتشف برامجنا المتنوعة في مختلف التخصصات",
                    color: "#5f92ae",
                    link: "/main/department",
                },
                {
                    title: "البحث والابتكار",
                    description: "تعرف على إنجازاتنا البحثية واكتشافاتنا الرائدة",
                    color: "#1e3540",
                    link: "/main/research-highlights",
                },
                {
                    title: "الحياة الطلابية",
                    description: "استكشف المرافق المتطورة، وانضم إلى الأندية والمنظمات الطلابية المتنوعة",
                    color: "#aa9364",
                    link: "/main/student-life",
                },
            ],
            en: [
                {
                    title: "Academic Programs",
                    description: "Explore our diverse programs across different disciplines",
                    color: "#5f92ae",
                    link: "/main/department",
                },
                {
                    title: "Research and Innovation",
                    description: "Discover our research achievements and pioneering discoveries",
                    color: "#1e3540",
                    link: "/main/research-highlights",
                },
                {
                    title: "Student Life",
                    description: "Explore advanced facilities and join diverse student clubs and organizations",
                    color: "#aa9364",
                    link: "/main/student-life",
                },
            ],
        }

        return itemsByLocale[localeKey]
    }, [localeKey])

    const content = React.useMemo(() => {
        const byLocale = {
            ar: {
                whatTitle: "ما الذي يحدث",
                discoverMore: "اكتشف المزيد",
                searchTitle: "ابحث عن البرنامج",
                searchButton: "البحث",
                searchLabel: "ابحث عن البرنامج",
                colleges: {
                    all: "جميع الأقسام",
                    engineering: "قسم الهندسة",
                    business: "قسم إدارة الأعمال",
                    law: "قسم الحقوق",
                },
                filters: {
                    bachelor: "البكالوريوس",
                    master: "الدراسات العليا - برامج الماجستير",
                    diploma: "الدبلوم العالي",
                    phd: "الدراسات العليا - برامج الدكتوراه",
                },
            },
            en: {
                whatTitle: "What's Happening",
                discoverMore: "Discover More",
                searchTitle: "Search for a Program",
                searchButton: "Search",
                searchLabel: "Search for a program",
                colleges: {
                    all: "All departments",
                    engineering: "Engineering Department",
                    business: "Business Administration Department",
                    law: "Law Department",
                },
                filters: {
                    bachelor: "Bachelor's",
                    master: "Graduate Studies - Master's Programs",
                    diploma: "Higher Diploma",
                    phd: "Graduate Studies - PhD Programs",
                },
            },
        } as const

        return byLocale[localeKey]
    }, [localeKey])

    const filters = React.useMemo(() => [
        { id: "bachelor", label: content.filters.bachelor },
        { id: "master", label: content.filters.master },
        { id: "diploma", label: content.filters.diploma },
        { id: "phd", label: content.filters.phd },
    ], [content.filters])

    return (
        <section dir={isAr ? "rtl" : "ltr"} className="py-3 bg-gradient-to-b from-gray-50 to-white relative pt-32">
            <div className="relative z-10">
                <div className="px-4 md:px-8 lg:px-16">
                    <div className="mb-6">
                        <h2 className={`text-2xl font-black text-[#254151] mb-12 ${isAr ? "text-right" : "text-left"}`} style={{ fontFamily: "Cairo", fontWeight: 900, letterSpacing: "-0.02em" }}>
                            {content.whatTitle}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {items.map(({ title, description, link, color }) => (
                                <Link
                                    key={title}
                                    href={link}
                                    className="group relative transition-all duration-500 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
                                    style={{ backgroundColor: color, aspectRatio: "3 / 1" }}
                                >
                                    <div
                                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700 ${isAr ? "translate-x-full group-hover:translate-x-0" : "-translate-x-full group-hover:translate-x-0"}`}
                                        style={{
                                            backgroundImage: `url(${motifPattern.src})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            maskImage: `linear-gradient(to ${isAr ? "left" : "right"}, black 0%, black 50%, transparent 100%)`,
                                            WebkitMaskImage: `linear-gradient(to ${isAr ? "left" : "right"}, black 0%, black 50%, transparent 100%)`,
                                        }}
                                    />
                                    <div className="relative z-10 px-5 py-4 flex flex-col h-full justify-between">
                                        <div className={`${isAr ? "text-right" : "text-left"} overflow-hidden`}>
                                            <h3 className="text-base text-white mb-1 leading-tight transition-colors duration-500 font-bold">
                                                {title}
                                            </h3>
                                            <p className="text-white/95 text-xs leading-snug">
                                                {description}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 mt-2 self-start ${isAr ? "translate-x-full group-hover:translate-x-0" : "-translate-x-full group-hover:translate-x-0"}`}>
                                            {isAr ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
                                            <span className="text-xs font-semibold whitespace-nowrap">{content.discoverMore}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className={`text-2xl font-black text-[#254151] mb-12 ${isAr ? "text-right" : "text-left"}`} style={{ fontFamily: "Cairo", fontWeight: 900, letterSpacing: "-0.02em" }}>
                            {content.searchTitle}
                        </h2>
                        <div className="flex justify-start">
                            <div className="w-full lg:w-2/3 space-y-6">
                                <div className="flex justify-start">
                                    <div className="w-full md:w-64">
                                        <select
                                            value={selectedCollege}
                                            onChange={(e) => setSelectedCollege(e.target.value)}
                                            className="w-full px-4 py-3 text-sm border-2 border-gray-300 focus:border-[#6096b4] focus:outline-none transition-colors rounded-lg text-left bg-white appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "right 0.75rem center",
                                                backgroundSize: "1.25rem",
                                                paddingRight: "2.5rem",
                                            }}
                                        >
                                            <option value="all">{content.colleges.all}</option>
                                            <option value="engineering">{content.colleges.engineering}</option>
                                            <option value="business">{content.colleges.business}</option>
                                            <option value="law">{content.colleges.law}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-8 justify-start items-center">
                                    {filters.map((filter) => (
                                        <label key={filter.id} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    name="program-filter"
                                                    checked={selectedFilter === filter.id}
                                                    onChange={() => setSelectedFilter(filter.id)}
                                                    className="peer sr-only"
                                                />
                                                <div className="size-5 border-2 border-gray-400 peer-checked:border-[#6096b4] peer-checked:bg-white transition-all flex items-center justify-center rounded-full">
                                                    <div className="size-2.5 bg-[#6096b4] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                            <span className="text-base text-gray-700 group-hover:text-[#254151] transition-colors">{filter.label}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-4 py-4 pl-12 text-base border-2 border-gray-300 focus:border-[#6096b4] focus:outline-none transition-colors rounded-lg text-left bg-white h-[60px]"
                                        />
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
                                    </div>
                                    <Button className="bg-gradient-to-r from-[#6096b4] to-[#254151] hover:from-[#254151] hover:to-[#6096b4] text-white px-12 py-4 text-lg rounded-lg transition-all h-[60px] whitespace-nowrap flex-shrink-0">
                                        {content.searchButton}
                                    </Button>
                                </div>

                                <div className={isAr ? "text-right" : "text-left"}>
                                    <span className="text-sm text-gray-500">{content.searchLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}