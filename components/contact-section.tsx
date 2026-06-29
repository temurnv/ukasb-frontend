'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      id="narx"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8"
      style={{ backgroundColor: '#EEF2FF' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-[family:var(--font-heading)] font-bold tracking-[-0.02em] text-[#1B2D4F] mb-3" style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}>
          Savollaringiz bormi?
        </h2>

        {/* Subtext */}
        <p className="text-base text-[#6B7280] leading-[1.75] mb-8">
          Telegram orqali yozing — 24 soat ichida javob beramiz.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3.5 rounded-full bg-[#3B82F6] text-white font-bold text-sm transition-all duration-200"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)'
            }}
          >
            Telegramda yozish →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3.5 rounded-full text-[#1B2D4F] font-bold text-sm transition-all duration-200"
            style={{
              border: '1.5px solid #1B2D4F',
              backgroundColor: 'transparent',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1B2D4F'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#1B2D4F'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)'
            }}
          >
            info@u-kasb.uz
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}
