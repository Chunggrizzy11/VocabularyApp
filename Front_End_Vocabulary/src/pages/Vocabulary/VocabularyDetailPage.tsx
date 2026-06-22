import MainLayout from "../../layouts/MainLayout";
import VocabularyImage from "../../components/vocabulary/VocabularyImage";
import PronunciationCard from "../../components/vocabulary/PronunciationCard";
import VocabularyAudio from "../../components/vocabulary/VocabularyAudio";

export default function VocabularyDetailPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[28px] md:text-3xl font-bold mb-6" style={{ color: "var(--text-heading)" }}>Word Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: "var(--text-heading)" }}>abandon</h2>
            <VocabularyImage word="abandon" />
            <PronunciationCard word="abandon" pronunciation="/əˈbændən/" />
            <VocabularyAudio word="abandon" />
            <p className="mt-4" style={{ color: "var(--text-body)" }}>Meaning: từ bỏ</p>
            <p className="mt-2 italic text-sm" style={{ color: "var(--text-body-subtle)" }}>"He abandoned the project."</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
