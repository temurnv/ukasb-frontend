import { Navbar } from '@/components/navbar'
import { QuizPlayer } from '@/components/quiz-player'

export const metadata = {
  title: 'Quiz | U-kasb',
  description: 'U-kasb test va savollarga javob berish',
}

export default function QuizPage() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <QuizPlayer />
    </main>
  )
}
