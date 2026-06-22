import type { SRSRating } from "../../types/Review";

interface Props {
  onRate: (rating: SRSRating) => void;
}

const RATINGS: { label: string; rating: SRSRating; color: string; hoverColor: string; shadow: string }[] = [
  { label: "Again", rating: "again", color: "#FF4B4B", hoverColor: "#E62E2E", shadow: "#E62E2E" },
  { label: "Hard", rating: "hard", color: "#FF9600", hoverColor: "#E68600", shadow: "#CC6F00" },
  { label: "Good", rating: "good", color: "#58CC03", hoverColor: "#4AB800", shadow: "#3D8F00" },
  { label: "Easy", rating: "easy", color: "#1CB0F6", hoverColor: "#0E9EDE", shadow: "#0B7CB0" },
];

export default function ReviewButtons({ onRate }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
      {RATINGS.map((r) => (
        <button
          key={r.rating}
          onClick={() => onRate(r.rating)}
          className="font-bold text-white text-[11px] sm:text-sm uppercase tracking-wide transition-all"
          style={{
            padding: "16px 6px",
            borderRadius: "12px",
            backgroundColor: r.color,
            boxShadow: `0 4px 0 ${r.shadow}`,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.6px",
            minHeight: "52px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = r.hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = r.color;
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(2px)";
            e.currentTarget.style.boxShadow = `0 2px 0 ${r.shadow}`;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 4px 0 ${r.shadow}`;
          }}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
