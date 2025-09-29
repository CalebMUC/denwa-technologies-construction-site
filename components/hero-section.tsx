import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/construction-site-with-cranes-and-buildings-under-.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Denwa Technologies <span className="text-primary">Construction Company</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Leading construction services across Kenya with over 15 years of experience. From Nairobi to Mombasa, we
            build homes, offices, and infrastructure that stands the test of time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GetQuoteModal>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                Get Free Quote
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </GetQuoteModal>
            {/* </CHANGE> */}
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
              <Phone className="mr-2 h-4 w-4" />
              Call +254 717 671 843
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
