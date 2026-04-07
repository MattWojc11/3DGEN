"use client";

import {
  Navbar,
  HeroSection,
  ProcessSection,
  MaterialsSection,
  SpecSection,
  FaqSection,
  CtaSection,
  Footer,
} from '@/components/sections';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <MaterialsSection />
      <SpecSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
