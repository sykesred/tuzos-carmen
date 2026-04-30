import { HeroSection } from "@/components/hero-section"
import { HomeOverview } from "@/components/home-overview"
import { ConvocatoriasSection } from "@/components/convocatorias-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeOverview />
      <ConvocatoriasSection />
    </main>
  )
}
