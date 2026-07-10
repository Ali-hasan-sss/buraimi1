import { ChevronLeft, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";

export default function FoundCTA() {
    return (
        <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">هل أنت مستعد للانضمام إلى البرنامج التأسيسي؟</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    ابدأ رحلتك الأكاديمية معنا واحصل على التأهيل اللازم للنجاح في الجامعة
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/main/admission"
                        className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                    >
                        <GraduationCap className="size-6" />
                        <span>التقديم الآن</span>
                    </Link>
                    <Link
                        href="/main/contact-directory"
                        className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
                    >
                        <Phone className="size-6" />
                        <span>اتصل بنا</span>
                    </Link>
                    <Link
                        href="/main/department"
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg"
                    >
                        <ChevronLeft className="size-6" />
                        <span>العودة للشؤون الأكاديمية</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}