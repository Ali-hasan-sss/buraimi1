"use client";

import { useMemo, useState } from "react";
import AdvancedSearchModal from "@/components/Library/modals/AdvancedSearchModal";
import FederatedSearchModal from "@/components/Library/modals/FederatedSearchModal";
import BorrowingRulesSection from "@/components/Library/sections/BorrowingRulesSection";
import LibraryHero from "@/components/Library/sections/LibraryHero";
import LibrarySidebar from "@/components/Library/sections/LibrarySidebar";
import LibertyLinkSection from "@/components/Library/sections/LibertyLinkSection";

export type SearchTab = "basic" | "advanced" | "federated" | "browse";

export type AdvancedSearchState = {
    title: string;
    author: string;
    publisher: string;
    series: string;
    yearFrom: string;
    yearTo: string;
    searchAcross: "match" | "all";
    availableCopies: boolean;
    includeNonPhysical: boolean;
    type: string;
    gmd: string;
    branch: string;
    collection: string;
    genre: string;
    subject: string;
};

export type FederatedSearchState = {
    localLibrary: boolean;
    databases: boolean;
    wikipedia: boolean;
};

export default function LibraryPageClient() {
    const [activeTab, setActiveTab] = useState<SearchTab>("basic");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAdvancedModal, setShowAdvancedModal] = useState<boolean>(false);
    const [showFederatedModal, setShowFederatedModal] = useState<boolean>(false);

    const [advancedSearch, setAdvancedSearch] = useState<AdvancedSearchState>({
        title: "",
        author: "",
        publisher: "",
        series: "",
        yearFrom: "",
        yearTo: "",
        searchAcross: "match",
        availableCopies: false,
        includeNonPhysical: true,
        type: "all",
        gmd: "all",
        branch: "all",
        collection: "all",
        genre: "",
        subject: ""
    });

    const [federatedSearch, setFederatedSearch] = useState<FederatedSearchState>({
        localLibrary: true,
        databases: true,
        wikipedia: true
    });

    const borrowingRules = useMemo(
        () => [
            {
                type: "أعضاء هيئة التدريس",
                typeEn: "Faculty",
                items: "6 مواد",
                itemsEn: "6 items",
                period: "فصل دراسي واحد",
                periodEn: "1 Semester",
                fine: "-",
                fineEn: "-",
                color: "blue" as const
            },
            {
                type: "الموظفون",
                typeEn: "Staff",
                items: "3 مواد",
                itemsEn: "3 items",
                period: "أسبوعان",
                periodEn: "2 Weeks",
                fine: "-",
                fineEn: "-",
                color: "green" as const
            },
            {
                type: "طلاب البكالوريوس",
                typeEn: "Undergraduate Students",
                items: "3 مواد",
                itemsEn: "3 items",
                period: "أسبوعان",
                periodEn: "2 Weeks",
                fine: "200 بيسة",
                fineEn: "200 baizas",
                color: "amber" as const
            },
            {
                type: "طلاب الدراسات العليا",
                typeEn: "Postgraduate Students",
                items: "5 مواد",
                itemsEn: "5 items",
                period: "أسبوعان",
                periodEn: "2 Weeks",
                fine: "200 بيسة",
                fineEn: "200 baizas",
                color: "purple" as const
            }
        ],
        []
    );

    const newItems = useMemo(
        () => [
            { title: "Business Ethics and Corporate Governance", author: "Dr. Mohammed Al-Zadjali", year: "2024" },
            { title: "Introduction to Information Systems", author: "Dr. Fatma Al-Habsi", year: "2024" },
            { title: "Modern Management Theories", author: "Dr. Ahmed Al-Busaidi", year: "2024" },
            { title: "English Language Teaching Methods", author: "Dr. Salma Al-Kindi", year: "2024" }
        ],
        []
    );

    const handleBasicSearch = () => {
        void searchQuery;
    };

    const handleAdvancedSearch = () => {
        void advancedSearch;
        setShowAdvancedModal(false);
    };

    const handleFederatedSearch = () => {
        void federatedSearch;
        setShowFederatedModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <LibraryHero
                activeTab={activeTab}
                onChangeTab={(tab: SearchTab) => {
                    setActiveTab(tab);
                    if (tab === "advanced") setShowAdvancedModal(true);
                    if (tab === "federated") setShowFederatedModal(true);
                }}
                searchQuery={searchQuery}
                onChangeSearchQuery={setSearchQuery}
                onSubmitBasicSearch={handleBasicSearch}
            />

            <div className="container mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    <div className="space-y-6 sm:space-y-8 lg:col-span-2">
                        <BorrowingRulesSection borrowingRules={borrowingRules} />
                        <LibertyLinkSection />
                    </div>

                    <LibrarySidebar newItems={newItems} />
                </div>
            </div>

            <AdvancedSearchModal
                open={showAdvancedModal}
                onClose={() => setShowAdvancedModal(false)}
                value={advancedSearch}
                onChange={setAdvancedSearch}
                onSubmit={handleAdvancedSearch}
            />

            <FederatedSearchModal
                open={showFederatedModal}
                onClose={() => setShowFederatedModal(false)}
                value={federatedSearch}
                onChange={setFederatedSearch}
                onSubmit={handleFederatedSearch}
            />
        </div>
    );
}
