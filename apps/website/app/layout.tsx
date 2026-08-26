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
    "Duka Intelligence unifies enterprise knowledge into a governed AI platform and powers Duka Agents that help employees find trusted answers and complete tasks in the tools they already use.",

  keywords: [
    "Duka Agents",
    "Enterprise Knowledge AI",
    "AI enterprise search",
    "Workspace AI agents",
    "Governed AI platform",
    "Social media listening AI",
    "WhatsApp AI assistant",
    "AI for operations",
    "Enterprise knowledge platform",
  ],

  icons: {
    icon: [
      { url: "/logo-icon-square.png", sizes: "512x512", type: "image/png" },
      { url: "/logo-icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/logo-icon-square.png",
    apple: [{ url: "/logo-icon-square.png", sizes: "512x512", type: "image/png" }],
  },

  openGraph: {
    title: "Duka Intelligence",
    description:
      "The Core Platform unifies enterprise knowledge. Duka Agents turn it into trusted answers, recommendations, and completed work.",
    url: "https://dukaintelligence.co.ke",
    siteName: "Duka Intelligence",
    images: [
      {
        url: "/logo-horizontal-dark.png",
        width: 1400,
        height: 520,
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

  verification: {
    other: {
      "facebook-domain-verification": "d2i4rmntakfpwt8etd6assnwblnd8x",
    },
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
    logo: "https://dukaintelligence.co.ke/logo-horizontal-dark.png",
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
