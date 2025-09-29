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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileImage, Calculator } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GetQuoteModalProps {
  children: React.ReactNode
}

export function GetQuoteModal({ children }: GetQuoteModalProps) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validImages = files.filter((file) => file.type.startsWith("image/"))

    if (validImages.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please upload only image files",
        variant: "destructive",
      })
    }

    setImages((prev) => [...prev, ...validImages].slice(0, 10)) // Max 10 images
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Quote request submitted!",
      description: "We'll get back to you within 24 hours with a detailed quote.",
    })

    setIsSubmitting(false)
    setOpen(false)

    // Reset form
    event.currentTarget.reset()
    setImages([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            Get Your Construction Quote
          </DialogTitle>
          <DialogDescription>
            Tell us about your project and upload reference images. We'll provide you with a detailed quote within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+254 700 000 000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Project Location *</Label>
              <Input id="location" name="location" placeholder="e.g., Nairobi, Westlands" required />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select name="projectType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-new">New Residential Building</SelectItem>
                    <SelectItem value="residential-renovation">Home Renovation</SelectItem>
                    <SelectItem value="commercial-new">New Commercial Building</SelectItem>
                    <SelectItem value="commercial-renovation">Commercial Renovation</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure Project</SelectItem>
                    <SelectItem value="industrial">Industrial Construction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget (KES)</Label>
                <Select name="budget">
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under 1M</SelectItem>
                    <SelectItem value="1m-5m">1M - 5M</SelectItem>
                    <SelectItem value="5m-10m">5M - 10M</SelectItem>
                    <SelectItem value="10m-50m">10M - 50M</SelectItem>
                    <SelectItem value="over-50m">Over 50M</SelectItem>
                    <SelectItem value="discuss">Prefer to discuss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Select name="timeline">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="over-1year">Over 1 year</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertySize">Property/Plot Size</Label>
                <Input id="propertySize" name="propertySize" placeholder="e.g., 50x100 feet, 0.5 acres" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please describe your project in detail. Include number of rooms, floors, specific requirements, materials preferences, etc."
                className="min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Services Needed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services Needed</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Architectural Design",
                "Structural Engineering",
                "Construction",
                "Project Management",
                "Interior Design",
                "Electrical Work",
                "Plumbing",
                "Landscaping",
                "Permits & Approvals",
              ].map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox id={service} name="services" value={service} />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Images</h3>
            <p className="text-sm text-muted-foreground">
              Upload reference images, site photos, or inspiration pictures (Max 10 images, 5MB each)
            </p>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label htmlFor="images" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">Click to upload images</span>
                  <span className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 5MB each</span>
                </div>
              </Label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="p-2">
                      <div className="aspect-square relative rounded-md overflow-hidden bg-muted">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-center mt-1 truncate">{image.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Any specific requirements, concerns, or questions you'd like us to address?"
              className="min-h-[80px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FileImage className="mr-2 h-4 w-4" />
                  Get Quote
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
