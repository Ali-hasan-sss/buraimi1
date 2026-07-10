"use client";

import { CheckCircle, Download, QrCode, Smartphone } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

export default function LibertyLinkSection() {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "title": "تطبيق Liberty Link للهاتف المحمول",
            "description": "قم بتنزيل تطبيق Liberty Link للهاتف المحمول للسماح لك بالبحث والحجز والاستعارة وإرجاع الموارد من هاتفك.",
            "setupTitle": "للإعداد، اتبع الخطوات التالية:",
            "steps": [
                "قم بتنزيل تطبيق Liberty Link من متجر Apple أو متجر Google Play",
                "افتح Liberty Link وابحث عن زر \"Setup\" في أسفل الشاشة",
                "افتح قارئ رمز الاستجابة السريعة، بلمس زر \"Scan Setup Code\"",
                "امسح صورة رمز الاستجابة السريعة الظاهرة هنا أثناء تسجيل الدخول",
                "أدخل كلمة المرور الخاصة بك إذا لزم الأمر ثم احفظ"
            ],
            "cardSubtitle": "تطبيق الهاتف المحمول"
        },
        "en": {
            "title": "Liberty Link Mobile App",
            "description": "Download the Liberty Link mobile app to search, reserve, borrow, and return resources from your phone.",
            "setupTitle": "To set up, follow these steps:",
            "steps": [
                "Download the Liberty Link app from the Apple App Store or Google Play",
                "Open Liberty Link and find the \"Setup\" button at the bottom of the screen",
                "Open the QR code reader by tapping \"Scan Setup Code\"",
                "Scan the QR code image shown here during login",
                "Enter your password if needed, then save"
            ],
            "cardSubtitle": "Mobile App"
        }
    } as const;

    const content = t[locale] ?? t["en"];

    const steps = [
        { text: content.steps[0], icon: Download },
        { text: content.steps[1], icon: Smartphone },
        { text: content.steps[2], icon: QrCode },
        { text: content.steps[3], icon: CheckCircle },
        { text: content.steps[4], icon: CheckCircle }
    ] as const;

    return (
        <section className="rounded-lg border-2 border-purple-200 bg-white p-5 shadow-xl sm:p-8">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#254151] sm:mb-6 sm:text-3xl">
                <Smartphone className="size-7 text-purple-600 sm:size-10" />
                <span>{content.title}</span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <p className="mb-6 text-sm leading-relaxed text-gray-700 sm:text-lg">
                        {content.description}
                    </p>

                    <h3 className="mb-4 text-base font-bold text-purple-700 sm:text-xl">{content.setupTitle}</h3>

                    <div className="space-y-3">
                        {steps.map((step, index: number) => (
                            <div key={index} className="flex items-start gap-3 rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                                <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{step.text}</p>
                                </div>
                                <step.icon className="size-5 flex-shrink-0 text-purple-600 sm:size-6" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-2xl sm:p-12">
                        <div className="text-center">
                            <Smartphone className="mx-auto mb-4 size-16 sm:mb-6 sm:size-32" />
                            <h3 className="mb-2 text-2xl font-bold sm:text-4xl">Liberty Link</h3>
                            <p className="text-sm opacity-90 sm:text-xl">{content.cardSubtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
