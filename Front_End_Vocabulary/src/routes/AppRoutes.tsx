import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import TopicsPage from "../pages/Topics/TopicsPage";
import TopicDetailPage from "../pages/TopicDetail/TopicDetailPage";

import FlashcardPage from "../pages/Flashcard/FlashcardPage";
import ReviewPage from "../pages/Review/ReviewPage";
import QuizPage from "../pages/Quiz/QuizPage";

import StatisticsPage from "../pages/Statistics/StatisticsPage";
import WordGeneratorPage from "../pages/WordGenerator/WordGeneratorPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/topics/:id" element={<TopicDetailPage />} />

      <Route path="/flashcard" element={<FlashcardPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/generate" element={<WordGeneratorPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
