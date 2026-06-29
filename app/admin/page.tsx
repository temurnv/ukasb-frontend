import { Navbar } from '@/components/navbar'
import { AdminPanel } from '@/components/admin-panel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | U-kasb',
  description: 'U-kasb admin panel',
  robots: 'noindex, nofollow',
}

export default function AdminPage() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <AdminPanel />
    </main>
  )
}
