"use client";

import { motion } from "framer-motion";
import { Download, Send, Copy } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/toast";
import { api } from "@/lib/api";

type Report = {
  _id: string;
  lang: string;
  profile: { scales: Record<string, number> };
  professions: { name: string; why: string }[];
  recommendations: {
    clubs: string[];
    courses: string[];
    school: string;
    plan: string[];
  };
  pdfUrl: string;
  status: string;
};

const barColors = [
  "#3B82F6",
  "#3B82F6",
  "#60A5FA",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE",
];

export function ResultsScreen() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReport() {
      const reportId =
        typeof window !== "undefined"
          ? localStorage.getItem("ukasb_report")
          : null;

      if (!reportId) {
        router.push("/register");
        return;
      }

      try {
        const data = await api.getReport(reportId);
        setReport(data);
      } catch (err) {
        console.error(err);
        setError("Hisobotni yuklab bo'lmadi.");
      } finally {
        setIsLoading(false);
      }
    }
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadPdf = async () => {
    const reportId =
      typeof window !== "undefined"
        ? localStorage.getItem("ukasb_report")
        : null;
    if (!reportId) return;

    try {
      setToastMessage("PDF tayyorlanmoqda...");
      setShowToast(true);

      const blob = await api.downloadReportPdf(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "u-kasb-hisobot.pdf";
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
      setToastMessage("PDF yuklab bo'lmadi. Qaytadan urinib ko'ring.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
    setToastMessage("Havola nusxalandi!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-[#F5F3EE] flex items-center justify-center"
        style={{ paddingTop: "120px" }}
      >
        <p style={{ fontSize: "15px", color: "#6B7280" }}>Yuklanmoqda…</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div
        className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4"
        style={{ paddingTop: "120px" }}
      >
        <div className="text-center">
          <p
            style={{ fontSize: "15px", color: "#DC2626", marginBottom: "16px" }}
          >
            {error || "Hisobot topilmadi."}
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              borderRadius: "9999px",
              backgroundColor: "#1B2D4F",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  // Build strength bars from real scales data
  const scaleEntries = Object.entries(report.profile.scales).sort(
    (a, b) => b[1] - a[1],
  );
  const strengthBars = scaleEntries.map(([label, score], idx) => ({
    label,
    score,
    color: barColors[idx] || "#BFDBFE",
  }));

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
                <div key={bar.label}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[14px] font-medium text-[#1B2D4F]">
                      {bar.label}
                    </span>
                    <span className="text-[14px] font-bold text-[#1B2D4F]">
                      {bar.score}
                    </span>
                  </div>
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
                {report.professions.map((career, idx) => (
                  <div key={career.name}>
                    <div className="mb-1">
                      <div className="text-[15px] font-bold text-white">
                        {career.name}
                      </div>
                      <div
                        className="text-[12px] mt-0.5"
                        style={{ color: "rgba(255, 255, 255, 0.6)" }}
                      >
                        {career.why}
                      </div>
                    </div>
                    {idx < report.professions.length - 1 && (
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
