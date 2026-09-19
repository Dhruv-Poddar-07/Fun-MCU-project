import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { useState } from 'react'

const stones = [
  { name: "Space Stone", color: "#266EF6", glow: "rgba(59,130,246,0.7)", artifact: "The Tesseract", power: "Grants control over space itself — instant teleportation across galaxies, opening portals, and folding distance.", firstSeen: "Captain America: The First Avenger (2011)", holder: "Red Skull → Hydra → Avengers → Thanos" },
  { name: "Mind Stone", color: "#eab308", glow: "rgba(234,179,8,0.7)", artifact: "Loki's Scepter", power: "Manipulates minds, grants psychic abilities, and gave birth to Vision's synthetic consciousness.", firstSeen: "The Avengers (2012)", holder: "Loki → Hydra → Vision → Thanos" },
  { name: "Reality Stone", color: "#ef4444", glow: "rgba(239,68,68,0.7)", artifact: "The Aether", power: "Warps reality itself, turning fiction into fact — matter, energy, and physics bend to its will.", firstSeen: "Thor: The Dark World (2013)", holder: "Malekith → The Collector → Thanos" },
  { name: "Power Stone", color: "#a855f7", glow: "rgba(168,85,247,0.7)", artifact: "The Orb", power: "Pure destructive energy strong enough to annihilate entire planets in a single blast.", firstSeen: "Guardians of the Galaxy (2014)", holder: "Xandar → Ronan → Nova Corps → Thanos" },
  { name: "Time Stone", color: "#22c55e", glow: "rgba(34,197,94,0.7)", artifact: "Eye of Agamotto", power: "Controls the flow of time — rewind, fast-forward, or freeze moments entirely.", firstSeen: "Doctor Strange (2016)", holder: "Ancient One → Doctor Strange → Thanos" },
  { name: "Soul Stone", color: "#f97316", glow: "rgba(249,115,22,0.7)", artifact: "Hidden on Vormir", power: "Governs life and death itself — requires the ultimate sacrifice of someone you love to claim it.", firstSeen: "Avengers: Infinity War (2018)", holder: "Red Skull (guardian) → Thanos" },
]

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const gemClip = "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)"

const Stone = ({ stone, onClick, collected }) => {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMove = (e) => {
    if (isTouchDevice) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 45)
    rotateX.set(-py * 45)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <div style={{ perspective: 700 }}>
        <motion.div
          className="w-28 h-28 sm:w-36 sm:h-36 relative"
          style={{
            clipPath: gemClip,
            background: `linear-gradient(135deg, ${stone.color}, ${stone.color}dd, #ffffff33)`,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          animate={{
            boxShadow: [
              `0 0 25px 6px ${stone.glow}`,
              `0 0 45px 18px ${stone.glow}`,
              `0 0 25px 6px ${stone.glow}`,
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
        >
          <div
            className="absolute inset-2 opacity-40"
            style={{
              clipPath: gemClip,
              background: `linear-gradient(135deg, #ffffff88, transparent 60%)`,
            }}
          />

          {collected && (
            <motion.div
              className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
      </div>
      <span className="text-sm sm:text-base text-white/70 text-center">{stone.name}</span>
    </motion.div>
  )
}

const StonesSection = () => {
  const [activeStone, setActiveStone] = useState(null)
  const [collected, setCollected] = useState([])

  const handleStoneClick = (stone) => {
    setActiveStone(stone)
    if (!collected.includes(stone.name)) {
      setCollected([...collected, stone.name])
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
      <motion.h2
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        The Infinity Stones
      </motion.h2>

      <p className="text-center text-white/50 text-sm mb-12 sm:mb-16">
        {collected.length} / 6 stones discovered — click to reveal
      </p>

      <div className="flex flex-wrap justify-center gap-10 sm:gap-16 max-w-4xl mx-auto">
        {stones.map((stone) => (
          <Stone
            key={stone.name}
            stone={stone}
            collected={collected.includes(stone.name)}
            onClick={() => handleStoneClick(stone)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeStone && (
          <motion.div
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStone(null)}
          >
            {/* burst particles */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const angle = (idx / 12) * Math.PI * 2
              return (
                <motion.div
                  key={idx}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeStone.color, top: "50%", left: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * 200,
                    y: Math.sin(angle) * 200,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )
            })}

            <motion.div
              className="bg-neutral-900 rounded-2xl p-6 sm:p-10 max-w-md w-full relative border-2"
              style={{ borderColor: activeStone.color, boxShadow: `0 0 60px ${activeStone.glow}` }}
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6"
                style={{
                  clipPath: gemClip,
                  background: `linear-gradient(135deg, ${activeStone.color}, ${activeStone.color}dd, #ffffff33)`,
                  boxShadow: `0 0 50px 18px ${activeStone.glow}`,
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-1">{activeStone.name}</h3>
              <p className="text-center text-white/50 text-sm mb-6">{activeStone.artifact}</p>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-white/40 uppercase text-xs tracking-widest">Power</span>
                  <p className="mt-1 text-white/85">{activeStone.power}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase text-xs tracking-widest">First Appeared</span>
                  <p className="mt-1 text-white/85">{activeStone.firstSeen}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase text-xs tracking-widest">Holders</span>
                  <p className="mt-1 text-white/85">{activeStone.holder}</p>
                </div>
              </div>

              <button
                className="mt-6 w-full py-2 border border-white/20 rounded-full text-sm hover:bg-white/10 transition-colors"
                onClick={() => setActiveStone(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StonesSection