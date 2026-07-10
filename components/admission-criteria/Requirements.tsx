"use client"
import { motion } from "framer-motion"
import { Award, CheckCircle, GraduationCap } from "lucide-react"
import { useLocale } from "next-intl"

export default function AdmRequirements() {
    const locale = useLocale()
    const isAr = locale === "ar"

    const content = {
        ar: {
            undergradTitle: "متطلبات القبول في برامج المرحلة الجامعية الأولى",
            undergradDesc: "للقبول في الكلية يشترط على الطالب أن يكون حاصلاً بنجاح على شهادة الثانوية العامة أو ما يعادلها سواء داخل السلطنة أو خارجها بشرط أن يقوم الطالب الحاصل على شهادة الثانوية العامة من خارج السلطنة بمعادلة الشهادة لدى الجهة المعنية (وزارة التربية والتعليم في السلطنة).",
            docsTitle: "المستندات المطلوبة:",
            docs: [
                "كشف معتمد عن علامات دبلوم التعليم العام الأصلي ومعادلة الشهادة من وزارة التربية والتعليم بالسلطنة للطلبة الحاصلين عليها من خارج السلطنة",
                "نسخة من صورة البطاقة الشخصية وجواز السفر وشهادة الميلاد و3 صور شخصية",
                "شهادة حسن سيرة وسلوك",
                "استمارة القبول معبأة بالبيانات يستلمها الطالب من دائرة القبول والتسجيل بالكلية أو خلال موقع الكلية",
                "شهادة طبية بالخلو من الأمراض المعدية",
                "رسوم القبول (100) ريال (غير مستردة) يمكن دفعها الكترونياً",
            ],
            masterTitle: "متطلبات القبول في برنامج الماجستير",
            masterReqs: [
                "أن يكون الطالب حاصلاً على درجة البكالوريوس في القانون أو ما يعادلها من مؤسسة أكاديمية معترف بها من قبل وزارة التعليم العالي بالسلطنة",
                "أن لا يقل المعدل التراكمي للطالب في درجة البكالوريوس عن (2.5) أو ما يعادله في أنظمة العلامات",
                "يجوز قبول الطالب بتقدير مقبول لدرجة البكالوريوس بشرط أن يكون لديه خبرة عملية في مجال التخصص لمدة لا تقل عن سنتين",
            ],
            phdTitle: "متطلبات القبول في برنامج دكتوراه الفلسفة في القانون",
            phdReqs: [
                "يجب أن يكون الطالب حاصلاً على درجة الماجستير في القانون أو ما يعادلها من مؤسسة تعليم عالي معترف بها بمعدل تراكمي لا يقل عن (3 نقاط) من (4 نقاط)",
                "يجب على المتقدم إثبات كفاءته في مجال البحث العلمي (إرفاق رسالة الماجستير)",
                "يجب على المتقدم اجتياز المقابلة الشخصية بنجاح",
                "إذا تجاوز عدد الطلاب المستوفين لشروط القبول العدد المسموح به، فستعطى الأولوية للطلاب الحاصلين على أعلى معدل تراكمي يليهم الطلاب الذين لديهم أكبر عدد من سنوات الخبرة",
            ],
        },
        en: {
            undergradTitle: "Undergraduate Admission Requirements",
            undergradDesc: "To be admitted, the applicant must have successfully obtained the General Education Diploma (or equivalent) inside or outside Oman. Applicants with certificates from outside Oman must equate their certificate through the relevant authority (Ministry of Education).",
            docsTitle: "Required documents:",
            docs: [
                "Official transcript of General Education Diploma grades, and certificate equivalency for applicants from outside Oman",
                "Copy of national ID, passport, birth certificate, and 3 personal photos",
                "Good conduct certificate",
                "Completed admission form (available at Admissions & Registration or via the university website)",
                "Medical certificate proving the applicant is free from infectious diseases",
                "Admission fee (100 OMR) (non-refundable) — can be paid online",
            ],
            masterTitle: "Master’s Program Admission Requirements",
            masterReqs: [
                "The applicant must hold a Bachelor’s degree in Law (or equivalent) from an academic institution recognized by the Ministry of Higher Education",
                "A cumulative GPA of at least 2.5 (or equivalent) is required",
                "Applicants with a ‘Pass’ grade may be accepted if they have at least two years of relevant work experience",
            ],
            phdTitle: "PhD in Law Admission Requirements",
            phdReqs: [
                "The applicant must hold a Master’s degree in Law (or equivalent) from a recognized higher education institution with a GPA of at least 3 out of 4",
                "The applicant must demonstrate research competency (attach the Master’s thesis)",
                "The applicant must pass the personal interview",
                "If eligible applicants exceed the allowed number, priority is given to higher GPAs, then to those with more years of experience",
            ],
        },
    }

    const t = isAr ? content.ar : content.en

    return (
        <>
            {(
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-8">
                        {/* Undergraduate Requirements */}
                        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <CheckCircle className="size-8 text-[#6096b4]" />
                                {t.undergradTitle}
                            </h2>

                            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-4 md:p-6 mb-6">
                                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                    {t.undergradDesc}
                                </p>
                            </div>

                            <h3 className="text-2xl text-[#254151] mb-4">{t.docsTitle}</h3>
                            <div className="space-y-3">
                                {t.docs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                        <CheckCircle className="hidden sm:flex size-6 text-[#6096b4] flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Master Requirements */}
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <GraduationCap className="size-8 text-[#c2a772]" />
                                {t.masterTitle}
                            </h2>
                            <div className="space-y-3">
                                {t.masterReqs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-gradient-to-l from-blue-50 to-gray-50 rounded-lg p-4 border border-[#6096b4]/20">
                                        <CheckCircle className=" hidden sm:flex size-6 text-[#c2a772] flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PhD Requirements */}
                        <div className="bg-white rounded-2xl shadow-xl xl:p-8 md:p-6 p-3">
                            <h2 className="text-lg md:text-xl xl:text-3xl text-[#254151] mb-6 flex items-center gap-3">
                                <Award className="size-8 text-[#254151]" />
                                {t.phdTitle}
                            </h2>
                            <div className="space-y-3">
                                {t.phdReqs.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-[#254151]/20">
                                        <CheckCircle className="hidden sm:flex size-6 text-[#254151] flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}

        </>
    )
}