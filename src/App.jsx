import React from 'react'
import {motion,useMotionValue,useTransform} from 'framer-motion'

import CanvasEffect from './CanvasEffect'
import ScratchCanvas from './ScratchCanvas'
import CustomCursor from './CustomCursor'
import Section2 from './Section2'
import AvengersSection from './AvengersSection'
import StonesSection from './StonesSection'
import VillainsSection from './VillainsSection'

// ======================================================
// SECTION 2
// Mouse-following glow + Marvel Timeline
// ======================================================



const App = () => {
  return (
    <div>

      <CustomCursor />

      <CanvasEffect />

      <div className="h-screen relative overflow-hidden bg-black text-white">

        {/* HERO VIDEO */}
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <ScratchCanvas />
        {/* HERO CONTENT */}
        <div className="relative z-30 h-full flex flex-col justify-end items-start p-12 pb-32 pointer-events-none">
          {/* TITLE */}
          <motion.h1
            className="text-7xl font-bold tracking-tight"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            Your Name / Studio
          </motion.h1>
          {/* TAGLINE */}
          <motion.p
            className="text-lg mt-4 opacity-70"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            Tagline goes here
          </motion.p>
          {/* EXPLORE BUTTON */}
          <motion.button
            className="mt-8 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors magnetic-target pointer-events-auto"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut",
            }}
          >
            Explore
          </motion.button>

        </div>

      </div>
      <Section2 />
      <AvengersSection />
      <StonesSection />
      <VillainsSection />

    </div>
  )
}


export default App