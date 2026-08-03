interface NotebookStatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export default function NotebookStatsCard({ title, value, color }: NotebookStatsCardProps) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
        <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-6 3 6M7 12h10" />
        </svg>
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
          {title}
        </div>
        <div className="text-2xl font-extrabold" style={{ color }}>
          {value}
        </div>
      </div>
    </div>
  );
}