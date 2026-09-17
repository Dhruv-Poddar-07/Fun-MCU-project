import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import MatrixRain from './MatrixRain'
import { useState } from 'react'

const phases = [
  { phase: "Phase One", years: "2008 – 2012", desc: "Iron Man launches the MCU, building through Thor and Captain America to the first Avengers team-up.", movies: ["Iron Man", "The Incredible Hulk", "Iron Man 2", "Thor", "Captain America: The First Avenger", "The Avengers"] },
  { phase: "Phase Two", years: "2013 – 2015", desc: "Iron Man 3, Thor: The Dark World, Guardians of the Galaxy, and Age of Ultron expand the universe beyond Earth.", movies: ["Iron Man 3", "Thor: The Dark World", "Captain America: The Winter Soldier", "Guardians of the Galaxy", "Avengers: Age of Ultron", "Ant-Man"] },
  { phase: "Phase Three", years: "2016 – 2019", desc: "Civil War, Black Panther, and Infinity War build to Endgame — the climax of the Infinity Saga.", movies: ["Captain America: Civil War", "Doctor Strange", "Guardians Vol. 2", "Spider-Man: Homecoming", "Thor: Ragnarok", "Black Panther", "Avengers: Infinity War", "Ant-Man and the Wasp", "Captain Marvel", "Avengers: Endgame", "Spider-Man: Far From Home"] },
  { phase: "Phase Four", years: "2021 – 2022", desc: "Post-Endgame reset — multiverse concepts arrive with Loki, Doctor Strange 2, and Multiverse of Madness.", movies: ["Black Widow", "Shang-Chi", "Eternals", "Spider-Man: No Way Home", "Doctor Strange in the Multiverse of Madness", "Thor: Love and Thunder", "Black Panther: Wakanda Forever"] },
  { phase: "Phase Five", years: "2023 – 2025", desc: "Quantumania, Guardians Vol. 3, and Thunderbolts push toward the next Avengers-scale threat.", movies: ["Ant-Man and the Wasp: Quantumania", "Guardians Vol. 3", "The Marvels", "Deadpool & Wolverine", "Captain America: Brave New World", "Thunderbolts"] },
  { phase: "Phase Six", years: "2025 – 2027", desc: "The Multiverse Saga concludes with Avengers: Doomsday and Avengers: Secret Wars.", movies: ["The Fantastic Four: First Steps", "Spider-Man: Brand New Day", "Avengers: Doomsday", "Avengers: Secret Wars"] },
]

// detect touch device once
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const PhaseCard = ({ item, i }) => {
  const [expanded, setExpanded] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMove = (e) => {
    if (isTouchDevice) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 8)
    rotateX.set(-py * 8)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className="relative pl-6 sm:pl-8 cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
      onClick={() => setExpanded(!expanded)}
    >
      <span className="absolute -left-2 sm:-left-4 -top-4 sm:-top-6 text-5xl sm:text-6xl md:text-8xl font-black text-white/15 select-none">
        {String(i + 1).padStart(2, '0')}
      </span>

      <motion.div
        className="border-l-2 border-white/20 pl-6 sm:pl-8"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ x: 10, borderColor: "rgba(255,255,255,0.6)" }}
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest opacity-50">{item.years}</span>
        <h3 className="text-2xl sm:text-3xl font-bold mt-2">{item.phase}</h3>
        <p className="mt-3 opacity-70 max-w-xl text-sm sm:text-base">{item.desc}</p>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4 space-y-1 overflow-hidden"
            >
              {item.movies.map((m) => (
                <li key={m} className="opacity-60 text-xs sm:text-sm">— {m}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const Section2 = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (isTouchDevice) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const glow1X = useTransform(mouseX, (v) => v - 250)
  const glow1Y = useTransform(mouseY, (v) => v - 250)
  const glow2X = useTransform(mouseX, (v) => v - 150)
  const glow2Y = useTransform(mouseY, (v) => v - 150)

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-neutral-950 text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <MatrixRain columns={isTouchDevice ? 20 : 50} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

      {!isTouchDevice && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none"
            style={{ x: glow1X, y: glow1Y }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none"
            style={{ x: glow2X, y: glow2Y }}
          />
        </>
      )}

      <div className="relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The Marvel Timeline
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-20">
          {phases.map((item, i) => (
            <PhaseCard key={item.phase} item={item} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section2