import { Navbar } from '@/components/navbar'
import { ResultsScreen } from '@/components/results-screen'

export const metadata = {
  title: 'Natijalar | U-kasb',
  description: 'Tahlil natijalari va kuchli tomonlar xaritasi',
}

export default function ResultsPage() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <ResultsScreen />
    </main>
  )
}
