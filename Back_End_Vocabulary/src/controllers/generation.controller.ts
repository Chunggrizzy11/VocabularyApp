import { Request, Response } from "express";
import { externalDictionaryService } from "../services/externalDictionary.service";
import { vocabularyService } from "../services/vocabulary.service";
import { success, created, error } from "../utils/response";

export const generationController = {
  /**
   * POST /api/generation/preview
   * Preview generated words WITHOUT saving.
   * Body: { topic: string, count?: number, difficulty?: "easy" | "medium" | "hard" }
   */
  preview: async (req: Request, res: Response) => {
    try {
      const { topic, count = 10, difficulty } = req.body;
      if (!topic) { error(res, "Missing required field: topic", 400); return; }

      const words = await externalDictionaryService.generateForTopic(topic, count, difficulty);
      success(res, words);
    } catch (e: any) {
      error(res, e.message);
    }
  },

  /**
   * POST /api/generation/save
   * Generate words and save them directly to a topic.
   * Body: { topicId: string, topic: string, count?: number, difficulty?: string }
   */
  save: async (req: Request, res: Response) => {
    try {
      const { topicId, topic, count = 10, difficulty } = req.body;
      if (!topicId || !topic) {
        error(res, "Missing required fields: topicId, topic", 400);
        return;
      }

      const words = await externalDictionaryService.generateForTopic(topic, count, difficulty);

      if (words.length === 0) {
        error(res, `Could not generate any words for topic "${topic}". Try a different topic name.`, 404);
        return;
      }

      // Save each word to the topic
      const saved: any[] = [];
      for (const w of words) {
        const doc = await vocabularyService.create({
          topicId,
          word: w.word,
          phonetic: w.phonetic,
          meaning: w.meaning,
          partOfSpeech: w.partOfSpeech,
          example: w.example,
          exampleTranslation: "",
          difficulty: difficultyToLevel(difficulty || w.partOfSpeech),
          // Store pronunciation URL in imageUrl as a temporary field
          // (you can add a dedicated field later)
        });
        saved.push(doc);
      }

      created(res, {
        generated: saved.length,
        words: saved,
      });
    } catch (e: any) {
      error(res, e.message);
    }
  },

  /**
   * GET /api/generation/lookup/:word
   * Look up a single word from the dictionary without saving.
   */
  lookup: async (req: Request, res: Response) => {
    try {
      const word = req.params.word as string;
      if (!word) { error(res, "Missing word parameter", 400); return; }

      const result = await externalDictionaryService.lookupWord(word);
      if (!result) { error(res, `Could not find word "${word}"`, 404); return; }

      success(res, result);
    } catch (e: any) {
      error(res, e.message);
    }
  },
};

function difficultyToLevel(difficulty?: string): string {
  switch (difficulty) {
    case "easy": return "A1";
    case "medium": return "B1";
    case "hard": return "C1";
    default: return "A2";
  }
}
