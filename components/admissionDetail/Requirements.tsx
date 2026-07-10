"use client"
import { motion } from "framer-motion"
import { Award, CheckCircle, GraduationCap } from 'lucide-react';
export default function Requirements() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-8">
                {/* Undergraduate Requirements */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <CheckCircle className="size-8 text-[#6096b4]" />
                        متطلبات القبول في برامج المرحلة الجامعية الأولى
                    </h2>

                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 mb-6">
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            للقبول في الكلية يشترط على الطالب أن يكون حاصلاً بنجاح على شهادة الثانوية العامة أو ما يعادلها سواء داخل السلطنة أو خارجها بشرط أن يقوم الطالب الحاصل على شهادة الثانوية العامة من خارج السلطنة بمعادلة الشهادة لدى الجهة المعنية (وزارة التربية والتعليم في السلطنة).
                        </p>
                    </div>

                    <h3 className="text-2xl text-[#254151] mb-4">المستندات المطلوبة:</h3>
                    <div className="space-y-3">
                        {[
                            'كشف معتمد عن علامات دبلوم التعليم العام الأصلي ومعادلة الشهادة من وزارة التربية والتعليم بالسلطنة للطلبة الحاصلين عليها من خارج السلطنة',
                            'نسخة من صورة البطاقة الشخصية وجواز السفر وشهادة الميلاد و3 صور شخصية',
                            'شهادة حسن سيرة وسلوك',
                            'استمارة القبول معبأة بالبيانات يستلمها الطالب من دائرة القبول والتسجيل بالكلية أو خلال موقع الكلية',
                            'شهادة طبية بالخلو من الأمراض المعدية',
                            'رسوم القبول (100) ريال (غير مستردة) يمكن دفعها الكترونياً'
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <CheckCircle className="size-6 text-[#6096b4] flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Master Requirements */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <GraduationCap className="size-8 text-[#c2a772]" />
                        متطلبات القبول في برنامج الماجستير
                    </h2>
                    <div className="space-y-3">
                        {[
                            'أن يكون الطالب حاصلاً على درجة البكالوريوس في القانون أو ما يعادلها من مؤسسة أكاديمية معترف بها من قبل وزارة التعليم العالي بالسلطنة',
                            'أن لا يقل المعدل التراكمي للطالب في درجة البكالوريوس عن (2.5) أو ما يعادله في أنظمة العلامات',
                            'يجوز قبول الطالب بتقدير مقبول لدرجة البكالوريوس بشرط أن يكون لديه خبرة عملية في مجال التخصص لمدة لا تقل عن سنتين'
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 bg-gradient-to-l from-blue-50 to-gray-50 rounded-lg p-4 border border-[#6096b4]/20">
                                <CheckCircle className="size-6 text-[#c2a772] flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PhD Requirements */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3">
                        <Award className="size-8 text-[#254151]" />
                        متطلبات القبول في برنامج دكتوراه الفلسفة في القانون
                    </h2>
                    <div className="space-y-3">
                        {[
                            'يجب أن يكون الطالب حاصلاً على درجة الماجستير في القانون أو ما يعادلها من مؤسسة تعليم عالي معترف بها بمعدل تراكمي لا يقل عن (3 نقاط) من (4 نقاط)',
                            'يجب على المتقدم إثبات كفاءته في مجال البحث العلمي (إرفاق رسالة الماجستير)',
                            'يجب على المتقدم اجتياز المقابلة الشخصية بنجاح',
                            'إذا تجاوز عدد الطلاب المستوفين لشروط القبول العدد المسموح به، فستعطى الأولوية للطلاب الحاصلين على أعلى معدل تراكمي يليهم الطلاب الذين لديهم أكبر عدد من سنوات الخبرة'
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-[#254151]/20">
                                <CheckCircle className="size-6 text-[#254151] flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}