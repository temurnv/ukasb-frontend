'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type FilterValue = 'all' | 'kasb' | 'qobiliyat' | 'talim'

export function ArticlesList() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')
  const router = useRouter()

  const filters: { label: string; value: FilterValue }[] = [
    { label: 'Barchasi', value: 'all' },
    { label: 'Kasb tanlash', value: 'kasb' },
    { label: 'Qobiliyat', value: 'qobiliyat' },
    { label: "Ta'lim", value: 'talim' },
  ]

  const articles: {
    id: string
    value: Exclude<FilterValue, 'all'>
    category: string
    title: string
    readTime: string
  }[] = [
    {
      id: '1',
      value: 'kasb',
      category: 'KASB TANLASH',
      title: 'Farzandingizni kelajakka qanday tayyorlash kerak?',
      readTime: '5 daqiqa o\'qish',
    },
    {
      id: '2',
      value: 'qobiliyat',
      category: 'QOBILIYAT',
      title: 'Bolangizning kuchli tomonlarini qanday aniqlash mumkin?',
      readTime: '4 daqiqa o\'qish',
    },
    {
      id: '3',
      value: 'talim',
      category: "TA'LIM",
      title: 'Qaysi to\'garak va kurslarni tanlash kerak?',
      readTime: '6 daqiqa o\'qish',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <div className="pt-10 pb-16 px-4">
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <div className="flex items-center pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
          <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
            MAQOLALAR
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-[family:var(--font-heading)] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1B2D4F] mt-3">
          Ota-onalar uchun maqolalar
        </h1>

        {/* Subtext */}
        <p className="text-sm text-[#6B7280] leading-[1.75] mt-2">
          Farzandingizga to&apos;g&apos;ri yo&apos;l ko&apos;rsatish uchun foydali ma&apos;lumotlar
        </p>

        {/* Filter Chips */}
        <div className="flex gap-2 flex-wrap mt-6">
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'bg-[#1B2D4F] text-white'
                  : 'bg-white text-[#6B7280] border border-[#E8E4DA]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Articles List */}
        <motion.div
          className="flex flex-col gap-3 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles
            .filter((article) => activeFilter === 'all' || activeFilter === article.value)
            .map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                onClick={() => router.push(`/articles/${article.id}`)}
                className="bg-white rounded-[16px] px-6 py-5 border border-[#EEEBE4] cursor-pointer transition-all duration-200 flex items-start justify-between gap-3"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
                }}
                whileHover={{
                  translateY: -2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
              >
                {/* Left content */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {/* Category tag */}
                  <span className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-[0.05em]">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-[family:var(--font-heading)] text-base font-bold leading-[1.35] text-[#1B2D4F] tracking-[-0.02em]">
                    {article.title}
                  </h3>

                  {/* Read time */}
                  <p className="text-[13px] text-[#9CA3AF]">{article.readTime}</p>
                </div>

                {/* Right chevron icon */}
                <ChevronRight size={20} className="text-[#D1D5DB] flex-shrink-0 mt-0.5" />
              </motion.div>
            ))}
        </motion.div>

        {/* CTA */}
        <div
          className="flex items-center justify-between flex-wrap"
          style={{
            marginTop: '32px',
            backgroundColor: '#1B2D4F',
            borderRadius: '16px',
            padding: '24px 28px',
            gap: '16px',
          }}
        >
          <span className="text-white" style={{ fontSize: '16px', fontWeight: 700 }}>
            Hali diagnostika o&apos;tmaganmisiz?
          </span>
          <Link
            href="/register"
            className="text-white"
            style={{
              backgroundColor: '#3B82F6',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontWeight: 700,
            }}
          >
            Boshlash →
          </Link>
        </div>
      </div>
    </div>
  )
}
