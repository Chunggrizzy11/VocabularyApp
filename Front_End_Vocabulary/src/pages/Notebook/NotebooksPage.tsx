import { useEffect } from "react";
import { useNotebookStore } from "../../store/notebook.store";
import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import NotebookCard from "../../components/notebook/NotebookCard";
import CreateNotebookModal from "../../components/notebook/CreateNotebookModal";

export default function NotebooksPage() {
  const {
    notebooks,
    notebooksLoading,
    notebooksError,
    fetchNotebooks,
    createNotebook,
    setIsCreatingNotebook,
    isCreatingNotebook,
    resetNotebookState,
    resetCreatingState,
  } = useNotebookStore();

  useEffect(() => {
    fetchNotebooks();
    return () => resetNotebookState();
  }, [fetchNotebooks, resetNotebookState]);

  if (notebooksLoading && (!notebooks || notebooks.length === 0)) {
    return <Loading label="Loading notebooks..." />;
  }

  if (notebooksError) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
        <div className="card p-4 sm:p-6 text-center">
          <h2 className="text-lg font-bold text-danger mb-2">Error</h2>
          <p className="text-sm text-body-subtle">{notebooksError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-[28px] md:text-[36px] font-extrabold" style={{ color: "var(--text-heading)" }}>
            My Notebooks
          </h1>
          <p className="text-sm sm:text-base mt-1" style={{ color: "var(--text-body-subtle)" }}>
            Your personal folders for saving and organizing vocabulary
          </p>
        </div>
        <button
          onClick={() => setIsCreatingNotebook(true)}
          className="mt-4 sm:mt-0 btn-primary px-4 py-2 text-sm"
        >
          {isCreatingNotebook ? "Creating..." : "+ New Notebook"}
        </button>
        {isCreatingNotebook && (
          <button
            onClick={resetCreatingState}
            className="mt-4 sm:mt-0 px-4 py-2 text-sm text-red-600 hover:underline"
          >
            Force Reset
          </button>
        )}
      </div>

      {(!notebooks || notebooks.length === 0) ? (
        <EmptyState
          title="No notebooks yet"
          description="Create your first notebook to start saving vocabulary words. Example: IELTS Writing, Netflix series, Business vocabulary, etc."
          icon="folder"
          action={{ label: "Create First Notebook", onClick: () => setIsCreatingNotebook(true) }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook._id} notebook={notebook} />
          ))}
        </div>
      )}

      <CreateNotebookModal
        isOpen={isCreatingNotebook}
        onClose={() => setIsCreatingNotebook(false)}
        onCreate={createNotebook}
      />
    </div>
  );
}