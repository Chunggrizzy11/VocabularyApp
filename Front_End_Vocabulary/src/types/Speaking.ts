export interface SpeakingWord {
  _id: string;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  imageUrl?: string;
  audioUrl?: string;
  difficulty?: string;
}

export interface SpeakingSessionWord {
  vocabularyId: string;
  word: string;
  phonetic: string;
  meaning: string;
  recognizedText: string;
  score: number;
  attemptedAt: string;
}

export interface SpeakingSession {
  words: SpeakingSessionWord[];
  topicId?: string;
  topicName?: string;
  startedAt: string;
  completedAt?: string;
  averageScore: number;
  totalWords: number;
}

export type SpeakingMode = "topic" | "all" | "difficult";

/* ── Web Speech API type declarations ── */

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}
