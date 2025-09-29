import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const achievements = [
  "300+ Successful Projects Across Kenya",
  "15+ Years of Local Experience",
  "Licensed by National Construction Authority",
  "Award-Winning Kenyan Construction Team",
  "Expertise in Local Building Codes",
  "Sustainable Construction Practices",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Building Kenya's Future, One Project at a Time
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Established in 2009, we have grown to become one of Kenya's most trusted construction companies. We
              understand the unique challenges of building in Kenya's diverse climate and terrain, from the coastal
              humidity of Mombasa to the highland conditions of Nairobi.
            </p>
            <p className="text-muted-foreground mb-8 text-pretty">
              Our team combines international construction standards with local expertise, using quality materials
              sourced both locally and internationally. We're committed to contributing to Kenya's Vision 2030 through
              sustainable construction practices and community development.
            </p>

            <div className="space-y-3 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{achievement}</span>
                </div>
              ))}
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Learn More About Us</Button>
          </div>

          <div className="relative">
            <img
              src="/professional-construction-team-at-work-site-wearin.jpg"
              alt="Construction team at work"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years in Kenya</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
