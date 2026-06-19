import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import PronunciationButton from "../../components/common/PronunciationButton";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import { useGenerationStore } from "../../store/generation.store";

export default function WordGeneratorPage() {
  const {
    selectedTopic, setSelectedTopic,
    topics, topicsLoading, fetchTopics,
    topicName, setTopicName,
    wordCount, setWordCount,
    difficulty, setDifficulty,
    previewResults, previewLoading, previewError,
    saving, saveResult,
    preview, saveGenerated, reset,
  } = useGenerationStore();

  useEffect(() => { fetchTopics(); }, [fetchTopics]);

  const canPreview = topicName.trim().length > 0 && !previewLoading;
  const canSave = selectedTopic && previewResults.length > 0 && !saving;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto animate-fade-up">
        <div className="mb-8">
          <h1 className="text-[36px] font-extrabold flex items-center gap-3" style={{ color: "var(--text-heading)" }}>
            <Icon name="sparkle" size={36} color="var(--accent-orange)" /> Word Generator
          </h1>
          <p style={{ color: "var(--text-body)" }}>
            Auto-generate vocabulary words from free dictionary APIs by topic
          </p>
        </div>

        <div className="card p-6 mb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>Target Topic</label>
              {topicsLoading ? <div className="skeleton h-[48px] rounded-[12px]" /> : (
                <select value={selectedTopic?._id || ""} onChange={(e) => { const t = topics.find((t) => t._id === e.target.value); setSelectedTopic(t || null); }} className="select">
                  <option value="">— Select a topic —</option>
                  {topics.map((t) => <option key={t._id} value={t._id}>{t.title} ({t.totalWords} words)</option>)}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>Keyword</label>
              <input type="text" value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="e.g. animal, business..." className="input" />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>Word Count</label>
              <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="select">
                {[5, 10, 15, 20, 25, 30].map((n) => <option key={n} value={n}>{n} words</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--text-heading)" }}>Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="select">
                <option value="mixed">Mixed</option>
                <option value="easy">Easy (A1-A2)</option>
                <option value="medium">Medium (B1-B2)</option>
                <option value="hard">Hard (C1-C2)</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button onClick={preview} disabled={!canPreview} loading={previewLoading}>Preview</Button>
            {selectedTopic && previewResults.length > 0 && (
              <Button variant="secondary" onClick={saveGenerated} disabled={!canSave} loading={saving}>Save to "{selectedTopic.title}"</Button>
            )}
            <button onClick={reset} className="text-sm font-bold uppercase tracking-wide px-4 py-2" style={{ color: "var(--text-body-subtle)", borderRadius: "var(--radius-default)", background: "transparent", border: "none", cursor: "pointer" }}>
              Reset
            </button>
          </div>
        </div>

        {saveResult && (
          <div className="p-4 mb-6 text-sm font-bold flex items-center gap-2" style={{ backgroundColor: "var(--success-soft)", color: "var(--fg-success-strong)", borderRadius: "var(--radius-default)", border: "2px solid var(--border-success-subtle)" }}>
            <Icon name="check" size={16} color="var(--success)" /> Successfully saved <strong>{saveResult.generated}</strong> words to <strong>{selectedTopic?.title}</strong>!
          </div>
        )}
        {previewError && (
          <div className="p-4 mb-6 text-sm font-bold flex items-center gap-2" style={{ backgroundColor: "var(--danger-soft)", color: "var(--fg-danger-strong)", borderRadius: "var(--radius-default)", border: "2px solid var(--border-danger-subtle)" }}>
            <Icon name="close" size={16} color="var(--danger)" /> {previewError}
          </div>
        )}

        {previewLoading && <Loading label="Generating vocabulary..." />}
        {!previewLoading && previewResults.length === 0 && !previewError && (
          <EmptyState title="No words yet" description='Enter a keyword and click "Preview" to generate vocabulary words.' icon="search" />
        )}

        {previewResults.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>Showing {previewResults.length} words</p>
            {previewResults.map((w, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold" style={{ color: "var(--text-heading)" }}>{w.word}</h2>
                      {w.phonetic && <span className="text-sm" style={{ color: "var(--text-body-subtle)" }}>{w.phonetic}</span>}
                    </div>
                    <span className="badge mt-1">{w.partOfSpeech}</span>
                  </div>
                  {w.pronunciation && <PronunciationButton word={w.word} size="md" />}
                </div>
                <p className="mt-3" style={{ color: "var(--text-heading)" }}>{w.meaning}</p>
                {w.example && <p className="mt-2 italic text-sm" style={{ color: "var(--text-body-subtle)" }}>"{w.example}"</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
