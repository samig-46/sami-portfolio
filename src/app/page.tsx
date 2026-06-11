'use client'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import LoadingScreen from '@/components/common/LoadingScreen'
import CustomCursor from '@/components/common/CustomCursor'
import ScrollProgress from '@/components/common/ScrollProgress'
import SectionMarquee from '@/components/common/SectionMarquee'
import { useLenis } from '@/hooks/useLenis'

export default function Home() {
  useLenis()

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Reveal animations for elements with [data-reveal]
      const elements = document.querySelectorAll('[data-reveal]')
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Parallax for [data-parallax]
      const parallaxEls = document.querySelectorAll('[data-parallax]')
      parallaxEls.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.3')
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }

    initGSAP()
  }, [])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <SectionMarquee text="Design · Develop · Automate · Scale" />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Process />
        <Testimonials />
        <Blog />
        <SectionMarquee text="Let's Work Together" reverse />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
