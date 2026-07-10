'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Shield, Lock, ChevronDown, ChevronUp, LogIn, LogOut } from 'lucide-react';

type Section = {
    id: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    order: number;
};

type PolicyData = {
    studentTitleAr: string;
    studentTitleEn: string;
    studentIntroAr: string;
    studentIntroEn: string;
    studentSections: Section[];
    staffTitleAr: string;
    staffTitleEn: string;
    staffIntroAr: string;
    staffIntroEn: string;
    staffSections: Section[];
    lastUpdated: string;
};

type SessionInfo = {
    authenticated: boolean;
    role: string;
    email: string;
};

function AccordionItem({ title, content, defaultOpen = false }: { title: string; content: string; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-semibold text-[#254151] text-sm">{title}</span>
                {open ? <ChevronUp className="size-4 text-[#6096b4] shrink-0" /> : <ChevronDown className="size-4 text-[#6096b4] shrink-0" />}
            </button>
            {open && (
                <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{content}</p>
                </div>
            )}
        </div>
    );
}

function LoginGate({ locale }: { locale: string }) {
    const isAr = locale === 'ar';
    const [accessCode, setAccessCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ accessCode, password }),
            });
            const data = await res.json() as { ok: boolean; message?: string };
            if (!data.ok) {
                setError(isAr ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
            } else {
                window.location.reload();
            }
        } catch {
            setError(isAr ? 'حدث خطأ، حاول مجدداً' : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-[#254151]/10 mb-4">
                        <Lock className="size-7 text-[#254151]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#254151]">
                        {isAr ? 'يجب تسجيل الدخول لقراءة سياسة الخصوصية' : 'Login required to view the Privacy Policy'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        {isAr ? 'هذه الصفحة متاحة للطلاب والموظفين فقط' : 'This page is available to students and staff only'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#dce7ef] shadow-lg p-6">
                    <form onSubmit={(e) => { e.preventDefault(); if (!loading) void login(); }} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[#254151]">
                                {isAr ? 'رقم الطالب / الموظف' : 'Student / Staff ID'}
                            </label>
                            <input
                                type="text"
                                dir="ltr"
                                placeholder="ST000001"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                disabled={loading}
                                className="w-full rounded-xl border border-[#d6e2eb] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-[#254151]">
                                {isAr ? 'كلمة المرور' : 'Password'}
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className="w-full rounded-xl border border-[#d6e2eb] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433]"
                            />
                        </div>

                        {error && (
                            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !accessCode || !password}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#254151] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f3745] disabled:opacity-60"
                        >
                            <LogIn className="size-4" />
                            {loading ? (isAr ? 'جاري الدخول...' : 'Logging in...') : (isAr ? 'تسجيل الدخول' : 'Login')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function PolicyContent({ policy, role, locale }: { policy: PolicyData; role: string; locale: string }) {
    const isAr = locale === 'ar';
    const isStaff = role === 'staff';

    const title = isStaff
        ? (isAr ? policy.staffTitleAr : policy.staffTitleEn)
        : (isAr ? policy.studentTitleAr : policy.studentTitleEn);

    const intro = isStaff
        ? (isAr ? policy.staffIntroAr : policy.staffIntroEn)
        : (isAr ? policy.studentIntroAr : policy.studentIntroEn);

    const sections = (isStaff ? policy.staffSections : policy.studentSections)
        .slice()
        .sort((a, b) => a.order - b.order);

    const lastUpdated = policy.lastUpdated
        ? new Date(policy.lastUpdated).toLocaleDateString(isAr ? 'ar-OM' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    const roleColor = isStaff ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200';
    const roleLabel = isStaff
        ? (isAr ? 'موظف' : 'Staff')
        : role === 'admin'
            ? (isAr ? 'مسؤول' : 'Admin')
            : (isAr ? 'طالب' : 'Student');

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f7fafc] to-white">
            {/* Hero */}
            <div className="bg-[#254151] text-white py-20 px-4">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Logout button top-right inside hero */}
                    <div className="flex justify-end my-8">
                        <button
                            type="button"
                            onClick={() => void logout()}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
                        >
                            <LogOut className="size-3.5" />
                            {isAr ? 'تسجيل الخروج' : 'Logout'}
                        </button>
                    </div>
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/10 mb-5">
                        <Shield className="size-7 text-white" />
                    </div>
                    <p className="text-[#a8c5d6] text-xs font-semibold tracking-widest uppercase mb-2">
                        BURAIMI UNIVERSITY
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold leading-snug">{title}</h1>
                    {lastUpdated && (
                        <p className="text-[#a8c5d6] text-sm mt-3">
                            {isAr ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
                        </p>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-3xl px-4 py-10">
                {/* Role badge */}
                <div className="flex items-center gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${roleColor}`}>
                        <Shield className="size-3" />
                        {isAr ? `تعرض سياسة: ${roleLabel}` : `Showing policy for: ${roleLabel}`}
                    </span>
                </div>

                {/* Intro */}
                {intro && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-8 whitespace-pre-line">{intro}</p>
                )}

                {/* Sections */}
                {sections.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <Shield className="size-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">{isAr ? 'لم يتم إضافة محتوى بعد' : 'No content added yet'}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sections.map((s, i) => (
                            <AccordionItem
                                key={s.id}
                                title={isAr ? s.titleAr : s.titleEn}
                                content={isAr ? s.contentAr : s.contentEn}
                                defaultOpen={i === 0}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PrivacyPolicyPage() {
    const locale = useLocale();
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [policy, setPolicy] = useState<PolicyData | null>(null);
    const [policyLoading, setPolicyLoading] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json() as { ok: boolean; authenticated: boolean; role?: string; email?: string };
                if (data.ok && data.authenticated) {
                    setSessionInfo({ authenticated: true, role: data.role ?? 'student', email: data.email ?? '' });
                } else {
                    setSessionInfo(null);
                }
            } catch {
                setSessionInfo(null);
            } finally {
                setSessionLoading(false);
            }
        };
        void checkSession();
    }, []);

    useEffect(() => {
        if (!sessionInfo?.authenticated) return;
        setPolicyLoading(true);
        fetch('/api/privacy-policy')
            .then((r) => r.json())
            .then((d: { ok: boolean; data: PolicyData }) => { if (d.ok) setPolicy(d.data); })
            .catch(() => undefined)
            .finally(() => setPolicyLoading(false));
    }, [sessionInfo]);

    if (sessionLoading || policyLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="size-8 rounded-full border-2 border-[#6096b4] border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!sessionInfo?.authenticated) {
        return <LoginGate locale={locale} />;
    }

    if (!policy) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
                <p className="text-sm">{locale === 'ar' ? 'لا توجد بيانات' : 'No data available'}</p>
            </div>
        );
    }

    return <PolicyContent policy={policy} role={sessionInfo.role} locale={locale} />;
}
