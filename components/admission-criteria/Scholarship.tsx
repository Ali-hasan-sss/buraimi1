"use client"
import { motion } from "framer-motion"
import { Award, CheckCircle } from "lucide-react"
import { useLocale } from "next-intl"
export default function AdmScholarship() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            heading: "اجراءات طلبة البعثات",
            section1Title: "أولاً: تغيير المؤسسة التعليمية",
            section1Subtitle: "أ: توافق لجنة الابتعاث على طلبات تغيير المؤسسة التعليمية في الحالات التالية:",
            section1List: [
                "نقل الطالب من جامعة إلى أخرى بمبررات معتمدة من قبل لجنة الابتعاث",
                "تغيير المؤسسة التعليمية للطالب للدراسة في البرنامج التحضيري أو برنامج اللغة الإنجليزية بشرط أن يكون مستوفياً للقبول غير المشروط للمؤسسة التي يرغب في التحويل إليها في نفس مجال المعرفة (نفس القسم الأكاديمي)",
                "تغيير المؤسسة التعليمية للطالب بعد الانتهاء من البرنامج التحضيري أو متطلبات اللغة بشرط أن يكون الطالب مستوفياً للقبول غير المشروط في البرنامج الأكاديمي من المؤسسة التعليمية الراغبة في التحويل في نفس مجال المعرفة",
            ],
            section1Rules: [
                { label: "ب", text: "ألا يترتب على التغيير إعادة سنة دراسية واحدة" },
                { label: "ج", text: "ألا يترتب على الطالب أي التزامات مالية تجاه المؤسسة التعليمية الملتحق بها" },
                { label: "د", text: "يتحمل الطالب كافة التكاليف المالية الشخصية المرتبطة بالسكن والإيجار والفواتير الناتجة عن قرار التحويل من المؤسسة التعليمية" },
            ],
            section2Title: "ثانياً: تغيير التخصص",
            section2Subtitle: "أ: توافق لجنة الابتعاث على طلبات تغيير تخصص الطالب في الحالات التالية:",
            section2List: [
                "يحصل الطالب الجديد على قبول مباشر في التخصص الذي يرغب في الالتحاق به بشرط أن يكون في نفس مجال المعرفة مثل التخصص المقبول",
                "عدم قدرة الطالب على الالتحاق بالتخصص الموفد إليه لأسباب أكاديمية أو لعدم وجود مقاعد كافية في التخصص بعد الحصول على توصية من المشرف الأكاديمي في المؤسسة التعليمية تفيد بإمكانية الالتحاق بالبرنامج لتحسينه الحالة الأكاديمية وبموافقة لجنة الابتعاث",
                "يحصل الطالب الذي أكمل البرنامج التأسيسي على قبول غير مشروط في التخصص الذي يرغب في الالتحاق به بشرط أن يكون في نفس مجال المعرفة",
            ],
            section2Rules: [
                { label: "ب", text: "أن لا يؤثر تغيير التخصص على التاريخ المتوقع لتخرج الطالب بما لا يزيد عن المدة المحددة للتمديد" },
                { label: "ت", text: "ألا يترتب على التغيير إعادة سنة دراسية واحدة" },
            ],
            section3Title: "ثالثاً: التأجيل",
            section3List: [
                "التأجيل عن المدة المحددة (فصلين دراسيين منفصلين أو متصلين)",
                "بدء الدراسة بعد التأجيل",
            ],
            section4Title: "رابعاً: مدة الدراسة",
            section4List: [
                "عام واحد فقط (فصلين دراسيين) للبرنامج التأسيسي، وإلا فسيكون على حساب الطالب",
                "طلاب المرحلة الجامعية لديهم 8 فصول دراسية في التخصص",
                "طلاب الدبلوم لديهم 4 فصول دراسية للتخصص",
            ],
            noteLabel: "ملاحظة:",
            noteText: "الفصل الصيفي لا يحسب ضمن مدة المنحة الدراسية",
        },
        en: {
            heading: "Scholarship Students Procedures",
            section1Title: "First: Changing the educational institution",
            section1Subtitle: "A: The scholarship committee approves changing the educational institution in the following cases:",
            section1List: [
                "Transfer from one university to another with committee-approved justifications",
                "Change the institution to study the foundation program or English program, provided the student meets the unconditional admission requirements of the new institution in the same field",
                "Change the institution after completing foundation/language requirements, provided the student meets unconditional admission in the academic program at the new institution in the same field",
            ],
            section1Rules: [
                { label: "B", text: "The change must not result in repeating an academic year" },
                { label: "C", text: "The student must not have financial obligations to the current institution" },
                { label: "D", text: "The student bears personal costs related to housing, rent, and bills resulting from the transfer decision" },
            ],
            section2Title: "Second: Changing the major",
            section2Subtitle: "A: The scholarship committee approves changing the major in the following cases:",
            section2List: [
                "The student obtains direct admission into the new major, provided it is within the same field of knowledge",
                "The student cannot join the sponsored major for academic reasons or lack of seats, with an academic supervisor recommendation and committee approval",
                "After completing the foundation program, the student obtains unconditional admission into the desired major, provided it is within the same field",
            ],
            section2Rules: [
                { label: "B", text: "The change must not affect the expected graduation date beyond the allowed extension period" },
                { label: "T", text: "The change must not result in repeating an academic year" },
            ],
            section3Title: "Third: Deferral",
            section3List: [
                "Deferral for the specified period (two semesters, consecutive or separate)",
                "Starting studies after deferral",
            ],
            section4Title: "Fourth: Study duration",
            section4List: [
                "Only one year (two semesters) is covered for the foundation program; otherwise it is at the student’s expense",
                "Undergraduate students have 8 semesters for the major",
                "Diploma students have 4 semesters for the major",
            ],
            noteLabel: "Note:",
            noteText: "The summer term is not counted within the scholarship duration",
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
                    <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-8 flex items-center gap-3">
                        <Award className="size-6 sm:size-8 text-[#6096b4]" />
                        {t.heading}
                    </h2>

                    <div className="space-y-8">
                        {/* Section 1 */}
                        <div className="border-2 border-[#6096b4]/30 rounded-xl   p-4 md:p-6 bg-gradient-to-br from-blue-50 to-gray-50">
                            <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-4 flex items-center gap-2">
                                <CheckCircle className="hidden sm:flex size-7 text-[#6096b4]" />
                                {t.section1Title}
                            </h3>

                            <div className="mb-6">
                                <h4 className="text-md md:text-xl text-[#254151] mb-3">{t.section1Subtitle}</h4>
                                <div className="space-y-2">
                                    {t.section1List.map((item, index) => (
                                        <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                            <div className="w-6 h-6 rounded-full bg-[#6096b4] text-white hidden sm:flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {t.section1Rules.map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg p-4 border-r-4 border-[#6096b4]">
                                        <p className="text-gray-700"><strong className="text-[#254151]">{item.label}:</strong> {item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="border-2 border-[#c2a772]/30 rounded-xl p-3 sm:p-6 bg-gradient-to-br from-amber-50 to-gray-50">
                            <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-4 flex items-center gap-2">
                                <CheckCircle className="size-5 sm:size-7 text-[#c2a772]" />
                                {t.section2Title}
                            </h3>

                            <div className="mb-6">
                                <h4 className="text-md md:text-lg xl:text-xl text-[#254151] mb-3">{t.section2Subtitle}</h4>
                                <div className="space-y-2">
                                    {t.section2List.map((item, index) => (
                                        <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-3">
                                            <div className="w-6 h-6 rounded-full bg-[#c2a772] text-white hidden sm:flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {t.section2Rules.map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg p-4 border-r-4 border-[#c2a772]">
                                        <p className="text-gray-700"><strong className="text-[#254151]">{item.label}:</strong> {item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="border-2 border-[#254151]/30 rounded-xl p-3 sm:p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                            <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-4 flex items-center gap-2">
                                <CheckCircle className="size-5 sm:size-7 text-[#254151]" />
                                {t.section3Title}
                            </h3>
                            <div className="space-y-2">
                                {t.section3List.map((item, index) => (
                                    <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-4">
                                        <div className="w-6 h-6 rounded-full bg-[#254151] text-white hidden sm:flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="border-2 border-[#6096b4]/30 rounded-xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-white">
                            <h3 className="text-lg md:text-xl xl:text-2xl text-[#254151] mb-4 flex items-center gap-2">
                                <CheckCircle className="size-5 sm:size-7 text-[#6096b4]" />
                                {t.section4Title}
                            </h3>
                            <div className="space-y-2">
                                {t.section4List.map((item, index) => (
                                    <div key={index} className="flex items-start gap-2 bg-white rounded-lg p-4">
                                        <div className="w-6 h-6 rounded-full bg-[#6096b4] text-white hidden sm:flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 bg-amber-100 border-r-4 border-amber-500 p-4 rounded-lg">
                                <p className="text-gray-800"><strong>{t.noteLabel}</strong> {t.noteText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}