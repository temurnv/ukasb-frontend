"use client";

import { motion } from "framer-motion";
import { Download, Send, Copy } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import Toast from "@/components/toast";

export function ResultsScreen() {
  const containerRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDownloadPdf = () => {
    setToastMessage("PDF tayyorlanmoqda... Tez orada!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // TODO: connect to real PDF endpoint from backend
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
    setToastMessage("Havola nusxalandi!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const strengthBars = [
    { label: "Yetakchilik", score: 90, color: "#3B82F6" },
    { label: "Tizimlilik", score: 83, color: "#3B82F6" },
    { label: "Muhandislik", score: 75, color: "#60A5FA" },
    { label: "Ijodkorlik", score: 63, color: "#93C5FD" },
    { label: "Kommunikatsiya", score: 58, color: "#BFDBFE" },
  ];

  const careers = [
    {
      name: "Muhandis",
      description: "Texnologiya va tizimlar",
      match: "92%",
    },
    {
      name: "Menejment",
      description: "Rahbarlik va boshqaruv",
      match: "87%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const barVariants = {
    hidden: { scaleX: 0 },
    visible: (idx: number) => ({
      scaleX: 1,
      transition: {
        delay: idx * 0.15,
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-[#F5F3EE] pb-12"
      style={{ paddingTop: "120px" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[800px] mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div
            className="mb-3 flex items-center pb-3"
            style={{ borderLeft: "2px solid #D4A017", paddingLeft: "10px" }}
          >
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
              NATIJALAR
            </span>
          </div>
          <h1 className="font-[family:var(--font-heading)] text-[36px] font-bold tracking-[-0.02em] text-[#1B2D4F] mb-2">
            Kuchli tomonlar xaritasi
          </h1>
          <p className="text-[14px] text-[#6B7280] leading-[1.75]">
            Alisher Karimov · 14 yosh
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-[1fr_320px] gap-5">
          {/* Left Column - Strength Bars */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-[20px] p-8 border border-[#EEEBE4]"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div className="space-y-5">
              {strengthBars.map((bar, idx) => (
                <div key={idx}>
                  {/* Label and Score */}
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[14px] font-medium text-[#1B2D4F]">
                      {bar.label}
                    </span>
                    <span className="text-[14px] font-bold text-[#1B2D4F]">
                      {bar.score}
                    </span>
                  </div>
                  {/* Track and Fill */}
                  <div className="w-full h-2 bg-[#E8EDF5] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar.color, originX: 0 }}
                      custom={idx}
                      variants={barVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Top Card - Best Careers */}
            <motion.div
              variants={itemVariants}
              className="rounded-[20px] p-6 border border-[#1B2D4F]"
              style={{
                backgroundColor: "#1B2D4F",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <label
                className="text-xs uppercase font-semibold tracking-[0.12em]"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                Eng mos kasblar
              </label>
              <div className="space-y-3 mt-3.5">
                {careers.map((career, idx) => (
                  <div key={idx}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <div className="text-[15px] font-bold text-white">
                          {career.name}
                        </div>
                        <div
                          className="text-[12px] mt-0.5"
                          style={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          {career.description}
                        </div>
                      </div>
                      <div className="text-[15px] font-bold text-[#60A5FA] flex-shrink-0">
                        {career.match}
                      </div>
                    </div>
                    {idx < careers.length - 1 && (
                      <div
                        className="h-px mt-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Card - Report Ready */}
            <motion.div
              variants={itemVariants}
              className="rounded-[20px] p-6 border border-[#BFDBFE]"
              style={{
                backgroundColor: "#EFF6FF",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#3B82F6]">
                Hisobotingiz tayyor
              </label>
              <p className="text-[13px] text-[#1B2D4F] leading-[1.75] mt-2">
                14 sahifalik to&apos;liq tahlil yuklab olishga tayyor.
              </p>
              <motion.button
                onClick={handleDownloadPdf}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 h-12 rounded-full bg-[#1B2D4F] text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <Download size={18} />
                PDF yuklab olish
              </motion.button>

              {/* Secondary navigation */}
              <div
                className="flex flex-col"
                style={{ gap: "12px", marginTop: "12px" }}
              >
                <Link
                  href="/articles"
                  className="w-full text-center font-semibold transition-all duration-200"
                  style={{
                    border: "1.5px solid #1B2D4F",
                    backgroundColor: "transparent",
                    color: "#1B2D4F",
                    padding: "12px 24px",
                    borderRadius: "9999px",
                  }}
                >
                  Maqolalarni ko&apos;rish →
                </Link>
                <Link
                  href="/"
                  className="text-center"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6B7280",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                >
                  Bosh sahifaga qaytish
                </Link>
              </div>

              {/* Share row */}
              <div
                className="flex items-center"
                style={{ marginTop: "16px", gap: "12px" }}
              >
                <span style={{ fontSize: "13px", color: "#6B7280" }}>
                  Natijalarni ulashish:
                </span>
                <a
                  href="https://t.me/share/url?url=https://u-kasb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram orqali ulashish"
                  className="flex items-center justify-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#EFF6FF",
                    borderRadius: "50%",
                  }}
                >
                  <Send size={16} color="#3B82F6" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Havolani nusxalash"
                  className="flex items-center justify-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#EFF6FF",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Copy size={16} color="#3B82F6" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </motion.div>
  );
}
