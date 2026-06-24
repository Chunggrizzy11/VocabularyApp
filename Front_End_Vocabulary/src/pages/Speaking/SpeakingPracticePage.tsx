import { useState, useCallback } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useSpeakingStore, useSelectedTopicName, useAgainWord } from "../../store/speaking.store";
import { useTopics } from "../../hooks/useTopics";
import PracticeWordCard from "../../components/speaking/PracticeWordCard";
import TopicSelector from "../../components/common/TopicSelector";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Loading from "../../components/common/Loading";
import PronunciationButton from "../../components/common/PronunciationButton";
import { usePronunciation } from "../../hooks/usePronunciation";
import { speakingService } from "../../services/speaking.service";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { getScoreLabel } from "../../utils/pronunciationScore";

export default function SpeakingPracticePage() {
  const { play } = usePronunciation();
  const {
    words,
    currentWordIndex,
    sessionWords,
    isLoading,
    error,
    startSession,
    submitWord,
    nextWord,
    prevWord,
    resetSession,
  } = useSpeakingStore();

  const againWord = useAgainWord();
  const selectedTopicName = useSelectedTopicName() || "";

  const isSessionComplete = words.length > 0 && currentWordIndex >= words.length;
  const { topics } = useTopics();
  const containerRef = useAnimatedEntrance([isLoading, words.length, currentWordIndex]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [showingScore, setShowingScore] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const handleStart = () => {
    const topic = topics.find(t => t._id === selectedTopicId);
    startSession(selectedTopicId || undefined, topic?.title);
  };

  const handleTranscript = useCallback((text: string) => {
    submitWord(text);
    const word = words[currentWordIndex];
    if (word) {
      setCurrentTranscript(text);
      setShowingScore(true);
    }
  }, [submitWord, words, currentWordIndex]);

  const handleNext = () => {
    setShowingScore(false);
    setCurrentTranscript("");
    nextWord();
  };

  const handleAgain = () => {
    setShowingScore(false);
    setCurrentTranscript("");
    againWord();
  };

  // Get score from sessionWords after submit
  const lastSessionWord = sessionWords[sessionWords.length - 1];
  const displayScore = lastSessionWord?.score ?? 0;

  // Session complete: save to backend
  const handleSaveAndReset = async () => {
    const topic = topics.find(t => t._id === selectedTopicId);
    const session = {
      words: sessionWords.map(w => ({
        ...w,
        attemptedAt: new Date(w.attemptedAt).toISOString(),
      })),
      topicId: selectedTopicId || undefined,
      topicName: topic?.title,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      averageScore: sessionWords.length > 0
        ? Math.round(sessionWords.reduce((s, w) => s + w.score, 0) / sessionWords.length)
        : 0,
      totalWords: sessionWords.length,
    };

    try {
      await speakingService.saveSession(session);
    } catch {
      // Graceful fallback: backend may be offline
    }

    resetSession();
    setShowingScore(false);
    setCurrentTranscript("");
  };

  const pageError = error;

  // ── Setup Screen ──
  if (words.length === 0 && !isLoading && !pageError && !isSessionComplete) {
    return (
      <MainLayout>
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Icon name="mic" size={48} color="var(--brand)" />
            <h1 className="text-[28px] md:text-[36px] font-extrabold mt-4" style={{ color: "var(--text-heading)" }}>
              Speaking Practice
            </h1>
            <p className="mt-2" style={{ color: "var(--text-body)" }}>
              Select a topic and start practicing your pronunciation
            </p>
          </div>

          <div className="card p-6 max-w-lg mx-auto">
            <div className="mb-4">
              <TopicSelector
                selectedTopicId={selectedTopicId}
                onChange={setSelectedTopicId}
                label="Choose a Topic"
              />
            </div>
            <Button
              onClick={handleStart}
              disabled={!selectedTopicId}
              fullWidth
              size="lg"
            >
              <Icon name="mic" size={18} color="currentColor" /> Start Practice
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ── Loading ──
  if (isLoading) {
    return (
      <MainLayout>
        <Loading label="Loading words..." />
      </MainLayout>
    );
  }

  // ── Error ──
  if (pageError) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-bold" style={{ color: "var(--danger)" }}>{pageError}</p>
          <Button onClick={resetSession} variant="secondary" className="mt-4">Go Back</Button>
        </div>
      </MainLayout>
    );
  }

  // ── Session Complete ──
  if (isSessionComplete) {
    const averageScore = sessionWords.length > 0
      ? Math.round(sessionWords.reduce((s, w) => s + w.score, 0) / sessionWords.length)
      : 0;
    const { label, color } = getScoreLabel(averageScore);

    return (
      <MainLayout>
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Icon name="mic" size={48} color={color} />
            <h1 className="text-[28px] md:text-[36px] font-extrabold mt-4" style={{ color: "var(--text-heading)" }}>
              Session Complete!
            </h1>
            {selectedTopicName && (
              <p className="mt-1 text-sm font-bold" style={{ color: "var(--fg-brand-strong)" }}>
                Topic: {selectedTopicName}
              </p>
            )}
            <p className="mt-2" style={{ color: "var(--text-body)" }}>
              Great job! Here's how you did.
            </p>
          </div>

          <div className="card p-6 max-w-lg mx-auto mb-8 text-center">
            <span className="text-[48px] font-extrabold" style={{ color }}>{averageScore}</span>
            <span className="text-xl font-bold ml-1" style={{ color }}>/100</span>
            <p className="text-lg font-bold mt-2" style={{ color }}>{label}</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>{sessionWords.length}</p>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>Words</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>{sessionWords.filter(w => w.score >= 70).length}</p>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>Good</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>{sessionWords.filter(w => w.score < 50).length}</p>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>Needs Work</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-w-lg mx-auto mb-8">
            {sessionWords.map((w, i) => {
              const { color: sc } = getScoreLabel(w.score);
              return (
                <div key={i} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold" style={{ color: "var(--text-heading)" }}>{w.word}</p>
                    <p className="text-xs" style={{ color: "var(--text-body-subtle)" }}>
                      You said: "{w.recognizedText || "(skipped)"}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <PronunciationButton word={w.word} size="sm" />
                    <span className="text-lg font-extrabold" style={{ color: sc }}>{w.score}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button onClick={handleSaveAndReset} size="lg">
              Practice Again
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ── Practice Screen ──
  const currentWord = words[currentWordIndex];

  if (!currentWord) {
    return (
      <MainLayout>
        <Loading label="Loading..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => { resetSession(); setShowingScore(false); setCurrentTranscript(""); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-[8px] cursor-pointer border-none"
            style={{ backgroundColor: "var(--neutral-secondary-medium)", color: "var(--text-body)" }}
          >
            <Icon name="chevron-left" size={14} color="currentColor" /> Back
          </button>
          <div className="text-center flex-1">
            <h1 className="text-[20px] font-extrabold" style={{ color: "var(--text-heading)" }}>
              Speaking Practice
            </h1>
            {selectedTopicName && (
              <p className="text-xs mt-0.5" style={{ color: "var(--fg-brand-strong)" }}>
                Topic: {selectedTopicName}
              </p>
            )}
          </div>
          <div style={{ width: 70 }} />
        </div>

        <PracticeWordCard
          word={currentWord}
          currentIndex={currentWordIndex}
          totalWords={words.length}
          showingScore={showingScore}
          score={displayScore}
          recognizedText={currentTranscript}
          topicName={selectedTopicName || undefined}
          onTranscript={handleTranscript}
          onNext={handleNext}
          onPrev={() => { setShowingScore(false); setCurrentTranscript(""); prevWord(); }}
          onAgain={handleAgain}
          onListen={() => play(currentWord.word)}
          onListenAgain={() => play(currentWord.word)}
        />
      </div>
    </MainLayout>
  );
}
