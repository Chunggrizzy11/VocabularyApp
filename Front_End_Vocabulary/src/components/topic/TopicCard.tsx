import { Link } from "react-router-dom";
import type { Topic } from "../../types/Topic";
import Icon from "../common/Icon";
import type { IconName } from "../common/Icon";

interface Props {
  topic: Topic;
}

/** Exact match: 18 topic titles → unique icon */
const TOPIC_ICON_MAP: Record<string, { icon: IconName; color: string }> = {
  "Greetings & Social": { icon: "speech-bubble", color: "#58CC03" },
  "Family & People": { icon: "person-smile", color: "#FF86D0" },
  "Colors & Descriptions": { icon: "palette", color: "#CE82FF" },
  "Animals": { icon: "paw", color: "#FFC800" },
  "Food & Drink": { icon: "coffee", color: "#FF9600" },
  "Body & Health": { icon: "heart", color: "#FF4B4B" },
  "Weather & Nature": { icon: "weather-cloud", color: "#1CB0F6" },
  "Daily Life & Time": { icon: "sparkle", color: "#58CC03" },
  "Travel": { icon: "globe", color: "#1CB0F6" },
  "Shopping & Money": { icon: "shopping-bag", color: "#CE82FF" },
  "Education & Learning": { icon: "graduation", color: "#58CC03" },
  "Technology": { icon: "target", color: "#CE82FF" },
  "Emotions & Feelings": { icon: "star", color: "#FF86D0" },
  "Business & Work": { icon: "briefcase", color: "#58CC03" },
  "Science": { icon: "microscope", color: "#1CB0F6" },
  "Society & Culture": { icon: "globe", color: "#FF9600" },
  "Home & Living": { icon: "home-filled", color: "#FF9600" },
  "Clothing & Fashion": { icon: "scissors", color: "#FF86D0" },
};

function getTopicStyle(title: string): { icon: IconName; color: string } {
  // Exact match first
  if (TOPIC_ICON_MAP[title]) return TOPIC_ICON_MAP[title];
  // Partial match fallback
  const lower = title.toLowerCase();
  for (const [key, style] of Object.entries(TOPIC_ICON_MAP)) {
    if (lower.includes(key.toLowerCase())) return style;
  }
  return { icon: "book", color: "var(--brand)" };
}

export default function TopicCard({ topic }: Props) {
  const { icon, color } = getTopicStyle(topic.title);
  return (
    <Link
      to={`/topics/${topic._id}`}
      className="card no-underline"
      style={{
        display: "block",
        padding: "16px",
        cursor: "pointer",
        transition: "background-color 100ms ease-out, border-color 100ms ease-out, transform 100ms ease-out, box-shadow 100ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--brand-softer)";
        e.currentTarget.style.borderColor = "var(--border-brand-subtle)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--neutral-primary-soft)";
        e.currentTarget.style.borderColor = "var(--border-default)";
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="text-xl font-bold transition-colors"
            style={{ color: "var(--text-heading)" }}
          >
            {topic.title}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "var(--text-body)" }}>
            {topic.totalWords} words
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon name={icon} size={24} color={color} />
        </div>
      </div>
      <div className="mt-4">
        <span className="badge">
          {topic.totalWords} {topic.totalWords <= 1 ? "lesson" : "lessons"}
        </span>
      </div>
    </Link>
  );
}
