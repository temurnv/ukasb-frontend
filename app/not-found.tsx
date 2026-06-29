'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { useLanguage } from '@/lib/language-context'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 pt-32">
        <div className="text-center">
          <h1 className="font-[family:var(--font-heading)] text-[48px] font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">
            {t('notfound_heading')}
          </h1>
          <p className="text-base text-[#6B7280] leading-[1.75] mb-8 max-w-md mx-auto">
            {t('notfound_sub')}
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-full bg-[#1B2D4F] text-white font-bold text-sm hover:bg-[#0f1d38] transition-all active:scale-95"
          >
            {t('notfound_btn')}
          </Link>
        </div>
      </div>
    </div>
  )
}
