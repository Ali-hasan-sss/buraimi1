import { notFound } from "next/navigation";
import { Metadata } from "next";
import CouncilDetail from "@/components/about/CouncilDetail";

const validCouncils = [
    "board-directors",
    "board-trustees",
    "advisory-council",
    "college-council",
];

export async function generateMetadata({
    params,
}: {
    params: Promise<{ councilId: string }>;
}): Promise<Metadata> {
    const { councilId } = await params;

    const councilNames: Record<string, { ar: string; en: string }> = {
        "board-directors": { ar: "مجلس الإدارة", en: "Board of Directors" },
        "board-trustees": { ar: "مجلس الأمناء", en: "Board of Trustees" },
        "advisory-council": {
            ar: "المجلس الاستشاري",
            en: "Industrial Advisory Council",
        },
        "college-council": { ar: "مجلس الكلية", en: "College Council" },
    };

    const council = councilNames[councilId];
    if (!council) {
        return {
            title: "Not Found",
        };
    }

    return {
        title: council.ar,
        description: `تفاصيل ${council.ar} في كلية البريمي الجامعية`,
    };
}

export default async function CouncilPage({
    params,
}: {
    params: Promise<{ councilId: string }>;
}) {
    const { councilId } = await params;

    if (!validCouncils.includes(councilId)) {
        notFound();
    }

    return <CouncilDetail councilId={councilId} />;
}
