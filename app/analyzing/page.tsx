import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AnalyzingScreen } from '@/components/analyzing-screen'

export const metadata: Metadata = {
  title: 'U-kasb | Tahlil qilinmoqda',
  description: 'Sizning farzandingiz uchun tahlil bajarilmoqda...',
}

export default function AnalyzingPage() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <AnalyzingScreen />
    </main>
  )
}
