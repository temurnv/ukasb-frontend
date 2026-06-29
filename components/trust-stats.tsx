'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Star } from 'lucide-react'

function CountUpNumber({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = (currentTime - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export function TrustStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-around gap-8 border border-[#EEEBE4]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)' }}>
          {/* Stat 1 */}
          <div className="text-center">
            <div className="font-[family:var(--font-heading)] text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">
              <CountUpNumber end={2800} />+
            </div>
            <p className="text-sm text-[#6B7280] leading-[1.75]">o&apos;smirlar o&apos;tdi</p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-[#EEEBE4]" />

          {/* Stat 2 */}
          <div className="text-center">
            <div className="font-[family:var(--font-heading)] text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">
              <CountUpNumber end={97} />%
            </div>
            <p className="text-sm text-[#6B7280] leading-[1.75]">ota-onalar tavsiya qiladi</p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-[#EEEBE4]" />

          {/* Stat 3 */}
          <div className="text-center">
            <div className="font-[family:var(--font-heading)] text-4xl md:text-5xl font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2 flex items-center justify-center gap-2">
              <Star size={32} className="text-[#D4A017]" fill="#D4A017" /> 4.9
            </div>
            <p className="text-sm text-[#6B7280] leading-[1.75]">870 ta fikr bo&apos;yicha</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
