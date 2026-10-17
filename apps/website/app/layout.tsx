// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAssistantWidget from "@/components/FloatingAssistantWidget";
import { positioning } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://dukaintelligence.co.ke"),

  title: {
    default: "Duka Intelligence | Your Business Assistant on WhatsApp",
    template: "%s | Duka Intelligence",
  },

  description: positioning,

  keywords: [
    "WhatsApp business assistant",
    "WhatsApp customer self-service",
    "WhatsApp business automation",
    "WhatsApp staff operations",
    "WhatsApp payments",
    "WhatsApp front desk",
    "Customer service desk",
    "Business back office",
    "Enterprise search",
    "Business intelligence",
    "Customer journey automation",
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
    description: positioning,
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
    "@type": ["Organization", "SoftwareApplication"],
    name: "Duka Intelligence",
    url: "https://dukaintelligence.co.ke",
    logo: "https://dukaintelligence.co.ke/logo-horizontal-dark.png",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web and WhatsApp",
    description: positioning,
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
