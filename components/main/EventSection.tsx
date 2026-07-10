"use client"
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import type { EventItemFromAPI } from '@/types/event';

export function EventsSection() {
    const [activeTab, setActiveTab] = useState<'events' | 'conferences' | 'student'>('events');
    const [upcomingPage, setUpcomingPage] = useState(0);
    const [pastPage, setPastPage] = useState(0);
    const [events, setEvents] = useState<EventItemFromAPI[]>([]);

    const locale = useLocale();
    const isRTL = locale === 'ar';
    const localeKey: 'ar' | 'en' = isRTL ? 'ar' : 'en';

    const PAGE_SIZE = 3;

    useEffect(() => {
        async function loadEvents() {
            try {
                const res = await fetch('/api/events', { cache: 'no-store' });
                const json = await res.json() as { ok: boolean; data?: EventItemFromAPI[] };
                if (json.ok && Array.isArray(json.data)) {
                    setEvents(json.data);
                }
            } catch {
                setEvents([]);
            }
        }
        void loadEvents();
    }, []);

    useEffect(() => {
        setUpcomingPage(0);
        setPastPage(0);
    }, [activeTab]);

    const now = useMemo(() => new Date(), []);
    const filteredByTab = useMemo(
        () => events.filter((e) => e.type === activeTab),
        [events, activeTab]
    );
    const upcomingEvents = useMemo(
        () => filteredByTab.filter((e) => new Date(e.date) >= now),
        [filteredByTab, now]
    );
    const pastEvents = useMemo(
        () => filteredByTab.filter((e) => new Date(e.date) < now),
        [filteredByTab, now]
    );
    const featuredEvent = upcomingEvents[0] || pastEvents[0];

    const upcomingMaxPage = Math.max(0, Math.ceil(upcomingEvents.length / PAGE_SIZE) - 1);
    const pastMaxPage = Math.max(0, Math.ceil(pastEvents.length / PAGE_SIZE) - 1);

    const upcomingVisible = useMemo(() => {
        const start = upcomingPage * PAGE_SIZE;
        return upcomingEvents.slice(start, start + PAGE_SIZE);
    }, [upcomingEvents, upcomingPage]);

    const pastVisible = useMemo(() => {
        const start = pastPage * PAGE_SIZE;
        return pastEvents.slice(start, start + PAGE_SIZE);
    }, [pastEvents, pastPage]);

    const t = useMemo(() => {
        const byLocale = {
            ar: {
                tabs: {
                    events: 'فعاليات',
                    conferences: 'مؤتمرات',
                    student: 'أنشطة طلاب',
                },
                calendar: {
                    topDate: '14 يناير',
                    year: '2026',
                    currentDate: '15 يناير',
                    nextDates: ['16 يناير', '17 يناير'],
                    featuredDate: '14 يناير',
                    featuredKicker: 'تهنئة تقويم الأحداث',
                    featuredTitle: 'المؤتمر الدولي الثاني للعلوم الرياضية في الشارقة (UOS-SICMS26)',
                    readMore: 'اقرأ المزيد',
                },
                sections: {
                    upcoming: 'فعاليات قادمة',
                    past: 'فعاليات سابقة',
                },
            },
            en: {
                tabs: {
                    events: 'Events',
                    conferences: 'Conferences',
                    student: 'Student Activities',
                },
                calendar: {
                    topDate: 'Jan 14',
                    year: '2026',
                    currentDate: 'Jan 15',
                    nextDates: ['Jan 16', 'Jan 17'],
                    featuredDate: 'Jan 14',
                    featuredKicker: 'Events Calendar Greeting',
                    featuredTitle: 'Second International Conference on Mathematical Sciences in Sharjah (UOS-SICMS26)',
                    readMore: 'Read more',
                },
                sections: {
                    upcoming: 'Upcoming Events',
                    past: 'Past Events',
                },
            },
        } as const;

        return byLocale[localeKey];
    }, [localeKey]);

    return (
        <section dir={isRTL ? 'rtl' : 'ltr'} className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
            <div className="relative z-10">
                <div className="px-4 md:px-8 lg:px-16">

                    {/* Tabs */}
                    <div className="flex justify-start gap-8 mb-12 border-b-2 border-gray-200 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`pb-4 px-2 text-xl relative transition-all ${activeTab === 'events'
                                ? 'text-[#254151]'
                                : 'text-gray-400 hover:text-[#254151]'
                                }`}
                        >
                            {t.tabs.events}
                            {activeTab === 'events' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#6096b4]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('conferences')}
                            className={`pb-4 px-2 text-xl relative transition-all ${activeTab === 'conferences'
                                ? 'text-[#254151]'
                                : 'text-gray-400 hover:text-[#254151]'
                                }`}
                        >
                            {t.tabs.conferences}
                            {activeTab === 'conferences' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#6096b4]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('student')}
                            className={`pb-4 px-2 text-xl relative transition-all ${activeTab === 'student'
                                ? 'text-[#254151]'
                                : 'text-gray-400 hover:text-[#254151]'
                                }`}
                        >
                            {t.tabs.student}
                            {activeTab === 'student' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#6096b4]" />
                            )}
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
                        {/* Calendar Widget - Left Side */}
                        <div className="order-1 h-full">
                            <div className="bg-[#1f3540] rounded-2xl shadow-xl text-white overflow-hidden h-full flex flex-col">
                                {/* Calendar Header */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`flex flex-col w-full ${isRTL ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-sm">{t.calendar.topDate}</span>
                                                <div className="size-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="text-[100px] leading-none font-light">{t.calendar.year}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date List */}
                                <div className="px-6 pb-4 flex-1 flex flex-col justify-end">
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button className="size-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
                                                    {isRTL ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
                                                </button>
                                                <button className="size-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
                                                    {isRTL ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
                                                </button>
                                            </div>
                                            <div className="text-2xl">{t.calendar.currentDate}</div>
                                        </div>
                                        <div className={`text-2xl text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}>{t.calendar.nextDates[0]}</div>
                                        <div className={`text-2xl text-white/40 ${isRTL ? 'text-right' : 'text-left'}`}>{t.calendar.nextDates[1]}</div>
                                    </div>

                                    {/* Featured Event Card */}
                                    <div className="bg-[#182a32] rounded-xl p-6">
                                        <div className="mb-4">
                                            <div className="text-xs text-white/70 mb-1">
                                                {featuredEvent
                                                    ? new Date(featuredEvent.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')
                                                    : t.calendar.featuredDate}
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="size-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="text-sm text-white/90">
                                                    {featuredEvent
                                                        ? (isRTL ? featuredEvent.locationAr : featuredEvent.locationEn)
                                                        : t.calendar.featuredKicker}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className={`text-base leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {featuredEvent ? (isRTL ? featuredEvent.titleAr : featuredEvent.titleEn) : t.calendar.featuredTitle}
                                        </h3>
                                        <Link href={featuredEvent ? `/main/events/${featuredEvent.slug}` : "/main"} className="w-full bg-[#6096b4] hover:bg-[#4e7d99] text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                                            {isRTL ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
                                            <span>{t.calendar.readMore}</span>
                                        </Link >
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Events List - Right Side */}
                        <div className="order-2 min-w-0">
                            {/* Upcoming Events */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-2xl text-[#254151] ${isRTL ? 'text-right' : 'text-left'}`}>{t.sections.upcoming}</h2>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setUpcomingPage((p) => Math.min(upcomingMaxPage, p + 1))}
                                            disabled={upcomingPage >= upcomingMaxPage}
                                            className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            {isRTL ? <ChevronLeft className="size-5 text-gray-600" /> : <ChevronRight className="size-5 text-gray-600" />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUpcomingPage((p) => Math.max(0, p - 1))}
                                            disabled={upcomingPage <= 0}
                                            className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            {isRTL ? <ChevronRight className="size-5 text-gray-600" /> : <ChevronLeft className="size-5 text-gray-600" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {upcomingVisible.map((event) => (
                                        <div
                                            key={event._id}
                                            className="bg-gray-100/50 rounded-xl hover:bg-[#6193ad] transition-all duration-300 overflow-hidden group cursor-pointer relative p-6 min-h-[220px] flex flex-col"
                                        >
                                            <div className={`text-sm text-gray-600 group-hover:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'} transition-colors`}>{new Date(event.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</div>
                                            <h3 className={`text-lg text-[#254151] group-hover:text-white leading-relaxed ${isRTL ? 'text-right' : 'text-left'} flex-1 mb-12 transition-colors`}>
                                                {isRTL ? event.titleAr : event.titleEn}
                                            </h3>
                                            <div className="absolute bottom-6 left-6">
                                                <Link href={`/main/events/${event.slug}`} className="size-12 bg-[#6096b4] group-hover:bg-white rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                                                    {isRTL ? (
                                                        <ArrowLeft className="size-5 text-white group-hover:text-[#6193ad] transition-colors" />
                                                    ) : (
                                                        <ArrowRight className="size-5 text-white group-hover:text-[#6193ad] transition-colors" />
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Past Events */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-2xl text-[#254151] ${isRTL ? 'text-right' : 'text-left'}`}>{t.sections.past}</h2>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setPastPage((p) => Math.min(pastMaxPage, p + 1))}
                                            disabled={pastPage >= pastMaxPage}
                                            className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            {isRTL ? <ChevronLeft className="size-5 text-gray-600" /> : <ChevronRight className="size-5 text-gray-600" />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPastPage((p) => Math.max(0, p - 1))}
                                            disabled={pastPage <= 0}
                                            className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            {isRTL ? <ChevronRight className="size-5 text-gray-600" /> : <ChevronLeft className="size-5 text-gray-600" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {pastVisible.map((event) => (
                                        <div
                                            key={event._id}
                                            className="bg-gray-100/50 rounded-xl hover:bg-[#6193ad] transition-all duration-300 overflow-hidden group cursor-pointer relative p-6 min-h-[220px] flex flex-col"
                                        >
                                            <div className={`text-sm text-gray-600 group-hover:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'} transition-colors`}>{new Date(event.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</div>
                                            <h3 className={`text-lg text-[#254151] group-hover:text-white leading-relaxed ${isRTL ? 'text-right' : 'text-left'} flex-1 mb-12 transition-colors`}>
                                                {isRTL ? event.titleAr : event.titleEn}
                                            </h3>
                                            <div className={`absolute bottom-6 ${isRTL ? 'left-6' : 'right-6'}`}>
                                                <Link href={`/main/events/${event.slug}`} className="size-12 bg-[#6096b4] group-hover:bg-white rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                                                    {isRTL ? (
                                                        <ArrowLeft className="size-5 text-white group-hover:text-[#6193ad] transition-colors" />
                                                    ) : (
                                                        <ArrowRight className="size-5 text-white group-hover:text-[#6193ad] transition-colors" />
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}