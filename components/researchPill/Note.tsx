import { Award, Globe, Sparkles, Target, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

const t: Record<
    LocaleKey,
    {
        sectionTitle: string;
        cards: {
            vision2040Title: string;
            vision2040Description: string;
            innovationTitle: string;
            innovationDescription: string;
            sustainabilityTitle: string;
            sustainabilityDescription: string;
            excellenceTitle: string;
            excellenceDescription: string;
        };
    }
> = {
    ar: {
        sectionTitle: "الأهداف الاستراتيجية",
        cards: {
            vision2040Title: "رؤية عمان 2040",
            vision2040Description: "التوافق مع الأهداف الوطنية لإنشاء اقتصاد متكامل وتنافسي",
            innovationTitle: "الابتكار والتميز",
            innovationDescription: "تعزيز ثقافة الابتكار والبحث العلمي المتميز",
            sustainabilityTitle: "التطوير المستدام",
            sustainabilityDescription: "دعم التطوير المهني المستمر للباحثين والطلبة",
            excellenceTitle: "التميز البحثي",
            excellenceDescription: "تحقيق أعلى معايير الجودة والنزاهة العلمية",
        },
    },
    en: {
        sectionTitle: "Strategic Objectives",
        cards: {
            vision2040Title: "Oman Vision 2040",
            vision2040Description: "Alignment with national goals to build an integrated and competitive economy",
            innovationTitle: "Innovation and Excellence",
            innovationDescription: "Promoting a culture of innovation and outstanding scientific research",
            sustainabilityTitle: "Sustainable Development",
            sustainabilityDescription: "Supporting continuous professional development for researchers and students",
            excellenceTitle: "Research Excellence",
            excellenceDescription: "Achieving the highest standards of quality and scientific integrity",
        },
    },
};

export default function FinalNote() {
    const locale = useLocale()
    const localeVal = locale == "ar" ? "ar" : "en"
    const content = t[localeVal];
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-white rounded-lg shadow-2xl p-10 border-2 border-purple-200">
                    <div className="flex items-start gap-6">
                        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white size-20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Target className="size-10" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-[#254151] mb-4">{content.sectionTitle}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Globe className="size-6 text-blue-600" />
                                        <h4 className="font-bold text-[#254151]">{content.cards.vision2040Title}</h4>
                                    </div>
                                    <p className="text-gray-700">{content.cards.vision2040Description}</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Sparkles className="size-6 text-green-600" />
                                        <h4 className="font-bold text-[#254151]">{content.cards.innovationTitle}</h4>
                                    </div>
                                    <p className="text-gray-700">{content.cards.innovationDescription}</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Users className="size-6 text-purple-600" />
                                        <h4 className="font-bold text-[#254151]">{content.cards.sustainabilityTitle}</h4>
                                    </div>
                                    <p className="text-gray-700">{content.cards.sustainabilityDescription}</p>
                                </div>

                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 border-2 border-amber-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Award className="size-6 text-amber-600" />
                                        <h4 className="font-bold text-[#254151]">{content.cards.excellenceTitle}</h4>
                                    </div>
                                    <p className="text-gray-700">{content.cards.excellenceDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}