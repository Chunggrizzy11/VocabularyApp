---
name: word-generation-feature
description: Auto-generate vocabulary words from free dictionary APIs (Datamuse + Free Dictionary API) by topic
metadata:
  type: project
  tags: [backend, frontend, api-integration, vocabulary]
---

The VocabularyApp has a **Word Generator** feature that uses free external dictionary APIs to auto-populate vocabulary words for topics:

**Backend** (`Back_End_Vocabulary/src/`):
- [services/externalDictionary.service.ts](src/services/externalDictionary.service.ts) — calls **Datamuse API** (semantic word search by topic) + **Free Dictionary API** (phonetic, meaning, examples, pronunciation audio). Has `generateForTopic(topic, count, difficulty?)` and `lookupWord(word)`.
- [controllers/generation.controller.ts](src/controllers/generation.controller.ts) — 3 endpoints: `POST /preview` (generate without saving), `POST /save` (generate + batch save to topic), `GET /lookup/:word`.
- [routes/generation.routes.ts](src/routes/generation.routes.ts) — registered at `/api/generation`.

**Frontend** (`Front_End_Vocabulary/src/`):
- [types/Generation.ts](Profile/Front_End_Vocabulary/src/types/Generation.ts) — TypeScript types for generated words and request/response shapes.
- [services/generation.service.ts](Profile/Front_End_Vocabulary/src/services/generation.service.ts) — API client for the generation endpoints.
- [store/generation.store.ts](Profile/Front_End_Vocabulary/src/store/generation.store.ts) — Zustand store with form state, preview results, save state.
- [pages/WordGenerator/WordGeneratorPage.tsx](Profile/Front_End_Vocabulary/src/pages/WordGenerator/WordGeneratorPage.tsx) — UI: topic dropdown, keyword input, word count/difficulty selectors, preview + save buttons, results cards with pronunciation audio.
- Route `/generate` added to AppRoutes and Navbar.

**Flow:** User selects/creates a topic → enters keyword → clicks Preview → sees generated words → clicks Save to persist them to MongoDB.

**Why:** Manual word entry is slow. This lets a user populate 10-30 words per topic in seconds using free APIs, enabling rapid topic creation for learning.

**How to apply:** Start backend (`cd Back_End_Vocabulary && npm run dev`), start frontend (`cd Front_End_Vocabulary && npm run dev`), navigate to `/generate`.
