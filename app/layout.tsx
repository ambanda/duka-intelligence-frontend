// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dukaintelligence.co.ke"),

  title: {
    default: "Duka Intelligence",
    template: "%s | Duka Intelligence",
  },

  description:
    "Duka Intelligence builds the intelligence layer for African retail. Transform POS data into analytics-ready insights.",

  keywords: [
    "Retail Intelligence",
    "Retail Analytics as a service",
    "POS Analytics",
    "African Retail data",
    "Retail Data Africa",
    "Embedded Analytics",
    "Retail APIs",
  ],

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Duka Intelligence",
    description:
      "The intelligence layer for African retail ecosystems.",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Navbar />
        {children}
      </body>
    </html>
  );
}

