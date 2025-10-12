"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase, type QuoteRequest } from "@/lib/supabaseClient"
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
  const [formData, setFormData] = useState<Partial<QuoteRequest>>({})
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

  // Send confirmation email to client
  const sendConfirmationEmail = async (quoteData: Omit<QuoteRequest, 'id' | 'created_at'>) => {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Quote Request Confirmation</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Denwa Innovation Construction Company</p>
        </div>

        <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Dear ${quoteData.name},</h2>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
            Thank you for your interest in Denwa Innovation Construction Company! We have received your quote request and our team is reviewing your project details.
          </p>
          <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
            <strong>What happens next:</strong>
          </p>
          <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
            <li>Our experts will review your project requirements</li>
            <li>We'll prepare a detailed, customized quote</li>
            <li>You'll receive our response within 24 hours</li>
            <li>We'll schedule a consultation if needed</li>
          </ul>
        </div>

        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #ea580c; margin-bottom: 15px;">Your Project Summary:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;"><strong>Project Type:</strong></td><td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${quoteData.project_type || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;"><strong>Location:</strong></td><td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${quoteData.project_location}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;"><strong>Budget Range:</strong></td><td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${quoteData.budget || 'To be discussed'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;"><strong>Timeline:</strong></td><td style="padding: 8px 0; color: #1f2937; border-bottom: 1px solid #f3f4f6;">${quoteData.timeline || 'Flexible'}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td><td style="padding: 8px 0; color: #1f2937;">${quoteData.phone}</td></tr>
          </table>
        </div>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px;">
          <p style="margin: 0; color: #92400e; font-weight: 500;">
            💡 <strong>Pro Tip:</strong> Have your site plans, reference images, or specific requirements ready for our consultation call!
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 25px;">
          <p style="color: #374151; margin-bottom: 15px;">Questions? Contact us directly:</p>
          <p style="color: #ea580c; font-weight: 600; font-size: 18px; margin: 5px 0;">📞 +254 717 671 843</p>
          <p style="color: #ea580c; font-weight: 600; margin: 5px 0;">✉️ calebmuchiri04@gmail.com</p>
        </div>

        <div style="background: #1f2937; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.8;">Denwa Innovation Construction Company</p>
          <p style="margin: 0; font-size: 12px; opacity: 0.6;">Building Dreams with Precision, Quality, and 15+ Years of Experience</p>
        </div>
      </div>
    `

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: quoteData.email,
        subject: '🏗️ Quote Request Confirmation - Denwa Innovation Construction',
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send confirmation email')
    }

    return response.json()
  }

  // Send notification email to admin about new quote request
  const sendAdminNotification = async (quoteData: Omit<QuoteRequest, 'id' | 'created_at'>) => {
    const servicesText = quoteData.services_needed?.length ? 
      quoteData.services_needed.join(', ') : 'None selected'
    
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">🚨 New Quote Request</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Denwa Innovation Construction - Admin Portal</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #ea580c; margin-bottom: 15px;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600; width: 140px;">Name:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.email || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${quoteData.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Location:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.project_location}</td></tr>
          </table>
        </div>

        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ea580c; margin-bottom: 15px;">Project Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600; width: 140px;">Project Type:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.project_type || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Budget:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.budget || 'To be discussed'}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Timeline:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.timeline || 'Flexible'}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Property Size:</td><td style="padding: 8px 0; color: #1f2937;">${quoteData.property_size || 'Not specified'}</td></tr>
          </table>
          
          <h4 style="color: #374151; margin: 20px 0 10px 0;">Project Description:</h4>
          <p style="background: #f9fafb; padding: 15px; border-radius: 6px; color: #1f2937; line-height: 1.6; margin: 0;">
            ${quoteData.description}
          </p>
          
          <h4 style="color: #374151; margin: 20px 0 10px 0;">Services Requested:</h4>
          <p style="background: #fef3c7; padding: 15px; border-radius: 6px; color: #92400e; margin: 0;">
            ${servicesText}
          </p>
          
          ${quoteData.additional_info ? `
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Additional Information:</h4>
            <p style="background: #f0f9ff; padding: 15px; border-radius: 6px; color: #0c4a6e; line-height: 1.6; margin: 0;">
              ${quoteData.additional_info}
            </p>
          ` : ''}
        </div>

        <div style="background: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">⏰ Action Required</p>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Please respond to ${quoteData.name} within 24 hours at ${quoteData.phone}</p>
        </div>
      </div>
    `

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'calebmuchiri04@gmail.com', // Admin email
        subject: `🚨 New Quote Request from ${quoteData.name} - ${quoteData.project_type || 'Construction Project'}`,
        html: adminEmailHtml,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send admin notification email')
    }

    return response.json()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      
      // Collect selected services
      const services: string[] = []
      const servicesCheckboxes = event.currentTarget.querySelectorAll('input[name="services"]:checked') as NodeListOf<HTMLInputElement>
      servicesCheckboxes.forEach(checkbox => {
        services.push(checkbox.value)
      })

      // Prepare quote request data
      const quoteRequest: Omit<QuoteRequest, 'id' | 'created_at'> = {
        name: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        project_type: formData.get('projectType') as string,
        project_location: formData.get('location') as string,
        budget: formData.get('budget') as string,
        timeline: formData.get('timeline') as string,
        property_size: formData.get('propertySize') as string,
        description: formData.get('description') as string,
        services_needed: services,
        additional_info: formData.get('additionalInfo') as string,
      }

      // Validate required fields
      if (!quoteRequest.name || !quoteRequest.phone || !quoteRequest.description) {
        toast({
          title: "Missing required fields",
          description: "Please fill in your name, phone number, and project description.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl || supabaseUrl.includes('your_supabase')) {
        console.warn('Supabase not configured - simulating form submission')
        
        // Simulate successful submission for development
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Send demo emails
        try {
          // Send confirmation email to client if email provided
          if (quoteRequest.email) {
            await sendConfirmationEmail(quoteRequest)
          }
          
          // Send notification email to admin
          await sendAdminNotification(quoteRequest)
        } catch (emailError) {
          console.error('Demo email sending failed:', emailError)
        }
        
        toast({
          title: "🎉 Quote Request Submitted! (Demo Mode)",
          description: "Form submission successful. Check your email for confirmation. Configure Supabase to save data permanently.",
        })
        
        setIsSubmitting(false)
        setOpen(false)
        event.currentTarget.reset()
        setImages([])
        
        // Reload page after delay in demo mode too
        setTimeout(() => {
          window.location.reload()
        }, 2000)
        return
      }

      // Save to Supabase
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteRequest])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        toast({
          title: "Submission failed",
          description: "There was an error submitting your quote request. Please try again.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Success - Send emails (confirmation to client, notification to admin)
      try {
        // Send confirmation email to client if email provided
        if (quoteRequest.email) {
          await sendConfirmationEmail(quoteRequest)
        }
        
        // Send notification email to admin
        await sendAdminNotification(quoteRequest)
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the entire process if email fails
      }

      // Show success toast with enhanced messaging
      toast({
        title: "🎉 Quote Request Submitted Successfully!",
        description: "Thank you! We'll review your request and get back to you within 24 hours. Check your email for confirmation.",
      })

      // Close modal and reset form
      setIsSubmitting(false)
      setOpen(false)
      event.currentTarget.reset()
      setImages([])

      // Reload page after a short delay to let user see the success message
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      
    } catch (error) {
      console.error('Unexpected error:', error)
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
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
              <Input 
                id="fullName" 
                name="fullName" 
                placeholder="Enter your full name"
                required 
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder="+254 700 000 000" 
                required 
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="your.email@example.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Project Location *</Label>
              <Input 
                id="location" 
                name="location" 
                placeholder="e.g., Nairobi, Westlands" 
                required 
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
              />
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
                className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 resize-none"
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
              className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-orange-500/20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="transition-all duration-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="min-w-[140px] bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
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
