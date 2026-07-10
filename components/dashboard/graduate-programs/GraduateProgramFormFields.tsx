import { getTranslations } from "next-intl/server";

import GraduateProgramCardFormSection from "@/components/dashboard/graduate-programs/GraduateProgramCardFormSection";
import GraduateProgramPresentationSection from "@/components/dashboard/graduate-programs/GraduateProgramPresentationSection";
import { GraduateProgramFormVisualProvider } from "@/components/dashboard/graduate-programs/GraduateProgramFormVisualContext";
import type { GraduateProgramFormDefaults } from "@/components/dashboard/graduate-programs/graduate-program-form-defaults";
import { Input } from "@/components/ui/input";

export type { GraduateProgramFormDefaults } from "@/components/dashboard/graduate-programs/graduate-program-form-defaults";

export default async function GraduateProgramFormFields({
  defaults = {},
}: {
  defaults?: GraduateProgramFormDefaults;
}) {
  const t = await getTranslations("dashboardGraduatePrograms.form");
  const fa = (defaults.featuresAr ?? []).join("\n");
  const fe = (defaults.featuresEn ?? []).join("\n");

  const defaultTwGradient = defaults.color ?? "from-[#254151] to-[#6096b4]";

  return (
    <div className="space-y-6">
      <div className="space-y-2 rounded-xl border bg-background p-4">
        <label className="text-sm font-medium" htmlFor="slug">
          {t("slugLabel")}
        </label>
        <Input
          id="slug"
          name="slug"
          placeholder={t("slugPlaceholder")}
          defaultValue={defaults.slug ?? ""}
          required
          pattern="[a-z0-9-]+"
          title={t("slugPatternTitle")}
        />
        <p className="text-xs text-muted-foreground">{t("slugHint")}</p>
      </div>

      <GraduateProgramFormVisualProvider defaultTwGradient={defaultTwGradient}>
        <GraduateProgramCardFormSection
          defaults={defaults}
          featuresArText={fa}
          featuresEnText={fe}
        />
        <div className="pt-6">
          <GraduateProgramPresentationSection
            defaultColor={defaultTwGradient}
            defaultAccent={defaults.accentColor ?? "#254151"}
            defaultImage={defaults.carouselImage ?? ""}
            defaultTitleAr={defaults.titleAr ?? ""}
            defaultTitleEn={defaults.titleEn ?? ""}
          />
        </div>
      </GraduateProgramFormVisualProvider>
    </div>
  );
}
