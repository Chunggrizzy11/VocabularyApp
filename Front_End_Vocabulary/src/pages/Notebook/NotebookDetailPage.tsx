import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotebookStore } from "../../store/notebook.store";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import NotebookWordCard from "../../components/notebook/NotebookWordCard";
import AddWordToNotebookModal from "../../components/notebook/AddWordToNotebookModal";
import NotebookStatsCard from "../../components/notebook/NotebookStatsCard";

export default function NotebookDetailPage() {
  const { notebookId } = useParams<{ notebookId: string }>();
  const navigate = useNavigate();

  const {
    selectedNotebook,
    notebookWords,
    notebookWordsLoading,
    notebookWordsError,
    wordSearch,
    notebookStats,
    statsLoading,
    fetchNotebookWords,
    fetchNotebookStats,
    addWordToNotebook,
    resetNotebookWords,
    setWordSearch,
  } = useNotebookStore();

  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  useEffect(() => {
    if (notebookId) {
      fetchNotebookWords(notebookId);
      fetchNotebookStats(notebookId);
    }
    return () => resetNotebookWords();
  }, [notebookId, fetchNotebookWords, fetchNotebookStats, resetNotebookWords]);

  // Fetch notebook details when selectedNotebook is null or changed
  useEffect(() => {
    if (!selectedNotebook || selectedNotebook._id !== notebookId) {
      // We don't have a getById function in store, so we'll navigate away if invalid
      if (!notebookId) {
        navigate("/notebooks");
      }
    }
  }, [selectedNotebook, notebookId, navigate]);

  const filteredWords = (notebookWords || []).filter((word) =>
    word.word.toLowerCase().includes(wordSearch.toLowerCase()) ||
    word.meaning.toLowerCase().includes(wordSearch.toLowerCase())
  );

  if (notebookWordsLoading && (!notebookWords || notebookWords.length === 0)) {
    return <Loading label="Loading notebook..." />;
  }

  if (notebookWordsError) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
        <div className="card p-4 sm:p-6 text-center">
          <h2 className="text-lg font-bold text-danger mb-2">Error</h2>
          <p className="text-sm text-body-subtle">{notebookWordsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/notebooks")}
        className="flex items-center gap-2 mb-4 text-sm font-medium transition-colors"
        style={{ color: "var(--brand)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Notebooks
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
            {selectedNotebook?.name || "Notebook"}
          </h1>
          <p className="text-sm sm:text-base mt-1" style={{ color: "var(--text-body-subtle)" }}>
            {selectedNotebook?.description || "Your personal vocabulary collection"}
          </p>
        </div>
        <div className="flex gap-2">
          {notebookStats && notebookStats.due > 0 && (
            <button
              onClick={() => navigate(`/notebooks/${notebookId}/review`)}
              className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "var(--brand)", color: "white", borderRadius: "8px", cursor: "pointer" }}
            >
              Review Now ({notebookStats.due})
            </button>
          )}
          <button
            onClick={() => setIsAddWordModalOpen(true)}
            className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: "var(--brand-softer)", color: "var(--brand)", borderRadius: "8px", cursor: "pointer" }}
          >
            + Add Word
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-3 animate-pulse">
              <div className="h-4 bg-neutral-tertiary-medium rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-neutral-tertiary-medium rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : notebookStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <NotebookStatsCard
            title="Total Words"
            value={notebookStats.total}
            icon="book"
            color="var(--brand)"
          />
          <NotebookStatsCard
            title="Learning"
            value={notebookStats.learning}
            icon="refresh"
            color="var(--brand-softer)"
          />
          <NotebookStatsCard
            title="Mastered"
            value={notebookStats.mastered}
            icon="star"
            color="var(--brand-strong)"
          />
          <NotebookStatsCard
            title="Due Today"
            value={notebookStats.due}
            icon="alert"
            color="var(--danger)"
          />
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search words or meanings..."
            value={wordSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWordSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            style={{ borderColor: "var(--border-default)" }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5" style={{ color: "var(--text-body-subtle)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Words Grid */}
      {filteredWords.length === 0 ? (
        <EmptyState
          title={wordSearch ? "No matching words" : "No words in this notebook yet"}
          description={wordSearch
            ? "Try adjusting your search terms or add new words."
            : "Add words to this notebook to start your personal vocabulary collection."
          }
          icon={wordSearch ? "search" : "book"}
          action={!wordSearch ? { label: "Add Your First Word", onClick: () => setIsAddWordModalOpen(true) } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <NotebookWordCard
              key={word._id}
              word={word}
              onReview={() => navigate(`/review?notebookId=${notebookId}`)}
            />
          ))}
        </div>
      )}

      <AddWordToNotebookModal
        isOpen={isAddWordModalOpen}
        onClose={() => setIsAddWordModalOpen(false)}
        onAdd={async (wordData) => {
          if (!notebookId) return;
          await addWordToNotebook(notebookId, wordData);
          setIsAddWordModalOpen(false);
        }}
      />
    </div>
  );
}