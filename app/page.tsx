export const dynamic = "force-static";

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
