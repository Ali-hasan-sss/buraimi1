import heroBackgroundImg from '@/public/assets/e5066bb78bcc5febdd38697aa9400a49db729215.png';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { Briefcase, Calendar, Mail, Phone, Sparkles } from 'lucide-react';
import AdminCareersDashboardButton from '@/components/main/AdminCareersDashboardButton';

type CareerFromAPI = {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    requirementsAr: string;
    requirementsEn: string;
    startDate: string;
    edDate: string;
};

export default async function Careers() {
    const locale = await getLocale();
    const isAr = locale === 'ar';

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/careers`, { cache: 'no-store' });
    const json = res.ok ? await res.json() : null;

    const careers: CareerFromAPI[] = Array.isArray(json?.data) ? (json.data as CareerFromAPI[]) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Animated Hero Section */}
            <div className="relative bg-[#254151] text-white py-20 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0">
                    <Image
                        fill
                        src={heroBackgroundImg}
                        alt="كلية البريمي الجامعية"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#254151]/95 via-[#254151]/85 to-[#1a3345]/95" />

                    {/* Decorative animated circles */}
                    <div className="absolute top-20 right-10 w-64 h-64 bg-[#6096b4]/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 left-20 w-48 h-48 bg-[#6096b4]/15 rounded-full blur-2xl animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                        <Sparkles className="w-4 h-4 text-[#6096b4]" />
                        <span className="text-sm font-medium">
                            {isAr ? "فرص عمل متميزة" : "Exciting Opportunities"}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
                        {isAr ? "الوظائف" : "Careers"}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                        {isAr
                            ? "انضم إلى فريقنا وابنِ مستقبلك المهني مع كلية البريمي الجامعية"
                            : "Join our team and build your professional future with Al Buraimi University College"
                        }
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                        <AdminCareersDashboardButton />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                {careers.length === 0 ? (
                    /* Creative Empty State */
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6096b4]/5 to-[#254151]/5 rounded-3xl transform rotate-1" />
                        <div className="relative bg-white/80 backdrop-blur-sm border-2 border-[#6096b4]/30 rounded-3xl shadow-2xl p-16 text-center">
                            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#6096b4]/20 to-[#254151]/20 flex items-center justify-center">
                                <Briefcase className="w-12 h-12 text-[#254151]" />
                            </div>

                            <h2 className="text-3xl font-bold text-[#254151] mb-4">
                                {isAr ? "لا توجد وظائف شاغرة حاليًا" : "No Vacancies Available"}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                                {isAr
                                    ? "نشكركم على اهتمامكم بالانضمام إلى فريقنا. يرجى زيارة هذه الصفحة لاحقًا للاطلاع على الفرص المتاحة."
                                    : "Thank you for your interest in joining our team. Please check back later for available opportunities."
                                }
                            </p>

                            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#6096b4]/10 to-[#254151]/10 border border-[#6096b4]/20">
                                <p className="text-sm text-[#254151] font-medium">
                                    {isAr ? "للاستفسارات العامة" : "For General Inquiries"}
                                </p>
                                <a href="mailto:info@buc.edu.om" className="text-[#6096b4] hover:underline mt-1 block">
                                    info@buc.edu.om
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#254151] mb-3">
                                {isAr ? "الوظائف المتاحة" : "Available Positions"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#6096b4] to-[#254151] mx-auto rounded-full" />
                        </div>

                        {/* Creative Career Cards */}
                        {careers.map((c, index) => (
                            <div
                                key={c.id}
                                className="group relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card glow effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6096b4] to-[#254151] rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 blur" />

                                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                                    {/* Accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6096b4] via-[#6096b4]/70 to-[#254151]" />

                                    <div className="p-8 md:p-10">
                                        {/* Header with icon */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6096b4] to-[#254151] flex items-center justify-center shadow-lg shrink-0">
                                                <Briefcase className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl md:text-3xl font-bold text-[#254151] mb-2 group-hover:text-[#6096b4] transition-colors">
                                                    {isAr ? c.titleAr : c.titleEn}
                                                </h3>

                                                {/* Date badge */}
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-slate-50 border border-[#6096b4]/20">
                                                    <Calendar className="w-4 h-4 text-[#6096b4]" />
                                                    <span className="text-sm font-medium text-[#254151]">
                                                        {new Date(c.startDate).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                        <span className="text-[#6096b4] mx-2">→</span>
                                                        {new Date(c.edDate).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description with styled prose */}
                                        <div className="relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6096b4] to-transparent rounded-full" />
                                            <div
                                                className="pl-6 prose prose-zinc max-w-none prose-headings:text-[#254151] prose-a:text-[#6096b4] hover:prose-a:text-[#254151]"
                                                dangerouslySetInnerHTML={{ __html: isAr ? c.descriptionAr : c.descriptionEn }}
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-lg font-semibold text-[#254151] mb-3">
                                                {isAr ? "متطلبات الوظيفة" : "Job Requirements"}
                                            </h4>
                                            <div className="relative">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c2a772] to-transparent rounded-full" />
                                                <div
                                                    className="pl-6 prose prose-zinc max-w-none prose-headings:text-[#254151] prose-a:text-[#6096b4] hover:prose-a:text-[#254151]"
                                                    dangerouslySetInnerHTML={{ __html: isAr ? c.requirementsAr : c.requirementsEn }}
                                                />
                                            </div>
                                        </div>

                                        {/* Contact section - Glassmorphism style */}
                                        <div className="mt-8 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#6096b4]/10 via-[#254151]/5 to-[#6096b4]/10" />
                                            <div className="relative rounded-2xl border border-[#6096b4]/20 bg-white/50 backdrop-blur-sm px-6 py-5">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6096b4] to-[#254151] flex items-center justify-center">
                                                            <Phone className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                                                                {isAr ? "للتواصل" : "Contact Us"}
                                                            </p>
                                                            <p dir="ltr" className="font-bold text-[#254151] text-lg">
                                                                +968 80088808
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <a
                                                        href="mailto:info@buc.edu.om"
                                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6096b4] to-[#254151] text-white font-medium hover:shadow-lg hover:shadow-[#6096b4]/25 transition-all duration-300 group/email"
                                                    >
                                                        <Mail className="w-4 h-4 group-hover/email:rotate-12 transition-transform" />
                                                        <span>info@buc.edu.om</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
