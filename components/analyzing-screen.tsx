"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function AnalyzingScreen() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("");
  const pollCountRef = useRef(0);

  useEffect(() => {
    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("ukasb_session")
        : null;

    if (!sessionId) {
      // No session at all — go back to start
      router.push("/register");
      return;
    }

    let stopped = false;

    const interval = setInterval(async () => {
      if (stopped) return;
      pollCountRef.current += 1;

      // Move the visual step indicators forward while we wait
      if (pollCountRef.current === 2) setActiveStep(2);
      if (pollCountRef.current === 4) setActiveStep(3);

      try {
        const data = await api.getSessionStatus(sessionId);

        if (data.status === "done") {
          stopped = true;
          clearInterval(interval);
          if (data.reportId && typeof window !== "undefined") {
            localStorage.setItem("ukasb_report", data.reportId);
          }
          router.push("/results");
        } else if (data.status === "failed") {
          stopped = true;
          clearInterval(interval);
          setError(
            data.error ||
              "Tahlilda xatolik yuz berdi. Qaytadan urinib ko'ring.",
          );
        }
        // status === 'analyzing' or 'in_progress' -> keep polling
      } catch (err) {
        console.error(err);
        // Don't stop polling on a transient network hiccup — just log it
      }

      // Safety valve: stop after ~60 polls (2 minutes at 2s interval)
      if (pollCountRef.current > 60 && !stopped) {
        stopped = true;
        clearInterval(interval);
        setError("Tahlil juda uzoq davom etmoqda. Qaytadan urinib ko'ring.");
      }
    }, 2000);

    return () => {
      stopped = true;
      clearInterval(interval);
    };
  }, [router]);

  const steps = [
    {
      number: 1,
      title: "Ko'nikmalar tahlili",
      subtitle: "Kuchli tomonlar aniqlanmoqda",
    },
    {
      number: 2,
      title: "Kasb moslamasi",
      subtitle: "Eng mos kasblar tanlanmoqda",
    },
    {
      number: 3,
      title: "Hisobot tayyorlanmoqda",
      subtitle: "14 sahifalik PDF yozilmoqda",
    },
  ];

  if (error) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center pt-[96px] pb-8 px-4 bg-[#F5F3EE]">
        <div
          className="max-w-md w-full bg-white rounded-[20px] p-10 text-center"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="text-[20px] font-bold text-[#1B2D4F] mb-2">
            Xatolik yuz berdi
          </h2>
          <p className="text-[14px] text-[#6B7280] mb-6">{error}</p>
          <button
            onClick={() => router.push("/register")}
            className="w-full h-12 rounded-full bg-[#1B2D4F] text-white font-bold text-[14px]"
          >
            Qaytadan boshlash
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center pt-[96px] pb-8 px-4 bg-[#F5F3EE]">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-circle { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      <div className="flex gap-5 max-w-2xl w-full">
        {/* Left Card - Spinner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white rounded-[20px] p-10 shadow-sm flex flex-col items-center justify-center"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg
              className="w-14 h-14 spinner"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="#E8EDF5"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="41 163"
                fill="none"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-[22px] font-bold text-[#1B2D4F]">
            Tahlil qilinmoqda…
          </h2>

          <p className="mt-2 text-[14px] text-[#6B7280] leading-[1.75] max-w-xs text-center">
            Bu 10–30 soniya davom etadi. Sahifani yopmang.
          </p>
        </motion.div>

        {/* Right Card - Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 bg-white rounded-[20px] p-8 shadow-sm"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-[0.1em] mb-5">
            NIMA BO'LYAPTI
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const isActive = step.number === activeStep;
              const isPast = step.number < activeStep;
              const highlighted = isActive || isPast;
              return (
                <div key={step.number} className="flex gap-3">
                  <motion.div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold ${
                      highlighted
                        ? `bg-[#3B82F6] text-white ${isActive ? "pulse-circle" : ""}`
                        : "bg-[#E8EDF5] text-[#9CA3AF]"
                    }`}
                  >
                    {step.number}
                  </motion.div>

                  <div className={highlighted ? "" : "opacity-60"}>
                    <div className="text-[14px] font-bold text-[#1B2D4F]">
                      {step.title}
                    </div>
                    <div className="text-[12px] text-[#6B7280] leading-[1.75] mt-0.5">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
