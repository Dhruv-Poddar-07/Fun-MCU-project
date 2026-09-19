import { motion } from 'framer-motion'
import ParticleName from './ParticleName'

const ClosingSection = () => {
  return (
    <div className="h-screen relative overflow-hidden bg-black text-white flex flex-col items-center justify-center px-4">
      
      {/* full-screen particle canvas, behind everything */}
      <div className="absolute inset-0 z-0">
        <ParticleName text="YOUR NAME" />
      </div>

      {/* all text content, above the canvas */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <motion.p
          className="text-sm sm:text-lg text-white/60 max-w-xl text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Every hero has an origin. Every saga, a creator.
        </motion.p>

        <motion.span
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 mt-6 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Built by
        </motion.span>

        {/* spacer so the particle name (drawn on the full canvas) has visual room here */}
        <div className="h-40 sm:h-56 w-full max-w-2xl" />

        <motion.p
          className="text-white/30 text-xs sm:text-sm mt-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          move your cursor to bring it into focus
        </motion.p>

        <motion.div
          className="flex gap-6 justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="magnetic-target px-5 py-2 border border-white/30 rounded-full text-sm hover:bg-white hover:text-black transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="magnetic-target px-5 py-2 border border-white/30 rounded-full text-sm hover:bg-white hover:text-black transition-colors">
            LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default ClosingSection