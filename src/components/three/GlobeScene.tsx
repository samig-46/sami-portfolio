'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    // --- Network globe ---
    const count = 160
    const radius = 2.4
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const pts: THREE.Vector3[] = []
    const posArr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count)
      const phi = (2 * Math.PI * i) / goldenRatio
      const x = radius * Math.sin(theta) * Math.cos(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(theta)
      posArr[i * 3] = x; posArr[i * 3 + 1] = y; posArr[i * 3 + 2] = z
      pts.push(new THREE.Vector3(x, y, z))
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    const pointsMesh = new THREE.Points(pointsGeo, new THREE.PointsMaterial({
      color: '#C0392B', size: 0.055, sizeAttenuation: true, transparent: true, opacity: 0.95,
    }))

    const maxDist = 1.1
    const lineVerts: number[] = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3))
    const linesMesh = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      color: '#8A2635', transparent: true, opacity: 0.22,
    }))

    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.35, 32, 32),
      new THREE.MeshBasicMaterial({ color: '#6D1F2A', transparent: true, opacity: 0.04, side: THREE.BackSide }),
    )
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.008, 8, 128),
      new THREE.MeshBasicMaterial({ color: '#8A2635', transparent: true, opacity: 0.25 }),
    )
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.005, 8, 128),
      new THREE.MeshBasicMaterial({ color: '#6D1F2A', transparent: true, opacity: 0.15 }),
    )
    innerRing.rotation.set(Math.PI / 3, 0, Math.PI / 6)

    const outerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(2.7, 32, 32),
      new THREE.MeshBasicMaterial({ color: '#8A2635', transparent: true, opacity: 0.025, side: THREE.BackSide }),
    )

    const group = new THREE.Group()
    group.add(coreSphere, pointsMesh, linesMesh, outerRing, innerRing, outerGlow)
    scene.add(group)

    // --- Floating particles ---
    const pCount = 300
    const pArr = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pArr[i * 3] = (Math.random() - 0.5) * 20
      pArr[i * 3 + 1] = (Math.random() - 0.5) * 20
      pArr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: '#8A2635', size: 0.02, sizeAttenuation: true, transparent: true, opacity: 0.5,
    }))
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const pointLight = new THREE.PointLight(0x8a2635, 0.5)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const { x, y } = mouseRef.current

      group.rotation.y += 0.0025
      group.rotation.x += (y * 0.25 - group.rotation.x) * 0.05
      group.rotation.y += (x * 0.15 - group.rotation.y) * 0.01

      outerRing.rotation.z = t * 0.3
      outerRing.rotation.x = t * 0.15
      particles.rotation.y = t * 0.02
      particles.rotation.x = t * 0.01

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
