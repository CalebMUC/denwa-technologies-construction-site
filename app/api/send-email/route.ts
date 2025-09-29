import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Denwa Technologies", email: "calebmuchiri04@gmail.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return NextResponse.json({ success: false, error: errorData }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Brevo error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
