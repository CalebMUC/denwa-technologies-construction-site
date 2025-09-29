import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Calendar } from "lucide-react"

const projects = [
  {
    title: "Westlands Office Complex",
    category: "Commercial",
    location: "Westlands, Nairobi",
    year: "2023",
    image: "/modern-glass-office.png",
    description:
      "12-story modern office complex in Westlands featuring sustainable design and smart building technology.",
    value: "KSh 850M",
  },
  {
    title: "Karen Luxury Villas",
    category: "Residential",
    location: "Karen, Nairobi",
    year: "2023",
    image: "/luxury-modern-house-with-large-windows-and-landsca.jpg",
    description: "Exclusive gated community of 24 luxury villas with modern amenities and landscaped gardens.",
    value: "KSh 1.2B",
  },
  {
    title: "Mombasa Port Warehouse",
    category: "Industrial",
    location: "Mombasa",
    year: "2022",
    image: "/large-industrial-warehouse-construction-site.jpg",
    description: "State-of-the-art cargo handling facility at Mombasa Port with advanced logistics systems.",
    value: "KSh 650M",
  },
  {
    title: "Kisumu Shopping Mall",
    category: "Commercial",
    location: "Kisumu",
    year: "2022",
    image: "/historic-brick-building-renovation-before-and-afte.jpg",
    description: "Modern 3-level shopping mall with 150 retail spaces and entertainment facilities.",
    value: "KSh 900M",
  },
  {
    title: "Nakuru Residential Estate",
    category: "Residential",
    location: "Nakuru",
    year: "2023",
    image: "/modern-residential-estate-kenya.jpg",
    description: "Affordable housing project with 200 units featuring modern design and community amenities.",
    value: "KSh 400M",
  },
  {
    title: "Eldoret Hospital Wing",
    category: "Healthcare",
    location: "Eldoret",
    year: "2023",
    image: "/modern-hospital-building-kenya.jpg",
    description: "New 5-story medical facility with advanced equipment and patient-centered design.",
    value: "KSh 750M",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Projects Across Kenya
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From Nairobi's skyline to coastal developments in Mombasa, explore our portfolio of successful construction
            projects that have shaped Kenya's infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium">
                    {project.value}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {project.year}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                <Button variant="outline" size="sm" className="group/btn bg-transparent">
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View All Projects</Button>
        </div>
      </div>
    </section>
  )
}
