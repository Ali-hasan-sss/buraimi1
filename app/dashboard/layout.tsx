import TopBar from "@/components/dashboard/navigation/TopBar";
import SideBar from "@/components/dashboard/navigation/SideBar";
import Breadcrumbs from "@/components/dashboard/navigation/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Buraimi University dashboard",
    template: " dashboard | %s  ",
  },
  description: "Buraimi",
  icons: {
    icon: "/assets/images/logo.webp",
    apple: "/assets/images/logo.webp",
  },
  authors: [{ name: "Buraimi" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Buraimi University",
    description: "Buraimi University",
    // url: 'https://ikar.com',
    siteName: "Buraimi",
    images: [
      {
        url: "/public/assets/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "Buraimi University",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buraimi University",
    description: "Buraimi University",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    // canonical: 'https://buraimi.edu.om',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh min-h-0 flex-col">
      <TopBar />

      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <div className="hidden h-full min-h-0 flex-shrink-0 md:flex">
          <SideBar />
        </div>
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
