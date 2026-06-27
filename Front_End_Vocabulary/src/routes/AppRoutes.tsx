import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import LandingLayout from "../layouts/LandingLayout";

import HomePage from "../pages/Home/HomePage";
import LandingPage from "../pages/Landing/LandingPage";
import TopicsPage from "../pages/Topics/TopicsPage";
import TopicDetailPage from "../pages/TopicDetail/TopicDetailPage";
import FlashcardPage from "../pages/Flashcard/FlashcardPage";
import ReviewPage from "../pages/Review/ReviewPage";
import QuizPage from "../pages/Quiz/QuizPage";
import StatisticsPage from "../pages/Statistics/StatisticsPage";
import WordGeneratorPage from "../pages/WordGenerator/WordGeneratorPage";
import SpeakingPracticePage from "../pages/Speaking/SpeakingPracticePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

import AdminDashboardPage from "../pages/Admin/DashboardPage";
import AdminTopicsPage from "../pages/Admin/TopicsPage";
import AdminVocabularyPage from "../pages/Admin/VocabularyPage";
import AdminUsersPage from "../pages/Admin/UsersPage";

import Loading from "../components/common/Loading";
import { useAuthStore } from "../store/auth.store";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* PUBLIC ROUTES — only when NOT authenticated */}
      {!isAuthenticated && (
        <Route element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
      )}

      {/* AUTHENTICATED ROUTES — only when logged in */}
      {isAuthenticated && (
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:id" element={<TopicDetailPage />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/generate" element={<WordGeneratorPage />} />
          <Route path="/speaking" element={<SpeakingPracticePage />} />
        </Route>
      )}

      {/* LOGIN / REGISTER — always accessible */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ADMIN ROUTES — protected, always defined */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/topics" element={<AdminTopicsPage />} />
        <Route path="/admin/vocabulary" element={<AdminVocabularyPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}