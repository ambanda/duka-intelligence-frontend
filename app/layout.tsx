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
  metadataBase: new URL("https://dukaintelligence.co.ke"),
  openGraph: {
    title: "Duka Intelligence",
    description:
      "The intelligence layer for African retail ecosystems.",
    url: "https://dukaintelligence.co.ke",
    siteName: "Duka Intelligence",
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
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
