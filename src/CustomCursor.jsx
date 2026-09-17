import React, { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const handleMouseEnter = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)

    let animationId
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
    />
  )
}

export default CustomCursor