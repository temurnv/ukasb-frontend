"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Circle, HardDrive } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { api } from "@/lib/api";

type Question = {
  id: string;
  order: number;
  type: string;
  text: string;
  options: { text: string; value: string }[];
};

export function QuizPlayer() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { lang } = useLanguage();

  // Default letter options used if a question has no explicit options from backend
  const defaultLetters = ["A", "B", "C", "D"];

  // Load saved progress and initialize: fetch questions + start/reuse session
  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        setError("");

        // Restore saved question index
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("ukasb_question");
          if (saved) setCurrentIndex(parseInt(saved, 10));
        }

        // Fetch real questions from backend
        const qs = await api.getQuestions(lang);
        setQuestions(qs);

        // Reuse existing session if present, otherwise create a new one
        let sid =
          typeof window !== "undefined"
            ? localStorage.getItem("ukasb_session")
            : null;

        if (!sid) {
          const session = await api.startSession();
          sid = session._id;
          if (typeof window !== "undefined" && sid) {
            localStorage.setItem("ukasb_session", sid);
          }
        }
        setSessionId(sid);
      } catch (err) {
        console.error(err);
        setError(
          "Savollarni yuklab bo'lmadi. Backend ishlayotganini tekshiring.",
        );
      } finally {
        setIsLoading(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save current question index whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ukasb_question", currentIndex.toString());
    }
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent =
    totalQuestions > 0
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;

  // Build the option list for the current question — use backend options,
  // pairing them with display letters A/B/C/D
  const options =
    currentQuestion?.options?.map((opt, i) => ({
      id: defaultLetters[i] || String(i + 1),
      text: opt.text,
      value: opt.value,
    })) || [];

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = async () => {
    if (!selectedOption || !sessionId || !currentQuestion) return;

    setIsSubmittingAnswer(true);
    setError("");

    try {
      const chosen = options.find((o) => o.id === selectedOption);
      const value = chosen ? chosen.value : selectedOption;

      // Auto-save this answer to the backend
      await api.saveAnswers(sessionId, [
        { questionId: currentQuestion.id, value },
      ]);

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // Last question — submit the whole session for analysis
        await api.submitSession(sessionId);
        router.push("/analyzing");
      }
    } catch (err) {
      console.error(err);
      setError("Javobni saqlab bo'lmadi. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F5F3EE",
          paddingTop: "160px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "15px", color: "#6B7280" }}>Yuklanmoqda…</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F5F3EE",
          paddingTop: "160px",
          textAlign: "center",
          padding: "160px 24px 0",
        }}
      >
        <p style={{ fontSize: "15px", color: "#DC2626" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F3EE",
        paddingTop: "120px",
        paddingBottom: "60px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Progress */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
                {currentIndex + 1} / {totalQuestions} savol
              </span>
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#3B82F6" }}
              >
                {progressPercent}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "#E8EDF5",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid #EEEBE4",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            {error && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#FEF2F2",
                  color: "#DC2626",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1B2D4F",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {currentQuestion?.text}
            </h2>

            <motion.div
              style={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {options.map((option) => (
                <motion.button
                  key={option.id}
                  variants={optionVariants}
                  onClick={() => handleSelectOption(option.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    border: `1.5px solid ${selectedOption === option.id ? "#3B82F6" : "#E8EDF5"}`,
                    backgroundColor:
                      selectedOption === option.id ? "#EFF6FF" : "#FFFFFF",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedOption !== option.id) {
                      e.currentTarget.style.borderColor = "#C7D8F8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOption !== option.id) {
                      e.currentTarget.style.borderColor = "#E8EDF5";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "13px",
                      backgroundColor:
                        selectedOption === option.id ? "#3B82F6" : "#F5F3EE",
                      color:
                        selectedOption === option.id ? "#FFFFFF" : "#1B2D4F",
                    }}
                  >
                    {option.id}
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#1B2D4F",
                      flexGrow: 1,
                    }}
                  >
                    {option.text}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              disabled={!selectedOption || isSubmittingAnswer}
              onClick={handleContinue}
              style={{
                marginTop: "24px",
                width: "100%",
                height: "52px",
                backgroundColor: "#1B2D4F",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "9999px",
                border: "none",
                cursor:
                  selectedOption && !isSubmittingAnswer
                    ? "pointer"
                    : "not-allowed",
                opacity: selectedOption && !isSubmittingAnswer ? 1 : 0.5,
                transition: "all 0.2s ease",
              }}
              whileHover={
                selectedOption && !isSubmittingAnswer
                  ? { backgroundColor: "#0F1B2E" }
                  : {}
              }
              whileTap={
                selectedOption && !isSubmittingAnswer ? { scale: 0.98 } : {}
              }
            >
              {isSubmittingAnswer ? "Saqlanmoqda…" : "Davom etish →"}
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side Panel */}
        <div
          style={{
            width: "240px",
            flexShrink: 0,
            position: "sticky",
            top: "120px",
            alignSelf: "flex-start",
            display: "none",
          }}
          className="lg-panel"
        >
          <style>{`
            @media (min-width: 1024px) {
              .lg-panel { display: block !important; }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid #EEEBE4",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <CheckCircle
                  size={20}
                  color="#22C55E"
                  fill="#22C55E"
                  style={{ flexShrink: 0, marginTop: "1px" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#1B2D4F",
                      margin: 0,
                    }}
                  >
                    Qiziqishlar
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#22C55E",
                      margin: "2px 0 0",
                    }}
                  >
                    Bajarildi
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Circle
                  size={20}
                  color="#3B82F6"
                  fill="#3B82F6"
                  style={{ flexShrink: 0, marginTop: "1px" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1B2D4F",
                      margin: 0,
                    }}
                  >
                    Qobiliyatlar
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#3B82F6",
                      margin: "2px 0 0",
                    }}
                  >
                    Hozir
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Circle
                  size={20}
                  color="#D1D5DB"
                  fill="#D1D5DB"
                  style={{ flexShrink: 0, marginTop: "1px" }}
                />
                <div>
                  <p style={{ fontSize: "13px", color: "#9CA3AF", margin: 0 }}>
                    Qadriyatlar
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "#EEEBE4",
                margin: "16px 0",
              }}
            />

            <div
              style={{
                backgroundColor: "#F0FDF4",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <HardDrive size={16} color="#22C55E" style={{ flexShrink: 0 }} />
              <p
                style={{
                  fontSize: "12px",
                  color: "#22C55E",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Javoblar avtomatik saqlanadi
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
