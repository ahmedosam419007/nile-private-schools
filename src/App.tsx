import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { SiteHeader } from './components/SiteHeader'
import { SmoothScroll } from './components/SmoothScroll'
import { AboutSection } from './components/sections/AboutSection'
import { AdmissionSection } from './components/sections/AdmissionSection'
import { ContactSection } from './components/sections/ContactSection'
import { FeaturesSection } from './components/sections/FeaturesSection'
import { StagesSection } from './components/sections/StagesSection'

function App() {
  return (
    <SmoothScroll>
      <SiteHeader />
      <main>
        <Hero />
        <AboutSection />
        <StagesSection />
        <FeaturesSection />
        <AdmissionSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

export default App
