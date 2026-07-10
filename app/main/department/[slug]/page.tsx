import DepartmentCTA from "@/components/department/CTA"
import CareerOpportunities from "@/components/department/CareerOpportunitiesEditable"
import DepartmentOrganizationalChart from "@/components/department/DepartmentOrganizationalChart"
import FacultyMember from "@/components/department/FacultyEditable"
import DepartmentHero from "@/components/department/HeroEditable"
import HeadMessage from "@/components/department/MessageEditable"
import Programs from "@/components/department/ProgramsEditable"
import dbConnect from "@/lib/dbConnect"
import { getSession } from "@/lib/auth"
import { normalizeHeadMessage } from "@/lib/department-public"
import { DepartmentModel } from "@/models/Department"
import type { DepartmentData } from "@/types/department"
import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function DynamicDepartment(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params

    await dbConnect()
    const department = await DepartmentModel.findOne({ domain: slug }).lean()

    if (!department) {
        notFound()
    }

    const departmentData = JSON.parse(JSON.stringify(department)) as DepartmentData

    const headNormalized = normalizeHeadMessage(departmentData.headMessage)
    const programsList = Array.isArray(departmentData.programs) ? departmentData.programs : []

    const local = await getLocale()
    const title = local == "en" ? departmentData.titleEn : departmentData.titleAr
    const subTitle = local == "en" ? departmentData.subTitleEn : departmentData.subTitleAr

    const dataForPrograms: DepartmentData = {
        ...departmentData,
        programs: programsList,
    }

    // Check admin
    const session = await getSession()
    const raw = process.env.ADMIN_EMAILS || ""
    const allowed = raw
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
    const isAdmin =
        allowed.length === 0 ||
        (session?.email ? allowed.includes(session.email.toLowerCase()) : false)

    return (
        <div>
            <DepartmentHero
                title={title}
                subTitle={subTitle}
                titleAr={departmentData.titleAr}
                titleEn={departmentData.titleEn}
                subTitleAr={departmentData.subTitleAr}
                subTitleEn={departmentData.subTitleEn}
                departmentDomain={slug}
                isAdmin={isAdmin}
                applyLink={departmentData.applyLink}
            />
            {headNormalized ? (
                <HeadMessage
                    message={headNormalized}
                    departmentDomain={slug}
                    isAdmin={isAdmin}
                />
            ) : null}
            {programsList.length > 0 ? (
                <Programs
                    data={dataForPrograms}
                    departmentDomain={slug}
                    isAdmin={isAdmin}
                />
            ) : null}
            <CareerOpportunities
                opportunities={departmentData.careerOpportunities || []}
                departmentDomain={slug}
                isAdmin={isAdmin}
            />
            {departmentData.facultyMembers && (
                <FacultyMember
                    facultyMembers={departmentData.facultyMembers}
                    departmentDomain={slug}
                    isAdmin={isAdmin}
                />
            )}
            <DepartmentOrganizationalChart departmentDomain={slug} isAdmin={isAdmin} />
            <DepartmentCTA applyLink={departmentData.applyLink} />
        </div>
    )
}