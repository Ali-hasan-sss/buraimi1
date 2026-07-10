"use client"
import { motion } from "framer-motion"
import { Download, FileText, Users } from "lucide-react"
import { Button } from "../ui/button"
import { useLocale } from "next-intl"
import Link from "next/link"

export default function AdmRegister() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            heading: "سجل الآن",
            description: "ابدأ رحلتك الأكاديمية معنا اليوم! املأ نموذج التسجيل وسنتواصل معك قريباً",
            step1Title: "املأ النموذج",
            step1Desc: "أدخل بياناتك الشخصية والأكاديمية",
            step2Title: "المراجعة",
            step2Desc: "سنراجع طلبك ونتواصل معك",
            step3Title: "ابدأ الدراسة",
            step3Desc: "انضم إلينا وحقق أحلامك",
            applyNow: "تقديم طلب القبول",
            downloadForm: "تحميل نموذج التقديم",
            contactUs: "تواصل معنا",
            contactInfo: "معلومات الاتصال:",
            phoneLabel: "الهاتف:",
            emailLabel: "البريد الإلكتروني:",
            locationLabel: "الموقع:",
            hoursLabel: "ساعات العمل:",
            location: "البريمي، سلطنة عمان",
            hours: "الأحد - الخميس: 8:00 ص - 4:00 م",
        },
        en: {
            heading: "Register Now",
            description: "Start your academic journey with us today. Fill out the registration form and we will contact you soon.",
            step1Title: "Fill the form",
            step1Desc: "Enter your personal and academic details",
            step2Title: "Review",
            step2Desc: "We will review your application and contact you",
            step3Title: "Start studying",
            step3Desc: "Join us and achieve your goals",
            applyNow: "Apply Now",
            downloadForm: "Download Application Form",
            contactUs: "Contact Us",
            contactInfo: "Contact information:",
            phoneLabel: "Phone:",
            emailLabel: "Email:",
            locationLabel: "Location:",
            hoursLabel: "Working hours:",
            location: "Al Buraimi, Sultanate of Oman",
            hours: "Sunday - Thursday: 8:00 AM - 4:00 PM",
        },
    }

    const t = isAr ? content.ar : content.en

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                    <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <Users className=" size-6 sm:size-8 text-[#6096b4]" />
                        {t.heading}
                    </h2>

                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl pxl:p-8 md:p-6 p-3 mb-8">
                        <p className="text-sm md:text-md xl:text-xl text-gray-700 leading-relaxed mb-6 text-center">
                            {t.description}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#6096b4]/30">

                                <div className=" w-16 h-16 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-full hidden sm:flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">1</span>
                                </div>
                                <h3 className="text-xl text-[#254151] mb-2">{t.step1Title}</h3>
                                <p className="text-gray-600">{t.step1Desc}</p>
                            </div>

                            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#c2a772]/30">

                                <div className="w-16 h-16 bg-gradient-to-br from-[#6096b4] to-[#c2a772] rounded-full hidden sm:flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">2</span>
                                </div>
                                <h3 className="text-xl text-[#254151] mb-2">{t.step2Title}</h3>
                                <p className="text-gray-600">{t.step2Desc}</p>
                            </div>

                            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#254151]/30">

                                <div className="w-16 h-16 bg-gradient-to-br from-[#c2a772] to-[#254151] rounded-full hidden sm:flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-white">3</span>
                                </div>
                                <h3 className="text-xl text-[#254151] mb-2">{t.step3Title}</h3>
                                <p className="text-gray-600">{t.step3Desc}</p>
                            </div>

                        </div>

                        <div className="text-center space-y-4  ">
                            <Button asChild size="lg" className=" w-full sm:w-fit bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-12 py-6 text-xl rounded-full shadow-xl">
                                <Link href="/main/admission">
                                    <FileText className="size-6 ml-2" />
                                    {t.applyNow}
                                </Link>
                            </Button>

                            <div className="grid sm:flex gap-4 justify-center flex-wrap">
                                <Button size="lg" variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-6 text-lg rounded-full">
                                    <Download className="size-5 ml-2" />
                                    {t.downloadForm}
                                </Button>
                                <Button size="lg" variant="outline" className="border-2 border-[#6096b4] text-[#6096b4] hover:bg-[#6096b4] hover:text-white px-8 py-6 text-lg rounded-full">
                                    <Users className="size-5 ml-2" />
                                    {t.contactUs}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-l from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#254151]/20">
                        <h3 className="text-xl text-[#254151] mb-4">{t.contactInfo}</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                            <p><strong>{t.phoneLabel}</strong> +968 2568 0000</p>
                            <p><strong>{t.emailLabel}</strong> admission@buc.edu.om</p>
                            <p><strong>{t.locationLabel}</strong> {t.location}</p>
                            <p><strong>{t.hoursLabel}</strong> {t.hours}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </>
    )
}