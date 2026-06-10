'use client'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Services: [
    'UI/UX Design',
    'Frontend Development',
    'WordPress Development',
    'Technical SEO',
    'Business Automation',
    'AI Solutions',
  ],
  Company: ['About', 'Projects', 'Blog', 'Experience', 'Contact'],
}

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:sami@domain.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0F1A] border-t border-white/[0.06]">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Sami Ul Mubeen</div>
                <div className="text-brand-muted text-xs tracking-widest uppercase">Digital Product Engineer</div>
              </div>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed max-w-md mb-8">
              Transforming ideas into exceptional digital products. From UI/UX design and frontend
              engineering to SEO, automation, and AI-powered solutions.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-secondary/50 hover:bg-brand-primary/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-brand-muted text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-sm">
            © {new Date().getFullYear()} Sami Ul Mubeen. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-brand-muted text-xs hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-brand-muted text-xs hover:text-white transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-1.5 text-brand-muted text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for projects
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
