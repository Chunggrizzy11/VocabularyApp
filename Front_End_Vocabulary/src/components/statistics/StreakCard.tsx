import type { UserStats } from "../../types/Statistics";

interface Props {
  stats: UserStats | null;
}

export default function StreakCard({ stats }: Props) {
  if (!stats) return <p style={{ color: "var(--text-muted)" }}>Loading stats...</p>;

  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
        Streak &amp; Stats
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[24px] font-extrabold" style={{ color: "var(--primary)" }}>
            {stats.currentStreak}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Current Streak
          </p>
        </div>
        <div>
          <p className="text-[24px] font-extrabold" style={{ color: "var(--primary)" }}>
            {stats.longestStreak}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Longest Streak
          </p>
        </div>
        <div>
          <p className="text-[24px] font-extrabold" style={{ color: "var(--primary)" }}>
            {stats.totalWordsLearned}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Words Learned
          </p>
        </div>
      </div>
    </div>
  );
}
