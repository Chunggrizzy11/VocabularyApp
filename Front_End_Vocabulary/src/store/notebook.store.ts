import { create } from "zustand";
import { notebookService } from "../services/notebook.service";
import type { INotebook, INotebookWord } from "../../types/notebook";

interface NotebookState {
  notebooks: INotebook[];
  selectedNotebook: INotebook | null;
  notebooksLoading: boolean;
  notebooksError: string | null;

  notebookWords: INotebookWord[];
  notebookWordsLoading: boolean;
  notebookWordsError: string | null;
  wordSearch: string;

  notebookStats: {
    total: number;
    mastered: number;
    due: number;
    learning: number;
  } | null;
  statsLoading: boolean;
  statsError: string | null;

  isCreatingNotebook: boolean;
  isAddingWord: boolean;

  setNotebooks: (notebooks: INotebook[]) => void;
  setSelectedNotebook: (notebook: INotebook | null) => void;
  setNotebooksLoading: (loading: boolean) => void;
  setNotebooksError: (error: string | null) => void;

  setNotebookWords: (words: INotebookWord[]) => void;
  setNotebookWordsLoading: (loading: boolean) => void;
  setNotebookWordsError: (error: string | null) => void;
  setWordSearch: (search: string) => void;

  setNotebookStats: (stats: NotebookState["notebookStats"]) => void;
  setStatsLoading: (loading: boolean) => void;
  setStatsError: (error: string | null) => void;

  setIsCreatingNotebook: (value: boolean) => void;
  resetCreatingState: () => void;
  setIsAddingWord: (value: boolean) => void;

  fetchNotebooks: () => Promise<void>;
  createNotebook: (name: string, description?: string) => Promise<void>;
  fetchNotebookWords: (notebookId: string, search?: string) => Promise<void>;
  addWordToNotebook: (notebookId: string, wordData: any) => Promise<void>;
  removeWordFromNotebook: (wordId: string) => Promise<void>;
  fetchNotebookStats: (notebookId: string) => Promise<void>;
  submitReview: (notebookId: string, wordId: string, rating: string) => Promise<void>;

  resetNotebookWords: () => void;
  resetNotebookState: () => void;
}

export const useNotebookStore = create<NotebookState>((set, get) => ({
  notebooks: [],
  selectedNotebook: null,
  notebooksLoading: false,
  notebooksError: null,
  notebookWords: [],
  notebookWordsLoading: false,
  notebookWordsError: null,
  wordSearch: "",
  notebookStats: null,
  statsLoading: false,
  statsError: null,
  isCreatingNotebook: false,
  isAddingWord: false,

  setNotebooks: (notebooks) => set({ notebooks }),
  setSelectedNotebook: (notebook) => set({ selectedNotebook: notebook }),
  setNotebooksLoading: (loading) => set({ notebooksLoading: loading }),
  setNotebooksError: (error) => set({ notebooksError: error }),
  setNotebookWords: (words) => set({ notebookWords: words }),
  setNotebookWordsLoading: (loading) => set({ notebookWordsLoading: loading }),
  setNotebookWordsError: (error) => set({ notebookWordsError: error }),
  setWordSearch: (search) => set({ wordSearch: search }),
  setNotebookStats: (stats) => set({ notebookStats: stats }),
  setStatsLoading: (loading) => set({ statsLoading: loading }),
  setStatsError: (error) => set({ statsError: error }),
  setIsCreatingNotebook: (value) => set({ isCreatingNotebook: value }),
  resetCreatingState: () => set({ isCreatingNotebook: false }),
  setIsAddingWord: (value) => set({ isAddingWord: value }),

  fetchNotebooks: async () => {
    set({ notebooksLoading: true, notebooksError: null });
    try {
      const data = await notebookService.getAll();
      set({ notebooks: Array.isArray(data) ? data : [] });
    } catch (e: any) { set({ notebooksError: e.message }); }
    finally { set({ notebooksLoading: false }); }
  },

  createNotebook: async (name, description) => {
    set({ isCreatingNotebook: true, notebooksError: null });
    console.log("Store: Starting createNotebook...");

    // Fallback: tự reset after 8s nếu request bị treo
    const timeoutId = setTimeout(() => {
      console.warn("Store: Timeout — reset creating state");
      set({ isCreatingNotebook: false, notebooksError: "Request timed out. Bạn có muốn thử lại?" });
    }, 8000);

    try {
      const data = await notebookService.create({ name, description });
      console.log("Store: Create success, data:", data);
      set((state) => ({ notebooks: [...state.notebooks, data] }));
    } catch (e: any) {
      console.error("Store: Create error:", e);
      set({ notebooksError: e.message });
    }
    finally {
      clearTimeout(timeoutId);
      set({ isCreatingNotebook: false });
    }
  },

  fetchNotebookWords: async (notebookId, search) => {
    set({ notebookWordsLoading: true, notebookWordsError: null, wordSearch: search || "" });
    try {
      const data = await notebookService.getWords(notebookId, search);
      set({ notebookWords: Array.isArray(data) ? data : [] });
    } catch (e: any) { set({ notebookWords: [], notebookWordsError: e.message }); }
    finally { set({ notebookWordsLoading: false }); }
  },

  addWordToNotebook: async (notebookId, wordData) => {
    set({ isAddingWord: true, notebookWordsError: null });
    try {
      const data = await notebookService.addWord(notebookId, wordData);
      set((state) => ({ notebookWords: [...(state.notebookWords || []), data] }));
    } catch (e: any) { set({ notebookWordsError: e.message }); }
    finally { set({ isAddingWord: false }); }
  },

  removeWordFromNotebook: async (wordId) => {
    try {
      await notebookService.removeWord(wordId);
      set((state) => ({ notebookWords: (state.notebookWords || []).filter(w => w._id !== wordId) }));
    } catch (e: any) { set({ notebookWordsError: e.message }); }
  },

  fetchNotebookStats: async (notebookId) => {
    set({ statsLoading: true, statsError: null });
    try {
      const data = await notebookService.getStats(notebookId);
      set({ notebookStats: data });
    } catch (e: any) { set({ statsError: e.message }); }
    finally { set({ statsLoading: false }); }
  },

  submitReview: async (notebookId, wordId, rating) => {
    try {
      await notebookService.submitReview(notebookId, wordId, rating);
      await get().fetchNotebookWords(notebookId); // Refresh words
    } catch (e: any) { set({ notebookWordsError: e.message }); }
  },

  resetNotebookWords: () => set({ notebookWords: [], notebookWordsLoading: false, wordSearch: "" }),
  resetNotebookState: () => set({
    notebooks: [],
    selectedNotebook: null,
    notebooksLoading: false,
    notebookWords: [],
    notebookStats: null
  }),
}));