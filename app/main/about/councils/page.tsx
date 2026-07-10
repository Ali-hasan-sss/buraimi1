import CouncilsList from "@/components/about/CouncilsList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "المجالس",
    description: "مجالس كلية البريمي الجامعية - مجلس الإدارة، مجلس الأمناء، المجلس الاستشاري، مجلس الكلية",
};

export default function CouncilsPage() {
    return <CouncilsList />;
}
