'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setMenuOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const navLinks = [
    { href: '/#diagnostika', id: 'diagnostika', label: t('nav_diagnostika') },
    { href: '/#ichida', id: 'ichida', label: t('nav_ichida') },
    { href: '/#qanday', id: 'qanday', label: t('nav_qanday') },
    { href: '/#narx', id: 'narx', label: t('nav_narx') },
  ]

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${
        isScrolled
          ? 'backdrop-blur-md shadow-lg rounded-full'
          : 'backdrop-blur-0 shadow-none rounded-full'
      }`}
      style={{ maxWidth: '900px', width: 'calc(100% - 32px)', marginTop: '16px' }}
    >
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full border border-[#EEEBE4]" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-[#1B2D4F] rounded-lg" />
          <span className="text-base font-bold text-[#1B2D4F]">U-kasb</span>
          {isAdmin && (
            <span className="ml-2 px-2.5 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full">
              Admin
            </span>
          )}
        </Link>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-[#6B7280]" style={{ fontSize: '13px' }}>
          {navLinks.map((link, idx) => (
            <span key={link.id} className="flex items-center gap-6">
              {idx > 0 && <span className="text-[#E0DDD6]">·</span>}
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="hover:text-[#1B2D4F] transition"
                style={{ whiteSpace: 'nowrap' }}
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>

        {/* Right: Language Toggle & CTA */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setLang('uz')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                lang === 'uz'
                  ? 'bg-[#1B2D4F] text-white'
                  : 'text-[#6B7280] hover:text-[#1B2D4F]'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                lang === 'ru'
                  ? 'bg-[#1B2D4F] text-white'
                  : 'text-[#6B7280] hover:text-[#1B2D4F]'
              }`}
            >
              RU
            </button>
          </div>

          {/* CTA Button */}
          <Link
            href="/register"
            className="px-6 py-2 rounded-full bg-[#1B2D4F] text-white text-sm font-bold hover:bg-[#0f1d38] transition-all active:scale-95"
          >
            {t('nav_boshlash')}
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#1B2D4F] hover:bg-[#F5F3EE] transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white rounded-2xl border border-[#EEEBE4] shadow-lg p-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-[#6B7280] hover:text-[#1B2D4F] transition py-1"
              style={{ fontSize: '13px' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
