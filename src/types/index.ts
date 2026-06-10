export interface Project {
  id: string
  title: string
  category: string
  tags: string[]
  description: string
  longDescription: string
  image: string
  mockupImage?: string
  liveUrl?: string
  caseStudyUrl?: string
  metrics: ProjectMetric[]
  techStack: string[]
  year: string
  featured: boolean
  color: string
}

export interface ProjectMetric {
  label: string
  value: string
  icon?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  metrics: { label: string; value: string }[]
  features: string[]
  gradient: string
}

export interface Skill {
  name: string
  level: number
  icon?: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: Skill[]
  color: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  type: 'full-time' | 'freelance' | 'internship' | 'contract'
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  project: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  slug: string
  tags: string[]
  featured: boolean
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  budget: string
  projectType: string
  message: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  details: string[]
  icon: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}
