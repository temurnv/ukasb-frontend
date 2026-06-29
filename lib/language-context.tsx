'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import translations from './translations'

type Language = 'uz' | 'ru'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: keyof (typeof translations)['uz']) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('uz')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ukasb_lang') as Language
      if (saved && (saved === 'uz' || saved === 'ru')) {
        setLangState(saved)
      }
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('ukasb_lang', newLang)
    }
  }

  const t = (key: keyof (typeof translations)['uz']): string => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
