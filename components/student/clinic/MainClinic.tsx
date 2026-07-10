"use client"

import { useMemo } from "react"
import { useLocale } from "next-intl"
import {
    Activity,
    CheckCircle,
    Heart,
    MapPin,
    Phone,
    Pill,
    Shield,
    Stethoscope,
    Users,
    type LucideIcon,
} from "lucide-react"

export default function ClinicMain() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const t = useMemo(() => {
        const ar = {
            title: "عيادة الكلية",
            subtitle: "College Clinic and Health Services",
            intro:
                "يعد توفير الرعاية الصحية والعلاج الطبي جزءاً من الأولويات الأساسية للكلية. لذلك تم إنشاء عيادة الكلية لضمان توفير بيئة صحية للطلاب في حرم الكلية وفي النزل ولطلاب الكلية وأعضاء هيئة التدريس. وتتوفر الأدوية مجاناً للطلاب والموظفين.",
            card1Title: "رعاية صحية متكاملة",
            card1Desc: "خدمات طبية شاملة لجميع أفراد المجتمع الجامعي",
            card2Title: "أدوية مجانية",
            card2Desc: "توفير الأدوية مجاناً للطلاب والموظفين",
            card3Title: "بيئة صحية آمنة",
            card3Desc: "ضمان توفير بيئة صحية في الحرم الجامعي والنزل",
            clinicAlt: "عيادة الكلية",
            servicesAlt: "الخدمات الصحية",
            healthTipsTitle: "نصائح وفعاليات صحية",
            staffTitle: "الإجراءات الوقائية اللازمة التي يجب أن يتبعها جميع العاملين بالكلية",
            studentsTitle: "الإجراءات الوقائية اللازمة التي يجب على جميع الطلاب والزوار اتباعها",
            contactTitle: "عيادة الكلية - للتواصل",
            phoneLabel: "رقم الهاتف",
            locationLabel: "المكان",
            locationValue: "Hostels Building",
            emergencyNote: "في حالة الطوارئ، يرجى الاتصال على الأرقام المذكورة أعلاه فوراً",
        }

        const en = {
            title: "College Clinic",
            subtitle: "College Clinic and Health Services",
            intro:
                "Providing healthcare and medical treatment is one of the college’s key priorities. The college clinic was established to ensure a healthy environment for students on campus and in the dorms, as well as for faculty and staff. Medications are provided free of charge for students and employees.",
            card1Title: "Comprehensive Care",
            card1Desc: "Integrated medical services for the university community",
            card2Title: "Free Medication",
            card2Desc: "Medications are provided free for students and employees",
            card3Title: "Safe Health Environment",
            card3Desc: "Ensuring a healthy environment across campus and dorms",
            clinicAlt: "College clinic",
            servicesAlt: "Health services",
            healthTipsTitle: "Health Tips & Activities",
            staffTitle: "Required preventive measures for all college staff",
            studentsTitle: "Required preventive measures for all students and visitors",
            contactTitle: "College Clinic - Contact",
            phoneLabel: "Phone",
            locationLabel: "Location",
            locationValue: "Hostels Building",
            emergencyNote: "In case of emergency, please call the numbers above immediately",
        }

        return isAr ? ar : en
    }, [isAr])

    const staffPrecautions = useMemo((): Array<{ icon: LucideIcon; text: string }> => {
        const ar = [
            { icon: Shield, text: "الالتزام بتعليمات مكافحة العدوى ولبس معدات الوقاية عند الحاجة" },
            { icon: Heart, text: "المحافظة على النظافة الشخصية وغسل اليدين بشكل منتظم" },
            { icon: Pill, text: "عدم صرف أي دواء إلا حسب الإرشادات الطبية" },
            { icon: Stethoscope, text: "الإبلاغ الفوري عن أي حالة طارئة أو أعراض معدية" },
        ]

        const en = [
            { icon: Shield, text: "Follow infection-control instructions and use PPE when needed" },
            { icon: Heart, text: "Maintain personal hygiene and wash hands regularly" },
            { icon: Pill, text: "Do not dispense medication except according to medical guidance" },
            { icon: Stethoscope, text: "Report any emergencies or contagious symptoms immediately" },
        ]

        return isAr ? ar : en
    }, [isAr])

    const studentPrecautions = useMemo((): Array<{ icon: LucideIcon; text: string }> => {
        const ar = [
            { icon: CheckCircle, text: "اتباع تعليمات العيادة والالتزام بالمواعيد" },
            { icon: Heart, text: "تجنب مشاركة الأدوات الشخصية والحفاظ على النظافة" },
            { icon: Shield, text: "الإبلاغ عن أي أعراض أو حالات مرضية فوراً" },
            { icon: Activity, text: "التعاون في تطبيق الإجراءات الوقائية داخل الحرم الجامعي" },
            { icon: CheckCircle, text: "عدم الحضور للعيادة عند وجود أعراض معدية دون إبلاغ مسبق" },
        ]

        const en = [
            { icon: CheckCircle, text: "Follow clinic instructions and adhere to appointments" },
            { icon: Heart, text: "Avoid sharing personal items and maintain cleanliness" },
            { icon: Shield, text: "Report any symptoms or illness immediately" },
            { icon: Activity, text: "Cooperate in applying preventive measures on campus" },
            { icon: CheckCircle, text: "Do not visit the clinic with contagious symptoms without prior notice" },
        ]

        return isAr ? ar : en
    }, [isAr])

    return (
        <main className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#6096b4]">
                    <div className="w-12 h-12 bg-[#6096b4] rounded-lg flex items-center justify-center">
                        <Stethoscope className="size-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl text-[#254151]">{t.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
                    </div>
                </div>

                {/* نبذة عن عيادة الكلية */}
                <section className="mb-10">
                    <div className="bg-gradient-to-l from-[#6096b4]/10 to-[#c2a772]/10 rounded-lg p-8 mb-6">
                        <div className="flex items-start gap-6">
                            <div className="hidden md:block">
                                <div className="w-20 h-20 bg-[#6096b4] rounded-full flex items-center justify-center">
                                    <Heart className="size-10 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-700 text-lg leading-loose">
                                    {t.intro}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white border-2 border-[#6096b4] rounded-lg p-6 text-center hover:shadow-lg transition-all">
                            <Stethoscope className="size-12 text-[#6096b4] mx-auto mb-3" />
                            <h4 className="text-lg text-[#254151] font-semibold mb-2">{t.card1Title}</h4>
                            <p className="text-gray-600 text-sm">{t.card1Desc}</p>
                        </div>

                        <div className="bg-white border-2 border-[#c2a772] rounded-lg p-6 text-center hover:shadow-lg transition-all">
                            <Pill className="size-12 text-[#c2a772] mx-auto mb-3" />
                            <h4 className="text-lg text-[#254151] font-semibold mb-2">{t.card2Title}</h4>
                            <p className="text-gray-600 text-sm">{t.card2Desc}</p>
                        </div>

                        <div className="bg-white border-2 border-[#6096b4] rounded-lg p-6 text-center hover:shadow-lg transition-all">
                            <Activity className="size-12 text-[#6096b4] mx-auto mb-3" />
                            <h4 className="text-lg text-[#254151] font-semibold mb-2">{t.card3Title}</h4>
                            <p className="text-gray-600 text-sm">{t.card3Desc}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <img
                            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljfGVufDF8fHx8MTc3MzEyODQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt={t.clinicAlt}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwc2VydmljZXN8ZW58MXx8fHwxNzczMTI4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt={t.servicesAlt}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </section>

                {/* نصائح وفعاليات صحية */}
                <section className="mb-10">
                    <h3 className="text-2xl text-[#254151] mb-6 flex items-center gap-2">
                        <Activity className="size-6 text-[#c2a772]" />
                        {t.healthTipsTitle}
                    </h3>

                    {/* الإجراءات الوقائية للموظفين */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-t-lg p-4">
                            <h4 className="text-xl text-white font-semibold flex items-center gap-2">
                                <Shield className="size-6" />
                                {t.staffTitle}
                            </h4>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-b-lg p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {staffPrecautions.map((precaution, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 bg-[#6096b4]/5 rounded-lg p-4 hover:bg-[#6096b4]/10 transition-all"
                                    >
                                        <div className="w-8 h-8 bg-[#6096b4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                            <precaution.icon className="size-4 text-white" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed text-sm flex-1">{precaution.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* الإجراءات الوقائية للطلاب والزوار */}
                    <div>
                        <div className="bg-gradient-to-r from-[#c2a772] to-[#6096b4] rounded-t-lg p-4">
                            <h4 className="text-xl text-white font-semibold flex items-center gap-2">
                                <Users className="size-6" />
                                {t.studentsTitle}
                            </h4>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-b-lg p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {studentPrecautions.map((precaution, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 rounded-lg p-4 transition-all ${index === studentPrecautions.length - 1
                                            ? 'bg-red-50 border border-red-200 md:col-span-2'
                                            : 'bg-[#c2a772]/5 hover:bg-[#c2a772]/10'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${index === studentPrecautions.length - 1 ? 'bg-red-500' : 'bg-[#c2a772]'
                                            }`}>
                                            <precaution.icon className="size-4 text-white" />
                                        </div>
                                        <p className={`leading-relaxed text-sm flex-1 ${index === studentPrecautions.length - 1 ? 'text-red-800 font-semibold' : 'text-gray-700'
                                            }`}>
                                            {precaution.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* للتواصل */}
                <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] rounded-lg p-8 text-white">
                    <h3 className="text-2xl mb-6 text-center font-semibold flex items-center justify-center gap-2">
                        <Stethoscope className="size-6" />
                        {t.contactTitle}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <Phone className="size-6 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90 mb-1">{t.phoneLabel}</p>
                                <p className="font-semibold" dir="ltr">25657666-(778) / 25657666/613</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin className="size-6 flex-shrink-0" />
                            <div>
                                <p className="text-sm opacity-90 mb-1">{t.locationLabel}</p>
                                <p className="font-semibold">{t.locationValue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/20 text-center">
                        <p className="text-sm opacity-90">
                            <CheckCircle className="inline size-5 ml-2" />
                            {t.emergencyNote}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}