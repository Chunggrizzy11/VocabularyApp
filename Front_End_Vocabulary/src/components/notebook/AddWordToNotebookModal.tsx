import { useState } from "react";
import { useNotebookStore } from "../../store/notebook.store";

interface AddWordToNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wordData: any) => Promise<void>;
  defaultWord?: { word: string; meaning: string; phonetic?: string; partOfSpeech?: string; example?: string };
}

export default function AddWordToNotebookModal({ isOpen, onClose, onAdd, defaultWord }: AddWordToNotebookModalProps) {
  const [word, setWord] = useState(defaultWord?.word || "");
  const [meaning, setMeaning] = useState(defaultWord?.meaning || "");
  const [phonetic, setPhonetic] = useState(defaultWord?.phonetic || "");
  const [partOfSpeech, setPartOfSpeech] = useState(defaultWord?.partOfSpeech || "");
  const [example, setExample] = useState(defaultWord?.example || "");
  const [selectedNotebookId, setSelectedNotebookId] = useState("");

  const { notebooks, isAddingWord } = useNotebookStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim() || !selectedNotebookId) {
      alert("Vui lòng chọn sổ tay và điền đầy đủ thông tin!");
      return;
    }

    await onAdd({
      notebookId: selectedNotebookId,
      word: word.trim(),
      meaning: meaning.trim(),
      phonetic: phonetic.trim() || undefined,
      partOfSpeech: partOfSpeech.trim() || "n/a",
      example: example.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>Add Word to Notebook</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Select Notebook:</label>
          <select
            value={selectedNotebookId}
            onChange={(e) => setSelectedNotebookId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            style={{ borderColor: "var(--border-default)" }}
            required
          >
            <option value="">-- Select Notebook --</option>
            {notebooks.map(nb => <option key={nb._id} value={nb._id}>{nb.name}</option>)}
          </select>
        </div>

        <input
          type="text"
          placeholder="Word (e.g., sophisticated)"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          style={{ borderColor: "var(--border-default)" }}
          required
        />

        <input
          type="text"
          placeholder="Phonetic (optional)"
          value={phonetic}
          onChange={(e) => setPhonetic(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          style={{ borderColor: "var(--border-default)" }}
        />

        <input
          type="text"
          placeholder="Part of Speech (optional)"
          value={partOfSpeech}
          onChange={(e) => setPartOfSpeech(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          style={{ borderColor: "var(--border-default)" }}
        />

        <textarea
          placeholder="Meaning (required)"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          style={{ borderColor: "var(--border-default)" }}
          rows={3}
          required
        />

        <textarea
          placeholder="Example sentence (optional)"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          style={{ borderColor: "var(--border-default)" }}
          rows={2}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium">Cancel</button>
          <button type="submit" disabled={isAddingWord} className="btn-primary px-4 py-2 text-sm">
            {isAddingWord ? "Adding..." : "Add to Notebook"}
          </button>
        </div>
      </form>
    </div>
  );
}