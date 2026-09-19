import { useRef, useEffect, useState } from 'react'

const ParticleName = ({ text = "YOUR NAME" }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.parentElement.clientWidth
    const height = canvas.parentElement.clientHeight
    canvas.width = width
    canvas.height = height

    const off = document.createElement('canvas')
    off.width = width
    off.height = height
    const offCtx = off.getContext('2d')
    offCtx.fillStyle = '#fff'
    const fontSize = Math.min(width / (text.length * 0.6), 90)
    offCtx.font = `bold ${fontSize}px sans-serif`
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.fillText(text, width / 2, height / 2)

    const imageData = offCtx.getImageData(0, 0, width, height).data

    const particles = []
    const gap = 4
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const alpha = imageData[(y * width + x) * 4 + 3]
        if (alpha > 128) {
          particles.push({
            targetX: x,
            targetY: y,
            x: Math.random() * width,
            y: Math.random() * height,
          })
        }
      }
    }

    let mouse = { x: -9999, y: -9999 }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    let animationId
    const animate = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#ffffff'

  particles.forEach((p) => {
    if (p.vx === undefined) { p.vx = 0; p.vy = 0 }

    const dx = mouse.x - p.targetX
    const dy = mouse.y - p.targetY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const magnetRange = 240

    let ax = 0
    let ay = 0

    if (dist < magnetRange) {
      const strength = (1 - dist / magnetRange) ** 2
      const pullX = mouse.x - p.x
      const pullY = mouse.y - p.y
      ax = pullX * 0.02 * strength
      ay = pullY * 0.02 * strength
    } else {
      const homeX = p.targetX - p.x
      const homeY = p.targetY - p.y
      ax = homeX * 0.015
      ay = homeY * 0.015
    }

    // tiny jitter for organic feel
    ax += (Math.random() - 0.5) * 0.05
    ay += (Math.random() - 0.5) * 0.05

    p.vx = (p.vx + ax) * 0.88
    p.vy = (p.vy + ay) * 0.88
    p.x += p.vx
    p.y += p.vy

    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
    ctx.fill()
  })

  animationId = requestAnimationFrame(animate)
}       

    if (inView) {
      window.addEventListener('mousemove', handleMouseMove)
      animate()
    } else {
      ctx.clearRect(0, 0, width, height)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [text, inView])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default ParticleName