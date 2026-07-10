export type AdmissionFeeRow = {
    program: string
    admission: string
    perCredit: string
}

export type AdmissionScholarship = {
    id: number
    title: string
    percentage: string
}

export type AdmissionDetailsType = {
    undergraduateFees: AdmissionFeeRow[]
    graduateFees: AdmissionFeeRow[]
    scholarships: AdmissionScholarship[]
}
