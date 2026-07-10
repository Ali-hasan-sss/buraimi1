"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
    CalendarDays, MapPin, Globe, Mail, ChevronDown, ChevronUp,
    Users, FileText, Mic2, Clock, BookOpen, Send, Award, Layers,
} from "lucide-react";

const BRAND = "#254151";
const ACCENT = "#6096b4";

const trackStyles = [
    { color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600", dotColor: "bg-blue-600" },
    { color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600", dotColor: "bg-emerald-600" },
    { color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600", dotColor: "bg-purple-600" },
];

const trackItems = [
    [
        "Emerging technologies and digital transformation",
        "Data science, Analytics & Big Data",
        "Artificial Intelligence, Machine Learning, and Robotics",
        "Smart Systems of blockchain and IoT",
        "Cybersecurity, privacy and trust in technologies",
        "Digital Transformation and Sustainable Innovation",
        "Immersive technologies of AR/VR and XR",
    ],
    [
        "Sustainable business models",
        "Digital transformation of business practices",
        "Innovation, entrepreneurship and value creation",
        "Leadership, organisational behaviour and cultural practices",
        "Strategic management and organisational development",
        "Marketing and branding in the digital era",
        "Finance, investment and sustainable economic practices",
        "Economy and digital business ecosystems",
    ],
    [
        "Digital literacy practices in linguistics and language education",
        "AI-assisted translation and language technology",
        "AI-enhanced teaching and learning strategies",
        "Digital literature and its role in education",
        "Interactive Digital Literacies in Language Learning",
        "Digital Pedagogy and E-learning Innovations",
    ],
];

const trackItemsAr = [
    [
        "التقنيات الناشئة والتحول الرقمي",
        "علوم البيانات والتحليلات والبيانات الضخمة",
        "الذكاء الاصطناعي والتعلم الآلي والروبوتات",
        "الأنظمة الذكية لـ Blockchain وإنترنت الأشياء",
        "الأمن السيبراني والخصوصية والثقة في التقنيات",
        "التحول الرقمي والابتكار المستدام",
        "تقنيات الغمر AR/VR وXR",
    ],
    [
        "نماذج الأعمال المستدامة",
        "التحول الرقمي لممارسات الأعمال",
        "الابتكار وريادة الأعمال وخلق القيمة",
        "القيادة والسلوك التنظيمي والممارسات الثقافية",
        "الإدارة الاستراتيجية والتطوير التنظيمي",
        "التسويق والعلامة التجارية في العصر الرقمي",
        "المالية والاستثمار والممارسات الاقتصادية المستدامة",
        "الاقتصاد وأنظمة الأعمال الرقمية",
    ],
    [
        "ممارسات محو الأمية الرقمية في تعليم اللغة",
        "الترجمة المدعومة بالذكاء الاصطناعي وتكنولوجيا اللغة",
        "استراتيجيات التعليم والتعلم المعززة بالذكاء الاصطناعي",
        "الأدب الرقمي ودوره في التعليم",
        "محو الأمية الرقمية التفاعلية في تعلم اللغة",
        "التربية الرقمية وابتكارات التعليم الإلكتروني",
    ],
];

const speakers = [
    { name: "Dr. Musab Alrawi", country: "Sultanate of Oman", countryAr: "سلطنة عُمان", flag: "🇴🇲" },
    { name: "Dr. Khaled Shaalan", country: "UAE", countryAr: "الإمارات العربية المتحدة", flag: "🇦🇪" },
    { name: "Dr. Emmanuel Gofi", country: "Paris, France", countryAr: "باريس، فرنسا", flag: "🇫🇷" },
];

const committee = [
    "Dr. Rana Alnaimi",
    "Dr. Yasser Wazeri",
    "Dr. Mohammad Fargani",
    "Dr. Sheren Alhiti",
];

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
    return (
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-12 rounded-2xl mb-4" style={{ backgroundColor: `${ACCENT}20` }}>
                <Icon className="size-6" style={{ color: ACCENT }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: BRAND, fontFamily: "Cairo" }}>{title}</h2>
            {subtitle && <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">{subtitle}</p>}
            <div className="mx-auto mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: ACCENT }} />
        </div>
    );
}

function NavDot({ label, href }: { label: string; href: string }) {
    return (
        <a
            href={href}
            className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:text-white"
            style={{ color: ACCENT }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
        >
            {label}
        </a>
    );
}

export default function ConferencePage() {
    const [openTrack, setOpenTrack] = useState<number | null>(null);
    const t = useTranslations("conference");
    const locale = useLocale();
    const isRtl = locale === "ar";

    const importantDates = [
        { labelKey: "dateOpen", date: "May 1, 2026", dateAr: "1 مايو 2026", icon: "📂", done: true },
        { labelKey: "dateSubmission", date: "Dec 15, 2026", dateAr: "15 ديسمبر 2026", icon: "📝", done: false },
        { labelKey: "dateFullPaper", date: "Feb 15, 2027", dateAr: "15 فبراير 2027", icon: "📄", done: false },
        { labelKey: "dateAcceptance", date: "Jan 1, 2027", dateAr: "1 يناير 2027", icon: "✅", done: false },
        { labelKey: "dateFinal", date: "Apr 7–8, 2027", dateAr: "7–8 أبريل 2027", icon: "🎓", done: false },
    ];

    const guidelineKeys = ["g1", "g2", "g3", "g4", "g5", "g6"] as const;

   

    const scheduleData = [
        {
            dayKey: "day1" as const,
            eventKeys: ["d1e1", "d1e2", "d1e3", "d1e4", "d1e5"] as const,
        },
        {
            dayKey: "day2" as const,
            eventKeys: ["d2e1", "d2e2", "d2e3", "d2e4", "d2e5"] as const,
        },
    ];

    const confLinks = [
        { labelKey: "confWebsite" as const, icon: Globe },
        { labelKey: "regLink" as const, icon: Users },
        { labelKey: "submitManuscript" as const, icon: Send },
        { labelKey: "submissionReview" as const, icon: FileText },
    ];

    const infoCards = [
        { icon: CalendarDays, labelKey: "dateLabel" as const, valueKey: "date" as const },
        { icon: MapPin, labelKey: "locationLabel" as const, valueKey: "location" as const },
        { icon: Globe, labelKey: "formatLabel" as const, valueKey: "format" as const },
    ];

    const trackTitleKeys = ["track1", "track2", "track3"] as const;

    return (
        <div className="min-h-screen bg-white font-sans" dir={isRtl ? "rtl" : "ltr"}>

            {/* ── HERO ── */}
            <section
                id="hero"
                className="relative overflow-hidden text-white"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #1a2f3e 50%, #0f1e29 100%)` }}
            >
                <div className="absolute -top-24 -right-24 size-96 rounded-full opacity-10" style={{ backgroundColor: ACCENT }} />
                <div className="absolute -bottom-16 -left-16 size-64 rounded-full opacity-5" style={{ backgroundColor: ACCENT }} />

               

                <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6">
                        <Award className="size-3.5" />
                        {t("badge")}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4" style={{ fontFamily: "Cairo" }}>
                        GITBPDE <span style={{ color: ACCENT }}>2027</span>
                    </h1>
                    <p className="text-lg md:text-xl font-semibold text-white/90 max-w-3xl mx-auto mb-3" style={{ fontFamily: "Cairo" }}>
                        {t("fullTitle")}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-white/80">
                        <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{t("date")}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="size-4" />{t("location")}</span>
                        <span className="flex items-center gap-1.5"><Globe className="size-4" />{t("format")}</span>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="#guidelines"
                            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: ACCENT }}
                        >
                            <Send className="size-4" />{t("submitPaper")}
                        </a>
                        <a
                            href="#dates"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
                        >
                            <CalendarDays className="size-4" />{t("importantDatesBtn")}
                        </a>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                        {t("freeEntry")}
                    </div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section id="about" className="py-16 px-4" style={{ backgroundColor: "#f7fafc" }}>
                <div className="mx-auto max-w-5xl">
                    <SectionHeader icon={BookOpen} title={t("aboutTitle")} />
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm">
                            <h3 className="font-bold text-lg mb-3" style={{ color: BRAND }}>{t("aboutHeading")}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{t("aboutText")}</p>
                        </div>
                        <div className="rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm">
                            <h3 className="font-bold text-lg mb-3" style={{ color: BRAND }}>{t("scopeHeading")}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{t("scopeText")}</p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {infoCards.map((item) => (
                            <div key={item.labelKey} className="flex items-center gap-3 rounded-2xl border border-[#dce7ef] bg-white p-4 shadow-sm">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${ACCENT}20` }}>
                                    <item.icon className="size-5" style={{ color: ACCENT }} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">{t(item.labelKey)}</p>
                                    <p className="text-sm font-semibold" style={{ color: BRAND }}>{t(item.valueKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRACKS ── */}
            <section id="tracks" className="py-16 px-4 bg-white">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader icon={Layers} title={t("tracksTitle")} subtitle={t("tracksSubtitle")} />
                    <div className="space-y-4">
                        {trackTitleKeys.map((key, idx) => {
                            const style = trackStyles[idx];
                            const items = isRtl ? trackItemsAr[idx] : trackItems[idx];
                            const isOpen = openTrack === idx;
                            return (
                                <div key={key} className={`rounded-2xl border ${style.color} overflow-hidden transition-all`}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenTrack(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-lg font-black ${style.iconColor}`}>{idx + 1}.</span>
                                            <span className="font-bold text-base" style={{ color: BRAND }}>{t(key)}</span>
                                            <span className="hidden sm:inline text-xs text-gray-400">
                                                ({items.length} {t("topicsCount")})
                                            </span>
                                        </div>
                                        {isOpen
                                            ? <ChevronUp className="size-5 shrink-0 text-gray-400" />
                                            : <ChevronDown className="size-5 shrink-0 text-gray-400" />}
                                    </button>
                                    {isOpen && (
                                        <ul className="px-6 pb-5 pt-1 grid sm:grid-cols-2 gap-2">
                                            {items.map((item) => (
                                                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className={`mt-1 shrink-0 size-1.5 rounded-full ${style.dotColor}`} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── SPEAKERS ── */}
            <section id="speakers" className="py-16 px-4" style={{ backgroundColor: "#f7fafc" }}>
                <div className="mx-auto max-w-5xl">
                    <SectionHeader icon={Mic2} title={t("speakersTitle")} />
                    <div className="grid sm:grid-cols-3 gap-6">
                        {speakers.map((s, i) => (
                            <div key={s.name} className="flex flex-col items-center text-center rounded-2xl border border-[#dce7ef] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="size-20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner"
                                    style={{ backgroundColor: `${ACCENT}15`, border: `2px solid ${ACCENT}30` }}
                                >
                                    {s.flag}
                                </div>
                                <h3 className="font-bold text-base mb-1" style={{ color: BRAND }}>{s.name}</h3>
                                <p className="text-sm text-gray-500">{isRtl ? s.countryAr : s.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── IMPORTANT DATES ── */}
            <section id="dates" className="py-16 px-4 bg-white">
                <div className="mx-auto max-w-4xl">
                    <SectionHeader icon={CalendarDays} title={t("datesTitle")} />
                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 hidden sm:block" />
                        <div className="space-y-4">
                            {importantDates.map((d, i) => (
                                <div key={i} className="flex items-start gap-4 sm:gap-6">
                                    <div
                                        className="relative z-10 shrink-0 size-12 rounded-full flex items-center justify-center text-xl shadow-sm border-2"
                                        style={{ backgroundColor: d.done ? BRAND : "white", borderColor: d.done ? BRAND : ACCENT }}
                                    >
                                        {d.icon}
                                    </div>
                                    <div className={`flex-1 rounded-2xl border p-4 ${d.done ? "border-[#254151]/20 bg-[#254151]/5" : "border-[#dce7ef] bg-white"} shadow-sm`}>
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold text-sm" style={{ color: BRAND }}>{t(d.labelKey as Parameters<typeof t>[0])}</p>
                                            <span
                                                className="text-xs font-bold px-3 py-1 rounded-full"
                                                style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
                                            >
                                                {isRtl ? d.dateAr : d.date}
                                            </span>
                                        </div>
                                        {d.done && <p className="text-xs text-emerald-600 font-medium mt-1">{t("submissionsOpen")}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SUBMISSION GUIDELINES ── */}
            <section id="guidelines" className="py-16 px-4" style={{ backgroundColor: "#f7fafc" }}>
                <div className="mx-auto max-w-4xl">
                    <SectionHeader icon={FileText} title={t("guidelinesTitle")} />
                    <div className="rounded-2xl border border-[#dce7ef] bg-white shadow-sm overflow-hidden">
                        {guidelineKeys.map((key, i) => (
                            <div key={key} className={`flex items-start gap-4 px-6 py-4 ${i < guidelineKeys.length - 1 ? "border-b border-gray-50" : ""}`}>
                                <span
                                    className="shrink-0 size-6 rounded-full flex items-center justify-center text-xs font-black text-white mt-0.5"
                                    style={{ backgroundColor: ACCENT }}
                                >
                                    {i + 1}
                                </span>
                                <p className="text-sm text-gray-600 leading-relaxed">{t(key)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Conference links */}
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                        {confLinks.map((link) => (
                            <div key={link.labelKey} className="flex items-center justify-between rounded-xl border border-[#dce7ef] bg-white px-4 py-3 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <link.icon className="size-4" style={{ color: ACCENT }} />
                                    <span className="text-sm font-medium" style={{ color: BRAND }}>{t(link.labelKey)}</span>
                                </div>
                                <span className="text-xs text-gray-400 italic">{t("comingSoon")}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SCHEDULE ── */}
            <section id="schedule" className="py-16 px-4 bg-white">
                <div className="mx-auto max-w-4xl">
                    <SectionHeader icon={Clock} title={t("scheduleTitle")} />
                    <div className="grid md:grid-cols-2 gap-6">
                        {scheduleData.map((day, di) => (
                            <div key={di} className="rounded-2xl border border-[#dce7ef] bg-white shadow-sm overflow-hidden">
                                <div className="px-5 py-3 font-bold text-sm text-white" style={{ backgroundColor: di === 0 ? BRAND : ACCENT }}>
                                    {t(day.dayKey)}
                                </div>
                                <ul className="p-4 space-y-2">
                                    {day.eventKeys.map((ek) => (
                                        <li key={ek} className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: di === 0 ? BRAND : ACCENT }} />
                                            {t(ek)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMMITTEE ── */}
            <section id="committee" className="py-16 px-4" style={{ backgroundColor: "#f7fafc" }}>
                <div className="mx-auto max-w-4xl">
                    <SectionHeader icon={Users} title={t("committeeTitle")} />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {committee.map((name) => (
                            <div key={name} className="flex flex-col items-center text-center rounded-2xl border border-[#dce7ef] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div
                                    className="size-14 rounded-full flex items-center justify-center text-xl font-black text-white mb-3"
                                    style={{ backgroundColor: BRAND }}
                                >
                                    {name.split(" ").pop()?.charAt(0)}
                                </div>
                                <p className="font-semibold text-sm" style={{ color: BRAND }}>{name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{t("committeeTitle")}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT ── */}
            <section id="contact" className="py-16 px-4" style={{ backgroundColor: BRAND }}>
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-white/10 mb-4">
                        <Mail className="size-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: "Cairo" }}>
                        {t("contactTitle")}
                    </h2>
                    <p className="text-white/70 text-sm mb-6">{t("contactDesc")}</p>
                    <a
                        href="mailto:info@buc.edu.om"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold transition-all hover:bg-white/90"
                        style={{ color: BRAND }}
                    >
                        <Mail className="size-4" />
                        info@buc.edu.om
                    </a>

                    <div className="mt-10 pt-8 border-t border-white/10 text-xs text-white/50">
                        {t("rights")}
                    </div>
                </div>
            </section>

        </div>
    );
}
