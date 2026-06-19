import type { LearningProgress } from "../../types/Statistics";

interface Props {
  progress: LearningProgress[];
}

export default function ProgressChart({ progress = [] }: Props) {
  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
        Learning Progress
      </h3>
      {progress.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No data yet.</p>
      ) : (
        <div className="space-y-2">
          {progress.slice(-7).map((p) => (
            <div key={p.date} className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>{p.date}</span>
              <span className="font-semibold" style={{ color: "var(--text)" }}>
                {p.wordsLearned} words
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
