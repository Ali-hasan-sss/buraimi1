"use client"
import { motion } from "framer-motion"
import { Download, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Register() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                    <Users className="size-8 text-[#6096b4]" />
                    سجل الآن
                </h2>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed mb-6 text-center">
                        ابدأ رحلتك الأكاديمية معنا اليوم! املأ نموذج التسجيل وسنتواصل معك قريباً
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#6096b4]/30">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">1</span>
                            </div>
                            <h3 className="text-xl text-[#254151] mb-2">املأ النموذج</h3>
                            <p className="text-gray-600">أدخل بياناتك الشخصية والأكاديمية</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#c2a772]/30">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#6096b4] to-[#c2a772] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">2</span>
                            </div>
                            <h3 className="text-xl text-[#254151] mb-2">المراجعة</h3>
                            <p className="text-gray-600">سنراجع طلبك ونتواصل معك</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#254151]/30">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#c2a772] to-[#254151] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">3</span>
                            </div>
                            <h3 className="text-xl text-[#254151] mb-2">ابدأ الدراسة</h3>
                            <p className="text-gray-600">انضم إلينا وحقق أحلامك</p>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <Button size="lg" className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-12 py-6 text-xl rounded-full shadow-xl">
                            <FileText className="size-6 ml-2" />
                            تقديم طلب القبول
                        </Button>

                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button size="lg" variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-6 text-lg rounded-full">
                                <Download className="size-5 ml-2" />
                                تحميل نموذج التقديم
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-[#6096b4] text-[#6096b4] hover:bg-[#6096b4] hover:text-white px-8 py-6 text-lg rounded-full">
                                <Users className="size-5 ml-2" />
                                تواصل معنا
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-l from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#254151]/20">
                    <h3 className="text-xl text-[#254151] mb-4">معلومات الاتصال:</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                        <p><strong>الهاتف:</strong> +968 2568 0000</p>
                        <p><strong>البريد الإلكتروني:</strong> admission@buc.edu.om</p>
                        <p><strong>الموقع:</strong> البريمي، سلطنة عمان</p>
                        <p><strong>ساعات العمل:</strong> الأحد - الخميس: 8:00 ص - 4:00 م</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
