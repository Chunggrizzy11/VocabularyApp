import { useParams } from "react-router-dom";
import { useVocabulary } from "../../hooks/useVocabulary";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import PronunciationButton from "../../components/common/PronunciationButton";
import Phonetic from "../../components/common/Phonetic";

export default function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { searchResults: words, isLoading } = useVocabulary(id);

  if (isLoading) return <Loading label="Loading vocabulary..." />;

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 animate-fade-up">
        <div className="mb-6 md:mb-8">
          <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>Vocabulary</h1>
          <p className="mt-1 text-sm md:text-base" style={{ color: "var(--text-body)" }}>{words.length} {words.length <= 1 ? "word" : "words"} to learn</p>
        </div>

        {words.length === 0 ? (
          <EmptyState title="No words yet" description="Add words to this topic or use the Word Generator" icon="inbox" />
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {words.map((w) => (
              <div key={w._id} className="card p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <h2 className="text-base sm:text-lg font-bold truncate" style={{ color: "var(--text-heading)" }}>{w.word}</h2>
                      <span className="text-xs sm:text-sm font-medium shrink-0" style={{ color: "var(--text-body-subtle)" }}><Phonetic word={w.word} fallback={w.phonetic} /></span>
                      <PronunciationButton word={w.word} size="sm" />
                    </div>
                    <span className="badge mt-1">{w.partOfSpeech}</span>
                  </div>
                  <span className="badge shrink-0 ml-2 sm:ml-3" style={{ backgroundColor: "var(--neutral-secondary-medium)", color: "var(--text-heading)", borderColor: "var(--border-default)" }}>{w.difficulty}</span>
                </div>
                <p className="mt-3 font-medium text-sm sm:text-base" style={{ color: "var(--text-heading)" }}>{w.meaning}</p>
                {w.example && <p className="mt-2 italic text-xs sm:text-sm" style={{ color: "var(--text-body-subtle)" }}>"{w.example}"</p>}
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
