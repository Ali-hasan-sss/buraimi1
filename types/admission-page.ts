export type AdmissionAccordionItem = {
    id: string
    titleAr: string
    titleEn: string
    contentAr: string
    contentEn: string
}

export type AdmissionStep = {
    id: string
    number: string
    titleAr: string
    titleEn: string
    contentTitleAr: string
    contentTitleEn: string
    accordionItems: AdmissionAccordionItem[]
}

export type AdmissionProgramCard = {
    id: string
    titleAr: string
    titleEn: string
    image: string
    href: string
    buttonTextAr: string
    buttonTextEn: string
    detailHeroImageDesktop: string
    detailHeroImageMobile: string
    stepsSectionTitleAr: string
    stepsSectionTitleEn: string
    steps: AdmissionStep[]
}

export type AdmissionPageData = {
    heroTitleAr: string
    heroTitleEn: string
    heroImageDesktop: string
    heroImageMobile: string
    introTitleAr: string
    introTitleEn: string
    introTextAr: string
    introTextEn: string
    programs: AdmissionProgramCard[]
}
