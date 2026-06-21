import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useTopics } from "../../hooks/useTopics";
import TopicCard from "../../components/topic/TopicCard";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import { seedService } from "../../services/seed.service";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";

export default function TopicsPage() {
  const { topics, isLoading, error, refresh } = useTopics();
  const [seeding, setSeeding] = useState(false);
  const [reseed, setReseed] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);
  const containerRef = useAnimatedEntrance([isLoading, topics.length]);

  const handleSeedAll = async () => {
    setSeeding(true);
    setSeedResult(null);
    setSeedError(null);
    try {
      const result = await seedService.seedAll();
      setSeedResult(`Created ${result.totalWordsCreated} words across ${result.topics} topics!`);
      refresh();
    } catch (e: any) {
      setSeedError(e.message ?? "Seed failed. Is the backend running?");
    } finally {
      setSeeding(false);
    }
  };

  const handleReseed = async () => {
    setReseed(true);
    setSeedResult(null);
    setSeedError(null);
    try {
      const result = await seedService.reseed();
      setSeedResult(`Reseeded ${result.totalWordsCreated} words across ${result.topics} topics!`);
      refresh();
    } catch (e: any) {
      setSeedError(e.message ?? "Reseed failed. Is the backend running?");
    } finally {
      setReseed(false);
    }
  };

  return (
    <MainLayout>
      <div ref={containerRef} className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
              Topics
            </h1>
            <p className="text-sm md:text-base" style={{ color: "var(--text-body)" }}>
              Choose a topic to start learning
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
            <Button variant="secondary" onClick={handleReseed} loading={reseed} disabled={reseed || seeding} size="sm">
              <Icon name="refresh" size={14} color="currentColor" /> Re-seed
            </Button>
            <Button onClick={handleSeedAll} loading={seeding} disabled={seeding || reseed} size="sm">
              <Icon name="seed" size={14} color="currentColor" /> Auto-Seed
            </Button>
          </div>
        </div>

        {seedResult && (
          <div
            className="p-4 mb-6 text-sm font-bold flex items-center gap-2"
            style={{
              backgroundColor: "var(--success-soft)",
              color: "var(--fg-success-strong)",
              borderRadius: "var(--radius-default)",
              border: "2px solid var(--border-success-subtle)",
            }}
          >
            <Icon name="check" size={16} color="var(--success)" /> {seedResult}
          </div>
        )}
        {seedError && (
          <div
            className="p-4 mb-6 text-sm font-bold flex items-center gap-2"
            style={{
              backgroundColor: "var(--danger-soft)",
              color: "var(--fg-danger-strong)",
              borderRadius: "var(--radius-default)",
              border: "2px solid var(--border-danger-subtle)",
            }}
          >
            <Icon name="close" size={16} color="var(--danger)" /> {seedError}
          </div>
        )}

        {isLoading && <Loading label="Loading topics..." />}
        {error && (
          <div
            className="p-4 text-sm font-bold"
            style={{ backgroundColor: "var(--danger-soft)", color: "var(--fg-danger-strong)", borderRadius: "var(--radius-default)", border: "2px solid var(--border-danger-subtle)" }}
          >
            {error}
          </div>
        )}
        {!isLoading && topics.length === 0 && !seeding && (
          <EmptyState
            title="No topics yet"
            description='Click "Auto-Seed All" to generate 500+ words in 18 topics'
            icon="seed"
            action={{ label: "Auto-Seed Now", onClick: handleSeedAll }}
          />
        )}

        {!isLoading && topics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <TopicCard key={topic._id} topic={topic} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
