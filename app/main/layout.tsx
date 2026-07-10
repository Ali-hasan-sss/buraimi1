import { Footer } from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navs/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Buraimi University",
    template: " Buraimi | %s  ",
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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
