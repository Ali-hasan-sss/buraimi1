import ResImages from '@/components/Research/ResImage';
import PillCTA from '@/components/researchPill/PillCTA';
import CuonHero from '@/components/Research/ConsultancyResearch/CuonHero';
import CuonDefinitionSection from "@/components/Research/ConsultancyResearch/CuonDefinitionSection";
import CuonObjectivesSection from "@/components/Research/ConsultancyResearch/CuonObjectivesSection";
import CuonServiceTypesSection from "@/components/Research/ConsultancyResearch/CuonServiceTypesSection";
import CuonApplicationSection from "@/components/Research/ConsultancyResearch/CuonApplicationSection";

export default function ConsultancyResearchPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CuonHero />
            <CuonDefinitionSection />
            <CuonObjectivesSection />
            <CuonServiceTypesSection />
            <ResImages />
            <CuonApplicationSection />
            <PillCTA />
        </div>
    );
}
