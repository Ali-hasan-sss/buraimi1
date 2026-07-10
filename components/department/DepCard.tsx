import { depCardVisual } from "@/lib/department-public";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

export type DepCardDepartment = {
    domain: string;
    titleAr: string;
    titleEn: string;
};

export default async function DepCards({ departments }: { departments: DepCardDepartment[] }) {
    const locale = await getLocale();
    const t = await getTranslations("departmentPage");

    if (departments.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#254151] mb-4">{t("departmentsTitle")}</h2>
                    <div className="w-24 h-1 bg-[#c2a772] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {departments.map((dept) => {
                        const { Icon, iconClass, wrapClass } = depCardVisual(dept.domain);
                        const title = locale === "ar" ? dept.titleAr : dept.titleEn;
                        const subtitle = locale === "ar" ? dept.titleEn : dept.titleAr;

                        return (
                            <Link
                                key={dept.domain}
                                href={`/main/department/${dept.domain}`}
                                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#6096b4] group"
                            >
                                <div
                                    className={`bg-gradient-to-br ${wrapClass} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                                >
                                    <Icon className={`size-10 ${iconClass}`} />
                                </div>
                                <h3 className="text-xl font-bold text-[#254151] mb-2">{title}</h3>
                                <p className="text-gray-600 text-sm">{subtitle}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
