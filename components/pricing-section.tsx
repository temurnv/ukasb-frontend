'use client'

import Link from 'next/link'

export function PricingSection() {
  return (
    <section id="narx" style={{ backgroundColor: '#F5F3EE', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center pb-3" style={{ borderLeft: '2px solid #D4A017', paddingLeft: '10px' }}>
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              NARXLAR
            </span>
          </div>
          <h2
            className="font-[family:var(--font-heading)] font-bold tracking-[-0.02em] text-[#1B2D4F]"
            style={{ fontSize: 'clamp(22px, 4vw, 40px)' }}
          >
            Oddiy va shaffof narxlar
          </h2>
          <p className="mt-2" style={{ fontSize: '16px', color: '#6B7280' }}>
            Hech qanday yashirin to&apos;lovlar yo&apos;q.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3" style={{ gap: '16px' }}>
          {/* Card 1 - Asosiy */}
          <div
            className="bg-white flex flex-col"
            style={{ borderRadius: '20px', padding: '28px', border: '1px solid #EEEBE4' }}
          >
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.06em' }}>
              ASOSIY
            </span>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#1B2D4F', marginTop: '4px' }}>
              Bepul
            </div>
            <ul className="flex flex-col" style={{ fontSize: '13px', color: '#6B7280', gap: '8px', margin: '16px 0' }}>
              <li>✓ 1 ta test</li>
              <li>✓ PDF hisobot</li>
              <li>✓ Telegram yetkazish</li>
            </ul>
            <Link
              href="/register"
              className="w-full text-center font-bold transition-all duration-200 hover:bg-[#F5F3EE] active:scale-95 mt-auto"
              style={{
                display: 'block',
                borderRadius: '9999px',
                padding: '12px 0',
                border: '1.5px solid #1B2D4F',
                color: '#1B2D4F',
                fontSize: '14px',
              }}
            >
              Boshlash →
            </Link>
          </div>

          {/* Card 2 - Oilaviy (featured) */}
          <div
            className="bg-white flex flex-col"
            style={{ borderRadius: '20px', padding: '28px', border: '2px solid #1B2D4F' }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                }}
              >
                ENG MASHHUR
              </span>
            </div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.06em', marginTop: '8px' }}>
              OILAVIY
            </span>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#1B2D4F', marginTop: '4px' }}>
              49 000 so&apos;m
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>bir martalik to&apos;lov</div>
            <ul className="flex flex-col" style={{ fontSize: '13px', color: '#6B7280', gap: '8px', margin: '16px 0' }}>
              <li>✓ 3 ta test</li>
              <li>✓ PDF hisobot</li>
              <li>✓ Telegram yetkazish</li>
              <li>✓ Batafsil tahlil</li>
            </ul>
            <Link
              href="/register"
              className="w-full text-center font-bold transition-all duration-200 hover:bg-[#2563EB] active:scale-95 mt-auto"
              style={{
                display: 'block',
                borderRadius: '9999px',
                padding: '12px 0',
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                fontSize: '14px',
              }}
            >
              Boshlash →
            </Link>
          </div>

          {/* Card 3 - Maktab */}
          <div
            className="bg-white flex flex-col"
            style={{ borderRadius: '20px', padding: '28px', border: '1px solid #EEEBE4' }}
          >
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.06em' }}>
              MAKTAB
            </span>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#1B2D4F', marginTop: '4px' }}>
              Kelishiladi
            </div>
            <ul className="flex flex-col" style={{ fontSize: '13px', color: '#6B7280', gap: '8px', margin: '16px 0' }}>
              <li>✓ Cheksiz testlar</li>
              <li>✓ Admin panel</li>
              <li>✓ Hisobotlar</li>
              <li>✓ Qo&apos;llab-quvvatlash</li>
            </ul>
            <a
              href="mailto:info@u-kasb.uz"
              className="w-full text-center font-bold transition-all duration-200 hover:bg-[#F5F3EE] active:scale-95 mt-auto"
              style={{
                display: 'block',
                borderRadius: '9999px',
                padding: '12px 0',
                border: '1.5px solid #1B2D4F',
                color: '#1B2D4F',
                fontSize: '14px',
              }}
            >
              Bog&apos;lanish →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
