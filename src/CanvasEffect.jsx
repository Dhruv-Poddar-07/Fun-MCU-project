import React, { useRef, useEffect, useState } from 'react'

const CanvasEffect = () => {
  const canvasRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let pos = { x: mouse.x, y: mouse.y }
    let radius = 35
    let targetRadius = 35

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseEnter = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      pos.x = e.clientX
      pos.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)

    const buttons = document.querySelectorAll('.magnetic-target')
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => setIsHovering(true))
      btn.addEventListener('mouseleave', () => setIsHovering(false))
    })

    let animationId
    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.1
      pos.y += (mouse.y - pos.y) * 0.1
      targetRadius = isHovering ? 70 : 35
      radius += (targetRadius - radius) * 0.15

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = 'blue'
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [isHovering])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 pointer-events-none" />
}

export default CanvasEffect