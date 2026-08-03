import { useState } from "react";
import { useNotebookStore } from "../../store/notebook.store";

interface CreateNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}

export default function CreateNotebookModal({ isOpen, onClose, onCreate }: CreateNotebookModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isCreatingNotebook, setIsCreatingNotebook } = useNotebookStore();

  if (!isOpen) return null;

  const handleClose = () => {
    setIsCreatingNotebook(false); // Force reset khi đóng
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await onCreate(name, description);
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-sm z-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-heading)" }}>Create Notebook</h2>
        <input
          type="text"
          placeholder="Notebook Name (e.g., IELTS, Netflix)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          style={{ borderColor: "var(--border-default)" }}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          style={{ borderColor: "var(--border-default)" }}
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium">Cancel</button>
          <button type="submit" className="btn-primary px-4 py-2 text-sm">
            {isCreatingNotebook ? "Creating..." : "Create"}
          </button>
          {isCreatingNotebook && (
            <button type="button" onClick={() => setIsCreatingNotebook(false)} className="px-4 py-2 text-sm text-red-600 hover:underline">
              Force Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}