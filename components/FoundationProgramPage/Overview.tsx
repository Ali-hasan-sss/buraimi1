"use client"
import { BookOpen, Globe, Phone, TrendingUp, Users } from "lucide-react";
import { useLocale } from "next-intl";

const directorMessage = {
    title: 'كلمة مدير البرنامج التأسيسي',
    name: 'مدير برنامج التأسيسي العام',
    phone: '0096825657684',
    message: `اعزائي الطلبة،
        مرحباً بكم في وحدة البرنامج التأسيسي العام لكلية البريمي الجامعية ! تقدم صفحاتنا الإلكترونية فكرة واضحة عن البرنامج التأسيسي في كلية البريمي الجامعية وجميع تحديثاتنا المنتظمة.
        يهدف البرنامج إلى إعداد الطلاب للدخول الى المرحلة الجامعية، وتحسين كفاءتهم في اللغة الإنجليزية، مع دمج المهارات الدراسية اللازمة للتعليم والتعلم والتفوق طوال فترة دراستهم. يهدف البرنامج أيضًا إلى تعزيز معرفة الطلاب بأساسيات الرياضيات وتعزيز مهاراتهم في مجال تكنولوجيا المعلومات.
        صُممت المواد الدرلسية وفقاً للمعايير الأكاديمية العُمانية للبرامج التأسيسية التي قدمتها الهيئة العُمانية للاعتماد الأكاديمي ووزارة التعليم العالي. تنعكس هذه المعايير في شكل مخرجات تعلم اللغة الإنجليزية والرياضيات وتقنية المعلومات والمهارات الدراسية العامة.
        يشجع البرنامج التأسيسي العام بموظفيه المؤهلين وذوي الخبرة الطلاب على الاستفادة القصوى من مقررات البرنامج التأسيسي العام لتزويدهم بالمهارات اللازمة لتحقيق نتائج جيدة في مقررات التخصص التي تليها. يرحب البرنامج التأسيسي العام باستفسارات الطلاب وأولياء الأمور والضيوف ويضمن لهم تحديثات منتظمة حول مختلف القضايا المتعلقة بدورات البرنامج التأسيسي العام والتطورات.
        أطيب تمنياتي لجميع طلابنا وطالباتنا، متمنياً لهم كل التوفيق في دراستهم في كلية البريمي الجامعية.`
};

const programFeatures = [
    {
        icon: Globe,
        titleAr: 'معايير أكاديمية عُمانية',
        titleEn: 'Omani Academic Standards',
        descriptionAr: 'مناهج مصممة وفقاً لمعايير الهيئة العُمانية للاعتماد الأكاديمي',
        descriptionEn: "Curriculum designed according to Oman Academic Accreditation Authority standards",
        color: 'blue'
    },
    {
        icon: Users,
        titleAr: 'هيئة تدريسية مؤهلة',
        titleEn: 'Qualified Faculty',
        descriptionAr: 'موظفون مؤهلون وذوو خبرة في التدريس والتوجيه',
        descriptionEn: 'Qualified and experienced staff in teaching and guidance',
        color: 'green'
    },
    {
        icon: BookOpen,
        titleAr: 'مهارات متكاملة',
        titleEn: 'Integrated Skills',
        descriptionAr: 'دمج اللغة الإنجليزية والرياضيات وتكنولوجيا المعلومات',
        descriptionEn: "Integration of English, Mathematics, and Information Technology",
        color: 'purple'
    },
    {
        icon: TrendingUp,
        titleAr: 'تطوير شامل',
        titleEn: "Comprehensive Development",
        descriptionAr: 'تنمية المهارات الأكاديمية والشخصية للطالب',
        descriptionEn: "Development of students' academic and personal skills",
        color: 'amber'
    }
];
export default function FoundOverview() {

    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false
    return (
        <>
            <div id="overview" className="mb-16">
                <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-600 text-white p-4 rounded-full">
                            <BookOpen className="size-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#254151]">نبذة عن البرنامج التأسيسي</h2>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="text-xl mb-4">
                            يهدف البرنامج التأسيسي العام إلى إعداد الطلاب للدخول إلى المرحلة الجامعية بتزويدهم بالمهارات الأساسية اللازمة للنجاح الأكاديمي.
                        </p>
                        <p className="text-lg">
                            صُممت المواد الدراسية وفقاً للمعايير الأكاديمية العُمانية للبرامج التأسيسية التي قدمتها الهيئة العُمانية للاعتماد الأكاديمي ووزارة التعليم العالي.
                        </p>
                    </div>
                </div>
            </div>

            {/* Director's Message */}
            <div className="mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-xl p-10 border-2 border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 rounded-full">
                            <Users className="size-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-[#254151]">{directorMessage.title}</h2>
                            <p className="text-lg text-gray-600 mt-1">{directorMessage.name}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-8 shadow-md">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                            {directorMessage.message}
                        </div>
                        <div className="mt-6 pt-6 border-t-2 border-gray-200">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Phone className="size-5" />
                                    <span className="font-bold" dir="ltr">{directorMessage.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Program Features */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-[#254151] mb-8 text-center">مميزات البرنامج</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programFeatures.map((feature, index) => (
                        <div key={index} className={`bg-white p-8 rounded-lg shadow-lg border-2 border-${feature.color}-200 hover:shadow-xl transition-all`}>
                            <div className={`bg-${feature.color}-600 text-white size-16 rounded-full flex items-center justify-center mb-4`}>
                                <feature.icon className="size-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#254151] mb-3">{isRtl ? feature.titleAr : feature.titleEn}</h3>
                            <p className="text-gray-700 leading-relaxed">{isRtl ? feature.descriptionAr : feature.descriptionEn}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}