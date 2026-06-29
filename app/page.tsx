import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { TrustStats } from '@/components/trust-stats'
import { WhatsInside } from '@/components/whats-inside'
import { StatsRow } from '@/components/stats-row'
import { HowItWorks } from '@/components/how-it-works'
import { FeatureCards } from '@/components/feature-cards'
import { PricingSection } from '@/components/pricing-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <Hero />
      <TrustStats />
      <WhatsInside />
      <StatsRow />
      <HowItWorks />
      <FeatureCards />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
