import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import GraduateProgramFormFields from "@/components/dashboard/graduate-programs/GraduateProgramFormFields";
import { createGraduateProgram } from "../program-actions";

export default async function NewGraduateProgramPage() {
  const t = await getTranslations("dashboardGraduatePrograms");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("newTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("newSubtitle")}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/graduate-programs">{t("back")}</Link>
        </Button>
      </div>

      <form action={createGraduateProgram} className="space-y-6">
        <GraduateProgramFormFields />
        <div className="flex justify-end gap-2">
          <Button type="submit">{t("create")}</Button>
        </div>
      </form>
    </div>
  );
}
