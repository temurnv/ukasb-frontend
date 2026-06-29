'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 md:px-8 bg-[#1B2D4F]"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bugun boshlang</h2>
        <p className="text-base text-white/60 mb-8">
          20 daqiqa — va farzandingiz haqida hamma narsa aniq bo&apos;ladi.
        </p>
        <button className="px-9 py-4 rounded-full bg-[#3B82F6] text-white font-bold text-base hover:bg-[#2563EB] transition-all duration-200 active:scale-95">
          Diagnostika →
        </button>
      </div>
    </motion.section>
  )
}
