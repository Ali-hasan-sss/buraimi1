import ResImages from '@/components/Research/ResImage';
import Intro from '@/components/researchPill/Intro';
import FinalNote from '@/components/researchPill/Note';
import PilHero from '@/components/researchPill/PilHero';
import Pillars from '@/components/researchPill/Pillars';
import PillCTA from '@/components/researchPill/PillCTA';
import {
    Microscope,
} from 'lucide-react';

// import collaborationImage from 'figma:asset/98610ddcb76d75809f3c41a69c9d56ac5a721eb3.png';
// import conferenceImage from 'figma:asset/f06ddfd92d9e7816fd1f831c3ada401f1bf7e7cd.png';

export default function ResearchPillarsPage() {


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <PilHero />

            {/* Introduction */}
            <Intro />
            {/* Research Pillars */}

            <Pillars />


            <ResImages />
            {/* Final Note */}
            <FinalNote />
            {/* CTA */}
            <PillCTA />
        </div>
    );
}
