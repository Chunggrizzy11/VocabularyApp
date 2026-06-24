# Speaking Practice — Task List

## Phase 1: Foundation (Client-Side) ✅

- [x] **1A: Types & Constants** — Created `types/Speaking.ts` and `constants/speaking.ts` with interfaces, thresholds, and modes
- [x] **1B: Scoring Utility** — Created `utils/pronunciationScore.ts` with Levenshtein distance + `calculatePronunciationScore()` + `getScoreLabel()`
- [x] **1C: Speech Recognition Hook** — Created `hooks/useSpeechRecognition.ts` wrapping Web Speech API (`webkitSpeechRecognition`)
- [x] **1D: Zustand Store** — Created `store/speaking.store.ts` with `loadWords`, `startSession`, `submitWord`, `nextWord`, `skipWord`, `resetSession` + derived hooks (`useCurrentWord`, `useAverageScore`, `useWordsPracticed`, `useProgressPercent`)

> **Checkpoint 1 ✅** — All foundation files created

## Phase 2: Backend (Optional Session Logging) ✅

- [x] **2A: PracticeSession Interface + Model** — Created `interfaces/practiceSession.interface.ts` (IPracticeSession, PracticeWord) and `models/PracticeSession.ts` (Mongoose schema with subdocument for words)
- [x] **2B: Service + Controller** — Created `services/practiceSession.service.ts` (create, getHistory, getStats with aggregation) and `controllers/practiceSession.controller.ts`
- [x] **2C: Routes + Server** — Created `routes/practiceSession.routes.ts` (POST /, GET /, GET /stats), registered in `server.ts`

> **Checkpoint 2 ✅** — Backend endpoints ready

## Phase 3: Frontend Components ✅

- [x] **3A: MicrophoneButton** — Created `components/speaking/MicrophoneButton.tsx` with pulsing animation, browser support detection, disabled state
- [x] **3B: ScoreDisplay** — Created `components/speaking/ScoreDisplay.tsx` with circular SVG progress, color-coded labels, target vs spoken comparison, "Listen" button
- [x] **3C: PracticeWordCard** — Created `components/speaking/PracticeWordCard.tsx` combining progress bar, word display, mic button, score display
- [x] **3D: SpeakingPracticePage** — Created `pages/Speaking/SpeakingPracticePage.tsx` with setup/practice/complete screens, topic selector, mic permission handling, session summary
- [x] **3E: CSS Animation** — Added `@keyframes speakingPulse` + `.speaking-pulse` class to `index.css`

> **Checkpoint 3 ✅** — All components render, mic records, scores display

## Phase 4: Integration ✅

- [x] **4A: Route + Navigation** — Added `/speaking` route in `routes.ts` and `AppRoutes.tsx`, "Speaking" nav item in `Sidebar.tsx` and `MobileNav.tsx`, "mic" icon in `Icon.tsx`
- [x] **4B: Home Page Quick Action** — Added "Speaking" to `HomePage.tsx` quick actions
- [x] **4C: Backend Session Logging** — Created `speaking.service.ts`, wired session save on completion in `SpeakingPracticePage.tsx`

> **Checkpoint 4 ✅** — Full flow works end-to-end
> **Checkpoint 5 ✅** — Backend saves sessions via API
