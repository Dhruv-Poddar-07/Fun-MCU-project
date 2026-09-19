import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CanvasEffect from './CanvasEffect'
import ScratchCanvas from './ScratchCanvas'
import CustomCursor from './CustomCursor'
import Section2 from './Section2'
import AvengersSection from './AvengersSection'
import StonesSection from './StonesSection'
import VillainsSection from './VillainsSection'
import ClosingSection from './ClosingSection'
import NavMenu from './NavMenu'


const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const App = () => {
  const [locked, setLocked] = useState(isTouchDevice)

  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : 'auto'
  }, [locked])

  const handleExplore = () => {
    setLocked(false)
    setTimeout(() => {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div>
      <CustomCursor />
      <CanvasEffect />
      <NavMenu />

      <div id="hero" className="h-screen relative overflow-hidden bg-black text-white">
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <ScratchCanvas />

        <div className="relative z-30 h-full flex flex-col justify-end items-start p-12 pb-32 pointer-events-none">
          <motion.h1
            className="text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            MCU
          </motion.h1>
          <motion.p
            className="text-lg mt-4 opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Built in the multiverse of code.
          </motion.p>
          <motion.button
            onClick={handleExplore}
            className="mt-8 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors magnetic-target pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Explore
          </motion.button>
        </div>
      </div>

      <div id="timeline">
        <Section2 />
      </div>
      <div id="heroes">
        <AvengersSection />
      </div>
      <div id="stones">
        <StonesSection />
      </div>
      <div id="villains">
        <VillainsSection />
      </div>
      <div id="closing">
        <ClosingSection />
      </div>

    </div>
  )
}

export default App