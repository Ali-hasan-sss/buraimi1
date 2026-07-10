"use client";

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { AlertCircle, KeyRound, LogIn, Mail } from 'lucide-react';
//
// import StudentPortalHero from '@/components/studentPortal/StudentPortalHero';
// import StudentPortalQuickLinks, {
//     type StudentPortalQuickLink,
// } from '@/components/studentPortal/StudentPortalQuickLinks';
// import StudentPortalSupportCard from '@/components/studentPortal/StudentPortalSupportCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

export default function OtpLoginPage() {
    // AUTH UI DISABLED
    // const router = useRouter();
    //
    // const [email, setEmail] = useState('');
    // const [otp, setOtp] = useState('');
    // const [step, setStep] = useState<'request' | 'verify'>('request');
    // const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message?: string }>({
    //     type: 'idle',
    // });
    // const [loading, setLoading] = useState(false);

    // const quickLinks = useMemo<StudentPortalQuickLink[]>(
    //     () => [
    //         {
    //             icon: LogIn,
    //             title: 'تسجيل الدخول الآمن',
    //             description: 'رمز تحقق يُرسل إلى بريدك الإلكتروني',
    //             color: '#6096b4',
    //         },
    //         {
    //             icon: Mail,
    //             title: 'تأكيد البريد الإلكتروني',
    //             description: 'نضمن أن الحساب مملوك لصاحب البريد',
    //             color: '#6096b4',
    //         },
    //     ],
    //     []
    // );

    // const requestOtp = async () => {
    //     setLoading(true);
    //     setStatus({ type: 'idle' });
    //
    //     try {
    //         const res = await fetch('/api/auth/request-otp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             credentials: 'include',
    //             body: JSON.stringify({ email, purpose: 'login' }),
    //         });
    //
    //         const data = (await res.json()) as { ok: boolean; message?: string };
    //         if (!res.ok || !data.ok) {
    //             setStatus({ type: 'error', message: data.message || 'تعذر إرسال رمز التحقق' });
    //             return;
    //         }
    //
    //         setStep('verify');
    //         setStatus({
    //             type: 'success',
    //             message: 'إذا كان البريد صحيحًا فسيتم إرسال رمز التحقق (راجع Console في وضع التطوير)',
    //         });
    //     } catch {
    //         setStatus({ type: 'error', message: 'حدث خطأ غير متوقع' });
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // const verifyOtp = async () => {
    //     setLoading(true);
    //     setStatus({ type: 'idle' });
    //
    //     try {
    //         const res = await fetch('/api/auth/verify-otp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             credentials: 'include',
    //             body: JSON.stringify({ email, purpose: 'login', code: otp }),
    //         });
    //
    //         const data = (await res.json()) as { ok: boolean; message?: string };
    //         if (!res.ok || !data.ok) {
    //             setStatus({ type: 'error', message: data.message || 'رمز التحقق غير صحيح' });
    //             return;
    //         }
    //
    //         router.push('/dashboard');
    //         router.refresh();
    //     } catch {
    //         setStatus({ type: 'error', message: 'حدث خطأ غير متوقع' });
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // return (
    //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
    //         <StudentPortalHero />
    //
    //         <div className="container mx-auto px-4 py-16">
    //             <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
    //                 <motion.div
    //                     initial={{ opacity: 0, x: -20 }}
    //                     animate={{ opacity: 1, x: 0 }}
    //                     transition={{ duration: 0.6, delay: 0.2 }}
    //                     className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100"
    //                 >
    //                     <div className="mb-8">
    //                         <h2 className="text-3xl font-bold text-[#254151] mb-2">تسجيل الدخول</h2>
    //                         <p className="text-gray-600">سجّل دخولك عبر رمز تحقق يُرسل إلى بريدك الإلكتروني</p>
    //                     </div>
    //
    //                     <div className="space-y-6">
    //                         <div className="space-y-2">
    //                             <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
    //                                 <Mail className="size-4" />
    //                                 البريد الإلكتروني
    //                             </label>
    //                             <Input
    //                                 type="email"
    //                                 placeholder="example@buc.edu.om"
    //                                 className="h-12 text-lg"
    //                                 value={email}
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                                 disabled={loading || step === 'verify'}
    //                                 required
    //                             />
    //                         </div>
    //
    //                         {step === 'verify' && (
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
    //                                     <KeyRound className="size-4" />
    //                                     رمز التحقق (OTP)
    //                                 </label>
    //                                 <Input
    //                                     type="text"
    //                                     inputMode="numeric"
    //                                     placeholder="000000"
    //                                     className="h-12 text-lg"
    //                                     value={otp}
    //                                     onChange={(e) => setOtp(e.target.value)}
    //                                     disabled={loading}
    //                                     required
    //                                 />
    //                             </div>
    //                         )}
    //
    //                         {status.type !== 'idle' && (
    //                             <div
    //                                 className={`flex items-start gap-3 p-4 rounded-xl border ${status.type === 'error'
    //                                     ? 'bg-red-50 border-red-200'
    //                                     : 'bg-blue-50 border-blue-200'
    //                                     }`}
    //                             >
    //                                 <AlertCircle
    //                                     className={`size-5 flex-shrink-0 mt-0.5 ${status.type === 'error' ? 'text-red-600' : 'text-[#6096b4]'
    //                                         }`}
    //                                 />
    //                                 <div className="text-sm text-gray-700">
    //                                     <p className="font-bold mb-1">{status.type === 'error' ? 'تنبيه' : 'تم'}</p>
    //                                     <p>{status.message}</p>
    //                                 </div>
    //                             </div>
    //                         )}
    //
    //                         {step === 'request' ? (
    //                             <Button
    //                                 type="button"
    //                                 disabled={loading || !email}
    //                                 onClick={requestOtp}
    //                                 className="w-full h-14 text-lg bg-gradient-to-l from-[#254151] to-[#2d4a5c] hover:from-[#2d4a5c] hover:to-[#254151] text-white"
    //                             >
    //                                 <Mail className="size-5 ml-2" />
    //                                 إرسال رمز التحقق
    //                             </Button>
    //                         ) : (
    //                             <div className="space-y-3">
    //                                 <Button
    //                                     type="button"
    //                                     disabled={loading || !otp}
    //                                     onClick={verifyOtp}
    //                                     className="w-full h-14 text-lg bg-gradient-to-l from-[#254151] to-[#2d4a5c] hover:from-[#2d4a5c] hover:to-[#254151] text-white"
    //                                 >
    //                                     <LogIn className="size-5 ml-2" />
    //                                     تأكيد وتسجيل الدخول
    //                                 </Button>
    //
    //                                 <button
    //                                     type="button"
    //                                     onClick={() => {
    //                                         setStep('request');
    //                                         setOtp('');
    //                                         setStatus({ type: 'idle' });
    //                                     }}
    //                                     className="w-full text-sm text-[#6096b4] hover:text-[#254151] font-medium"
    //                                     disabled={loading}
    //                                 >
    //                                     تغيير البريد الإلكتروني
    //                                 </button>
    //                             </div>
    //                         )}
    //                     </div>
    //                 </motion.div>
    //
    //                 <motion.div
    //                     initial={{ opacity: 0, x: 20 }}
    //                     animate={{ opacity: 1, x: 0 }}
    //                     transition={{ duration: 0.6, delay: 0.4 }}
    //                     className="space-y-6"
    //                 >
    //                     <div>
    //                         <h3 className="text-2xl font-bold text-[#254151] mb-4">تسجيل دخول آمن</h3>
    //                         <p className="text-gray-600 mb-6">
    //                             سيتم إرسال رمز تحقق إلى بريدك الإلكتروني لإثبات ملكيتك للحساب.
    //                         </p>
    //                     </div>
    //

    return <>no login for now </>;
}

