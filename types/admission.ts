export type AdmissionStats = {
    undergraduate: string
    international: string
    Postgraduate: string
}

export type AdmissionFeature = {
    title: string
    description: string
}

export type AdmissionDiscount = {
    percentage: string
    title: string
    categories: string
    color: string
}

export type AdmissionDataType = {
    stats: AdmissionStats
    undergraduateFeatures: AdmissionFeature
    postgraduatePrograms: AdmissionFeature
    discounts: AdmissionDiscount[]
}
