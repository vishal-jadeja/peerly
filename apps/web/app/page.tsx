import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ProofSection from "@/components/landing/ProofSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProcessSection />
        <ProofSection />
        <PlatformsSection />
        <CTASection />
      </main>
    </div>
  );
}
