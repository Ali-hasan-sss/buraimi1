import AdmissionProgramDetailContent from "@/components/admission/AdmissionProgramDetailContent"

type Props = {
    params: Promise<{ slug: string }>
}

export default async function AdmissionProgramPage({ params }: Props) {
    const { slug } = await params
    return <AdmissionProgramDetailContent slug={slug} />
}
