import type { VocabularyWord } from "../types/Vocabulary";

export interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: "word-to-meaning" | "meaning-to-word";
  word: string;
  meaning: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct: VocabularyWord, all: VocabularyWord[], count = 3): string[] {
  const pool = all.filter((w) => w._id !== correct._id);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, count).map((w) => w.word);
}

function pickMeaningDistractors(correct: VocabularyWord, all: VocabularyWord[], count = 3): string[] {
  const pool = all.filter((w) => w._id !== correct._id && w.meaning !== correct.meaning);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, count).map((w) => w.meaning);
}

export function generateQuiz(words: VocabularyWord[]): GeneratedQuizQuestion[] {
  if (words.length < 4) return [];

  const shuffled = shuffle(words);
  const questions: GeneratedQuizQuestion[] = [];

  for (const word of shuffled) {
    // 50% meaning-to-word, 50% word-to-meaning
    const type: "meaning-to-word" | "word-to-meaning" = Math.random() < 0.5
      ? "meaning-to-word"
      : "word-to-meaning";

    if (type === "meaning-to-word") {
      const distractors = pickDistractors(word, shuffled);
      if (distractors.length < 3) continue;
      const options = shuffle([word.word, ...distractors]);
      questions.push({
        id: `q-${word._id}-${questions.length}`,
        question: `What word means "${word.meaning}"?`,
        options,
        correctAnswer: word.word,
        type,
        word: word.word,
        meaning: word.meaning,
      });
    } else {
      const distractors = pickMeaningDistractors(word, shuffled);
      if (distractors.length < 3) continue;
      const options = shuffle([word.meaning, ...distractors]);
      questions.push({
        id: `q-${word._id}-${questions.length}`,
        question: `What is the meaning of "${word.word}"?`,
        options,
        correctAnswer: word.meaning,
        type,
        word: word.word,
        meaning: word.meaning,
      });
    }
  }

  return shuffle(questions);
}
