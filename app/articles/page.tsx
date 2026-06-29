import { Navbar } from '@/components/navbar'
import { ArticlesList } from '@/components/articles-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maqolalar | U-kasb',
  description: 'Ota-onalar uchun foydali maqolalar va maslahatlari',
}

export default function Articles() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <ArticlesList />
    </main>
  )
}
