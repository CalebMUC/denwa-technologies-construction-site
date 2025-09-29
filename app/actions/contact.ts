"use server"

import { sendContactEmail, submitTestimonial, type ContactFormData, type TestimonialData } from "@/lib/email"

export async function submitContactForm(formData: FormData) {
  const data: ContactFormData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    projectLocation: formData.get("projectLocation") as string,
    projectType: formData.get("projectType") as string,
    message: formData.get("message") as string,
  }

  // Basic validation
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    return { success: false, message: "Please fill in all required fields" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, message: "Please enter a valid email address" }
  }

  return await sendContactEmail(data)
}

export async function submitClientTestimonial(formData: FormData) {
  const data: TestimonialData = {
    clientName: formData.get("clientName") as string,
    projectType: formData.get("projectType") as string,
    location: formData.get("location") as string,
    rating: Number.parseInt(formData.get("rating") as string),
    testimonial: formData.get("testimonial") as string,
    projectCompletionDate: formData.get("projectCompletionDate") as string,
    clientEmail: formData.get("clientEmail") as string,
    clientPhone: formData.get("clientPhone") as string,
  }

  // Basic validation
  if (!data.clientName || !data.testimonial || !data.rating || !data.clientEmail) {
    return { success: false, message: "Please fill in all required fields" }
  }

  return await submitTestimonial(data)
}
