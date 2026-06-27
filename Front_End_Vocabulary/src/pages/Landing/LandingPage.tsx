import HeroSection from "./sections/HeroSection";
import TrustedBySection from "./sections/TrustedBySection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import StatsSection from "./sections/StatsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import LearningModesSection from "./sections/LearningModesSection";
import PricingSection from "./sections/PricingSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <LearningModesSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
