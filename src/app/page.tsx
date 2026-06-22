"use client";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Experiences } from "@/components/sections/experiences";
import { Pricing } from "@/components/sections/pricing";
import { Customization } from "@/components/sections/customization";
import { CaseStudies } from "@/components/sections/case-studies";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Experiences />
        <Pricing />
        <Customization />
        <CaseStudies />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}