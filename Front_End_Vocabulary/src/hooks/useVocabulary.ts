import { useEffect, useCallback } from "react";
import { useVocabularyStore } from "../store/vocabulary.store";
import { vocabularyService } from "../services/vocabulary.service";

export function useVocabulary(topicId?: string) {
  const { words, searchResults, setWords, setSearchResults, setLoading, setError } = useVocabularyStore();

  const fetchWords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await vocabularyService.getAll(topicId);
      setWords(data);
      setSearchResults(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load vocabulary");
    } finally {
      setLoading(false);
    }
  }, [topicId, setWords, setSearchResults, setLoading, setError]);

  const search = useCallback((query: string) => {
    if (!query) { setSearchResults(words); return; }
    const lower = query.toLowerCase();
    setSearchResults(words.filter((w) => w.word.toLowerCase().includes(lower) || w.meaning.toLowerCase().includes(lower)));
  }, [words, setSearchResults]);

  useEffect(() => { fetchWords(); }, [fetchWords]);

  return {
    words,
    searchResults,
    search,
    isLoading: useVocabularyStore((s) => s.isLoading),
    error: useVocabularyStore((s) => s.error),
    refresh: fetchWords,
  };
}
