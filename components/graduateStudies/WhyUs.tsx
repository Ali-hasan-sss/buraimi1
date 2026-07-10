"use client"
import { Award, BookOpen, Building2, Globe, GraduationCap, Users } from "lucide-react";
import { useLocale } from "next-intl";

export default function WhyProgram() {
    const data = [
        {
            titleAr: "شراكات أكاديمية دولية",
            titleEn: "International Academic Partnerships",
            descriptionAr: "تعاون مع جامعات عالمية مرموقة مثل جامعة عين شمس وجامعة كاليفورنيا",
            descriptionEn: "Collaboration with leading global universities such as Ain Shams University and the University of California.",
            icon: Globe,
            gradient: "from-blue-50 to-blue-100",
            border: "border-blue-200",
            iconBg: "bg-blue-600",
        },
        {
            titleAr: "اعتماد أكاديمي معترف",
            titleEn: "Recognized Academic Accreditation",
            descriptionAr: "جميع البرامج معتمدة ومعترف بها محلياً وإقليمياً ودولياً",
            descriptionEn: "All programs are accredited and recognized locally, regionally, and internationally.",
            icon: Award,
            gradient: "from-green-50 to-green-100",
            border: "border-green-200",
            iconBg: "bg-green-600",
        },
        {
            titleAr: "هيئة تدريس متميزة",
            titleEn: "Distinguished Faculty",
            descriptionAr: "أساتذة وخبراء متخصصون في مختلف المجالات الأكاديمية",
            descriptionEn: "Professors and experts specialized across a wide range of academic fields.",
            icon: Users,
            gradient: "from-purple-50 to-purple-100",
            border: "border-purple-200",
            iconBg: "bg-purple-600",
        },
        {
            titleAr: "مناهج متطورة",
            titleEn: "Modern Curriculum",
            descriptionAr: "برامج دراسية حديثة تواكب أحدث التطورات العلمية والعملية",
            descriptionEn: "Up-to-date study programs that keep pace with the latest scientific and practical advancements.",
            icon: BookOpen,
            gradient: "from-amber-50 to-amber-100",
            border: "border-amber-200",
            iconBg: "bg-amber-600",
        },
        {
            titleAr: "بيئة تعليمية متطورة",
            titleEn: "Advanced Learning Environment",
            descriptionAr: "مرافق حديثة ومكتبة شاملة تدعم البحث العلمي والتعلم",
            descriptionEn: "Modern facilities and a comprehensive library that support research and learning.",
            icon: Building2,
            gradient: "from-red-50 to-red-100",
            border: "border-red-200",
            iconBg: "bg-red-600",
        },
        {
            titleAr: "فرص وظيفية متميزة",
            titleEn: "Outstanding Career Opportunities",
            descriptionAr: "خريجون مؤهلون لشغل مناصب قيادية في مختلف المجالات",
            descriptionEn: "Graduates prepared to take on leadership positions across various sectors.",
            icon: GraduationCap,
            gradient: "from-indigo-50 to-indigo-100",
            border: "border-indigo-200",
            iconBg: "bg-indigo-600",
        },
    ]

    const locale = useLocale()
    const isRtl = locale == "ar" ? true : false
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#254151] mb-4">لماذا الدراسات العليا في كلية البريمي؟</h2>
                    <div className="w-24 h-1 bg-[#c2a772] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((item) => {
                        const Icon = item.icon;

                        const title = isRtl ? item.titleAr : item.titleEn
                        const description = isRtl ? item.descriptionAr : item.descriptionEn
                        return (
                            <div
                                key={item.titleEn}
                                className={`bg-gradient-to-br ${item.gradient} p-8 rounded-lg border-2 ${item.border} hover:shadow-lg transition-all`}
                            >
                                <div className={`${item.iconBg} text-white size-16 rounded-full flex items-center justify-center mb-4`}>
                                    <Icon className="size-8" />
                                </div>
                                <h3 className="text-xl font-bold text-[#254151] mb-3">{title}</h3>
                                <p className="text-gray-700 leading-relaxed">{description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

    )
}