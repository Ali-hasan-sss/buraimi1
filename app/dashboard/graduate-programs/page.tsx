import Link from "next/link";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";
import { GraduateProgramModel } from "@/models/GraduateProgram";
import type { GraduateProgramDoc } from "@/types/graduate-program";

import { Button } from "@/components/ui/button";
import { gradCardHeaderBackgroundStyleFromField } from "@/lib/graduate-program-gradient";
import { deleteGraduateProgram } from "./program-actions";

export default async function GraduateProgramsDashboardPage() {
  const t = await getTranslations("dashboardGraduatePrograms");
  await dbConnect();
  const programs = (await GraduateProgramModel.find({})
    .sort({ order: 1, slug: 1 })
    .lean()) as GraduateProgramDoc[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("listTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("listSubtitle")}</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/graduate-programs/new">{t("addProgram")}</Link>
        </Button>
      </div>

      {programs.length === 0 ? (
        <div className="rounded-xl border bg-background p-6 text-sm text-muted-foreground">
          {t("emptyStateBefore")}{" "}
          <code className="rounded bg-muted px-1">{t("emptyStateSeedHint")}</code>{" "}
          {t("emptyStateAfter")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {programs.map((p) => {
            const id = String(p._id);
            return (
              <div
                key={id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl"
              >
                <div
                  className="p-5 text-white"
                  style={gradCardHeaderBackgroundStyleFromField(p.color)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-bold text-white">{p.titleAr}</h2>
                      <p className="text-sm text-white/90">{p.titleEn}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="secondary" className="h-8">
                        <Link href={`/main/graduate-studies/${String(p.slug)}`}>
                          {t("viewProgram")}
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary" className="h-8">
                        <Link href={`/dashboard/graduate-programs/${id}/edit`}>
                          {t("editProgram")}
                        </Link>
                      </Button>
                      <form action={deleteGraduateProgram} className="inline">
                        <input type="hidden" name="id" value={id} />
                        <Button type="submit" size="sm" variant="destructive" className="h-8">
                          {t("deleteProgram")}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 p-4 text-sm">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#c2a772]/30 bg-[#c2a772]/10 px-3 py-1">
                    <span className="font-semibold text-[#254151]">{p.slug}</span>
                    <span className="text-muted-foreground">
                      {t("orderLabel")} {p.order ?? 0}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-muted-foreground">{p.descriptionAr}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
