import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, budget, projectType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'sami@domain.com'

    if (resendApiKey) {
      const emailBody = `
New project inquiry from your portfolio.

From: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Budget: ${budget || 'Not provided'}
Project Type: ${projectType || 'Not provided'}

Message:
${message}

---
Sent via portfolio contact form
      `.trim()

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <noreply@yourdomain.com>',
          to: [contactEmail],
          reply_to: email,
          subject: `New Project Inquiry from ${name} — ${projectType || 'Portfolio'}`,
          text: emailBody,
          html: `
            <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; background: #0A0F1A; color: #F8FAFC; padding: 32px; border-radius: 12px;">
              <h2 style="color: #8A2635; margin-bottom: 24px;">New Project Inquiry</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #9CA3AF; width: 120px;">From</td><td style="color: #F8FAFC; font-weight: 600;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA3AF;">Email</td><td style="color: #F8FAFC;"><a href="mailto:${email}" style="color: #8A2635;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #9CA3AF;">Company</td><td style="color: #F8FAFC;">${company || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA3AF;">Budget</td><td style="color: #F8FAFC;">${budget || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #9CA3AF;">Type</td><td style="color: #F8FAFC;">${projectType || '—'}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid #8A2635;">
                <p style="margin: 0; color: #F8FAFC; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          `,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 })
      }
    } else {
      console.log('Contact form submission (no email API configured):', { name, email, projectType })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
