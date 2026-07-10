import { CareersTable, type CareerRow } from "@/components/dashboard/careers/CareersTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { CareersModel } from "@/models/careers";

export default async function CareersPage() {
    await dbConnect();
    const careers = await CareersModel.find({}).sort({ createdAt: -1 }).lean();

    const data: CareerRow[] = careers.map((c) => ({
        id: String(c._id),
        titleAr: c.titleAr,
        titleEn: c.titleEn,
        descriptionAr: c.descriptionAr,
        descriptionEn: c.descriptionEn,
        requirementsAr: c.requirementsAr || "",
        requirementsEn: c.requirementsEn || "",
        startDate: c.startDate instanceof Date ? c.startDate.toISOString() : String(c.startDate),
        edDate: c.edDate instanceof Date ? c.edDate.toISOString() : String(c.edDate),
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Careers</h1>
                    <p className="text-sm text-muted-foreground">UI only</p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/careers/create">Create Career</Link>
                </Button>
            </div>

            <CareersTable data={data} />
        </div>
    );
}