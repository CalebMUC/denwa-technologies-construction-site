"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Calculator, CheckCircle, AlertCircle } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"
import { submitContactForm } from "@/app/actions/contact"
import { Alert, AlertDescription } from "@/components/ui/alert"

const contactInfo = [

  {
    icon: Phone,
    title: "Phone",
    details: "+254 717671843",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@denwainnovations.co.ke",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon-Fri: 7AM-6PM, Sat: 8AM-4PM",
  },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message })
        // Reset form after successful submission
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) form.reset()
      } else {
        setSubmitStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-24"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
         
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send Us a Message</h3>

              {submitStatus && (
                <Alert
                  className={`mb-6 ${submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <form id="contact-form" action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <Input
                      name="firstName"
                      placeholder="John"
                      className="bg-background border-border"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <Input
                      name="lastName"
                      placeholder="Doe"
                      className="bg-background border-border"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background border-border"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    className="bg-background border-border"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Location</label>
                  <Input
                    name="projectLocation"
                    placeholder="e.g., Nairobi, Mombasa, Kisumu"
                    className="bg-background border-border"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                  <Input
                    name="projectType"
                    placeholder="e.g., Residential home, Office building, Warehouse"
                    className="bg-background border-border"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your construction project in Kenya..."
                    className="bg-background border-border min-h-[120px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                      <p className="text-muted-foreground">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">24/7 Emergency Services</h4>
                <p className="text-muted-foreground mb-4 text-pretty">
                  We offer round-the-clock emergency construction services across Kenya for urgent repairs and
                  structural issues.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Emergency Line: +254 717 671 843
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}
