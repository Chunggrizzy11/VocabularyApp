import { useEffect, useState } from "react";
import { usePhonetic } from "../../hooks/usePhonetic";

interface Props {
  word: string;
  /** Phonetic from database as fallback */
  fallback?: string | null;
}

/** Detect proper IPA notation vs casual/DIY phonetics */
const IPA_LIKE = /^\/?[ˈˌˌːəɛæɑɔθðŋʃʒɡđħʔˈˌːiʊuɛɑeiouʌaɪaʊɔɪəɜ]/;

/** Remove homemade phonetics like /hə-lō/, /good-bī/ */
const LOOKS_LIKE_DIY = /^\/?[a-zA-Z].*[a-zA-Z]\/?$/;

export default function Phonetic({ word, fallback }: Props) {
  const { fetchPhonetic } = usePhonetic();
  const [phonetic, setPhonetic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // If fallback looks like real IPA, use it immediately
    if (fallback && IPA_LIKE.test(fallback) && !LOOKS_LIKE_DIY.test(fallback)) {
      setPhonetic(fallback);
      return;
    }

    setLoading(true);
    fetchPhonetic(word).then((result) => {
      if (!cancelled) {
        // If API returned nothing, show fallback as last resort
        setPhonetic(result || (fallback && IPA_LIKE.test(fallback) ? fallback : null));
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [word, fallback, fetchPhonetic]);

  if (!phonetic && !loading) return null;

  return (
    <span
      className="text-sm font-medium"
      style={{
        color: "var(--text-body-subtle)",
        // Use serif for better IPA symbol rendering
        fontFamily: "'Arial', Helvetica, sans-serif",
        letterSpacing: "0.3px",
      }}
    >
      {loading ? (
        <span className="skeleton inline-block w-20 h-4 align-middle rounded-[4px]" />
      ) : (
        phonetic
      )}
    </span>
  );
}
