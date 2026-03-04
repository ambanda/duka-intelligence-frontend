# Duka Intelligence – Frontend MVP

Static, SEO-optimized marketing frontend for Duka Intelligence.

## Stack
- Next.js (App Router)
- Tailwind CSS
- Static Export
- Netlify hosting

## Local Development
```bash
npm install
npm run dev




import Hero from "@/components/Hero";
import Tiers from "@/components/Tiers";
import HowItWorks from "@/components/HowItWorks";
import DeliveryModes from "@/components/DeliveryModes";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Tiers />
      <HowItWorks />
      <DeliveryModes />
      <CTA />
      <Footer />
    </>
  );
}








