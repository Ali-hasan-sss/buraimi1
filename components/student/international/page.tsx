"use client"

import { Globe, FileText, Award, BookOpen, CheckCircle, Users, DollarSign, Plane, Phone, Mail, Download, ExternalLink } from 'lucide-react';
// import admissionMenu from 'figma:asset/e1cd1a18c78ff737ef9d827f172a90c245bb54ae.png';
import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import Link from 'next/link';
import { guides, procedures, requirements, services } from '@/staticData/StudentsInternational';
import { useLocale } from 'next-intl';

export default function InternationalStudentsPage() {

    const locale = useLocale();
    const isAr = locale === 'ar';

    const t = isAr
        ? {
            pageTitle: 'قبول الطلبة الدوليين',
            home: 'الرئيسية',
            students: 'الطلبة',
            sectionTitle: 'قبول الطلبة الدوليين',
            welcomeTitle: 'مرحباً بكم في كلية البريمي الجامعية',
            welcomeDesc:
                'تفخر كلية البريمي الجامعية بالترحيب بالطلبة الدوليين من مختلف أنحاء العالم. نحن نوفر بيئة تعليمية متميزة تجمع بين الجودة الأكاديمية والتنوع الثقافي، مما يتيح للطلبة فرصة الحصول على تعليم عالي الجودة في سلطنة عمان.',
            diversityTitle: 'تنوع ثقافي',
            diversityDesc: 'طلبة من أكثر من 20 دولة',
            qualityTitle: 'جودة أكاديمية',
            qualityDesc: 'برامج معتمدة دولياً',
            supportTitle: 'دعم شامل',
            supportDesc: 'خدمات متكاملة للطلبة',
            admissionInfo: 'معلومات القبول',
            admissionMenuAlt: 'قائمة القبول',
            admissionMenuPlaceholder: 'سيتم توفير قائمة القبول قريباً',
            criteriaTitle: 'معايير ومتطلبات القبول',
            visaDocsTitle: 'الوثائق المطلوبة',
            visaDocsIntro:
                'تساعد كلية البريمي الجامعية الطلاب الدوليين الذين حصلوا على القبول الأولي في الحصول على تأشيرة الدراسة. يجب على هؤلاء الطلاب تقديم المستندات المطلوبة إلى إدارة شؤون الموظفين:',
            visaDocs: [
                'شهادة فحص طبي معتمدة (إذا كانت مطلوبة لبعض الجنسيات).',
                'نسخة من جواز السفر.',
                'صورتان شخصيتان بحجم جواز السفر.',
                'دليل على الطالب بعد إتمام عملية التسجيل بالكلية.',
                'إيصال دفع رسوم التسجيل.',
            ],
            studyVisaTitle: 'تأشيرة الدراسة',
            studyVisaIntro:
                'من أجل تجديد تأشيرة الطالب ، يجب على الطلاب تقديم المستندات المطلوبة إلى قسم الطلاب ، خدمات الموظفين:',
            studyVisaDocs: [
                'أصل جواز السفر.',
                'نسخة من تأشيرة الدراسة.',
                'أصل بطاقة الإقامة.',
                'صورتان شخصيتان بحجم جواز السفر.',
                'خطاب قيد الطالب ومدة الدراسة المتبقية من القبول والتسجيل.',
            ],
            applyStepsTitle: 'خطوات التقديم',
            tuitionTitle: 'الرسوم الدراسية والمساعدات المالية',
            tuitionFeesTitle: 'الرسوم الدراسية',
            tuitionFeesItems: [
                'رسوم الساعة المعتمدة للبكالوريوس: تختلف حسب التخصص',
                'رسوم برامج الدراسات العليا: تختلف حسب البرنامج',
                'رسوم التسجيل السنوية',
            ],
            financialAidTitle: 'المساعدات المالية',
            financialAidItems: [
                'منح دراسية للطلبة المتفوقين',
                'خصومات للطلبة الدوليين',
                'برامج تقسيط الرسوم الدراسية',
            ],
            scholarshipTitle: 'إجراءات طلبة البعثات',
            scholarshipIntro:
                'ترحب كلية البريمي الجامعية بطلبة البعثات من مختلف الجهات والمؤسسات. نوفر إجراءات خاصة ومبسطة لطلبة البعثات لضمان سهولة القبول والتسجيل.',
            scholarshipDocsTitle: 'المستندات المطلوبة',
            scholarshipDocs: [
                '• خطاب رسمي من جهة البعثة',
                '• المستندات الأكاديمية المصدقة',
                '• نسخة من قرار البعثة',
            ],
            scholarshipBenefitsTitle: 'المزايا والتسهيلات',
            scholarshipBenefits: [
                '• إجراءات قبول مبسطة',
                '• تواصل مباشر مع جهة البعثة',
                '• تقارير دورية عن الأداء الأكاديمي',
            ],
            servicesTitle: 'الخدمات المقدمة للطلبة الدوليين',
            guidesTitle: 'أدلة الطلبة',
            generalGuideTitle: 'دليل الطالب العام',
            generalGuideDesc:
                'دليل شامل يحتوي على جميع المعلومات التي يحتاجها الطالب الدولي عن الكلية والبرامج الأكاديمية والخدمات والأنظمة واللوائح.',
            downloadGuide: 'تحميل الدليل',
            ctaTitle: 'هل أنت مستعد للانضمام إلينا؟',
            ctaDesc: 'ابدأ رحلتك الأكاديمية معنا اليوم',
            ctaButton: 'سجل الآن',
            contactTitle: 'للتواصل - مكتب قبول الطلبة الدوليين',
            phoneLabel: 'رقم الهاتف',
            emailLabel: 'البريد الإلكتروني',
            contactNote: 'نحن هنا لمساعدتك في جميع خطوات القبول والتسجيل',
        }
        : {
            pageTitle: 'International Students Admission',
            home: 'Home',
            students: 'Students',
            sectionTitle: 'International Students Admission',
            welcomeTitle: 'Welcome to Al Buraimi University College',
            welcomeDesc:
                'Al Buraimi University College is proud to welcome international students from around the world. We provide an outstanding learning environment that combines academic quality and cultural diversity, giving students the opportunity to receive high-quality education in the Sultanate of Oman.',
            diversityTitle: 'Cultural Diversity',
            diversityDesc: 'Students from 20+ countries',
            qualityTitle: 'Academic Quality',
            qualityDesc: 'Internationally accredited programs',
            supportTitle: 'Comprehensive Support',
            supportDesc: 'Integrated student services',
            admissionInfo: 'Admission Information',
            admissionMenuAlt: 'Admission menu',
            admissionMenuPlaceholder: 'Admission menu will be available soon',
            criteriaTitle: 'Admission Criteria & Requirements',
            visaDocsTitle: 'Required Documents',
            visaDocsIntro:
                'Al Buraimi University College assists international students who receive preliminary admission in obtaining a study visa. Students must submit the required documents to the Personnel Affairs Department:',
            visaDocs: [
                'Approved medical examination certificate (if required for certain nationalities).',
                'Copy of passport.',
                'Two passport-size personal photos.',
                'Proof of enrollment after completing college registration.',
                'Registration fee payment receipt.',
            ],
            studyVisaTitle: 'Study Visa',
            studyVisaIntro:
                'To renew the student visa, students must submit the required documents to the Student Affairs / Staff Services section:',
            studyVisaDocs: [
                'Original passport.',
                'Copy of the study visa.',
                'Original resident card.',
                'Two passport-size personal photos.',
                'Enrollment letter and remaining study duration from Admission & Registration.',
            ],
            applyStepsTitle: 'Application Steps',
            tuitionTitle: 'Tuition Fees & Financial Aid',
            tuitionFeesTitle: 'Tuition Fees',
            tuitionFeesItems: [
                'Undergraduate credit-hour fees: vary by program',
                'Postgraduate program fees: vary by program',
                'Annual registration fees',
            ],
            financialAidTitle: 'Financial Aid',
            financialAidItems: [
                'Scholarships for outstanding students',
                'Discounts for international students',
                'Tuition installment plans',
            ],
            scholarshipTitle: 'Scholarship Students Procedures',
            scholarshipIntro:
                'Al Buraimi University College welcomes scholarship students from various entities and institutions. We offer special and simplified procedures to ensure a smooth admission and registration process.',
            scholarshipDocsTitle: 'Required Documents',
            scholarshipDocs: [
                '• Official letter from the scholarship sponsor',
                '• Attested academic documents',
                '• Copy of the scholarship decision',
            ],
            scholarshipBenefitsTitle: 'Benefits & Facilities',
            scholarshipBenefits: [
                '• Simplified admission procedures',
                '• Direct communication with the sponsor',
                '• Periodic academic performance reports',
            ],
            servicesTitle: 'Services for International Students',
            guidesTitle: 'Student Guides',
            generalGuideTitle: 'General Student Guide',
            generalGuideDesc:
                'A comprehensive guide containing all information an international student needs about the college, academic programs, services, regulations, and policies.',
            downloadGuide: 'Download Guide',
            ctaTitle: 'Ready to Join Us?',
            ctaDesc: 'Start your academic journey with us today',
            ctaButton: 'Register Now',
            contactTitle: 'Contact - International Students Admission Office',
            phoneLabel: 'Phone',
            emailLabel: 'Email',
            contactNote: 'We are here to support you through all admission and registration steps',
        };

    const dir = isAr ? 'rtl' : 'ltr';
    const admissionMenuSrc: string | null = null;

    return (
        <div className="min-h-screen bg-white" dir={dir}>
            {/* Hero Section */}
            <div
                className="relative h-[350px] bg-cover bg-center "
                style={{
                    backgroundImage: `url(/assets/about/foundation_landing.webp)`,
                }}
            >

                <div className="absolute inset-0 bg-[#254151]/90"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">{t.pageTitle}</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/main/" className="hover:text-[#c2a772] transition-colors">
                            {t.home}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {t.students}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.pageTitle}</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-2 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="international" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md xl:p-8 md:p-6 sm:p-4 p-2 ">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="sm:w-12 sm:h-12 w-8 h-8 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Globe className="size-4 sm:size-6 text-white" />
                                </div>
                                <h2 className="text-xl xl:text-3xl text-[#254151]">{t.sectionTitle}</h2>
                            </div>

                            {/* نبذة ترحيبية */}
                            <section className="mb-10">
                                <div className="bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg  lx:p-8 md:p-6 p-3  border-l-4 border-[#6096b4]">
                                    <div className="flex items-start gap-6">
                                        <div className="hidden md:block">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-full flex items-center justify-center">
                                                <Globe className="size-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl text-[#254151] mb-4">{t.welcomeTitle}</h3>
                                            <p className="text-gray-700 text-lg leading-loose">
                                                {t.welcomeDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mt-6">
                                    <div className="bg-[#6096b4] rounded-lg p-6 text-white text-center hover:scale-105 transition-transform">
                                        <Users className=" size-6 md:size-8 xl:size-12 mx-auto mb-3" />
                                        <h4 className=" text-lg xl:text-xl font-semibold mb-2">{t.diversityTitle}</h4>
                                        <p className="text-sm opacity-90">{t.diversityDesc}</p>
                                    </div>

                                    <div className="bg-[#c2a772] rounded-lg p-6 text-white text-center hover:scale-105 transition-transform">
                                        <Award className="size-6 md:size-8 xl:size-12 mx-auto mb-3" />
                                        <h4 className=" text-lg xl:text-xl font-semibold mb-2">{t.qualityTitle}</h4>
                                        <p className=" text-sm opacity-90">{t.qualityDesc}</p>
                                    </div>

                                    <div className="bg-[#254151] rounded-lg p-6 text-white text-center hover:scale-105 transition-transform">
                                        <Globe className="size-6 md:size-8 xl:size-12 mx-auto mb-3" />
                                        <h4 className="text-lg xl:text-xl font-semibold mb-2">{t.supportTitle}</h4>
                                        <p className="text-sm opacity-90">{t.supportDesc}</p>
                                    </div>
                                </div>
                            </section>

                            {/* قائمة القبول */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <FileText className="size-6 text-[#c2a772]" />
                                    {t.admissionInfo}
                                </h3>

                                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#c2a772]">
                                    {admissionMenuSrc ? (
                                        <img
                                            src={admissionMenuSrc}
                                            alt={t.admissionMenuAlt}
                                            className="w-full h-auto"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-600">
                                            {t.admissionMenuPlaceholder}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* المتطلبات والمعايير */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <CheckCircle className="size-6 text-[#6096b4]" />
                                    {t.criteriaTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {requirements.map((requirement, index) => (
                                        <div
                                            key={index}
                                            className={`${requirement.color} rounded-lg p-6 text-white`}
                                        >

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                    <requirement.icon className="size-6 text-white" />
                                                </div>
                                                <h4 className="text-xl font-semibold">{isAr ? requirement.titleAr : requirement.titleEn}</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {(isAr ? requirement.itemsAr : requirement.itemsEn).map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <CheckCircle className="size-5 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* الوثائق المطلوبة للتأشيرة */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <FileText className="size-6 text-[#c2a772]" />
                                    {t.visaDocsTitle}
                                </h3>

                                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border-2 border-[#6096b4]/30 shadow-xl">
                                    <p className="text-lg text-gray-700 leading-relaxed mb-6 pb-6 border-b border-gray-300">
                                        {t.visaDocsIntro}
                                    </p>

                                    <div className="space-y-4">
                                        {t.visaDocs.map((doc, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-r-4 border-[#6096b4]"
                                            >

                                                <div className="flex items-start gap-4">
                                                    <div className="hidden sm:flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#6096b4] to-[#254151] flex items-center justify-center">
                                                        <CheckCircle className="size-5 text-white" />
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed flex-1 pt-1.5">{doc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* تأشيرة الدراسة - التجديد */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Plane className="size-6 text-[#c2a772]" />
                                    {t.studyVisaTitle}
                                </h3>

                                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#c2a772]/30">
                                    <p className="text-lg text-gray-700 leading-relaxed mb-6 pb-6 border-b border-gray-300">
                                        {t.studyVisaIntro}
                                    </p>

                                    <div className="space-y-4">
                                        {t.studyVisaDocs.map((doc, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-l from-blue-50 to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-r-4 border-[#c2a772]"
                                            >

                                                <div className="flex items-start gap-4">
                                                    <div className="hidden sm:flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#c2a772] to-[#254151] flex items-center justify-center">
                                                        <CheckCircle className="size-5 text-white" />
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed flex-1 pt-1.5">{doc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* إجراءات القبول */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Award className="size-6 text-[#c2a772]" />
                                    {t.applyStepsTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {procedures.map((procedure, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#6096b4] hover:shadow-lg transition-all relative"
                                        >

                                            <div className="absolute -top-4 sm:-right-4 -right-2   w-6 sm:w-12  h-6 sm:h-12 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-full flex items-center justify-center text-white font-bold text-md sm:text-xl shadow-lg">
                                                {procedure.step}
                                            </div>
                                            <div className="mt-4">
                                                <div className="w-12 h-12 bg-[#6096b4]/10 rounded-lg flex items-center justify-center mb-4">
                                                    <procedure.icon className="size-6 text-[#6096b4]" />
                                                </div>
                                                <h4 className="text-lg text-[#254151] font-semibold mb-2">{isAr ? procedure.titleAr : procedure.titleEn}</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed">{isAr ? procedure.descriptionAr : procedure.descriptionEn}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* الرسوم الدراسية */}
                            <section className="mb-10">
                                <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <DollarSign className="size-6 text-[#6096b4]" />
                                    {t.tuitionTitle}
                                </h3>

                                <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-xl font-semibold mb-4">{t.tuitionFeesTitle}</h4>
                                            <ul className="space-y-3">
                                                {t.tuitionFeesItems.map((item) => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <CheckCircle className="size-5 flex-shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-semibold mb-4">{t.financialAidTitle}</h4>
                                            <ul className="space-y-3">
                                                {t.financialAidItems.map((item) => (
                                                    <li key={item} className="flex items-start gap-2">
                                                        <CheckCircle className="size-5 flex-shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* إجراءات طلبة البعثات */}
                            <section className="mb-10">
                                <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Award className="size-6 text-[#c2a772]" />
                                    {t.scholarshipTitle}
                                </h3>

                                <div className="bg-white border-2 border-[#c2a772] rounded-lg p-6">
                                    <p className="text-gray-700 text-lg leading-loose mb-4">
                                        {t.scholarshipIntro}
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                                        <div className="bg-[#6096b4]/10 rounded-lg p-4">
                                            <h5 className="text-[#254151] font-semibold mb-2 flex items-center gap-2">
                                                <FileText className="size-5 text-[#6096b4]" />
                                                {t.scholarshipDocsTitle}
                                            </h5>
                                            <ul className="text-gray-600 text-sm space-y-1">
                                                {t.scholarshipDocs.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-[#c2a772]/10 rounded-lg p-4">
                                            <h5 className="text-[#254151] font-semibold mb-2 flex items-center gap-2">
                                                <CheckCircle className="size-5 text-[#c2a772]" />
                                                {t.scholarshipBenefitsTitle}
                                            </h5>
                                            <ul className="text-gray-600 text-sm space-y-1">
                                                {t.scholarshipBenefits.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* الخدمات المقدمة */}
                            <section className="mb-10">
                                <h3 className="text-lg md:text-xl xl:text-2xl  text-[#254151] mb-6 flex items-center gap-2">
                                    <Users className="size-4 sm:size-6 text-[#6096b4]" />
                                    {t.servicesTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {services.map((service, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#6096b4] hover:shadow-lg transition-all"
                                        >

                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg hidden sm:flex items-center justify-center flex-shrink-0">
                                                    <service.icon className="size-6 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg text-[#254151] font-semibold mb-2">{isAr ? service.titleAr : service.titleEn}</h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{isAr ? service.descriptionAr : service.descriptionEn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* أدلة الطلبة */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <BookOpen className="size-6 text-[#c2a772]" />
                                    {t.guidesTitle}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {guides.map((guide, index) => (
                                        <a
                                            key={index}
                                            href={guide.link}
                                            className={`bg-gradient-to-br ${guide.color} rounded-lg p-2 sm:p-6 text-white hover:shadow-xl transition-all group`}
                                        >

                                            <div className="flex  flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                                                <div className="flex  items-center justify-between sm:justify-start gap-4 w-full">
                                                    <div className="w-12 h-12  bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                        <guide.icon className="size-6 text-white" />
                                                    </div>
                                                    <h4 className="text-lg font-semibold">{isAr ? guide.titleAr : guide.titleEn}</h4>
                                                </div>
                                                <Download className="size-6 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </a>

                                    ))}
                                </div>

                                <div className="mt-6 bg-[#6096b4]/10 rounded-lg p-6 border border-[#6096b4]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <BookOpen className="size-6 text-[#6096b4]" />
                                        <h4 className="text-lg text-[#254151] font-semibold">{t.generalGuideTitle}</h4>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        {t.generalGuideDesc}
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 bg-[#6096b4] text-white px-6 py-3 rounded-lg hover:bg-[#254151] transition-colors"
                                    >
                                        <Download className="size-5" />
                                        {t.downloadGuide}
                                    </a>
                                </div>
                            </section>

                            {/* زر التقديم */}
                            <div className="bg-gradient-to-l from-[#c2a772] to-[#6096b4] rounded-lg p-8 text-center text-white mb-10">
                                <h3 className="text-3xl font-bold mb-4">{t.ctaTitle}</h3>
                                <p className="text-lg mb-6 opacity-90">{t.ctaDesc}</p>
                                <Link
                                    href="/main/admission"
                                    className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ExternalLink className="size-6" />
                                    {t.ctaButton}
                                </Link>
                            </div>

                            {/* للتواصل */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                                <h3 className=" text-lg md:text-xl xl:text-2xl mb-6 text-center font-semibold flex items-center justify-center gap-2">
                                    <Globe className="size-6 hidden sm:flex" />
                                    {t.contactTitle}
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{t.phoneLabel}</p>
                                            <p className="font-semibold" dir="ltr">25657666-(778)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">{t.emailLabel}</p>
                                            <p className="font-semibold text-sm">international@buc.edu.om</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                                    <p className="text-sm opacity-90">
                                        <Globe className="inline size-5 ml-2" />
                                        {t.contactNote}
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