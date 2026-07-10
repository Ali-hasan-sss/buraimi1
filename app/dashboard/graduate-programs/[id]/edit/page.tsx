import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import dbConnect from "@/lib/dbConnect";
import { GraduateProgramModel } from "@/models/GraduateProgram";
import type { GraduateProgramDoc } from "@/types/graduate-program";

import { Button } from "@/components/ui/button";
import GraduateProgramFormFields from "@/components/dashboard/graduate-programs/GraduateProgramFormFields";
import { updateGraduateProgram } from "./action";

export default async function EditGraduateProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const doc = (await GraduateProgramModel.findById(id).lean()) as GraduateProgramDoc | null;
  if (!doc) notFound();

  const bound = updateGraduateProgram.bind(null, id);
  const t = await getTranslations("dashboardGraduatePrograms");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("editTitle")}</h1>
          <p className="text-sm text-muted-foreground">{doc.titleAr}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/graduate-programs">{t("back")}</Link>
        </Button>
      </div>

      <form action={bound} className="space-y-6">
        <GraduateProgramFormFields
          key={id}
          defaults={{
            slug: doc.slug,
            titleAr: doc.titleAr,
            titleEn: doc.titleEn,
            descriptionAr: doc.descriptionAr,
            descriptionEn: doc.descriptionEn,
            affiliationAr: doc.affiliationAr ?? "",
            affiliationEn: doc.affiliationEn ?? "",
            color: doc.color,
            accentColor: doc.accentColor ?? "#254151",
            carouselImage: doc.carouselImage ?? "",
            specializationsAr: doc.specializationsAr ?? "",
            specializationsEn: doc.specializationsEn ?? "",
            feesAr: doc.feesAr ?? "",
            feesEn: doc.feesEn ?? "",
            creditsAr: doc.creditsAr ?? "",
            creditsEn: doc.creditsEn ?? "",
            totalFeesAr: doc.totalFeesAr ?? "",
            totalFeesEn: doc.totalFeesEn ?? "",
            featuresAr: doc.featuresAr ?? [],
            featuresEn: doc.featuresEn ?? [],
            order: doc.order ?? 0,
          }}
        />
        <div className="flex justify-end gap-2">
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </div>
  );
}
