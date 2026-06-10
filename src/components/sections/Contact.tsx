'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, MessageCircle, Loader2 } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import GlassCard from '@/components/ui/GlassCard'
import type { ContactFormData } from '@/types'

const budgetOptions = ['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+']
const projectTypes = [
  'UI/UX Design',
  'Website Development',
  'WordPress Project',
  'SEO & Performance',
  'Business Automation',
  'AI Integration',
  'Full Digital Product',
  'Other',
]

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
}: {
  label: string
  name: keyof ContactFormData
  type?: string
  value: string
  onChange: (name: keyof ContactFormData, value: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isFloating = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full h-14 px-4 pt-5 pb-2 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm focus:outline-none focus:border-brand-secondary/50 focus:bg-white/[0.06] transition-all duration-200 peer"
        aria-label={label}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFloating
            ? 'top-2 text-[10px] text-brand-secondary tracking-wider uppercase'
            : 'top-1/2 -translate-y-1/2 text-sm text-brand-muted'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    projectType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (name: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', budget: '', projectType: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-36 bg-[#0A0F1A]">
      <div className="absolute inset-0 bg-gradient-radial from-brand-primary/[0.06] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Build Something"
          titleHighlight="Exceptional Together"
          description="Have a project in mind? I'd love to hear about it. Let's discuss how I can help you achieve your goals."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <GlassCard className="p-6 space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'sami@domain.com', href: 'mailto:sami@domain.com' },
                { icon: Phone, label: 'WhatsApp', value: '+1 (234) 567-8900', href: 'https://wa.me/12345678900' },
                { icon: MapPin, label: 'Location', value: 'Available Worldwide', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-brand-secondary" />
                  </div>
                  <div>
                    <p className="text-brand-muted text-xs">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white text-sm hover:text-brand-secondary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </GlassCard>

            {/* Calendly CTA */}
            <GlassCard className="p-6 border-brand-secondary/15 bg-brand-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={18} className="text-brand-secondary" />
                <span className="text-white font-semibold text-sm">Book a Discovery Call</span>
              </div>
              <p className="text-brand-muted text-xs leading-relaxed mb-4">
                30-minute call to discuss your project, timeline, and budget. Free, no commitment.
              </p>
              <motion.a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-sm font-medium text-white border border-brand-secondary/30 hover:border-brand-secondary/60 hover:bg-brand-primary/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar size={13} />
                Schedule Free Call
              </motion.a>
            </GlassCard>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890').replace(/[^0-9]/g, '')}?text=Hi%20Sami%2C%20I%20have%20a%20project%20I%27d%20like%20to%20discuss.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                <MessageCircle size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-green-400 transition-colors">
                  Chat on WhatsApp
                </p>
                <p className="text-brand-muted/60 text-xs">Usually replies within 2 hours</p>
              </div>
            </motion.a>

            {/* Availability indicator */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-brand-muted text-xs">Currently accepting new projects for Q1 2025</span>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                    <p className="text-brand-muted text-sm max-w-sm">
                      Thanks for reaching out. I&apos;ll review your project details and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingInput label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                      <FloatingInput label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <FloatingInput label="Company / Organization" name="company" value={form.company} onChange={handleChange} />

                    {/* Budget select */}
                    <div className="relative">
                      <select
                        value={form.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        className="w-full h-14 px-4 bg-white/[0.04] border border-white/[0.07] rounded-xl text-sm focus:outline-none focus:border-brand-secondary/50 transition-all appearance-none cursor-pointer"
                        style={{ color: form.budget ? 'white' : 'rgb(156 163 175)' }}
                      >
                        <option value="" disabled>Project Budget Range</option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-[#0D1220]">{b}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted/50">▾</div>
                    </div>

                    {/* Project type */}
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange('projectType', type)}
                          className={`h-8 px-3 rounded-lg text-xs transition-all duration-200 border ${
                            form.projectType === type
                              ? 'bg-brand-primary text-white border-brand-secondary/50'
                              : 'text-brand-muted border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={4}
                        placeholder="Tell me about your project..."
                        required
                        className="w-full px-4 py-4 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-secondary/50 focus:bg-white/[0.06] transition-all resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or email directly.</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full h-13 rounded-xl font-medium text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-shadow duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                      whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={14} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-brand-muted/40 text-xs">
                      I typically respond within 24 hours. Your information is kept confidential.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
