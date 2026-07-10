"use client"

import { useLocale } from "next-intl"

export default function ResVision() {

    const data = {
        ar: {
            title: " رؤيتنا البحثية",
            description: "نسعى لأن نكون مركزاً رائداً للبحث العلمي والابتكار في المنطقة، من خلال تشجيع البحوث المتقدمة التي تساهم في حل التحديات المجتمعية والاقتصادية وتعزيز التنمية المستدامة.",
            vision: [
                {
                    title: "التميز البحثي",
                    description: "تحقيق أعلى معايير الجودة في البحث العلمي"
                },
                {
                    title: "الشراكات الاستراتيجية",
                    description: "بناء شراكات قوية مع المؤسسات المحلية والدولية"
                }, {
                    title: "التأثير المجتمعي",
                    description: "بحوث تخدم المجتمع وتساهم في التنمية"
                }
            ]
        },
        en: {
            title: "Our Research Vision",
            description: "We strive to be a leading center for scientific research and innovation in the region, encouraging advanced research that contributes to solving social and economic challenges and promoting sustainable development.",
            vision: [
                {
                    title: "Research Excellence",
                    description: "Achieving the highest standards of quality in scientific research"
                },
                {
                    title: "Strategic Partnerships",
                    description: "Building strong partnerships with local and international institutions"
                }, {
                    title: "Community Impact",
                    description: "Research that serves the community and contributes to development"
                }
            ]
        }
    }

    const locale = useLocale()
    const locVal = locale == "ar" ? "ar" : "en"

    const currentData = data[locVal]

    return (

        <section className="py-20 bg-gradient-to-l from-[#254151]/5 to-[#6096b4]/5">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className=" text-2xl lg:text-4xl font-black text-[#254151] mb-8">
                        {currentData.title}
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed mb-12">
                        {currentData.description}
                    </p>


                    <div className="grid md:grid-cols-3 gap-8">
                        {
                            currentData.vision.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className={`
                                    ${index == 0 ? "bg-[#254151]" : index == 1 ? " bg-[#6096b4]" : "bg-[#c2a772]"}
                                size-8 lg:size-16  rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <span className="text-lg lg:text-3xl font-black text-white">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#254151] mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}