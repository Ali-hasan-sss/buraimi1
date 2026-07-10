import { Building2, Target, CheckCircle, Phone, MapPin, Wifi, Tv, Calendar, ShoppingCart, Users, Shield, Sparkles, Bus, Church, Stethoscope, BookOpen, UtensilsCrossed, ChefHat, Trees, Clock, Flame, DollarSign } from 'lucide-react';
import heroImage from '@/public/assets/about/foundation_landing.webp';
import { StudentsSidebar } from '@/components/student/clinic/StudentsSidebar';
import Link from 'next/link';
import Image from 'next/image';

export default function HousingPage() {
    const objectives = [
        'توفير بيئة مناسبة للطالبة وتشجيعها على التحصيل العلمي',
        'بث روح الألفة والمودة بين الطالبات',
        'تشجيع الطالبة على تنمية مواهبها ومهاراتها',
        'مساعدة الطالبة في تنمية ذاتها وبناء شخصيتها المستقلة واعتمادها على نفسها',
        'تشجيع الطالبة للمحافظة على القيم والعادات العمانية',
    ];

    const features = [
        { icon: Wifi, text: 'توفير خدمة الإنترنت المجانية' },
        { icon: Tv, text: 'توفير صالات لمشاهدة التلفاز' },
        { icon: Calendar, text: 'إقامة أنشطة وفعاليات ترفيهية، وثقافية مختلفة، ورحلات علمية' },
        { icon: ShoppingCart, text: 'إقامة رحلات تسوق أسبوعية' },
        { icon: Users, text: 'توجد غرف لاستقبال الزوار' },
        { icon: Shield, text: 'توفير مشرفات وحراس أمن على مدار 24 ساعة' },
        { icon: Sparkles, text: 'توفير عاملات نظافة' },
        { icon: Bus, text: 'توفير مواصلات مريحة وآمنة' },
        { icon: Church, text: 'توفير مصلى' },
        { icon: Stethoscope, text: 'عيادة لزيارة طبيبة الكلية' },
        { icon: BookOpen, text: 'قاعة مذاكرة' },
        { icon: UtensilsCrossed, text: 'قاعة طعام' },
        { icon: ChefHat, text: 'مطبخ مجهز' },
        { icon: Trees, text: 'مساحات خضراء للجلوس' },
        { icon: Clock, text: 'قاعة انتظار لأولياء الأمور وأخرى للطالبات' },
        { icon: Building2, text: 'صالة ألعاب رياضية' },
        { icon: Flame, text: 'أنظمة إنذار ومكافحة الحرائق' },
    ];

    const roomTypes = [
        {
            title: 'غرفة مفردة',
            price: '380 ريال عماني',
            features: [
                'Comfortable Bed and Blanket / Student',
                'Table and Chair / Student',
                'Cupboard / Student',
                'واي فاي مجاني',
            ],
            color: 'from-[#254151] to-[#6096b4]',
            highlight: true,
        },
        {
            title: 'الغرفة الثنائية',
            price: '240 ريال عماني',
            features: [
                'Comfortable Bed and Blanket / Student',
                'Table and Chair / Student',
                'Cupboard / Student',
                'واي فاي مجاني',
            ],
            color: 'from-[#6096b4] to-[#254151]',
            highlight: false,
        },
        {
            title: 'الغرفة الثلاثية',
            price: '200 ريال عماني',
            features: [
                'Comfortable Bed and Blanket / Student',
                'Table and Chair / Student',
                'Cupboard / Student',
                'واي فاي مجاني',
            ],
            color: 'from-[#c2a772] to-[#6096b4]',
            highlight: false,
        },
        {
            title: 'الغرفة الرباعية',
            price: '170 ريال عماني',
            features: [
                'Comfortable Bed and Blanket / Student',
                'Table and Chair / Student',
                'Cupboard / Student',
                'واي فاي مجاني',
            ],
            color: 'from-[#6096b4] to-[#c2a772]',
            highlight: false,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div
                className="relative h-[350px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-[#254151]/60"></div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <h1 className="text-5xl text-white mb-4">سكن الطالبات</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white mt-4">
                        <Link href="/main" className="hover:text-[#c2a772] transition-colors">
                            الرئيسية
                        </Link>
                        <span>/</span>
                        <Link href="/main/students" className="hover:text-[#c2a772] transition-colors">
                            الطلبة
                        </Link>
                        <span>/</span>
                        <span className="text-[#c2a772]">سكن الطالبات</span>
                    </div>
                </div>
            </div>

            {/* Main Content with Sidebar */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <StudentsSidebar activeId="housing" />

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                                <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                                    <Building2 className="size-6 text-white" />
                                </div>
                                <h2 className="text-3xl text-[#254151]">سكن الطالبات</h2>
                            </div>

                            {/* نبذة عن سكن الطالبات */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-4">نبذة عن سكن الطالبات</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-loose">
                                        يمكن أن يكون العيش في الحرم الجامعي والاندماج في مجتمعه من أكثر تجارب الحياة الجامعية إثراءً. في أروقة السكن، يمكن للطالبات التواصل مع نظرائهن من ولايات السلطنة المختلفة، والمشاركة في الفرص القيادية ووسائل تطويرها، والعديد من الأنشطة التفاعلية سواء في السكن أو في الحرم الجامعي.
                                    </p>
                                    <p className="text-gray-700 leading-loose">
                                        ما يميز هذه المرحلة (الحياة الجامعية) هو حرص العاملين في قسم الإسكان بكلية البريمي الجامعية على المشاركة في جميع فعاليات وأنشطة الطالبات المقيمات في السكن، وحرصهن على خلق بيئة مريحة ومشجعة وممتعة. أجواء في أروقة السكن لجعله المكان الأكثر جاهزية لدعم الطالبات اللاتي يعشن بعيدًا عن عائلاتهن.
                                    </p>
                                    <p className="text-gray-700 leading-loose">
                                        يتم اختيار وتدريب طاقم السكن الداخلي لخلق ودعم بيئة مناسبة وحيوية تدعم وتحقق الأهداف الأكاديمية والشخصية والاجتماعية للطلاب.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <Image
                                        width={300}
                                        height={200}
                                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3JtJTIwcm9vbXxlbnwxfHx8fDE3NzMxMjg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="غرفة السكن"
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                    <Image
                                        width={300}
                                        height={200}
                                        src="https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjBhcmVhfGVufDF8fHx8MTc3MzEyODQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="المرافق المشتركة"
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            </section>

                            {/* أهداف سكن الطالبات */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <Target className="size-6 text-[#6096b4]" />
                                    أهداف سكن الطالبات
                                </h3>
                                <div className="bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-6">
                                    <ul className="space-y-4">
                                        {objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle className="size-6 text-[#6096b4] flex-shrink-0 mt-1" />
                                                <span className="text-gray-700 text-lg leading-relaxed">{objective}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* مميزات سكن الطالبات */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <CheckCircle className="size-6 text-[#c2a772]" />
                                    مميزات سكن الطالبات
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <feature.icon className="size-5 text-white" />
                                            </div>
                                            <span className="text-gray-700 text-sm">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* أسعار السكن */}
                            <section className="mb-10">
                                <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                                    <DollarSign className="size-6 text-[#6096b4]" />
                                    أسعار السكن حسب نوع الغرفة
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {roomTypes.map((room, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gradient-to-br ${room.color} rounded-lg p-6 text-white ${room.highlight ? 'ring-4 ring-[#c2a772] transform scale-105' : ''
                                                } hover:scale-105 transition-transform`}
                                        >
                                            <div className="text-center mb-6">
                                                <Building2 className="size-12 mx-auto mb-3 opacity-90" />
                                                <h4 className="text-2xl font-bold mb-2">{room.title}</h4>
                                                <div className="text-4xl font-bold mb-1">{room.price}</div>
                                                <p className="text-sm opacity-90">/الفصل</p>
                                            </div>
                                            <div className="space-y-3">
                                                {room.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <CheckCircle className="size-5 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* للتواصل */}
                            <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                                <h3 className="text-2xl mb-6 text-center font-semibold">للتواصل</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <Phone className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">رقم الهاتف</p>
                                            <p className="font-semibold" dir="ltr">25657666-(778) / 25657745</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="size-6 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm opacity-90 mb-1">المكان</p>
                                            <p className="font-semibold">Hostels Building</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
