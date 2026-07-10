import CTA from "@/components/graduateStudies/CTA";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <CTA />
        </>
    )
}