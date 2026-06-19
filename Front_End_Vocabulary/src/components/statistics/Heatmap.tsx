import type { HeatmapDay } from "../../types/Statistics";

interface Props {
  data: HeatmapDay[];
}

export default function Heatmap({ data = [] }: Props) {
  return (
    <div className="card p-6" style={{ boxShadow: "var(--shadow)" }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
        Activity Heatmap
      </h3>
      {data.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No activity yet.</p>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {data.slice(-28).map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} activities`}
              className="w-6 h-6 rounded-[5px]"
              style={{
                backgroundColor:
                  day.level === 0 ? "var(--border)" :
                  day.level === 1 ? "#C7D2FE" :
                  day.level === 2 ? "#818CF8" :
                  day.level === 3 ? "#6366F1" : "var(--primary)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
