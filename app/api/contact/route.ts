import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Data shape for contact form
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()
    
    // Validate the data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hello@akhilhanda.com',
      replyTo: data.email,
      subject: `[Website Contact] ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Log the contact attempt
    console.log('[API] Contact Form: New submission from', data.email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Contact Form Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 