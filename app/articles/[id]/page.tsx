'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { useLanguage } from '@/lib/language-context'
import { useRouter, useParams } from 'next/navigation'

interface ArticleData {
  category: string
  title: string
  readTime: string
}

const articles: { [key: string]: ArticleData } = {
  '1': {
    category: 'KASB TANLASH',
    title: 'Farzandingizni kelajakka qanday tayyorlash kerak?',
    readTime: '5 daqiqa o\'qish',
  },
  '2': {
    category: 'QOBILIYAT',
    title: 'Bolangizning kuchli tomonlarini qanday aniqlash mumkin?',
    readTime: '4 daqiqa o\'qish',
  },
  '3': {
    category: 'TA\'LIM',
    title: 'Qaysi to\'garak va kurslarni tanlash kerak?',
    readTime: '6 daqiqa o\'qish',
  },
}

export default function ArticleDetail() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const article = id ? articles[id] : undefined

  if (!article) {
    router.push('/articles')
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pt-32 pb-16">
        {/* Back Link */}
        <Link
          href="/articles"
          className="text-sm text-[#6B7280] no-underline block mb-6 hover:text-[#1B2D4F] transition"
        >
          {t('back_articles')}
        </Link>

        {/* Article Card */}
        <div
          className="bg-white rounded-[20px] px-10 py-10 border border-[#EEEBE4]"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          {/* Category Tag */}
          <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-[0.05em] mb-3">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="font-[family:var(--font-heading)] text-[28px] font-bold text-[#1B2D4F] mb-2 tracking-[-0.02em]">
            {article.title}
          </h1>

          {/* Read Time */}
          <div className="text-sm text-[#9CA3AF] mb-6">
            {article.readTime}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#EEEBE4] mb-6"></div>

          {/* Body */}
          <div className="text-base text-[#4B5563] leading-[1.8]">
            Maqola matni tez orada qo'shiladi.
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 bg-[#1B2D4F] rounded-[16px] px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <h3 className="text-white text-base md:text-lg font-bold">
            Diagnostika o&apos;tmoqchimisiz?
          </h3>
          <Link
            href="/register"
            className="px-6 py-3 rounded-full bg-[#3B82F6] text-white font-bold text-sm hover:bg-[#2563EB] transition-all whitespace-nowrap"
          >
            Boshlash →
          </Link>
        </div>
      </main>
    </div>
  )
}
