import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import { AdmissionPageModel } from "@/models/AdmissionPage"
import { admissionPageSeed } from "@/staticData/admission-page"
import type { AdmissionPageData, AdmissionProgramCard } from "@/types/admission-page"
import { normalizeAdmissionProgram, normalizeAdmissionPrograms } from "@/lib/admission-program-normalize"

async function ensureDoc() {
    let doc = await AdmissionPageModel.findOne({}).lean()
    if (!doc) {
        await AdmissionPageModel.create(admissionPageSeed)
        doc = await AdmissionPageModel.findOne({}).lean()
        return doc
    }

    const current = doc as AdmissionPageData
    const programs = Array.isArray(current.programs) ? current.programs : []
    const mergedPrograms = normalizeAdmissionPrograms(programs as AdmissionProgramCard[])

    const needsBackfill =
        programs.length === 0 ||
        programs.some((p) => {
            const prog = p as AdmissionProgramCard
            return !Array.isArray(prog.steps) || prog.steps.length === 0 || !prog.detailHeroImageDesktop
        })

    if (needsBackfill) {
        await AdmissionPageModel.findOneAndUpdate({}, { $set: { programs: mergedPrograms } }, { new: true })
        doc = await AdmissionPageModel.findOne({}).lean()
    }

    return doc
}

export async function GET() {
    try {
        await dbConnect()
        const doc = await ensureDoc()
        const raw = doc as AdmissionPageData
        const data: AdmissionPageData = {
            ...raw,
            programs: normalizeAdmissionPrograms(
                Array.isArray(raw.programs) ? raw.programs : [],
            ),
        }
        return NextResponse.json({ ok: true, data })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json({ ok: false, message }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect()
        const body = (await req.json()) as AdmissionPageData
        body.programs = normalizeAdmissionPrograms(body.programs)
        const raw = await AdmissionPageModel.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, upsert: true },
        ).lean()
        const data: AdmissionPageData = {
            ...(raw as AdmissionPageData),
            programs: normalizeAdmissionPrograms(
                Array.isArray((raw as AdmissionPageData)?.programs)
                    ? (raw as AdmissionPageData).programs
                    : [],
            ),
        }
        return NextResponse.json({ ok: true, data })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json({ ok: false, message }, { status: 500 })
    }
}
