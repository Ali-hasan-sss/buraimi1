import { getLocale } from "next-intl/server";
import ProfHero from "@/components/Research/prof/ProfHero";
import ProfIntro from "@/components/Research/prof/ProfIntro";
import SeminarsListComp, { type Seminar } from "@/components/Research/prof/SeminarsList";

async function getSeminars(): Promise<any[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/seminars`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch seminars");
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching seminars:", error);
        return [];
    }
}

export default async function ResearchPage() {
    const locale = await getLocale();
    const isAr = locale === "ar";
    const seminarsFromApi = await getSeminars();

    // Transform bilingual API data to single-language format
    const seminarsData: Seminar[] = seminarsFromApi.map((s: any) => ({
        academicYear: isAr ? s.academicYearAr : s.academicYearEn,
        department: isAr ? s.departmentAr : s.departmentEn,
        presenter: isAr ? s.presenterAr : s.presenterEn,
        title: isAr ? s.titleAr : s.titleEn,
        date: s.date,
    }));

    return (
        <main>
            <ProfHero />
            <ProfIntro />
            <SeminarsListComp seminars={seminarsData} />
        </main>
    );
}
