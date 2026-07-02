const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ukasb_token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error ${res.status}: ${errorBody}`);
  }
  return res.json();
}

export const api = {
  // Auth
  devLogin: (parentName?: string) =>
    request("/api/auth/dev-login", {
      method: "POST",
      body: JSON.stringify({ parentName }),
    }),

  updateProfile: (data: {
    parentName: string;
    childName: string;
    childAge: number;
    phone: string;
    lang: "uz" | "ru";
  }) =>
    request("/api/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getMe: () => request("/api/auth/me"),

  // Test
  getQuestions: (lang: "uz" | "ru" = "uz") =>
    request(`/api/test/questions?lang=${lang}`),

  startSession: () => request("/api/sessions", { method: "POST" }),

  saveAnswers: (
    sessionId: string,
    answers: { questionId: string; value: number | string }[],
  ) =>
    request(`/api/sessions/${sessionId}/answers`, {
      method: "PATCH",
      body: JSON.stringify({ answers }),
    }),

  submitSession: (sessionId: string) =>
    request(`/api/sessions/${sessionId}/submit`, { method: "POST" }),

  getSessionStatus: (sessionId: string) =>
    request(`/api/sessions/${sessionId}/status`),

  // Reports
  getReports: (limit = 10, skip = 0) =>
    request(`/api/reports?limit=${limit}&skip=${skip}`),

  getReport: (reportId: string) => request(`/api/reports/${reportId}`),

  getReportPdfUrl: (reportId: string) =>
    `${API_URL}/api/reports/${reportId}/pdf`,

  downloadReportPdf: async (reportId: string) => {
    const token = getToken();
    const res = await fetch(`${API_URL}/api/reports/${reportId}/pdf`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error("Failed to download PDF");
    return res.blob();
  },

  sendReportToTelegram: (reportId: string) =>
    request(`/api/reports/${reportId}/send-telegram`, { method: "POST" }),

  // Articles
  getArticles: (lang: "uz" | "ru" = "uz") =>
    request(`/api/articles?lang=${lang}`),

  getArticle: (id: string, lang: "uz" | "ru" = "uz") =>
    request(`/api/articles/${id}?lang=${lang}`),
};
