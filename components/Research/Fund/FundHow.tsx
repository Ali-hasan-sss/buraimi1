"use client"
import { Target } from "lucide-react";
import { useLocale } from "next-intl";

export default function FundHow() {

    const data = {
        ar: {
            title: "كيفية التقديم للحصول على المنح",
            steps: [
                {
                    title: "التواصل مع الوحدة",
                    description: "التواصل مع وحدة البحث العلمي والابتكار للحصول على معلومات عن المنح المتاحة"
                },
                {
                    title: "تقديم الطلب",
                    description: "تعبئة نموذج الطلب مع المستندات المطلوبة والخطة البحثية"
                },
                {
                    title: "التقييم",
                    description: "تقوم اللجنة بتقييم الطلبات وفق معايير محددة للأهلية والجودة"
                },
                {
                    title: "الموافقة والدعم",
                    description: "يتم إبلاغ المستفيدين وتوفير الدعم المالي والفني اللازم"
                }
            ]
        },
        en: {
            title: "How to Apply for Funding",
            steps: [
                {
                    title: "Contact the Unit",
                    description: "Contact the Research and Innovation Unit for information about available grants"
                },
                {
                    title: "Submit Application",
                    description: "Fill out the application form with required documents and research plan"
                },
                {
                    title: "Evaluation",
                    description: "The committee evaluates applications according to specific criteria for eligibility and quality"
                },
                {
                    title: "Approval and Support",
                    description: "Beneficiaries are notified and provided with necessary financial and technical support"
                }
            ]
        }
    }

    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"
    const currentData = data[locVal]
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-10 border-2 border-amber-200">
                    <div className="flex items-start gap-6">
                        <div className="bg-amber-600 text-white size-20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="size-10" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-[#254151] mb-6">{currentData.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {currentData.steps.map(
                                    (step, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-6 border-2 border-amber-200">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="bg-amber-600 text-white size-10 rounded-full flex items-center justify-center font-bold">
                                                    {idx + 1}
                                                </div>
                                                <h4 className="font-bold text-[#254151] text-lg">{step.title}</h4>
                                            </div>
                                            <p className="text-gray-700">{step.description}</p>
                                        </div>
                                    )
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}