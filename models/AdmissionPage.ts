import { Schema, model, models } from "mongoose"

const AdmissionAccordionItemSchema = new Schema(
    {
        id: { type: String, required: true, trim: true },
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        contentAr: { type: String, required: true, default: "" },
        contentEn: { type: String, required: true, default: "" },
    },
    { _id: false },
)

const AdmissionStepSchema = new Schema(
    {
        id: { type: String, required: true, trim: true },
        number: { type: String, required: true, trim: true },
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        contentTitleAr: { type: String, required: true, trim: true },
        contentTitleEn: { type: String, required: true, trim: true },
        accordionItems: { type: [AdmissionAccordionItemSchema], required: true, default: [] },
    },
    { _id: false },
)

const AdmissionProgramCardSchema = new Schema(
    {
        id: { type: String, required: true, trim: true },
        titleAr: { type: String, required: true, trim: true },
        titleEn: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        href: { type: String, required: true, trim: true },
        buttonTextAr: { type: String, required: true, trim: true },
        buttonTextEn: { type: String, required: true, trim: true },
        detailHeroImageDesktop: { type: String, required: true, trim: true, default: "" },
        detailHeroImageMobile: { type: String, required: true, trim: true, default: "" },
        stepsSectionTitleAr: { type: String, required: true, trim: true, default: "خطوات القبول" },
        stepsSectionTitleEn: { type: String, required: true, trim: true, default: "Admission Steps" },
        steps: { type: [AdmissionStepSchema], required: true, default: [] },
    },
    { _id: false },
)

const AdmissionPageSchema = new Schema(
    {
        heroTitleAr: { type: String, required: true, trim: true },
        heroTitleEn: { type: String, required: true, trim: true },
        heroImageDesktop: { type: String, required: true, trim: true },
        heroImageMobile: { type: String, required: true, trim: true },
        introTitleAr: { type: String, required: true, trim: true },
        introTitleEn: { type: String, required: true, trim: true },
        introTextAr: { type: String, required: true, trim: true },
        introTextEn: { type: String, required: true, trim: true },
        programs: { type: [AdmissionProgramCardSchema], required: true, default: [] },
    },
    { timestamps: true },
)

if (models.AdmissionPage) {
    const programsPath = models.AdmissionPage.schema.path("programs") as
        | { schema?: { paths: Record<string, unknown> } }
        | undefined
    const programFields = programsPath?.schema?.paths
    if (!programFields?.steps || !programFields?.detailHeroImageDesktop) {
        delete models.AdmissionPage
    }
}

export const AdmissionPageModel =
    models.AdmissionPage || model("AdmissionPage", AdmissionPageSchema)
