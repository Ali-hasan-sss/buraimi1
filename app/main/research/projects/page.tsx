"use client";

import PillCTA from '@/components/researchPill/PillCTA';
import ProjHero from "@/components/Research/projects/ProjHero";
import ProjStatsSection from "@/components/Research/projects/ProjStatsSection";
import ProjExplorerSection from "@/components/Research/projects/ProjExplorerSection";
import { useCustomSession } from "@/hooks/useCustomSession";

export default function ProjectsPage() {
    const { data: session } = useCustomSession();
    const isAdmin = session?.isAdmin ?? false;

    return (
        <div className="min-h-screen bg-gray-50">
            <ProjHero />
            <ProjStatsSection />
            <ProjExplorerSection isAdmin={isAdmin} />
            <PillCTA />
        </div>
    );
}
