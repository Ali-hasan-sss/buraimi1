"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
    Heart,
    Users,
    Award,
    Globe,
    Coffee,
    Building2,
    Shield,
    Car,
    Utensils,
    Wifi,
    Accessibility,
    FileText,
    MapPin,
    Dumbbell,
    AlertCircle,
    UserCheck,
    Home as HomeIcon,
} from 'lucide-react';
import heroImage from '@/public/assets/about/foundation_landing.webp';
import { useLocale } from 'next-intl';

export default function StudentLifePage() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';

    const t = isAr
        ? {
            pageTitle: 'حياة الطالب في كلية البريمي',
            breadcrumbHome: 'الرئيسية',
            breadcrumbStudents: 'الطلاب',
            breadcrumbCurrent: 'حياة الطالب',
            introTitle: 'الحياة الجامعية',
            introText: 'يضم الحرم الجامعي لدينا مجموعة من الأفراد المتميزين والمبدعين، انضم إلينا لتكون واحدًا منهم.',
            stats: {
                academicClubs: 'الأندية الأكاديمية',
                studentGroups: 'الجماعات الطلابية',
                externalParticipation: 'المشاركات الخارجية',
                internationalStudents: 'الطلبة الدوليين',
            },
            campusTitle: 'الحرم الجامعي',
            campusAlt: 'الحرم الجامعي',
            campusP1:
                'إن الحرم الجامعي لكلية البريمي الجامعية هو حقاً مكان خاص وبيئة فريدة من نوعها. وذلك من خلال جعل بيئة الكلية جذابة ومفيدة، مع التركيز على صحة وسلامة الجميع في الحرم الجامعي من خلال الحفاظ على المباني والقاعات الدراسية والسكن الداخلي والمطاعم وجميع أماكن الخدمات في الكلية نظيفة وعملية ومستدامة.',
            campusP2:
                'يوجد في حرم كلية البريمي الجامعية مدرجان، كل منهما يتسع لـ 120 مقعدًا، بالإضافة إلى أماكن خاصة للدراسة ومناطق مشتركة خارجية. بالإضافة إلى ذلك، كذلك يوجد مقهى Flo ومطعم والخدمات المالية ومواقف السيارات في المبنى. تقع الكلية في موقع مناسب على بعد حوالي 10 كيلومترات من مدينة البريمي.',
            activitiesTitle: 'الأنشطة الطلابية',
            activitiesAlt: 'الأنشطة الطلابية',
            activitiesText:
                'تسهم الأنشطة الرياضية في تعزيز اللياقة البدنية وتنمية الروح الرياضية والعمل الجماعي كما تسهم الأنشطة الثقافية مثل المسابقات الأدبية والمسرحيات والندوات الثقافية والمناظرات الطلابية وفن الرسم في تنمية المهارات اللغوية والإبداعية لدى الطلاب ليكونوا مؤثرين في المجتمع.',
            mosqueTitle: 'المسجد',
            mosqueAlt: 'مسجد الكلية',
            mosqueText:
                'يوجد في الحرم الجامعي مسجد يخدم احتياجات الطلاب الدينية، ويحتوي المسجد على كافة المرافق من دورات مياه ومكان للصلاة وغرف خدمات، ويتسع المسجد لحوالي 100 مصلي، ويمكن الوصول إلى المسجد سيراً على الأقدام في دقيقتين من مبنى شؤون الطلاب، بينما يبعد عن المباني مسافة 5 دقائق سيراً على الأقدام.',
            cafeteriaTitle: 'الكفتيريا ومقهى FLÕ',
            cafeteriaAlt: 'الكفتيريا',
            cafeteriaWelcome: 'مرحباً',
            cafeteriaText: 'نوفر لطلابنا مطعمًا عصريًا ومقهى FLÕ يقدمان مجموعة متنوعة من الوجبات الصحية والمشروبات في بيئة مريحة وجذابة.',
            servicesTitle: 'الخدمات والمرافق',
            healthSafetyTitle: 'الصحة والسلامة',
            healthSafetyText: 'تلتزم كلية البريمي الجامعية بالحفاظ على بيئة صحية وآمنة لجميع الطلاب والموظفين والزوار.',
            clinicTitle: 'عيادة الكلية',
            clinicText: 'وتعتبر عيادة الكلية ذات أهمية كبيرة لاستقبال المرضى والحالات الطارئة ومعالجتها في البداية وتقديم الإسعافات الأولية للمريض للحد من تدهور حالته.',
            clinicCta: 'المزيد عن العيادة',
            housingTitle: 'سكن الطالبات',
            housingAlt: 'سكن الطالبات',
            housingText: 'يمكن أن تكون إحدى التجارب الأكثر إثراءً في الحياة الجامعية هي العيش في الحرم الجامعي والاندماج في مجتمعه.',
            housingCta: 'المزيد عن السكن',
            facilitiesListTitle: 'قائمة المرافق',
            facilitiesGeneralTitle: 'المرافق العامة',
            facilitiesParkingTitle: 'المواقف وحركة السيارات',
            parkingAlt: 'مواقف السيارات',
            facilitiesClinicTitle: 'العيادة',
            facilitiesClinicText: 'عيادة طبية مجهزة بالكامل لخدمة الطلاب والموظفين',
            facilitiesRestaurantsTitle: 'المطاعم والاستراحات',
            facilitiesFinancialTitle: 'الخدمات المالية',
            facilitiesReligiousTitle: 'المرافق الدينية',
            facilitiesSecurityTitle: 'مرافق الأمن والسلامة',
            securityAlt: 'الأمن والسلامة',
            facilitiesHousingTitle: 'مرافق سكن الطالبات',
            facilitiesSportsTitle: 'المرافق الرياضية',
            gymAlt: 'صالة الألعاب الرياضية',
            gymTitle: 'صالة الألعاب الرياضية',
            gymText: 'مجهزة بأحدث المعدات الرياضية',
            footballTitle: 'ملعب كرة قدم',
            footballText: 'ملعب عشبي بمواصفات عالمية',
            gamesRoomTitle: 'غرفة الألعاب',
            gamesRoomText: 'البلياردو وتنس الطاولة',
            ctaTitle: 'جاهز لتجربة الحياة الجامعية معنا؟',
            ctaSubtitle: 'انضم إلى مجتمعنا الطلابي واستمتع بتجربة جامعية متكاملة',
            ctaApply: 'التقديم الآن',
            ctaExplore: 'اكتشف المزيد',
        }
        : {
            pageTitle: 'Student Life at Al Buraimi University College',
            breadcrumbHome: 'Home',
            breadcrumbStudents: 'Students',
            breadcrumbCurrent: 'Student Life',
            introTitle: 'Campus Life',
            introText: 'Our campus brings together outstanding and creative individuals—join us and be one of them.',
            stats: {
                academicClubs: 'Academic Clubs',
                studentGroups: 'Student Groups',
                externalParticipation: 'External Participations',
                internationalStudents: 'International Students',
            },
            campusTitle: 'Campus',
            campusAlt: 'Campus',
            campusP1:
                'Our campus is a truly special place and a unique environment. We focus on making the college environment attractive and beneficial, while prioritizing the health and safety of everyone by keeping buildings, classrooms, housing, restaurants, and service areas clean, functional, and sustainable.',
            campusP2:
                'The campus includes two auditoriums (120 seats each), dedicated study spaces, and outdoor common areas. It also features Flo Café, a restaurant, financial services, and parking. The college is conveniently located about 10 km from Al Buraimi city.',
            activitiesTitle: 'Student Activities',
            activitiesAlt: 'Student Activities',
            activitiesText:
                'Sports activities enhance physical fitness, teamwork, and sportsmanship. Cultural activities such as literary competitions, theatre, seminars, debates, and art help students develop creativity and communication skills to become positive contributors to society.',
            mosqueTitle: 'Mosque',
            mosqueAlt: 'College Mosque',
            mosqueText:
                'A campus mosque serves students’ religious needs and includes full facilities. It accommodates around 100 worshippers and is reachable within minutes from Student Affairs and other campus buildings.',
            cafeteriaTitle: 'Cafeteria & FLÕ Café',
            cafeteriaAlt: 'Cafeteria',
            cafeteriaWelcome: 'Welcome',
            cafeteriaText: 'We provide a modern cafeteria and FLÕ Café offering a variety of meals and beverages in a comfortable atmosphere.',
            servicesTitle: 'Services & Facilities',
            healthSafetyTitle: 'Health & Safety',
            healthSafetyText: 'Al Buraimi University College is committed to maintaining a healthy and safe environment for all students, staff, and visitors.',
            clinicTitle: 'College Clinic',
            clinicText: 'The clinic is essential for receiving patients and emergencies, providing first aid, and preventing the deterioration of conditions.',
            clinicCta: 'More about the clinic',
            housingTitle: 'Female Student Housing',
            housingAlt: 'Student Housing',
            housingText: 'Living on campus can be one of the most enriching experiences in university life and helps you integrate into the community.',
            housingCta: 'More about housing',
            facilitiesListTitle: 'Facilities List',
            facilitiesGeneralTitle: 'General Facilities',
            facilitiesParkingTitle: 'Parking & Traffic',
            parkingAlt: 'Parking',
            facilitiesClinicTitle: 'Clinic',
            facilitiesClinicText: 'A fully equipped medical clinic serving students and staff',
            facilitiesRestaurantsTitle: 'Restaurants & Cafés',
            facilitiesFinancialTitle: 'Financial Services',
            facilitiesReligiousTitle: 'Religious Facilities',
            facilitiesSecurityTitle: 'Security & Safety Facilities',
            securityAlt: 'Security & Safety',
            facilitiesHousingTitle: 'Housing Facilities',
            facilitiesSportsTitle: 'Sports Facilities',
            gymAlt: 'Gym',
            gymTitle: 'Gym',
            gymText: 'Equipped with modern fitness equipment',
            footballTitle: 'Football Field',
            footballText: 'A grass field built to high standards',
            gamesRoomTitle: 'Games Room',
            gamesRoomText: 'Billiards and table tennis',
            ctaTitle: 'Ready to experience campus life with us?',
            ctaSubtitle: 'Join our student community and enjoy a complete university experience.',
            ctaApply: 'Apply now',
            ctaExplore: 'Explore more',
        };

    const stats = [
        { number: '6', label: t.stats.academicClubs, icon: Award },
        { number: '9', label: t.stats.studentGroups, icon: Users },
        { number: '75', label: t.stats.externalParticipation, icon: Globe },
        { number: '135', label: t.stats.internationalStudents, icon: Users },
    ];

    const facilities = isAr
        ? [
            { icon: Wifi, title: 'شبكة انترنت 24 ساعة في اليوم' },
            { icon: Accessibility, title: 'دعم ذوي الهمم' },
            { icon: Award, title: 'الخدمات الرياضية' },
            { icon: Globe, title: 'ملعب كرة قدم' },
            { icon: Dumbbell, title: 'صالة الألعاب الرياضية - غرفة التمارين الرياضية والتمارين الهوائية' },
            { icon: Coffee, title: 'غرفة البلياردو وتنس الطاولة' },
        ]
        : [
            { icon: Wifi, title: '24/7 Internet Network' },
            { icon: Accessibility, title: 'Accessibility Support' },
            { icon: Award, title: 'Sports Services' },
            { icon: Globe, title: 'Football Field' },
            { icon: Dumbbell, title: 'Gym - fitness & cardio area' },
            { icon: Coffee, title: 'Billiards and table tennis room' },
        ];

    const parkingFacilities = isAr
        ? [
            { icon: MapPin, title: 'خرائط الحرم الجامعي واللوحات الإرشادية' },
            { icon: Shield, title: 'مطبات ومكافح تخفيض السرعة للمركبات' },
            { icon: Car, title: 'مواقف السيارات' },
        ]
        : [
            { icon: MapPin, title: 'Campus maps and signboards' },
            { icon: Shield, title: 'Speed bumps and traffic calming' },
            { icon: Car, title: 'Parking lots' },
        ];

    const restaurantFacilities = isAr
        ? [
            { icon: Utensils, title: 'كفتيريا الطلبة', color: '#6096b4' },
            { icon: Coffee, title: 'فلو كافيه', color: '#c2a772' },
        ]
        : [
            { icon: Utensils, title: 'Student Cafeteria', color: '#6096b4' },
            { icon: Coffee, title: 'Flo Café', color: '#c2a772' },
        ];

    const financialServices = isAr
        ? [
            { icon: FileText, title: 'صراف آلي - بنك عمان العربي' },
            { icon: FileText, title: 'الدفع الإلكتروني - والبطاقات البنكية' },
        ]
        : [
            { icon: FileText, title: 'ATM - Arab Bank Oman' },
            { icon: FileText, title: 'E-payment and bank cards' },
        ];

    const religiousFacilities = isAr
        ? [
            { icon: Building2, title: 'المسجد' },
            { icon: Building2, title: 'مصلى الطلاب' },
            { icon: Building2, title: 'مصلى الطالبات' },
        ]
        : [
            { icon: Building2, title: 'Mosque' },
            { icon: Building2, title: 'Male prayer room' },
            { icon: Building2, title: 'Female prayer room' },
        ];

    const securityFacilities = isAr
        ? [
            { icon: UserCheck, title: 'موظفي امن - ذكور' },
            { icon: UserCheck, title: 'موظفي امن - اناث' },
            { icon: Shield, title: 'امن بوابة دخول' },
            { icon: Shield, title: 'امن بوابة الخروج' },
            { icon: AlertCircle, title: 'بوابة خاصة للحالات الطارئة' },
            { icon: Heart, title: 'نقاط التجمع' },
        ]
        : [
            { icon: UserCheck, title: 'Security staff - male' },
            { icon: UserCheck, title: 'Security staff - female' },
            { icon: Shield, title: 'Entry gate security' },
            { icon: Shield, title: 'Exit gate security' },
            { icon: AlertCircle, title: 'Emergency gate' },
            { icon: Heart, title: 'Assembly points' },
        ];

    const housingFacilities = isAr
        ? [
            'موظفي امن - اناث',
            'امن بوابة دخول',
            'امن بوابة الخروج',
            'شبكة انترنت 24 ساعة في اليوم',
            'مرافق النقل',
            'غرف الصلاة',
            'غرفة طعام',
            'كفتيريا الطلبة',
            'غرف القراءة والمطالعة',
            'غرف الأنتظار والتلفاز',
            'العيادة',
            'غرفة التمارين الرياضية وصالة البلياردو وتنس الطاولة',
            'نقاط التجمع',
        ]
        : [
            'Security staff - female',
            'Entry gate security',
            'Exit gate security',
            '24/7 Internet network',
            'Transportation facilities',
            'Prayer rooms',
            'Dining room',
            'Student cafeteria',
            'Reading rooms',
            'Waiting room and TV',
            'Clinic',
            'Gym, billiards and table tennis room',
            'Assembly points',
        ];

    return (
        <div className="min-h-screen bg-white" dir={dir}>
            {/* Hero Section */}
            <div className="relative h-[260px] sm:h-[360px] lg:h-[400px] overflow-hidden">
                <Image
                    src={heroImage}
                    alt={t.pageTitle}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#254151]/70 to-[#254151]/50"></div>

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6">{t.pageTitle}</h1>

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white mt-2 sm:mt-4">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            {t.breadcrumbStudents}
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">{t.breadcrumbCurrent}</span>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-4xl text-[#254151] mb-4 sm:mb-6">{t.introTitle}</h2>
                        <p className="text-base sm:text-xl text-gray-700 leading-relaxed">{t.introText}</p>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-10 sm:py-16 bg-gradient-to-l from-[#254151] to-[#6096b4]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
                            >
                                <stat.icon className="size-10 sm:size-12 text-[#c2a772] mx-auto mb-4" />
                                <div className="text-4xl sm:text-6xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-white/90 text-base sm:text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Section */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl sm:text-4xl text-[#254151] mb-6 sm:mb-8">{t.campusTitle}</h2>

                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                            <div className="relative w-full h-64 sm:h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMDU0MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                    alt={t.campusAlt}
                                    fill
                                    className="object-cover rounded-lg shadow-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">{t.campusP1}</p>
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.campusP2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Activities */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#6096b4]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Award className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.activitiesTitle}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1764920265158-500a6e60c487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYWN0aXZpdGllcyUyMGNhbXB1c3xlbnwxfHx8fDE3NzMxMjg0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt={t.activitiesAlt}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.activitiesText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mosque Section */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#c2a772]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#c2a772] rounded-lg flex items-center justify-center">
                                    <Building2 className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.mosqueTitle}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1714526393668-fbcd8edcb39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBwcmF5ZXIlMjBoYWxsfGVufDF8fHx8MTc3MzA4NTM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt={t.mosqueAlt}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.mosqueText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cafeteria and FLÕ Cafe */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#6096b4]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Coffee className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.cafeteriaTitle}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1665573437627-83904fc95338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FmZXRlcmlhJTIwbW9kZXJufGVufDF8fHx8MTc3MzEyOTQ2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt={t.cafeteriaAlt}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-xl sm:text-2xl text-[#254151] mb-4">{t.cafeteriaWelcome}</h3>
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.cafeteriaText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services and Facilities */}
            <section className="py-10 sm:py-16 bg-gradient-to-br from-[#254151] to-[#6096b4]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl sm:text-4xl text-white text-center">{t.servicesTitle}</h2>
                    </div>
                </div>
            </section>

            {/* Health and Safety */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#c2a772]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#c2a772] rounded-lg flex items-center justify-center">
                                    <Shield className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.healthSafetyTitle}</h2>
                            </div>

                            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.healthSafetyText}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* College Clinic */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#6096b4]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Heart className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.clinicTitle}</h2>
                            </div>

                            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.clinicText}</p>

                            <Link
                                href="/main/students#clinic"
                                className="inline-block mt-6 bg-[#6096b4] text-white px-6 py-3 rounded-lg hover:bg-[#254151] transition-all"
                            >
                                {t.clinicCta}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Housing */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-r-4 border-[#c2a772]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#c2a772] rounded-lg flex items-center justify-center">
                                    <HomeIcon className="size-6 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl text-[#254151]">{t.housingTitle}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image
                                        src="https://images.unsplash.com/photo-1763770449161-eb1cd5596415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZG9ybWl0b3J5JTIwaG91c2luZ3xlbnwxfHx8fDE3NzMxMjg0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt={t.housingAlt}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{t.housingText}</p>
                                    <Link
                                        href="/main/students#housing"
                                        className="inline-block mt-6 bg-[#c2a772] text-white px-6 py-3 rounded-lg hover:bg-[#254151] transition-all"
                                    >
                                        {t.housingCta}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities List */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl sm:text-4xl text-[#254151] mb-8 sm:mb-12 text-center">{t.facilitiesListTitle}</h2>

                        {/* General Facilities */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#6096b4] pr-4">{t.facilitiesGeneralTitle}</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {facilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <facility.icon className="size-6 text-white" />
                                        </div>
                                        <p className="text-gray-700">{facility.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Parking and Traffic */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#c2a772] pr-4">{t.facilitiesParkingTitle}</h3>
                            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                                {parkingFacilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-[#c2a772] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <facility.icon className="size-6 text-white" />
                                        </div>
                                        <p className="text-gray-700">{facility.title}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 relative w-full h-56 sm:h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1769286111756-66e69c4d74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwcGFya2luZyUyMGxvdHxlbnwxfHx8fDE3NzMxMjk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                    alt={t.parkingAlt}
                                    fill
                                    className="object-cover rounded-lg shadow-md"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        {/* Clinic */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#6096b4] pr-4">{t.facilitiesClinicTitle}</h3>
                            <div className="bg-[#6096b4]/5 rounded-lg p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                        <Heart className="size-8 text-white" />
                                    </div>
                                    <p className="text-gray-700 text-base sm:text-lg">{t.facilitiesClinicText}</p>
                                </div>
                            </div>
                        </div>

                        {/* Restaurants and Cafes */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#c2a772] pr-4">{t.facilitiesRestaurantsTitle}</h3>
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                {restaurantFacilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-all">
                                        <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: facility.color }}>
                                            <facility.icon className="size-8 text-white" />
                                        </div>
                                        <h4 className="text-lg sm:text-xl text-[#254151] font-semibold">{facility.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Financial Services */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#6096b4] pr-4">{t.facilitiesFinancialTitle}</h3>
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                {financialServices.map((service, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <service.icon className="size-6 text-white" />
                                        </div>
                                        <p className="text-gray-700">{service.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Religious Facilities */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#c2a772] pr-4">{t.facilitiesReligiousTitle}</h3>
                            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                                {religiousFacilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-[#c2a772] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <facility.icon className="size-6 text-white" />
                                        </div>
                                        <p className="text-gray-700">{facility.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security and Safety Facilities */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#6096b4] pr-4">{t.facilitiesSecurityTitle}</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {securityFacilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-all">
                                        <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                            <facility.icon className="size-6 text-white" />
                                        </div>
                                        <p className="text-gray-700">{facility.title}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 relative w-full h-56 sm:h-64">
                                <Image
                                    src="https://images.unsplash.com/photo-1769541157615-fbdda5dff815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc2FmZXR5JTIwc2VjdXJpdHl8ZW58MXx8fHwxNzczMTI5NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                    alt={t.securityAlt}
                                    fill
                                    className="object-cover rounded-lg shadow-md"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        {/* Student Housing Facilities */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#c2a772] pr-4">{t.facilitiesHousingTitle}</h3>
                            <div className="bg-gradient-to-l from-[#c2a772]/10 to-[#6096b4]/10 rounded-lg p-6 sm:p-8">
                                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                                    {housingFacilities.map((facility, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <span className="text-[#c2a772] text-xl">•</span>
                                            <p className="text-gray-700">{facility}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Gym Facilities */}
                        <div>
                            <h3 className="text-xl sm:text-2xl text-[#254151] mb-6 border-r-4 border-[#6096b4] pr-4">{t.facilitiesSportsTitle}</h3>
                            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="relative w-full h-64 sm:h-80">
                                    <Image
                                        src="https://images.unsplash.com/photo-1516351464815-9a44f19888c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3ltJTIwZml0bmVzc3xlbnwxfHx8fDE3NzMxMjk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt={t.gymAlt}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="bg-[#6096b4]/5 rounded-lg p-6 mb-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Dumbbell className="size-8 text-[#6096b4]" />
                                            <h4 className="text-lg sm:text-xl text-[#254151] font-semibold">{t.gymTitle}</h4>
                                        </div>
                                        <p className="text-gray-700">{t.gymText}</p>
                                    </div>
                                    <div className="bg-[#c2a772]/5 rounded-lg p-6 mb-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="size-8 text-[#c2a772]" />
                                            <h4 className="text-lg sm:text-xl text-[#254151] font-semibold">{t.footballTitle}</h4>
                                        </div>
                                        <p className="text-gray-700">{t.footballText}</p>
                                    </div>
                                    <div className="bg-[#6096b4]/5 rounded-lg p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Coffee className="size-8 text-[#6096b4]" />
                                            <h4 className="text-lg sm:text-xl text-[#254151] font-semibold">{t.gamesRoomTitle}</h4>
                                        </div>
                                        <p className="text-gray-700">{t.gamesRoomText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-10 sm:py-16 bg-gradient-to-l from-[#254151] to-[#6096b4]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-4xl text-white mb-4 sm:mb-6">{t.ctaTitle}</h2>
                        <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8">{t.ctaSubtitle}</p>
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                            <Link
                                href="/main/admission"
                                className="bg-white text-[#254151] px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-[#c2a772] hover:text-white transition-all text-base sm:text-lg font-semibold"
                            >
                                {t.ctaApply}
                            </Link>
                            <Link
                                href="/main/students"
                                className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-[#254151] transition-all text-base sm:text-lg font-semibold"
                            >
                                {t.ctaExplore}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
