import AdmHero from '@/components/admission-criteria/AdmHero';
import AdmRequirements from '@/components/admission-criteria/Requirements';
import AdmInternational from '@/components/admission-criteria/International';
import AdmFeeAndFin from '@/components/admission-criteria/FeeAndFin';
import AdmScholarship from '@/components/admission-criteria/Scholarship';
import AdmOverview from '@/components/admission-criteria/AdmOverView';
import AdmRegister from '@/components/admission-criteria/AdmRegister';
import AdmCTA from '@/components/admission-criteria/AdmCTA';
import AdmGuides from '@/components/admission-criteria/AdmGuides';

export default function AdmissionDetails() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" >
            {/* Hero Section */}
            <AdmHero />
            {/* Content Sections */}
            <div className="container mx-auto px-4 xl:py-12 md:py-8 py-6 space-y-12">

                {/* Overview Section */}
                <AdmOverview />
                {/* Requirements Section */}
                <AdmRequirements />
                {/* International Students Section */}
                <AdmInternational />

                {/* Fees and Financial Aid Section */}
                <AdmFeeAndFin />
                {/* Scholarship Procedures Section */}
                <AdmScholarship />
                {/* Register Section */}
                <AdmRegister />

                <div id="student-handbook">
                    <AdmGuides />
                </div>

            </div>

            {/* Bottom CTA */}
            <AdmCTA />
        </div>
    );
}