'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { generateFibonacciSpherePoints } from '@/lib/utils'

interface SkillTag { label: string; category: string; color: string }

const SKILL_TAGS: SkillTag[] = [
  { label: 'React',      category: 'Frontend',   color: '#61DAFB' },
  { label: 'Next.js',    category: 'Frontend',   color: '#ffffff' },
  { label: 'Figma',      category: 'Design',     color: '#F24E1E' },
  { label: 'TypeScript', category: 'Frontend',   color: '#3178C6' },
  { label: 'Tailwind',   category: 'Frontend',   color: '#38BDF8' },
  { label: 'WordPress',  category: 'CMS',        color: '#21759B' },
  { label: 'SEO',        category: 'SEO',        color: '#4CAF50' },
  { label: 'GSAP',       category: 'Animation',  color: '#8AC34A' },
  { label: 'AI',         category: 'AI',         color: '#8A2635' },
  { label: 'Odoo',       category: 'Automation', color: '#714B67' },
  { label: 'Three.js',   category: 'Frontend',   color: '#049EF4' },
  { label: 'Python',     category: 'AI',         color: '#3776AB' },
  { label: 'Adobe XD',   category: 'Design',     color: '#FF61F6' },
  { label: 'Framer',     category: 'Animation',  color: '#05F' },
  { label: 'Node.js',    category: 'Backend',    color: '#339933' },
]

function makeLabel(text: string, color: string): THREE.Sprite {
  const w = 256, h = 48
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, w, h)
  ctx.font = '600 20px Inter, system-ui, sans-serif'
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 6, h / 2)
  const tex = new THREE.CanvasTexture(canvas)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }))
  sprite.scale.set(0.9, 0.17, 1)
  return sprite
}

export default function SkillSphere() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    const group = new THREE.Group()
    scene.add(group)

    const positions = generateFibonacciSpherePoints(SKILL_TAGS.length, 2.2)
    const dotMeshes: THREE.Mesh[] = []

    SKILL_TAGS.forEach((tag, i) => {
      const [px, py, pz] = positions[i]

      const skillGroup = new THREE.Group()
      skillGroup.position.set(px, py, pz)
      group.add(skillGroup)

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color: tag.color, transparent: true, opacity: 0.8 }),
      )
      dot.userData.index = i
      skillGroup.add(dot)
      dotMeshes.push(dot)

      const label = makeLabel(tag.label, '#cccccc')
      label.position.set(0.12, 0, 0)
      skillGroup.add(label)
    })

    // Wireframe sphere
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: '#8A2635', wireframe: true, transparent: true, opacity: 0.04 }),
    ))

    // Raycaster for hover
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredIdx = -1

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    container.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      group.rotation.y += 0.004

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(dotMeshes)
      const newIdx = hits.length > 0 ? (hits[0].object as THREE.Mesh).userData.index as number : -1

      if (newIdx !== hoveredIdx) {
        if (hoveredIdx !== -1) dotMeshes[hoveredIdx].scale.setScalar(1)
        if (newIdx !== -1) dotMeshes[newIdx].scale.setScalar(1.5)
        hoveredIdx = newIdx
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
