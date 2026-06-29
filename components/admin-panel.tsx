"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function AdminPanel() {
  const [socialLinks, setSocialLinks] = useState({
    telegram: "",
    instagram: "",
    email: "",
    phone: "",
  });
  const [savedField, setSavedField] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSocialLinks({
        telegram: localStorage.getItem("ukasb_telegram") || "",
        instagram: localStorage.getItem("ukasb_instagram") || "",
        email: localStorage.getItem("ukasb_email") || "",
        phone: localStorage.getItem("ukasb_phone") || "",
      });
    }
  }, []);

  const handleSaveSocial = (
    field: "telegram" | "instagram" | "email" | "phone",
  ) => {
    if (typeof window !== "undefined") {
      const keyMap = {
        telegram: "ukasb_telegram",
        instagram: "ukasb_instagram",
        email: "ukasb_email",
        phone: "ukasb_phone",
      };
      localStorage.setItem(keyMap[field], socialLinks[field]);
    }
    setSavedField(field);
    setTimeout(() => setSavedField(null), 2000);
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "Kasb tanlash",
    language: "O'zbek",
    text: "",
    readTime: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Farzandingizni kelajakka qanday tayyorlash kerak?",
      category: "KASB TANLASH",
      language: "O'zbek",
      readTime: "5 daqiqa o'qish",
    },
    {
      id: 2,
      title: "Bolangizning kuchli tomonlarini qanday aniqlash mumkin?",
      category: "QOBILIYAT",
      language: "O'zbek",
      readTime: "4 daqiqa o'qish",
    },
    {
      id: 3,
      title: "Qaysi to'garak va kurslarni tanlash kerak?",
      category: "TA'LIM",
      language: "Рус",
      readTime: "6 daqiqa o'qish",
    },
  ]);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.text && formData.readTime) {
      setFormData({
        title: "",
        category: "Kasb tanlash",
        language: "O'zbek",
        text: "",
        readTime: "",
      });
      setSuccessMessage("Maqola muvaffaqiyatli qo'shildi!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const users = [
    {
      id: 1,
      name: "Aziz Karimov",
      child: "Alisher",
      age: "14",
      phone: "+998 90 123 45 67",
      date: "2026-01-15",
      status: "Tayyor",
      details: "O'zbek | 2026-01-15 | Tekshirildi",
    },
    {
      id: 2,
      name: "Farkhod Hamidov",
      child: "Sardor",
      age: "15",
      phone: "+998 91 987 65 43",
      date: "2026-01-16",
      status: "Jarayonda",
      details: "Рус | 2026-01-16 | Jarayonda",
    },
    {
      id: 3,
      name: "Gulnora Nazarova",
      child: "Yasmin",
      age: "13",
      phone: "+998 93 654 32 10",
      date: "2026-01-17",
      status: "Tayyor",
      details: "O'zbek | 2026-01-17 | Tekshirildi",
    },
    {
      id: 4,
      name: "Rustam Shodmonov",
      child: "Davron",
      age: "16",
      phone: "+998 92 555 44 33",
      date: "2026-01-18",
      status: "Jarayonda",
      details: "O'zbek | 2026-01-18 | Jarayonda",
    },
    {
      id: 5,
      name: "Madina Omonova",
      child: "Laylo",
      age: "14",
      phone: "+998 94 777 88 99",
      date: "2026-01-19",
      status: "Tayyor",
      details: "Рус | 2026-01-19 | Tekshirildi",
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto pb-20 px-4"
      style={{ paddingTop: "120px" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          href="/"
          className="inline-block mb-4 text-sm font-medium text-[#6B7280] hover:text-[#1B2D4F] transition-colors duration-200"
        >
          ← Bosh sahifa
        </Link>
        <div
          className="mb-3 flex items-center pb-3"
          style={{ borderLeft: "2px solid #D4A017", paddingLeft: "10px" }}
        >
          <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
            ADMIN PANEL
          </span>
        </div>
        <h1 className="font-[family:var(--font-heading)] text-4xl font-bold tracking-[-0.02em] text-[#1B2D4F]">
          Boshqaruv paneli
        </h1>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-4 gap-3 mb-8"
      >
        {[
          { number: "24", label: "Jami foydalanuvchilar" },
          { number: "18", label: "Hisobot tayyor" },
          { number: "6", label: "Jarayonda" },
          { number: "6", label: "Jami maqolalar" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[12px] border border-[#EEEBE4] p-5"
          >
            <div className="text-2xl font-bold text-[#1B2D4F] mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-[#6B7280]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Users Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-[16px] overflow-hidden mb-5"
      >
        <div className="border-b border-[#F3F4F6] p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1B2D4F]">
              Foydalanuvchilar
            </h2>
            <span className="bg-[#1B2D4F] text-white text-xs font-bold px-3 py-1 rounded-full">
              24
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#F3F4F6]">
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Ism
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Farzand
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Yoshi
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Tel/Telegram
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Sana
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Holat
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <>
                  <tr
                    key={user.id}
                    className={`border-b border-[#F3F4F6] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}
                  >
                    <td className="p-6 text-sm text-[#1B2D4F]">{user.name}</td>
                    <td className="p-6 text-sm text-[#1B2D4F]">{user.child}</td>
                    <td className="p-6 text-sm text-[#1B2D4F]">{user.age}</td>
                    <td className="p-6 text-sm text-[#1B2D4F]">{user.phone}</td>
                    <td className="p-6 text-sm text-[#1B2D4F]">{user.date}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === "Tayyor"
                              ? "bg-[#D1FAE5] text-[#065F46]"
                              : "bg-[#DBEAFE] text-[#1E40AF]"
                          }`}
                        >
                          {user.status}
                        </span>
                        <button
                          onClick={() =>
                            setExpandedUser(
                              expandedUser === user.id ? null : user.id,
                            )
                          }
                          className="text-[#3B82F6] font-medium hover:underline flex items-center gap-1"
                        >
                          Ko'rish{" "}
                          <ChevronDown
                            size={16}
                            style={{
                              transform:
                                expandedUser === user.id
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "0.3s",
                            }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedUser === user.id && (
                    <tr className="bg-[#F8FAFF] border-b border-[#F3F4F6]">
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-sm text-[#6B7280]"
                      >
                        {user.details}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Article Form */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-[16px] p-7 mb-5"
      >
        <h2 className="text-lg font-bold text-[#1B2D4F] mb-6">
          Yangi maqola qo'shish
        </h2>

        {successMessage && (
          <motion.div
            className="mb-6 p-4 bg-[#D1FAE5] text-[#065F46] rounded-lg text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1B2D4F] mb-2">
              Sarlavha
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masalan: Farzandingizni kelajakka qanday tayyorlash kerak?"
              className="w-full px-4 py-2.5 border border-[#E0DDD6] rounded-xl focus:border-[#3B82F6] focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B2D4F] mb-2">
                Kategoriya
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-[#E0DDD6] rounded-xl focus:border-[#3B82F6] focus:outline-none transition-colors"
              >
                <option>Kasb tanlash</option>
                <option>Qobiliyat</option>
                <option>Ta&apos;lim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B2D4F] mb-2">
                O&apos;qish vaqti
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="Masalan: 5 daqiqa"
                className="w-full px-4 py-2.5 border border-[#E0DDD6] rounded-xl focus:border-[#3B82F6] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B2D4F] mb-2">
              Tili
            </label>
            <div className="flex gap-2">
              {["O'zbek", "Рус"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, language: lang }))
                  }
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    formData.language === lang
                      ? "bg-[#1B2D4F] text-white"
                      : "bg-white text-[#6B7280] border border-[#E8E4DA]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B2D4F] mb-2">
              Matn
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Maqolaning to'liq matni..."
              className="w-full px-4 py-2.5 border border-[#E0DDD6] rounded-xl focus:border-[#3B82F6] focus:outline-none transition-colors resize-none"
              style={{ height: "120px" }}
            />
          </div>

          <button
            type="submit"
            className="bg-[#1B2D4F] text-white font-bold px-7 py-3 rounded-full hover:bg-[#0F1C2E] transition-colors"
          >
            Maqola qo&apos;shish
          </button>
        </form>
      </motion.div>

      {/* Articles Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-[16px] overflow-hidden mb-5"
      >
        <div className="border-b border-[#F3F4F6] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1B2D4F]">Maqolalar</h2>
            <span className="bg-[#1B2D4F] text-white text-xs font-bold px-3 py-1 rounded-full">
              {articles.length}
            </span>
          </div>
          <p className="text-xs text-[#6B7280]">Boshqarish uchun bosing</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#F3F4F6]">
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Sarlavha
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Kategoriya
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Tili
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  O&apos;qish vaqti
                </th>
                <th className="text-left p-6 text-sm font-semibold text-[#1B2D4F]">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, idx) => (
                <tr
                  key={article.id}
                  className={`border-b border-[#F3F4F6] ${idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}
                >
                  <td className="p-6 text-sm text-[#1B2D4F]">
                    {article.title}
                  </td>
                  <td className="p-6 text-sm text-[#1B2D4F]">
                    {article.category}
                  </td>
                  <td className="p-6 text-sm text-[#1B2D4F]">
                    {article.language}
                  </td>
                  <td className="p-6 text-sm text-[#1B2D4F]">
                    {article.readTime}
                  </td>
                  <td className="p-6 flex gap-2">
                    <button className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#DBEAFE] transition-colors">
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                    >
                      O&apos;chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Settings Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white"
        style={{ borderRadius: "16px", padding: "28px", marginTop: "20px" }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1B2D4F",
            marginBottom: "4px",
          }}
        >
          Sozlamalar
        </h2>
        <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "20px" }}>
          Ijtimoiy tarmoqlar va aloqa
        </p>

        {(
          [
            {
              field: "telegram",
              label: "Telegram havolasi",
              placeholder: "https://t.me/ukasb",
            },
            {
              field: "instagram",
              label: "Instagram havolasi",
              placeholder: "https://instagram.com/ukasb",
            },
            { field: "email", label: "Email", placeholder: "info@u-kasb.uz" },
            {
              field: "phone",
              label: "Telefon raqami",
              placeholder: "+998 90 000 00 00",
            },
          ] as const
        ).map((row) => (
          <div
            key={row.field}
            className="flex items-center"
            style={{ gap: "12px", marginBottom: "12px" }}
          >
            <label
              style={{
                width: "160px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1B2D4F",
              }}
            >
              {row.label}
            </label>
            <input
              type="text"
              value={socialLinks[row.field]}
              onChange={(e) =>
                setSocialLinks((prev) => ({
                  ...prev,
                  [row.field]: e.target.value,
                }))
              }
              placeholder={row.placeholder}
              className="flex-1 font-sans"
              style={{
                height: "44px",
                borderRadius: "10px",
                border: "1.5px solid #E8E4DA",
                padding: "0 14px",
                fontSize: "14px",
              }}
            />
            <button
              type="button"
              onClick={() => handleSaveSocial(row.field)}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: "#1B2D4F",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
              }}
            >
              Saqlash
            </button>
            {savedField === row.field && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#22C55E",
                  marginLeft: "8px",
                }}
              >
                ✓ Saqlandi!
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
