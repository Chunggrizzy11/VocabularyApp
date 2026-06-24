# Speaking Practice Page — Implementation Plan

## Overview

Add a new **Speaking Practice** page where users can practice pronouncing vocabulary words and receive a score based on pronunciation accuracy. The feature uses the **Web Speech API** (built into modern browsers) for speech recognition — entirely client-side, no third-party STT service required.

---

## Architecture & Technology Decisions

| Concern | Decision | Rationale |
|---------|----------|-----------|
| Speech Recognition | **Web Speech API** (`webkitSpeechRecognition`) | Free, built into Chrome/Edge/Safari, no API key needed |
| Scoring Algorithm | **Levenshtein distance** (edit distance) normalized to 0–100% | Simple, deterministic, no backend ML required |
| Backend Changes | **Minimal** — new optional endpoint to log practice sessions | Words already come from existing `/api/vocabulary` endpoint |
| State Management | **Zustand store** (`speaking.store.ts`) | Matches existing pattern (`review.store.ts`, `quiz.store.ts`) |
| Scoring Persistence | **localStorage** for session results, optional backend save | Keeps it lightweight; user doesn't need an account |

---

## Dependency Graph

```
Phase 1: Foundation (no dependencies)
├── 1A: Types & constants
├── 1B: Scoring utility (Levenshtein)
├── 1C: Speech recognition hook (useSpeechRecognition)
└── 1D: Zustand store (speaking.store.ts)

Phase 2: Backend (independent of frontend Phase 1)
├── 2A: PracticeSession model + interface
├── 2B: Speaking practice service + controller
└── 2C: Speaking practice routes + server registration

Phase 3: Frontend Components (depends on Phase 1)
├── 3A: MicrophoneButton component
├── 3B: ScoreDisplay component
├── 3C: WordCard component (for speaking practice)
└── 3D: SpeakingPracticePage

Phase 4: Integration (depends on Phase 1 + 2 + 3)
├── 4A: Route + navigation wiring
├── 4B: Home page quick action
└── 4C: Backend session logging endpoint integration
```

---

## Task Breakdown

### Phase 1: Foundation (Client-Side)

#### Task 1A: Types & Constants
**Files:**
- `Front_End_Vocabulary/src/types/Speaking.ts` (new)
- `Front_End_Vocabulary/src/constants/speaking.ts` (new)

**Acceptance Criteria:**
- [ ] `SpeakingSession` interface: `{ words: SpeakingWord[], topicId?: string, startedAt: string, completedAt?: string }`
- [ ] `SpeakingWord` interface: `{ vocabularyId: string, word: string, phonetic: string, meaning: string, recognizedText: string, score: number, attemptedAt: string }`
- [ ] `SpeechRecognitionEvent` type declaration for Web Speech API
- [ ] `SCORE_THRESHOLDS` constant: `{ EXCELLENT: 90, GOOD: 70, FAIR: 50 }` (below 50 = poor)
- [ ] `MODES` constant: `TOPIC` (practice by topic) | `ALL` (practice all words) | `DIFFICULT` (words with low past scores)

**Verification:** TypeScript compiles without errors.

---

#### Task 1B: Scoring Utility
**Files:**
- `Front_End_Vocabulary/src/utils/pronunciationScore.ts` (new)

**Acceptance Criteria:**
- [ ] `levenshteinDistance(a: string, b: string): number` — standard DP implementation
- [ ] `calculatePronunciationScore(target: string, recognized: string): number` — returns 0–100
  - Normalized: `1 - (distance / max(len(target), len(recognized))) * 100`
  - Case-insensitive comparison
  - Trims whitespace
  - Handles empty input gracefully (returns 0)
- [ ] `getScoreLabel(score: number): { label: string, color: string }` — maps score to "Excellent" / "Good" / "Fair" / "Try Again"
- [ ] Unit-testable (pure functions, no side effects)

**Verification:** Manual test with known word pairs:
- "hello" vs "hello" → 100
- "hello" vs "helo" → 80
- "hello" vs "world" → ~40
- "" vs "hello" → 0

---

#### Task 1C: Speech Recognition Hook
**Files:**
- `Front_End_Vocabulary/src/hooks/useSpeechRecognition.ts` (new)

**Acceptance Criteria:**
- [ ] Wraps `webkitSpeechRecognition` / `SpeechRecognition` browser API
- [ ] Returns: `{ isListening, transcript, error, startListening, stopListening, isSupported }`
- [ ] `isSupported` detects if browser supports the API
- [ ] Configures: `lang = "en-US"`, `interimResults = false`, `maxAlternatives = 1`
- [ ] Handles errors gracefully: "not-allowed" (mic permission denied), "no-speech" (silence), "network" (offline)
- [ ] Cleanup on unmount (stops recognition, removes event listeners)
- [ ] Returns `error` string for UI display when recognition fails

**Verification:** Works in Chrome/Edge. Shows "not supported" message in unsupported browsers.

---

#### Task 1D: Zustand Store
**Files:**
- `Front_End_Vocabulary/src/store/speaking.store.ts` (new)

**Acceptance Criteria:**
- [ ] State: `words` (loaded vocabulary), `currentWordIndex`, `sessionWords` (completed), `isRecording`, `currentTranscript`, `currentScore`, `sessionComplete`, `selectedTopicId`, `isLoading`, `error`
- [ ] Actions: `loadWords(topicId?)`, `submitWord(recognizedText)`, `nextWord()`, `skipWord()`, `resetSession()`, `setTopicFilter(id?)`
- [ ] `loadWords` fetches from existing `vocabularyService.getAll(topicId?)` and shuffles the array
- [ ] `submitWord` calculates score using `pronunciationScore.ts`, stores result in `sessionWords`, advances index
- [ ] `nextWord` increments `currentWordIndex`, checks if session complete
- [ ] `resetSession` clears all state
- [ ] Computed: `currentWord`, `averageScore`, `wordsPracticed`, `progressPercent`

**Verification:** Store initializes correctly, actions update state, TypeScript types match.

---

### Phase 2: Backend (Optional Session Logging)

#### Task 2A: PracticeSession Model
**Files:**
- `Back_End_Vocabulary/src/interfaces/practiceSession.interface.ts` (new)
- `Back_End_Vocabulary/src/models/PracticeSession.ts` (new)

**Acceptance Criteria:**
- [ ] Interface: `IPracticeSession { topicId?, words: [{ word, recognizedText, score, attemptedAt }], averageScore, totalWords, startedAt, completedAt }`
- [ ] Mongoose schema with timestamps
- [ ] Index on `completedAt` for querying recent sessions

**Verification:** Model compiles, can create/save documents.

---

#### Task 2B: Practice Session Service + Controller
**Files:**
- `Back_End_Vocabulary/src/services/practiceSession.service.ts` (new)
- `Back_End_Vocabulary/src/controllers/practiceSession.controller.ts` (new)

**Acceptance Criteria:**
- [ ] Service: `create(session)`, `getHistory(limit)`, `getStats(topicId?)`
- [ ] `getStats` returns: `{ totalSessions, totalWordsPracticed, averageScore, recentTrend }`
- [ ] Controller wraps service with error handling (follows existing pattern)
- [ ] Uses `success()` / `error()` from `utils/response.ts`

**Verification:** Endpoints return correct data shapes.

---

#### Task 2C: Routes + Server Registration
**Files:**
- `Back_End_Vocabulary/src/routes/practiceSession.routes.ts` (new)
- `Back_End_Vocabulary/src/server.ts` (modify)

**Acceptance Criteria:**
- [ ] `POST /api/practice-sessions` — save a completed session
- [ ] `GET /api/practice-sessions` — get history (with optional `?limit=N`)
- [ ] `GET /api/practice-sessions/stats` — get aggregate stats
- [ ] Route registered in `server.ts` as `app.use("/api/practice-sessions", practiceSessionRoutes)`
- [ ] Follows existing patterns (controller → service → repository)

**Verification:** `curl` or browser can hit endpoints, server starts without errors.

---

### Phase 3: Frontend Components

#### Task 3A: MicrophoneButton Component
**Files:**
- `Front_End_Vocabulary/src/components/speaking/MicrophoneButton.tsx` (new)

**Acceptance Criteria:**
- [ ] Large, prominent record button (64px+ on desktop, 56px on mobile)
- [ ] Idle state: microphone icon, neutral color
- [ ] Recording state: pulsing red animation (CSS animation via `animate-pulse` or custom)
- [ ] Disabled state: grayed out when not supported or during processing
- [ ] On click: toggles `useSpeechRecognition.startListening()` / `stopListening()`
- [ ] Shows `isSupported` warning if browser doesn't support Web Speech API
- [ ] Accessible: `aria-label`, keyboard support

**Verification:** Button animates when recording, stops when clicked again.

---

#### Task 3B: ScoreDisplay Component
**Files:**
- `Front_End_Vocabulary/src/components/speaking/ScoreDisplay.tsx` (new)

**Acceptance Criteria:**
- [ ] Shows score as large number (0–100) with circular progress indicator
- [ ] Color-coded: ≥90 green, ≥70 blue, ≥50 yellow, <50 red
- [ ] Shows label: "Excellent!" / "Good" / "Fair" / "Try Again"
- [ ] Animates in (scale/fade) when score appears
- [ ] Below score: shows recognized text vs target word side-by-side
- [ ] "Listen" button to hear correct pronunciation (uses existing `usePronunciation` hook)
- [ ] "Next" / "Skip" buttons

**Verification:** Score renders correctly, colors match thresholds, animation works.

---

#### Task 3C: WordCard for Speaking Practice
**Files:**
- `Front_End_Vocabulary/src/components/speaking/PracticeWordCard.tsx` (new)

**Acceptance Criteria:**
- [ ] Displays: word (large, bold), phonetic, meaning
- [ ] "Listen" button (uses `PronunciationButton` component) to hear correct pronunciation
- [ ] MicrophoneButton for recording
- [ ] After recording: shows ScoreDisplay
- [ ] Progress indicator: "Word 5 of 20" with progress bar
- [ ] Keyboard shortcut: Space to record, Enter/ArrowRight to next
- [ ] Responsive: adapts to mobile (larger touch targets)

**Verification:** Card shows word info, recording works, score displays after speaking.

---

#### Task 3D: SpeakingPracticePage
**Files:**
- `Front_End_Vocabulary/src/pages/Speaking/SpeakingPracticePage.tsx` (new)

**Acceptance Criteria:**
- [ ] Wrapped in `MainLayout`
- [ ] Header with title "Speaking Practice" and microphone icon
- [ ] Topic selector dropdown (reuse existing `TopicSelector` component pattern)
- [ ] Mode selector: "By Topic" / "All Words" / "Difficult Words"
- [ ] Word count display (e.g., "20 words loaded")
- [ ] "Start Practice" button → begins session, shows first word
- [ ] During practice: shows `PracticeWordCard` with current word
- [ ] Session complete screen: summary stats (words practiced, average score, time), list of words with scores, "Practice Again" button
- [ ] Error states: no words loaded, mic permission denied, browser not supported
- [ ] Loading state while fetching words

**Verification:** Full flow works end-to-end: select topic → start → practice words → see results.

---

### Phase 4: Integration

#### Task 4A: Route + Navigation
**Files:**
- `Front_End_Vocabulary/src/constants/routes.ts` (modify — add `SPEAKING: "/speaking"`)
- `Front_End_Vocabulary/src/routes/AppRoutes.tsx` (modify — add route)
- `Front_End_Vocabulary/src/components/common/Sidebar.tsx` (modify — add nav item)
- `Front_End_Vocabulary/src/components/common/MobileNav.tsx` (modify — add nav item)
- `Front_End_Vocabulary/src/components/common/Icon.tsx` (modify — add "microphone" icon)

**Acceptance Criteria:**
- [ ] Route `/speaking` renders `SpeakingPracticePage`
- [ ] Sidebar shows "Speaking" nav item with microphone icon
- [ ] MobileNav shows "Speaking" tab
- [ ] Active state styling matches existing nav items
- [ ] Icon added to Icon component (Feather "mic" path)

**Verification:** Navigation works on both desktop sidebar and mobile bottom nav.

---

#### Task 4B: Home Page Quick Action
**Files:**
- `Front_End_Vocabulary/src/pages/Home/HomePage.tsx` (modify)

**Acceptance Criteria:**
- [ ] Add "Speaking" to `quickActions` array: `{ to: "/speaking", label: "Speaking", desc: "Practice pronunciation", icon: "microphone", accent: "#FF6B6B" }`
- [ ] Grid adjusts to 5 columns on large screens (or wraps naturally)

**Verification:** Speaking action appears on home page, links to `/speaking`.

---

#### Task 4C: Backend Session Logging Integration
**Files:**
- `Front_End_Vocabulary/src/services/speaking.service.ts` (new)
- `Front_End_Vocabulary/src/store/speaking.store.ts` (modify)

**Acceptance Criteria:**
- [ ] `speakingService.saveSession(session)` calls `POST /api/practice-sessions`
- [ ] Store's `resetSession` calls `speakingService.saveSession` before clearing (if session had words)
- [ ] Optional: loading indicator while saving
- [ ] Graceful failure: if backend is down, session is lost but app doesn't crash

**Verification:** Session data saves to MongoDB when backend is running.

---

## Checkpoints

| Checkpoint | After Tasks | What to Verify |
|------------|-------------|----------------|
| **CP1: Foundation** | 1A, 1B, 1C, 1D | TypeScript compiles, scoring utils produce correct results, speech recognition hook works in browser |
| **CP2: Backend** | 2A, 2B, 2C | Server starts, endpoints respond to curl, MongoDB saves/reads sessions |
| **CP3: Components** | 3A, 3B, 3C | Each component renders in isolation, MicrophoneButton records, ScoreDisplay shows correct colors |
| **CP4: Full Integration** | 3D, 4A, 4B | Full flow works: navigate to page → select topic → practice words → see scores → complete session |
| **CP5: End-to-End** | 4C | Backend saves session, stats are retrievable, home page shows speaking action |

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Web Speech API not supported in Firefox | Show clear "browser not supported" message, recommend Chrome/Edge/Safari |
| Microphone permission denied | Handle error gracefully, show instructions to enable mic |
| Speech recognition accuracy varies | Make scoring forgiving (Levenshtein-based, not exact match), show "Try Again" option |
| Backend session logging is optional | Feature works fully offline; backend just adds persistence |
| Large vocabulary sets slow to load | Shuffle and limit to 20-50 words per session by default |

---

## Estimated Effort

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| Phase 1: Foundation | 1A–1D | 1–2 hours |
| Phase 2: Backend | 2A–2C | 1 hour |
| Phase 3: Components | 3A–3D | 2–3 hours |
| Phase 4: Integration | 4A–4C | 30 min |
| **Total** | | **4.5–6.5 hours** |
