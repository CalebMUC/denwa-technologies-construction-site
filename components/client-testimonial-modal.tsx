"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { submitClientTestimonial } from "@/app/actions/contact"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClientTestimonialModalProps {
  children: React.ReactNode
}

export function ClientTestimonialModal({ children }: ClientTestimonialModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    formData.append("rating", rating.toString())

    try {
      const result = await submitClientTestimonial(formData)

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message })
        // Reset form after successful submission
        setTimeout(() => {
          setIsOpen(false)
          setRating(0)
          setSubmitStatus(null)
        }, 2000)
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Share Your Experience
          </DialogTitle>
          <DialogDescription>
            Help other clients by sharing your experience with our construction services. This form is only for clients
            with completed projects.
          </DialogDescription>
        </DialogHeader>

        {submitStatus && (
          <Alert
            className={submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
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

        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Full Name *</Label>
              <Input id="clientName" name="clientName" placeholder="John Doe" required disabled={isSubmitting} />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email Address *</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                type="tel"
                placeholder="+254 700 000 000"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="projectCompletionDate">Project Completion Date</Label>
              <Input id="projectCompletionDate" name="projectCompletionDate" type="date" disabled={isSubmitting} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Input
                id="projectType"
                name="projectType"
                placeholder="e.g., Residential Home, Office Building"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="location">Project Location</Label>
              <Input id="location" name="location" placeholder="e.g., Nairobi, Mombasa" disabled={isSubmitting} />
            </div>
          </div>

          <div>
            <Label>Rating *</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  disabled={isSubmitting}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && `${rating} star${rating > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="testimonial">Your Testimonial *</Label>
            <Textarea
              id="testimonial"
              name="testimonial"
              placeholder="Share your experience working with us. What did you like about our service? How was the quality of work? Would you recommend us to others?"
              className="min-h-[120px]"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Verification Notice</h4>
            <p className="text-sm text-muted-foreground">
              By submitting this testimonial, you confirm that you are a genuine client with a completed project. We may
              contact you to verify your testimonial before publishing it on our website.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0} className="flex-1">
              {isSubmitting ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
