import MainLayout from "../../layouts/MainLayout";
import { useStatistics } from "../../hooks/useStatistics";
import { useVocabulary } from "../../hooks/useVocabulary";
import { useTopics } from "../../hooks/useTopics";
import Loading from "../../components/common/Loading";
import Icon from "../../components/common/Icon";
import { useMemo } from "react";

/** Generate heatmap data from vocabulary nextReviewAt dates */
function computeHeatmap(words: { nextReviewAt: string | null; createdAt: string }[]) {
  // Count reviews per date from nextReviewAt
  const countMap: Record<string, number> = {};

  for (const w of words) {
    // Count reviews due (nextReviewAt)
    if (w.nextReviewAt) {
      const dateStr = new Date(w.nextReviewAt).toISOString().slice(0, 10);
      countMap[dateStr] = (countMap[dateStr] || 0) + 1;
    }
    // Also count word creation as activity
    const createdStr = new Date(w.createdAt).toISOString().slice(0, 10);
    countMap[createdStr] = (countMap[createdStr] || 0) + 1;
  }

  // Build last 84 days (12 weeks)
  const today = new Date();
  const days: { date: string; count: number; level: number }[] = [];

  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = countMap[dateStr] || 0;
    // Level: 0=none, 1=light, 2=medium, 3=heavy, 4=intense
    const level = count === 0 ? 0 : Math.min(Math.floor(count / 3) + 1, 4);
    days.push({ date: dateStr, count, level });
  }

  return days;
}

export default function StatisticsPage() {
  const { userStats, isLoading: statsLoading, error } = useStatistics();
  const { words, isLoading: vocabLoading } = useVocabulary();
  const { topics, isLoading: topicsLoading } = useTopics();

  // Compute real stats from vocabulary data
  const totalWords = topics.reduce((s, t) => s + t.totalWords, 0);
  const wordsNew = words.filter((w) => w.nextReviewAt === null).length;
  const wordsInProgress = words.filter((w) => w.nextReviewAt !== null).length;
  const wordsOverdue = words.filter(
    (w) => w.nextReviewAt && new Date(w.nextReviewAt) <= new Date()
  ).length;
  const wordsMastered = words.filter((w) => w.srsLevel >= 4).length;

  // Generate heatmap from vocabulary data
  const heatmapData = useMemo(() => {
    if (words.length === 0) return [];
    return computeHeatmap(words);
  }, [words]);

  const isLoading = statsLoading || vocabLoading || topicsLoading;

  if (isLoading) return <MainLayout><Loading label="Loading statistics..." /></MainLayout>;
  if (error) {
    return (
      <MainLayout>
        <div
          className="p-4 text-sm font-bold"
          style={{
            backgroundColor: "var(--danger-soft)",
            color: "var(--fg-danger-strong)",
            borderRadius: "var(--radius-default)",
            border: "2px solid var(--border-danger-subtle)",
          }}
        >
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
            Statistics
          </h1>
          <p style={{ color: "var(--text-body)" }}>
            Your learning progress
          </p>
        </div>

        {/* ── Main Stats ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { label: "Total Words", value: totalWords, icon: "book" as const },
            { label: "Mastered", value: wordsMastered, icon: "star" as const },
            { label: "In Progress", value: wordsInProgress, icon: "refresh" as const },
            { label: "New Words", value: wordsNew, icon: "sparkle" as const },
          ].map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--brand-softer)" }}
                >
                  <Icon name={stat.icon} size={22} color="var(--brand)" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
                    {stat.label}
                  </p>
                  <p className="text-[24px] font-extrabold" style={{ color: "var(--text-heading)" }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Review Stats ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { label: "Words Overdue", value: wordsOverdue, icon: "alert" as const },
            { label: "Review Sessions", value: userStats?.totalReviewSessions ?? 0, icon: "refresh" as const },
            { label: "Quiz Sessions", value: userStats?.totalQuizSessions ?? 0, icon: "target" as const },
            { label: "Current Streak", value: `${userStats?.currentStreak ?? 0} days`, icon: "fire" as const },
          ].map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--brand-softer)" }}
                >
                  <Icon name={stat.icon} size={22} color="var(--brand)" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
                    {stat.label}
                  </p>
                  <p className="text-[24px] font-extrabold" style={{ color: "var(--text-heading)" }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Heatmap ── */}
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-heading)" }}>
            Activity Heatmap
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-body-subtle)" }}>
            Words created or scheduled for review per day
          </p>
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1.5 mb-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-[10px] font-bold uppercase" style={{ color: "var(--text-body-subtle)" }}>
                {d}
              </div>
            ))}
          </div>
          {/* Heatmap grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {heatmapData.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} words`}
                className="w-7 h-7 rounded-[6px] flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                style={{
                  backgroundColor:
                    day.level === 0 ? "var(--neutral-tertiary-medium)" :
                    day.level === 1 ? "var(--brand-softer)" :
                    day.level === 2 ? "var(--brand-soft)" :
                    day.level === 3 ? "var(--brand)" : "var(--brand-strong)",
                  border: "2px solid var(--border-default)",
                }}
              />
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] font-bold uppercase" style={{ color: "var(--text-body-subtle)" }}>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-4 h-4 rounded-[4px]"
                style={{
                  backgroundColor:
                    level === 0 ? "var(--neutral-tertiary-medium)" :
                    level === 1 ? "var(--brand-softer)" :
                    level === 2 ? "var(--brand-soft)" :
                    level === 3 ? "var(--brand)" : "var(--brand-strong)",
                  border: "1px solid var(--border-default)",
                }}
              />
            ))}
            <span className="text-[10px] font-bold uppercase" style={{ color: "var(--text-body-subtle)" }}>More</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
