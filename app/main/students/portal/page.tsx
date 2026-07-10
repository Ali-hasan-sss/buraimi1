import { Monitor, Clock, Mail } from 'lucide-react';
import StudentsSidebar from '@/components/student/clinic/StudentsSidebar';
import { portalFeatures, quickLinks } from '@/staticData/PortalData';
import { useLocale } from 'next-intl';

export default function PortalPage() {
    const locale = useLocale();
    const isAr = locale === 'ar';

    return (
        <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="portal" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="flex-1">
                            {/* Page Header */}
                            <section className="relative bg-gradient-to-l from-[#254151] via-[#6096b4] to-[#254151] py-16 rounded-2xl overflow-hidden">
                                <div className="container mx-auto px-4 sm:px-8">
                                    <div className="flex items-center gap-4 mb-4 flex-col sm:flex-row">
                                        <Monitor className="size-10 text-[#c2a772]" />
                                        <h1 className="text-4xl font-black text-white">
                                            {isAr ? 'البوابة الإلكترونية' : 'Student Portal'}
                                        </h1>
                                    </div>
                                    <p className="text-white/90 text-lg max-w-3xl">
                                        {isAr
                                            ? 'بوابتك الشاملة لجميع الخدمات الأكاديمية والإدارية الإلكترونية'
                                            : 'Your all-in-one gateway for academic and administrative e-services'}
                                    </p>
                                </div>
                            </section>

                            {/* Main Content */}
                            <section className="py-12">
                                <div className="container mx-auto px-0 sm:px-2">
                                    {/* Login Notice */}
                                    <div className="bg-gradient-to-l from-[#c2a772]/10 to-[#6096b4]/10 rounded-2xl p-8 mb-12 border-r-4 border-[#c2a772]">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 size-12 bg-[#c2a772] rounded-full hidden sm:flex items-center justify-center">
                                                <Monitor className="size-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-[#254151] mb-3">
                                                    {isAr ? 'الدخول إلى البوابة الإلكترونية' : 'Sign in to the Portal'}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    {isAr
                                                        ? 'للوصول إلى جميع الخدمات الإلكترونية، يرجى تسجيل الدخول باستخدام الرقم الأكاديمي وكلمة المرور الخاصة بك.'
                                                        : 'To access all e-services, please sign in using your academic number and password.'}
                                                </p>
                                                <button className="bg-gradient-to-l from-[#254151] to-[#6096b4] hover:from-[#6096b4] hover:to-[#254151] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                                                    {isAr ? 'تسجيل الدخول إلى البوابة' : 'Sign in to the Portal'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Portal Features */}
                                    <div className="mb-12">
                                        <h2 className="text-3xl font-black text-[#254151] mb-8">
                                            {isAr ? 'خدمات البوابة الإلكترونية' : 'Portal Services'}
                                        </h2>

                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {portalFeatures.map((feature, index) => {
                                                const Icon = feature.icon;
                                                const title = isAr ? feature.titleAr : feature.titleEn;
                                                const description = isAr ? feature.descriptionAr : feature.descriptionEn;
                                                return (
                                                    <div
                                                        key={index}
                                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#6096b4] cursor-pointer"
                                                    >
                                                        <div
                                                            className="inline-flex items-center justify-center size-14 rounded-xl mb-4"
                                                            style={{ backgroundColor: feature.color }}
                                                        >
                                                            <Icon className="size-7 text-white" />
                                                        </div>

                                                        <h3 className="text-xl font-bold text-[#254151] mb-3">{title}</h3>

                                                        <p className="text-gray-600 leading-relaxed">{description}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Quick Links */}
                                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-12">
                                        <h2 className="text-3xl font-black text-[#254151] mb-8">
                                            {isAr ? 'روابط سريعة' : 'Quick Links'}
                                        </h2>

                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {quickLinks.map((link, index) => {
                                                const Icon = link.icon;
                                                const title = isAr ? link.titleAr : link.titleEn;
                                                return (
                                                    <button
                                                        key={index}
                                                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#6096b4] hover:bg-[#6096b4]/5 transition-all text-right"
                                                    >
                                                        <div className="flex-shrink-0 size-10 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                                            <Icon className="size-5 text-white" />
                                                        </div>
                                                        <span className="text-[#254151] font-bold">{title}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Access Information */}
                                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                                        <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-2xl p-8 text-white">
                                            <h3 className="text-2xl font-bold mb-4">
                                                {isAr ? 'كيفية الوصول' : 'How to Access'}
                                            </h3>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{isAr ? 'استخدم الرقم الأكاديمي كاسم مستخدم' : 'Use your academic number as your username'}</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{isAr ? 'كلمة المرور الافتراضية هي تاريخ ميلادك' : 'Your default password is your date of birth'}</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{isAr ? 'يُنصح بتغيير كلمة المرور عند الدخول الأول' : 'It is recommended to change your password after the first login'}</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="size-2 bg-[#c2a772] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span>{isAr ? 'احفظ بياناتك في مكان آمن' : 'Keep your credentials in a safe place'}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-br from-[#6096b4] to-[#c2a772] rounded-2xl p-8 text-white">
                                            <h3 className="text-2xl font-bold mb-4">
                                                {isAr ? 'الدعم الفني' : 'Technical Support'}
                                            </h3>
                                            <p className="mb-4">
                                                {isAr
                                                    ? 'في حال مواجهة أي مشكلة في الدخول إلى البوابة، يرجى التواصل مع:'
                                                    : 'If you face any issues signing in, please contact:'}
                                            </p>
                                            <ul className="space-y-3">
                                                <li className="flex items-center gap-3">
                                                    <Mail className="size-5 flex-shrink-0" />
                                                    <span>it.support@buc.edu.om</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <Monitor className="size-5 flex-shrink-0" />
                                                    <span>{isAr ? 'قسم تقنية المعلومات - مبنى الإدارة' : 'IT Department - Administration Building'}</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <Clock className="size-5 flex-shrink-0" />
                                                    <span>{isAr ? 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً' : 'Sunday - Thursday: 8:00 AM - 4:00 PM'}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Mobile App */}
                                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 text-center">
                                        <Monitor className="size-12 sm:size-16 text-[#6096b4] mx-auto mb-4 sm:mb-6" />
                                        <h2 className="text-2xl sm:text-3xl font-black text-[#254151] mb-3 sm:mb-4">
                                            {isAr ? 'تطبيق الهاتف المحمول' : 'Mobile App'}
                                        </h2>
                                        <p className="text-gray-600 text-base sm:text-lg mb-5 sm:mb-6 max-w-2xl mx-auto">
                                            {isAr
                                                ? 'قريباً: تطبيق البوابة الإلكترونية على الهواتف الذكية للوصول السريع والسهل لجميع الخدمات'
                                                : 'Coming soon: the student portal app for quick and easy access to all services'}
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                                            <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-all w-full sm:w-auto">
                                                {isAr ? 'قريباً على App Store' : 'Coming soon on App Store'}
                                            </button>
                                            <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-all w-full sm:w-auto">
                                                {isAr ? 'قريباً على Google Play' : 'Coming soon on Google Play'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
