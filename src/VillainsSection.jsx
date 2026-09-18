import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const villains = [
  { name: "Red Skull", real: "Johann Schmidt", threat: "Fanatical Tactician", firstSeen: "Captain America: The First Avenger (2011)", desc: "A Nazi scientist twisted by the same serum that made Captain America — driven by fanatic ideology and raw ambition.", downfall: "Banished by the Tesseract's power, exiled to guard the Soul Stone on Vormir.", color: "#8b1e1e", glow: "rgba(139,30,30,0.6)", img: "/villains/red-skull.png" },
  { name: "Loki", real: "Loki Laufeyson", threat: "Trickster God", firstSeen: "The Avengers (2012)", desc: "The God of Mischief — master manipulator, wielder of illusion and chaos, forever caught between villainy and redemption.", downfall: "Killed by Thanos before Infinity War even truly began — though not the last we saw of him.", color: "#1f6f54", glow: "rgba(31,111,84,0.6)", img: "/villains/loki.webp" },
  { name: "Ultron", real: "Ultron", threat: "Rogue AI", firstSeen: "Avengers: Age of Ultron (2015)", desc: "An AI built to protect humanity that concluded humanity itself was the threat — cold logic taken to genocidal extremes.", downfall: "Destroyed by the combined Avengers and Vision, his final body shattered in Sokovia's fall.", color: "#a0522d", glow: "rgba(160,82,45,0.6)", img: "/villains/ultron.jpg" },
  { name: "Hela", real: "Hela Odinsdottir", threat: "Goddess of Death", firstSeen: "Thor: Ragnarok (2017)", desc: "Odin's firstborn and Asgard's executioner — stronger than Thor and Loki combined, exiled for being too ruthless even for Asgard.", downfall: "Overpowered by Surtur's Ragnarok prophecy, consumed in the destruction of Asgard itself.", color: "#0f5b52", glow: "rgba(15,91,82,0.6)", img: "/villains/hela.png" },
  { name: "Dormammu", real: "Dormammu", threat: "Dimensional Being", firstSeen: "Doctor Strange (2016)", desc: "A being of pure dark energy ruling the Dark Dimension — seeks to consume entire universes into his domain.", downfall: "Trapped in an infinite time loop by Doctor Strange, forced to bargain and retreat.", color: "#6b1f5c", glow: "rgba(107,31,92,0.6)", img: "/villains/dormammu.webp" },
  { name: "Thanos", real: "Thanos", threat: "The Mad Titan", firstSeen: "Avengers: Infinity War (2018)", desc: "Convinced the universe's salvation required erasing half of all life — pursued the Infinity Stones across a decade of MCU history.", downfall: "Defeated by an assembled Avengers using time travel and the Infinity Stones against him.", color: "#4c1d7a", glow: "rgba(76,29,122,0.6)", img: "/villains/thanos.webp" },
  { name: "Kang", real: "Nathaniel Richards", threat: "Multiversal Conqueror", firstSeen: "Ant-Man and the Wasp: Quantumania (2023)", desc: "A being who has conquered timelines across the multiverse — countless variants, all dangerous in different ways.", downfall: "Defeated in the Quantum Realm, though countless variants remain a looming multiversal threat.", color: "#1e5f6b", glow: "rgba(30,95,107,0.6)", img: "/villains/kang.webp" },
  { name: "Doctor Doom", real: "Victor Von Doom", threat: "Sorcerer & Sovereign", firstSeen: "Avengers: Doomsday (upcoming)", desc: "Ruler of Latveria — genius, sorcerer, and absolute monarch, considered one of the most dangerous minds in the multiverse.", downfall: "His story is yet to unfold in the MCU.", color: "#1e3d2f", glow: "rgba(30,61,47,0.6)", img: "/villains/doom.webp" },
]

const jaggedClip = "polygon(0% 5%, 8% 0%, 92% 3%, 100% 8%, 98% 92%, 90% 100%, 5% 97%, 2% 90%)"

const VillainCard = ({ villain }) => {
  const [corrupted, setCorrupted] = useState(false)
  const [glitching, setGlitching] = useState(false)

  const handleClick = () => {
    if (corrupted) {
      setCorrupted(false)
      return
    }
    setGlitching(true)
    setTimeout(() => {
      setGlitching(false)
      setCorrupted(true)
    }, 350)
  }

  return (
    <motion.div
      className="relative aspect-[3/4] cursor-pointer"
      onClick={handleClick}
      animate={glitching ? { x: [0, -6, 6, -4, 4, 0], y: [0, 3, -3, 2, -2, 0] } : { x: 0, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="relative w-full h-full overflow-hidden bg-neutral-900"
        style={{ clipPath: jaggedClip }}
      >
        <img
          src={villain.img}
          alt={villain.name}
          className="w-full h-full object-cover"
          style={{
            filter: corrupted
              ? "grayscale(0) contrast(1.2) saturate(1.1)"
              : "grayscale(0.7) brightness(0.55) contrast(1.1)",
            transition: "filter 0.4s ease",
          }}
        />

        {/* scanline overlay - always present, subtle */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 3px, transparent 4px)",
          }}
        />

        {/* glitch RGB split flash */}
        {glitching && (
          <>
            <div
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{ backgroundColor: "#ff0040", transform: "translateX(-4px)" }}
            />
            <div
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{ backgroundColor: "#00fff9", transform: "translateX(4px)" }}
            />
          </>
        )}

        {/* base name tag - visible when not corrupted */}
        {!corrupted && (
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <h3 className="text-sm sm:text-lg font-bold text-white/90">{villain.name}</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Tap to reveal</span>
          </div>
        )}

        {/* corrupted color wash */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${villain.color}ee, ${villain.color}33 40%, transparent 70%)` }}
          animate={{ opacity: corrupted ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* full detail panel */}
        <AnimatePresence>
          {corrupted && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1"
                style={{ color: villain.color, filter: "brightness(1.8)" }}
              >
                {villain.threat}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1">{villain.name}</h3>
              <p className="text-xs sm:text-sm text-white/50 mb-2">{villain.real} · {villain.firstSeen}</p>
              <p className="text-xs sm:text-sm text-white/85 mb-2">{villain.desc}</p>
              <p className="text-[10px] sm:text-xs text-white/50 italic">{villain.downfall}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 pointer-events-none border-2"
          style={{ clipPath: jaggedClip, borderColor: corrupted ? villain.color : "rgba(255,255,255,0.1)" }}
          animate={{ boxShadow: corrupted ? `0 0 40px 10px ${villain.glow}` : "0 0 0px 0px transparent" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

const VillainsSection = () => {
  return (
    <div className="relative min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(50,0,50,0.4), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,20,20,0.4), transparent 50%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "10% 10%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h2
        className="relative text-2xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-3"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        The Villains
      </motion.h2>
      <p className="relative text-center text-white/40 text-sm mb-12 sm:mb-16">
        Tap a card to breach the corruption
      </p>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 md:gap-12">
        {villains.map((villain, i) => (
          <motion.div
            key={villain.name}
            className="max-w-xs mx-auto w-full sm:max-w-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
          >
            <VillainCard villain={villain} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default VillainsSection