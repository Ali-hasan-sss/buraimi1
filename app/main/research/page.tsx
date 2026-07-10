import ResHero from '@/components/Research/Hero';
import ResearchAreasComp from '@/components/Research/ResearchAreas';
import ResVision from '@/components/Research/ResVision';
export default function ResearchPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <ResHero />
            {/* Research Areas Grid */}
            <ResearchAreasComp />

            {/* Research Vision Section */}
            <ResVision />
        </div>
    );
}
