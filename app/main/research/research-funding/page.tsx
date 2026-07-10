import FundHero from '@/components/Research/Fund/FundHero';
import ResImages from '@/components/Research/ResImage';
import PillCTA from '@/components/researchPill/PillCTA';
import FundIntro from '@/components/Research/Fund/FundIntro';
import FundFin from '@/components/Research/Fund/FundFin';
import FundType from '@/components/Research/Fund/FundType';
import FundHow from '@/components/Research/Fund/FundHow';

export default function ResearchFundingPage() {


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}

            <FundHero />
            {/* Research Funding Introduction */}
            <FundIntro />
            {/* Financial Aid and Grants */}
            <FundFin />

            {/* Funding Types */}
            <FundType />
            {/* Images Gallery */}
            <ResImages />
            {/* How to Apply Section */}
            <FundHow />
            {/* CTA */}
            <PillCTA />
        </div>
    );
}
