// Email service utility for sending contact form messages
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectLocation: string
  projectType: string
  message: string
}

export interface TestimonialData {
  clientName: string
  projectType: string
  location: string
  rating: number
  testimonial: string
  projectCompletionDate: string
  clientEmail: string
  clientPhone: string
}

// Simple email sending function - can be replaced with actual email service
export async function sendContactEmail(data: ContactFormData) {
  // In a real implementation, you would use services like:
  // - Resend (recommended for Next.js)
  // - SendGrid
  // - Nodemailer with SMTP
  // - AWS SES

  try {
    // For now, we'll simulate email sending
    // Replace this with actual email service implementation
    console.log("Sending contact email:", data)

    const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

const response = await fetch(`${baseUrl}/api/send-email`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: process.env.CONTACT_EMAIL || "info@kenyaconstruction.co.ke",
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Project Location:</strong> ${data.projectLocation}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  }),
})

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, message: "Failed to send email" }
  }
}

export async function submitTestimonial(data: TestimonialData) {
  try {
    // In a real implementation, you would:
    // 1. Verify the client has a completed project
    // 2. Store the testimonial in a database
    // 3. Send notification to admin for approval

    console.log("Submitting testimonial:", data)

    // For now, we'll simulate testimonial submission
    return { success: true, message: "Testimonial submitted for review" }
  } catch (error) {
    console.error("Testimonial submission failed:", error)
    return { success: false, message: "Failed to submit testimonial" }
  }
}
