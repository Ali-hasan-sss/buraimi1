export type DepartmentCourse = {
    seq: number
    code: string
    title: string
    credits: number
    oqf: number
    prerequisite: string
}

export type PlanHeader = {
    title: string,
    totalHour?: number | null,
    generalRequirementsHours?: number | null,
    departmentRequirementsHours?: number | null,
    majorRequirementsHours?: number | null,
    electiveRequirements?: number | null
}
export type DepartmentStudyPlan = {
    id: string
    PlanHeader: PlanHeader
    generalRequirements: DepartmentCourse[]
    departmentRequirements: DepartmentCourse[]
    majorRequirements: DepartmentCourse[]
    electiveRequirements?: DepartmentCourse[]
}

export type DepartmentProgramLevelId = string

export type DepartmentProgramLevel = {
    id: DepartmentProgramLevelId
    label: string
    degreeNameAr: string
    degreeNameEn: string
    hours: string
    durationAr: string
    durationEn: string
}

export type DepartmentProgram = {
    id: string
    titleAr: string
    titleEn: string
    descriptionAr: string
    descriptionEn: string
    levels: DepartmentProgramLevel[],
    objective: {
        title: string,
        titleEn?: string,
        data: string[],
        dataEn?: string[]
    },
    studyPlan: DepartmentStudyPlan[]
}

export type DepartmentFacultyMember = {
    nameAr: string
    nameEn: string
    positionAr: string
    positionEn: string
    email: string
    phone: string
    /** مسار نسبي مخزّن (مثل `/api/uploads/...` أو `/uploads/...`) */
    image?: string
}

export type DepartmentCareerOpportunity = {
    id: string
    titleAr: string
    titleEn: string
}

export type headMessage = {
    messageAr: { __html: string | TrustedHTML; },
    messageEn: { __html: string | TrustedHTML; },
    mail: string,
    phone: string,
    writer: string,
    image?: string
}

export type DepartmentData = {
    domain: string,
    titleAr: string,
    subTitleAr: string,
    titleEn: string,
    subTitleEn: string,
    headMessage: headMessage
    programs: DepartmentProgram[]
    facultyMembers: DepartmentFacultyMember[]
    careerOpportunities?: DepartmentCareerOpportunity[]
    applyLink?: string
}

export type DepartmentMap = Record<string, DepartmentData>
