import { Award, BookOpen, Calculator, ClipboardCheck, FileText, GraduationCap, Monitor } from "lucide-react";

export default function FoundAdmission() {
    return (
        <div id="admission" className="mb-16">
            <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-green-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-600 text-white p-4 rounded-full">
                        <ClipboardCheck className="size-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#254151]">تعليمات قبول الطلبة</h2>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-2 border-green-200 mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        تقوم إدارة القبول والتسجيل بتسجيل جميع الطلاب الراغبين في الالتحاق بكلية البريمي الجامعية عن طريق الإعلان من وقت لآخر وقبول الطلاب المبتعثين من قبل وزارة التعليم العالي. القبول متاح للطلاب الذين اجتازوا امتحان شهادة الدبلوم العام (الصف الثاني عشر) من هيئة تعليمية معترف بها ولديهم الشهادة المصدقة ذات الصلة.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 flex items-center gap-3">
                        <div className="bg-blue-600 text-white size-10 rounded-full flex items-center justify-center">1</div>
                        اختبارات تحديد المستوى
                    </h3>
                    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
                        <p className="text-gray-700 text-lg mb-4">
                            سيخضع الملتحقون الجدد لاختبارات تحديد المستوى في اللغة الإنجليزية والرياضيات والحاسب الآلي التي تجريها وحدة البرنامج التأسيسي:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <BookOpen className="size-6 text-blue-600" />
                                    <h4 className="font-bold text-[#254151]">اختبار أكسفورد للغة الإنجليزية</h4>
                                </div>
                                <p className="text-gray-700 text-sm">اختبار عبر الإنترنت لتحديد مستوى اللغة الإنجليزية</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Calculator className="size-6 text-purple-600" />
                                    <h4 className="font-bold text-[#254151]">اختبار الرياضيات الداخلي</h4>
                                </div>
                                <p className="text-gray-700 text-sm">اختبار قائم على الحاسوب لقياس المهارات الرياضية</p>
                            </div>
                            <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Monitor className="size-6 text-amber-600" />
                                    <h4 className="font-bold text-[#254151]">اختبار IC3</h4>
                                </div>
                                <p className="text-gray-700 text-sm">اختبار تكنولوجيا المعلومات والحاسوب</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 flex items-center gap-3">
                        <div className="bg-indigo-600 text-white size-10 rounded-full flex items-center justify-center">2</div>
                        معايير تحديد المستوى في اللغة الإنجليزية
                    </h3>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-indigo-200">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                                <tr>
                                    <th className="p-4 text-right">الدرجة في اختبار أكسفورد</th>
                                    <th className="p-4 text-right">المستوى المحدد</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-indigo-50">
                                    <td className="p-4 font-semibold">ما قبل A1 - A1، A2</td>
                                    <td className="p-4">المستوى الأول</td>
                                </tr>
                                <tr className="border-b hover:bg-indigo-50">
                                    <td className="p-4 font-semibold">B1</td>
                                    <td className="p-4">المستوى الثاني</td>
                                </tr>
                                <tr className="border-b hover:bg-indigo-50 bg-green-50">
                                    <td className="p-4 font-semibold">B2 وما فوق</td>
                                    <td className="p-4 font-bold text-green-700">الانضمام مباشرة إلى الأقسام الأكاديمية</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 flex items-center gap-3">
                        <div className="bg-purple-600 text-white size-10 rounded-full flex items-center justify-center">3</div>
                        معايير تحديد المستوى في الرياضيات وتكنولوجيا المعلومات
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-purple-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Calculator className="size-8 text-purple-600" />
                                <h4 className="text-xl font-bold text-[#254151]">اختبار الرياضيات</h4>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>الطلاب الذين يحصلون على أقل من 50% من الدرجات</strong> في اختبار الرياضيات القائم على الحاسوب سيتعين عليهم دراسة مقررات الرياضيات.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Monitor className="size-8 text-amber-600" />
                                <h4 className="text-xl font-bold text-[#254151]">اختبار IC3</h4>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>الطلاب الذين يرسبون في اختبار تحديد المستوى IC3</strong> سيتعين عليهم دراسة المستوى IC3.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#254151] mb-4 flex items-center gap-3">
                        <div className="bg-red-600 text-white size-10 rounded-full flex items-center justify-center">4</div>
                        الإعفاء من اختبار تحديد المستوى في اللغة الإنجليزية
                    </h3>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-8 border-2 border-red-200">
                        <p className="text-gray-700 text-lg font-bold mb-4">
                            يُعفى الطلاب الذين يندرجون تحت الفئات التالية من اختبار تحديد المستوى في اللغة الإنجليزية:
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-red-500">
                                <div className="flex gap-4">
                                    <div className="bg-red-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#254151] mb-2">الشهادات الدولية المعتمدة</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            الحصول على درجة في اختبار <strong>IELTS لا تقل عن 5</strong> أو درجة في اختبار <strong>TOEFL (اختبار ورقي) لا تقل عن 500 درجة</strong> ودرجة في اختبار <strong>TOEFL (اختبار CBT) لا تقل عن 180 درجة</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-red-500">
                                <div className="flex gap-4">
                                    <div className="bg-red-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#254151] mb-2">شهادة البرنامج التأسيسي من مؤسسة أخرى</h4>
                                        <p className="text-gray-700 leading-relaxed mb-2">
                                            اجتياز شهادة البرنامج التأسيسي من مؤسسة تعليمية أخرى داخل عمان أو خارجها.
                                        </p>
                                        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200 mt-3">
                                            <p className="text-gray-700 text-sm">
                                                <strong>ملاحظة:</strong> يجب على الطلاب تقديم المستندات الأصلية بما في ذلك كشف الدرجات ووصف المقررات المعتمدة من المؤسسة التعليمية التي درس فيها الطالب.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
                    <div className="flex items-start gap-4">
                        <FileText className="size-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-[#254151] mb-2 text-xl">للمزيد من المعلومات</h4>
                            <p className="text-gray-700 leading-relaxed">
                                المعلومات المتعلقة بمعايير القبول لجميع الملتحقين الجدد مذكورة في دليل الطالب. لأي استفسارات إضافية، يرجى التواصل مع إدارة القبول والتسجيل.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}