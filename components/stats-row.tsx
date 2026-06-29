'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function StatsRow() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { number: '20', unit: 'daq', desc: 'va natija qo\'lingizda' },
    { number: '14', unit: 'sahifa', desc: 'tushunarli hisobot' },
    { number: '5', unit: 'kasb', desc: 'kelajak tavsiyasi' },
    { number: 'Mualliflik', unit: '', desc: 'metodika va 2 800+ o\'smir' },
  ]

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 md:px-8 bg-[#F5F3EE]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-[family:var(--font-heading)] text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[#3B82F6] mb-2">
                {stat.number}
              </div>
              {stat.unit && <div className="text-sm text-[#6B7280] mb-1">{stat.unit}</div>}
              <p className="text-xs md:text-sm text-[#6B7280] leading-[1.75]">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
