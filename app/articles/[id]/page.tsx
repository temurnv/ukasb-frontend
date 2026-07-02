"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";

type Article = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export default function ArticleDetail() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadArticle() {
      try {
        setIsLoading(true);
        setError("");
        const data = await api.getArticle(id as string, lang);
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError("Maqolani yuklab bo'lmadi.");
      } finally {
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [id, lang]);

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pt-32 pb-16">
        {/* Back Link */}
        <Link
          href="/articles"
          className="text-sm text-[#6B7280] no-underline block mb-6 hover:text-[#1B2D4F] transition"
        >
          {t("back_articles")}
        </Link>

        {isLoading && (
          <p style={{ fontSize: "14px", color: "#6B7280" }}>Yuklanmoqda…</p>
        )}

        {error && !isLoading && (
          <div>
            <p
              style={{
                fontSize: "14px",
                color: "#DC2626",
                marginBottom: "16px",
              }}
            >
              {error}
            </p>
            <Link
              href="/articles"
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
              Maqolalarga qaytish
            </Link>
          </div>
        )}

        {!isLoading && !error && article && (
          <>
            {/* Article Card */}
            <div
              className="bg-white rounded-[20px] px-10 py-10 border border-[#EEEBE4]"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              {/* Title */}
              <h1 className="font-[family:var(--font-heading)] text-[28px] font-bold text-[#1B2D4F] mb-6 tracking-[-0.02em]">
                {article.title}
              </h1>

              {/* Divider */}
              <div className="h-px bg-[#EEEBE4] mb-6"></div>

              {/* Body */}
              <div className="text-base text-[#4B5563] leading-[1.8] whitespace-pre-line">
                {article.body}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 bg-[#1B2D4F] rounded-[16px] px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-white text-base md:text-lg font-bold">
                Diagnostika o&apos;tmoqchimisiz?
              </h3>
              <Link
                href="/register"
                className="px-6 py-3 rounded-full bg-[#3B82F6] text-white font-bold text-sm hover:bg-[#2563EB] transition-all whitespace-nowrap"
              >
                Boshlash →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
