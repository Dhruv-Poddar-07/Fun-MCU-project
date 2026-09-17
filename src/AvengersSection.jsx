import { motion, useMotionValue } from 'framer-motion'
import { useState } from 'react'

const heroes = [
  { name: "Thor", real: "Thor Odinson", role: "God of Thunder", powers: ["Mjolnir mastery", "Weather control", "Superhuman strength", "Asgardian durability"], img: "/avengers/thor.webp" },
  { name: "Iron Man", real: "Tony Stark", role: "Genius, Billionaire, Playboy, Philanthropist", powers: ["Powered armor suit", "AI-assisted combat", "Flight & repulsors", "Unmatched engineering"], img: "/avengers/iron-man.jpg" },
  { name: "Captain America", real: "Steve Rogers", role: "First Avenger", powers: ["Super-soldier serum", "Vibranium shield", "Peak human strength", "Tactical leadership"], img: "/avengers/captain-america.webp" },
  { name: "Hulk", real: "Bruce Banner", role: "Gamma-Powered Powerhouse", powers: ["Rage-fueled strength", "Near invulnerability", "Regenerative healing", "Genius-level intellect"], img: "/avengers/hulk.jpg" },
  { name: "Hawkeye", real: "Clint Barton", role: "World's Greatest Marksman", powers: ["Perfect accuracy", "Trick arrows", "Elite combat training", "Tactical awareness"], img: "/avengers/hawkeye.webp" },
  { name: "Black Widow", real: "Natasha Romanoff", role: "Master Spy", powers: ["Elite espionage", "Master martial artist", "Infiltration expert", "Peak human agility"], img: "/avengers/black-widow.jpg" },
  { name: "Spider-Man", real: "Peter Parker", role: "Friendly Neighborhood Hero", powers: ["Wall-crawling", "Spider-sense", "Web-slinging", "Superhuman agility"], img: "/avengers/spider-man.jpg" },
  { name: "Doctor Strange", real: "Stephen Strange", role: "Sorcerer Supreme", powers: ["Mystic arts mastery", "Time manipulation", "Astral projection", "Multiverse travel"], img: "/avengers/doctor-strange.avif" },
]

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const playSound = () => {
  const audio = new Audio('/sounds/whoosh.mp3')
  audio.volume = 0.4
  audio.play().catch(() => {})
}

const HeroCard = ({ hero }) => {
  const [hovered, setHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMove = (e) => {
    if (isTouchDevice) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 25)
    rotateX.set(-py * 25)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }
  const handleTouch = () => {
    const next = !hovered
    setHovered(next)
    if (next) playSound()
  }

  return (
    <div
      className="relative aspect-[3/4]"
      style={{ perspective: 1000 }}
      onMouseEnter={() => {
        if (isTouchDevice) return
        setHovered(true)
        playSound()
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouch}
    >
      <motion.div
        className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{
          scale: hovered ? 1.12 : 1,
          z: hovered ? 60 : 0,
          boxShadow: hovered
            ? "0 25px 60px -10px rgba(255,59,59,0.6)"
            : "0 0px 0px 0px rgba(255,59,59,0)",
        }}
        transition={{ type: "spring", stiffness: isTouchDevice ? 180 : 250, damping: isTouchDevice ? 22 : 20 }}
      >
        <img
          src={hero.img}
          alt={hero.name}
          className="w-full h-full object-cover"
        />

        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: hovered ? 0.55 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-2 sm:p-4"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-lg">{hero.name}</h3>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: hovered ? 0.1 : 0 }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-400 font-semibold mb-1">
            {hero.role}
          </span>
          <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1">{hero.name}</h3>
          <p className="text-xs sm:text-sm text-white/60 mb-2 sm:mb-3">{hero.real}</p>

          <ul className="space-y-1">
            {hero.powers.map((p, idx) => (
              <motion.li
                key={p}
                className="text-[10px] sm:text-xs text-white/85 flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
                transition={{ duration: 0.25, delay: hovered ? 0.15 + idx * 0.05 : 0 }}
              >
                <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0" />
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}

const AvengersSection = () => {
  return (
    <div className="min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-8">
      <motion.h2
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-16 md:mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        The Core Heroes
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 md:gap-14 px-4 sm:px-0">
        {heroes.map((hero, i) => (
          <motion.div
            key={hero.name}
            className="max-w-xs mx-auto w-full sm:max-w-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
          >
            <HeroCard hero={hero} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AvengersSection