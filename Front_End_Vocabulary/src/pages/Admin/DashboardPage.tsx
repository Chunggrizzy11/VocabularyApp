import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import AdminIcon from "../../components/common/AdminIcon";
import { useAdminAnimation } from "../../hooks/useAdminAnimation";
import { api } from "../../services/api";

interface Stats {
  totalWordsLearned: number;
  totalWordsMastered: number;
  totalReviewSessions: number;
}

interface SeedResponse {
  success: boolean;
  message?: string;
}

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  const containerRef = useAdminAnimation([stats, userCount, seedMsg], {
    sections: true,
    staggerItems: "[data-dash-item]",
    gridCards: "[data-stat-card]",
  });

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get<{ success: boolean; data: Stats }>("/statistics"),
          api.get<{ success: boolean; data: unknown[] }>("/auth/users"),
        ]);
        setStats(statsRes.data);
        setUserCount(usersRes.data.length);
      } catch {
        // silently fail
      }
    }
    load();
  }, []);

  const handleSeedAll = async () => {
    setSeeding(true);
    setSeedMsg(null);
    try {
      const res = await api.post<SeedResponse>("/seed/all", {});
      setSeedMsg(res.message || "Seed completed successfully!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Seed failed";
      setSeedMsg(msg);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { label: "Users", value: userCount, icon: "users" as const, color: "#5865F2" },
    { label: "Words Learned", value: stats?.totalWordsLearned ?? 0, icon: "vocabulary" as const, color: "#2D72B8" },
    { label: "Words Mastered", value: stats?.totalWordsMastered ?? 0, icon: "dashboard" as const, color: "#F9A03C" },
    { label: "Review Sessions", value: stats?.totalReviewSessions ?? 0, icon: "topics" as const, color: "#10AA50" },
  ];

  return (
    <div ref={containerRef} className="px-1 sm:px-0">
      {/* Hero Section - Admin Dashboard */}
      <div
        className="relative overflow-hidden rounded-[12px] p-6 md:p-12 mb-6 md:mb-8"
        style={{
          border: "2px solid var(--border-brand-subtle)",
          backgroundColor: "var(--brand-softer)",
        }}
      >
        <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4">
          <h1
            data-dash-item
            className="text-[28px] md:text-[48px] font-extrabold leading-tight"
            style={{ color: "var(--fg-brand-strong)" }}
          >
            Admin Dashboard
          </h1>
          <p
            data-dash-item
            className="text-sm md:text-lg max-w-lg" style={{ color: "var(--fg-brand)" }}
          >
            Welcome to the admin dashboard. Monitor your application and manage content.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            data-stat-card
            className="rounded-[12px] p-5"
            style={{
              backgroundColor: "var(--neutral-primary-soft)",
              border: "2px solid var(--border-default)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <AdminIcon name={card.icon} size={18} />
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-wide"
                style={{ color: "var(--text-body-subtle)" }}
              >
                {card.label}
              </span>
            </div>
            <p
              className="text-2xl font-extrabold"
              style={{ color: "var(--text-heading)" }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Seed Data Section */}
      <div
        data-dash-item
        className="rounded-[12px] p-6"
        style={{
          backgroundColor: "var(--neutral-primary-soft)",
          border: "2px solid var(--border-default)",
        }}
      >
        <h2
          className="text-lg font-extrabold mb-2"
          style={{ color: "var(--text-heading)" }}
        >
          Seed Data
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-body)" }}>
          Populate the database with sample topics and vocabulary words.
        </p>
        <button
          onClick={handleSeedAll}
          disabled={seeding}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-[8px] transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--brand)",
            color: "#FFFFFF",
            boxShadow: "0 4px 0 var(--brand-strong)",
            opacity: seeding ? 0.6 : 1,
            cursor: seeding ? "not-allowed" : "pointer",
          }}
        >
          <AdminIcon name="seed" size={18} />
          {seeding ? "Seeding..." : "Seed All Data"}
        </button>
        {seedMsg && (
          <p
            className="text-sm font-medium mt-3"
            style={{ color: seedMsg.includes("fail") || seedMsg.includes("Error") ? "#FF4B4B" : "#58CC02" }}
          >
            {seedMsg}
          </p>
        )}
      </div>
    </div>
  );
}