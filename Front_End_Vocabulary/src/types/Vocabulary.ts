export interface VocabularyWord {
  _id: string;
  topicId: string;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  imageUrl?: string;
  audioUrl?: string;
  difficulty: string;
  srsLevel: number;
  nextReviewAt: string | null;
  createdAt: string;
}
