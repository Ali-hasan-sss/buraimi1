import { admissionPageSeed } from "@/staticData/admission-page"
import type { AdmissionAccordionItem, AdmissionProgramCard, AdmissionStep } from "@/types/admission-page"
import { admissionProgramPath } from "@/lib/admission-program-url"

function normalizeAccordion(item: AdmissionAccordionItem): AdmissionAccordionItem {
    return {
        id: item.id,
        titleAr: item.titleAr ?? "",
        titleEn: item.titleEn ?? "",
        contentAr: item.contentAr ?? "",
        contentEn: item.contentEn ?? "",
    }
}

function normalizeStep(step: AdmissionStep): AdmissionStep {
    const items = Array.isArray(step.accordionItems) ? step.accordionItems.map(normalizeAccordion) : []
    return {
        id: step.id,
        number: step.number ?? "01",
        titleAr: step.titleAr ?? "",
        titleEn: step.titleEn ?? "",
        contentTitleAr: step.contentTitleAr ?? step.titleAr ?? "",
        contentTitleEn: step.contentTitleEn ?? step.titleEn ?? "",
        accordionItems: items,
    }
}

export function normalizeAdmissionProgram(
    program: Partial<AdmissionProgramCard> & Pick<AdmissionProgramCard, "id">,
): AdmissionProgramCard {
    const seed = admissionPageSeed.programs.find((p) => p.id === program.id)
    const rawSteps = Array.isArray(program.steps) ? program.steps : undefined
    const hasSteps = Boolean(rawSteps && rawSteps.length > 0)
    const steps = hasSteps
        ? rawSteps!.map(normalizeStep)
        : seed?.steps?.length
          ? seed.steps.map(normalizeStep)
          : []

    return {
        id: program.id,
        titleAr: program.titleAr ?? seed?.titleAr ?? "",
        titleEn: program.titleEn ?? seed?.titleEn ?? "",
        image: program.image ?? seed?.image ?? "",
        href: admissionProgramPath(program.id),
        buttonTextAr: program.buttonTextAr ?? seed?.buttonTextAr ?? "اقرأ المزيد",
        buttonTextEn: program.buttonTextEn ?? seed?.buttonTextEn ?? "Read more",
        detailHeroImageDesktop:
            program.detailHeroImageDesktop?.trim() ||
            seed?.detailHeroImageDesktop ||
            program.image ||
            seed?.image ||
            "",
        detailHeroImageMobile:
            program.detailHeroImageMobile?.trim() ||
            seed?.detailHeroImageMobile ||
            program.image ||
            seed?.image ||
            "",
        stepsSectionTitleAr:
            program.stepsSectionTitleAr?.trim() || seed?.stepsSectionTitleAr || "خطوات القبول",
        stepsSectionTitleEn:
            program.stepsSectionTitleEn?.trim() || seed?.stepsSectionTitleEn || "Admission Steps",
        steps,
    }
}

export function normalizeAdmissionPrograms(
    programs: Array<Partial<AdmissionProgramCard> & Pick<AdmissionProgramCard, "id">>,
): AdmissionProgramCard[] {
    const normalized = programs.map(normalizeAdmissionProgram)
    for (const seedProgram of admissionPageSeed.programs) {
        if (!normalized.some((p) => p.id === seedProgram.id)) {
            normalized.push(normalizeAdmissionProgram(seedProgram))
        }
    }
    return normalized
}
