import { useTopics } from "../../hooks/useTopics";
import Icon from "./Icon";

interface Props {
  selectedTopicId: string;
  onChange: (topicId: string) => void;
  /** Show "All Topics" option */
  showAll?: boolean;
  label?: string;
}

export default function TopicSelector({ selectedTopicId, onChange, showAll = true, label = "Topic" }: Props) {
  const { topics, isLoading } = useTopics();

  if (isLoading) {
    return (
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>
          {label}
        </label>
        <div className="skeleton h-[48px] rounded-[12px]" />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 1 }}>
          <Icon name="folder" size={18} color="var(--text-body-subtle)" />
        </div>
        <select
          value={selectedTopicId}
          onChange={(e) => onChange(e.target.value)}
          className="select"
          style={{ paddingLeft: "40px" }}
        >
          {showAll && <option value="">All Topics</option>}
          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>
              {topic.title} ({topic.totalWords} words)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
