import { useEffect, useState } from "react";
import { usePhonetic } from "../../hooks/usePhonetic";

interface Props {
  word: string;
  /** Phonetic from database as fallback */
  fallback?: string | null;
}

/** Detect proper IPA characters ( Cambridge / Oxford style ) */
const HAS_IPA_CHARS = /[ˈˌːəɛæɑɔθðŋʃʒɡ]/;

/** Detect DIY phonetics like /good-bī/, /CHik-in/, /hə-lō/ */
const LOOKS_LIKE_DIY = /^[^ˈˌː]*[a-zA-Z][^ˈˌː]*[a-zA-Z][^ˈˌː]*$/;

export default function Phonetic({ word, fallback }: Props) {
  const { fetchPhonetic } = usePhonetic();
  const [phonetic, setPhonetic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (fallback && HAS_IPA_CHARS.test(fallback) && !LOOKS_LIKE_DIY.test(fallback)) {
      setPhonetic(fallback);
      return;
    }

    setLoading(true);
    fetchPhonetic(word).then((result) => {
      if (!cancelled) {
        setPhonetic(result || null);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [word, fallback, fetchPhonetic]);

  if (!phonetic && !loading) return null;

  return (
    <span className="phonetic">
      {loading ? (
        <span className="skeleton inline-block w-20 h-4 align-middle rounded-[4px]" />
      ) : (
        phonetic
      )}
      <style>{`
        .phonetic {
          font-family: "Lucida Sans Unicode", "Gentium Plus", "DejaVu Sans", "Noto Sans", Arial, sans-serif;
          font-size: 0.85em;
          letter-spacing: 0.5px;
        }
      `}</style>
    </span>
  );
}
