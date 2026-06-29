'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Compass, TrendingUp, Palette } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Hero() {
  const { t } = useLanguage()
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0])

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidths([83, 63, 75, 90])
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const bars = [
    { label: 'Tizimlilik', score: 83 },
    { label: 'Ijodkorlik', score: 63 },
    { label: 'Muhandislik', score: 75 },
    { label: 'Yetakchilik', score: 90 },
  ]

  return (
    <section id="diagnostika" className="pt-[48px] pb-16 px-4 md:px-8" style={{ paddingTop: 'calc(96px + 48px)' }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[60%_40%] gap-12 items-start">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Amber Line and Label */}
          <div className="mb-4 flex items-center pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              KARYERA DIAGNOSTIKASI
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family:var(--font-heading)] font-black leading-[1.1] tracking-[-0.02em] text-[#1B2D4F] mb-5" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Farzandingiz kim bo&apos;lishni{' '}
            <span className="text-[#3B82F6]">bilib oling</span>
          </h1>

          {/* Body Text */}
          <p className="leading-[1.75] text-[#6B7280] max-w-md mb-7" style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>
            20 daqiqalik onlayn test — va siz darhol 14 sahifa olasiz: kuchli tomonlar,
            qobiliyatlar va qiziqishlar. Mos kasblar, qaysi to&apos;garak va kurslarni
            tanlash va keyingi qadamlar. Oddiy tilda — ham ota-onaga, ham o&apos;smirga
            tushunarli.
          </p>

          {/* Feature Pills */}
          <div className="space-y-3 mb-8">
            {[
              { Icon: Compass, title: 'Kuchli tomonlar', subtitle: "Haqiqiy iste'todlar, baholar emas" },
              { Icon: TrendingUp, title: 'Kelajak kasblari', subtitle: "5 yo'nalish tushuntirishlar bilan" },
              { Icon: Palette, title: "To'garaklar va rivojlanish", subtitle: 'Hoziroq nima qilish kerak' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-[#EEEBE4]"
              >
                <div className="w-10 h-10 bg-white rounded-lg border border-[#EEEBE4] flex items-center justify-center text-lg">
                  <feature.Icon size={20} className="text-[#1B2D4F]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B2D4F]">{feature.title}</div>
                  <div className="text-xs text-[#6B7280]">{feature.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="px-7 py-3.5 rounded-full bg-[#1B2D4F] text-white font-bold text-sm hover:bg-[#0f1d38] transition-all duration-200 active:scale-95 whitespace-nowrap text-center">
              {t('hero_btn1')}
            </Link>
            <a href="#ichida" onClick={(e) => { e.preventDefault(); document.getElementById('ichida')?.scrollIntoView({ behavior: 'smooth' }) }} className="px-7 py-3.5 rounded-full border-2 border-[#1B2D4F] text-[#1B2D4F] font-bold text-sm hover:bg-[#F5F3EE] transition-all duration-200 active:scale-95 whitespace-nowrap text-center cursor-pointer">
              {t('hero_btn2')}
            </a>
          </div>
        </motion.div>

        {/* Right Side - Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <style>{`
            @keyframes float {
              0%, 100% {
                transform: translateY(-8px) rotate(-2deg);
              }
              50% {
                transform: translateY(8px) rotate(-2deg);
              }
            }
            @keyframes shimmer {
              0% {
                background-position: -1000px 0;
              }
              100% {
                background-position: 1000px 0;
              }
            }
            .shimmer-bar {
              background: linear-gradient(90deg, #3B82F6 0%, #3B82F6 calc(100% - 80px), rgba(255,255,255,0.4) calc(100% - 80px), rgba(255,255,255,0.4) 100%), linear-gradient(90deg, #3B82F6 0%, #3B82F6 100%);
              background-size: 2000px 100%;
              animation: shimmer 2s infinite;
            }
          `}</style>
          <div className="bg-white rounded-3xl p-7 border border-[#EEEBE4] shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#EEEBE4]">
              <Compass size={20} className="text-[#1B2D4F]" />
              <span className="text-base font-semibold text-[#1B2D4F]">Kuchli tomonlar xaritasi</span>
            </div>

            {/* Bars */}
            <div className="space-y-5">
              {bars.map((bar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#1B2D4F]">{bar.label}</span>
                    <span className="text-xs font-bold text-[#1B2D4F]">{bar.score}</span>
                  </div>
                  <div className="w-full h-2 bg-[#E8EDF5] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full shimmer-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidths[idx]}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex gap-3 mt-7 pt-5 border-t border-[#EEEBE4]">
              <div className="px-3 py-2 bg-[#FEF3C7] rounded-xl text-xs">
                <div className="font-bold text-[#1B2D4F] flex items-center gap-1"><Palette size={14} /> 20 daqiqa</div>
                <div className="text-[#6B7280] text-xs">hisobot tayyor</div>
              </div>
              <div className="px-3 py-2 bg-white border border-[#EEEBE4] rounded-xl text-xs">
                <div className="font-bold text-[#1B2D4F] flex items-center gap-1"><Compass size={14} /> 4.9 / 5</div>
                <div className="text-[#6B7280] text-xs">870 ta fikr</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
