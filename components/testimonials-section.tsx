"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"
import { ClientTestimonialModal } from "./client-testimonial-modal"

const testimonials = [
  {
    name: "David Kimani",
    role: "Homeowner, Nairobi",
    content:
      "Excellent work on our family home in Karen. The team was professional, completed on time, and the quality exceeded our expectations. Highly recommend for residential projects.",
    rating: 5,
    project: "4-Bedroom Villa",
  },
  {
    name: "Sarah Wanjiku",
    role: "Business Owner, Mombasa",
    content:
      "They built our hotel in Diani and it's been a year with no issues. Great attention to detail and they understood our coastal construction requirements perfectly.",
    rating: 5,
    project: "Boutique Hotel",
  },
  {
    name: "John Mwangi",
    role: "Developer, Kisumu",
    content:
      "Professional team that delivered our apartment complex on budget and ahead of schedule. Their project management skills are outstanding.",
    rating: 5,
    project: "Residential Complex",
  },
  {
    name: "Grace Achieng",
    role: "School Administrator, Nakuru",
    content:
      "Built our new school block with excellent craftsmanship. They worked around our schedule to minimize disruption to classes. Very satisfied with the results.",
    rating: 5,
    project: "Educational Facility",
  },
  {
    name: "Peter Ochieng",
    role: "Factory Owner, Eldoret",
    content:
      "Constructed our manufacturing facility with all the technical requirements we needed. Great understanding of industrial construction standards.",
    rating: 5,
    project: "Industrial Facility",
  },
  {
    name: "Mary Njeri",
    role: "Clinic Owner, Thika",
    content:
      "They renovated our medical clinic beautifully. Very clean work and they understood the specific needs of a healthcare facility.",
    rating: 5,
    project: "Medical Facility",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients across Kenya have to say about our
            construction services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary font-medium mt-1">Project: {testimonial.project}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Share Your Experience</h3>
            <p className="text-muted-foreground mb-6">
              Are you one of our satisfied clients? Help others by sharing your experience with our construction
              services.
            </p>
            <ClientTestimonialModal>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Your Testimonial
              </Button>
            </ClientTestimonialModal>
            <p className="text-sm text-muted-foreground mt-4">* Only available for clients with completed projects</p>
          </div>
        </div>
        {/* End of added client testimonial submission section */}

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            Join hundreds of satisfied clients across Kenya who trust us with their construction needs.
          </p>
        </div>
      </div>
    </section>
  )
}
