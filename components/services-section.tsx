import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2, Wrench, Hammer, Factory, School, ArrowRight } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description:
      "Custom homes, maisonettes, and bungalows built to Kenyan standards with modern amenities and local materials.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description:
      "Office buildings, shopping malls, and commercial complexes designed for Kenya's growing business sector.",
  },
  {
    icon: Factory,
    title: "Industrial Construction",
    description:
      "Warehouses, factories, and industrial facilities built to support Kenya's manufacturing and logistics sectors.",
  },
  {
    icon: School,
    title: "Infrastructure Projects",
    description: "Schools, hospitals, and public facilities contributing to Kenya's development and community growth.",
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with modern designs while respecting Kenyan architectural heritage and climate needs.",
  },
  {
    icon: Hammer,
    title: "Project Management",
    description:
      "End-to-end project coordination with local expertise, ensuring compliance with Kenyan building codes and regulations.",
  },
  {
    icon: Hammer,
    title: "Landscaping Gardening and Cabros",
    description:
      "End-to-end project coordination with local expertise, ensuring compliance with Kenyan building codes and regulations.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Construction Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive construction solutions tailored for Kenya's unique climate, regulations, and architectural
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-pretty mb-4">{service.description}</p>
                <GetQuoteModal>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Get Quote
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </GetQuoteModal>
                {/* </CHANGE> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Start Your Project?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get a detailed quote for your construction project in Kenya. Our experts will review your requirements and
              provide a comprehensive estimate.
            </p>
            <GetQuoteModal>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Free Detailed Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </GetQuoteModal>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}
