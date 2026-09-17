import React, { useRef, useEffect } from 'react'

const ScratchCanvas = () => {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef(null)
  const midPos = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 100
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 25
      ctx.shadowColor = 'rgba(0,0,0,1)'
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
      return { x, y }
    }

    const scratchCurve = (from, mid, to) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.quadraticCurveTo(mid.x, mid.y, to.x, to.y)
      ctx.stroke()
    }

    const startDraw = (e) => {
      isDrawing.current = true
      const pos = getPos(e)
      lastPos.current = pos
      midPos.current = pos
      scratchCurve(pos, pos, pos)
    }
    const moveDraw = (e) => {
      if (!isDrawing.current) return
      const pos = getPos(e)
      const newMid = {
        x: (lastPos.current.x + pos.x) / 2,
        y: (lastPos.current.y + pos.y) / 2,
      }
      scratchCurve(midPos.current, lastPos.current, newMid)
      midPos.current = newMid
      lastPos.current = pos
    }
    const stopDraw = () => {
      isDrawing.current = false
      lastPos.current = null
      midPos.current = null
    }

    canvas.addEventListener('mousedown', startDraw)
    window.addEventListener('mousemove', moveDraw)
    window.addEventListener('mouseup', stopDraw)
    canvas.addEventListener('touchstart', startDraw)
    canvas.addEventListener('touchmove', moveDraw)
    canvas.addEventListener('touchend', stopDraw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousedown', startDraw)
      window.removeEventListener('mousemove', moveDraw)
      window.removeEventListener('mouseup', stopDraw)
      canvas.removeEventListener('touchstart', startDraw)
      canvas.removeEventListener('touchmove', moveDraw)
      canvas.removeEventListener('touchend', stopDraw)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20" />
}

export default ScratchCanvas