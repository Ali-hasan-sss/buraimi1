import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";

import { Button } from "@/components/ui/button";

type DepartmentDoc = {
    _id: unknown;
    domain: string;
    titleAr: string;
    titleEn: string;
    subTitleAr: string;
    subTitleEn: string;
};

async function deleteDepartment(formData: FormData) {
    "use server";

    const id = String(formData.get("id") || "");
    if (!id) return;

    await dbConnect();
    await DepartmentModel.findByIdAndDelete(id);
    revalidatePath("/dashboard/departments");
}

export default async function DepartmentsPage() {
    const t = await getTranslations("dashboardDepartments");
    await dbConnect();
    const departments = (await DepartmentModel.find({}).sort({ domain: 1 }).lean()) as DepartmentDoc[];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">{t("listTitle")}</h1>
                    <p className="text-sm text-muted-foreground">{t("listSubtitle")}</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/departments/new">{t("addNew")}</Link>
                </Button>
            </div>

            {departments.length === 0 ? (
                <div className="rounded-xl border bg-background p-6 text-sm text-muted-foreground">{t("emptyState")}</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {departments.map((dept) => (
                        <div
                            key={String(dept._id)}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                        >
                            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-white font-bold text-lg">{dept.titleAr}</h3>

                                            <div className="flex items-center gap-2">
                                                <Button asChild size="sm" variant="secondary" className="h-8">
                                                    <Link href={`/main/department/${encodeURIComponent(dept.domain)}`}>{t("view")}</Link>
                                                </Button>

                                                <form action={deleteDepartment}>
                                                    <input type="hidden" name="id" value={String(dept._id)} />
                                                    <Button type="submit" size="sm" variant="destructive" className="h-8">
                                                        {t("delete")}
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>

                                        <p className="text-blue-100 text-sm mt-2">{dept.titleEn}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c2a772]/10 to-[#c2a772]/5 rounded-full border border-[#c2a772]/20">
                                    <div className="w-2 h-2 bg-[#c2a772] rounded-full"></div>
                                    <span className="text-[#254151] font-semibold text-sm">{dept.domain}</span>
                                </div>

                                <p className="text-gray-700 leading-relaxed text-sm">{dept.subTitleAr}</p>
                                <p className="text-gray-500 leading-relaxed text-sm">{dept.subTitleEn}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
