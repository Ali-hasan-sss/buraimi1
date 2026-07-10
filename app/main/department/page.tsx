import CTA from "@/components/graduateStudies/CTA";
import DepCards from "@/components/department/DepCard";
import OverView from "@/components/department/OverView";
import GraduateCards from "@/components/department/GraduateCards";
import dbConnect from "@/lib/dbConnect";
import { mapDepartmentsToOverview } from "@/lib/department-public";
import { DepartmentModel } from "@/models/Department";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function DepartmentPage() {
    const t = await getTranslations("departmentPage");

    await dbConnect();
    const docs = await DepartmentModel.find({}).sort({ domain: 1 }).lean();

    const overview = mapDepartmentsToOverview(
        docs.map((doc) => ({
            domain: String(doc.domain),
            titleAr: String(doc.titleAr),
            titleEn: String(doc.titleEn),
            programs: doc.programs,
            showcaseImage: doc.showcaseImage,
        }))
    );

    const depCardsList = overview.map((d) => ({
        domain: d.domain,
        titleAr: d.titleAr,
        titleEn: d.titleEn,
    }));

    return (
        <div className="min-h-screen">
            <section className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#254151]/95 to-[#6096b4]/90"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-white text-center px-4">
                    <div>
                        <h1 className="text-6xl font-bold mb-6">{t("heroTitle")}</h1>
                        <p className="text-2xl max-w-4xl mx-auto leading-relaxed">{t("heroSubtitle")}</p>
                    </div>
                </div>
            </section>

            <OverView departments={overview} />
            <DepCards departments={depCardsList} />
            <GraduateCards />
            <CTA />
        </div>
    );
}
