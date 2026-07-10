import {
    Globe
} from 'lucide-react';
import PillCTA from '@/components/researchPill/PillCTA';
import AboutTRC from '@/components/Research/TRC/AboutTRC';
import LoginOptionTRC from '@/components/Research/TRC/LoginOption';
import TrchHelp from '@/components/Research/TRC/TrcHelp';

export default function TRCPortalPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#254151] via-[#6096b4] to-[#254151] text-white py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                                <Globe className="size-20" />
                            </div>
                        </div>
                        <h1 className="text-6xl font-bold mb-4">بوابة عمان البحثية</h1>
                        <h2 className="text-3xl font-bold mb-6 opacity-90">The Research Council - TRC Portal</h2>
                        <p className="text-2xl opacity-95 leading-relaxed mb-4">
                            نظام إدارة المعلومات البحثية
                        </p>
                        <p className="text-xl opacity-90">
                            Research Information Management System
                        </p>
                    </div>
                </div>
            </section>

            {/* About TRC Section */}

            <AboutTRC />
            {/* Login Options Section */}

            <LoginOptionTRC />
            {/* Help Section */}
            <TrchHelp />
            {/* CTA */}
            <PillCTA />
        </div>
    );
}
