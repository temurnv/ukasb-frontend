'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { Compass, TrendingUp, Palette, Lightbulb, Heart } from 'lucide-react'

export function WhatsInside() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const tabs = [
    { label: 'Kuchli tomonlar', Icon: Compass, id: 0 },
    { label: 'Kasblar', Icon: TrendingUp, id: 1 },
    { label: 'To\'garaklar', Icon: Palette, id: 2 },
  ]

  return (
    <motion.section
      id="ichida"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8 bg-[#F5F3EE]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              ICHIDA NIMA BOR
            </span>
          </div>
          <h2 className="font-[family:var(--font-heading)] font-bold tracking-[-0.02em] text-[#1B2D4F]" style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}>Hisobotda nima bor</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#1B2D4F] text-white'
                  : 'bg-white text-[#6B7280] border border-[#E0DDD6] hover:border-[#1B2D4F]'
              }`}
            >
              <tab.Icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-[#EEEBE4]"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)' }}
        >
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-8 md:gap-0 md:items-center">
            {/* Left Side */}
            <div className="space-y-6">
              {[
                { Icon: Compass, title: 'Kuchli tomonlar xaritasi', desc: 'Bolada eng yaxshi chiqadigan narsa' },
                { Icon: Lightbulb, title: 'Qobiliyatlar va tafakkur', desc: 'U qanday o\'ylaydi va muammolarni hal qiladi' },
                { Icon: Heart, title: 'Qiziqishlar va xobbiler', desc: 'Uni haqiqatan qiziqtiradigan narsa' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 text-[#1B2D4F]">
                    <item.Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B2D4F] tracking-[-0.02em]">{item.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-[1.75]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block h-32 bg-[#EEEBE4]" />

            {/* Right Side */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="font-[family:var(--font-heading)] text-5xl md:text-6xl font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">14</div>
              <p className="text-sm text-[#6B7280] leading-[1.75] mb-6">tayyor hisobot darhol</p>
              <Link
                href="/register"
                className="px-6 py-3 rounded-full bg-[#3B82F6] text-white font-bold text-sm transition-all duration-200 inline-block"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)' }}
              >
                20 daqiqada o&apos;tish →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
