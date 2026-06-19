/**
 * Seed Service — Auto-create topics + bulk vocabulary words.
 * Uses offline WORD_BANK only for instant, reliable seeding.
 * No external API calls during seed (avoids timeout).
 */
import { Topic } from "../models/Topic";
import { Vocabulary } from "../models/Vocabulary";
import { WORD_BANK } from "../data/wordBank";

// ─── Topic definitions for seeding ───

export interface SeedTopicDef {
  title: string;
  description: string;
  topicTags: string[];     // tags to match WORD_BANK topics
  apiKeywords: string[];   // keywords to query Datamuse API
  levels: string[];        // CEFR levels to include
  targetWordCount?: number;
}

const SEED_TOPICS: SeedTopicDef[] = [
  { title: "Greetings & Social", description: "Essential everyday greetings and social expressions", topicTags: ["greetings"], apiKeywords: ["greeting", "hello", "polite"], levels: ["A1"], targetWordCount: 10 },
  { title: "Family & People", description: "Words about family members and relationships", topicTags: ["family"], apiKeywords: ["family", "relative"], levels: ["A1","A2"], targetWordCount: 15 },
  { title: "Colors & Descriptions", description: "Colors and basic describing words", topicTags: ["colors"], apiKeywords: ["color", "bright"], levels: ["A1"], targetWordCount: 11 },
  { title: "Animals", description: "Common animals and pets vocabulary", topicTags: ["animals"], apiKeywords: ["animal", "pet", "wild"], levels: ["A1","A2"], targetWordCount: 18 },
  { title: "Food & Drink", description: "Food, drinks, cooking and eating out", topicTags: ["food"], apiKeywords: ["food", "cooking", "meal"], levels: ["A1","A2","B1"], targetWordCount: 35 },
  { title: "Body & Health", description: "Body parts, symptoms, and health vocabulary", topicTags: ["body","health"], apiKeywords: ["body", "health", "medical"], levels: ["A1","A2","B1"], targetWordCount: 35 },
  { title: "Weather & Nature", description: "Weather conditions and natural world", topicTags: ["weather","nature"], apiKeywords: ["weather", "nature", "climate"], levels: ["A1","A2","B2"], targetWordCount: 48 },
  { title: "Daily Life & Time", description: "Everyday activities and common verbs", topicTags: ["daily_life"], apiKeywords: ["daily", "routine", "everyday"], levels: ["A1","A2"], targetWordCount: 36 },
  { title: "Travel", description: "Travel, transportation, and tourism vocabulary", topicTags: ["travel"], apiKeywords: ["travel", "trip", "journey"], levels: ["A2","B1"], targetWordCount: 25 },
  { title: "Shopping & Money", description: "Shopping, money, and consumer vocabulary", topicTags: ["shopping"], apiKeywords: ["shopping", "store", "money"], levels: ["A2","B1"], targetWordCount: 12 },
  { title: "Education & Learning", description: "School, studying, and academic vocabulary", topicTags: ["school","academic"], apiKeywords: ["school", "study", "education"], levels: ["A2","B1","C1"], targetWordCount: 45 },
  { title: "Technology", description: "Computers, internet, and modern technology", topicTags: ["technology"], apiKeywords: ["technology", "computer", "digital"], levels: ["A2","B1","C1"], targetWordCount: 40 },
  { title: "Emotions & Feelings", description: "Emotions, moods, and personal feelings", topicTags: ["emotions"], apiKeywords: ["emotion", "feeling", "mood"], levels: ["A2","B1","C2"], targetWordCount: 15 },
  { title: "Business & Work", description: "Business, work, and professional vocabulary", topicTags: ["business"], apiKeywords: ["business", "work", "corporate"], levels: ["B1","B2","C1"], targetWordCount: 45 },
  { title: "Science", description: "Scientific terms and research vocabulary", topicTags: ["science"], apiKeywords: ["science", "research", "laboratory"], levels: ["B2","C1"], targetWordCount: 15 },
  { title: "Society & Culture", description: "Society, politics, and cultural vocabulary", topicTags: ["society"], apiKeywords: ["society", "culture", "political"], levels: ["B1","B2","C1","C2"], targetWordCount: 36 },
  { title: "Home & Living", description: "House, furniture, and daily living", topicTags: ["home"], apiKeywords: ["house", "home", "furniture"], levels: ["A1"], targetWordCount: 11 },
  { title: "Clothing & Fashion", description: "Clothes, fashion, and accessories", topicTags: ["clothing"], apiKeywords: ["clothing", "fashion", "wear"], levels: ["A1","A2"], targetWordCount: 10 },
];

// ─── Seeder Logic ───

export const seedService = {

  /** Get all seedable topic definitions */
  getDefinitions: () => SEED_TOPICS,

  /**
   * Seed a single topic: create topic + bulk-insert vocabulary from offline bank.
   * Instant — no external API calls.
   */
  seedTopic: async (def: SeedTopicDef): Promise<{ topic: any; wordsCreated: number }> => {
    // 1. Create or find the topic
    let topic = await Topic.findOne({ title: def.title });
    if (!topic) {
      topic = await Topic.create({
        title: def.title,
        description: def.description,
        totalWords: 0,
      });
    }

    // 2. Count existing words
    const existingCount = await Vocabulary.countDocuments({ topicId: topic._id });
    let needed = (def.targetWordCount || 50) - existingCount;
    if (needed <= 0) {
      return { topic, wordsCreated: 0 };
    }

    // 3. Get matching words from offline bank
    const bankWords = WORD_BANK.filter(
      (w) => def.topicTags.includes(w.topic) && def.levels.includes(w.level)
    );

    const existingWords = await Vocabulary.find({ topicId: topic._id }).select("word");
    const existingWordSet = new Set(existingWords.map((w) => w.word.toLowerCase()));

    const newWords = bankWords.filter((bw) => !existingWordSet.has(bw.word.toLowerCase()));
    const toInsert = newWords.slice(0, needed);

    if (toInsert.length === 0) {
      const total = await Vocabulary.countDocuments({ topicId: topic._id });
      await Topic.findByIdAndUpdate(topic._id, { totalWords: total });
      return { topic, wordsCreated: 0 };
    }

    // 4. Bulk insert
    const docs = toInsert.map((w) => ({
      topicId: topic._id,
      word: w.word,
      phonetic: w.phonetic,
      meaning: w.meaning,
      partOfSpeech: w.pos,
      example: w.example,
      exampleTranslation: "",
      difficulty: w.level,
      srsLevel: 0,
      nextReviewAt: null,
    }));
    await Vocabulary.insertMany(docs);

    // 5. Update count
    const total = await Vocabulary.countDocuments({ topicId: topic._id });
    await Topic.findByIdAndUpdate(topic._id, { totalWords: total });

    return { topic, wordsCreated: docs.length };
  },

  /**
   * Seed ALL predefined topics using offline bank only.
   * Instant — no external API calls.
   */
  seedAll: async (): Promise<{ title: string; wordsCreated: number; totalWords: number }[]> => {
    const results: { title: string; wordsCreated: number; totalWords: number }[] = [];
    for (const def of SEED_TOPICS) {
      const { topic, wordsCreated } = await seedService.seedTopic(def);
      const totalWords = await Vocabulary.countDocuments({ topicId: topic._id });
      results.push({ title: def.title, wordsCreated, totalWords });
    }
    return results;
  },

  /** Seed random words into an existing topic from word bank */
  seedIntoTopic: async (topicId: string, keyword: string, count: number): Promise<number> => {
    const topic = await Topic.findById(topicId);
    if (!topic) throw new Error(`Topic ${topicId} not found`);

    const bankWords = WORD_BANK.filter(
      (w) => w.topic === keyword || w.word.includes(keyword.toLowerCase()) || w.meaning.includes(keyword)
    );
    const existing = await Vocabulary.find({ topicId }).select("word");
    const existingSet = new Set(existing.map((w) => w.word.toLowerCase()));

    const fresh = bankWords.filter((bw) => !existingSet.has(bw.word.toLowerCase()));
    const toInsert = fresh.slice(0, count);
    if (toInsert.length === 0) return 0;

    const docs = toInsert.map((w) => ({
      topicId,
      word: w.word,
      phonetic: w.phonetic,
      meaning: w.meaning,
      partOfSpeech: w.pos,
      example: w.example,
      exampleTranslation: "",
      difficulty: w.level,
      srsLevel: 0,
      nextReviewAt: null,
    }));
    await Vocabulary.insertMany(docs);

    const total = await Vocabulary.countDocuments({ topicId });
    await Topic.findByIdAndUpdate(topicId, { totalWords: total });

    return docs.length;
  },
};
