'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        setStatus('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = (await res.json()) as { ok: boolean; message?: string };
            if (!res.ok || !data.ok) {
                setStatus(data.message || 'Invalid email or password');
                return;
            }

            setStatus('Login successful, redirecting...');
            router.push('/dashboard');
            router.refresh();
        } catch {
            setStatus('Unexpected error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-[#f3f7fa] via-white to-[#eef4f8] px-4 py-10">
            <div className="mx-auto flex max-w-5xl items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#dce7ef] bg-white/95 p-7 shadow-xl shadow-[#2541511f] backdrop-blur-sm sm:p-8">
                    <div className="mb-6 text-center">
                        <p className="text-sm font-semibold tracking-wide text-[#6096b4]">BURAIMI UNIVERSITY</p>
                        <h1 className="mt-2 text-2xl font-bold text-[#254151]">تسجيل دخول الإدارة</h1>
                        <p className="mt-2 text-sm text-slate-500">استخدم البريد الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم</p>
                    </div>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!loading && email && password) void login();
                        }}
                    >
                        <div className="space-y-1.5">
                            <label htmlFor="admin-email" className="block text-sm font-medium text-[#254151]">
                                البريد الإلكتروني
                            </label>
                            <input
                                id="admin-email"
                                type="email"
                                className="w-full rounded-xl border border-[#d6e2eb] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] disabled:bg-slate-100"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                autoComplete="email"
                                dir="ltr"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="admin-password" className="block text-sm font-medium text-[#254151]">
                                كلمة المرور
                            </label>
                            <input
                                id="admin-password"
                                type="password"
                                className="w-full rounded-xl border border-[#d6e2eb] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] disabled:bg-slate-100"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </div>

                        {status && (
                            <p className={`rounded-lg px-3 py-2 text-sm ${status.toLowerCase().includes('successful') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {status}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full rounded-xl bg-[#254151] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f3745] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
