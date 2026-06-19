import { useEffect, useState } from "react";
import { usePhonetic } from "../../hooks/usePhonetic";

interface Props {
  word: string;
  /** Phonetic from database as fallback */
  fallback?: string | null;
}

/** Regex to detect standard IPA vs casual/DIY phonetics */
const IPA_LIKE = /^\/?[ˈˌəɛæɑɔθðŋʃʒɡđħʔ\]]/;

/**
 * Displays correct IPA phonetic for a word.
 * Fetches from Free Dictionary API when the stored phonetic looks
 * non-standard (DIY instead of real IPA).
 * Falls back to stored value if API fails.
 */
export default function Phonetic({ word, fallback }: Props) {
  const { fetchPhonetic } = usePhonetic();
  const [phonetic, setPhonetic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // If fallback looks like real IPA, use it immediately
    if (fallback && IPA_LIKE.test(fallback)) {
      setPhonetic(fallback);
      return;
    }

    // Otherwise fetch correct IPA from dictionary API
    setLoading(true);
    fetchPhonetic(word).then((result) => {
      if (!cancelled) {
        setPhonetic(result || fallback || null);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [word, fallback, fetchPhonetic]);

  if (!phonetic && !loading) return null;
  if (loading && !phonetic) return null;

  return (
    <span className="text-sm font-medium" style={{ color: "var(--text-body-subtle)", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {loading ? <span className="skeleton inline-block w-16 h-4 align-middle" /> : phonetic}
    </span>
  );
}
