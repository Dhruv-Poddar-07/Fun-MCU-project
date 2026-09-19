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
          const dx = mouse.x - p.targetX
          const dy = mouse.y - p.targetY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - dist / 180)
        
          const goalX = p.x + (p.targetX - p.x) * (0.02 + influence * 0.15)
          const goalY = p.y + (p.targetY - p.y) * (0.02 + influence * 0.15)
          p.x = goalX
          p.y = goalY
        
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