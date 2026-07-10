import Navbar from "@/components/global/navs/Navbar";
import type { ReactNode } from "react";

export default function FoundationCompletionExamLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
