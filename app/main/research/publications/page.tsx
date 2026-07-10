"use client";

import PillCTA from '@/components/researchPill/PillCTA';
import ResImages from '@/components/Research/ResImage';
import PupHero from '@/components/Research/publications/PupHero';
import PupStat from '@/components/Research/publications/PupStat';
import PupExplorerSection from "@/components/Research/publications/PupExplorerSection";
import PupDownloadSection from "@/components/Research/publications/PupDownloadSection";
import { useCustomSession } from "@/hooks/useCustomSession";

export default function PublicationsPage() {
    const { data: session } = useCustomSession();
    const isAdmin = session?.isAdmin ?? false;

    return (
        <div className="min-h-screen bg-gray-50">
            <PupHero />
            <PupStat />
            <ResImages />
            <PupExplorerSection isAdmin={isAdmin} />
            <PupDownloadSection isAdmin={isAdmin} />
            <PillCTA />
        </div>
    );
}
