"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { api } from "@/lib/api";

export function RegistrationForm() {
  const { lang, setLang } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const translations = {
    uz: {
      eyebrow: "RO'YXATDAN O'TISH",
      heading: "Boshlaylik",
      subtext: "Farzandingiz haqida ma'lumot kiriting",
      parentName: "Ota-ona ismi",
      parentNamePlaceholder: "Masalan: Aziz Karimov",
      childName: "Bolaning ismi",
      childNamePlaceholder: "Masalan: Alisher",
      childAge: "Bolaning yoshi",
      phone: "Telefon / Telegram",
      phonePlaceholder: "+998 90 123 45 67",
      selectAge: "Tanlang",
      ageUnit: "yosh",
      submit: "Davom etish →",
      submitting: "Yuborilmoqda...",
      back: "← Orqaga",
      trust1: "Ma'lumotlar xavfsiz",
      trust2: "Telegram orqali hisobot",
      trust3: "20 daqiqa",
      errorMsg: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
    },
    ru: {
      eyebrow: "РЕГИСТРАЦИЯ",
      heading: "Начнем",
      subtext: "Введите информацию о вашем ребенке",
      parentName: "Имя родителя",
      parentNamePlaceholder: "Например: Азиз Каримов",
      childName: "Имя ребенка",
      childNamePlaceholder: "Например: Алишер",
      childAge: "Возраст ребенка",
      phone: "Телефон / Telegram",
      phonePlaceholder: "+998 90 123 45 67",
      selectAge: "Выберите",
      ageUnit: "лет",
      submit: "Продолжить →",
      submitting: "Отправка...",
      back: "← Назад",
      trust1: "Данные защищены",
      trust2: "Отчет по Telegram",
      trust3: "20 минут",
      errorMsg: "Произошла ошибка. Попробуйте снова.",
    },
  };

  const tr = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Step 1: get JWT token (dev login — no real Telegram needed for now)
      const loginData = await api.devLogin(formData.parentName);
      if (typeof window !== "undefined") {
        localStorage.setItem("ukasb_token", loginData.token);
        // Clear any stale session/progress from a previous attempt
        localStorage.removeItem("ukasb_session");
        localStorage.removeItem("ukasb_question");
        localStorage.removeItem("ukasb_report");
      }

      // Step 2: save the full profile
      await api.updateProfile({
        parentName: formData.parentName,
        childName: formData.childName,
        childAge: parseInt(formData.childAge, 10),
        phone: formData.phone,
        lang,
      });

      router.push("/quiz");
    } catch (err) {
      console.error(err);
      setError(tr.errorMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 px-4 pb-12 flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-block mb-4 text-sm font-medium text-[#6B7280] hover:text-[#1B2D4F] transition-colors duration-200"
        >
          {tr.back}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-8 border border-[#EEEBE4]"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        >
          {/* Language Selector */}
          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setLang("uz")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                lang === "uz"
                  ? "bg-[#1B2D4F] text-white"
                  : "bg-white text-[#6B7280] border border-[#E0DDD6] hover:border-[#1B2D4F]"
              }`}
            >
              O&apos;zbek
            </button>
            <button
              type="button"
              onClick={() => setLang("ru")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                lang === "ru"
                  ? "bg-[#1B2D4F] text-white"
                  : "bg-white text-[#6B7280] border border-[#E0DDD6] hover:border-[#1B2D4F]"
              }`}
            >
              Рус
            </button>
          </div>

          {/* Eyebrow */}
          <div
            className="mb-3 flex items-center pb-3"
            style={{ borderLeft: "2px solid #D4A017", paddingLeft: "10px" }}
          >
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              {tr.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[family:var(--font-heading)] text-[28px] font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">
            {tr.heading}
          </h1>

          {/* Subtext */}
          <p className="text-base text-[#6B7280] leading-[1.75] mb-7">
            {tr.subtext}
          </p>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#FEF2F2", color: "#DC2626" }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Parent Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2D4F] mb-2">
                {tr.parentName}
              </label>
              <input
                type="text"
                required
                placeholder={tr.parentNamePlaceholder}
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#E8EDF5] focus:border-[#3B82F6] focus:outline-none transition-colors duration-200 text-[#1B2D4F] placeholder-[#9CA3AF]"
              />
            </div>

            {/* Child Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2D4F] mb-2">
                {tr.childName}
              </label>
              <input
                type="text"
                required
                placeholder={tr.childNamePlaceholder}
                value={formData.childName}
                onChange={(e) =>
                  setFormData({ ...formData, childName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#E8EDF5] focus:border-[#3B82F6] focus:outline-none transition-colors duration-200 text-[#1B2D4F] placeholder-[#9CA3AF]"
              />
            </div>

            {/* Child Age */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2D4F] mb-2">
                {tr.childAge}
              </label>
              <select
                required
                value={formData.childAge}
                onChange={(e) =>
                  setFormData({ ...formData, childAge: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#E8EDF5] focus:border-[#3B82F6] focus:outline-none transition-colors duration-200 text-[#1B2D4F] bg-white"
              >
                <option value="">{tr.selectAge}</option>
                {Array.from({ length: 8 }, (_, i) => 10 + i).map((age) => (
                  <option key={age} value={age}>
                    {age} {tr.ageUnit}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#1B2D4F] mb-2">
                {tr.phone}
              </label>
              <input
                type="tel"
                required
                placeholder={tr.phonePlaceholder}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#E8EDF5] focus:border-[#3B82F6] focus:outline-none transition-colors duration-200 text-[#1B2D4F] placeholder-[#9CA3AF]"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { backgroundColor: "#0F1B2E" } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="w-full h-13 bg-[#1B2D4F] text-white font-bold rounded-full mt-6 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ marginTop: "28px" }}
            >
              {isSubmitting ? tr.submitting : tr.submit}
            </motion.button>
          </form>

          {/* Trust Items */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#EEEBE4]">
            <div className="text-center">
              <Shield size={24} className="text-[#1B2D4F] mx-auto mb-2" />
              <p className="text-xs text-[#6B7280] leading-[1.5]">
                {tr.trust1}
              </p>
            </div>
            <div className="text-center">
              <Phone size={24} className="text-[#1B2D4F] mx-auto mb-2" />
              <p className="text-xs text-[#6B7280] leading-[1.5]">
                {tr.trust2}
              </p>
            </div>
            <div className="text-center">
              <Clock size={24} className="text-[#1B2D4F] mx-auto mb-2" />
              <p className="text-xs text-[#6B7280] leading-[1.5]">
                {tr.trust3}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
