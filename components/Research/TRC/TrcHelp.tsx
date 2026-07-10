import { AlertCircle, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function TrchHelp() {

    const data = {
        ar: {
            title: "هل تحتاج إلى مساعدة؟",
            description: "للحصول على المساعدة في التسجيل أو تسجيل الدخول، يرجى التواصل مع مجلس البحث العلمي",
            visitWebsite: "زيارة موقع مجلس البحث العلمي",
            contactUs: "اتصل بنا"
        },
        en: {
            title: "Need Help?",
            description: "For assistance with registration or login, please contact the Scientific Research Council",
            visitWebsite: "Visit Scientific Research Council Website",
            contactUs: "Contact Us"
        }
    }

    const locale = useLocale()
    const locVal = locale === "ar" ? "ar" : "en"
    const current = data[locVal]
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-xl p-10 border-2 border-purple-200 text-center">
                    <AlertCircle className="size-16 text-purple-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-[#254151] mb-4">
                        {current.title}
                    </h3>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        {current.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="https://trc.gov.om/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#254151] text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all text-lg"
                        >
                            <ExternalLink className="size-6" />
                            <span>{current.visitWebsite}</span>
                        </Link>
                        <Link
                            href="/main/contact-directory"
                            className="inline-flex items-center gap-2 bg-white border-2 border-[#254151] text-[#254151] px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all text-lg"
                        >
                            <span>{current.contactUs}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}