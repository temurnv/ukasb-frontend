'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, HardDrive } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function QuizPlayer() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  useLanguage()

  // Load saved question index from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ukasb_question')
      if (saved) {
        setCurrentIndex(parseInt(saved))
      }
    }
  }, [])

  // Save question index to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ukasb_question', currentIndex.toString())
    }
  }, [currentIndex])

  const question = "Siz yangi joyga ko'chib o'tganda nima qilishni afzal ko'rasiz?"
  const options = [
    { id: 'A', text: "Xarita o'rganib, rejalashtiraman" },
    { id: 'B', text: "Qo'shnilar bilan tanishaman" },
    { id: 'C', text: "Uyni tartibga solaman" },
    { id: 'D', text: "Atrofni kezib, o'rganaman" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="flex gap-8 items-start" style={{ paddingTop: '80px' }}>
      {/* Main Content */}
      <div className="flex-1 max-w-[640px]" style={{ paddingTop: '40px' }}>
        {/* Progress Section */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-13px text-[#9CA3AF]">8 / 20 savol</span>
            <span className="text-13px font-bold text-[#3B82F6]">40%</span>
          </div>
          <motion.div
            className="w-full h-1.5 bg-[#E8EDF5] rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-[#3B82F6]"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
        </div>

        {/* Question Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-[20px] p-8 border border-[#EEEBE4]"
          style={{
            marginTop: '24px',
            marginLeft: '16px',
            marginRight: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}
        >
          <h2 className="text-20px font-bold text-[#1B2D4F] leading-[1.4]">
            {question}
          </h2>

          {/* Answer Options */}
          <motion.div
            className="space-y-2.5"
            style={{ marginTop: '24px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {options.map((option) => (
              <motion.button
                key={option.id}
                variants={optionVariants}
                onClick={() => setSelectedOption(option.id)}
                className="w-full flex items-center gap-3.5 px-4.5 py-3.5 rounded-3.5 border-1.5 transition-all duration-150 text-left"
                style={{
                  backgroundColor:
                    selectedOption === option.id ? '#EFF6FF' : '#FFFFFF',
                  borderColor:
                    selectedOption === option.id ? '#3B82F6' : '#E8EDF5',
                  borderWidth: '1.5px',
                  borderRadius: '14px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.borderColor = '#C7D8F8'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.borderColor = '#E8EDF5'
                  }
                }}
              >
                {/* Letter Badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-13px"
                  style={{
                    backgroundColor:
                      selectedOption === option.id ? '#3B82F6' : '#F5F3EE',
                    color:
                      selectedOption === option.id ? '#FFFFFF' : '#1B2D4F',
                  }}
                >
                  {option.id}
                </div>
                {/* Option Text */}
                <span
                  className="text-15px font-medium text-[#1B2D4F]"
                  style={{ flexGrow: 1 }}
                >
                  {option.text}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            disabled={!selectedOption}
            onClick={() => router.push('/analyzing')}
            className="w-full h-13 bg-[#1B2D4F] text-white font-bold rounded-full mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              marginTop: '24px',
              fontSize: '16px',
            }}
            whileHover={selectedOption ? { backgroundColor: '#0F1B2E' } : {}}
            whileTap={selectedOption ? { scale: 0.98 } : {}}
          >
            Davom etish →
          </motion.button>
        </motion.div>
      </div>

      {/* Right Side Panel - Desktop Only */}
      <div
        className="hidden lg:block"
        style={{ width: '240px', marginRight: '32px', position: 'sticky', top: '96px', alignSelf: 'flex-start' }}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 border border-[#EEEBE4]"
          style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Steps */}
          <div className="space-y-4">
            {/* Step 1 - Complete */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle
                  size={20}
                  className="text-[#22C55E]"
                  fill="#22C55E"
                />
              </div>
              <div>
                <p className="text-13px font-medium text-[#1B2D4F]">
                  Qiziqishlar
                </p>
                <p className="text-11px text-[#22C55E] mt-0.5">Bajarildi</p>
              </div>
            </div>

            {/* Step 2 - Active */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Circle
                  size={20}
                  className="text-[#3B82F6]"
                  fill="#3B82F6"
                />
              </div>
              <div>
                <p className="text-13px font-bold text-[#1B2D4F]">
                  Qobiliyatlar
                </p>
                <p className="text-11px text-[#3B82F6] mt-0.5">Hozir</p>
              </div>
            </div>

            {/* Step 3 - Pending */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Circle
                  size={20}
                  className="text-[#D1D5DB]"
                  fill="#D1D5DB"
                />
              </div>
              <div>
                <p className="text-13px text-[#9CA3AF]">Qadriyatlar</p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div
            className="h-px bg-[#EEEBE4] my-4"
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />

          {/* Auto-save Info */}
          <div
            className="rounded-3xl p-3"
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '12px',
              padding: '12px',
            }}
          >
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-[#22C55E] flex-shrink-0" />
              <p className="text-12px text-[#22C55E] font-medium">
                Javoblar avtomatik saqlanadi
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
