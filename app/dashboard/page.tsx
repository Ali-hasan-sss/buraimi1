import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logout } from '@/lib/actions/auth-actions';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { EventModel } from '@/models/Event';
import { NewsModel } from '@/models/news';
import {
    Users, Newspaper, CalendarDays, ShieldCheck,
    ArrowUpRight, LogOut, Mail, LayoutDashboard,
} from 'lucide-react';

async function getCounts() {
    await dbConnect();
    const [students, staff, admins, news, events] = await Promise.all([
        User.countDocuments({ role: 'student' }),
        User.countDocuments({ role: 'staff' }),
        User.countDocuments({ role: 'admin' }),
        NewsModel.countDocuments({}),
        EventModel.countDocuments({}),
    ]);
    return { students, staff, admins, news, events };
}

export default async function Page() {
    const [session, counts] = await Promise.all([getSession(), getCounts()]);

    const stats = [
        { label: 'طلاب', labelEn: 'Students', value: counts.students, color: 'bg-blue-50 text-blue-700 border-blue-100', icon: Users },
        { label: 'موظفون', labelEn: 'Staff', value: counts.staff, color: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: Users },
        { label: 'مسؤولون', labelEn: 'Admins', value: counts.admins, color: 'bg-purple-50 text-purple-700 border-purple-100', icon: Users },
        { label: 'أخبار', labelEn: 'News', value: counts.news, color: 'bg-amber-50 text-amber-700 border-amber-100', icon: Newspaper },
        { label: 'فعاليات', labelEn: 'Events', value: counts.events, color: 'bg-rose-50 text-rose-700 border-rose-100', icon: CalendarDays },
    ];

    const quickLinks = [
        { label: 'إدارة المستخدمين', labelEn: 'User Management', href: '/dashboard/users', icon: Users, color: 'text-blue-600' },
        { label: 'الأخبار', labelEn: 'News', href: '/dashboard/news', icon: Newspaper, color: 'text-amber-600' },
        { label: 'الفعاليات', labelEn: 'Events', href: '/dashboard/events', icon: CalendarDays, color: 'text-rose-600' },
        { label: 'سياسة الخصوصية', labelEn: 'Privacy Policy', href: '/dashboard/privacy-policy', icon: ShieldCheck, color: 'text-emerald-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#254151]">
                        <LayoutDashboard className="size-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#254151]">لوحة التحكم</h1>
                        <p className="text-xs text-muted-foreground">Buraimi University Admin</p>
                    </div>
                </div>
                <form action={logout}>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                        <LogOut className="size-4" />
                        تسجيل الخروج
                    </button>
                </form>
            </div>

            {/* Session card */}
            <div className="flex items-center gap-3 rounded-xl border border-[#dce7ef] bg-[#f7fafc] px-4 py-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#254151]/10">
                    <Mail className="size-4 text-[#254151]" />
                </div>
                <div>
                    <p className="text-xs text-gray-500">مسجّل دخول كـ</p>
                    <p className="text-sm font-semibold text-[#254151]" dir="ltr">{session?.email}</p>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.labelEn} className={`flex flex-col gap-2 rounded-xl border p-4 ${s.color}`}>
                            <div className="flex items-center justify-between">
                                <Icon className="size-4 opacity-70" />
                                <span className="text-2xl font-bold">{s.value}</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold">{s.label}</p>
                                <p className="text-[11px] opacity-60">{s.labelEn}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick links */}
            <div>
                <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">روابط سريعة</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {quickLinks.map((q) => {
                        const Icon = q.icon;
                        return (
                            <Link
                                key={q.href}
                                href={q.href}
                                className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 hover:shadow-md hover:border-gray-200 transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className={`size-4 ${q.color}`} />
                                    <div>
                                        <p className="text-xs font-semibold text-[#254151]">{q.label}</p>
                                        <p className="text-[11px] text-gray-400">{q.labelEn}</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="size-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
