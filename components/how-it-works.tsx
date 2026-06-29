'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      number: 1,
      title: 'Savollarga javob bering',
      description: '20 daqiqa onlayn, qulay vaqtda. Oddiy savollar — javob bolaning o\'si yoki siz bilan birga beradi.',
      chip: '20 daq · onlayn',
    },
    {
      number: 2,
      title: '14 sahifani darhol oling',
      description: 'To\'liq hisobot mualliflik metodikasi bo\'yicha avtomatik tuziladi. Hech qanday kutish yo\'q.',
      chip: 'darhol · 14 sahifa',
    },
    {
      number: 3,
      title: 'Reja bo\'yicha harakat qiling',
      description: 'Tayyor tavsiyalar: kasblar, to\'garaklar, kurslar va rivojlanish qadamlari.',
      chip: 'reja · qo\'lda',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      id="qanday"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8"
      style={{ backgroundColor: '#EEF2FF' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="mb-3 flex items-center justify-center md:justify-start pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              QANDAY ISHLAYDI
            </span>
          </div>
          <h2 className="font-[family:var(--font-heading)] font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2" style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}>
            Uch oddiy qadam — <span className="text-[#3B82F6]">va reja qo&apos;lingizda</span>
          </h2>
          <p className="text-base text-[#6B7280] leading-[1.75]">
            Hech qanday uchrashuv va haftalar kutish yo&apos;q. Hammasi onlayn, natija darhol.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="bg-white rounded-3xl p-8 border border-[#EEEBE4] transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)' }}
              whileHover={{
                translateY: -2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Circle Number */}
              <div className="w-12 h-12 bg-[#1B2D4F] text-white rounded-full flex items-center justify-center text-lg font-bold mb-6">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="font-[family:var(--font-heading)] text-xl font-bold tracking-[-0.02em] text-[#1B2D4F] mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-[#6B7280] leading-[1.75] mb-6">{step.description}</p>

              {/* Chip */}
              <div className="inline-block px-4 py-2 bg-[#1B2D4F] text-white rounded-full text-xs font-semibold">
                {step.chip}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
