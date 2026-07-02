"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { api } from "@/lib/api";

type Article = {
  id: string;
  title: string;
  createdAt: string;
};

export function ArticlesList() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError("");
        const data = await api.getArticles(lang);
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError("Maqolalarni yuklab bo'lmadi.");
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, [lang]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="pt-10 pb-16 px-4">
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          className="flex items-center pb-3"
          style={{ borderLeft: "2px solid #D4A017", paddingLeft: "10px" }}
        >
          <span className="text-xs font-semibold tracking-[0.12em] text-[#D4A017]">
            MAQOLALAR
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-[family:var(--font-heading)] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1B2D4F] mt-3">
          Ota-onalar uchun maqolalar
        </h1>

        {/* Subtext */}
        <p className="text-sm text-[#6B7280] leading-[1.75] mt-2">
          Farzandingizga to&apos;g&apos;ri yo&apos;l ko&apos;rsatish uchun
          foydali ma&apos;lumotlar
        </p>

        {/* Loading state */}
        {isLoading && (
          <p style={{ marginTop: "32px", fontSize: "14px", color: "#6B7280" }}>
            Yuklanmoqda…
          </p>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <p style={{ marginTop: "32px", fontSize: "14px", color: "#DC2626" }}>
            {error}
          </p>
        )}

        {/* Empty state */}
        {!isLoading && !error && articles.length === 0 && (
          <p style={{ marginTop: "32px", fontSize: "14px", color: "#6B7280" }}>
            Hozircha maqolalar yo&apos;q.
          </p>
        )}

        {/* Articles List */}
        {!isLoading && !error && articles.length > 0 && (
          <motion.div
            className="flex flex-col gap-3 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                onClick={() => router.push(`/articles/${article.id}`)}
                className="bg-white rounded-[16px] px-6 py-5 border border-[#EEEBE4] cursor-pointer transition-all duration-200 flex items-start justify-between gap-3"
                style={{
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
                }}
                whileHover={{
                  translateY: -2,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                }}
              >
                {/* Left content */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {/* Title */}
                  <h3 className="font-[family:var(--font-heading)] text-base font-bold leading-[1.35] text-[#1B2D4F] tracking-[-0.02em]">
                    {article.title}
                  </h3>
                </div>

                {/* Right chevron icon */}
                <ChevronRight
                  size={20}
                  className="text-[#D1D5DB] flex-shrink-0 mt-0.5"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <div
          className="flex items-center justify-between flex-wrap"
          style={{
            marginTop: "32px",
            backgroundColor: "#1B2D4F",
            borderRadius: "16px",
            padding: "24px 28px",
            gap: "16px",
          }}
        >
          <span
            className="text-white"
            style={{ fontSize: "16px", fontWeight: 700 }}
          >
            Hali diagnostika o&apos;tmaganmisiz?
          </span>
          <Link
            href="/register"
            className="text-white"
            style={{
              backgroundColor: "#3B82F6",
              padding: "10px 24px",
              borderRadius: "9999px",
              fontWeight: 700,
            }}
          >
            Boshlash →
          </Link>
        </div>
      </div>
    </div>
  );
}
