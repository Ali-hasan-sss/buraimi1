"use client"
import { motion } from "framer-motion"
import { Award, CheckCircle } from "lucide-react"

export default function ScholarshipProcedures() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl text-[#254151] mb-8 flex items-center gap-3">
                    <Award className="size-8 text-[#6096b4]" />
                    اجراءات طلبة البعثات
                </h2>

                <div className="space-y-8">
                    <div className="border-2 border-[#6096b4]/30 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-gray-50">
                        <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                            <CheckCircle className="size-7 text-[#6096b4]" />
                            أولاً: تغيير المؤسسة التعليمية
                        </h3>

                        <div className="mb-6">
                            <h4 className="text-xl text-[#254151] mb-3">أ: توافق لجنة الابتعاث على طلبات تغيير المؤسسة التعليمية في الحالات التالية:</h4>
                            <div className="space-y-2">
                                {[
                                    'نقل الطالب من جامعة إلى أخرى بمبررات معتمدة من قبل لجنة الابتعاث',
                                    'تغيير المؤسسة التعليمية للطالب للدراسة في البرنامج التحضيري أو برنامج اللغة الإنجليزية بشرط أن يكون مستوفياً للقبول غير المشروط للمؤسسة التي يرغب في التحويل إليها في نفس مجال المعرفة (نفس القسم الأكاديمي)',
                                    'تغيير المؤسسة التعليمية للطالب بعد الانتهاء من البرنامج التحضيري أو متطلبات اللغة بشرط أن يكون الطالب مستوفياً للقبول غير المشروط في البرنامج الأكاديمي من المؤسسة التعليمية الراغبة في التحويل في نفس مجال المعرفة'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                        <div className="w-6 h-6 rounded-full bg-[#6096b4] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: 'ب', text: 'ألا يترتب على التغيير إعادة سنة دراسية واحدة' },
                                { label: 'ج', text: 'ألا يترتب على الطالب أي التزامات مالية تجاه المؤسسة التعليمية الملتحق بها' },
                                { label: 'د', text: 'يتحمل الطالب كافة التكاليف المالية الشخصية المرتبطة بالسكن والإيجار والفواتير الناتجة عن قرار التحويل من المؤسسة التعليمية' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 border-r-4 border-[#6096b4]">
                                    <p className="text-gray-700"><strong className="text-[#254151]">{item.label}:</strong> {item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-2 border-[#c2a772]/30 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-gray-50">
                        <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                            <CheckCircle className="size-7 text-[#c2a772]" />
                            ثانياً: تغيير التخصص
                        </h3>

                        <div className="mb-6">
                            <h4 className="text-xl text-[#254151] mb-3">أ: توافق لجنة الابتعاث على طلبات تغيير تخصص الطالب في الحالات التالية:</h4>
                            <div className="space-y-2">
                                {[
                                    'يحصل الطالب الجديد على قبول مباشر في التخصص الذي يرغب في الالتحاق به بشرط أن يكون في نفس مجال المعرفة مثل التخصص المقبول',
                                    'عدم قدرة الطالب على الالتحاق بالتخصص الموفد إليه لأسباب أكاديمية أو لعدم وجود مقاعد كافية في التخصص بعد الحصول على توصية من المشرف الأكاديمي في المؤسسة التعليمية تفيد بإمكانية الالتحاق بالبرنامج لتحسينه الحالة الأكاديمية وبموافقة لجنة الابتعاث',
                                    'يحصل الطالب الذي أكمل البرنامج التأسيسي على قبول غير مشروط في التخصص الذي يرغب في الالتحاق به بشرط أن يكون في نفس مجال المعرفة'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                        <div className="w-6 h-6 rounded-full bg-[#c2a772] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { label: 'ب', text: 'أن لا يؤثر تغيير التخصص على التاريخ المتوقع لتخرج الطالب بما لا يزيد عن المدة المحددة للتمديد' },
                                { label: 'ت', text: 'ألا يترتب على التغيير إعادة سنة دراسية واحدة' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 border-r-4 border-[#c2a772]">
                                    <p className="text-gray-700"><strong className="text-[#254151]">{item.label}:</strong> {item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-2 border-[#254151]/30 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                        <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                            <CheckCircle className="size-7 text-[#254151]" />
                            ثالثاً: التأجيل
                        </h3>
                        <div className="space-y-2">
                            {[
                                'التأجيل عن المدة المحددة (فصلين دراسيين منفصلين أو متصلين)',
                                'بدء الدراسة بعد التأجيل'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-4">
                                    <div className="w-6 h-6 rounded-full bg-[#254151] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-2 border-[#6096b4]/30 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white">
                        <h3 className="text-2xl text-[#254151] mb-4 flex items-center gap-2">
                            <CheckCircle className="size-7 text-[#6096b4]" />
                            رابعاً: مدة الدراسة
                        </h3>
                        <div className="space-y-2">
                            {[
                                'عام واحد فقط (فصلين دراسيين) للبرنامج التأسيسي، وإلا فسيكون على حساب الطالب',
                                'طلاب المرحلة الجامعية لديهم 8 فصول دراسية في التخصص',
                                'طلاب الدبلوم لديهم 4 فصول دراسية للتخصص'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-4">
                                    <div className="w-6 h-6 rounded-full bg-[#6096b4] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 bg-amber-100 border-r-4 border-amber-500 p-4 rounded-lg">
                            <p className="text-gray-800"><strong>ملاحظة:</strong> الفصل الصيفي لا يحسب ضمن مدة المنحة الدراسية</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
