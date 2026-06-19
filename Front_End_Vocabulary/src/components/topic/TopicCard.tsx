import { Link } from "react-router-dom";
import type { Topic } from "../../types/Topic";
import Icon from "../common/Icon";
import type { IconName } from "../common/Icon";

interface Props {
  topic: Topic;
}

const TOPIC_ICONS: Record<string, IconName> = {
  animal: "paw",
  business: "briefcase",
  travel: "globe",
  food: "coffee",
  technology: "target",
  education: "book-open",
  health: "heart",
  nature: "leaf",
  art: "palette",
  music: "music",
};

const TOPIC_COLORS: Record<string, string> = {
  animal: "#FFC800",
  business: "#58CC03",
  travel: "#1CB0F6",
  food: "#FF9600",
  technology: "#CE82FF",
  education: "#58CC03",
  health: "#FF4B4B",
  nature: "#00CD9C",
  art: "#FF86D0",
  music: "#DD3EFF",
};

function getIcon(title: string): IconName {
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(TOPIC_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "book";
}

function getColor(title: string): string {
  const lower = title.toLowerCase();
  for (const [key, color] of Object.entries(TOPIC_COLORS)) {
    if (lower.includes(key)) return color;
  }
  return "var(--brand)";
}

export default function TopicCard({ topic }: Props) {
  const color = getColor(topic.title);
  return (
    <Link
      to={`/topics/${topic._id}`}
      className="card no-underline"
      style={{
        display: "block",
        padding: "24px",
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
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon name={getIcon(topic.title)} size={22} color={color} />
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
