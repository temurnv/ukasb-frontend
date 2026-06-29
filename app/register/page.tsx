import { Navbar } from '@/components/navbar'
import { RegistrationForm } from '@/components/registration-form'

export const metadata = {
  title: 'Ro\'yxatdan o\'tish | U-kasb',
  description: 'U-kasb karyera diagnostikasi testi uchun ro\'yxatdan o\'ting',
}

export default function RegisterPage() {
  return (
    <main className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <RegistrationForm />
    </main>
  )
}
