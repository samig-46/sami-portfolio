import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: 'Design',
    icon: 'Palette',
    color: '#8A2635',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Prototyping', level: 90 },
      { name: 'Design Systems', level: 87 },
      { name: 'User Research', level: 85 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'Code2',
    color: '#6D1F2A',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Motion & 3D', level: 86 },
    ],
  },
  {
    id: 'cms',
    title: 'WordPress',
    icon: 'Globe',
    color: '#8A2635',
    skills: [
      { name: 'WordPress', level: 96 },
      { name: 'Custom Themes', level: 90 },
      { name: 'WooCommerce', level: 88 },
      { name: 'Elementor', level: 94 },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    icon: 'Search',
    color: '#6D1F2A',
    skills: [
      { name: 'Technical SEO', level: 92 },
      { name: 'Core Web Vitals', level: 94 },
      { name: 'Schema Markup', level: 90 },
      { name: 'Analytics', level: 88 },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: 'Workflow',
    color: '#8A2635',
    skills: [
      { name: 'Odoo CRM', level: 88 },
      { name: 'Email Automation', level: 90 },
      { name: 'API Integration', level: 83 },
      { name: 'Workflow Design', level: 85 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & ML',
    icon: 'Brain',
    color: '#6D1F2A',
    skills: [
      { name: 'AI Integration', level: 85 },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'AI Product Design', level: 88 },
      { name: 'NLP / Chatbots', level: 82 },
    ],
  },
]

export const toolbelt = [
  'Figma', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js',
  'WordPress', 'WooCommerce', 'PHP', 'Python', 'Odoo', 'Git', 'Docker',
  'Vercel', 'Cloudflare', 'Google Analytics', 'Search Console',
]

export const allSkills = skillCategories.flatMap((cat) => cat.skills)
