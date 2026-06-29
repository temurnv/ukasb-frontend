'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AnalyzingScreen() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push('/results')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  const steps = [
    {
      number: 1,
      title: "Ko'nikmalar tahlili",
      subtitle: 'Kuchli tomonlar aniqlanmoqda',
      active: true,
    },
    {
      number: 2,
      title: 'Kasb moslamasi',
      subtitle: 'Eng mos kasblar tanlanmoqda',
      active: false,
    },
    {
      number: 3,
      title: 'Hisobot tayyorlanmoqda',
      subtitle: '14 sahifalik PDF yozilmoqda',
      active: false,
    },
  ]

  return (
    <section className="min-h-screen w-full flex items-center justify-center pt-[96px] pb-8 px-4 bg-[#F5F3EE]">
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .pulse-circle {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="flex gap-5 max-w-2xl w-full">
        {/* Left Card - Spinner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white rounded-[20px] p-10 shadow-sm flex flex-col items-center justify-center"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          {/* Spinner */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg
              className="w-14 h-14 spinner"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Track */}
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="#E8EDF5"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Spinning segment */}
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="41 163"
                fill="none"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-[22px] font-bold text-[#1B2D4F]">
            Tahlil qilinmoqda…
          </h2>

          {/* Subtext */}
          <p className="mt-2 text-[14px] text-[#6B7280] leading-[1.75] max-w-xs">
            Bu 10–30 soniya davom etadi. Sahifani yopmang.
          </p>

          {/* Countdown */}
          <p className="mt-3 text-[13px] font-medium text-[#3B82F6]">
            {countdown} soniyada natijalar…
          </p>
        </motion.div>

        {/* Right Card - Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 bg-white rounded-[20px] p-8 shadow-sm"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          {/* Label */}
          <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-[0.1em] mb-5">
            NIMA BO'LYAPTI
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                {/* Number Circle */}
                <motion.div
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold ${
                    step.active
                      ? 'bg-[#3B82F6] text-white pulse-circle'
                      : 'bg-[#E8EDF5] text-[#9CA3AF]'
                  }`}
                >
                  {step.number}
                </motion.div>

                {/* Text Block */}
                <div className={step.active ? '' : 'opacity-60'}>
                  <div className="text-[14px] font-bold text-[#1B2D4F]">
                    {step.title}
                  </div>
                  <div className="text-[12px] text-[#6B7280] leading-[1.75] mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
