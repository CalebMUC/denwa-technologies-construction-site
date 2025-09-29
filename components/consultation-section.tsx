"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Award } from "lucide-react"
import { GetQuoteModal } from "@/components/get-quote-modal"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Get expert advice without the back-and-forth. We'll assess your project quickly and provide clear recommendations.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Consult with experienced engineers and project managers who understand Kenyan construction standards.",
  },
  {
    icon: CheckCircle,
    title: "No Obligation",
    description: "Free consultation with no strings attached. Get the information you need to make informed decisions.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Over 500+ successful projects across Kenya. We bring experience and expertise to every consultation.",
  },
]

export function ConsultationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Construction Consultation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not sure where to start with your construction project? Our experts are here to help. Get professional
            advice tailored to your specific needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 text-orange-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
              <div className="space-y-3">
                {[
                  "Project feasibility assessment",
                  "Budget estimation and cost breakdown",
                  "Timeline and milestone planning",
                  "Material recommendations",
                  "Regulatory and permit guidance",
                  "Risk assessment and mitigation",
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-left">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <GetQuoteModal
                trigger={
                  <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Book Your Free Consultation
                  </Button>
                }
              />
              <p className="text-sm text-gray-500">Usually scheduled within 24-48 hours • Available across Kenya</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-orange-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-600 mb-6">
              Whether you're planning a small renovation or a major construction project, our team is ready to help you
              bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetQuoteModal
                trigger={
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Get Detailed Quote
                  </Button>
                }
              />
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                onClick={() =>
                  window.open(
                    "https://wa.me/254700000000?text=Hi, I would like to schedule a free consultation for my construction project.",
                    "_blank",
                  )
                }
              >
                WhatsApp Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
