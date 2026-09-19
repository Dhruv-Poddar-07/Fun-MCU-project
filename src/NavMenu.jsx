import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Timeline", id: "timeline" },
  { label: "Heroes", id: "heroes" },
  { label: "Stones", id: "stones" },
  { label: "Villains", id: "villains" },
  { label: "Closing", id: "closing" },
]

const NavMenu = () => {
  const [open, setOpen] = useState(false)

  const handleNavClick = (id) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      {/* hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-[90] w-12 h-12 flex flex-col items-center justify-center gap-1.5 pointer-events-auto magnetic-target"
      >
        <span className="w-7 h-0.5 bg-white" />
        <span className="w-7 h-0.5 bg-white" />
        <span className="w-7 h-0.5 bg-white" />
      </button>

      {/* full screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black z-[95] flex flex-col items-center justify-center"
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-4xl sm:text-6xl font-bold text-white/70 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavMenu