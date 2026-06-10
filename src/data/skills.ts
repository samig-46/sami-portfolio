import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: 'Design',
    icon: 'Palette',
    color: '#8A2635',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Adobe XD', level: 88 },
      { name: 'Wireframing', level: 92 },
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
      { name: 'HTML/CSS', level: 98 },
      { name: 'JavaScript', level: 93 },
      { name: 'React', level: 92 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    id: 'cms',
    title: 'CMS & WordPress',
    icon: 'Globe',
    color: '#8A2635',
    skills: [
      { name: 'WordPress', level: 96 },
      { name: 'Elementor', level: 94 },
      { name: 'Custom Themes', level: 90 },
      { name: 'WooCommerce', level: 88 },
      { name: 'PHP', level: 80 },
      { name: 'Custom Plugins', level: 82 },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    icon: 'Search',
    color: '#6D1F2A',
    skills: [
      { name: 'Technical SEO', level: 92 },
      { name: 'On-page SEO', level: 95 },
      { name: 'Core Web Vitals', level: 94 },
      { name: 'Schema Markup', level: 90 },
      { name: 'Google Analytics', level: 88 },
      { name: 'Search Console', level: 92 },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & CRM',
    icon: 'Workflow',
    color: '#8A2635',
    skills: [
      { name: 'Odoo CRM', level: 88 },
      { name: 'Email Automation', level: 90 },
      { name: 'Lead Systems', level: 87 },
      { name: 'Workflow Design', level: 85 },
      { name: 'API Integration', level: 83 },
      { name: 'Process Design', level: 88 },
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
      { name: 'Python/ML', level: 78 },
      { name: 'Computer Vision', level: 75 },
      { name: 'NLP/Chatbots', level: 82 },
    ],
  },
]

export const allSkills = skillCategories.flatMap((cat) => cat.skills)
