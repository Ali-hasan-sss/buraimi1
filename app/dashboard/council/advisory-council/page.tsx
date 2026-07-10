import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";
import { AdvisoryCouncilMember } from "@/models/AdvisoryCouncil";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type AdvisoryDoc = {
    _id: unknown;
    name: string;
    role: string;
    description: string;
    image?: string;
};

async function deleteMember(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    if (!id) return;

    await dbConnect();
    await AdvisoryCouncilMember.findByIdAndDelete(id);
    revalidatePath("/dashboard/council/advisory-council");
}

export default async function AdvisoryOfCouncil() {
    const t = await getTranslations("dashboardCouncil");

    await dbConnect();

    const members = (await AdvisoryCouncilMember.find({}).sort({ createdAt: -1 }).lean()) as AdvisoryDoc[];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">{t("advisoryTitle")}</h1>
                    <p className="text-sm text-muted-foreground">{t("manageMembers")}</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/council/advisory-council/new">{t("addMember")}</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border bg-background">
                <div className="w-full overflow-x-auto">
                    <table className="w-max min-w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="text-left">
                                <th className="hidden px-4 py-3 font-medium text-start sm:table-cell">{t("tableId")}</th>
                                <th className="px-4 py-3 font-medium text-start">{t("tablePhoto")}</th>
                                <th className="px-4 py-3 font-medium text-start ">{t("tableName")}</th>
                                <th className="px-4 py-3 font-medium text-start">{t("tableRole")}</th>
                                <th className="px-4 py-3 font-medium text-start ">{t("tableDescription")}</th>
                                <th className="px-4 py-3 font-medium text-start">{t("tableAction")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-6 text-muted-foreground" colSpan={6}>
                                        {t("emptyMembers")}
                                    </td>
                                </tr>
                            ) : (
                                members.map((m) => (
                                    <tr key={String(m._id)} className="border-t">
                                        <td className="hidden px-4 py-3 font-mono text-xs sm:table-cell">{String(m._id)}</td>
                                        <td className="px-4 py-3">
                                            {m.image ? (
                                                <div className="relative size-10 overflow-hidden rounded-md border">
                                                    <Image src={resolveUploadImageSrc(m.image)} alt={m.name} fill className="object-cover" sizes="40px" />
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">{m.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{m.role}</td>
                                        <td className="px-4 py-3 max-w-[200px]">{m.description ? m.description : "-"}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                                <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                                                    <Link href={`/dashboard/council/advisory-council/${String(m._id)}`}>{t("update")}</Link>
                                                </Button>

                                                <form action={deleteMember} className="w-full sm:w-auto">
                                                    <input type="hidden" name="id" value={String(m._id)} />
                                                    <Button type="submit" variant="destructive" size="sm" className="w-full sm:w-auto">
                                                        {t("delete")}
                                                    </Button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
