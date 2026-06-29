'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Compass, Sparkles, Medal, Briefcase, GraduationCap, CalendarDays } from 'lucide-react'

export function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const cards = [
    {
      Icon: Compass,
      bgColor: '#DBEAFE',
      borderColor: '#BFDBFE',
      label: 'BO\'LIM 01',
      title: 'Profil va arxetip',
      description: 'Bolaning shaxsiy turi — masalan "Analitik-Strateg" — va 6 yo\'nalish bo\'yicha qobiliyatlar xaritasi',
    },
    {
      Icon: Sparkles,
      bgColor: '#FEF3C7',
      borderColor: '#FDE68A',
      label: 'BO\'LIM 02',
      title: 'Kuchli tomonlar',
      description: 'Eng yaxshi chiqadigan narsa — va tez o\'sish nuqtalari. "Zaifliklar" emas, balki kuch nuqtalari',
    },
    {
      Icon: Medal,
      bgColor: '#D1FAE5',
      borderColor: '#A7F3D0',
      label: 'BO\'LIM 03',
      title: 'Sport va to\'garaklar',
      description: 'Profilga mos bo\'limlar: shaxmat, dasturlash, olimpiada tayyorgarligi',
    },
    {
      Icon: Briefcase,
      bgColor: '#EDE9FE',
      borderColor: '#DDD6FE',
      label: 'BO\'LIM 04',
      title: 'O\'qish va kasblar',
      description: 'Qaysi fanlar oson, 5 ta mos kelajak kasbi va ota-onalarga amaliy maslahatlar',
    },
    {
      Icon: GraduationCap,
      bgColor: '#FCE7F3',
      borderColor: '#FBCFE8',
      label: 'BO\'LIM 05',
      title: 'Kurslar va stajirovkalar',
      description: 'Profilga to\'g\'ri keladigan kurslar bo\'yicha shaxsiy tavsiyalar',
    },
    {
      Icon: CalendarDays,
      bgColor: '#CCFBF1',
      borderColor: '#99F6E4',
      label: 'BO\'LIM 06',
      title: '90 kunlik reja',
      description: 'Qadamba-qadam: 30, 60 va 90 kun ichida nima qilish. Bosim yo\'q — oyiga bitta kichik qadam',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8 bg-[#F5F3EE]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-3 flex items-center pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              NIMA OLASIZ
            </span>
          </div>
          <h2 className="font-[family:var(--font-heading)] font-bold tracking-[-0.02em] text-[#1B2D4F]" style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}>
            Hisobotning <span className="text-[#3B82F6]">14 sahifasi ichida nima bor</span>
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white rounded-3xl p-7 border border-[#EEEBE4] transition-all duration-200 cursor-pointer hover:shadow-lg"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                borderTop: `3px solid ${card.borderColor}`,
              }}
              whileHover={{
                translateY: -2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Icon Box */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.Icon size={22} className="text-[#1B2D4F]" />
              </div>

              {/* Label */}
              <div className="text-xs font-semibold tracking-wider text-[#9CA3AF] mb-2 uppercase">
                {card.label}
              </div>

              {/* Title */}
              <h3 className="font-[family:var(--font-heading)] text-lg font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">{card.title}</h3>

              {/* Description */}
              <p className="text-sm text-[#6B7280] leading-[1.75]">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
