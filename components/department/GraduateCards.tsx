import { BookOpen, ExternalLink, Globe, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

import { gradCardHeaderBackgroundStyleFromField } from "@/lib/graduate-program-gradient";
import { listGradProgramsForPage } from "@/lib/graduate-program-public";

interface ProgramRowBase {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    link: string;
    color: string;
}

interface ProgramRowExtended extends ProgramRowBase {
    affiliationAr: string;
    affiliationEn: string;
    specializationsAr: string;
    specializationsEn: string;
    feesAr: string;
    feesEn: string;
    creditsAr: string;
    creditsEn: string;
    totalFeesAr: string;
    totalFeesEn: string;
}

type ProgramRow = ProgramRowBase | ProgramRowExtended;

function hasAffiliationBlock(p: ProgramRow): p is ProgramRowExtended {
    return "affiliationAr" in p && Boolean((p as ProgramRowExtended).affiliationAr);
}

export default async function GraduateCards() {
    const locale = await getLocale();
    const t = await getTranslations("departmentPage");
    const isAr = locale === "ar";

    const cards = await listGradProgramsForPage();
    const programs: ProgramRow[] = cards.map((p) => {
        const base: ProgramRowBase = {
            titleAr: p.title,
            titleEn: p.titleEn,
            descriptionAr: p.description,
            descriptionEn: p.descriptionEn,
            link: `/main/graduate-studies/${p.id}`,
            color: p.color,
        };
        if (p.affiliation?.trim() && p.affiliationEn?.trim()) {
            const ext: ProgramRowExtended = {
                ...base,
                affiliationAr: p.affiliation,
                affiliationEn: p.affiliationEn,
                specializationsAr: p.specializations ?? "",
                specializationsEn: p.specializationsEn ?? "",
                feesAr: p.fees ?? "",
                feesEn: p.feesEn ?? "",
                creditsAr: p.credits ?? "",
                creditsEn: p.creditsEn ?? "",
                totalFeesAr: p.totalFees ?? "",
                totalFeesEn: p.totalFeesEn ?? "",
            };
            return ext;
        }
        return base;
    });

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#254151] mb-4">{t("graduateTitle")}</h2>
                    <div className="w-24 h-1 bg-[#c2a772] mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("graduateSubtitle")}</p>
                </div>

                <div className="space-y-8">
                    {programs.map((program, index) => {
                        const title = isAr ? program.titleAr : program.titleEn;
                        const description = isAr ? program.descriptionAr : program.descriptionEn;

                        return (
                            <div
                                key={`${program.link}-${index}`}
                                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#6096b4] transition-all"
                            >
                                <div
                                    className="text-white p-6"
                                    style={gradCardHeaderBackgroundStyleFromField(program.color)}
                                >
                                    <h3 className="text-3xl font-bold mb-2">{title}</h3>
                                </div>

                                <div className="p-8">
                                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>

                                    {hasAffiliationBlock(program) && (
                                        <div className="bg-blue-50 border-s-4 border-blue-500 p-6 rounded-lg mb-4">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <Globe className="size-5 text-blue-600 shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-[#254151] mb-1">{t("academicAffiliation")}</h4>
                                                        <p className="text-gray-700">
                                                            {isAr ? program.affiliationAr : program.affiliationEn}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <BookOpen className="size-5 text-blue-600 shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-[#254151] mb-1">{t("specializationsPlan")}</h4>
                                                        <p className="text-gray-700">
                                                            {isAr ? program.specializationsAr : program.specializationsEn}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                                        <h5 className="font-bold text-[#254151] mb-1 text-sm">{t("tuitionFees")}</h5>
                                                        <p className="text-blue-600 font-bold">
                                                            {isAr ? program.feesAr : program.feesEn}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                                        <h5 className="font-bold text-[#254151] mb-1 text-sm">{t("creditHours")}</h5>
                                                        <p className="text-blue-600 font-bold">
                                                            {isAr ? program.creditsAr : program.creditsEn}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                                        <h5 className="font-bold text-[#254151] mb-1 text-sm">{t("total")}</h5>
                                                        <p className="text-blue-600 font-bold text-sm">
                                                            {isAr ? program.totalFeesAr : program.totalFeesEn}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={program.link}
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6096b4] to-[#254151] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                        >
                                            <span>{t("readMore")}</span>
                                            <ExternalLink className="size-5" />
                                        </Link>

                                        <Link
                                            href="/main/contact-directory"
                                            className="inline-flex items-center gap-2 bg-white border-2 border-[#6096b4] text-[#6096b4] px-6 py-3 rounded-lg font-semibold hover:bg-[#6096b4] hover:text-white transition-all"
                                        >
                                            <span>{t("contactUs")}</span>
                                            <Phone className="size-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
