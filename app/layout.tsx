// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAssistantWidget from "@/components/FloatingAssistantWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://dukaintelligence.co.ke"),

  title: {
    default: "Duka Intelligence",
    template: "%s | Duka Intelligence",
  },

  description:
    "Duka Intelligence turns organizational data, documents, communications, and social channels into governed workspace AI assistants for teams.",

  keywords: [
    "Workspace AI Assistant",
    "AI Knowledge Layer",
    "Governed Knowledge Objects",
    "WhatsApp AI Assistant",
    "Enterprise AI Governance",
    "Knowledge API",
    "Business AI Assistant",
  ],

  icons: {
    icon: [
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "Duka Intelligence",
    description:
      "The AI knowledge layer for organizations that need governed workspace assistants.",
    url: "https://dukaintelligence.co.ke",
    siteName: "Duka Intelligence",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Duka Intelligence Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Duka Intelligence",
    url: "https://dukaintelligence.co.ke",
    logo: "https://dukaintelligence.co.ke/logo.png",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Navbar />
        {children}
        <Footer />
        <FloatingAssistantWidget />
      </body>
    </html>
  );
}
