
import { Monitor, Wifi, Database, Network, BookOpen, GraduationCap, Phone, Mail } from 'lucide-react';
import heroImage from '@/public/assets/about/foundation_landing.webp';
import edTechBanner from '@/public/assets/edTechBanner.webp';
import StudentsSidebar from '@/components/student/clinic/StudentsSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { edTechStatsData, EdTechSystems, EdTechInfrastructure, EdTechOMREN, EdTechMasader } from '@/staticData/EdTechData';

export default function EdTechPage() {
    const locale = useLocale();
    const isAr = locale === "ar";
    const systems = EdTechSystems[isAr ? "ar" : "en"];
    const infrastructure = EdTechInfrastructure[isAr ? "ar" : "en"];
    const omren = EdTechOMREN[isAr ? "ar" : "en"];
    const masader = EdTechMasader[isAr ? "ar" : "en"];

    return (
        <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">{isAr ? "تكنولوجيا التعليم والتعلم" : "Educational Technology"}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">
                            {isAr ? "الرئيسية" : "Home"}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {isAr ? "الطلبة" : "Students"}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{isAr ? "تكنولوجيا التعليم والتعلم" : "Educational Technology"}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="edtech" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Monitor className="size-6 text-white" />
                                </div>
                                <h2 className="text-3xl text-[#254151]">{isAr ? "تكنولوجيا التعليم والتعلم" : "Educational Technology"}</h2>
                            </div>

                            {/* Banner Image */}
                            <section className="mb-10">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#6096b4]">
                                    <Image
                                        width={960}
                                        height={383}
                                        src={edTechBanner}
                                        alt="تكنولوجيا التعليم والتعلم"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <p className="text-center text-gray-600 mt-4 text-lg">
                                    {isAr ? "ستستخدم أحدث التقنيات التعليمية لتعزير عملية التدريس والتعلم" : "We use the latest educational technologies to enhance the teaching and learning process"}
                                </p>
                            </section>

                            {/* الأنظمة التعليمية */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <GraduationCap className="size-6 text-[#6096b4]" />
                                    {isAr ? "الأنظمة والتقنيات التعليمية" : "Educational Systems and Technologies"}
                                </h3>

                                <div className="grid gap-6">
                                    {systems.map((system, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-br ${system.color} rounded-lg p-6 text-white`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <system.icon className="size-7 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-2xl font-semibold mb-3">{system.title}</h4>
                                                    <p className="leading-loose text-white/95 mb-4">{system.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {system.features.map((feature, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Statistics */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Database className="size-6 text-[#c2a772]" />
                                    {isAr ? "البنية التحتية التقنية" : "Technical Infrastructure"}
                                </h3>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#c2a772] p-4 sm:p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {edTechStatsData.map((item, idx) => {
                                            const title = isAr ? item.titleAr : item.titleEn;
                                            return (
                                                <div key={idx} className="text-center bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                    <h3 className="text-3xl sm:text-4xl font-semibold text-[#254151]">{item.count}</h3>
                                                    <p className="text-sm text-gray-700 mt-1">{title}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
                                    {infrastructure.map((item, index) => (
                                        <div key={index} className={`${item.color} rounded-lg p-4 sm:p-6 text-white text-center`}>
                                            <item.icon className="size-8 sm:size-12 mx-auto mb-3" />
                                            <div className="text-2xl sm:text-4xl font-bold mb-1">{item.count}</div>
                                            <p className="text-xs sm:text-sm opacity-90">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* OMREN */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Network className="size-6 text-[#6096b4]" />
                                    {isAr ? "الشبكة العمانية للبحث العلمي والتعليم (OMREN)" : "Oman Research and Education Network (OMREN)"}
                                </h3>

                                <div className="bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-8 border-l-4 border-[#6096b4]">
                                    {omren.paragraphs.map((paragraph, idx) => (
                                        <p key={idx} className="text-gray-700 text-lg leading-loose mb-4">
                                            {paragraph}
                                        </p>
                                    ))}

                                    <div className="grid md:grid-cols-3 gap-4">
                                        {omren.features.map((feature, idx) => (
                                            <div key={idx} className="bg-white rounded-lg p-4 border border-[#6096b4]">
                                                <feature.icon className="size-8 text-[#6096b4] mb-2" />
                                                <h5 className="text-[#254151] font-semibold mb-1">{feature.title}</h5>
                                                <p className="text-gray-600 text-sm">{feature.subtitle}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* مصادر */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <BookOpen className="size-6 text-[#c2a772]" />
                                    {isAr ? "مصادر - البوابة الإلكترونية للمكتبة" : "Masader - Library Electronic Portal"}
                                </h3>

                                <div className="bg-gradient-to-br from-[#c2a772]/10 to-[#6096b4]/10 rounded-lg p-8 border-l-4 border-[#c2a772]">
                                    <p className="text-gray-700 text-lg leading-loose mb-6">
                                        {masader.description}
                                    </p>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {masader.providers.map((provider, idx) => (
                                            <div key={idx} className="bg-white rounded-lg p-4 border border-[#c2a772] text-center">
                                                <provider.icon className="size-10 text-[#c2a772] mx-auto mb-2" />
                                                <h5 className="text-[#254151] font-semibold mb-1">{provider.name}</h5>
                                                <p className="text-gray-600 text-sm">{provider.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Training Image */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <GraduationCap className="size-6 text-[#6096b4]" />
                                    {isAr ? "التدريب والتطوير" : "Training and Development"}
                                </h3>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    {/* <img
                                        src={edTechTraining}
                                        alt="التدريب على تكنولوجيا التعليم والتعلم"
                                        className="w-full h-auto rounded-lg"
                                    /> */}
                                </div>
                            </section>

                            {/* للتواصل */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                                <h3 className="text-2xl mb-6 text-center font-semibold flex flex-col sm:flex-row items-center sm:justify-center gap-2">
                                    <Monitor className="size-6" />
                                    {isAr ? "للتواصل - قسم تكنولوجيا التعليم والتعلم" : "Contact - Educational Technology Department"}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{isAr ? "رقم الهاتف" : "Phone Number"}</p>
                                            <p className="font-semibold" dir="ltr">25657666-(778)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                                            <p className="font-semibold text-sm">sc_buc@buc.edu.om</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                                    <p className="text-sm opacity-90">
                                        <Wifi className="inline size-5 ml-2" />
                                        {isAr ? "نحن هنا لدعمك في استخدام التقنيات التعليمية الحديثة" : "We are here to support you in using modern educational technologies"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
