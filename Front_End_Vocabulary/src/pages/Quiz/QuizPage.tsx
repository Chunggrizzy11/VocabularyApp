import MainLayout from "../../layouts/MainLayout";
import { useVocabulary } from "../../hooks/useVocabulary";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import Loading from "../../components/common/Loading";
import TopicSelector from "../../components/common/TopicSelector";
import { generateQuiz } from "../../utils/quizGenerator";
import { useAnimatedEntrance } from "../../hooks/useAnimatedEntrance";
import { useUISound } from "../../hooks/useUISound";

export default function QuizPage() {
  const [topicId, setTopicId] = useState("");
  const { words, isLoading } = useVocabulary(topicId || undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const { playCorrect, playWrong } = useUISound();

  const quizzes = useMemo(() => generateQuiz(words), [words]);
  const containerRef = useAnimatedEntrance([isLoading, quizzes.length, currentIndex, topicId]);

  // Reset quiz when topic changes
  useEffect(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFeedback(null);
  }, [topicId, quizzes.length]);

  // Reset feedback when question changes
  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [currentIndex]);

  if (isLoading) return <MainLayout><Loading label="Preparing quiz..." /></MainLayout>;

  if (quizzes.length === 0) {
    return (
      <MainLayout>
        <div ref={containerRef} className="max-w-2xl mx-auto">
          <h1 className="text-[36px] font-extrabold mb-6" style={{ color: "var(--text-heading)" }}>Quiz</h1>
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
          <EmptyState
            title="Not enough vocabulary"
            description={topicId ? "This topic needs at least 4 words for a quiz. Add more words or try another topic." : "Add at least 4 words to your topics to generate a quiz"}
            icon="target"
          />
        </div>
      </MainLayout>
    );
  }

  const q = quizzes[currentIndex];

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);

    const isCorrect = answer === q.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); } else { playWrong(); }

    setTimeout(() => {
      if (currentIndex + 1 >= quizzes.length) {
        setShowResult(true);
        setSelected(null);
        setFeedback(null);
      } else {
        // Reset BEFORE advancing index to prevent ghost highlight
        setSelected(null);
        setFeedback(null);
        setCurrentIndex((i) => i + 1);
      }
    }, 800);
  };

  const getOptionStyle = (opt: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: "14px 16px",
      borderRadius: "var(--radius-default)",
      border: "2px solid var(--border-default)",
      color: "var(--text-heading)",
      fontSize: "15px",
      transition: "all 150ms ease-out",
      cursor: selected ? "not-allowed" : "pointer",
      fontWeight: 700,
    };

    if (!selected || !feedback) {
      // Not selected yet — show hover-ready state
      return {
        ...base,
        backgroundColor: "var(--neutral-primary-soft)",
      };
    }

    if (opt === q.correctAnswer) {
      // Correct answer — always highlight green
      return {
        ...base,
        backgroundColor: "var(--success-soft)",
        borderColor: "var(--border-success)",
        color: "var(--fg-success-strong)",
        transform: feedback === "correct" ? "scale(1.02)" : "scale(1)",
        boxShadow: feedback === "correct" ? "0 4px 0 var(--brand-strong)" : "none",
      };
    }

    if (opt === selected && feedback === "wrong") {
      // Wrong answer — highlight red
      return {
        ...base,
        backgroundColor: "var(--danger-soft)",
        borderColor: "var(--border-danger)",
        color: "var(--fg-danger-strong)",
        transform: "scale(0.98)",
        opacity: 0.8,
      };
    }

    // Other options — dimmed
    return {
      ...base,
      backgroundColor: "var(--neutral-primary-soft)",
      opacity: 0.5,
    };
  };

  if (showResult || currentIndex >= quizzes.length) {
    const pct = Math.round((score / quizzes.length) * 100);
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center">
          <div className="card p-8">
            <Icon name="party" size={60} color="var(--brand)" />
            <h1 className="text-[36px] font-extrabold mt-4" style={{ color: "var(--text-heading)" }}>
              Quiz Complete!
            </h1>
            <p className="text-[36px] font-extrabold mt-4" style={{ color: "var(--brand)" }}>
              {score}/{quizzes.length}
            </p>
            <p className="mt-2" style={{ color: "var(--text-body)" }}>
              {pct}% correct
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setSelected(null);
                setShowResult(false);
                setFeedback(null);
              }}
              className="mt-6 font-bold text-sm uppercase tracking-wide inline-flex items-center gap-1.5"
              style={{
                padding: "14px 20px",
                borderRadius: "12px",
                backgroundColor: "var(--brand)",
                color: "#FFFFFF",
                boxShadow: "0 4px 0 var(--brand-strong)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Icon name="refresh" size={14} color="white" /> Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const progress = ((currentIndex + 1) / quizzes.length) * 100;

  return (
    <MainLayout>
      <div ref={containerRef} className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
            Quiz
          </h1>
          <span className="badge">
            {currentIndex + 1} of {quizzes.length}
          </span>
        </div>

        <div className="mb-6">
          <TopicSelector selectedTopicId={topicId} onChange={setTopicId} />
        </div>

        <div className="progress-track mb-8">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="card p-8" key={currentIndex}>
          <p
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: "var(--text-body-subtle)" }}
          >
            {q.type === "meaning-to-word" ? "Definition → Word" : "Word → Definition"}
          </p>
          <p
            className="text-xl font-bold mb-6"
            style={{ color: "var(--text-heading)" }}
          >
            {q.question}
          </p>
          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                style={getOptionStyle(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => {
              if (selected) return;
              setCurrentIndex((i) => Math.max(0, i - 1));
            }}
            disabled={currentIndex === 0 || !!selected}
            className="font-bold text-sm uppercase tracking-wide inline-flex items-center gap-1.5"
            style={{
              padding: "14px 20px",
              borderRadius: "12px",
              backgroundColor: currentIndex === 0 || selected ? "var(--neutral-primary-soft)" : "var(--brand)",
              color: currentIndex === 0 || selected ? "var(--text-disabled)" : "#FFFFFF",
              border: "2px solid " + (currentIndex === 0 || selected ? "var(--border-default)" : "transparent"),
              boxShadow: currentIndex === 0 || selected ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)",
              cursor: currentIndex === 0 || selected ? "not-allowed" : "pointer",
              opacity: currentIndex === 0 || selected ? 0.5 : 1,
            }}
          >
            <Icon name="arrow-left" size={14} color={currentIndex === 0 || selected ? "var(--text-disabled)" : "white"} /> Previous
          </button>

          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-body-subtle)" }}>
            Score: {score}/{currentIndex + 1}
          </span>

          <button
            onClick={() => {
              if (selected) return;
              setCurrentIndex((i) => Math.min(quizzes.length - 1, i + 1));
            }}
            disabled={currentIndex >= quizzes.length - 1 || !!selected}
            className="font-bold text-sm uppercase tracking-wide inline-flex items-center gap-1.5"
            style={{
              padding: "14px 20px",
              borderRadius: "12px",
              backgroundColor: currentIndex >= quizzes.length - 1 || selected ? "var(--neutral-primary-soft)" : "var(--brand)",
              color: currentIndex >= quizzes.length - 1 || selected ? "var(--text-disabled)" : "#FFFFFF",
              border: "2px solid " + (currentIndex >= quizzes.length - 1 || selected ? "var(--border-default)" : "transparent"),
              boxShadow: currentIndex >= quizzes.length - 1 || selected ? "0 2px 0 var(--neutral-tertiary-medium)" : "0 4px 0 var(--brand-strong)",
              cursor: currentIndex >= quizzes.length - 1 || selected ? "not-allowed" : "pointer",
              opacity: currentIndex >= quizzes.length - 1 || selected ? 0.5 : 1,
            }}
          >
            Next <Icon name="arrow-right" size={14} color={currentIndex >= quizzes.length - 1 || selected ? "var(--text-disabled)" : "white"} />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
