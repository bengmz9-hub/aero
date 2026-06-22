"use client";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Transport } from "@/components/sections/experiences";
import { Security } from "@/components/sections/pricing";
import { AirportNav } from "@/components/sections/customization";
import { FAQ } from "@/components/sections/case-studies";
import { UsefulLinks } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Transport />
        <Security />
        <AirportNav />
        <FAQ />
        <UsefulLinks />
      </main>
      <Footer />
    </div>
  );
}
