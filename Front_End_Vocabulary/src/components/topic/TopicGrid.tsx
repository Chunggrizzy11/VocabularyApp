import type { Topic } from "../../types/Topic";
import TopicCard from "./TopicCard";

interface Props {
  topics: Topic[];
}

export default function TopicGrid({ topics }: Props) {
  if (topics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <TopicCard key={topic._id} topic={topic} />
      ))}
    </div>
  );
}
