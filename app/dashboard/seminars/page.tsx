import { SeminarsTable, type SeminarRow } from "@/components/dashboard/seminars/SeminarsTable";
import { SeminarsFilter } from "@/components/dashboard/seminars/SeminarsFilter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import Seminar from "@/models/Seminar";
import { getTranslations } from "next-intl/server";

export const revalidate = 0;

export default async function SeminarsPage() {
    const t = await getTranslations("dashboardSeminars");
    await dbConnect();
    const seminars = await Seminar.find({}).sort({ order: 1, createdAt: -1 }).lean();

    const data: SeminarRow[] = seminars.map((s) => ({
        id: String(s._id),
        academicYearAr: s.academicYearAr,
        academicYearEn: s.academicYearEn,
        departmentAr: s.departmentAr,
        departmentEn: s.departmentEn,
        presenterAr: s.presenterAr,
        presenterEn: s.presenterEn,
        titleAr: s.titleAr,
        titleEn: s.titleEn,
        date: s.date,
        isActive: s.isActive,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">{t("title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/seminars/create">{t("create")}</Link>
                </Button>
            </div>

            <SeminarsFilter data={data} />
        </div>
    );
}
