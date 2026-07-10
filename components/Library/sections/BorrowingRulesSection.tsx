"use client";

import { Briefcase, GraduationCap, Users } from "lucide-react";
import { useLocale } from "next-intl";

type LocaleKey = "ar" | "en";

type RuleColor = "blue" | "green" | "amber" | "purple";

type BorrowingRule = {
    type: string;
    typeEn: string;
    items: string;
    itemsEn: string;
    period: string;
    periodEn: string;
    fine: string;
    fineEn: string;
    color: RuleColor;
};

type Props = {
    borrowingRules: BorrowingRule[];
};

export default function BorrowingRulesSection({ borrowingRules }: Props) {
    const locale = useLocale() as LocaleKey;

    const t = {
        "ar": {
            "libraryTitle": "مكتبة كلية البريمي",
            "rulesTitle": "قواعد الإعارة للمكتبة",
            "rulesIntro": "الرجاء العثور على قواعد الإعارة للمكتبة أدناه:",
            "rulesNote": "الحد الأقصى لعدد الكتب التي يمكن استعارتها وفترة الاستعارة وغرامات التأخير هي كما يلي:",
            "table": {
                "borrowerType": "نوع المستعير",
                "items": "عدد المواد",
                "period": "فترة الإعارة",
                "fine": "غرامة التأخير"
            }
        },
        "en": {
            "libraryTitle": "BUC Library",
            "rulesTitle": "Library Borrowing Rules",
            "rulesIntro": "Please find the library borrowing rules below:",
            "rulesNote": "Maximum borrowing items, loan period, and overdue fines are as follows:",
            "table": {
                "borrowerType": "Borrower Type",
                "items": "Items",
                "period": "Loan Period",
                "fine": "Overdue Fine"
            }
        }
    } as const;

    const content = t[locale] ?? t["en"];

    const colorClasses: Record<RuleColor, { border: string; bgSoft: string; bgStrong: string; text: string }> = {
        "blue": {
            "border": "border-blue-200",
            "bgSoft": "bg-blue-50",
            "bgStrong": "bg-blue-600",
            "text": "text-blue-600"
        },
        "green": {
            "border": "border-green-200",
            "bgSoft": "bg-green-50",
            "bgStrong": "bg-green-600",
            "text": "text-green-600"
        },
        "amber": {
            "border": "border-amber-200",
            "bgSoft": "bg-amber-50",
            "bgStrong": "bg-amber-600",
            "text": "text-amber-600"
        },
        "purple": {
            "border": "border-purple-200",
            "bgSoft": "bg-purple-50",
            "bgStrong": "bg-purple-600",
            "text": "text-purple-600"
        }
    };

    const iconForType = (type: string) => {
        if (type.includes("هيئة")) return GraduationCap;
        if (type.includes("الموظ")) return Briefcase;
        if (type.includes("الدراسات")) return GraduationCap;
        return Users;
    };

    return (
        <section className="rounded-lg border-2 border-blue-200 bg-white p-5 shadow-xl sm:p-8">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#254151] sm:mb-6 sm:text-3xl">
                <GraduationCap className="size-7 text-[#6096b4] sm:size-10" />
                <span>{content.libraryTitle}</span>
            </h2>

            <div className="mb-6 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6">
                <h3 className="mb-3 text-base font-bold text-blue-800 sm:text-xl">{content.rulesTitle}</h3>
                <p className="mb-2 text-sm leading-relaxed text-gray-700 sm:text-base">{content.rulesIntro}</p>
                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {content.rulesNote}
                </p>
            </div>

            <div className="hidden overflow-x-auto sm:block">
                <table className="w-full border-2 border-gray-300">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
                            <th className="border-l-2 border-white px-4 py-3 text-right text-sm font-bold sm:px-6 sm:py-4 sm:text-base">{content.table.borrowerType}</th>
                            <th className="border-l-2 border-white px-4 py-3 text-right text-sm font-bold sm:px-6 sm:py-4 sm:text-base">{content.table.items}</th>
                            <th className="border-l-2 border-white px-4 py-3 text-right text-sm font-bold sm:px-6 sm:py-4 sm:text-base">{content.table.period}</th>
                            <th className="px-4 py-3 text-right text-sm font-bold sm:px-6 sm:py-4 sm:text-base">{content.table.fine}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowingRules.map((rule, index: number) => {
                            const Icon = iconForType(rule.type);
                            const classes = colorClasses[rule.color];
                            const borrowerType = locale === "ar" ? rule.type : rule.typeEn;
                            const borrowerTypeSecondary = locale === "ar" ? rule.typeEn : rule.type;
                            const items = locale === "ar" ? rule.items : rule.itemsEn;
                            const itemsSecondary = locale === "ar" ? rule.itemsEn : rule.items;
                            const period = locale === "ar" ? rule.period : rule.periodEn;
                            const periodSecondary = locale === "ar" ? rule.periodEn : rule.period;
                            const fine = locale === "ar" ? rule.fine : rule.fineEn;
                            const fineSecondary = locale === "ar" ? rule.fineEn : rule.fine;
                            return (
                                <tr key={index} className="border-b-2 border-gray-200 transition-colors hover:bg-blue-50">
                                    <td className="border-l-2 border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-lg ${classes.bgSoft} p-2`}>
                                                <Icon className={`size-5 ${classes.text}`} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{borrowerType}</p>
                                                <p className="text-sm text-gray-600">{borrowerTypeSecondary}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-l-2 border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
                                        <p className="font-bold text-gray-800">{items}</p>
                                        <p className="text-sm text-gray-600">{itemsSecondary}</p>
                                    </td>
                                    <td className="border-l-2 border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
                                        <p className="font-bold text-gray-800">{period}</p>
                                        <p className="text-sm text-gray-600">{periodSecondary}</p>
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        <p className="font-bold text-gray-800">{fine}</p>
                                        {fine !== "-" ? <p className="text-sm text-gray-600">{fineSecondary}</p> : null}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:hidden">
                {borrowingRules.map((rule, index: number) => {
                    const Icon = iconForType(rule.type);
                    const classes = colorClasses[rule.color];
                    const borrowerType = locale === "ar" ? rule.type : rule.typeEn;
                    const borrowerTypeSecondary = locale === "ar" ? rule.typeEn : rule.type;
                    const items = locale === "ar" ? rule.itemsEn : rule.items;
                    const period = locale === "ar" ? rule.periodEn : rule.period;
                    const fine = locale === "ar" ? rule.fineEn : rule.fine;
                    return (
                        <div key={index} className={`rounded-lg border-2 ${classes.border} ${classes.bgSoft} p-4`}>
                            <div className="mb-3 flex items-center gap-3">
                                <div className={`rounded-lg ${classes.bgStrong} p-2 text-white`}>
                                    <Icon className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-gray-800">{borrowerType}</p>
                                    <p className="truncate text-xs text-gray-600">{borrowerTypeSecondary}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                                <div>
                                    <p className="font-bold">{content.table.items}</p>
                                    <p>{items}</p>
                                </div>
                                <div>
                                    <p className="font-bold">{content.table.period}</p>
                                    <p>{period}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-bold">{content.table.fine}</p>
                                    <p>{fine}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
