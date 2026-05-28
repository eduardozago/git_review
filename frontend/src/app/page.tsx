import { LandingFinalCta } from "@/components/landing/final-cta"
import { LandingFooter } from "@/components/landing/footer"
import { LandingHero } from "@/components/landing/hero"
import { LandingHowItWorks } from "@/components/landing/how-it-works"
import { landingReportPreview } from "@/lib/mock/mock-report"
import { LandingNavbar } from "@/components/landing/navbar"
import { LandingPillars } from "@/components/landing/pillars"
import { LandingReportPreviewSection } from "@/components/landing/report-preview"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <LandingHero report={landingReportPreview} />
        <LandingPillars />
        <LandingHowItWorks />
        <LandingReportPreviewSection report={landingReportPreview} />
        <LandingFinalCta />
      </main>
      <LandingFooter />
    </div>
  )
}
