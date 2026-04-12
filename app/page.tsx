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
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function LandingPage() {
  return (
    <>
      <LoadingScreen />
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
    </>
  );
}
