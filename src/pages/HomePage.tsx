import PricingSection from "@/components/home/PricingSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import Header from "@/components/layouts/Header"
import HeroSection from "@/components/home/HeroSection"
import InsightsSection from "@/components/home/InsightsSection"
import CTASection from "@/components/home/CTASection"
import Footer from "@/components/layouts/Footer"

export default function HomePage() {
  return (
    <div className="w-full bg-black text-white">
      <Header />

      <HeroSection />

      <PricingSection />

      <FeaturesSection />

      <InsightsSection />

      <CTASection />

      <Footer />
    </div>
  )
}
