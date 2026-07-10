"use client";

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { AlertCircle, Mail, UserPlus } from 'lucide-react';
//
// import StudentPortalHero from '@/components/studentPortal/StudentPortalHero';
// import StudentPortalQuickLinks, {
//     type StudentPortalQuickLink,
// } from '@/components/studentPortal/StudentPortalQuickLinks';
// import StudentPortalSupportCard from '@/components/studentPortal/StudentPortalSupportCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

export default function OtpRegisterPage() {
    // AUTH UI DISABLED
    // const router = useRouter();

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [age, setAge] = useState<string>('');
    // const [email, setEmail] = useState('');
    // const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message?: string }>({
    //     type: 'idle',
    // });
    // const [loading, setLoading] = useState(false);

    // const quickLinks = useMemo<StudentPortalQuickLink[]>(
    //     () => [
    //         {
    //             icon: UserPlus,
    //             title: 'إنشاء حساب',
    //             description: 'سجل بياناتك ثم أكد بريدك برمز OTP',
    //             color: '#6096b4',
    //         },
    //         {
    //             icon: Mail,
    //             title: 'تأكيد البريد الإلكتروني',
    //             description: 'إثبات ملكية البريد قبل تفعيل الحساب',
    //             color: '#6096b4',
    //         },
    //     ],
    //     []
    // );

    // const register = async () => {
    //     setLoading(true);
    //     setStatus({ type: 'idle' });
    //
    //     const parsedAge = Number(age);
    //     if (!Number.isFinite(parsedAge) || parsedAge <= 0) {
    //         setStatus({ type: 'error', message: 'الرجاء إدخال عمر صحيح' });
    //         setLoading(false);
    //         return;
    //     }
    //
    //     try {
    //         const res = await fetch('/api/auth/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             credentials: 'include',
    //             body: JSON.stringify({
    //                 email,
    //                 firstName,
    //                 lastName,
    //                 age: parsedAge,
    //             }),
    //         });
    //
    //         const data = (await res.json()) as {
    //             ok: boolean;
    //             message?: string;
    //             user?: {
    //                 id: string;
    //                 email: string;
    //                 firstName?: string;
    //                 lastName?: string;
    //                 age?: number;
    //                 name?: string;
    //             };
    //         };
    //         if (!res.ok || !data.ok) {
    //             setStatus({ type: 'error', message: data.message || 'تعذر إرسال رمز التحقق' });
    //             return;
    //         }
    //
    //         if (data.user) {
    //             // Temporary: keep registration payload client-side for now.
    //             // Real-world: do NOT store sensitive user/session data in localStorage;
    //             // rely on the HttpOnly `session` cookie set by the server.
    //             console.log(data);
    //             localStorage.setItem('registered_user', JSON.stringify(data.user));
    //         }
    //
    //         // router.push('/login');
    //         // router.refresh();
    //     } catch {
    //         setStatus({ type: 'error', message: 'حدث خطأ غير متوقع' });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const canRequest =
    //     !!firstName.trim() &&
    //     !!lastName.trim() &&
    //     !!age.trim() &&
    //     !!email.trim() &&
    //     !loading;
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
    //                         <h2 className="text-3xl font-bold text-[#254151] mb-2">إنشاء حساب</h2>
    //                         <p className="text-gray-600">سجّل حسابك ثم أكد بريدك الإلكتروني عبر OTP</p>
    //                     </div>
    //
    //                     <div className="space-y-6">
    //                         <div className="grid sm:grid-cols-2 gap-4">
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-gray-700">الاسم الأول</label>
    //                                 <Input
    //                                     type="text"
    //                                     placeholder="الاسم الأول"
    //                                     className="h-12 text-lg"
    //                                     value={firstName}
    //                                     onChange={(e) => setFirstName(e.target.value)}
    //                                     disabled={loading}
    //                                     required
    //                                 />
    //                             </div>
    //
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-gray-700">الاسم الأخير</label>
    //                                 <Input
    //                                     type="text"
    //                                     placeholder="الاسم الأخير"
    //                                     className="h-12 text-lg"
    //                                     value={lastName}
    //                                     onChange={(e) => setLastName(e.target.value)}
    //                                     disabled={loading}
    //                                     required
    //                                 />
    //                             </div>
    //                         </div>
    //
    //                         <div className="grid sm:grid-cols-2 gap-4">
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-gray-700">العمر</label>
    //                                 <Input
    //                                     type="number"
    //                                     inputMode="numeric"
    //                                     placeholder="18"
    //                                     className="h-12 text-lg"
    //                                     value={age}
    //                                     onChange={(e) => setAge(e.target.value)}
    //                                     disabled={loading}
    //                                     required
    //                                 />
    //                             </div>
    //
    //                             <div className="space-y-2">
    //                                 <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
    //                                     <Mail className="size-4" />
    //                                     البريد الإلكتروني
    //                                 </label>
    //                                 <Input
    //                                     type="email"
    //                                     placeholder="example@buc.edu.om"
    //                                     className="h-12 text-lg"
    //                                     value={email}
    //                                     onChange={(e) => setEmail(e.target.value)}
    //                                     disabled={loading}
    //                                     required
    //                                 />
    //                             </div>
    //                         </div>
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
    //                         <Button
    //                             type="button"
    //                             disabled={!canRequest}
    //                             onClick={register}
    //                             className="w-full h-14 text-lg bg-gradient-to-l from-[#254151] to-[#2d4a5c] hover:from-[#2d4a5c] hover:to-[#254151] text-white"
    //                         >
    //                             <UserPlus className="size-5 ml-2" />
    //                             إنشاء الحساب
    //                         </Button>
    //
    //                         <div className="text-center text-sm text-gray-600">
    //                             لديك حساب بالفعل؟{' '}
    //                             <Link href="/login" className="font-semibold text-[#6096b4] hover:text-[#254151]">
    //                                 تسجيل الدخول
    //                             </Link>
    //                         </div>
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
    //                         <h3 className="text-2xl font-bold text-[#254151] mb-4">خطوات التسجيل</h3>
    //                         <p className="text-gray-600 mb-6">
    //                             أدخل بياناتك لإنشاء الحساب.
    //                         </p>
    //                     </div>
    //
    //                     <StudentPortalQuickLinks links={quickLinks} />
    //                     <StudentPortalSupportCard />
    //                 </motion.div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return <>no register for now </>;
}
